import axios from "axios";
import { useEffect, useState } from "react";
import { BoardItem } from "./board-item.tsx";
import { Board } from "./types.ts";

const url = "https://api.ticketing.kir-dev.hu/boards";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [boards, setBoards] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const onAdd = () => {
    setInputValue("");
    axios
      .post(url, {
        title: inputValue,
      })
      .then(() => {
        getBoards();
      });
  };

  const getBoards = () => {
    setIsLoading(true);
    axios.get<Board[]>(url).then((res) => {
      setBoards(res.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-slate-100">
      <div>
        <input
          value={inputValue}
          className="border rounded-md p-2 mr-2"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={onAdd} className="border rounded-md p-2">
          Add
        </button>
      </div>
      <select>
        {boards.map((board) => {
          return (
            <option key={board.id} value={board.id}>
              {board.title}
            </option>
          );
        })}
      </select>
      {isLoading && <p>Loading...</p>}
      <div className="overflow-auto">
        {boards.map((board) => {
          return <BoardItem key={board.id} board={board} onSave={getBoards} />;
        })}
      </div>
    </main>
  );
}

export default App;
