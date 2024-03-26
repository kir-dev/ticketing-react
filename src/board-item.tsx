import axios from "axios";
import { ReactElement, useState } from "react";
import { TbDeviceFloppy, TbEdit, TbTrash } from "react-icons/tb";
import { Button } from "./button.tsx";

import { queryClient } from "./query-client.ts";
import { Board } from "./types.ts";

const url = "https://api.ticketing.kir-dev.hu/boards";

interface BoardItemProps {
  board: Board;
}

export function BoardItem(props: BoardItemProps): ReactElement {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState<string>(props.board.title);

  const onRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: ["boards"],
    });
  };

  const onClickButton = () => {
    if (isEditing) {
      axios
        .patch(url + "/" + props.board.id, {
          title: inputValue,
        })
        .then(onRefresh);
    }
    setIsEditing((prevState) => !prevState);
  };

  const onDelete = () => {
    axios.delete(url + "/" + props.board.id).then(onRefresh);
  };

  return (
    <div className="bg-white p-2 rounded-md mt-2 flex justify-between box-border">
      <div className="flex-1 overflow-hidden">
        {!isEditing ? (
          <p className="font-bold truncate">{props.board.title}</p>
        ) : (
          <input
            value={inputValue}
            className="border rounded-md p-2 mr-2"
            onChange={(e) => setInputValue(e.target.value)}
          />
        )}
        <p className="text-slate-500">
          {new Date(props.board.createdAt).toLocaleString()}
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onClickButton}>
          {isEditing ? <TbDeviceFloppy /> : <TbEdit />}
        </Button>
        <Button variant="outline" onClick={onDelete}>
          <TbTrash />
        </Button>
      </div>
    </div>
  );
}
