import { TouchableOpacity, Text, View, Platform } from 'react-native'
import { Image } from 'expo-image'
import { MenuItem } from '@/type'
import { useCartStore } from '@/store/cart.store'
import { router } from 'expo-router'
import { PlusCircleIcon } from '@/components/icons'

const MenuCard = ({ item: { $id, image_url, name, price } }: { item: MenuItem }) => {
    const { addItem } = useCartStore()

    return (
        <TouchableOpacity
            className="menu-card"
            onPress={() => router.push(`/item/${$id}`)}
            activeOpacity={0.9}
            style={Platform.OS === 'android' ? { elevation: 6, shadowColor: '#878787' } : {}}
            >
            <Image
                source={{ uri: image_url }}
                style={{ width: '100%', height: 160, borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
                contentFit="cover"
            />
            <View className="p-3.5">
                <Text className="font-inter-bold text-base text-dark-100" numberOfLines={1}>{name}</Text>
                <Text className="text-sm font-inter text-muted-foreground mt-0.5">From ${price}</Text>
                <TouchableOpacity
                    className="flex-row items-center gap-1.5 mt-2.5"
                    onPress={() => addItem({ id: $id, name, price, image_url, customizations: [] })}
                >
                    <PlusCircleIcon />
                    <Text className="text-sm font-inter-semibold text-primary">Add to cart</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default MenuCard
