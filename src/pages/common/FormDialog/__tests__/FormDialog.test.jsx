import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormDialog from "../FormDialog";

const setup = () => {
  const onSubmit = jest.fn();
  const utils = render(
    <FormDialog
      onSubmit={onSubmit}
      formValues={null}
      onStatusChange={jest.fn}
      edit={false}
    />
  );
  const input = screen.getByTestId("create-task");
  return {
    input,
    onSubmit,
    ...utils,
  };
};

test("Create a new task", async () => {
  const { input, onSubmit } = setup();
  // opens up the form from create task button
  fireEvent.click(input);

  // changes task status from todo(default) to inprogress
  const selectInput = screen.getByTestId("status");
  fireEvent.click(selectInput, {
    target: { value: "inprogress" },
  });
  expect(selectInput.value).toBe("inprogress");

  // Changes task name to demo task
  const nameInput = screen.getByTestId("name");
  fireEvent.change(nameInput, { target: { value: "demo task", id: "name" } });
  expect(nameInput.value).toBe("demo task");

  // Changes task name to demo description
  const descriptionInput = screen.getByTestId("description");
  fireEvent.change(descriptionInput, {
    target: { value: "demo description", id: "description" },
  });
  expect(descriptionInput.value).toBe("demo description");

  // Changes task deadline to 5 days from current date
  const date = new Date();
  date.setDate(date.getDate() + 5);
  const [dateStr] = date.toISOString().split("T");
  const deadlineInput = screen.getByTestId("deadline");
  fireEvent.change(deadlineInput, {
    target: { value: dateStr, id: "deadline" },
  });
  expect(deadlineInput.value).toBe(dateStr);

  // uploads mock png file
  global.URL.createObjectURL = jest.fn();
  const fakeFile = new File(["(⌐□_□)"], "chucknorris.png", {
    type: "image/png",
  });
  const fileInput = screen.getByTestId("images");
  userEvent.upload(fileInput, fakeFile);
  expect(fileInput.files[0]).toStrictEqual(fakeFile);
  expect(fileInput.files).toHaveLength(1);

  // Clicks Create button
  const submitButton = screen.getByTestId("submit");
  fireEvent.click(submitButton);
  expect(onSubmit).toHaveBeenCalledTimes(1);

});
