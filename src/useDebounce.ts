import { useEffect, useRef, useState } from "react";

export const useDebounce = (value: any, delay: number) => {
    const timer = useRef<NodeJS.Timeout>();
    const [debouncedValue, setDebouncedValue]= useState(value)

    useEffect(() => {
        if(timer.current)
            clearTimeout(timer.current)
        timer.current = setTimeout(() => {
            setDebouncedValue(value)
        }, delay);

        return (() => clearTimeout(timer.current))
    })
    return debouncedValue
}