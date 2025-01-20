import { useEffect } from "react";

export const useOnClickOutside = (refs=[], handler) => {
    const listener = (event) => {
        
        if (!refs.some((ref) => ref?.current?.contains(event.target)))
        {handler(event);}else{
            return;
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [refs, handler]);
}