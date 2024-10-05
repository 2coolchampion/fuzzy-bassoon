import Topbar from "./topbar";
import Sidebar from "./sidebar";

const layout1 = () => {
  return (
    <>
      <div className="flex min-h-full">
        <Sidebar />
        <div className="flex min-w-full items-stretch flex-col justify-center">
          <Topbar />
          <div className="flex-1 w-full bg-slate-800">Main content</div>
        </div>
      </div>
    </>
  );
};

export default layout1;
