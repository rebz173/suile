import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Bell, Map, TriangleAlert as AlertTriangle, FileText, User } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.lightGray,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTintColor: Colors.white,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ color, size }) => (
            <Bell color={color} size={size} />
          ),
          headerTitle: 'Súile',
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color, size }) => (
            <Map color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: 'Report',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.reportIconContainer}>
              <AlertTriangle color={Colors.white} size={size} />
            </View>
          ),
          tabBarLabel: '',
        }}
      />
      <Tabs.Screen
        name="updates"
        options={{
          title: 'Updates',
          tabBarIcon: ({ color, size }) => (
            <FileText color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.black,
    borderTopWidth: 0,
    elevation: 0,
    height: 60,
    paddingBottom: 5,
  },
  tabLabel: {
    fontWeight: '500',
    fontSize: 10,
  },
  header: {
    backgroundColor: Colors.black,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitle: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  reportIconContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 30,
    height: 46,
    width: 46,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
  },
});