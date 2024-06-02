import { useEffect, useRef } from "react"

const areEqual = (prevDeps: any[], currentDeps: any[]) => {
    if(!prevDeps || prevDeps.length !== currentDeps.length){
        return false
    }
    for (let i = 0; i < prevDeps.length; i++){
        if(prevDeps[i] !== currentDeps[i]){
            return false;
        }
    }    
    return true;
}

export const useCustomCallback = (cb: any, deps: any[]) => {
    const memoizedRef = useRef<{cb: any, deps: any[]} | null>(null)
    
    useEffect(() => {
        return(() => {
            memoizedRef.current = null
        }) 
    }, [])

    if(!memoizedRef.current || !areEqual(memoizedRef.current.deps, deps)){
        console.log("newly created");
        memoizedRef.current = {
            cb,
            deps
        }
    }
    else {
        console.log("memoized");
    }

    return memoizedRef.current.cb
}