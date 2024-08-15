import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import RuleSettings from "./RuleSettings";
import userReducer from "../../redux/userSlice"; // Your user slice
import cpfThresholdList from "../../api/cpfThresholdList"; // Your API service
import cpfAddRule from "../../api/cpfAddRule"; // Your API service
import cpfEdit from "../../api/cpfEdit"; // Your API service
import cpfDelete from "../../api/cpfDelete"; // Your API service

// Mock APIs
jest.mock("../../api/cpfThresholdList");
jest.mock("../../api/cpfAddRule");
jest.mock("../../api/cpfEdit");
jest.mock("../../api/cpfDelete");

// Mock store
const store = configureStore({
  reducer: {
    userprofiledata: userReducer,
  },
});

describe("RuleSettings Component", () => {
  beforeEach(() => {
    cpfThresholdList.mockResolvedValue({ results: [] });
    cpfAddRule.mockResolvedValue({});
    cpfEdit.mockResolvedValue({});
    cpfDelete.mockResolvedValue({});
  });

  test("renders component without crashing", async () => {
    render(
      <Provider store={store}>
        <RuleSettings />
      </Provider>
    );

    // Check if the loader is initially displayed
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("displays customer options and fetches data", async () => {
    // Mock customer options
    const mockCustomerOptions = ["Customer 1", "Customer 2"];
    store.dispatch({
      type: "userprofiledata/setUserData",
      payload: { customers: mockCustomerOptions },
    });

    render(
      <Provider store={store}>
        <RuleSettings />
      </Provider>
    );

    await waitFor(() => {
      const dropdown = screen.getByRole("combobox");
      expect(dropdown).toBeInTheDocument();
      expect(screen.getByText("Customer 1")).toBeInTheDocument();
    });

    expect(cpfThresholdList).toHaveBeenCalledWith("Customer 1");
  });

  test("opens Add Rule dialog", async () => {
    render(
      <Provider store={store}>
        <RuleSettings />
      </Provider>
    );

    // Click on the Add button
    const addButton = screen.getByText("Add");
    userEvent.click(addButton);

    // Check if the dialog opened
    await waitFor(() => {
      expect(screen.getByText("Add New Threshold Rule")).toBeInTheDocument();
    });
  });

  test("submits form in Add mode", async () => {
    render(
      <Provider store={store}>
        <RuleSettings />
      </Provider>
    );

    // Open Add dialog
    userEvent.click(screen.getByText("Add"));

    // Fill out the form fields
    userEvent.type(screen.getByLabelText("Field 1"), "Test Value");

    // Submit the form
    const saveButton = screen.getByText("Save");
    userEvent.click(saveButton);

    await waitFor(() => {
      expect(cpfAddRule).toHaveBeenCalledTimes(1);
      expect(screen.queryByText("Add New Threshold Rule")).not.toBeInTheDocument();
    });
  });

  test("handles Edit rule and saves changes", async () => {
    render(
      <Provider store={store}>
        <RuleSettings />
      </Provider>
    );

    // Mock existing data for editing
    const mockData = { id: 1, field1: "Value 1" };
    cpfThresholdList.mockResolvedValueOnce({ results: [mockData] });

    // Click on Edit button
    userEvent.click(screen.getByText("Edit"));

    // Ensure form is populated with existing data
    expect(screen.getByLabelText("Field 1")).toHaveValue("Value 1");

    // Modify data
    userEvent.clear(screen.getByLabelText("Field 1"));
    userEvent.type(screen.getByLabelText("Field 1"), "Updated Value");

    // Submit changes
    const saveChangesButton = screen.getByText("Save Changes");
    userEvent.click(saveChangesButton);

    await waitFor(() => {
      expect(cpfEdit).toHaveBeenCalledTimes(1);
      expect(screen.queryByText("Edit Threshold Rule")).not.toBeInTheDocument();
    });
  });

  test("handles Delete rule confirmation", async () => {
    render(
      <Provider store={store}>
        <RuleSettings />
      </Provider>
    );

    // Mock existing data for deletion
    const mockData = { id: 1, field1: "Value 1" };
    cpfThresholdList.mockResolvedValueOnce({ results: [mockData] });

    // Click on Delete button
    userEvent.click(screen.getByText("Delete"));

    // Confirm deletion
    const confirmDeleteButton = screen.getByText("Confirm");
    userEvent.click(confirmDeleteButton);

    await waitFor(() => {
      expect(cpfDelete).toHaveBeenCalledTimes(1);
      expect(screen.queryByText("Delete Threshold Rule")).not.toBeInTheDocument();
    });
  });

  test("handles API errors gracefully", async () => {
    cpfThresholdList.mockRejectedValueOnce(new Error("API Error"));

    render(
      <Provider store={store}>
        <RuleSettings />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Error loading data")).toBeInTheDocument();
    });
  });
});
