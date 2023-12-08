import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/redux/store";

interface IState {
  isCollapsed: boolean;
}

const initialState: IState = {
  isCollapsed: true,
};

const slice = createSlice({
  name: "sidebar-collapse",
  initialState: initialState,
  reducers: {
    sidebarToggleCollapse: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
  },
});

export const { sidebarToggleCollapse } = slice.actions;
export const selectSidebarCollapse = (state: RootState) => state.sidebarCollapse;
export default slice.reducer;
