import { useEffect, useRef } from "react";

export default function useDebounce(callback: () => void, deps: any[], delay: number) {
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = window.setTimeout(() => {
      callback();
    }, delay);

    return () => clearTimeout(timer.current);
  }, deps);
}
