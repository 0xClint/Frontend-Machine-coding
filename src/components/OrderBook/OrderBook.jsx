import React, { useState } from "react";
import "./OrderBook.css";

export const OrderBook = () => {
  const [buyList, setBuyList] = useState([]);
  const [sellList, setSellList] = useState([]);

  const handleAddOrder = (type) => {
    const newData = {
      id: Math.ceil(Math.random() * 1000),
      size: (Math.random() * 1000).toFixed(2),
      price: (4000 + (Math.random() - 0.5) * 100).toFixed(3),
    };
    if (type == "buy") {
      const newList = [...buyList, newData].sort((a, b) => b.price - a.price);
      setBuyList(newList);
    } else {
      const newList = [...sellList, newData].sort((a, b) => b.price - a.price);
      setSellList(newList);
    }
  };

  console.log(buyList);
  return (
    <div className="order-book">
      <h2>Order Book</h2>
      <div className="btn-container">
        <button onClick={() => handleAddOrder("buy")}>Buy</button>
        <button onClick={() => handleAddOrder()}>Sell</button>
      </div>
      <div className="order-container">
        <ul className="list-container">
          {buyList.map(({ id, size, price }) => {
            return (
              <li key={id} className="list-items ">
                <span>{size}</span>
                <span className="buy-item">{price}</span>
              </li>
            );
          })}
        </ul>
        <div className="divider"></div>
        <ul className="list-container">
          {sellList.map(({ id, size, price }) => {
            return (
              <li key={id} className="list-items ">
                <span>{size}</span>
                <span className="sell-item">{price}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
