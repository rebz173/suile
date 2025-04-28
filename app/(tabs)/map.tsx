import { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { router } from 'expo-router';
import { Search, Layers, MapPin, Navigation, Plus, Minus } from 'lucide-react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
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

export default function MapScreen() {
  const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [locationPermission, setLocationPermission] = useState<boolean>(false);
  const mapRef = useRef<MapView>(null);
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === 'granted');
      
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location);
      }
    })();
  }, []);

  const handleIncidentPress = (id: string) => {
    setSelectedIncident(id);
    const incident = mockIncidents.find(i => i.id === id);
    if (incident && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: incident.location.lat,
        longitude: incident.location.lon,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  const handleViewIncident = (id: string) => {
    router.push(`/(details)/incident/${id}`);
  };

  const toggleMapType = () => {
    setMapType(mapType === 'standard' ? 'satellite' : 'standard');
  };

  const centerOnUser = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  // Get selected incident details
  const selectedIncidentDetails = mockIncidents.find(
    incident => incident.id === selectedIncident
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.searchBar}>
          <Search color={Colors.white} size={20} />
          <Text style={styles.searchText}>Search for a location</Text>
        </TouchableOpacity>
      </View>
      
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        mapType={mapType}
        showsUserLocation={true}
        showsMyLocationButton={false}
        initialRegion={
          userLocation
            ? {
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
            : {
                latitude: 53.3498,
                longitude: -6.2603,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
        }
      >
        {mockIncidents.map((incident) => (
          <Marker
            key={incident.id}
            coordinate={{
              latitude: incident.location.lat,
              longitude: incident.location.lon,
            }}
            onPress={() => handleIncidentPress(incident.id)}
          >
            <IncidentMapMarker
              type={incident.type as any}
              severity={incident.severity as any}
              isLive={incident.isLive}
              onPress={() => handleIncidentPress(incident.id)}
            />
          </Marker>
        ))}
      </MapView>
        
      {/* Map controls */}
      <View style={styles.mapControls}>
        <TouchableOpacity style={styles.mapButton} onPress={toggleMapType}>
          <Layers color={Colors.white} size={22} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mapButton} onPress={centerOnUser}>
          <MapPin color={Colors.white} size={22} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mapButton} onPress={() => {}}>
          <Navigation color={Colors.white} size={22} />
        </TouchableOpacity>
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
  map: {
    flex: 1,
  },
  mapControls: {
    position: 'absolute',
    right: 16,
    top: 120,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  mapButton: {
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
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});