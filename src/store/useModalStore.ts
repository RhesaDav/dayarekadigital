import { create } from 'zustand';

type ModalType = 'add' | 'edit' | 'details' | 'transaction' | "add-product"

type ModalStore = {
  modalType: ModalType | null;
  isOpen: boolean;
  selectedItem: any;
  openModal: (type: ModalType, item?: any) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  modalType: null,
  isOpen: false,
  selectedItem: null,
  openModal: (type, item = null) => set({ isOpen: true, modalType: type, selectedItem: item }),
  closeModal: () => set({ isOpen: false, modalType: null, selectedItem: null }),
}));