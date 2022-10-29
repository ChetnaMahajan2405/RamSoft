import { renderHook, act } from "@testing-library/react-hooks";
import useForm, { initialFormValues } from "../useForm";

test("should use form", () => {
  const { result } = renderHook(() => useForm({}, jest.fn));

  expect(JSON.stringify(result.current.values)).toBe(
    JSON.stringify(initialFormValues)
  );
  expect(JSON.stringify(result.current.errors)).toBe(JSON.stringify({}));
  expect(typeof result.current.handleInputValue).toBe("function");
  expect(typeof result.current.handleAddAttachments).toBe("function");
  expect(typeof result.current.handleRemoveAttachments).toBe("function");
  expect(typeof result.current.handleStatusChange).toBe("function");
  expect(typeof result.current.handleClearForm).toBe("function");
  expect(typeof result.current.formIsValid).toBe("function");
  expect(typeof result.current.setValues).toBe("function");
  expect(typeof result.current.validate).toBe("function");
});

test("should use form for handleInputValue", () => {
  const { result } = renderHook(() => useForm({}, jest.fn));
  expect(JSON.stringify(result.current.values)).toBe(
    JSON.stringify(initialFormValues)
  );
  act(() => {
    result.current.handleInputValue({ target: { value: "test", id: "name" } });
  });
  expect(JSON.stringify(result.current.values)).toBe(
    JSON.stringify({ ...initialFormValues, name: "test" })
  );
});

test("should use form for validate", () => {
  const { result } = renderHook(() => useForm({ name: "" }, jest.fn));
  expect(JSON.stringify(result.current.values)).toBe(
    JSON.stringify({ ...initialFormValues, name: "" })
  );
  act(() => {
    result.current.validate();
  });
  expect(JSON.stringify(result.current.errors)).toBe(
    JSON.stringify({
      name: "This field is required.",
      description: "This field is required.",
      deadline: "This field is required.",
    })
  );

  act(() => {
    result.current.formIsValid();
  });
});
