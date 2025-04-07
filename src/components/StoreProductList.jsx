import React from "react";
import { FlatList, TouchableOpacity, Image, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ThemeColors } from "../utils/ThemeColors";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export const StoreProductList = ({ products }) => {
  const renderProductItem = ({ item }) => (
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
    >
      <Image
        style={{
          height: 125,
          width: 120,
          alignSelf: "center",
          resizeMode: "contain",
        }}
        source={{ uri: item.img }}
      />

      <View style={{ paddingHorizontal: 10, gap: 3 }}>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>

        <Text>{item.units}</Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "400" }}>€{item.price}</Text>

          <FontAwesome
            name="plus-square"
            size={33}
            color={ThemeColors.primary}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

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
