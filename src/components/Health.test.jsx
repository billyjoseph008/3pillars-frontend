import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Health from "./Health";

vi.mock("../api/client", () => ({
  api: {
    get: vi.fn(),
  },
}));

import { api } from "../api/client";

describe("Health", () => {
  it("renders ok when api returns status", async () => {
    api.get.mockResolvedValue({ status: "ok" });

    render(<Health />);

    expect(await screen.findByText(/Backend status: ok/i)).toBeInTheDocument();
  });

  it("renders error on failure", async () => {
    api.get.mockRejectedValue(new Error("boom"));

    render(<Health />);

    expect(await screen.findByText(/Backend status: error/i)).toBeInTheDocument();
  });
});