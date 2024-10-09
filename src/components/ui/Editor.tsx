import { cn } from "@/lib/utils";
import {
  motion as m,
  HTMLMotionProps,
  isValidMotionProp,
  MotionProps,
} from "framer-motion";
import React, { ComponentPropsWithoutRef, JSXElementConstructor } from "react";

interface EditorProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

const Editor: React.FC<EditorProps> = ({ className, children }) => {
  return (
    <m.div
      layout
      layoutId="editor"
      className={cn("flex-1 bg-slate-400", className)}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Check if the child is a custom component (like Button)
          if (typeof child.type === "function") {
            // Wrap custom components in m.div
            return (
              <m.div className="TEST" layout>
                {React.cloneElement(child)}
              </m.div>
            );
          }
          // For built-in elements, add layout prop directly
          return React.cloneElement(child, {
            layout: true,
          } as React.ComponentProps<typeof child.type extends keyof JSX.IntrinsicElements ? typeof child.type : JSXElementConstructor<any>>);
        }
        // If it's not a valid React element, return as is
        return child;
      })}
    </m.div>
  );
};

export default Editor;
