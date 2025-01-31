import { useState } from "react";
import AutoComplete from "./components/AutoComplete/AutoComplete";
import DragandDrop from "./components/DragandDrop/DragandDrop";
// import DropDown from "./components/DropDown/DropDown";
import GridLight from "./components/GridLight/GridLight";
import LazyLoading from "./components/LazyLoading/Router";
import MemoryGame from "./components/MemoryGame/MemoryGame";
import NestedComment from "./components/NestedComments/NestedComment";
import Pagination from "./components/Pagination/Pagination";
import Round1 from "./components/Round1";
import SelectableGrid from "./components/SelectableGrid/SelectableGrid";
import StarRating from "./components/StarRating/StarRating";
import Throttling from "./components/Throttling/Throttling";
import CustomModal from "./components/CustomModal/CustomModal";
import TicTacToe from "./components/TicTacToe/TicTacToe";
import DropDown2 from "./components/DropDown2/DropDown2";
import InfiniteScroll from "./components/InfiniteScroll/InfiniteScroll";
import FileExplorer from "./components/FileExplorer/FileExplorer";

function App() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Fronted Machine Coding</h2>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <DropDown
          listData={[...Array(100).keys()].map((index) => ({
            id: index + 1,
            content: `Item ${index + 1}`,
          }))}
          onSelect={(item: string) => console.log(`${item} Selected!`)}
        /> */}
        {/* <DropDown2
          list={[...Array(1000).keys()].map((item) => ({
            id: item,
            content: `Item ${item + 1}`,
          }))}
          onSelect={(item: string) => console.log(`Selected ${item}`)}
          placeholder={"Select Item"}
        /> */}
        <div>Hello</div>
        {/* <Round1 /> */}
        {/* <DragandDrop /> */}
        {/* <Throttling /> */}
        {/* <LazyLoading /> */}
        {/* <MemoryGame /> */}
        {/* <StarRating /> */}
        {/* <NestedComment /> */}
        {/* <Pagination /> */}
        {/* <AutoComplete /> */}
        {/* <SelectableGrid /> */}
        {/* <GridLight /> */}
        {/* <>
          <button onClick={() => setModalOpen(true)}>openModal</button>
          <CustomModal isOpen={modalOpen} setOpen={setModalOpen} />
        </> */}
        {/* <TicTacToe /> */}
        <FileExplorer />

        {/* <InfiniteScroll /> */}
      </div>
    </>
  );
}

export default App;
