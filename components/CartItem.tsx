import { useCartStore } from "@/store/cart.store";
import { CartItemType } from "@/type";
import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { CheckIcon, TrashIcon } from "@/components/icons";

const QtyButton = ({ label, onPress }: { label: string; onPress: () => void }) => (
    <TouchableOpacity
        onPress={onPress}
        className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
    >
        <Text className="text-gray-600 font-inter-bold text-base">{label}</Text>
    </TouchableOpacity>
);

const CartItem = ({ item }: { item: CartItemType }) => {
    const { increaseQty, decreaseQty, removeItem } = useCartStore();
    const customizations = item.customizations ?? [];
    const unitPrice =
        (Number(item.price) || 0) +
        customizations.reduce((s, c) => s + (Number(c.price) || 0), 0);

    return (
        <View className="bg-white rounded-2xl p-4 flex-row items-center gap-3 mb-3 mx-4 mt-3"
            style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 }}
        >
            <View className="w-5 h-5 bg-orange rounded-md items-center justify-center">
                <CheckIcon color="#fff" size={12} />
            </View>

            <Image
                source={{ uri: item.image_url }}
                style={{ width: 72, height: 72, borderRadius: 14 }}
                contentFit="cover"
            />

            <View className="flex-1">
                <Text className="text-base font-inter-semibold text-gray-800" numberOfLines={1}>
                    {item.name}
                </Text>
                <Text className="text-base font-inter-bold text-gray-700 mt-0.5">
                    ${unitPrice.toFixed(2)}
                </Text>

                <View className="flex-row items-center gap-3 mt-2">
                    <QtyButton label="−" onPress={() => decreaseQty(item.id, customizations)} />
                    <Text className="text-base font-inter-semibold text-gray-800">{item.quantity}</Text>
                    <QtyButton label="+" onPress={() => increaseQty(item.id, customizations)} />
                </View>
            </View>

            <TouchableOpacity onPress={() => removeItem(item.id, customizations)}>
                <TrashIcon color="#FCA5A5" size={20} />
            </TouchableOpacity>
        </View>
    );
};

export default CartItem;
