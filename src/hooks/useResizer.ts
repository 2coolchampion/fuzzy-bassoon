import { useEffect, RefObject } from "react";

// attaches pointerdown funciton on each handle element

type Direction = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

type ResizerRefs = {
  windowRef: RefObject<HTMLDivElement>;
  nRef?: RefObject<HTMLDivElement>;
  sRef?: RefObject<HTMLDivElement>;
  eRef?: RefObject<HTMLDivElement>;
  wRef?: RefObject<HTMLDivElement>;
  neRef?: RefObject<HTMLDivElement>;
  nwRef?: RefObject<HTMLDivElement>;
  seRef?: RefObject<HTMLDivElement>;
  swRef?: RefObject<HTMLDivElement>;
};

export const useResizer = (refs: ResizerRefs) => {
  const { windowRef, nRef, sRef, eRef, wRef, neRef, nwRef, seRef, swRef } =
    refs;

  const onPointerDown = (direction: Direction) => (e: PointerEvent) => {
    e.preventDefault();

    const resizableElement = windowRef.current;
    if (!resizableElement) return;

    const initialWidth = resizableElement.offsetWidth;
    const initialHeight = resizableElement.offsetHeight;
    const initialX = e.clientX;
    const initialY = e.clientY;

    const onPointerMove = (moveEvent: PointerEvent) => {
      let newWidth = initialWidth;
      let newHeight = initialHeight;

      if (direction.includes("e")) {
        newWidth = initialWidth + (moveEvent.clientX - initialX);
      } else if (direction.includes("w")) {
        newWidth = initialWidth - (moveEvent.clientX - initialX);
      }

      if (direction.includes("s")) {
        newHeight = initialHeight + (moveEvent.clientY - initialY);
      } else if (direction.includes("n")) {
        newHeight = initialHeight - (moveEvent.clientY - initialY);
      }

      resizableElement.style.width = `${newWidth}px`;
      resizableElement.style.height = `${newHeight}px`;
    };

    const onPointerUp = () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
    };

    console.log("adding event listener to ", direction, " handle.");
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
  };

  useEffect(() => {
    const directions: Partial<Record<Direction, HTMLDivElement | null>> = {
      ...(nRef && { n: nRef.current }),
      ...(sRef && { s: sRef.current }),
      ...(eRef && { e: eRef.current }),
      ...(wRef && { w: wRef.current }),
      ...(neRef && { ne: neRef.current }),
      ...(nwRef && { nw: nwRef.current }),
      ...(seRef && { se: seRef.current }),
      ...(swRef && { sw: swRef.current }),
    };

    Object.entries(directions).forEach(([direction, handle]) => {
      if (handle) {
        console.log("adding onPointerDown to ", direction, " handle.");
        handle.addEventListener(
          "pointerdown",
          onPointerDown(direction as Direction)
        );
      }
    });

    return () => {
      Object.entries(directions).forEach(([direction, handle]) => {
        if (handle) {
          handle.removeEventListener(
            "pointerdown",
            onPointerDown(direction as Direction)
          );
        }
      });
    };
  }, [nRef, sRef, eRef, wRef, neRef, nwRef, seRef, swRef]);
};
