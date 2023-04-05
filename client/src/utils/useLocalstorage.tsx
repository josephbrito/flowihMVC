import { useState, useEffect } from "react";
import { IUser } from "../context/types";

function getStorageValue(key: string, defaultValue: IUser) {
  const saved = localStorage.getItem(key);

  if (saved) {
    const initial = JSON.parse(saved);
    return initial;
  } else {
    return defaultValue;
  }
}

export function useLocalstorage(key: string, defaultValue: IUser) {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
