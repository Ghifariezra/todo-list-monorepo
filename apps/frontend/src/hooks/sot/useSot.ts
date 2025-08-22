import { useState, useCallback, useRef, useEffect } from "react";

export const useSot = () => {
    const [open, setOpen] = useState(false);
    const sotRef = useRef<HTMLDivElement | null>(null);
    const overlayRef = useRef<HTMLDivElement | null>(null);

    const toggleOpen = useCallback(() => {
        setOpen((prev) => !prev);
    }, []);

    const handleClickOutsideForm = useCallback((event: MouseEvent) => {
        const target = event.target as HTMLElement;

        if (sotRef.current?.contains(target)) return;

        if (target.closest("[data-radix-popper-content-wrapper]")) return;

        if (overlayRef.current === target) {
            setOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideForm);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideForm);
        };
    }, [handleClickOutsideForm]);

    return { open, toggleOpen, sotRef, overlayRef };
};
