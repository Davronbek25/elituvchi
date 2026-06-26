import { View, Text, TextInput } from 'react-native'
import { useState } from 'react'
import { CustomInputProps } from '@/type'
import cn from "clsx"

const CustomInput = ({
    placeholder = 'Enter text',
    value,
    onChangeText,
    label,
    secureTextEntry = false,
    keyboardType = 'default',
    variant = 'outlined',
}: CustomInputProps) => {
    const [isFocused, setIsFocused] = useState(false);

  return (
    <View className='w-full'>
      {variant === 'outlined' ? (
        <Text className='label'>{label}</Text>
      ) : (
        <Text className='text-xs font-inter text-muted-foreground mb-1'>{label}</Text>
      )}

      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor='#aaa'
        className={cn(
          variant === 'outlined'
            ? cn('input', isFocused ? 'border-primary' : 'border-gray-300')
            : cn('input-underline', isFocused ? 'border-primary' : 'border-gray-300')
        )}
      />
    </View>
  )
}

export default CustomInput
