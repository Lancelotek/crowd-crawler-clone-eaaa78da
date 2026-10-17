import { beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import QuizResultActions from "@/components/mva/QuizResultActions";
import { quizBookingUrl } from "@/content/quizResultCopy";
const invoke = vi.hoisted(() => vi.fn());
vi.mock("@/integrations/supabase/client", () => ({ supabase: { functions: { invoke } } }));
beforeEach(() => { cleanup(); invoke.mockReset(); localStorage.clear(); });
describe("Quiz result actions", () => {
  it("passes typed name and email only to the localized booking page", () => {
    expect(quizBookingUrl("pl", " Anna ", "anna+quiz@example.com")).toBe("/pl/book?name=Anna&email=anna%2Bquiz%40example.com");
    expect(quizBookingUrl("en")).toBe("/en/book");
  });
  it("keeps consent unticked and blocks submission without it", () => {
    render(<MemoryRouter><QuizResultActions lang="en" count={1200} answers={{}} /></MemoryRouter>);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    expect(screen.getByRole("button")).toBeDisabled();
    fireEvent.click(screen.getByRole("button"));
    expect(invoke).not.toHaveBeenCalled();
  });
  it("disables submission while pending and never shows success for a failed request", async () => {
    let resolve: ((value: unknown) => void) | undefined;
    invoke.mockImplementation(() => new Promise(r => { resolve = r; }));
    render(<MemoryRouter><QuizResultActions lang="en" count={1200} answers={{}} /></MemoryRouter>);
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Alex" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "alex@example.com" } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toBeDisabled();
    resolve?.({ data: null, error: new Error("failed") });
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
    expect(screen.queryByRole("status")).toBeNull();
  });
});