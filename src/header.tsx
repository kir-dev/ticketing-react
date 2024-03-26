import { AddBoard } from "./add-board.tsx";

export function Header() {
  return (
    <header className="flex justify-between items-center p-2 w-full">
      <h1 className="text-xl font-bold">Boards</h1>
      <AddBoard />
    </header>
  );
}
