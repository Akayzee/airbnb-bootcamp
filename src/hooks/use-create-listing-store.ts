import { create, StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { updateListing } from "@/actions/listing/update-listing";
import { Listing } from "../../generated/prisma";

type ListingStoreState = {
  draft: Partial<Listing>;
};

type ListingStoreAction = {
  updateDraft: (draft: Partial<Listing>) => void;
  reset: () => void;
};

const initialState: ListingStoreState = {
  draft: {},
};

const useCreateListingStore = create<ListingStoreState & ListingStoreAction>(
  (set, get) => ({
    ...initialState,
    updateDraft: (draft) => set({ draft: { ...get().draft, ...draft } }),
    reset: () => set({ draft: {} }),
  })
);

export default useCreateListingStore;
