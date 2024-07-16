import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useDispatch, useSelector } from "react-redux";
import Settings from "./Settings";
import { updateSettings } from "../actions/settingsActions";

// Mocking the necessary modules
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../actions/settingsActions", () => ({
  updateSettings: jest.fn(),
}));

describe("Settings Component", () => {
  let dispatch;
  let handleClose;

  beforeEach(() => {
    dispatch = jest.fn();
    handleClose = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockReturnValue({ settings: { comment: true, demand: false } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders Settings component", () => {
    render(<Settings handleClose={handleClose} />);

    // Check for the presence of accordion panels
    const accordionPanel1 = screen.getByRole("button", { name: /panel1/i });
    expect(accordionPanel1).toBeInTheDocument();

    // Check for the presence of checkboxes
    const checkboxComment = screen.getByLabelText("comment");
    const checkboxDemand = screen.getByLabelText("demand");
    expect(checkboxComment).toBeInTheDocument();
    expect(checkboxDemand).toBeInTheDocument();

    // Check the initial state of checkboxes
    expect(checkboxComment).toBeChecked();
    expect(checkboxDemand).not.toBeChecked();
  });

  test("handles accordion panel change", () => {
    render(<Settings handleClose={handleClose} />);

    const accordionPanel1 = screen.getByRole("button", { name: /panel1/i });

    // Simulate clicking the accordion panel
    fireEvent.click(accordionPanel1);

    const accordionDetails = screen
      .getByText(/comment/i)
      .closest(".MuiAccordionDetails-root");
    expect(accordionDetails).toBeInTheDocument();
  });

  test("handles checkbox change", () => {
    render(<Settings handleClose={handleClose} />);

    const checkboxComment = screen.getByLabelText("comment");
    const checkboxDemand = screen.getByLabelText("demand");

    // Simulate changing checkbox state
    fireEvent.click(checkboxComment);
    expect(checkboxComment).not.toBeChecked();

    fireEvent.click(checkboxDemand);
    expect(checkboxDemand).toBeChecked();
  });

  test("handles save and close buttons", () => {
    render(<Settings handleClose={handleClose} />);

    const saveButton = screen.getByRole("button", { name: /save/i });
    const closeButton = screen.getByRole("button", { name: /close/i });

    // Simulate clicking the save button
    fireEvent.click(saveButton);
    expect(dispatch).toHaveBeenCalledWith(
      updateSettings({ comment: true, demand: false })
    );

    // Simulate clicking the close button
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
  });
});
