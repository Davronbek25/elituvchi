import { Text, FlatList, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getMenu, getCategories } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import { useLocalSearchParams } from 'expo-router'
import CartButton from '@/components/CartButton'
import { MenuItem } from '@/type'
import MenuCard from '@/components/MenuCard'
import SearchBar from '@/components/SearchBar'
import Filter from '@/components/Filter'

const Search = () => {
  const { category, query } = useLocalSearchParams<{ category: string; query: string }>()

  const { data, refetch, loading } = useAppwrite({
    fn: getMenu,
    params: { category: '', query: '', limit: 20 },
  })

  const { data: categories } = useAppwrite({ fn: getCategories })

  useEffect(() => {
    refetch({ category: category, query: query, limit: 20 })
  }, [category, query])

  return (
    <SafeAreaView className="bg-background flex-1" edges={['top']}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View className="flex-1 max-w-[48%]">
            <MenuCard item={item as MenuItem} />
          </View>
        )}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName="gap-5"
        contentContainerClassName="gap-5 px-5 pb-32"
        ListHeaderComponent={() => (
          <View className="mt-4 mb-2 gap-4">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-xs font-inter-bold uppercase text-primary tracking-widest">Search</Text>
                <Text className="text-base font-inter text-dark-100 mt-0.5">Find your favorite food</Text>
              </View>
              <CartButton />
            </View>
            <SearchBar />
          <Filter categories={categories!} />
          </View>
        )}
        ListEmptyComponent={() =>
          !loading ? (
            <View className="items-center py-16">
              <Text className="text-base font-inter text-muted-foreground">No results found</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  )
}

export default Search
