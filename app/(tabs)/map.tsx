import { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { router } from 'expo-router';
import { Search, Layers, MapPin, Navigation, Plus, Minus } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import IncidentMapMarker from '@/components/IncidentMapMarker';

// Mock data for demo
const mockIncidents = [
  { 
    id: '1', 
    type: 'crime', 
    severity: 'high', 
    isLive: true, 
    title: 'Suspicious Activity',
    location: { lat: 53.349, lon: -6.260 } 
  },
  { 
    id: '2', 
    type: 'traffic', 
    severity: 'medium', 
    isLive: false,
    title: 'Traffic Accident',
    location: { lat: 53.347, lon: -6.258 } 
  },
  { 
    id: '3', 
    type: 'fire', 
    severity: 'high', 
    isLive: true,
    title: 'Building Fire',
    location: { lat: 53.346, lon: -6.262 } 
  },
  { 
    id: '4', 
    type: 'medical', 
    severity: 'low', 
    isLive: false,
    title: 'Medical Emergency',
    location: { lat: 53.350, lon: -6.263 } 
  },
  { 
    id: '5', 
    type: 'other', 
    severity: 'medium', 
    isLive: false,
    title: 'Public Demonstration',
    location: { lat: 53.351, lon: -6.261 } 
  },
];

// This is a simplified map implementation for demo purposes
// In a real app, you would use react-native-maps or similar
export default function MapScreen() {
  const [mapType, setMapType] = useState('standard');
  const [zoomLevel, setZoomLevel] = useState(15);
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  
  const mapWidth = Dimensions.get('window').width;
  const mapHeight = Dimensions.get('window').height - 120;

  const handleIncidentPress = (id: string) => {
    setSelectedIncident(id);
    // In a real app, you would center the map on this incident
  };

  const handleViewIncident = (id: string) => {
    router.push(`/(details)/incident/${id}`);
  };

  const zoomIn = () => {
    setZoomLevel(Math.min(18, zoomLevel + 1));
  };

  const zoomOut = () => {
    setZoomLevel(Math.max(10, zoomLevel - 1));
  };

  const toggleMapType = () => {
    setMapType(mapType === 'standard' ? 'satellite' : 'standard');
  };

  // Get selected incident details
  const selectedIncidentDetails = mockIncidents.find(
    incident => incident.id === selectedIncident
  );
  
  // Convert zoom level to scale for visual effect
  const getScaleFromZoom = (zoom: number) => {
    return (zoom - 10) / 8; // Scale from 0 to 1 for zoom levels 10-18
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.searchBar}>
          <Search color={Colors.white} size={20} />
          <Text style={styles.searchText}>Search for a location</Text>
        </TouchableOpacity>
      </View>
      
      {/* This would be a real map component in production */}
      <View 
        style={[
          styles.mapContainer, 
          { 
            backgroundColor: mapType === 'standard' ? '#1c2028' : '#1a1a1a',
          }
        ]}
      >
        {/* Map markers - positioned absolutely for demo */}
        {mockIncidents.map((incident, index) => {
          // In a real app, these would be positioned based on coordinates
          // Here we're just spreading them out for visual demonstration
          const xPos = 40 + ((index % 3) * (mapWidth - 80) / 2);
          const yPos = 100 + (Math.floor(index / 3) * 150);
          
          return (
            <View 
              key={incident.id}
              style={[
                styles.markerContainer,
                {
                  left: xPos,
                  top: yPos,
                  transform: [{ scale: selectedIncident === incident.id ? 1.2 : 1 }]
                }
              ]}
            >
              <IncidentMapMarker
                type={incident.type as any}
                severity={incident.severity as any}
                isLive={incident.isLive}
                onPress={() => handleIncidentPress(incident.id)}
              />
            </View>
          );
        })}
        
        {/* Map controls */}
        <View style={styles.mapControls}>
          <TouchableOpacity style={styles.mapButton} onPress={toggleMapType}>
            <Layers color={Colors.white} size={22} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapButton} onPress={() => {}}>
            <MapPin color={Colors.white} size={22} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapButton} onPress={() => {}}>
            <Navigation color={Colors.white} size={22} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.zoomControls}>
          <TouchableOpacity style={styles.zoomButton} onPress={zoomIn}>
            <Plus color={Colors.white} size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomButton} onPress={zoomOut}>
            <Minus color={Colors.white} size={20} />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Incident details panel */}
      {selectedIncidentDetails && (
        <View style={styles.incidentPanel}>
          <View style={styles.incidentHeader}>
            <View style={styles.incidentType}>
              <View 
                style={[
                  styles.severityIndicator, 
                  { 
                    backgroundColor: 
                      selectedIncidentDetails.severity === 'high' ? Colors.primary :
                      selectedIncidentDetails.severity === 'medium' ? Colors.warning :
                      Colors.gray
                  }
                ]} 
              />
              <Text style={styles.incidentTitle}>
                {selectedIncidentDetails.title}
              </Text>
            </View>
            {selectedIncidentDetails.isLive && (
              <View style={styles.liveTag}>
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            )}
          </View>
          
          <TouchableOpacity 
            style={styles.viewButton}
            onPress={() => handleViewIncident(selectedIncidentDetails.id)}
          >
            <Text style={styles.viewButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      )}
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
  },
  searchBar: {
    backgroundColor: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  searchText: {
    color: Colors.lightGray,
    marginLeft: 8,
    fontSize: 16,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  markerContainer: {
    position: 'absolute',
    zIndex: 1,
  },
  mapControls: {
    position: 'absolute',
    right: 16,
    top: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  mapButton: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  zoomControls: {
    position: 'absolute',
    right: 16,
    bottom: 120,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  zoomButton: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  incidentPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.black,
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  incidentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  incidentType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  severityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  incidentTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  liveTag: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  liveText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  viewButton: {
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});