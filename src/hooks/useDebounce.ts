import { useState, useEffect } from "react";

export const useDebounce = (cb: any, delay: number) => {
  const [debouncedVal, setDebouncedVal] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedVal(cb())
    }, delay)

    return (() => {
      clearTimeout(timer)
    })
  },
    [cb, delay])
  return debouncedVal
}