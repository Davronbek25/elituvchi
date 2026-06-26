import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useCartStore } from '@/store/cart.store';
import { router } from 'expo-router';
import { CartGlyphIcon } from '@/components/icons';

const CartButton = () => {
    const { getTotalItems } = useCartStore();
    const totalItems = getTotalItems();

    return (
        <TouchableOpacity
            className="relative w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm"
            style={{ shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 2 }}
            onPress={() => router.push('/cart')}
        >
            <CartGlyphIcon color="#111" size={20} />

            {totalItems > 0 && (
                <View className="absolute -top-1 -right-1 bg-orange rounded-full w-4 h-4 items-center justify-center">
                    <Text className="text-white text-[10px] font-inter-bold">{totalItems}</Text>
                </View>
            )}
        </TouchableOpacity>
    )
}
export default CartButton
