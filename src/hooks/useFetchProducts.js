import { useState, useEffect } from "react";
import { database } from "../../Firebase-Config";
import { ref, onValue } from "firebase/database";

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productsRef = ref(database, "products/");

    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedProducts = Object.keys(data).reduce((acc, category) => {
          acc[category] = Object.keys(data[category]).map((key) => ({
            id: key,
            ...data[category][key],
          }));
          return acc;
        }, {});
        setProducts(formattedProducts);
      } else {
        setProducts({});
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { products, loading };
};

export default useFetchProducts;
