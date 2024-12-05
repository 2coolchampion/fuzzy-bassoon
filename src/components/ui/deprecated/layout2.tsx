import Topbar from "./topbar";
import Sidebar from "./sidebar";
import { useState } from "react";
import { Button, MButton } from "../button";
import { Layout } from "@/lib/types";
import { motion as m } from "framer-motion";
import Editor from "./Editor";

interface Layout2Props {
  setLayout: React.Dispatch<React.SetStateAction<Layout>>;
}
const Layout2: React.FC<Layout2Props> = ({ setLayout }) => {
  const onClick = () => {
    if (setLayout) {
      setLayout("layout1");
    } else {
      console.error("setCenterLayout is not defined");
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-full content">
        <Topbar />
        <div className="flex flex-1 justify-center">
          <div className="flex flex-1 justify-end">
            <Sidebar className="h-full" />
          </div>
          <Editor className="w-[40rem] bg-slate-800 flex justify-center items-center">
            <MButton
              layout
              layoutId="btn-change-layout"
              variant={"outline"}
              onClick={onClick}
            >
              Change layout 2
            </MButton>
          </Editor>
          <div className="flex-1"></div>
        </div>
      </div>
    </>
  );
};

export default Layout2;
