/*
|-----------------------------------------
| setting up SideBar for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, April, 2024
|-----------------------------------------
*/

"use client";

import { FaTrash } from "react-icons/fa6";
import { IoAddSharp } from "react-icons/io5";

import {
  Sheet,
  SheetClose,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { useGlobalStore } from "@/libs/global-store";
import { ScrollArea } from "@/components/ui/scroll-area";

import { webAppH2, webAppTitleXl } from "./style";
import MutationForm from "./mutation-form";

const SideBar = () => {
  const apiData = useGlobalStore((store) => store.apiData);
  const setCurrentItem = useGlobalStore((store) => store.setCurrentItem);
  const setMutationData = useGlobalStore((store) => store.setMutationData);

  return (
    <main>
      <ScrollArea className="h-screen w-auto rounded-md border pr-3">
        <p className={`${webAppTitleXl} uppercase px-4 pt-4`}>Menu</p>
        <div className="pl-2">
          {Array.isArray(apiData) &&
            apiData?.map((curr: any, idx: number) => (
              <div
                key={curr.name + idx}
                className=" flex w-[96%] flex-row justify-between m-2 border border-slate-300 hover:border-slate-400 pr-2 py-1 rounded-lg"
              >
                <div
                  onClick={() => {
                    setCurrentItem(curr.name), setMutationData("");
                  }}
                  className="flex flex-row gap-4 mx-4 ml-3 w-full cursor-pointer"
                >
                  <div>
                    <p className={`uppercase ${webAppH2}`}>
                      {curr.name.length > 16
                        ? curr.name.slice(0, 14) + "..."
                        : curr.name}
                    </p>
                    {curr?.data?.lst?.length > 0 ? (
                      <p className="text-sm text-slate-400">
                        {curr.data.lst.length} item
                        {curr.data.lst.length > 1 && "s"}
                      </p>
                    ) : (
                      <p className="font-bold">No item</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between gap-4 pr-2 max-w-[90px]">
                  <Sheet>
                    <SheetTrigger>
                      <div
                        onClick={() =>
                          setMutationData({ type: "add", name: curr.name })
                        }
                      >
                        <IoAddSharp className="cursor-pointer" />
                      </div>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetDescription>
                          <div className="mt-8">
                            <MutationForm />
                          </div>
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                  <div
                    onClick={() =>
                      setMutationData({ type: "delete", name: curr.name })
                    }
                  >
                    <FaTrash className="text-red-300 hover:text-red-400 cursor-pointer" />
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="pb-12" />
      </ScrollArea>
    </main>
  );
};
export default SideBar;
