/*
|-----------------------------------------
| setting up MenuSingleItemOptions for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: restaurant.mealnight.com, July, 2024
|-----------------------------------------
*/

import { useEffect, useState } from "react";
import { MoreVertical, PlusCircle } from "lucide-react";

import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

import MenuOptionUpdate from "./menu-option-update";

type optionsType = { name: string; price?: number };
type optionType = { name: string; optionFor?: string; options: optionsType[] };
const MenuSingleItemOptions = ({ data }: { data: {} }) => {
  const [option, setOption] = useState<optionType[]>([]);
  const [title, setTitle] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (data.data.curr.item) {
      setTitle(data.data.curr.item);
      setPrice(data.data.curr.price);
      setInfo(data.data.curr.info);
      if (data?.data?.curr?.option?.length > 0) {
        setOption([...data.data.curr.option]);
      }
    }
  }, [data]);

  const handleOptionData = ({ changeValue, oldValue, changeKey, optionIndex }) => {
    const result = option.map((curr, idx) => {
      const newResult = { ...curr };
      if (optionIndex === idx) {
        newResult[changeKey] = changeValue;
      }
      return newResult;
    });
    setOption([...result]);
  };
  const handleInnerOption = ({ changeValue, oldValue, changeKey, optionIndex }) => {};
  const handleAddInnerOption = (idx, { name = "", price = undefined }) => {
    const result = option.map((curr, i) => {
      const item = { ...curr };
      if (i === idx) {
        name !== "" && item.options.push({ name, price });
      }
      return item;
    });
    setOption([...result]);
  };
  const handleRemoveInnerOption = (idx, subIdx) => {
    const result = option.map((curr, i) => {
      const item = { ...curr };
      if (i === idx && item?.options?.length > 0) {
        item.options = item?.options?.filter((_, index) => subIdx !== index);
      }
      return item;
    });
    setOption([...result]);
  };
  const handleRemoveOption = (idx) => {
    const result = option.filter((_, i) => i !== idx);
    setOption([...result]);
  };

  const handleDelete = (data) => {
    console.log("full data delete", data);
  };
  const handleUnavailable = (data) => {
    console.log("full data delete", data);
  };
  const handleAddOption = () => {
    console.log(" => Line No: 96", "add option clicked");
    setOption([...option, { name: "", optionFor: "", options: [] }]);
  };
  const handleUpdate = () => {
    console.log("Update data", { data, updateData: { title, info, price, option } });
  };
  return (
    <main className="">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <div className="flex w-full flex-col gap-2">
              <AlertDialog>
                <AlertDialogTrigger>
                  <div className="w-full cursor-pointer">
                    <h2 className="w-full cursor-pointer rounded-lg bg-green-200 px-4 py-1 text-center text-green-700">
                      Update
                    </h2>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <ScrollArea className="h-[500px] w-auto p-4">
                      <AlertDialogTitle>Update</AlertDialogTitle>
                      <AlertDialogDescription>
                        <div className="flex flex-col gap-1 px-2">
                          <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="item"
                            type="text"
                          />
                          <Textarea
                            value={info}
                            onChange={(e) => setInfo(e.target.value)}
                            placeholder="info"
                            type="text"
                          />
                          <Input
                            value={price}
                            onChange={(e) => setPrice(parseInt(e.target.value))}
                            placeholder="price"
                            type="number"
                          />
                          {/* <MenuOption data={{ data, options, setOptions }} /> */}
                          {option?.map((curr, idx) => (
                            <MenuOptionUpdate
                              key={idx}
                              data={{
                                curr,
                                handleOptionData,
                                handleInnerOption,
                                handleAddInnerOption,
                                handleRemoveInnerOption,
                                handleRemoveOption,
                                currIdx: idx,
                              }}
                            />
                          ))}
                          <h2
                            className="flex w-full cursor-pointer items-center justify-start"
                            onClick={handleAddOption}
                          >
                            <span> Add Option</span>
                            <PlusCircle className="h-6 w-6 cursor-pointer pl-2" />
                          </h2>
                        </div>
                      </AlertDialogDescription>
                    </ScrollArea>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleUpdate}
                      className=" bg-green-200 text-green-700 hover:bg-green-300"
                    >
                      Update
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog>
                <AlertDialogTrigger>
                  <div className="cursor-pointer">
                    <h2 className="  w-full cursor-pointer rounded-lg bg-rose-200 px-4 py-1 text-center text-rose-700">
                      Delete
                    </h2>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription></AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete({ data })}
                      className=" bg-rose-200 text-rose-700 hover:bg-rose-300"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog>
                <AlertDialogTrigger>
                  <div className="cursor-pointer">
                    <h2 className="  w-full cursor-pointer rounded-lg bg-rose-200 px-4 py-1 text-center text-rose-700">
                      Unavailable
                    </h2>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription></AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleUnavailable({ data })}
                      className=" bg-rose-200 text-rose-700 hover:bg-rose-300"
                    >
                      Unavailable
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </main>
  );
};
export default MenuSingleItemOptions;
