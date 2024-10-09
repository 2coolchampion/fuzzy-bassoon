import React from "react";
import { Image } from "lucide-react";
import { motion as m, HTMLMotionProps } from "framer-motion";

interface TopbarProps extends HTMLMotionProps<"header"> {}
const Topbar = ({}) => {
  return (
    <m.header
      layout
      transition={{ duration: 0.15, delay: 0.15 }}
      layoutId="topbar"
      className="bg-slate-400 h-10"
    >
      <Image />
    </m.header>
  );
};

export default Topbar;
