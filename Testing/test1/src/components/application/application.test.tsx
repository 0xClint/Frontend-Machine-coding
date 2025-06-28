import { getByLabelText, render, screen } from "@testing-library/react";
import { Applications } from "./applications";
import { act } from "react";

describe.skip("Application", () => {
  test("Render corretly", () => {
    act(() => {
      render(<Applications />);
    });

    ///*****************Get By Role**************** */
    const pageHeading = screen.getByRole("heading", {
      level: 1,
      name: "Job application form",
    });
    expect(pageHeading).toBeInTheDocument();

    const sectionHeading = screen.getByRole("heading", {
      level: 2,
      // name: "Section 1",
    });

    expect(sectionHeading).toBeInTheDocument();

    const inputElement = screen.getByRole("textbox", { name: "Name" });
    expect(inputElement).toBeInTheDocument();

    const bioElement = screen.getByRole("textbox", { name: "Bio" });
    expect(bioElement).toBeInTheDocument();

    const jobLocation = screen.getByRole("combobox");
    expect(jobLocation).toBeInTheDocument();

    const checkBoxElement = screen.getByRole("checkbox");
    expect(checkBoxElement).toBeInTheDocument();

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();

    ///*****************getByLabelText**************** */
    const nameElement = screen.getByLabelText("Name", { selector: "input" });
    expect(nameElement).toBeInTheDocument();

    ///*****************getByPlaceholderText**************** */
    const namePlaceholderElement = screen.getByPlaceholderText("FullName");
    expect(namePlaceholderElement).toBeInTheDocument();

    ///*****************getByText**************** */
    const paraElement = screen.getByText("All fields are mandatory");
    expect(paraElement).toBeInTheDocument();

    ///*****************getByDisplayValue**************** */
    const pinputValueElement = screen.getByDisplayValue("Rajesh");
    expect(pinputValueElement).toBeInTheDocument();

    ///*****************getByAltText**************** */
    const imgAltElement = screen.getByAltText("profile-img");
    expect(imgAltElement).toBeInTheDocument();

    ///*****************getByTitle**************** */
    const closeElement = screen.getByTitle("close");
    expect(closeElement).toBeInTheDocument();

    ///*****************getByTestId**************** */
    const customElement = screen.getByTestId("custom-element");
    expect(customElement).toBeInTheDocument();
  });
});
