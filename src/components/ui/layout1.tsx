import Topbar from "./topbar";
import Sidebar from "./sidebar";
import { Button } from "./button";
import { Layout } from "@/lib/types";

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
        <Sidebar />
        <div className="flex min-w-full items-stretch flex-col justify-center">
          <Topbar />
          <div className="flex-1 w-full bg-slate-800 flex justify-center items-center">
            <Button variant={"outline"} onClick={onClick}>
              Change layout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default layout1;
