import { useEffect, useRef, useState } from "react"

export const useThrottle = (value: any, delay: number) => {
    const [throttledValue, setThrotledValue] = useState(value)
    const lastRun = useRef(Date.now())

    useEffect(() => {
        const handler = setTimeout(() => {
            if(Date.now() - lastRun.current >= delay){
                setThrotledValue(value)
                lastRun.current = Date.now()
            }
        }, delay - (Date.now() - lastRun.current))

        return (() => {
            clearTimeout(handler)
        })
    }, [value, delay])

    return  throttledValue
}