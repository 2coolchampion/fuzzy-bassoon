import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Image, Search } from "lucide-react";
import { Button } from "../button";
import RecentFilesSection from "./RecentFilesSection";
import FolderTree from "./FolderTree";
import { Input } from "../input";
import { motion as m, HTMLMotionProps } from "framer-motion";

interface SidebarProps extends HTMLMotionProps<"aside"> {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className, ...props }) => {
  return (
    <m.aside
      layout
      layoutId="sidebar"
      transition={{ duration: 0.15 }}
      className={cn(" w-80 h-full bg-slate-900 p-6", className)}
      {...props}
    >
      <nav className="space-y-4 flex flex-col justify-between h-full">
        <div className="flex flex-col">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center px-4 py-2 border border-slate-500 rounded-lg bg-background w-full">
              <div className="flex w-10 h-10 flex-none items-center justify-center p-1 border-slate-500 border rounded-sm">
                <Image />
              </div>
              <span className="line-clamp-2 font-lg font-bold ml-3 flex-1 text-left">
                Name of the workspacehdhawbfw dhaw
              </span>
              <Image className="ml-3 flex-none w-6" />
              <Image className="ml-1 flex-none w-6" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Item 1</DropdownMenuItem>
              <DropdownMenuItem>Item 2</DropdownMenuItem>
              <DropdownMenuItem>Item 3</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <hr className="my-5" />
          <div className="flex items-center">
            <Search />
            <Input className="border-none ml-2" placeholder="Search" />
          </div>
          <hr className="my-5" />
          <RecentFilesSection />
          <FolderTree />
        </div>
        <div className="flex flex-col space-y-2">
          <Button variant="outline">Settings</Button>
          <Button variant="outline">Feedback</Button>
        </div>
      </nav>
    </m.aside>
  );
};
export default Sidebar;
