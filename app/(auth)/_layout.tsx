import { images } from '@/constants'
import { Redirect, Slot } from 'expo-router'
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import useAuthStore from '@/store/auth.store'

export default function AuthLayout() {
  const { isAuthenticated } = useAuthStore()

  if (isAuthenticated) return <Redirect href='/' />

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView className="flex-1 bg-white" keyboardShouldPersistTaps="handled">
        {/* Hero image with gradient overlay */}
        <View className="h-72 relative">
          <Image
            source={images.loginGraphic}
            style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
            contentFit="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.65)']}
            className="absolute inset-0 w-full h-full"
          />
          {/* Headline */}
          <View className="absolute bottom-8 left-6 right-6">
            <Text className="text-3xl font-inter-extrabold text-white leading-tight">
              Get Started{'\n'}now
            </Text>
          </View>
        </View>

        {/* White card overlapping the image */}
        <View className="bg-white rounded-t-3xl -mt-6 px-6 pt-8 pb-4 min-h-screen">
          <Slot />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
