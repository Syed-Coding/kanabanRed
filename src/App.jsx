import { createContext, useReducer, useState } from "react";
import { data } from "./utils/data";
import { Kanbanmain } from "./Components/Kanbanmain";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Form } from "./Components/Form";
export const InputValueContext = createContext();
export const TodoValueContext = createContext();

// reducer for moving and deletion
const initialState = data;
const reducer = (state, { type, payload }) => {
  console.log("payload", payload);
  switch (type) {
    case "SUBMIT_TYPE":
      return {
        ...state,
        tasks: [...state.tasks, payload],
      };
    case "MOVE_TO_ONGOING":
      return {
        ...state,
        tasks: state.tasks.map((ele) => {
          return ele.id === payload ? { ...ele, category: "ongoing" } : ele;
        }),
      };

    case "MOVE_TO_COMPLETED":
      return {
        ...state,
        tasks: state.tasks.map((ele) => {
          return ele.id === payload ? { ...ele, category: "completed" } : ele;
        }),
      };
    case "COMPLETED":
      return {
        ...state,
        tasks: payload.tasks.filter((ele) => ele.id !== payload.id),
      };
    default:
      return state;
  }
};

function App() {
  const [orginalData, dispatch] = useReducer(reducer, initialState);
  console.log("orginaldata", orginalData);
  //destructuring
  const { categories, tasks } = orginalData;
  // console.log("origianl data", initialState);
  return (
    <div className="App">
      <Header></Header>
      <InputValueContext.Provider value={[dispatch]}>
        <Form></Form>
      </InputValueContext.Provider>

      <div id="taskBoard">
        <TodoValueContext.Provider value={[categories, tasks, dispatch]}>
          <Kanbanmain></Kanbanmain>
        </TodoValueContext.Provider>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default App;
