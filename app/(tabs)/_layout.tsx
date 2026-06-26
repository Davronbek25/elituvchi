import { ReactElement } from 'react'
import useAuthStore from '@/store/auth.store'
import { Redirect, Tabs } from 'expo-router'
import { View, Text } from 'react-native'
import cn from "clsx"
import {
  CartIcon,
  HomeIcon,
  ProfileIcon,
  SearchIcon,
  ORANGE,
  INACTIVE,
} from '@/components/icons'

type TabIconProps = {
  focused: boolean
  title: string
  Icon: (props: { color?: string; size?: number }) => ReactElement
}

const TabBarIcon = ({ focused, title, Icon }: TabIconProps) => (
  <View className="items-center justify-center gap-1 min-w-[56px]">
    <Icon color={focused ? ORANGE : INACTIVE} size={26} />
    <Text
      className={cn(
        'text-xs font-inter-medium',
        focused ? 'text-orange' : 'text-gray-400'
      )}
    >
      {title}
    </Text>
  </View>
)

export default function TabLayout() {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) return <Redirect href="/sign-in" />

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#f3f4f6',
          height: 88,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Home" Icon={HomeIcon} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Search" Icon={SearchIcon} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Cart" Icon={CartIcon} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Profile" Icon={ProfileIcon} focused={focused} />
          ),
        }}
      />
    </Tabs>
  )
}
