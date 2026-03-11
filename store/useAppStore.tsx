import { create } from "zustand"
import { persist } from "zustand/middleware"

type Store = {
  user: User | null
  setUser: (user: User | null) => void
  isLogin: boolean
  setIsLogin: (isLogin: boolean) => void
  resetAppData: () => void
  mounted: boolean
  setMounted: (mounted: boolean) => void
}

const useAppStore = create<Store>()(
  persist(
    (set) => ({
      user: null as User | null,
      setUser: (user: User | null) => set({ user }),
      isLogin: false,
      setIsLogin: (isLogin: boolean) => set({ isLogin }),
      resetAppData: () =>
        set({
          user: null,
          isLogin: false,
        }),
      mounted: false,
      setMounted: (mounted: boolean) => set({ mounted }),
    }),
    {
      name: "app-store",
      partialize: (state: Store) => ({
        user: state.user,
        isLogin: state.isLogin,
        mounted: state.mounted,
      }),
      onRehydrateStorage: () => {
        return (state: Store | undefined, error: unknown) => {
          if (error) {
            console.log("An error occurred during hydration", error)
          } else if (state?.setMounted) {
            state.setMounted(true)
          }
        }
      },
    }
  )
)

export default useAppStore
