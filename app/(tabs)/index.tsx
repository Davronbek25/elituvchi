import '../globals.css'
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

import CartButton from "@/components/CartButton";
import { ArrowRightIcon, ChevronDownIcon } from "@/components/icons";

const categories = [
  {
    id: "6a394ed40004161dc382",
    label: "BURGERS",
    color: "#C8601A",
    query: "Burger",
    img: "https://www.tastesoflizzyt.com/wp-content/uploads/2023/07/bbq-bacon-burgers-7.jpg",
  },
  {
    id: "6a394ed4000d6fe2abf3",
    label: "PIZZAS",
    color: "#C89B3C",
    query: "Pizza",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=80",
  },
  {
    id: "6a394ed4001460f87312",
    label: "BURRITOS",
    color: "#A83D10",
    query: "Burrito",
    img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&q=80",
  },
  {
    id: "6a394ed4002cb82786bb",
    label: "BOWLS",
    color: "#1B5E3B",
    query: "Bowl",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlFjNxujgtWcGs4eOsCK5vooEWIS2kg51fiA&s",
  },
  {
    id: "6a394ed4002363524a0c",
    label: "WRAPS",
    color: "#7B3F00",
    query: "Wrap",
    img: "data:image/jpeg;base64,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",
  },
  {
    id: "6a394ed4001bdcb5b797",
    label: "SANDWICHES",
    color: "#B8860B",
    query: "Sandwich",
    img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=300&q=80",
  },
];

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-background pt-3" edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-6">
        {/* Header */}
        <View className="flex-row items-center justify-between pt-1 px-5 pb-4">
          <View>
            <Text className="text-xs font-inter-semibold text-gray-400 uppercase tracking-widest">
              Deliver To
            </Text>
            <TouchableOpacity className="flex-row items-center gap-1 mt-0.5">
              <Text className="text-base font-inter-semibold text-gray-800">
                Fergana, Uzbekistan
              </Text>
              <ChevronDownIcon color="#333" size={14} />
            </TouchableOpacity>
          </View>

          <CartButton />
        </View>

        {/* Featured Banner */}
        <TouchableOpacity
          className="mx-4 mb-3 rounded-2xl overflow-hidden h-52"
          activeOpacity={0.9}
          onPress={() => router.push(`/item/6a3fe53200306ba4a46d`)}
        >
          <View className="flex-1 bg-[#D4621C]">
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80" }}
              style={[StyleSheet.absoluteFillObject, { left: undefined, width: 208, opacity: 0.8 }]}
              contentFit="cover"
            />
            <LinearGradient
              colors={["#D4621C", "rgba(212,98,28,0.7)", "transparent"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFillObject}
            />
            <View className="absolute inset-0 justify-center pl-6">
              <Text className="text-white font-inter-black text-4xl uppercase leading-tight">
                Summer{"\n"}Combo
              </Text>
              <View className="mt-3 bg-black/20 rounded-lg px-4 py-1.5 self-start">
                <Text className="text-white font-inter-bold text-xl">$10.88</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Category Cards */}
        <View className="gap-3 mx-4">
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              activeOpacity={0.9}
              onPress={() => router.push(`/(tabs)/search?category=${cat.id}`)}
              className="rounded-2xl overflow-hidden h-32"
            >
              <View className="flex-1 flex-row items-center" style={{ backgroundColor: cat.color }}>
                <Image
                  source={{ uri: cat.img }}
                  style={[StyleSheet.absoluteFillObject, { left: undefined, width: 176, opacity: 0.7 }]}
                  contentFit="cover"
                />
                <LinearGradient
                  colors={[cat.color, "transparent"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={StyleSheet.absoluteFillObject}
                />
                <View className="pl-6 z-10">
                  <Text className="text-white font-inter-black text-3xl uppercase tracking-wide">
                    {cat.label}
                  </Text>
                  <View className="mt-2 w-8 h-8 bg-white/20 rounded-full items-center justify-center">
                    <ArrowRightIcon color="#fff" size={16} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
