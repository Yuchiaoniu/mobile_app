import React, { useState } from 'react';
import { View, TextInput, Button, Alert, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../utils/api';

export default function TreeFormScreen() {
  const router = useRouter();
  const [height, setHeight] = useState('');
  const [radius, setRadius] = useState('');
  const [volume, setVolume] = useState('');
  const [maintain, setMaintain] = useState('');
  const [name, setName] = useState('');
  const [treename, setTreename] = useState('');

  const handleSubmit = () => {
    api.post('/trees', {
      height,
      radius,
      volume,
      maintain,
      name,
      treename,
    })
      .then(() => {
        Alert.alert('✅ 新增成功');
        router.back();
      })
      .catch(() => Alert.alert('❌ 新增失敗'));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput style={styles.input} placeholder="height" value={height} onChangeText={setHeight} />
      <TextInput style={styles.input} placeholder="radius" value={radius} onChangeText={setRadius} />
      <TextInput style={styles.input} placeholder="volume" value={volume} onChangeText={setVolume} />
      <TextInput style={styles.input} placeholder="maintain" value={maintain} onChangeText={setMaintain} />
      <TextInput style={styles.input} placeholder="name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="treename" value={treename} onChangeText={setTreename} />
      <Button title="送出" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

