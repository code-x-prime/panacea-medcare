"use client";

import { useState, useEffect } from "react";

/**
 * Returns a debounced value that updates after `delay` ms of no changes.
 * @param {string} value - The value to debounce
 * @param {number} delay - Delay in milliseconds (default 300)
 * @returns {string} Debounced value
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
