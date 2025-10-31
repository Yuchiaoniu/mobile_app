import React from 'react';
import { TextInput } from 'react-native-paper';

export default function InputField({ label, value, onChangeText, keyboardType }) {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType || 'default'}
      mode="outlined"
    />
  );
}
