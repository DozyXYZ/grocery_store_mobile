import { useEffect, useState } from "react";
import { authentication, database } from "../../Firebase-Config";
import { Alert } from "react-native";
import { ref, get, set, remove } from "firebase/database";

const useFavoriteStatus = (productId) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const user = authentication.currentUser;
        if (!user) {
          setIsFavorite(false);
          setLoading(false);
          return;
        }

        const favoritesRef = ref(
          database,
          `users/${user.uid}/favorites/${productId}`
        );
        const snapshot = await get(favoritesRef);

        if (snapshot.exists()) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      } catch (error) {
        console.error("Error checking favorite status:", error);
        setIsFavorite(false);
      } finally {
        setLoading(false);
      }
    };

    checkFavoriteStatus();
  }, [productId]);

  const toggleFavorite = async (product) => {
    try {
      const user = authentication.currentUser;
      if (!user) {
        Alert.alert("Error", "You must be logged in to add favorites.");
        return;
      }

      const favoritesRef = ref(
        database,
        `users/${user.uid}/favorites/${product.id}`
      );

      if (isFavorite) {
        await remove(favoritesRef);
        setIsFavorite(false);
      } else {
        await set(favoritesRef, {
          name: product.name,
          img: product.img,
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error toggling favorite status:", error);
      Alert.alert("Error", error.message || "An error occurred.");
    }
  };

  return { isFavorite, loading, toggleFavorite };
};

export default useFavoriteStatus;
