import { useState, useEffect } from "react";
import axios from "axios";

interface GeoResult {
  name: string;
  admin1?: string;  // e.g. state or province
  country?: string;
}

export function useCitySuggestions(query: string) {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    const controller = new AbortController();

    async function fetchSuggestions() {
      try {
        const res = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=7`,
          { signal: controller.signal }
        );
        const results: GeoResult[] = res.data.results || [];

        // Filter and format
        const formatted = results.map((r) => {
          const parts: string[] = [r.name];
          if (r.admin1) parts.push(r.admin1);
          if (r.country) parts.push(r.country);
          return parts.join(", ");
        });

        // Prefer those with admin1: i.e. sort them first
        const sorted = formatted.sort((a, b) => {
          const aHasState = a.split(",").length >= 2;
          const bHasState = b.split(",").length >= 2;
          if (aHasState && !bHasState) return -1;
          if (!aHasState && bHasState) return 1;
          return 0;
        });

        // Deduplicate
        const unique = Array.from(new Set(sorted));

        setSuggestions(unique);
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error("Error fetching suggestions:", err);
      }
    }

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => {
      controller.abort();
      clearTimeout(debounce);
    };
  }, [query]);

  return suggestions;
}
