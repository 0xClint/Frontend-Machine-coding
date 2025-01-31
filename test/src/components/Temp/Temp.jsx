import React, { memo, useCallback, useMemo, useState } from "react";

// *********************HOC****************
const Greeting = ({ name }) => {
  return <h2>Hello! {name}</h2>;
};

const NameGreeting = (ChildComp) => {
  return (props) => {
    return <ChildComp {...props} />;
  };
};
const GreetingAman = NameGreeting(Greeting);

// *********************useCallback and memo****************
const Child = memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Click me</button>;
});

export default function Temp() {
  const [count, setCount] = useState(0);
  const [counter2, setCounter2] = useState(0);

  // const isEven = () => {
  //   let j = 0;
  //   while (j < 2000000000) j++;
  //   console.log(count);
  //   return !(count & 1);
  // };
  const isEven = useMemo(() => {
    let j = 0;
    while (j < 2000000000) j++;

    return !(count & 1);
  }, [count]);

  const car = {
    color: "red",
    company: "Ferrari",
  };

  function purchase(currency, price) {
    console.log(
      `I have purchased ${this.color} - ${this.company} car for ${currency}${price}`
    );
  }

  Function.prototype.myBind = function (context = {}, ...args) {
    if (typeof this != "function") throw new Error("This is not a function");

    context.fn = this;

    return function (...newArgs) {
      return context.fn(...args, ...newArgs);
    };
  };

  Function.prototype.myApply = function (context = {}, args = []) {
    if (typeof this != "function") throw new Error("This is not a function");

    if (!Array.isArray(args)) throw new Error("This is not an Array");

    context.fn = this;
    context.fn(...args);
  };

  const bindedFunc = purchase.bind(car);
  bindedFunc("$", 4000);

  function myPromise(exceutor) {
    let onResolve,
      onReject,
      isCalled = false,
      isRejected = false,
      isFulfilled = false,
      value;


      
    function resolve(val) {
      value = val;
      isFulfilled = true;

      if (typeof onResolve === "function") {
        isCalled = true;
        onResolve(value);
      }
    }

    function reject(val) {
      value = val;
      isFulfilled = true;

      if (typeof onResolve === "function") {
        isCalled = true;
        onReject(value);
      }
    }

    this.then = function (callback) {
      onResolve = callback;

      if (isFulfilled && !isCalled) {
        isCalled = true;
        onResolve(value);
      }

      return this;
    };

    this.catch = function (callback) {
      onReject = callback;

      if (isFulfilled && !isRejected) {
        isRejected = true;
        onReject(val);
      }
      return this;
    };

    exceutor(resolve, reject);
  }
  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>INc</button>
      <button onClick={() => setCounter2((preState) => preState + 1)}>
        Counter 2 - {counter2}
      </button>
      <div>Even : {isEven ? "true" : "false"}</div>

      {/* <GreetingAman name={"Aman"} /> */}
    </div>
  );
}
