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




import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import Settings from "./Settings";
import settingsReducer, { getSettings, updateSettings } from "../redux/settingsSlice";

// Mocking API functions
jest.mock("../api");

describe("Settings Page Tests", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        settings: settingsReducer,
      },
    });
  });

  test("renders Settings page with initial settings", async () => {
    render(
      <Provider store={store}>
        <Settings handleClose={jest.fn()} />
      </Provider>
    );

    // Check initial rendering
    expect(screen.getByText("Panel 1")).toBeInTheDocument();
    expect(screen.getByText("Comment")).toBeInTheDocument();
    expect(screen.getByText("Demand")).toBeInTheDocument();
    expect(screen.getByLabelText("Comment")).toBeChecked();
    expect(screen.getByLabelText("Demand")).not.toBeChecked();
  });

  test("handles checkbox changes and dispatches action correctly", async () => {
    render(
      <Provider store={store}>
        <Settings handleClose={jest.fn()} />
      </Provider>
    );

    // Simulate clicking on a checkbox
    fireEvent.click(screen.getByLabelText("Demand"));

    // Check that the dispatch function was called with the correct action
    await act(async () => {
      expect(store.getState().settings.settings.demand).toBe(true); // Assuming the state structure after dispatch
    });
  });

  test("handles save action and shows snackbar", async () => {
    render(
      <Provider store={store}>
        <Settings handleClose={jest.fn()} />
      </Provider>
    );

    // Simulate clicking the Save button
    fireEvent.click(screen.getByText("Save"));

    // Check that the updateSettings action was dispatched
    await act(async () => {
      // Mock the API response for updateSettingsData
      updateSettingsData.mockResolvedValue({ success: true });

      // Ensure that the Snackbar appears after saving
      expect(screen.getByText("Save success")).toBeInTheDocument();
    });
  });

  test("handles close action", async () => {
    const handleClose = jest.fn();

    render(
      <Provider store={store}>
        <Settings handleClose={handleClose} />
      </Provider>
    );

    // Simulate clicking the Close button
    fireEvent.click(screen.getByText("Close"));

    // Check that the handleClose function was called
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test("handles error state when fetching settings fails", async () => {
    const error = new Error("Failed to fetch settings");
    getSettingsData.mockRejectedValue(error);

    render(
      <Provider store={store}>
        <Settings handleClose={jest.fn()} />
      </Provider>
    );

    // Check that the error message is displayed
    await act(async () => {
      expect(screen.getByText("Failed to fetch settings")).toBeInTheDocument();
    });
  });

  test("handles error state when updating settings fails", async () => {
    render(
      <Provider store={store}>
        <Settings handleClose={jest.fn()} />
      </Provider>
    );

    // Mock the API response for updateSettingsData
    const error = new Error("Failed to update settings");
    updateSettingsData.mockRejectedValue(error);

    // Simulate clicking the Save button
    fireEvent.click(screen.getByText("Save"));

    // Check that the error message is displayed
    await act(async () => {
      expect(screen.getByText("Failed to update settings")).toBeInTheDocument();
    });
  });
});








