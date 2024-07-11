import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MainTable from "./MainTable";
import moment from "moment";

describe("MainTable Component", () => {
  it("should open the AddEditDialog when Add button is clicked", () => {
    render(<MainTable />);
    const addButton = screen.getByText("Add");
    fireEvent.click(addButton);
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("should open the Edit dialog when Edit button is clicked", async () => {
    render(<MainTable />);
    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);
    await waitFor(() => {
      expect(screen.getByText("Edit")).toBeInTheDocument();
    });
  });

  it("should show snackbar with message when a new event is added", async () => {
    render(<MainTable />);
    // Assuming you have a way to simulate adding an event
    await waitFor(() => {
      expect(screen.getByText("new event added")).toBeInTheDocument();
    });
  });

  it("should show snackbar with message when an event is edited", async () => {
    render(<MainTable />);
    // Assuming you have a way to simulate editing an event
    await waitFor(() => {
      expect(screen.getByText("event edited success")).toBeInTheDocument();
    });
  });
});



import { render, screen, fireEvent } from "@testing-library/react";
import AddEditDialog from "./AddEditDialog";

describe("AddEditDialog Component", () => {
  it("should render Add dialog", () => {
    render(<AddEditDialog open={true} isEdit={false} />);
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("should render Edit dialog", () => {
    render(<AddEditDialog open={true} isEdit={true} />);
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  it("should call handleClose when cancel button is clicked", () => {
    const handleClose = jest.fn();
    render(<AddEditDialog open={true} handleClose={handleClose} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(handleClose).toHaveBeenCalled();
  });
});


import { render, screen, fireEvent } from "@testing-library/react";
import StepperForm from "./StepperForm";
import { FormProvider, useForm } from "react-hook-form";

const Wrapper = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("StepperForm Component", () => {
  it("should render Step 1 Form", () => {
    render(
      <Wrapper>
        <StepperForm />
      </Wrapper>
    );
    expect(screen.getByText("Step 1 Form")).toBeInTheDocument();
  });

  it("should go to next step when Next button is clicked", async () => {
    render(
      <Wrapper>
        <StepperForm />
      </Wrapper>
    );
    fireEvent.click(screen.getByText("Next"));
    await waitFor(() => {
      expect(screen.getByText("Step 2 Form")).toBeInTheDocument();
    });
  });

  it("should go back to previous step when Back button is clicked", async () => {
    render(
      <Wrapper>
        <StepperForm />
      </Wrapper>
    );
    fireEvent.click(screen.getByText("Next"));
    await waitFor(() => {
      expect(screen.getByText("Step 2 Form")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText("Back"));
    await waitFor(() => {
      expect(screen.getByText("Step 1 Form")).toBeInTheDocument();
    });
  });

  it("should submit the form when Save button is clicked", async () => {
    const handleSubmit = jest.fn();
    render(
      <Wrapper>
        <StepperForm onSubmit={handleSubmit} />
      </Wrapper>
    );
    fireEvent.click(screen.getByText("Next"));
    fireEvent.click(screen.getByText("Save"));
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});



import { render, screen, fireEvent } from "@testing-library/react";
import Step1Form from "./Step1Form";
import { FormProvider, useForm } from "react-hook-form";

const Wrapper = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("Step1Form Component", () => {
  it("should render form fields", () => {
    render(
      <Wrapper>
        <Step1Form />
      </Wrapper>
    );
    expect(screen.getByLabelText("ID")).toBeInTheDocument();
    expect(screen.getByLabelText("Cust ID")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
  });

  it("should validate date fields", async () => {
    render(
      <Wrapper>
        <Step1Form />
      </Wrapper>
    );
    fireEvent.change(screen.getByLabelText("Start Date"), {
      target: { value: "2023-01-01" },
    });
    fireEvent.change(screen.getByLabelText("End Date"), {
      target: { value: "2022-01-01" },
    });
    fireEvent.blur(screen.getByLabelText("End Date"));
    await waitFor(() => {
      expect(screen.getByText("End Date should be after Start Date")).toBeInTheDocument();
    });
  });

  it("should reset customerSubType if customerType changes", async () => {
    render(
      <Wrapper>
        <Step1Form />
      </Wrapper>
    );
    fireEvent.change(screen.getByLabelText("Customer Type"), {
      target: { value: "newType" },
    });
    await waitFor(() => {
      expect(screen.getByLabelText("Customer Sub Type").value).toBe("");
    });
  });
});
