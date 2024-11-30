export const useLocalStorage = () => {
    const getItem = (key: string) => {
        const value = localStorage.getItem(key)
        if(value !== undefined && value !== null){
            return JSON.parse(value)
        }
        return null
    }

    const setItem = <T>(key: string, value: T) => {
        localStorage.setItem(key, JSON.stringify(value))
    }
    
    return {
        getItem,
        setItem
    }
}