interface UnitSwitchProps {
  unit: "C" | "F";
  setUnit: (u: "C" | "F") => void;
}

export default function UnitSwitch({ unit, setUnit }: UnitSwitchProps) {
  return (
    <button
      onClick={() => setUnit(unit === "C" ? "F" : "C")}
      className="bg-blue-600 px-3 py-1 rounded text-sm font-medium"
    >
      {unit === "C" ? "Switch to °F" : "Switch to °C"}
    </button>
  );
}
