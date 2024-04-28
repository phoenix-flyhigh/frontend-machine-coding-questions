import { useRef } from "react";

const useCustomEffect = (effect: any, deps: any) => {
  const prevDeps = useRef([]);
  const isFirstRender = useRef(true);

  if (isFirstRender.current) {
    isFirstRender.current = false;
    const cleanup = effect();

    return () => {
      if (cleanup && typeof cleanup === "function") {
        cleanup();
      }
    };
  }

  const depsChanged = deps
    ? JSON.stringify(prevDeps.current) !== JSON.stringify(deps)
    : true;

  if (depsChanged) {
    const cleanup = effect();

    if (cleanup && typeof cleanup === "function") {
      cleanup();
    }
  }

  prevDeps.current = deps || [];
};

export default useCustomEffect;
