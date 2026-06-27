import { Text, FlatList, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Category } from '@/type'
import { router, useLocalSearchParams } from 'expo-router'
import cn from 'clsx'

const Filter = ({ categories }: { categories: Category[] }) => {
    const searchParams = useLocalSearchParams()
    const [active, setActive] = useState(searchParams.category || 'all')

    const handlePress = (id: string) => {
        setActive(id)
        if (id === 'all') router.setParams({ category: undefined });
        else router.setParams({ category: id });
    }

    const filterData: (Category | { $id: string; name: string })[] = categories
        ? [{ $id: 'all', name: 'All' }, ...categories]
        : [{ $id: 'all', name: 'All' }]

    useEffect(() => {
        setActive(searchParams.category || 'all')
    }, [searchParams.category])

  return (
    <FlatList
        data={filterData}
        keyExtractor={(item) => item.$id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-x-2 pb-1"
        renderItem={({ item }) => (
            <TouchableOpacity
                key={item.$id}
                className={cn(
                    'px-5 py-2.5 rounded-full',
                    active === item.$id ? 'bg-primary' : 'bg-white border border-border'
                )}
                style={Platform.OS === 'android' ? { elevation: 3, shadowColor: '#878787' } : {}}
                onPress={() => handlePress(item.$id)}
            >
                <Text className={cn(
                    'text-sm font-inter-medium',
                    active === item.$id ? 'text-white' : 'text-muted-foreground'
                )}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        )}
    />
  )
}

export default Filter
