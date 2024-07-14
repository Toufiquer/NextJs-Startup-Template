/*
|-----------------------------------------
| setting up MenuItemCardWrapper for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: restaurant.mealnight.com, July, 2024
|-----------------------------------------
*/

"use client";

import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";

import MenuItem from "./menu-item";
import MenuOptions from "./menu-options";

dayjs.extend(localeData);

const MenuItemCardWrapper = ({ data }: { data: any[] }) => {
  const { menu } = data || {};
  return (
    <div className="mt-8 w-full">
      {menu?.info && <p className="w-full text-start text-sm">{menu.info}</p>}
      <div className="flex w-full flex-col">
        <div className="flex h-[40px] w-full items-center justify-between">
          <div className="w-full  text-xl font-bold md:text-2xl">{menu?.name?.toUpperCase()}</div>
          <MenuOptions data={{ data }} />
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {menu?.data?.lst?.map((curr, idx) => <MenuItem key={curr.item + idx} data={{ curr, parentData: data }} />)}
      </div>
    </div>
  );
};
export default MenuItemCardWrapper;
