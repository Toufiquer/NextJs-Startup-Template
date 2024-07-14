/*
|-----------------------------------------
| setting up GlobalStore for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, April, 2024
|-----------------------------------------
*/

"use client";

import { create } from "zustand";

export type initRenderOnboardingStatusType = {
  currentBoard: string;
  newBoard: boolean;
  isRender: boolean;
  isUpdate: boolean;
  isAddBoard: boolean;
  isUpdateBoard: boolean;
  isDeleteBoard: boolean;
  isAddTask: boolean;
  isUpdateTask: boolean;
  isDeleteTask: boolean;
  isViewTask: boolean;
  currentTitle: string;
  currentDescription: string;
  currentId: string;
};
export const initRenderOnboardingStatus: initRenderOnboardingStatusType = {
  currentBoard: "",
  newBoard: false,
  isRender: false,
  isUpdate: false,
  isAddBoard: false,
  isUpdateBoard: false,
  isDeleteBoard: false,
  isAddTask: false,
  isUpdateTask: false,
  isDeleteTask: false,
  isViewTask: false,
  currentTitle: "",
  currentDescription: "",
  currentId: "",
};
interface useGlobalStoreType {
  isRestaurant: boolean;
  setIsRestaurant: (payload: any) => void;
  currentItem: string;
  setCurrentItem: (payload: any) => void;
  apiData: any;
  setApiData: (payload: any) => void;
  mutationData: any;
  setMutationData: (payload: any) => void;
  dashboardData: any;
  setDashboardData: (payload: any) => void;
  boardTask: {
    data: {
      id: string;
      title: string;
      description?: string | undefined;
      status?: string;
      lstUpdate: Date | any;
    }[];
    statusLst: { id: string; title: string; description?: string }[];
  };
  setBoardTask: (payload: any) => void;
  onBoardingStatus: initRenderOnboardingStatusType;
  setonBoardingStatus: (payload: any) => void;
}
export const useGlobalStore = create<useGlobalStoreType>((set) => ({
  isRestaurant: true,
  setIsRestaurant: (payload) => set(() => ({ isRestaurant: payload })),
  currentItem: "",
  setCurrentItem: (payload) => set(() => ({ currentItem: payload })),
  apiData: [],
  setApiData: (payload) => set(() => ({ apiData: payload })),
  mutationData: {},
  setMutationData: (payload) => set(() => ({ mutationData: payload })),
  dashboardData: {},
  setDashboardData: (payload) => set(() => ({ dashboardData: payload })),
  boardTask: {
    data: [],
    statusLst: [
      { id: "1", title: "Task" },
      { id: "2", title: "Inprogress" },
      { id: "3", title: "Done" },
    ],
  },
  setBoardTask: (payload) => set(() => ({ boardTask: payload })),
  onBoardingStatus: initRenderOnboardingStatus,
  setonBoardingStatus: (payload) => set(() => ({ onBoardingStatus: payload })),
}));
