/*
|-----------------------------------------
| setting up MenuOptionUpdate for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: restaurant.mealnight.com, July, 2024
|-----------------------------------------
*/
import { useState } from "react";
import { PlusCircle, X } from "lucide-react";

import { Input } from "@/components/ui/input";

const MenuOptionUpdate = ({ data }: { data: any[] }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(undefined);
  const { curr, handleOptionData, handleRemoveOption, handleAddInnerOption, handleRemoveInnerOption, currIdx } =
    data || {};

  const renderData = (
    <span className="mb-8 flex w-full flex-col items-center justify-between">
      <h2 className="mt-6 w-full border-b">
        <p className="flex w-full items-center justify-between gap-2">
          <span>Option {currIdx + 1}</span>
          <X className="cursor-pointer" onClick={() => handleRemoveOption(currIdx)} />
        </p>
      </h2>
      <span className="flex w-full flex-col gap-4">
        <span className="flex w-full flex-col">
          <span className="mt-1 flex w-full items-center justify-start gap-2 border-b">
            <Input
              value={curr.name}
              placeholder="Option Name"
              onChange={(e) =>
                handleOptionData({
                  changeValue: e.target.value,
                  oldValue: curr,
                  changeKey: "name",
                  optionIndex: currIdx,
                })
              }
            />
          </span>
          <span className="mt-1 flex w-full items-center justify-start gap-2 border-b">
            <Input
              value={curr.optionFor}
              placeholder="Option For"
              onChange={(e) =>
                handleOptionData({
                  changeValue: e.target.value,
                  oldValue: curr,
                  changeKey: "optionFor",
                  optionIndex: currIdx,
                })
              }
            />
          </span>
          {curr.options?.map((o, idx) => (
            <span key={o + idx} className="flex w-full items-center justify-between gap-2">
              <span
                key={o.name}
                className={`flex w-full items-center justify-between gap-2 px-4 py-1 hover:bg-blue-100 `}
              >
                <h2>
                  <span className="pr-2">{idx + 1}.</span>
                  {o.name}
                </h2>
                <p className="flex items-center justify-end gap-2">
                  &#163; {o.price}
                  <X className="cursor-pointer" onClick={() => handleRemoveInnerOption(currIdx, idx)} />
                </p>
              </span>
            </span>
          ))}
          <span className="flex w-full items-center justify-between gap-2">
            <Input value={name} placeholder="Name " type="text" onChange={(e) => setName(e.target.value)} />
            <Input
              value={price}
              placeholder="Price"
              type="number"
              onChange={(e) => setPrice(parseInt(e.target.value))}
            />
            <PlusCircle
              className="h-12 w-12 cursor-pointer"
              onClick={() => {
                handleAddInnerOption(currIdx, { name, price });
                setName("");
                setPrice("");
              }}
            />
          </span>
        </span>
      </span>
    </span>
  );
  return renderData;
};
export default MenuOptionUpdate;
