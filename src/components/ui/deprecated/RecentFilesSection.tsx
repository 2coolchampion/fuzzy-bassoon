import { RecentFilesDummyData } from "@/lib/dummyData";
import { Button } from "./button";
import { Label } from "./label";
import { Clock, Image } from "lucide-react";

const RecentFilesSection = () => {
  return (
    <div>
      <Label className="items-center flex w-full font-bold">
        <Clock className="w-4" />
        <span className="ml-2">Recently opened</span>{" "}
      </Label>
      <ul className="space-y-2 flex flex-col items-start mt-5">
        {RecentFilesDummyData.map((item) => (
          <li className="w-full">
            <Button
              key={item.id}
              className="flex items-center w-full justify-start"
              variant="outline"
            >
              <Image />
              <span className="ml-4">{item.name}</span>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentFilesSection;
