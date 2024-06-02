import { useEffect, useState } from "react"

export const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false);

    
    useEffect(() => {
        const mediaQuery = window.matchMedia(query)
        const handleChange = (e: MediaQueryListEvent) => setMatches(e.matches)

        setMatches(mediaQuery.matches)
        mediaQuery.addEventListener("change",  handleChange)

        return(() => {
            mediaQuery.removeEventListener("change", handleChange)
        })
    }, [query])

    return matches
}