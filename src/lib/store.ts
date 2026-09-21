import { create } from 'zustand';

// Theme Store
interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: false,
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
}));

// UI Store
interface UIState {
  sidebarOpen: boolean;
  activeModal: string | null;
  searchQuery: string;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setActiveModal: (modal: string | null) => void;
  setSearchQuery: (query: string) => void;
}

// Detect initial screen size for responsive sidebar
const isLargeScreen = typeof window !== 'undefined' ? window.innerWidth >= 1024 : true;

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: isLargeScreen,
  activeModal: null,
  searchQuery: '',
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActiveModal: (modal) => set({ activeModal: modal }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

// Budget Store
interface BudgetState {
  activeBudgetId: string | null;
  setActiveBudget: (id: string | null) => void;
}

export const useBudgetStore = create<BudgetState>((set) => ({
  activeBudgetId: null,
  setActiveBudget: (id) => set({ activeBudgetId: id }),
}));

// Toast Store
interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
}

interface ToastState {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).slice(2);
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 4000);
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
