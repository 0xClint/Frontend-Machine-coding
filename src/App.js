import "./App.css";
import { useEffect, useState } from "react";
// import { Dropdown } from "./components/Dropdown/Dropdown";
import { InfiniteScroll } from "./components/InfiniteScroll/InfiniteScroll";
// import { Game } from "./components/TicTacToe.jsx/Game";
// import { SelectableGrid } from "./components/SelectableGrid/SelectableGrid";
// import { Pagination } from "./components/Pagination/Pagination";
// import { Rating } from "./components/Rating/Rating";
// import { MemoryGame } from "./components/MemoryGame/MemoryGame";
// import DropDown2 from "./components/DropDown2/DropDown2";
// import { OrderBook } from "./components/OrderBook/OrderBook";
// import { ProgressBar } from "./components/ProgressBar/ProgressBar";
// import { GridLight } from "./components/GridLight/GridLight";
// import { AutoComplete } from "./components/AutoComplete/AutoComplete";
// import { FileExplorer } from "./components/FileExplorer/FileExplorer";
import { NestedComment } from "./components/NestedComment/NestedComment";
import { ScreenAdjust } from "./components/Throttling/ScreenAdjust";
import { CountDown } from "./components/CountDown/CountDown";
// import { CustomModal } from "./components/CustomModal/CustomModal";
// import { TransferList } from "./components/TransferContainer/TransferList";
// import { Stepper } from "./components/Stepper/Stepper";
// import { CHECKOUT_STEPS } from "./components/Stepper/data";
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

  const [value, setValue] = useState(0);

  // useEffect(() => {
  //   let timer;
  //   if (value < 100) {
  //     setTimeout(() => {
  //       setValue((prev) => prev + 1);
  //     }, 50);
  //   }
  //
  //   return () => clearTimeout(timer);
  // }, [value]);
  return (
    <div className="App">
      {/* <CustomModal isOpen={isModalOpen} setIsOpen={setOpenModal} />
      <button onClick={() => setOpenModal(true)}>Open Modal</button> */}

      {/* <Dropdown placeholder="Select Option" list={animalsList} /> */}

      {/* <Game /> */}

      {/* <SelectableGrid /> */}

      {/* <Pagination /> */}

      {/* <Rating number={5} /> */}

      {/* <DropDown2
        placeholder="Select Option"
        list={animalsList}
        onChange={(item) => console.log(item)}
      /> */}

      {/* <GridLight /> */}

      {/* <MemoryGame /> */}

      {/* <OrderBook /> */}

      {/* <ProgressBar value={value} onComplete={() => console.log("success")} /> */}

      {/* <TransferList /> */}

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

      <InfiniteScroll />

      {/* <FileExplorer /> */}

      {/* <NestedComment /> */}

      {/* <ScreenAdjust /> */}

      {/* <CountDown /> */}

      {/* <Stepper stepsConfig={CHECKOUT_STEPS} /> */}
    </div>
  );
}

export default App;
