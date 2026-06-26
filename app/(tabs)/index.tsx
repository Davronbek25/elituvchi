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
    id: "burgers",
    label: "BURGERS",
    color: "#C8601A",
    query: "Burger",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80",
  },
  {
    id: "pizza",
    label: "PIZZA",
    color: "#1B5E3B",
    query: "Pizza",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=80",
  },
  {
    id: "burrito",
    label: "BURRITO",
    color: "#A83D10",
    query: "Burrito",
    img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&q=80",
  },
];

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-background pt-5" edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-6 gap-3">
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 pt-2 pb-4">
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
          onPress={() => router.push("/search")}
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
        <View className="gap-3 mx-4 gap-y-5">
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              activeOpacity={0.9}
              onPress={() => router.push(`/search?query=${cat.query}`)}
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
