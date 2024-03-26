import { AddBoard } from "./add-board.tsx";
import { BoardItem } from "./board-item.tsx";
import { useBoards } from "./queries/use-boards.ts";

function App() {
  const boards = useBoards();

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-slate-100">
      <AddBoard />
      <select>
        {boards.data?.map((board) => {
          return (
            <option key={board.id} value={board.id}>
              {board.title}
            </option>
          );
        })}
      </select>
      {boards.isFetching && <p>Loading...</p>}
      <div className="overflow-auto">
        {boards.data?.map((board) => {
          return <BoardItem key={board.id} board={board} />;
        })}
      </div>
    </main>
  );
}

export default App;
