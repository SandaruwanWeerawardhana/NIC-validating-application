import { create } from "zustand";
import type { NICData } from "../utils/nicValidation";

interface NicStoreState {
  records: NICData[];
  addRecord: (record: NICData) => void;
  clearRecords: () => void;
}

export const useNicStore = create<NicStoreState>((set) => ({
  records: [],
  addRecord: (record) =>
    set((state) => ({ records: [record, ...state.records] })),
  clearRecords: () => set({ records: [] }),
}));
