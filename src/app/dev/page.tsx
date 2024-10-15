"use client";

import ResponsiveChecker from "@/components/ui/ResponsiveChecker";
import Sidebar from "@/components/ui/sidebar";
import { motion as m, useAnimation, Variants } from "framer-motion";
import React from "react";

const DevPage: React.FC = () => {
  return (
    <>
      <ResponsiveChecker>
        <Sidebar />
      </ResponsiveChecker>
    </>
  );
};

export default DevPage;
