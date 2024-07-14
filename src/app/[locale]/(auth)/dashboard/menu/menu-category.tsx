/*
|-----------------------------------------
| setting up MenuCategory for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: restaurant.mealnight.com, December, 2023
|-----------------------------------------
*/
import { Button } from "@/components/ui/button";

import SearchBar from "./search-bar";
import MenuItemCardWrapper from "./menu-item-card-wrapper";

const MenuCategory = ({ data }: { data: any[] }) => {
  const { menuArr } = data || {};
  return (
    <main className="w-full">
      <div className="grid w-full grid-cols-1 items-center justify-between gap-4 md:grid-cols-[1fr_200px] ">
        <SearchBar className="w-full" />
        <Button>Add New Menu</Button>
      </div>

      <div className="grid w-full grid-cols-1">
        {menuArr.map((menu) => (
          <MenuItemCardWrapper key={menu.name} data={{ menu }} />
        ))}
      </div>
    </main>
  );
};
export default MenuCategory;
