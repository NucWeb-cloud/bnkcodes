import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Data1 from "../components/Data1";
import "@testing-library/jest-dom";

describe("Test cases for Data1", () => {
  beforeEach(() => {
    global.fetch = jest.fn(); // ✅ Manually mock fetch before each test
  });

  test("should render component correctly", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        users: [
          { id: 1, firstName: "Emily", birthDate: "1996-5-30" },
          { id: 2, firstName: "Michael", birthDate: "1989-8-10" },
        ],
      }),
    });

    render(<Data1 />);
    // expect(screen.getByText(/SEARCH FUNCTIONALITY/i)).toBeInTheDocument();
    // expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Emily - 1996-5-30/i)).toBeInTheDocument();
    });
    await waitFor(()=>{
    expect(screen.getByText(/Michael - 1989-8-10/i)).toBeInTheDocument();
   });
  });

  test("should delete a user", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        users: [{ id: 1, firstName: "Emily", birthDate: "1996-5-30" }],
      }),
    });

    render(<Data1 />);

    await waitFor(() => {
      expect(screen.getByText(/Emily - 1996-5-30/i)).toBeInTheDocument();
    });

    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText(/Emily - 1996-5-30/i)).not.toBeInTheDocument();
    });
  });

  test("should edit a user", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        users: [{ id: 1, firstName: "Emily", birthDate: "1996-5-30" }],
      }),
    });

    render(<Data1 />);

    await waitFor(() => {
      expect(screen.getByText(/Emily - 1996-5-30/i)).toBeInTheDocument();
    });

    const editButton = screen.getByText(/Edit/i);
    fireEvent.click(editButton);

    const editInput = screen.getByDisplayValue("Emily");
    fireEvent.change(editInput, { target: { value: "Arbaz" } });

    const saveButton = screen.getByText(/Save/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText(/Arbaz - 1996-5-30/i)).toBeInTheDocument();
    });
  });

//   test("should show loading state", async () => {
//     global.fetch.mockResolvedValueOnce({
//       ok: true,
//       json: async () => ({ users: [] }),
//     });

//     render(<Data1 />);
//     expect(screen.getByText(/Loading/i)).toBeInTheDocument();
//   });

  test("should show error state", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Network failed"));

    render(<Data1 />);

    await waitFor(() => {
      expect(screen.getByText(/Error: Network failed/i)).toBeInTheDocument();
    });
  });
});
