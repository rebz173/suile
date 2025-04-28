import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import { MapPin, Clock, MessageCircle, Share2, ChevronLeft, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';

// Mock data for alerts - would typically come from API
const mockAlerts = [
  {
    id: '1',
    title: 'Suspicious Activity',
    description: 'Multiple reports of suspicious individuals checking car door handles on Grafton Street. Police have been notified and are en route to investigate. Residents are advised to ensure vehicles are locked and to report any suspicious activity immediately.\n\nOfficers will be patrolling the area for the next several hours. If you have any information or observe suspicious behavior, please contact local authorities.',
    location: 'Grafton Street, Dublin',
    time: '2 min ago',
    imageUrl: 'https://images.pexels.com/photos/735795/pexels-photo-735795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    distance: '0.5 km away',
    comments: 18,
    priority: 'high',
    category: 'Crime',
    status: 'Active',
    updates: [
      { time: '2 minutes ago', text: 'Initial report received' },
      { time: '1 minute ago', text: 'Police dispatched to the area' },
    ],
    coordinates: {
      latitude: 53.3429,
      longitude: -6.2598,
    }
  },
  {
    id: '2',
    title: 'Traffic Accident',
    description: 'Collision between two vehicles at the intersection. Traffic is being diverted. Expect delays of approximately 15-20 minutes in the area. Emergency services are on scene.\n\nOne lane is currently blocked. Police are directing traffic. Please seek alternative routes if possible.',
    location: 'O\'Connell Bridge, Dublin',
    time: '15 min ago',
    imageUrl: 'https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    distance: '1.2 km away',
    comments: 34,
    priority: 'medium',
    category: 'Traffic',
    status: 'Active',
    updates: [
      { time: '15 minutes ago', text: 'Accident reported' },
      { time: '10 minutes ago', text: 'Emergency services arrived' },
      { time: '5 minutes ago', text: 'Traffic diversion implemented' },
    ],
    coordinates: {
      latitude: 53.3472,
      longitude: -6.2592,
    }
  },
  {
    id: '3',
    title: 'Fire Reported',
    description: 'Small fire reported in a commercial building. Fire services are on scene. Area has been cordoned off. No injuries reported at this time.\n\nFire appears to be contained to a single unit. Smoke may be visible from surrounding areas. Please avoid the area to allow emergency crews to work.',
    location: 'Temple Bar, Dublin',
    time: '28 min ago',
    imageUrl: 'https://images.pexels.com/photos/51951/fire-fire-fighting-hose-foam-51951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    distance: '1.8 km away',
    comments: 7,
    priority: 'high',
    category: 'Fire',
    status: 'Active',
    updates: [
      { time: '28 minutes ago', text: 'Fire reported' },
      { time: '25 minutes ago', text: 'Fire services dispatched' },
      { time: '20 minutes ago', text: 'Fire services on scene' },
      { time: '15 minutes ago', text: 'Area cordoned off' },
    ],
    coordinates: {
      latitude: 53.3450,
      longitude: -6.2646,
    }
  },
];

export default function AlertDetailScreen() {
  const { id } = useLocalSearchParams();
  
  // Find the alert data by ID
  const alert = mockAlerts.find(a => a.id === id);
  
  if (!alert) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Alert not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ChevronLeft color={Colors.white} size={24} />
          </TouchableOpacity>
          <View style={[styles.priorityBadge, getPriorityStyle(alert.priority)]}>
            <AlertTriangle color={Colors.white} size={14} />
            <Text style={styles.priorityText}>{getPriorityLabel(alert.priority)}</Text>
          </View>
        </View>
        
        {alert.imageUrl && (
          <Image
            source={{ uri: alert.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        
        <View style={styles.content}>
          <Text style={styles.title}>{alert.title}</Text>
          
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <MapPin color={Colors.lightGray} size={16} />
              <Text style={styles.metaText}>{alert.location}</Text>
            </View>
            <View style={styles.metaItem}>
              <Clock color={Colors.lightGray} size={16} />
              <Text style={styles.metaText}>{alert.time}</Text>
            </View>
          </View>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Status</Text>
              <Text style={[styles.infoValue, { color: alert.status === 'Active' ? Colors.primary : Colors.gray }]}>
                {alert.status}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Category</Text>
              <Text style={styles.infoValue}>{alert.category}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Distance</Text>
              <Text style={styles.infoValue}>{alert.distance}</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{alert.description}</Text>
          </View>
          
          {alert.updates && alert.updates.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Updates</Text>
              {alert.updates.map((update, index) => (
                <View key={index} style={styles.updateItem}>
                  <View style={styles.updateDot} />
                  <View style={styles.updateContent}>
                    <Text style={styles.updateTime}>{update.time}</Text>
                    <Text style={styles.updateText}>{update.text}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.commentsButton}>
          <MessageCircle color={Colors.white} size={20} />
          <Text style={styles.commentsButtonText}>
            Comments ({alert.comments})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.shareButton}>
          <Share2 color={Colors.white} size={20} />
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Helper functions
function getPriorityStyle(priority: string) {
  switch (priority) {
    case 'high':
      return styles.highPriority;
    case 'medium':
      return styles.mediumPriority;
    case 'low':
      return styles.lowPriority;
    default:
      return styles.lowPriority;
  }
}

function getPriorityLabel(priority: string) {
  switch (priority) {
    case 'high':
      return 'High Priority';
    case 'medium':
      return 'Medium Priority';
    case 'low':
      return 'Low Priority';
    default:
      return 'Priority';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },
  highPriority: {
    backgroundColor: Colors.primary,
  },
  mediumPriority: {
    backgroundColor: Colors.warning,
  },
  lowPriority: {
    backgroundColor: Colors.gray,
  },
  priorityText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 16,
  },
  title: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    color: Colors.lightGray,
    fontSize: 14,
    marginLeft: 6,
  },
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  infoLabel: {
    color: Colors.lightGray,
    fontSize: 12,
    marginBottom: 4,
  },
  infoValue: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    color: Colors.white,
    fontSize: 16,
    lineHeight: 24,
  },
  updateItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  updateDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
    marginTop: 5,
    marginRight: 12,
  },
  updateContent: {
    flex: 1,
  },
  updateTime: {
    color: Colors.lightGray,
    fontSize: 14,
    marginBottom: 2,
  },
  updateText: {
    color: Colors.white,
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.black,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  commentsButton: {
    flex: 2,
    backgroundColor: '#333',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginRight: 12,
  },
  commentsButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  shareButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  shareButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  errorText: {
    color: Colors.white,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
  backButtonText: {
    color: Colors.primary,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
});