/*
|-----------------------------------------
| setting up Loading for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: restaurant.mealnight.com, July, 2024
|-----------------------------------------
*/
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <main className="fixed left-[50px] top-0 h-screen w-full">
      <div className="flex h-screen w-full">
        <div className="flex h-screen w-[30vw] flex-col items-start justify-center gap-4 p-4 pt-12">
          <div className="flex flex-col gap-4 align-top">
            <div className="flex items-center justify-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full bg-slate-500" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-slate-500" />
                <Skeleton className="h-4 w-[200px] bg-slate-500" />
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full bg-slate-500" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-slate-500" />
                <Skeleton className="h-4 w-[200px] bg-slate-500" />
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full bg-slate-500" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-slate-500" />
                <Skeleton className="h-4 w-[200px] bg-slate-500" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 align-top">
            <div className="flex items-center justify-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full bg-slate-500" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-slate-500" />
                <Skeleton className="h-4 w-[200px] bg-slate-500" />
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full bg-slate-500" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-slate-500" />
                <Skeleton className="h-4 w-[200px] bg-slate-500" />
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full bg-slate-500" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-slate-500" />
                <Skeleton className="h-4 w-[200px] bg-slate-500" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 align-top">
            <div className="flex items-center justify-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full bg-slate-500" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-slate-500" />
                <Skeleton className="h-4 w-[200px] bg-slate-500" />
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full bg-slate-500" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-slate-500" />
                <Skeleton className="h-4 w-[200px] bg-slate-500" />
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full bg-slate-500" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-slate-500" />
                <Skeleton className="h-4 w-[200px] bg-slate-500" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-screen w-[70vw] flex-col items-center justify-center gap-4 p-4 pt-12">
          <div className="flex flex-col gap-4 align-top">
            <div className="flex items-center justify-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full bg-slate-500" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-slate-500" />
                <Skeleton className="h-4 w-[200px] bg-slate-500" />
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full bg-slate-500" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-slate-500" />
                <Skeleton className="h-4 w-[200px] bg-slate-500" />
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full bg-slate-500" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-slate-500" />
                <Skeleton className="h-4 w-[200px] bg-slate-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Loading;
