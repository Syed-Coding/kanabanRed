import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { InputValueContext } from "../App";

export function Form() {
  const [setInputVal, dispatch, input] = useContext(InputValueContext);
  console.log(useContext(InputValueContext));
  const handleInput = (e) => {
    setInputVal(e.target.value);
  };

  const handleSubmit = () => {
    const updateditem = {
      id: uuidv4(), //Universally unique identifier
      task: input,
      category: "pending",
    };

    dispatch({ type: "SUBMIT_TYPE", payload: updateditem });
    setInputVal("");
  };
  return (
    <div id="taskForm">
      <h3>Add New Task</h3>
      <div className="formField">
        <input
          type="text"
          className="taskInput"
          value={input}
          onChange={handleInput}
        />
        <button disabled={!input} className="taskSubmit" onClick={handleSubmit}>
          Submit Task
        </button>
      </div>
    </div>
  );
}
