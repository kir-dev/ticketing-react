import axios from "axios";
import { ReactElement, useState } from "react";
import { Board } from "./types.ts";

const url = "https://api.ticketing.kir-dev.hu/boards";

interface BoardItemProps {
  board: Board;
  onSave: () => void;
}

export function BoardItem(props: BoardItemProps): ReactElement {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState<string>(props.board.title);

  const onClickButton = () => {
    if (isEditing) {
      axios
        .patch(url + "/" + props.board.id, {
          title: inputValue,
        })
        .then(() => {
          props.onSave();
        });
    }
    setIsEditing((prevState) => !prevState);
  };

  const onDelete = () => {
    axios.delete(url + "/" + props.board.id).then(props.onSave);
  };

  return (
    <div className="bg-white p-2 rounded-md mt-2">
      <p>{props.board.id}</p>
      {!isEditing ? (
        <p>{props.board.title}</p>
      ) : (
        <input
          value={inputValue}
          className="border rounded-md p-2 mr-2"
          onChange={(e) => setInputValue(e.target.value)}
        />
      )}
      <p>{new Date(props.board.createdAt).toLocaleString()}</p>
      <div className="flex gap-2">
        <button
          className="bg-green-200 p-2 rounded-md mr-2"
          onClick={onClickButton}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        <button className="bg-red-500 p-2 rounded-md" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
