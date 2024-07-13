import { create } from "zustand";

interface IsearchStore {
	Usearch: string;
	setUsearch: (Usearch: string) => void;
}

export let useUsearch = create<IsearchStore>((set) => ({
	Usearch: "sas",
	setUsearch: (value: string) => {
		set({ Usearch: value });
	},
}));
