import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const onIncrement = () => setCount((prev) => prev + 1);
  return (
    <main className="flex items-center justify-center h-screen bg-slate-100">
      <div className="bg-white p-10 rounded-md shadow-lg flex flex-col items-center gap-5">
        <h1 className="font-bold">React Gyakorlat</h1>
        <button
          className="bg-blue-500 text-white font-bold p-5 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
          onClick={onIncrement}
        >
          {count}++
        </button>
      </div>
    </main>
  );
}

export default App;
