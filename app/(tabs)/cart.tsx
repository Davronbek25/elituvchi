import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { useCartStore } from '@/store/cart.store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import CartItem from '@/components/CartItem';
import { BackIcon } from '@/components/icons';
import { CartItemType } from '@/type';

const SummaryRow = ({
  label,
  value,
  valueColor = 'text-gray-800',
  bold = false,
}: {
  label: string;
  value: string;
  valueColor?: string;
  bold?: boolean;
}) => (
  <View className="flex-row justify-between items-center">
    <Text className={bold ? 'text-base font-inter-bold text-gray-800' : 'text-base font-inter text-gray-500'}>
      {label}
    </Text>
    <Text className={`text-base font-inter-semibold ${valueColor}`}>{value}</Text>
  </View>
);

const Header = () => (
  <View className="flex-row items-center justify-between px-5 pt-2 pb-4 bg-white">
    <TouchableOpacity onPress={() => router.back()} className="w-9 h-9 items-center justify-center">
      <BackIcon color="#111" size={24} />
    </TouchableOpacity>
    <View className="items-center">
      <Text className="text-xs font-inter-semibold text-orange uppercase tracking-widest">
        Delivery Location
      </Text>
      <Text className="text-base font-inter-bold text-gray-800">Home</Text>
    </View>
    <TouchableOpacity className="px-3 py-2 border border-orange rounded-full">
      <Text className="text-orange text-sm font-inter-semibold">Change Location</Text>
    </TouchableOpacity>
  </View>
);

const Cart = () => {
  const { items, getTotalItems, getTotalPrice } = useCartStore();

  const totalItems = getTotalItems();
  const subtotal = getTotalPrice();
  const discount = 0.5;
  const total = Math.max(0, subtotal - discount);

  const keyFor = (item: CartItemType) =>
    `${item.id}-${(item.customizations ?? []).map((c) => c.id).sort().join('_')}`;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={keyFor}
        contentContainerClassName="pb-32 pt-5"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Header />}
        ListEmptyComponent={
          <View className="items-center justify-center mt-40">
            <Text className="text-base font-inter-semibold text-gray-400">Your cart is empty</Text>
          </View>
        }
        ListFooterComponent={
          totalItems > 0 ? (
            <View className="px-4 mt-1">
              {/* Payment Summary */}
              <View
                className="bg-white rounded-2xl p-5 mt-3"
                style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 }}
              >
                <Text className="text-lg font-inter-bold text-gray-800 mb-4">Payment Summary</Text>
                <View className="gap-3">
                  <SummaryRow label={`Total Items (${totalItems})`} value={`$${subtotal.toFixed(2)}`} />
                  <SummaryRow label="Delivery Fee" value="Free" valueColor="text-success" />
                  <SummaryRow label="Discount" value={`-$${discount.toFixed(2)}`} valueColor="text-error" />
                  <View className="border-t border-gray-100 pt-3">
                    <SummaryRow label="Total" value={`$${total.toFixed(2)}`} valueColor="text-orange" bold />
                  </View>
                </View>
              </View>

              {/* Checkout */}
              <TouchableOpacity
                activeOpacity={0.9}
                className="w-full bg-orange py-5 rounded-2xl items-center mt-4"
              >
                <Text className="text-white font-inter-bold text-lg">Proceed to Checkout</Text>
              </TouchableOpacity>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  )
}

export default Cart
