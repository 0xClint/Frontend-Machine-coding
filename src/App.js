import logo from "./logo.svg";
import "./App.css";
import { Dropdown } from "./components/Dropdown/Dropdown";
import { InfiniteScroll } from "./components/InfiniteScroll/InfiniteScroll";
import { Game } from "./components/TicTacToe.jsx/Game";
import { SelectableGrid } from "./components/SelectableGrid/SelectableGrid";
import { Pagination } from "./components/Pagination/Pagination";
import { Rating } from "./components/Rating/Rating";
import { MemoryGame } from "./components/MemoryGame/MemoryGame";
import DropDown2 from "./components/DropDown2/DropDown2";
import { OrderBook } from "./components/OrderBook/OrderBook";
import { ProgressBar } from "./components/ProgressBar/ProgressBar";
import { GridLight } from "./components/GridLight/GridLight";
import { AutoComplete } from "./components/AutoComplete/AutoComplete";
import { FileExplorer } from "./components/FileExplorer/FileExplorer";
import { NestedComment } from "./components/NestedComment/NestedComment";
import { CustomModal } from "./components/CustomModal/CustomModal";
import { useState } from "react";
import { TransferList } from "./components/TransferContainer/TransferList";
import { Stepper } from "./components/Stepper/Stepper";
import { CHECKOUT_STEPS } from "./components/Stepper/data";
const animalsList = ["Lion", "Tiger", "Hyena", "Leopard"];

function App() {
  const [isModalOpen, setOpenModal] = useState(false);

  const fetchSuggestions = async (query) => {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${query}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result.recipes;
  };
  return (
    <div className="App">
      {/* <CustomModal isOpen={isModalOpen} setIsOpen={setOpenModal} />
      <button onClick={() => setOpenModal(true)}>Open Modal</button> */}

      {/* <Dropdown placeholder="Select Option" list={animalsList} /> */}

      {/* <InfiniteScroll /> */}

      {/* <Game /> */}

      {/* <SelectableGrid /> */}

      <Pagination />

      {/* <Rating number={5} /> */}

      {/* <DropDown2
        placeholder="Select Option"
        list={animalsList}
        onChange={(item) => console.log(item)}
      /> */}

      {/* <AutoComplete
        placeholder="Search..."
        onSelect={(name) => {
          console.log(name);
        }}
        dataKey={"recipes"}
        fetchSuggestions={fetchSuggestions}
        onChange={(input) => {}}
        onBlur={(e) => {}}
        onFocus={(e) => {}}
        customLoading={<>Loading Recipes..</>}
      /> */}

      {/* <FileExplorer /> */}

      {/* <NestedComment /> */}

      {/* <GridLight /> */}

      {/* <MemoryGame /> */}

      {/* <OrderBook /> */}

      {/* <ProgressBar value={value} onComplete={() => console.log("success")} /> */}

      {/* <TransferList /> */}

      {/* <Stepper stepsConfig={CHECKOUT_STEPS} /> */}
    </div>
  );
}

export default App;
