import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function Chart({ data, unit }: { data: any[]; unit: "C" | "F" }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="time" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Line yAxisId="left" type="monotone" dataKey="temp" stroke="#3b82f6" name={`Temp (°${unit})`} />
        <Line yAxisId="right" type="monotone" dataKey="rain" stroke="#22d3ee" name="Rain (%)" />
      </LineChart>
    </ResponsiveContainer>
  );
}
