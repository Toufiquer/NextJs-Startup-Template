/*
|-----------------------------------------
| setting up search bar for the app
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: restaurant.mealnight.com, July, 2024
|-----------------------------------------
*/

"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchBar = ({
  className = "",
  parentWidth = "",
}: {
  className?: string | null;
  parentWidth?: string | null;
}) => {
  const [text, setText] = useState("");
  const handleText = (e: any) => {
    setText(e.target.value);
  };

  return (
    <div className={`flex items-center space-x-2 text-[.85rem] ${parentWidth ? "w-full " : " max-w-full"} `}>
      <div className="relative w-full">
        <span className="absolute left-[10px] top-[12px]">
          <Search className="h-4 w-4" />
        </span>
        {text !== "" && (
          <span onClick={() => setText("")} className="absolute right-[10px] top-[12px] cursor-pointer">
            <X className="h-4 w-4" />
          </span>
        )}
        <Input
          onChange={handleText}
          type="text"
          value={text || ""}
          placeholder="Search"
          className={` pl-[38px] ${className}`}
        />
      </div>
      {text !== "" && (
        <Button variant="outline" type="submit">
          Search
        </Button>
      )}
    </div>
  );
};
export default SearchBar;
