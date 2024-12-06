import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
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
import { Button } from "./button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { SearchButton } from "./search-button";

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
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export default function EditorSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Popover>
          <PopoverTrigger asChild>
            <div className="w-full">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Image className="self-center flex-none h-8" />
                    <span className="line-clamp-1">Workspace</span>
                    <span className="sr-only">Workspace</span>
                  </SidebarMenuButton>
                  <SidebarMenuAction>
                    <ChevronDown className="flex-none" />
                  </SidebarMenuAction>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <p>Workspace description</p>
          </PopoverContent>
        </Popover>
      </SidebarHeader>
      <SearchButton />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Recently opened</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <Collapsible>
                  <SidebarMenuItem key={item.title}>
                    <CollapsibleTrigger>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <a href="#">Sub menu item</a>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
