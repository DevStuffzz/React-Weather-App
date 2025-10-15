import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">☀️ React Weather Dashboard</h1>
      <p className="text-gray-400 mb-6">
        Vite. React. Tailwind. 
      </p>
      <p className="text-gray-400 mb-6">
        View real-time weather and forecasts powered by the Open-Meteo API.
      </p>
      <Link
        to="/dashboard"
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white transition"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
