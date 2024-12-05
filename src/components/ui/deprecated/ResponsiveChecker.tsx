import React from "react";
import { cn } from "@/lib/utils";
import { Window, WindowContent, WindowTrigger } from "./Window";
// import { Dialog, DialogContent, DialogPortal, DialogTrigger } from "./dialog";
import * as Dialog from "@radix-ui/react-dialog";

interface ResponsiveCheckerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ResponsiveChecker: React.FC<ResponsiveCheckerProps> = ({ children }) => {
  return (
    <>
      <div className="flex h-full bg-pink-800 border border-pink-400 justify-center items-center">
        {children}
      </div>
      <DevResponsiveSettings />
    </>
  );
};

// This component is unfinished and a mess.
const DevResponsiveSettings = () => {
  return (
    <Window>
      <WindowTrigger className="fixed opacity-0 duration-150  hover:opacity-100 bottom-5 left-5">
        Open controls
      </WindowTrigger>
      <WindowContent>
        <h2>Draggable Window</h2>
        <p>You can drag this window around using the handle at the top.</p>
      </WindowContent>
    </Window>
  );
};

export default ResponsiveChecker;
