/*
|-----------------------------------------
| setting up MenuOptions for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: restaurant.mealnight.com, July, 2024
|-----------------------------------------
*/

import { useEffect, useState } from "react";
import { MoreVertical, PlusCircle, X } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import MenuOption from "./menu-option";
import { Textarea } from "@/components/ui/textarea";

type optionsType = { name: string; price?: number };
type optionType = { name: string; optionFor: string; options?: optionsType[] };
const MenuOptions = ({ data }: { data: {} }) => {
  const [option, setOption] = useState<optionType[]>([]);
  const [text, setText] = useState<string>("");
  const [addTitle, setAddTitle] = useState<string>("");
  const [addInfo, setAddInfo] = useState<string>("");
  const [addPrice, setAddPrice] = useState("");
  useEffect(() => {
    setText(data?.data?.menu?.name);
  }, []);

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
  const handleTitleUpdate = (data) => {
    console.log("update title", { data, updateText: text });
  };
  const handleAdd = () => {
    console.log("add new Item", { data, addData: { addTitle, addInfo, addPrice, option } });
  };
  const handleAddOption = () => {
    setOption([...option, { name: "", optionFor: "", options: [] }]);
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
                  <div className="cursor-pointer">
                    <h2 className="  w-full cursor-pointer rounded-lg bg-rose-200 px-4 py-1 text-center text-rose-700">
                      Delete Hole Section
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
                  <div className="w-full cursor-pointer">
                    <h2 className="  w-full cursor-pointer rounded-lg bg-green-200 px-4 py-1 text-center text-green-700">
                      Edit Title
                    </h2>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogDescription>
                      <span>
                        <Input value={text} onChange={(e) => setText(e.target.value)} />
                      </span>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleTitleUpdate(data)}
                      className=" bg-green-200 text-green-700 hover:bg-green-300"
                    >
                      Update
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog>
                <AlertDialogTrigger>
                  <div className="w-full cursor-pointer">
                    <h2 className="w-full cursor-pointer rounded-lg bg-green-200 px-4 py-1 text-center text-green-700">
                      Add New Item
                    </h2>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <ScrollArea className="h-[500px] w-auto p-4">
                      <AlertDialogTitle>Add a New Item</AlertDialogTitle>
                      <AlertDialogDescription>
                        <div className="flex flex-col gap-1 px-2">
                          <Input
                            value={addTitle}
                            onChange={(e) => setAddTitle(e.target.value)}
                            placeholder="item"
                            type="text"
                          />
                          <Textarea
                            value={addInfo}
                            onChange={(e) => setAddInfo(e.target.value)}
                            placeholder="info"
                            type="text"
                          />
                          <Input
                            value={addPrice}
                            onChange={(e) => setAddPrice(parseInt(e.target.value))}
                            placeholder="price"
                            type="number"
                          />
                          {option.map((curr, idx) => (
                            <MenuOption
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
                    <AlertDialogAction onClick={handleAdd} className=" bg-green-200 text-green-700 hover:bg-green-300">
                      Add
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
export default MenuOptions;
