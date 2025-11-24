import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import TaskForm from "@/app/(protected)/(tasks)/task-form";

jest.mock("@/app/(protected)/(tasks)/actions", () => ({
  createTask: jest.fn(async (prevState, formData) => {
    // fake behavior for tests
    return {
      success: true,
      message: "Created from test",
      version: (prevState?.version ?? 0) + 1,
    };
  }),
}));

import { deleteTask } from "@/app/(protected)/(tasks)/actions";
import TaskItem from "@/components/TaskItem";

jest.mock("@/app/(protected)/(tasks)/actions", () => ({
  deleteTask: jest.fn(),
}));

jest.mock("next/navigation", () => {
  const actual = jest.requireActual("next/navigation");
  return {
    ...actual,
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      prefetch: jest.fn(),
    }),
  };
});

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("task form", () => {
  test("test input title", async () => {
    const addOptimisticTask = jest.fn();
    render(<TaskForm addOptimisticTask={addOptimisticTask} />);

    const input = screen.getByRole("textbox", { name: /title/i });

    fireEvent.change(input, { target: { value: "This is title" } });

    expect(input).toHaveValue("This is title");

    const form = input.closest("form")!;

    expect(form).toBeInTheDocument();

    // await act(async () => {
    //   fireEvent.submit(form);
    // });

    // await waitFor(() => {
    //   expect(input).toHaveValue("");
    // });
  });

  test("delete task", async () => {
    const onDeleted = jest.fn();
    render(
      <TaskItem
        task={{
          id: "1",
          title: "new task",
          description: "",
          priority: 1,
          done: true,
          updatedAt: new Date(),
        }}
        onOptimisticDelete={onDeleted}
      />
    );

    fireEvent.click(screen.getByText(/delete/i));

    await waitFor(() => {
      expect(deleteTask).toHaveBeenCalledTimes(1);
      expect(deleteTask).toHaveBeenCalledWith("1");
    });

    expect(onDeleted).toHaveBeenCalledWith("1");
  });
});
