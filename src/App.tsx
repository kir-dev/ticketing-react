import { BoardItem } from "./board-item.tsx";
import { Header } from "./header.tsx";
import { useBoards } from "./queries/use-boards.ts";

function App() {
  const boards = useBoards();

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-slate-100">
      <Header />
      {boards.isFetching && <p>Loading...</p>}
      <div className="overflow-auto p-2 box-border w-full">
        {boards.data?.map((board) => {
          return <BoardItem key={board.id} board={board} />;
        })}
      </div>
    </main>
  );
}

export default App;
