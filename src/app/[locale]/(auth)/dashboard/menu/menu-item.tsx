/*
|-----------------------------------------
| setting up MenuItem for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: restaurant.mealnight.com, July, 2024
|-----------------------------------------
*/
import { Salad } from "lucide-react";
import MenuSingleItemOptions from "./menu-single-item-options";

const MenuItem = ({ data }: { data: any[] }) => {
  const { curr } = data || {};
  return (
    <div key={curr} className="flex h-auto flex-col items-center justify-center rounded-lg border p-4">
      <div className="flex w-full items-center justify-between gap-4">
        <Salad className="h-[60px] w-[60px] text-orange-200" />
        <div className="flex w-full flex-col justify-start">
          <h2 className="text-xl font-bold">{curr.item}</h2>
          <p className="mt-0 pt-0">
            <strong>{curr.price}</strong>
          </p>
        </div>
        <div className="mt-[-30px]">
          <MenuSingleItemOptions data={{ data }} />
        </div>
      </div>
      {data.curr?.option?.length > 0 && (
        <p className="w-full text-start font-semibold">Include Options: {data.curr?.option?.length}</p>
      )}
      {curr.info && <p className="w-full  text-start">{curr.info}</p>}
    </div>
  );
};
export default MenuItem;
