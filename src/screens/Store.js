import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeColors } from "../utils/ThemeColors";
import { StoreProductTitle } from "../components/StoreProductTitle";
import useFetchProducts from "../hooks/useFetchProducts";
import { StoreProductList } from "../components/StoreProductList";
import { NavHeader } from "../components/NavHeader";
import { NavFooter } from "../components/NavFooter";
import { useRoute } from "@react-navigation/native";

const Store = () => {
  const { products, loading } = useFetchProducts();
  const route = useRoute();
  const { userData } = route.params || {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: ThemeColors.secondary }}>
      <NavHeader title={`Hello ${userData.username}!`} />

      <ScrollView
        style={{ flex: 1, paddingHorizontal: 20, paddingTop: 10 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 20 }}>
          {loading ? (
            <ActivityIndicator size="large" color={ThemeColors.primary} />
          ) : Object.keys(products).length > 0 ? (
            Object.keys(products).map((category) => (
              <View key={category}>
                <StoreProductTitle
                  title={category.charAt(0).toUpperCase() + category.slice(1)}
                />
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

      <NavFooter userData={userData} />
    </SafeAreaView>
  );
};

export default Store;
