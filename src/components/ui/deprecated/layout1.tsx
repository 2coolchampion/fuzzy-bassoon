import Topbar from "./topbar";
import CustomSidebar from "./sidebar";
import { Button, MButton } from "../button";
import { Layout } from "@/lib/types";
import { motion as m } from "framer-motion";
import Editor from "./Editor";

interface Layout1Props {
  setLayout: React.Dispatch<React.SetStateAction<Layout>>;
}

const layout1: React.FC<Layout1Props> = ({ setLayout: setLayout }) => {
  const onClick = () => {
    if (setLayout) {
      setLayout("layout2");
    } else {
      console.error("setCenterLayout is not defined");
    }
  };
  return (
    <>
      <div className="flex min-h-full">
        <CustomSidebar />
        <div className="flex flex-1 items-stretch flex-col justify-center">
          <Topbar />
          <Editor className="flex-1 w-full bg-slate-800 flex justify-center items-center">
            <MButton
              layout
              layoutId="btn-change-layout"
              variant={"outline"}
              onClick={onClick}
            >
              Change layout
            </MButton>
          </Editor>
        </div>
      </div>
    </>
  );
};

export default layout1;
