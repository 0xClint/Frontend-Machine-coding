import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import { lazy, Suspense, useState } from "react";

//Contact function is not exported as default-- so we importted it in default module
const Contact = lazy(() =>
  import("./Contact").then((module) => ({ default: module.Contact }))
);
const About = lazy(() => import("./About"));
//added wait func just to show the fallback loading
const Home = lazy(() => wait(0).then(() => import("./Home")));

export default function LazyLoading() {
  const [data, setData] = useState([]);
  return (
    <div>
      <Router>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </Router>
      <div>
        <button
          onClick={() =>
            import("./DummyData.ts").then((module) => {
              setData(module.dummyData);
            })
          }
        >
          Load Data
        </button>
        <ul>
          {data.map(({ title, id }) => (
            <li key={id}>{title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const wait = async (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};
