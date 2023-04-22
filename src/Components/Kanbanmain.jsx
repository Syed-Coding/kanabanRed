import { useContext } from "react";
import { TodoValueContext } from "../App";
export function Kanbanmain() {
  const [categories, tasks, dispatch] = useContext(TodoValueContext);
  //handle move from pending to ongoing
  const handleMove = (id) => {
    dispatch({ type: "MOVE_TO_ONGOING", payload: id });
  };
  //handle move from ongoing to complete
  const handleMoveSecond = (id) => {
    dispatch({ type: "MOVE_TO_COMPLETED", payload: id });
  };
  // delete button in complete
  const handleMoveDelete = (id) => {
    dispatch({ type: "COMPLETED", payload: { id, tasks } });
  };
  return (
    <>
      {categories.map((cat) => {
        return (
          cat && (
            <div className="taskColumn" key={cat}>
              <div className="columnHeader">
                <h3>{cat}</h3>
              </div>
              <div className="taskItems">
                {tasks.map((ele) => {
                  return (
                    ele.category === cat && (
                      <div className="taskItem" key={ele.id}>
                        <p>{ele.task}</p>
                        {ele.category === "pending" && (
                          <button
                            className="taskButton move"
                            onClick={() => handleMove(ele.id)}
                          >
                            Move
                          </button>
                        )}
                        {ele.category === "ongoing" && (
                          <button
                            className="taskButton move"
                            onClick={() => handleMoveSecond(ele.id)}
                          >
                            Move
                          </button>
                        )}
                        {ele.category === "completed" && (
                          <button
                            className="taskButton delete"
                            onClick={() => handleMoveDelete(ele.id)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          )
        );
      })}
    </>
  );
}
