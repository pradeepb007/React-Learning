it("updates stepErrors correctly on validation failure", async () => {
  render(
    <Provider store={store}>
      <StepperForm handleClose={handleClose} />
    </Provider>
  );

  // Simulate validation failure
  fireEvent.click(screen.getByText("Next"));

  // Assert that stepErrors state is updated
  await waitFor(() => {
    expect(screen.getByText("Personal Information")).toHaveAttribute(
      "error",
      "true"
    );
  });
});

it("changes active step correctly on step label click", async () => {
  render(
    <Provider store={store}>
      <StepperForm handleClose={handleClose} />
    </Provider>
  );

  // Simulate clicking on a step label
  fireEvent.click(screen.getByText("Contact Details"));

  // Assert that active step is updated
  await waitFor(() => {
    expect(screen.getByText("Contact Details")).toHaveAttribute(
      "active",
      "true"
    );
  });
});

it("correctly identifies steps with errors and displays error messages", async () => {
  render(
    <Provider store={store}>
      <StepperForm handleClose={handleClose} />
    </Provider>
  );

  // Simulate validation errors
  fireEvent.click(screen.getByText("Next"));

  // Assert that error fields are correctly identified
  await waitFor(() => {
    expect(screen.getByText("Personal Information")).toHaveAttribute(
      "error",
      "true"
    );

    // Check if error messages are displayed in the UI
    expect(screen.getByText("Error Step 1")).toBeInTheDocument();
  });
});
