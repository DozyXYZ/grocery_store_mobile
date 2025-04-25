import { createContext, useState, useContext } from "react";
import { ref, set, get } from "firebase/database";
import { database, authentication } from "../../Firebase-Config";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  const getUserId = () => authentication.currentUser.uid;

  const syncCartToDatabase = async (updatedCart) => {
    const userId = getUserId();
    if (!userId) return;
    const userCartRef = ref(database, `users/${userId}/cart`);
    await set(userCartRef, updatedCart);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = {
        ...prevCart,
        [product.id]: {
          id: product.id,
          name: product.name,
          img: product.img,
          price: product.price,
          units: product.units,
          quantity: (prevCart[product.id]?.quantity || 0) + 1,
        },
      };
      syncCartToDatabase(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[productId];
      syncCartToDatabase(updatedCart);
      return updatedCart;
    });
  };

  const clearCart = async () => {
    const userId = getUserId();
    if (!userId) return;

    const userCartRef = ref(database, `users/${userId}/cart`);
    await set(userCartRef, {});
    setCart({});
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) => {
      if (!prevCart[productId]) return prevCart;
      const updatedCart = {
        ...prevCart,
        [productId]: {
          ...prevCart[productId],
          quantity: prevCart[productId].quantity + 1,
        },
      };
      syncCartToDatabase(updatedCart);
      return updatedCart;
    });
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      if (!prevCart[productId]) return prevCart;
      const updatedCart = {
        ...prevCart,
        [productId]: {
          ...prevCart[productId],
          quantity: Math.max(prevCart[productId].quantity - 1, 1),
        },
      };
      syncCartToDatabase(updatedCart);
      return updatedCart;
    });
  };

  const fetchCartFromDatabase = async () => {
    const userId = getUserId();
    if (!userId) return;

    const userCartRef = ref(database, `users/${userId}/cart`);
    const snapshot = await get(userCartRef);
    if (snapshot.exists()) {
      setCart(snapshot.val());
    } else {
      setCart({});
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        fetchCartFromDatabase,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
