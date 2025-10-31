import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TreeListScreen from '../screens/TreeListScreen';
import TreeDetailScreen from '../screens/TreeDetailScreen';
import TreeFormScreen from '../screens/TreeFormScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TreeList">
        <Stack.Screen name="TreeList" component={TreeListScreen} />
        <Stack.Screen name="TreeDetail" component={TreeDetailScreen} />
        <Stack.Screen name="TreeForm" component={TreeFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
