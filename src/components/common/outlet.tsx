/*
|-----------------------------------------
| setting up Outlet for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, April, 2024
|-----------------------------------------
*/
 
import { FaTrash } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGlobalStore } from "@/libs/global-store";
import { ScrollArea } from "@/components/ui/scroll-area";

import DeleteUi from "./delete-ui";
import MutationForm from "./mutation-form";
import { webAppH2, webAppH2Light, webAppPLight, webAppTitleXl } from "./style";

const Outlet = () => {
  const currentItem = useGlobalStore((store) => store.currentItem);
  const apiData = useGlobalStore((store) => store.apiData);
  const mutationData = useGlobalStore((store) => store.mutationData);
  const setMutationData = useGlobalStore((store) => store.setMutationData);
  let renderData = Array.isArray(apiData)
    ? apiData.filter((item) => item.name === currentItem)
    : [];

  const handleSetMutationData = ({
    itemName,
    type,
  }: {
    itemName: string;
    type: string;
  }) => {
    let renderData = apiData.filter((item) => item.name === currentItem);
    const findData = renderData[0]?.data?.lst?.find(
      (curr) => curr.item === itemName
    );
    console.log("findData", findData);
    setMutationData({ ...findData, type });
  };

  let renderUIData;
  if (renderData.length >= 1 && renderData[0]?.data?.lst?.length === 0) {
    renderUIData = (
      <div className="min-h-[92vh] h-full w-full flex items-center justify-center">
        <div className={webAppH2}>Ops! Nothing was found</div>
      </div>
    );
  }
  if (renderData.length >= 1 && renderData[0].data.lst.length > 0) {
    renderUIData = (
      <ScrollArea className="h-[92vh] w-full">
        <div className="min-h-[92vh] h-full w-full flex items-start justify-start pt-4 flex-col">
          {renderData[0]?.data?.lst?.map((curr: any, idx: number) => {
            return (
              <div
                key={curr.item + idx}
                className=" flex w-[96%] flex-row justify-between m-2 border border-slate-400 hover:border-slate-500 px-2 py-1 rounded-lg pl-1"
              >
                <div className="flex flex-row gap-4 mx-4 ml-2 w-full">
                  <div>
                    <p className={webAppH2}>
                      {curr.item}{" "}
                      {curr.price && (
                        <span className={webAppH2Light + " text-[12px]"}>
                          (&#163;
                          {curr.price})
                        </span>
                      )}
                    </p>
                    <p className={webAppPLight + " font-normal"}>{curr.info}</p>
                    {curr?.option?.length > 0 && (
                      <p className={webAppPLight + " font-normal"}>
                        {curr.option?.length} item
                        {curr.option?.length > 1 && "s"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between gap-4 pr-2 max-w-[90px]">
                  <Sheet>
                    <SheetTrigger>
                      <div
                        onClick={() =>
                          handleSetMutationData({
                            itemName: curr.item,
                            type: "update",
                          })
                        }
                      >
                        <FaRegEdit className="cursor-pointer h-4 w-4 text-slate-500" />
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
                      handleSetMutationData({
                        itemName: curr.item,
                        type: "delete",
                      })
                    }
                  >
                    <FaTrash className="text-red-300 hover:text-red-400 cursor-pointer h-4 w-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-12" />
      </ScrollArea>
    );
  }
  let renderUI = (
    <div className="min-h-[92vh] h-full w-full flex items-center justify-center">
      <div className={webAppTitleXl}>Please Select Item</div>
    </div>
  );
  if (currentItem !== "") {
    renderUI = (
      <div className="min-h-[92vh] h-full w-full flex flex-col p-2">
        <div className={`${webAppTitleXl} border-b uppercase`}>
          {currentItem}
        </div>
        <div>{renderUIData}</div>
      </div>
    );
  }

  if (mutationData.type === "delete") {
    renderUI = <DeleteUi />;
  }
  return <main>{renderUI}</main>;
};
export default Outlet;
