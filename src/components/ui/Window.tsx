import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import { X } from "lucide-react";
// import { useLocalStorage } from "@/hooks/useLocalStorage";

interface DialogContextType {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

interface WindowProps extends DialogPrimitive.DialogProps {
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({ children, ...props }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  return (
    <DialogContext.Provider value={{ isOpen, setOpen }}>
      <DialogPrimitive.Root
        modal={false}
        open={isOpen}
        onOpenChange={setOpen}
        {...props}
      >
        {children}
      </DialogPrimitive.Root>
    </DialogContext.Provider>
  );
};

const WindowTrigger = DialogPrimitive.Trigger;

const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }
  return context;
};

interface WindowPortalProps extends WindowContentProps {
  className?: string;
}

const WindowPortal = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  WindowPortalProps
>(({ className, ...props }, ref) => {
  const { isOpen } = useDialogContext();

  return (
    <AnimatePresence>
      {isOpen && (
        <DialogPrimitive.Portal forceMount>
          <WindowContent {...props} ref={ref} className={className} />
        </DialogPrimitive.Portal>
      )}
    </AnimatePresence>
  );
});

interface WindowContentProps extends DialogPrimitive.DialogContentProps {
  className?: string;
}

const WindowContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  WindowContentProps
>(({ className, ...props }, ref) => {
  // const { getItem, setItem } = useLocalStorage();

  type WindowSize = {
    width: number;
    height: number;
    left: number;
    top: number;
  };

  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 250,
    height: 250,
    left: 0,
    top: 0,
  });

  const windowRef = useRef<HTMLDivElement>(null);
  const nRef = useRef<HTMLDivElement>(null);
  const eRef = useRef<HTMLDivElement>(null);
  const sRef = useRef<HTMLDivElement>(null);
  const wRef = useRef<HTMLDivElement>(null);
  const neRef = useRef<HTMLDivElement>(null);
  const seRef = useRef<HTMLDivElement>(null);
  const swRef = useRef<HTMLDivElement>(null);
  const nwRef = useRef<HTMLDivElement>(null);

  type Direction = "n" | "e" | "w" | "s" | "ne" | "se" | "sw" | "nw";

  const onPointerDown = (direction: Direction) => (e: PointerEvent) => {
    const initialX = e.clientX;
    const initialY = e.clientY;
    const initialWidth = windowRef.current?.offsetWidth || 0;
    const initialHeight = windowRef.current?.offsetHeight || 0;
    const initialLeft = windowRef.current?.offsetLeft || 0;
    const initialTop = windowRef.current?.offsetTop || 0;
    console.log("onpointedown");

    const onPointerMove = (moveEvent: PointerEvent) => {
      let newWidth = initialWidth;
      let newHeight = initialHeight;
      let newLeft = initialLeft;
      let newTop = initialTop;

      let deltaX = moveEvent.clientX - initialX;
      let deltaY = moveEvent.clientY - initialY;

      console.log("resizing");
      if (direction.includes("e")) {
        console.log("resizing");
        newWidth = initialWidth + deltaX;
      } else if (direction.includes("w")) {
        newWidth = initialWidth - deltaX;
        newLeft = initialLeft + deltaX;
      }

      if (direction.includes("s")) {
        newHeight = initialHeight + deltaY;
      } else if (direction.includes("n")) {
        newHeight = initialHeight - deltaY;
        newTop = initialTop + deltaY;
      }

      // Handle corner cases
      if (direction === "ne") {
        newWidth = initialWidth + deltaX;
        newHeight = initialHeight - deltaY;
        newTop = initialTop + deltaY;
      } else if (direction === "se") {
        newWidth = initialWidth + deltaX;
        newHeight = initialHeight + deltaY;
      } else if (direction === "sw") {
        newWidth = initialWidth - deltaX;
        newHeight = initialHeight + deltaY;
        newLeft = initialLeft + deltaX;
      } else if (direction === "nw") {
        newWidth = initialWidth - deltaX;
        newHeight = initialHeight - deltaY;
        newLeft = initialLeft + deltaX;
        newTop = initialTop + deltaY;
      }

      if (windowRef.current) {
        windowRef.current.style.width = `${newWidth}px`;
        windowRef.current.style.height = `${newHeight}px`;
        windowRef.current.style.left = `${newLeft}px`;
        windowRef.current.style.top = `${newTop}px`;
      }
    };

    const onPointerUp = () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);

      // Update state and localStorage when resizing is done
      if (windowRef.current) {
        const newSize = {
          width: windowRef.current.offsetWidth,
          height: windowRef.current.offsetHeight,
          left: windowRef.current.offsetLeft,
          top: windowRef.current.offsetTop,
        };
        setWindowSize(newSize);
        // setItem("windowSize", JSON.stringify(newSize));
      }
    };

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
  };

  useEffect(() => {
    if (!windowRef.current) {
      return;
    }

    const directionsHandlePair: Partial<
      Record<Direction, HTMLDivElement | null>
    > = {
      ...(nRef && { n: nRef.current }),
      ...(eRef && { e: eRef.current }),
      ...(sRef && { s: sRef.current }),
      ...(wRef && { w: wRef.current }),
      ...(neRef && { ne: neRef.current }),
      ...(seRef && { se: seRef.current }),
      ...(swRef && { sw: swRef.current }),
      ...(nwRef && { nw: nwRef.current }),
    };

    Object.entries(directionsHandlePair).forEach(([direction, handle]) => {
      if (handle) {
        console.log("attachnig to: ", handle);
        handle.addEventListener(
          "pointerdown",
          onPointerDown(direction as Direction)
        );
      }
    });

    return () => {
      Object.entries(directionsHandlePair).forEach(([direction, handle]) => {
        if (handle) {
          handle.removeEventListener(
            "pointerdown",
            onPointerDown(direction as Direction)
          );
        }
      });
    };
  }, []);

  const handles = {
    n: {
      className:
        "absolute sm:rounded-t-lg top-0 hover:bg-blue-600/70 w-full h-2 cursor-ns-resize",
      ref: nRef,
    },
    e: {
      className:
        "absolute sm:rounded-r-lg top-0 right-0 hover:bg-blue-600/70 w-2 h-full cursor-ew-resize",
      ref: eRef,
    },
    w: {
      className:
        "absolute sm:rounded-l-lg top-0 left-0 hover:bg-blue-600/70 w-2 h-full cursor-ew-resize",
      ref: wRef,
    },
    s: {
      className:
        "absolute sm:rounded-b-lg bottom-0 hover:bg-blue-600/70 w-full h-2 cursor-ns-resize",
      ref: sRef,
    },
    ne: {
      className:
        "absolute top-0 right-0 hover:bg-blue-600/70 w-4 h-4 cursor-nesw-resize",
      ref: neRef,
    },
    se: {
      className:
        "absolute bottom-0 right-0 hover:bg-blue-600/70 w-4 h-4 cursor-nwse-resize",
      ref: seRef,
    },
    sw: {
      className:
        "absolute bottom-0 left-0 hover:bg-blue-600/70 w-4 h-4 cursor-nesw-resize",
      ref: swRef,
    },
    nw: {
      className:
        "absolute top-0 left-0 hover:bg-blue-600/70 w-4 h-4 cursor-nwse-resize",
      ref: nwRef,
    },
  };

  const controls = useDragControls();

  // const onDragEnd = (
  //   event: MouseEvent | TouchEvent | PointerEvent,
  //   info: any
  // ) => {
  //   const newSize = {
  //     ...windowSize,
  //     left: info.point.x,
  //     top: info.point.y,
  //   };
  //   setWindowSize(newSize);
  //   setItem("windowSize", JSON.stringify(newSize));
  // };

  return (
    <DialogPrimitive.Content
      onPointerDownOutside={(e) => {
        e.preventDefault();
      }}
      onInteractOutside={(e) => {
        e.preventDefault();
      }}
      asChild
      ref={ref}
      {...props}
      className={cn(
        "z-50 absolute flex flex-col items-center gap-4 border bg-background p-6 shadow-lg sm:rounded-lg pointer-events-auto",
        className
      )}
    >
      <motion.div
        ref={windowRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        style={{
          width: `${windowSize.width}px`,
          height: `${windowSize.height}px`,
          left: `${windowSize.left}px`,
          top: `${windowSize.top}px`,
        }}
        drag
        dragMomentum={false}
        dragControls={controls}
        dragListener={false}
        // onDragEnd={onDragEnd}
      >
        {Object.entries(handles).map(([key, handle]) => (
          <div key={key} ref={handle.ref} className={handle.className} />
        ))}
        <div
          className="cursor-move select-none hover:bg-slate-900 h-5 overflow-hidden  -mt-5 mb-2 rounded-sm flex items-center justify-center max-w-16 w-full"
          onPointerDown={(e) => controls.start(e)}
        >
          ⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮⋮
        </div>
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
        <div className="flex flex-col content">
          <h2>Draggable Window</h2>
          <p>You can drag this window around using the handle at the top.</p>
          <p>You can also resize the window using any edge or corner.</p>
          <p>Window size and position will be saved between sessions.</p>
        </div>
      </motion.div>
    </DialogPrimitive.Content>
  );
});

export { Window, WindowTrigger, WindowPortal as WindowContent };
