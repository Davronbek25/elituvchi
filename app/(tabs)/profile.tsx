import { View, Text, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import useAuthStore from '@/store/auth.store'
import { account } from '@/lib/appwrite'
import { SearchIcon, PencilIcon, LogoutIcon, UserIcon, MailIcon } from '@/components/icons'

const ProfileField = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
  <View className="flex-row items-center py-4">
    <View className="size-11 rounded-full bg-primary/10 items-center justify-center mr-4">
      {icon}
    </View>
    <View className="flex-1">
      <Text className="text-xs font-inter text-muted-foreground mb-0.5">{label}</Text>
      <Text className="text-sm font-inter-semibold text-dark-100">{value}</Text>
    </View>
  </View>
)

const Profile = () => {
  const { user, setIsAuthenticated, setUser } = useAuthStore()

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await account.deleteSession('current')
          } catch (_) {}
          setIsAuthenticated(false)
          setUser(null)
          router.replace('/sign-in')
        },
      },
    ])
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-4">
        <View className="size-10" />
        <Text className="text-lg font-inter-bold text-dark-100">Profile</Text>
        <TouchableOpacity
          className="size-10 rounded-full bg-white items-center justify-center"
          style={Platform.OS !== 'android' ? { shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } } : { elevation: 3 }}
          onPress={() => router.push('/search')}
        >
          <SearchIcon color="#555" size={18} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-12">
        {/* Avatar */}
        <View className="items-center py-6">
          <View className="relative">
            <Image
              source={{ uri: user?.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user?.name || 'U') + '&background=FE8C00&color=fff&size=128' }}
              className="size-28 rounded-full border-4 border-white"
              contentFit="cover"
              style={Platform.OS !== 'android' ? { shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } } : {}}
            />
            <View className="absolute bottom-0 right-0 size-8 bg-primary rounded-full items-center justify-center border-2 border-white">
              <PencilIcon color="#fff" size={12} />
            </View>
          </View>
          <Text className="text-lg font-inter-bold text-dark-100 mt-3">{user?.name || 'Guest'}</Text>
          <Text className="text-sm font-inter text-muted-foreground mt-0.5">{user?.email || ''}</Text>
        </View>

        {/* Info card */}
        <View
          className="mx-5 bg-white rounded-2xl px-5"
          style={Platform.OS !== 'android' ? { shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } } : { elevation: 2 }}
        >
          <ProfileField
            label="Full Name"
            value={user?.name || '—'}
            icon={<UserIcon color="#FE8C00" size={18} />}
          />
          <View className="h-px bg-border" />
          <ProfileField
            label="Email Address"
            value={user?.email || '—'}
            icon={<MailIcon color="#FE8C00" size={18} />}
          />
        </View>

        {/* Action buttons */}
        <View className="mx-5 mt-6 gap-3">
          <TouchableOpacity className="border border-primary rounded-2xl py-3.5 items-center">
            <Text className="text-sm font-inter-semibold text-primary">Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="border border-error rounded-2xl py-3.5 flex-row items-center justify-center gap-2"
            onPress={handleLogout}
          >
            <LogoutIcon color="#F14141" size={18} />
            <Text className="text-sm font-inter-semibold text-error">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile
