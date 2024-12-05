"use client";

import { useState } from "react";
import { Button } from "./button";
import { ChevronDown, ChevronRight, File } from "lucide-react";

interface FolderItem {
  id: string;
  name: string;
  children?: FolderItem[];
}

const FolderTreeItem: React.FC<{ item: FolderItem; depth: number }> = ({
  item,
  depth,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li className="space-y-2">
      <Button
        variant="outline"
        className="flex items-center w-full justify-start"
        type="button"
        onClick={toggleExpand}
      >
        {item.children ? (
          isExpanded ? (
            <ChevronDown />
          ) : (
            <ChevronRight />
          )
        ) : (
          <File />
        )}
        <span className="ml-4">{item.name}</span>
      </Button>
      {item.children && isExpanded && (
        <ul className="pl-4 space-y-2">
          {item.children.map((child) => (
            <FolderTreeItem key={child.id} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default FolderTreeItem;
