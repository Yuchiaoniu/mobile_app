import { View, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="查看樹木列表" onPress={() => router.push('/trees')} />
      <Button title="新增樹木" onPress={() => router.push('/form')} />
    </View>
  );
}