import { Label } from "../label";
import { Clock, ChevronDown, FolderTreeIcon, Folder } from "lucide-react";
import { FolderDummyData } from "@/lib/dummyData";
import { Button } from "../button";
import FolderTreeItem from "../FolderTreeItem";
const FolderTree = () => {
  return (
    <div className="mt-5">
      <Label className="items-center flex w-full font-bold">
        <Folder className="w-4" />
        <span className="ml-2">Folders</span>
      </Label>
      <ul className="space-y-2 mt-5">
        {FolderDummyData.map((folder) => (
          <FolderTreeItem key={folder.id} item={folder} depth={0} />
        ))}
      </ul>
    </div>
  );
};

export default FolderTree;
