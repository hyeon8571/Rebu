// src/utils/auth.js
export function isAuthenticated() {
  const accessToken = localStorage.getItem("access");
  return !!accessToken; // returns true if token exists, otherwise false
}
