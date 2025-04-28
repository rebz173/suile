import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';

export default function ModalLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.black,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: Colors.background,
        },
        presentation: 'modal',
        headerShown: true,
      }}
    />
  );
}