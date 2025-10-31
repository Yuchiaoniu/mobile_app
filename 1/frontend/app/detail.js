import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import api from '../utils/api';

export default function TreeDetailScreen() {
  const { id } = useLocalSearchParams();
  const [tree, setTree] = useState(null);

  useEffect(() => {
    api.get('/trees/' + id)
      .then(res => setTree(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!tree) return <ActivityIndicator size="large" />;

  return (
    <View style={{ padding: 16 }}>
      <Text>height：{tree.height}</Text>
      <Text>radius：{tree.radius}</Text>
      <Text>volume：{tree.volume}</Text>
      <Text>maintain：{tree.maintain}</Text>
      <Text>name：{tree.name}</Text>
      <Text>treename：{tree.treename}</Text>
    </View>
  );
}
