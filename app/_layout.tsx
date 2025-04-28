import { useEffect } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import Colors from '@/constants/Colors';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.black }}>
      <Stack screenOptions={{ 
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
        animation: 'slide_from_right',
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="(details)" 
          options={{ 
            presentation: 'card',
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="(modals)" 
          options={{ 
            presentation: 'modal',
            headerShown: false,
          }} 
        />
        <Stack.Screen name="+not-found" options={{ title: 'Not Found' }} />
      </Stack>
      <StatusBar style="light" />
    </View>
  );
}