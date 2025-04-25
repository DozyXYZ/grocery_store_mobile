import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeColors } from "../utils/ThemeColors";
import { NavHeader } from "../components/NavHeader";
import { NavFooter } from "../components/NavFooter";
import { CollapsibleSection } from "../components/CollapsibleSection";
import { useRoute } from "@react-navigation/native";
import useFetchOrderHistory from "../hooks/useFetchOrderHistory";
import {
  OrderHistoryCell,
  OrderHistoryHeader,
} from "../components/OrderHistoryFields";

const OrderHistory = () => {
  const route = useRoute();
  const { username } = route.params || {};
  const { orderHistory } = useFetchOrderHistory();
  // console.log("Order History:", JSON.stringify(orderHistory, null, 2));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: ThemeColors.secondary }}>
      <NavHeader title={`${username}'s Order History`} />

      <View style={{ flex: 1, marginHorizontal: 10 }}>
        <FlatList
          data={Object.values(orderHistory)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CollapsibleSection
              title={`${formatDate(item.date)} - €${item.totalAmount}`}
            >
              {/* Headers */}
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  marginRight: 12,
                  marginBottom: 5,
                }}
              >
                <OrderHistoryHeader
                  title="Product"
                  style={{ flex: 2, textAlign: "center" }}
                />
                <OrderHistoryHeader title="Price" style={{}} />
                <OrderHistoryHeader title="Qty." />
                <OrderHistoryHeader title="Total" />
              </View>

              {/* Data rows */}
              {Object.values(item.items).map((product) => (
                <View
                  key={product.id}
                  style={{ flexDirection: "column", flex: 1, marginRight: 12 }}
                >
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <OrderHistoryCell
                      style={{ flex: 2, textAlign: "left" }}
                      value={
                        product.name.charAt(0).toUpperCase() +
                        product.name.slice(1)
                      }
                    />
                    <OrderHistoryCell value={product.price} />
                    <OrderHistoryCell value={product.quantity} />
                    <OrderHistoryCell
                      value={product.quantity * product.price}
                    />
                  </View>
                </View>
              ))}
            </CollapsibleSection>
          )}
        />
      </View>

      <NavFooter username={username} />
    </SafeAreaView>
  );
};

export default OrderHistory;
