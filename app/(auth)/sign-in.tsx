import { View, Text, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { signIn } from '@/lib/appwrite'
import * as Sentry from '@sentry/react-native'
import useAuthStore from '@/store/auth.store'

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const { fetchAuthenticatedUser } = useAuthStore()

  const submit = async () => {
    const { email, password } = form
    if (!email || !password) return Alert.alert('Error', 'Please enter valid email & password')

    setIsSubmitting(true)
    try {
      await signIn({ email, password })
      await fetchAuthenticatedUser()
      router.replace('/')
    } catch (error: any) {
      Alert.alert('Error', error.message)
      Sentry.captureEvent(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <View className="gap-6">
      {/* Tab switcher */}
      <View className="flex-row bg-muted rounded-full p-1">
        <View className="flex-1 bg-white rounded-full py-2.5 items-center shadow-sm shadow-black/10">
          <Text className="text-sm font-inter-semibold text-dark-100">Log In</Text>
        </View>
        <TouchableOpacity
          className="flex-1 py-2.5 items-center"
          onPress={() => router.replace('/sign-up')}
        >
          <Text className="text-sm font-inter text-muted-foreground">Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Inputs */}
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="Email"
        keyboardType="email-address"
        variant="underline"
      />
      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) => setForm((prev) => ({ ...prev, password: text }))}
        label="Password"
        secureTextEntry={true}
        variant="underline"
      />

      <CustomButton
        title="Log In"
        isLoading={isSubmitting}
        onPress={submit}
      />

      <View className="flex-row justify-center gap-1 mt-2">
        <Text className="text-sm font-inter text-muted-foreground">Don't have an account?</Text>
        <Link href="/sign-up" className="text-sm font-inter-semibold text-primary">Sign Up</Link>
      </View>
    </View>
  )
}

export default SignIn
