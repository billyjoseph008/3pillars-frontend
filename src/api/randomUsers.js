import { request } from "./client";

export function getRandomUsers() {
  return request("/api/");
}

export function getRandomUserById(id) {
  return request(`/api/${id}`);
}

export function createRandomUser(payload) {
  return request("/api/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateRandomUser(id, payload) {
  return request(`/api/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteRandomUser(id) {
  return request(`/api/${id}`, {
    method: "DELETE",
  });
}