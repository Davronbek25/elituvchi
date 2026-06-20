import { SafeAreaView, Text, Button } from 'react-native'
import React from 'react'
import seed from '@/lib/seed'

const Search = () => {
  return (
    <SafeAreaView>
      <Text>Search</Text>

      <Button title='Seed' onPress={() => seed().catch((error)=> console.log('Failed to seed database', error))} />
    </SafeAreaView>
  )
}

export default Search