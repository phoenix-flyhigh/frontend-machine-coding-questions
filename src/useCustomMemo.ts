import { useEffect, useRef } from "react";

const areEqual = (prevDeps: any, newDeps: any) => {
  if (!prevDeps || prevDeps.length !== newDeps.length) {
    return false;
  }
  for (let i = 0; i < prevDeps.length; i++) {
    if (prevDeps[i] !== newDeps[i]) {
      return false;
    }
  }
  return true;
};

const useCustomMemo = (cb: () => any, deps: any) => {
  const memoizedRef = useRef<{ value: any; deps: any } | null>(null);

  useEffect(() => {
    return () => {
      memoizedRef.current = null;
    };
  }, []);

  if (!memoizedRef.current || !areEqual(memoizedRef.current.deps, deps)) {
    memoizedRef.current = {
      value: cb(),
      deps,
    };
  }

  return memoizedRef.current.value;
};

export default useCustomMemo;
