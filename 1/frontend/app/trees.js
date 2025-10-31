import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../utils/api';

export default function TreeListScreen() {
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    api.get('/trees')
      .then(res => setTrees(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View style={{ padding: 16 }}>
      <FlatList
        data={trees}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push('/detail?id=' + item.id)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity onPress={() => router.push('/form')}>
        <Text style={{ marginTop: 16 }}>➕ 新增樹木</Text>
      </TouchableOpacity>
    </View>
  );
}
