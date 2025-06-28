import React, { useCallback, useEffect, useRef, useState } from "react"; // <-- Add this

// class Temp extends React.Component {
//   state = { count: 0 };

//   handleClick = () => {
//     // setTimeout(() => {}, 0);
//     this.setState((prevState) => ({ count: prevState.count + 1 }));
//     this.setState((prevState) => ({ count: prevState.count + 1 }));
//   };

//   render() {
//     return (
//       <div>
//         <h1>Count: {this.state.count}</h1>
//         <button onClick={this.handleClick}>Click me!</button>
//       </div>
//     );
//   }
// }

function Temp() {
  const fetchData = useCallback(async () => {
    const response = await fetch(`/api/data/${props.id}`);
    const json = await response.json();
    return json;
  }, [props.id]);

  useEffect(() => {
    const dataPromise = fetchData();
    // Do something with the data promise
    return () => {
      // Cancel the data promise
    };
  }, [fetchData]);
  return <div>My Component</div>;
}

export default Temp;
