import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

import useAppwrite from "@/lib/useAppwrite";
import { getMenuItem, getMenuCustomizations } from "@/lib/appwrite";
import { useCartStore } from "@/store/cart.store";
import { CartCustomization, MenuItem } from "@/type";
import { images } from "@/constants";
import { BackIcon, SearchIcon, StarIcon, ClockIcon } from "@/components/icons";

type CustomizationDoc = {
  $id: string;
  name: string;
  price: number;
  type: string;
};

// Customizations have no image field in Appwrite, so map name -> local food image.
const CUSTOMIZATION_IMAGES: { match: string; img: number }[] = [
  { match: "cheese", img: images.cheese },
  { match: "onion ring", img: images.onionRings },
  { match: "onion", img: images.onions },
  { match: "mushroom", img: images.mushrooms },
  { match: "tomato", img: images.tomatoes },
  { match: "bacon", img: images.bacon },
  { match: "avocado", img: images.avocado },
  { match: "cucumber", img: images.cucumber },
  { match: "mozzarella", img: images.mozarellaSticks },
  { match: "wedge", img: images.fries },
  { match: "fries", img: images.fries },
  { match: "coleslaw", img: images.coleslaw },
  { match: "salad", img: images.salad },
];
const FALLBACK_IMG = images.salad;

const customizationImage = (name: string): number => {
  const n = name.toLowerCase();
  return CUSTOMIZATION_IMAGES.find((c) => n.includes(c.match))?.img ?? FALLBACK_IMG;
};

const StarRating = ({ rating, max = 5 }: { rating: number; max?: number }) => (
  <View className="flex-row gap-0.5">
    {Array.from({ length: max }).map((_, i) => (
      <StarIcon key={i} size={16} color={i < Math.floor(rating) ? "#F97316" : "#e5e7eb"} />
    ))}
  </View>
);

const NutritionCell = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-1 items-center">
    <Text className="text-xs text-gray-400 mb-1 font-inter">{label}</Text>
    <Text className="text-base font-inter-semibold text-gray-700">{value}</Text>
  </View>
);

