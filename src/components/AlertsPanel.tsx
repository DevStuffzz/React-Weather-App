export default function AlertsPanel({ alerts }: { alerts: string[] }) {
  if (alerts.length === 0)
    return (
      <div className="p-4 bg-green-800 text-green-200 rounded-lg">
        ✅ No severe weather detected in the next 12 hours.
      </div>
    );

  return (
    <div className="p-4 bg-red-900 text-red-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">⚠️ Alerts Detected:</h3>
      <ul className="list-disc ml-6 space-y-1">
        {alerts.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>
    </div>
  );
}
