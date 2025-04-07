import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeColors } from "../utils/ThemeColors";
import { StoreProductTitle } from "../components/StoreProductTitle";
import useFetchProducts from "../hooks/useFetchProducts";
import { StoreProductList } from "../components/StoreProductList";

const Store = () => {
  const { products, loading } = useFetchProducts();
  console.log(products);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: ThemeColors.secondary }}>
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 20, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 20 }}>
          {loading ? (
            <ActivityIndicator size="large" color={ThemeColors.primary} />
          ) : Object.keys(products).length > 0 ? (
            Object.keys(products).map((category) => (
              <View key={category}>
                <StoreProductTitle title={category} />
                <StoreProductList products={products[category]} />
              </View>
            ))
          ) : (
            <Text style={{ color: ThemeColors.primary, textAlign: "center" }}>
              No products available.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Store;
