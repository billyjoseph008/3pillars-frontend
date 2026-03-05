import { request } from "./client";

export function getSteps() {
  return request("/api/steps");
}

export function regenerateSteps() {
  return request("/api/steps/regenerate", { method: "POST" });
}