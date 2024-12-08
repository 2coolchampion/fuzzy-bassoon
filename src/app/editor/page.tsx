import EditorSidebar from "@/components/ui/editor-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import EditorComponent from "@/components/ui/editorComponent";
import React from "react";

const page = () => {
  return (
    <>
      <EditorSidebar />
      <main className="relative w-full">
        <div className="flex-1 flex justify-center items-center h-full w-full">
          <SidebarTrigger className="absolute top-4 left-4" />
          <EditorComponent />
        </div>
      </main>
    </>
  );
};

export default page;
