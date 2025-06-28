import { getByRole, render, screen } from "@testing-library/react";
import Counter from "./counter";
import userEvent from "@testing-library/user-event";

describe.skip("Counter", () => {
  test("render countElement correctly", () => {
    render(<Counter />);

    const countELement = screen.getByRole("heading");
    expect(countELement).toBeInTheDocument();
  });

  test("render countElement correctly", () => {
    render(<Counter />);

    const btnELement = screen.getByRole("button", {
      name: "Increment",
    });
    expect(btnELement).toBeInTheDocument();
  });

  test("render a count of 0", () => {
    render(<Counter />);
    const countELement = screen.getByRole("heading");
    expect(countELement).toHaveTextContent("0");
  });

  test("render a count after 1st increment", async () => {
    userEvent.setup();

    render(<Counter />);
    const btnElement = screen.getByRole("button", {
      name: "Increment",
    });

    await userEvent.click(btnElement);

    const countELement = screen.getByRole("heading");
    expect(countELement).toHaveTextContent("1");
  });

  test("render textbox element", () => {
    render(<Counter />);

    const textboxElement = screen.getByRole("spinbutton", {
      name: "Amount input",
    });
    expect(textboxElement).toBeInTheDocument();
  });

  test("render input element", async () => {
    let count = 0;
    count += 5;
    userEvent.setup();

    render(<Counter />);
    const textboxElement = screen.getByRole("spinbutton", {
      name: "Amount input",
    });

    await userEvent.type(textboxElement, String(count));

    const setElement = screen.getByRole("button", {
      name: "Set",
    });
    await userEvent.click(setElement);

    const countELement = screen.getByRole("heading");
    expect(countELement).toHaveTextContent(String(count));
  });

  test("element are focused in write order", async () => {
    userEvent.setup();

    render(<Counter />);

    const Incbtn = screen.getByRole("button", { name: "Increment" });
    const inputElement = screen.getByRole("spinbutton");
    const setBtn = screen.getByRole("button", { name: "Set" });

    await userEvent.tab();
    expect(Incbtn).toHaveFocus();

    await userEvent.tab();
    expect(inputElement).toHaveFocus();

    await userEvent.tab();
    expect(setBtn).toHaveFocus();
  });
});
