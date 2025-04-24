import React from "react";
import { FlatList, TouchableOpacity, Image, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeColors } from "../utils/ThemeColors";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "./CartContext";

export const StoreProductList = ({ products }) => {
  const nav = useNavigation();
  const { cart, addToCart, removeFromCart } = useCart();

  const renderProductItem = ({ item }) => {
    const isInCart = cart[item.id] !== undefined;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          borderWidth: 2,
          borderColor: ThemeColors.fifth,
          height: responsiveHeight(28),
          width: responsiveWidth(45),
          marginRight: 15,
          borderRadius: 15,
        }}
        onPress={() => nav.navigate("ProductDetails", { product: item })}
      >
        {/* Product Image */}
        <Image
          style={{
            height: 125,
            width: 120,
            alignSelf: "center",
            resizeMode: "contain",
          }}
          source={{ uri: item.img }}
        />

        {/* Product Name */}
        <View style={{ paddingHorizontal: 10, gap: 3 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </Text>

          {/* Product Unit */}
          <Text>{item.units}</Text>

          {/* Product Price */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "400" }}>
              €{item.price}
            </Text>

            {/* Add to Cart Icon */}
            {isInCart ? (
              <Ionicons
                name="cart-sharp"
                size={28}
                color={ThemeColors.sixth}
                onPress={() => removeFromCart(item.id)}
              />
            ) : (
              <Ionicons
                name="cart-sharp"
                size={28}
                color={ThemeColors.primary}
                onPress={() => addToCart(item)}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={products}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderProductItem}
    />
  );
};
