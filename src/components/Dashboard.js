import { useContext, useState } from "react";
import { BusinessContext } from "../components/context/BusinessContext";

const Dashboard = () => {
  const { data, setData } = useContext(BusinessContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !location.trim()) {
      alert("Please enter both Business Name and Location");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://growthdashboard.onrender.com/business-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location }),
      });
      const result = await res.json();
      setData(result);
    } catch (err) {
      alert("Failed to fetch data");
      console.error(err);
    }
    setLoading(false);
  };

  const regenerateHeadline = async () => {
    const res = await fetch(
      `https://growthdashboard.onrender.com/regenerate-headline?name=${name}&location=${location}`
    );
    const result = await res.json();
    setData((prev) => ({ ...prev, headline: result.headline }));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Business Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {loading && <p className="text-center mt-4 text-blue-500">Loading...</p>}

      {data && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <p className="text-xl font-semibold text-yellow-500">⭐ {data.rating}</p>
          <p className="text-gray-700">Reviews: {data.reviews}</p>
          <p className="italic mt-2 text-gray-600">"{data.headline}"</p>
          <button
            onClick={regenerateHeadline}
            className="mt-4 text-sm text-blue-600 underline"
          >
            Regenerate SEO Headline
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