const CustomizationChip = ({
  item,
  selected,
  onToggle,
}: {
  item: CustomizationDoc;
  selected: boolean;
  onToggle: () => void;
}) => (
  <TouchableOpacity 
    className="items-center mr-4" style={{ width: 88, opacity: selected ? 1 : 0.4 }}
    onPress={onToggle}
  >
    <View
      className="w-16 h-16 rounded-full overflow-hidden bg-gray-100"
      style={{ shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 2 }}
    >
      <Image source={customizationImage(item.name)} style={{ flex: 1 }} contentFit="cover" />
    </View>
    <View className="flex-row items-center gap-1 mt-2">
      <Text className="text-xs font-inter-semibold text-gray-700" numberOfLines={1} style={{ maxWidth: 64 }}>
        {item.name}
      </Text>
      <TouchableOpacity
        className="w-5 h-5 rounded-full items-center justify-center"
        style={{ backgroundColor: selected ? "#fee2e2" : "#dcfce7" }}
      >
        <Text
          className="text-[11px] font-inter-bold"
          style={{ color: selected ? "#ef4444" : "#16a34a" }}
        >
          {selected ? "×" : "+"}
        </Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

export default function ItemDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addItem } = useCartStore();
  const [selected, setSelected] = useState<Record<string, CartCustomization>>({});

  const { data: itemData, loading: itemLoading } = useAppwrite({
    fn: getMenuItem,
    params: { id: id! },
  });
  const { data: customizations } = useAppwrite({
    fn: getMenuCustomizations,
    params: { id: id! },
  });

  const item = itemData as unknown as MenuItem | null;
  const customizationDocs = (customizations ?? []) as unknown as CustomizationDoc[];


  if (itemLoading || !item) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#FE8C00" />
      </SafeAreaView>
    );
  }

  const toppings = customizationDocs.filter((c) => c.type === "topping");
  const sides = customizationDocs.filter((c) => c.type === "side");

  const imageUrl = item.image_url;
  const selectedList = Object.values(selected);
  const extrasTotal = selectedList.reduce((s, c) => s + (Number(c.price) || 0), 0);
  const totalPrice = item.price + extrasTotal;

  const toggle = (c: CustomizationDoc) => {
    setSelected((prev) => {
      const next = { ...prev };
      if (next[c.$id]) {
        delete next[c.$id];
      } else {
        next[c.$id] = { id: c.$id, name: c.name, price: Number(c.price) || 0, type: c.type };
      }
      return next;
    });
  };

  const handleAddToCart = () => {
    addItem({
      id: item.$id,
      name: item.name,
      price: item.price,
      image_url: imageUrl,
      customizations: selectedList,
    });
    router.push("/cart");
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-8">
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 pt-2 pb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-9 h-9 items-center justify-center"
          >
            <BackIcon color="#111" size={24} />
          </TouchableOpacity>
          <TouchableOpacity className="w-9 h-9 items-center justify-center">
            <SearchIcon color="#111" size={22} />
          </TouchableOpacity>
        </View>

        {/* Food image */}
        <View className="h-60 mx-4 rounded-2xl overflow-hidden bg-orange/10">
          <Image source={{ uri: imageUrl }} style={{ flex: 1 }} contentFit="contain" />
        </View>

        {/* Content */}
        <View className="px-5 pt-5">
          {/* Title */}
          <Text className="text-3xl font-inter-extrabold text-gray-900 text-center">
            {item.name}
          </Text>
          <Text className="text-base text-gray-400 text-center mt-1 font-inter">
            {item.type}
          </Text>
          <View className="flex-row items-center justify-center gap-2 mt-2">
            <StarRating rating={item.rating} />
            <Text className="text-sm font-inter-semibold text-gray-500">
              {item.rating}/5
            </Text>
          </View>

          {/* Nutrition */}
          <View className="flex-row mt-5 bg-gray-50 rounded-2xl p-5">
            <NutritionCell label="Price" value={`$${item.price.toFixed(2)}`} />
            <NutritionCell label="Calories" value={`${item.calories}`} />
            <NutritionCell label="Protein" value={`${item.protein}g`} />
          </View>

          {/* Delivery info */}
          <View className="flex-row flex-center items-center gap-3 mt-4 bg-background rounded-xl px-4 py-3">
            <View className="flex-row items-center gap-1.5">
              <View className="w-2.5 h-2.5 rounded-full bg-success" />
              <Text className="text-sm font-inter-semibold text-gray-600">
                Free Delivery
              </Text>
            </View>
            <Text className="text-gray-300">|</Text>
            <View className="flex-row items-center gap-1">
              <ClockIcon color="#555" size={16} />
              <Text className="text-sm font-inter text-gray-500">20 - 30 mins</Text>
            </View>
          </View>

          {/* Description */}
          <Text className="text-base text-gray-500 leading-relaxed mt-4 font-inter">
            {item.description}
          </Text>

          {/* Toppings */}
          {toppings.length > 0 && (
            <View className="mt-7">
              <Text className="text-lg font-inter-bold text-gray-800 mb-4">Toppings</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {toppings.map((t) => (
                  <CustomizationChip
                    key={t.$id}
                    item={t}
                    selected={!!selected[t.$id]}
                    onToggle={() => toggle(t)}
                  />
                ))}
              </ScrollView>
            </View>
          )}

          {/* Side options */}
          {sides.length > 0 && (
            <View className="mt-7">
              <Text className="text-lg font-inter-bold text-gray-800 mb-4">Side Options</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {sides.map((s) => (
                  <CustomizationChip
                    key={s.$id}
                    item={s}
                    selected={!!selected[s.$id]}
                    onToggle={() => toggle(s)}
                  />
                ))}
              </ScrollView>
            </View>
          )}

          {/* Add to Cart */}
          <TouchableOpacity
            onPress={handleAddToCart}
            activeOpacity={0.9}
            className="mt-8 w-full bg-orange py-5 rounded-2xl items-center"
          >
            <Text className="text-white font-inter-bold text-lg tracking-wide">
              Add to Cart — ${totalPrice.toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
