import { View, Text, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeColors } from "../utils/ThemeColors";
import { NavHeader } from "../components/NavHeader";
import { NavFooter } from "../components/NavFooter";
import { useRoute } from "@react-navigation/native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { AntDesign } from "@expo/vector-icons";
import { useCart } from "../components/CartContext";
import { useEffect } from "react";

const Cart = () => {
  const route = useRoute();
  const { userData } = route.params || {};

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    fetchCartFromDatabase,
  } = useCart();
  console.log("FlatList Data:", Object.values(cart));

  useEffect(() => {
    fetchCartFromDatabase();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: ThemeColors.secondary }}>
      <NavHeader title="Cart" />

      <View style={{ flex: 1 }}>
        {Object.keys(cart).length === 0 ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: ThemeColors.primary, fontSize: 20 }}>
              Your Cart is empty! 😔
            </Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Object.values(cart)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  height: responsiveHeight(18),
                  borderBottomWidth: 1,
                  borderBottomColor: ThemeColors.fifth,
                  flexDirection: "row",
                }}
              >
                {/* Product Image */}
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={{ height: 100, width: 100, resizeMode: "contain" }}
                    source={{ uri: item.img }}
                  />
                </View>

                {/* Product Details */}
                <View
                  style={{
                    flex: 2,
                    paddingHorizontal: 10,
                    paddingVertical: 20,
                  }}
                >
                  {/* Product Name + Remove Icon */}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontSize: 20, fontWeight: "600" }}>
                      {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                    </Text>

                    <AntDesign
                      name="close"
                      size={25}
                      color={ThemeColors.fourth}
                      onPress={() => removeFromCart(item.id)}
                    />
                  </View>

                  {/* Product Unit */}
                  <Text
                    style={{
                      fontSize: 17,
                      color: ThemeColors.fourth,
                      marginTop: 5,
                    }}
                  >
                    {item.units}
                  </Text>

                  {/* Product Quantity + Price */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <AntDesign
                        name="minuscircle"
                        size={30}
                        color={ThemeColors.primary}
                        onPress={() => decreaseQuantity(item.id)}
                      />

                      <Text style={{ fontSize: 17 }}>{item.quantity}</Text>

                      <AntDesign
                        name="pluscircle"
                        size={30}
                        color={ThemeColors.primary}
                        onPress={() => increaseQuantity(item.id)}
                      />
                    </View>

                    <Text style={{ fontSize: 22, fontWeight: "600" }}>
                      €{(item.price * item.quantity).toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>

      <NavFooter userData={userData} />
    </SafeAreaView>
  );
};

export default Cart;
