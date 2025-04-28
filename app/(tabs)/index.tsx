import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { Bell, Filter, Settings } from 'lucide-react-native';
import AlertCard from '@/components/AlertCard';
import EmergencyButton from '@/components/EmergencyButton';
import Colors from '@/constants/Colors';

// Mock data for alerts
const mockAlerts = [
  {
    id: '1',
    title: 'Suspicious Activity',
    description: 'Multiple reports of suspicious individuals checking car door handles on Grafton Street. Police have been notified and are en route to investigate. Residents are advised to ensure vehicles are locked.',
    location: 'Grafton Street, Dublin',
    time: '2 min ago',
    imageUrl: 'https://images.pexels.com/photos/735795/pexels-photo-735795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    distance: '0.5 km away',
    comments: 18,
    priority: 'high' as const,
  },
  {
    id: '2',
    title: 'Traffic Accident',
    description: 'Collision between two vehicles at the intersection. Traffic is being diverted. Expect delays of approximately 15-20 minutes in the area.',
    location: 'O\'Connell Bridge, Dublin',
    time: '15 min ago',
    imageUrl: 'https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    distance: '1.2 km away',
    comments: 34,
    priority: 'medium' as const,
  },
  {
    id: '3',
    title: 'Fire Reported',
    description: 'Small fire reported in a commercial building. Fire services are on scene. Area has been cordoned off.',
    location: 'Temple Bar, Dublin',
    time: '28 min ago',
    imageUrl: 'https://images.pexels.com/photos/51951/fire-fire-fighting-hose-foam-51951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    distance: '1.8 km away',
    comments: 7,
    priority: 'high' as const,
  },
  {
    id: '4',
    title: 'Public Demonstration',
    description: 'Peaceful demonstration taking place in the city center. Increased police presence and some road closures in effect.',
    location: 'St. Stephen\'s Green, Dublin',
    time: '1 hour ago',
    imageUrl: 'https://images.pexels.com/photos/2263410/pexels-photo-2263410.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    distance: '0.3 km away',
    comments: 42,
    priority: 'medium' as const,
  },
  {
    id: '5',
    title: 'Medical Emergency',
    description: 'Ambulance dispatched to location for a reported medical emergency.',
    location: 'Trinity College, Dublin',
    time: '1.5 hours ago',
    distance: '2.1 km away',
    comments: 3,
    priority: 'low' as const,
  },
];

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [showEmergency, setShowEmergency] = useState(false);

  const handleEmergency = () => {
    // In a real app, this would trigger an emergency protocol
    console.log('Emergency triggered');
    router.push('/(modals)/emergency');
  };

  const handleAlertPress = (id: string) => {
    router.push(`/(details)/alert/${id}`);
  };

  const toggleEmergencyButton = () => {
    setShowEmergency(!showEmergency);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Safety Alerts</Text>
            <Text style={styles.subtitle}>Dublin City Centre</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Bell color={Colors.white} size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Settings color={Colors.white} size={24} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.filterRow}>
          <TouchableOpacity style={styles.filterButton}>
            <Filter color={Colors.white} size={16} />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterTags}
          >
            <TouchableOpacity style={[styles.filterTag, styles.activeFilterTag]}>
              <Text style={[styles.filterTagText, styles.activeFilterTagText]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterTag}>
              <Text style={styles.filterTagText}>Nearby</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterTag}>
              <Text style={styles.filterTagText}>Crime</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterTag}>
              <Text style={styles.filterTagText}>Traffic</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterTag}>
              <Text style={styles.filterTagText}>Fire</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterTag}>
              <Text style={styles.filterTagText}>Medical</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>

      <ScrollView 
        style={styles.alertsContainer}
        contentContainerStyle={styles.alertsContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.emergencyButtonContainer}>
          <TouchableOpacity 
            style={styles.emergencyToggle}
            onPress={toggleEmergencyButton}
          >
            <Text style={styles.emergencyToggleText}>
              {showEmergency ? 'Hide Emergency Button' : 'Show Emergency Button'}
            </Text>
          </TouchableOpacity>
          
          {showEmergency && (
            <EmergencyButton onEmergency={handleEmergency} />
          )}
        </View>

        {alerts.map((alert) => (
          <AlertCard
            key={alert.id}
            title={alert.title}
            description={alert.description}
            location={alert.location}
            time={alert.time}
            imageUrl={alert.imageUrl}
            distance={alert.distance}
            comments={alert.comments}
            priority={alert.priority}
            onPress={() => handleAlertPress(alert.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.black,
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {},
  title: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: Colors.lightGray,
    fontSize: 14,
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  filterText: {
    color: Colors.white,
    marginLeft: 6,
    fontSize: 14,
  },
  filterTags: {
    paddingRight: 16,
  },
  filterTag: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  activeFilterTag: {
    backgroundColor: Colors.primary,
  },
  filterTagText: {
    color: Colors.white,
    fontSize: 13,
  },
  activeFilterTagText: {
    fontWeight: 'bold',
  },
  alertsContainer: {
    flex: 1,
  },
  alertsContent: {
    padding: 16,
    paddingBottom: 32,
  },
  emergencyButtonContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  emergencyToggle: {
    marginBottom: 16,
    padding: 8,
  },
  emergencyToggleText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
});