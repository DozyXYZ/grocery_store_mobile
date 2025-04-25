import { useState, useCallback } from "react";
import { database, authentication } from "../../Firebase-Config";
import { ref, get } from "firebase/database";
import { useFocusEffect } from "@react-navigation/native";

const useFetchOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrderHistory = useCallback(async () => {
    const userId = authentication.currentUser?.uid;
    if (!userId) return;

    const orderHistoryRef = ref(database, `users/${userId}/orderHistory`);
    try {
      const snapshot = await get(orderHistoryRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        setOrderHistory(data);
      } else {
        setOrderHistory([]);
      }
    } catch (error) {
      console.error("Error fetching order history:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchOrderHistory();
    }, [fetchOrderHistory])
  );

  return { orderHistory, loading };
};

export default useFetchOrderHistory;
