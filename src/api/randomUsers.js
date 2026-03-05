export const randomUsers = async () => {
  const response = await fetch("http://localhost:8080/api/");
  const data = await response.json();
  return data;
};