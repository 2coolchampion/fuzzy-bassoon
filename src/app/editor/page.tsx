import Editor from "@/components/ui/deprecated/Editor";
import { Sidebar } from "@/components/ui/sidebar";
import React from "react";

const page = () => {
  return (
    <>
      <Sidebar />
      <div className="w-full h-full flex justify-center items-center">
        {" "}
        <h1>Editor</h1>
      </div>
    </>
  );
};

export default page;
