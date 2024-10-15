import React, { createContext, useContext, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { X } from "lucide-react";

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

const WindowContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogPrimitive.DialogContentProps
>(({ className, children, ...props }, ref) => {
  const { isOpen, setOpen } = useDialogContext();

  const controls = useDragControls();

  return (
    <AnimatePresence>
      {isOpen && (
        <DialogPrimitive.Portal forceMount>
          <div className="fixed inset-0 pointer-events-none">
            <div className="flex items-center justify-center w-full h-full">
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
                  "z-50 flex flex-col items-center w-full max-w-lg gap-4 border bg-background p-6 shadow-lg sm:rounded-lg pointer-events-auto",
                  className
                )}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  drag
                  dragMomentum={false}
                  dragControls={controls}
                  dragListener={false}
                >
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
                    <p>
                      You can drag this window around using the handle at the
                      top.
                    </p>
                  </div>
                </motion.div>
              </DialogPrimitive.Content>
            </div>
          </div>
        </DialogPrimitive.Portal>
      )}
    </AnimatePresence>
  );
});
export { Window, WindowTrigger, WindowContent };
