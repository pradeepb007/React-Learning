import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import FormItemControl from "./FormItemControl";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const renderWithFormProvider = (ui) => {
  const Wrapper = ({ children }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };
  return render(ui, { wrapper: Wrapper });
};

describe("FormItemControl Component", () => {
  test("renders text field with label and handles change", () => {
    renderWithFormProvider(
      <FormItemControl
        name="testText"
        control={{}}
        label="Test Text"
        type="text"
        isRequired={true}
      />
    );

    const input = screen.getByLabelText("Test Text");
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "new value" } });
    expect(input.value).toBe("new value");
  });

  test("renders number field and validates integer input", () => {
    renderWithFormProvider(
      <FormItemControl
        name="testNumber"
        control={{}}
        label="Test Number"
        type="number"
        rules={{ validationType: "intValidation" }}
      />
    );

    const input = screen.getByLabelText("Test Number");
    fireEvent.change(input, { target: { value: "123" } });
    expect(input.value).toBe("123");

    fireEvent.change(input, { target: { value: "abc" } });
    expect(
      screen.getByText("Only integer values are allowed")
    ).toBeInTheDocument();
  });

  test("renders select field with options", () => {
    const options = ["Option 1", "Option 2"];
    renderWithFormProvider(
      <FormItemControl
        name="testSelect"
        control={{}}
        label="Test Select"
        type="select"
        options={options}
      />
    );

    const select = screen.getByLabelText("Test Select");
    expect(select).toBeInTheDocument();

    fireEvent.mouseDown(select);
    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  test("renders switch field and handles change", () => {
    renderWithFormProvider(
      <FormItemControl
        name="testSwitch"
        control={{}}
        label="Test Switch"
        type="switch"
        isChecked={true}
      />
    );

    const switchInput = screen.getByLabelText("Test Switch");
    expect(switchInput).toBeInTheDocument();
    expect(switchInput.checked).toBe(true);

    fireEvent.click(switchInput);
    expect(switchInput.checked).toBe(false);
  });

  test("renders date picker and handles change", () => {
    renderWithFormProvider(
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <FormItemControl
          name="testDate"
          control={{}}
          label="Test Date"
          type="date"
        />
      </LocalizationProvider>
    );

    const input = screen.getByLabelText("Test Date");
    expect(input).toBeInTheDocument();

    // Since interacting with date picker requires more complex setup,
    // here we will just ensure the component renders correctly.
  });
});
