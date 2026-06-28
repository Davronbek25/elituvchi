import { View, Text, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '@/lib/appwrite'
import useAuthStore from '@/store/auth.store'

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const { fetchAuthenticatedUser } = useAuthStore()

  const submit = async () => {
    const { name, email, password } = form
    if (!name || !email || !password) return Alert.alert('Error', 'Please enter valid email & password')

    setIsSubmitting(true)
    try {
      await createUser({ name, email, password })
      await fetchAuthenticatedUser()
      router.replace('/')
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <View className="gap-6">
      {/* Tab switcher */}
      <View className="flex-row bg-muted rounded-full p-1">
        <TouchableOpacity
          className="flex-1 py-2.5 items-center"
          onPress={() => router.replace('/sign-in')}
        >
          <Text className="text-sm font-inter text-muted-foreground">Log In</Text>
        </TouchableOpacity>
        <View className="flex-1 bg-white rounded-full py-2.5 items-center shadow-sm shadow-black/10">
          <Text className="text-sm font-inter-semibold text-dark-100">Sign Up</Text>
        </View>
      </View>

      {/* Inputs */}
      <CustomInput
        placeholder="Enter your full name"
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
        label="Full Name"
        variant="underline"
      />
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
        title="Sign Up"
        isLoading={isSubmitting}
        onPress={submit}
      />

      <View className="flex-row justify-center gap-1 mt-2">
        <Text className="text-sm font-inter text-muted-foreground">Already have an account?</Text>
        <Link href="/sign-in" className="text-sm font-inter-semibold text-primary">Log In</Link>
      </View>
    </View>
  )
}

export default SignUp
