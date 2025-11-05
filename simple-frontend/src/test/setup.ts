import "@testing-library/jest-dom";
import { vi } from "vitest";

declare var global: {
  fetch: typeof fetch;
};

global.fetch = vi.fn().mockResolvedValue({
  json: () => Promise.resolve([]),
}) as any;
