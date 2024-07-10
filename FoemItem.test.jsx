import React from 'eact';
import { renderHook, act } from '@testing-library/react-hooks';
import { useFormContext } from 'eact-hook-form';
import { Controller } from 'eact-hook-form';
import FormItemControl from './FormItemControl';

jest.mock('react-hook-form', () => ({
  useFormContext: jest.fn(),
  Controller: jest.fn(),
}));

describe('FormItemControl', () => {
  const control = { onChange: jest.fn() };
  const name = 'test';
  const label = 'Test Label';
  const type = 'text';
  const options = ['option1', 'option2', 'option3'];
  const rules = { required: 'Test Error' };
  const isRequired = true;
  const isMultiline = false;
  const rows = 1;
  const isDisabled = false;
  const defaultValue = '';
  const isChecked = false;

  beforeEach(() => {
    useFormContext.mockReturnValue({
      clearErrors: jest.fn(),
    });
  });

  it('renders without crashing', () => {
    const { result } = renderHook(() => (
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
    ));

    expect(result.error).toBeUndefined();
  });

  //... other tests...
});




// FormItemControl.test.js
import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import FormItemControl from './FormItemControl';

jest.mock('react-hook-form', () => ({
  useFormContext: jest.fn(),
  Controller: jest.fn(),
}));

describe('FormItemControl', () => {
  const control = { onChange: jest.fn() };
  const name = 'test';
  const label = 'Test Label';
  const type = 'text';
  const options = ['option1', 'option2','option3'];
  const rules = { required: 'Test Error' };
  const isRequired = true;
  const isMultiline = false;
  const rows = 1;
  const isDisabled = false;
  const defaultValue = '';
  const isChecked = false;

  beforeEach(() => {
    useFormContext.mockReturnValue({
      clearErrors: jest.fn(),
    });
  });

  it('renders without crashing', () => {
    const { result } = renderHook(() => (
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
    ));

    expect(result.error).toBeUndefined();
  });

  it('renders the correct input type', () => {
    const { result } = renderHook(() => (
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
    ));

    const input = result.current.querySelector('input');
    expect(input.type).toBe(type);
  });

  it('renders the correct number of rows', () => {
    const { result } = renderHook(() => (
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
    ));

    const textarea = result.current.querySelector('textarea');
    expect(textarea.rows).toBe(rows.toString());
  });

  it('renders the correct options', () => {
    const { result } = renderHook(() => (
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
    ));

    const select = result.current.querySelector('select');
    options.forEach((option) => {
      expect(select).toHaveOption(option, option);
    });
  });

  it('renders the correct label', () => {
    const { result } = renderHook(() => (
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
    ));

    const labelElement = result.current.querySelector('label');
    expect(labelElement.textContent).toBe(label);
  });

  it('renders the correct error message', () => {
    const { result } = renderHook(() => (
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
    ));

    const errorElement = result.current.querySelector('.MuiFormHelperText-root');
    expect(errorElement.textContent).toBe(rules.required);
  });

  it('calls the onChange function when the input value changes', () => {
    const { result } = renderHook(() => (
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
    ));

    const input = result.current.querySelector('input');
    act(() => {
      input.value = 'test';
      fireEvent.change(input);
    });

    expect(control.onChange).toHaveBeenCalledTimes(1);
    expect(control.onChange).toHaveBeenCalledWith('test');
  });

  it('calls the onChange function when the switch is toggled', () => {
    const { result } = renderHook(() => (
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
    ));

    const switchInput = result.current.querySelector('input[type="checkbox"]');
    act(() => {
      fireEvent.click(switchInput);
    });

    expect(control.onChange).toHaveBeenCalledTimes(1);
    expect(control.onChange).toHaveBeenCalledWith(true);
  });

  it('calls the onChange function when a date is selected', () => {
    const { result } = renderHook(() => (
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
    ));

    const datePicker = result.current.querySelector('input[type="date"]');
    act(() => {
      datePicker.value = '2022-01-01';
      fireEvent.change(datePicker);
    });

    expect(control.onChange).toHaveBeenCalledTimes(1);
    expect(control.onChange).toHaveBeenCalledWith(new Date('2022-01-01'));
  });

  it('calls the onChange function when a select option is selected', () => {
    const { result } = renderHook(() => (
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
    ));

    const select = result.current.querySelector('select');
    act(() => {
      select.value = options[1];
      fireEvent.change(select);
    });

    expect(control.onChange).toHaveBeenCalledTimes(1);
    expect(control.onChange).toHaveBeenCalledWith(options[1]);
  });
});
