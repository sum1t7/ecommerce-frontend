import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import toast, { Toast } from "react-hot-toast";

interface CartItem {
  item: ProductType;
  quantity: number;
  color?: string;
  size?: string;
}

interface CartStore {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (_d: string) => void;
  increaseQuantity: (_id: string) => void;
    decreaseQuantity: (_id: string) => void;
  clearCart: () => void;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cartItems: [],
      addItem: (data: CartItem) => {
        const { item, quantity, color, size } = data;
        const currentItems = get().cartItems;
        const existingItem = currentItems.find(
          (cartItem) => cartItem.item._id === item._id
        );
        if (existingItem) {
          return toast("Item already in cart", { icon: "🛒" });
        }
        set({ cartItems: [...currentItems, { item, quantity, color, size }] });
        toast("Item added to cart", { icon: "🛒" });
      },


      removeItem: (_id: string) => {
        const newCartItems = get().cartItems.filter(
          (cartItem) => cartItem.item._id !== _id
        );
        set({ cartItems: newCartItems });
        toast("Item removed", { icon: "🗑️" });
      },


      increaseQuantity: (_id: string) => {
        const newCartItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === _id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        set({ cartItems: newCartItems });
        toast("quantity Increased", { icon: "🔼" });
      },
      decreaseQuantity: (_id: string) => {
        const newCartItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === _id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
        set({ cartItems: newCartItems });
        toast.success("quantity Decreased" );
      },
      clearCart: () => {
        set({ cartItems: [] });
        toast("Cart cleared", { icon: "🗑️" });
      }


    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
