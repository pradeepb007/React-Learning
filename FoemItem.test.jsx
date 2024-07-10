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
