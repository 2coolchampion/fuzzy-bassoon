import Topbar from "./topbar";
import Sidebar from "./sidebar";
const Layout2 = () => {
  return (
    <>
      <div className="flex flex-col min-h-full content">
        <Topbar />
        <div className="flex flex-1 justify-center">
          <div className="flex this justify-end flex-1 h-full">
            <Sidebar className="h-full" />
          </div>
          <div className="w-[40rem] bg-slate-800">Main content</div>
          <div className="flex-1"></div>
        </div>
      </div>
    </>
  );
};

export default Layout2;
