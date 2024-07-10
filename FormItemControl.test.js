// FormItemControl.test.js
import React from "react";
import { render, fireEvent, getByText, getByLabelText } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import FormItemControl from "./FormItemControl";

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn(),
}));

describe("FormItemControl", () => {
  const control = { onChange: jest.fn() };
  const name = "test";
  const label = "Test Label";
  const type = "text";
  const options = ["option1", "option2", "option3"];
  const rules = { required: "Test Error" };
  const isRequired= true;
  const isMultiline = false;
  const rows = 1;
  const isDisabled = false;
  const defaultValue = "";
  const isChecked = false;

  beforeEach(() => {
    useFormContext.mockReturnValue({
      clearErrors: jest.fn(),
    });
  });

  it("renders without crashing", () => {
    const { getByText } = render(
      <FormItemControl
        control={control}
        name={name}
        label={label}
        type={type}
        options={options}
        rules={rules}
        isRequired={isRequired}
        isMultiline={isMultiline}
        rows={rows}
        isDisabled={isDisabled}
        defaultValue={defaultValue}
        isChecked={isChecked}
      />
    );
    expect(getByText("")).toBeInTheDocument();
  });

  it("renders the correct input type", () => {
    const { getByLabelText } = render(
      <FormItemControl
        control={control}
        name={name}
        label={label}
        type={type}
        options={options}
        rules={rules}
        isRequired={isRequired}
        isMultiline={isMultiline}
        rows={rows}
        isDisabled={isDisabled}
        defaultValue={defaultValue}
        isChecked={isChecked}
      />
    );
    expect(getByLabelText(label)).toHaveAttribute("type", type);
  });

  it("renders the correct number of rows", () => {
    const { getByLabelText } = render(
      <FormItemControl
        control={control}
        name={name}
        label={label}
        type={type}
        options={options}
        rules={rules}
        isRequired={isRequired}
        isMultiline={true}
        rows={rows}
        isDisabled={isDisabled}
        defaultValue={defaultValue}
        isChecked={isChecked}
      />
    );
    expect(getByLabelText(label)).toHaveAttribute("rows", rows.toString());
  });

  it("renders the correct options", () => {
    const { getByLabelText } = render(
      <FormItemControl
        control={control}
        name={name}
        label={label}
        type="select"
        options={options}
        rules={rules}
        isRequired={isRequired}
        isMultiline={isMultiline}
        rows={rows}
        isDisabled={isDisabled}
        defaultValue={defaultValue}
        isChecked={isChecked}
      />
    );
    const select = getByLabelText(label);
    options.forEach((option) => {
      expect(select).toHaveOption(option, option);
    });
  });

  it("renders the correct label", () => {
    const { getByText } = render(
      <FormItemControl
        control={control}
        name={name}
        label={label}
        type={type}
        options={options}
        rules={rules}
        isRequired={isRequired}
        isMultiline={isMultiline}
        rows={rows}
        isDisabled={isDisabled}
        defaultValue={defaultValue}
        isChecked={isChecked}
      />
    );
    expect(getByText(label)).toBeInTheDocument();
  });

  it("renders the correct error message", () => {
    const { getByText } = render(
      <FormItemControl
        control={control}
        name={name}
        label={label}
        type={type}
        options={options}
        rules={rules}
        isRequired={isRequired}
        isMultiline={isMultiline}
        rows={rows}
        isDisabled={isDisabled}
        defaultValue={defaultValue}
        isChecked={isChecked}
      />
    );
    expect(getByText(rules.required)).toBeInTheDocument();
  });

  it("calls the onChange function when the input value changes", () => {
    const { getByLabelText } = render(
      <FormItemControl
        control={control}
        name={name}
        label={label}
        type={type}
        options={options}
        rules={rules}
        isRequired={isRequired}
        isMultiline={isMultiline}
        rows={rows}
        isDisabled={isDisabled}
        defaultValue={defaultValue}
        isChecked={isChecked}
      />
    );
    const input = getByLabelText(label);
    fireEvent.change(input, { target: { value: "test" } });
    expect(control.onChange).toHaveBeenCalledWith("test");
  });

  it("calls the onChange function when the switch is toggled", () => {
    const { getByLabelText } = render(
      <FormItemControl
        control={control}
        name={name}
        label={label}
        type="switch"
        options={options}
        rules={rules}
        isRequired={isRequired}
        isMultiline={isMultiline}
        rows={rows}
        isDisabled={isDisabled}
        defaultValue={defaultValue}
        isChecked={isChecked}
      />
    );
    const switchInput = getByLabelText(label);
    fireEvent.click(switchInput);
    expect(control.onChange).toHaveBeenCalledWith(true);
  });

  it("calls the onChange function when a date is selected", () => {
    const { getByLabelText } = render(
      <FormItemControl
       control={control}
        name={name}
        label={label}
        type="date"
        options={options}
        rules={rules}
        isRequired={isRequired}
        isMultiline={isMultiline}
        rows={rows}
        isDisabled={isDisabled}
        defaultValue={defaultValue}
        isChecked={isChecked}
      />
    );
    const datePicker = getByLabelText(label);
    fireEvent.click(datePicker);
    fireEvent.click(getByText("Today"));
    expect(control.onChange).toHaveBeenCalledWith(expect.any(Date));
  });

  it("calls the onChange function when a select option is selected", () => {
    const { getByLabelText } = render(
      <FormItemControl
        control={control}
        name={name}
        label={label}
        type="select"
        options={options}
        rules={rules}
        isRequired={isRequired}
        isMultiline={isMultiline}
        rows={rows}
        isDisabled={isDisabled}
        defaultValue={defaultValue}
        isChecked={isChecked}
      />
    );
    const select = getByLabelText(label);
    fireEvent.change(select, { target: { value: options[1] } });
    expect(control.onChange).toHaveBeenCalledWith(options[1]);
  });
});
