import { useState, useEffect } from "react";

export function useLocalStorage(key) {
  const [storedValue, setStoredValue] = useState(() => {
    return localStorage.getItem(key);
  });

  useEffect(() => {
    const handleStorageChange = () => {
      console.log(key);
      setStoredValue(localStorage.getItem(key));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return storedValue;
}
