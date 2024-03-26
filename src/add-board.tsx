import { useForm } from "react-hook-form";
import { TbLoader, TbPlus } from "react-icons/tb";
import { Button } from "./button.tsx";
import { useAddBoard } from "./queries/use-add-board.ts";
import { queryClient } from "./query-client.ts";

interface AddBoardForm {
  title: string;
}

export function AddBoard() {
  const addBoard = useAddBoard();

  const { register, handleSubmit, reset } = useForm<AddBoardForm>();

  const onSubmit = handleSubmit((values) => {
    addBoard.mutateAsync(values.title).then(() => {
      queryClient.invalidateQueries({
        queryKey: ["boards"],
      });
    });
    reset({
      title: "",
    });
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input className="border rounded-md p-2 mr-2" {...register("title")} />
        <Button variant="default">
          {addBoard.isPending ? <TbLoader /> : <TbPlus />}
        </Button>
      </form>
    </div>
  );
}
