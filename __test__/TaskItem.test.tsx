import TaskItem from "@/components/TaskItem";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

jest.mock("@/lib/supabase/server", () => ({
  createServerSupabase: jest.fn(),
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

describe("UserInfo", () => {
  const mockDelete = jest.fn();
  test("initial render", () => {
    render(
      <TaskItem
        task={{
          id: "1",
          title: "tes",
          priority: 2,
          done: false,
          updatedAt: new Date(),
        }}
        onOptimisticDelete={mockDelete}
      />,
    );

    expect(screen.getByText("tes")).toBeInTheDocument(); // title
    expect(screen.getByText(/Priority:/i)).toBeInTheDocument();
  });

  test("toggles checkbox", async () => {
    const user = userEvent.setup();

    render(
      <TaskItem
        task={{
          id: "1",
          title: "tes",
          priority: 2,
          done: false,
          updatedAt: new Date(),
        }}
        onOptimisticDelete={mockDelete}
      />,
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
  });
});
