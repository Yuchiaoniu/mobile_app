import React from 'react';
import { Button as PaperButton } from 'react-native-paper';

export default function Button({ label, onPress }) {
  return <PaperButton mode="contained" onPress={onPress}>{label}</PaperButton>;
}
