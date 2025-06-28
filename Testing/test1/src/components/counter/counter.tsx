import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [amount, setAmount] = useState(0);
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
      <div>
        <label htmlFor="amount">Amount input</label>
        <input
          type="number"
          id="amount"
          onChange={(e) => setAmount(parseInt(e.target.value))}
          value={amount}
        />
      </div>
      <button onClick={() => setCount(amount)}>Set</button>
    </div>
  );
};

export default Counter;
