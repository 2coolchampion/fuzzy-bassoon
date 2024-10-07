import Topbar from "./topbar";
import Sidebar from "./sidebar";
import { useState } from "react";
import { Button } from "./button";
import { Layout } from "@/lib/types";

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
          <div className="w-[40rem] bg-slate-800 flex justify-center items-center">
            <Button variant={"outline"} onClick={onClick}>
              Change layout 2
            </Button>
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
    </>
  );
};

export default Layout2;
