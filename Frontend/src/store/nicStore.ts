import { create } from "zustand";
import axios from "axios";
import type { NICData } from "../utils/nicValidation";
import { getAuthHeaders } from "./authStore";

interface NicStoreState {
  records: NICData[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  addRecord: (record: NICData) => void;
  clearRecords: () => void;

  validateAndAddNic: (
    nicNumber: string,
    dob: string,
    gender: "Male" | "Female"
  ) => Promise<void>;
  validateNic: (nicNumber: string) => Promise<NICData>;
  downloadPdfReport: () => Promise<void>;
  downloadExcelReport: () => Promise<void>;
  fetchRecords: () => Promise<void>;
  setError: (error: string | null) => void;
  setSuccessMessage: (message: string | null) => void;
  clearMessages: () => void;
}

const API_BASE_URL = "http://localhost:8080/api/nic";

export const useNicStore = create<NicStoreState>((set) => ({
  records: [],
  loading: false,
  error: null,
  successMessage: null,

  addRecord: (record) =>
    set((state) => ({ records: [record, ...state.records] })),
  clearRecords: () => set({ records: [] }),
  setError: (error) => set({ error }),
  setSuccessMessage: (successMessage) => set({ successMessage }),
  clearMessages: () => set({ error: null, successMessage: null }),

  validateAndAddNic: async (
    nicNumber: string,
    dob: string,
    gender: "Male" | "Female"
  ) => {
    set({ loading: true, error: null, successMessage: null });
    try {
      const response = await axios.post(
        `${API_BASE_URL}/add`,
        { nicNumber, dob, gender },
        { headers: getAuthHeaders() }
      );

      const data = response.data;

      if (data === null) {
        throw new Error("Received null response from server");
      }
      const newRecord: NICData = {
        isValid: data.isValid || true,
        type: data.type || (nicNumber.length === 10 ? "old" : "new"),
        gender,
        birthDate: new Date(dob),
        age: new Date().getFullYear() - new Date(dob).getFullYear(),
        originalNic: nicNumber.toUpperCase(),
      };

      set((state) => ({
        records: [newRecord, ...state.records],
        loading: false,
        successMessage: `NIC added successfully`,
      }));
    } catch (err) {
      let errorMessage = "Failed to added NIC";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      set({ error: errorMessage, loading: false });
      throw err;
    }
  },

  validateNic: async (inputNic: string) => {
    set({ loading: true, error: null, successMessage: null });
    try {
      const response = await axios.post(
        `${API_BASE_URL}/validate`,
        null,
        {
          params: { nic: inputNic },
          headers: getAuthHeaders(),
        }
      );

      const data = response.data;

      if (data === null) {
        throw new Error("Received null response from server");
      }

      const validationResult: NICData = {
        isValid: true,
        type: data.nicNumber?.length === 10 ? "old" : "new",
        gender: data.gender,
        birthDate: data.dob ? new Date(data.dob) : null,
        age: data.age,
        originalNic: data.nicNumber,
      };

      set((state) => ({
        records: [validationResult, ...state.records],
        loading: false,
        successMessage: `NIC validated`,
      }));

      return validationResult;
    } catch (err) {
      let errorMessage = "Validation failed";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      set({ error: errorMessage, loading: false });
      throw err;
    }
  },

  fetchRecords: async () => {
    set({ loading: true, error: null, successMessage: null });
    try {
      const response = await axios.get(`${API_BASE_URL}/get`, {
        headers: getAuthHeaders(),
      });

      const data = response.data;
      const rawRecords = Array.isArray(data) ? data : [data];

      const records: NICData[] = rawRecords
        .map((item: any) => ({
          isValid: true,
          type:
            item.nicNumber?.length === 10 ? ("old" as const) : ("new" as const),
          gender: item.gender,
          birthDate: new Date(item.dob),
          age: item.age,
          originalNic: item.nicNumber,
        }))
        .filter((record) => record.originalNic);

      set({
        records,
        loading: false,
        successMessage: `${records.length} records loaded`,
      });
    } catch (err) {
      let errorMessage = "Failed to fetch records";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      set({ error: errorMessage, loading: false });
    }
  },

  downloadPdfReport: async () => {
    set({ loading: true, error: null, successMessage: null });
    try {
      const response = await axios.get(`${API_BASE_URL}/report/pdf`, {
        headers: getAuthHeaders(),
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = globalThis.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `nic-report-${new Date().toISOString().split("T")[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      globalThis.URL.revokeObjectURL(url);

      set({ loading: false, successMessage: "PDF downloaded" });
    } catch (err) {
      let errorMessage = "Failed to download PDF";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      set({ error: errorMessage, loading: false });
      throw err;
    }
  },

  downloadExcelReport: async () => {
    set({ loading: true, error: null, successMessage: null });
    try {
      const response = await axios.get(`${API_BASE_URL}/report/excel`, {
        headers: getAuthHeaders(),
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = globalThis.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `nic-report-${new Date().toISOString().split("T")[0]}.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      globalThis.URL.revokeObjectURL(url);

      set({ loading: false, successMessage: "Excel downloaded" });
    } catch (err) {
      let errorMessage = "Failed to download Excel";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      set({ error: errorMessage, loading: false });
      throw err;
    }
  },
}));
