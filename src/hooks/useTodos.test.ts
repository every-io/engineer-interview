import { act } from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import useTodos from "./useTodos";
import * as utils from "../utils";

// Mock the utils module to control UUID generation
vi.mock("../utils", async () => {
  const actual = await vi.importActual("../utils");
  return {
    ...actual,
    newUUID: vi.fn(),
  };
});

describe("useTodos", () => {
  let mockUUIDCounter = 0;

  beforeEach(() => {
    mockUUIDCounter = 0;
    // Reset and setup mock UUID generator
    vi.mocked(utils.newUUID).mockImplementation(() => {
      return `mock-uuid-${mockUUIDCounter++}`;
    });
  });

  describe("initialization", () => {
    it("should initialize categories from provided category names", () => {
      const categoryNames = ["Work", "Personal", "Shopping"];
      const { result } = renderHook(() => useTodos(categoryNames));

      expect(result.current.categories).toHaveLength(3);
      expect(result.current.categories[0].name).toBe("Work");
      expect(result.current.categories[1].name).toBe("Personal");
      expect(result.current.categories[2].name).toBe("Shopping");
    });

    it("should generate unique IDs for categories", () => {
      const { result } = renderHook(() => useTodos(["Work", "Personal"]));

      const categoryIds = result.current.categories.map((cat) => cat.id);
      const uniqueIds = new Set(categoryIds);
      expect(uniqueIds.size).toBe(categoryIds.length);
    });

    it("should handle empty category names array", () => {
      const { result } = renderHook(() => useTodos([]));

      expect(result.current.categories).toEqual([]);
      expect(result.current.todos).toEqual([]);
    });
  });

  describe("createTodo", () => {
    it("should create a new todo with the given name", () => {
      const { result } = renderHook(() =>
        useTodos(["Work", "Personal", "Shopping"])
      );

      act(() => {
        result.current.createTodo("Buy groceries");
      });

      expect(result.current.todos).toHaveLength(1);
      expect(result.current.todos[0].name).toBe("Buy groceries");
    });

    it("should assign new todo to the first category", () => {
      const { result } = renderHook(() =>
        useTodos(["Work", "Personal", "Shopping"])
      );

      const firstCategoryId = result.current.categories[0].id;

      act(() => {
        result.current.createTodo("Complete task");
      });

      expect(result.current.todos[0].categoryId).toBe(firstCategoryId);
    });

    it("should generate unique IDs for todos", () => {
      const { result } = renderHook(() => useTodos(["Work"]));

      act(() => {
        result.current.createTodo("Task 1");
        result.current.createTodo("Task 2");
        result.current.createTodo("Task 3");
      });

      const todoIds = result.current.todos.map((todo) => todo.id);
      const uniqueIds = new Set(todoIds);
      expect(uniqueIds.size).toBe(todoIds.length);
    });

    it("should create multiple todos", () => {
      const { result } = renderHook(() => useTodos(["Work"]));

      act(() => {
        result.current.createTodo("Task 1");
      });

      act(() => {
        result.current.createTodo("Task 2");
      });

      act(() => {
        result.current.createTodo("Task 3");
      });

      expect(result.current.todos).toHaveLength(3);
      expect(result.current.todos[0].name).toBe("Task 1");
      expect(result.current.todos[1].name).toBe("Task 2");
      expect(result.current.todos[2].name).toBe("Task 3");
    });

    it("should throw error when no categories exist", () => {
      const { result } = renderHook(() => useTodos([]));

      expect(() => {
        act(() => {
          result.current.createTodo("Task without category");
        });
      }).toThrow("No initial category found");
    });

    it("should handle empty todo name", () => {
      const { result } = renderHook(() => useTodos(["Work"]));

      act(() => {
        result.current.createTodo("");
      });

      expect(result.current.todos).toHaveLength(1);
      expect(result.current.todos[0].name).toBe("");
    });

    it("should handle todo names with special characters", () => {
      const { result } = renderHook(() => useTodos(["Work"]));

      const specialName = "Task with @#$%^&*() characters!";

      act(() => {
        result.current.createTodo(specialName);
      });

      expect(result.current.todos[0].name).toBe(specialName);
    });
  });

  describe("getCategoryItems", () => {
    it("should return empty array for category with no todos", () => {
      const { result } = renderHook(() =>
        useTodos(["Work", "Personal", "Shopping"])
      );

      const categoryId = result.current.categories[0].id;
      const items = result.current.getCategoryItems(categoryId);

      expect(items).toEqual([]);
    });

    it("should return todos for a specific category", () => {
      const { result } = renderHook(() =>
        useTodos(["Work", "Personal", "Shopping"])
      );

      const firstCategoryId = result.current.categories[0].id;

      act(() => {
        result.current.createTodo("Task 1");
      });

      act(() => {
        result.current.createTodo("Task 2");
      });

      const items = result.current.getCategoryItems(firstCategoryId);

      expect(items).toHaveLength(2);
      expect(items[0].name).toBe("Task 1");
      expect(items[1].name).toBe("Task 2");
    });

    it("should return empty array for non-existent category", () => {
      const { result } = renderHook(() => useTodos(["Work"]));

      act(() => {
        result.current.createTodo("Task 1");
      });

      const items = result.current.getCategoryItems("non-existent-id");

      expect(items).toEqual([]);
    });

    it("should return empty array for undefined category", () => {
      const { result } = renderHook(() => useTodos(["Work"]));

      const items = result.current.getCategoryItems("undefined-category");

      expect(items).toEqual([]);
    });

    it("should correctly separate todos by category", () => {
      const { result } = renderHook(() =>
        useTodos(["Work", "Personal", "Shopping"])
      );

      const workCategoryId = result.current.categories[0].id;
      const personalCategoryId = result.current.categories[1].id;
      const shoppingCategoryId = result.current.categories[2].id;

      // Manually create todos in different categories
      act(() => {
        result.current.createTodo("Work task 1");
      });

      act(() => {
        result.current.createTodo("Work task 2");
      });

      // At this point all todos are in the first category (Work)
      const workItems = result.current.getCategoryItems(workCategoryId);
      const personalItems = result.current.getCategoryItems(personalCategoryId);
      const shoppingItems = result.current.getCategoryItems(shoppingCategoryId);

      expect(workItems).toHaveLength(2);
      expect(personalItems).toHaveLength(0);
      expect(shoppingItems).toHaveLength(0);
    });
  });
});

