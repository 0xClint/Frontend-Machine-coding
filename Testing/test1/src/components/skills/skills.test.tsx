import { logRoles, render, screen } from "@testing-library/react";
import { Skills } from "./skills";

describe.skip("Skills", () => {
  const list = ["HTML", "CSS", "JS"];

  test("render correctly", () => {
    render(<Skills skills={list} />);

    const listElement = screen.getByRole("list");
    expect(listElement).toBeInTheDocument();
  });

  test("render list items", () => {
    render(<Skills skills={list} />);
    const listItemElement = screen.getAllByRole("listitem");
    expect(listItemElement).toHaveLength(list.length);
  });

  test("render login btn", () => {
    render(<Skills skills={list} />);
    const loginBtn = screen.getByRole("button", {
      name: "Login",
    });
    expect(loginBtn).toBeInTheDocument();
  });

  ///*****************queryByRole**************** */
  test("Start learning btn not render", () => {
    render(<Skills skills={list} />);
    const loginBtn = screen.queryByRole("button", {
      name: "Start learing",
    });
    expect(loginBtn).not.toBeInTheDocument();
  });

  ///*****************findByRole**************** */

  test("Start learning btn eventually render", async () => {
    const view = render(<Skills skills={list} />);
    // screen.debug(); // Shows virtual dom tree at this point

    // logRoles(view.container);

    const startLearningBtn = await screen.findByRole(
      "button",
      {
        name: "Start learning",
      },
      { timeout: 2001 } //Default is 1000
    );
    // logRoles(view.container);

    // screen.debug(); // Shows virtual dom tree at this point

    expect(startLearningBtn).toBeInTheDocument();
  });
});
