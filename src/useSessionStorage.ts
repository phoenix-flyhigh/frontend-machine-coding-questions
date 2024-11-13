export const useSessionStorage = () => {
    
    const getItem = (key: string) => {
        const value = sessionStorage.getItem(key)

        if(value !== "undefined" && value !== null)
            return JSON.parse(value)
        return null
    }

    const setItem = (key: string, value: {}) => {
        sessionStorage.setItem(key, JSON.stringify(value))
    }
    
    return {
        getItem,
        setItem
    }
}