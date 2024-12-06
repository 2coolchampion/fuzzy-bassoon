import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  Image,
  ChevronDown,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export default function EditorSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex justify-between hover:bg-slate-800">
        <Popover>
          <PopoverTrigger>
            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-4">
                <Image className="self-center flex-none" />
                <p className="line-clamp-2">
                  Workspace again and again, too long to display bro
                </p>
              </div>
              <ChevronDown className="flex-none" />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <p>Workspace description</p>
          </PopoverContent>
        </Popover>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
