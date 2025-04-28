import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Phone, ExternalLink, MapPin } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface SafetyResourceCardProps {
  title: string;
  type: 'police' | 'ambulance' | 'fire' | 'embassy' | 'other';
  phone: string;
  address?: string;
  distance?: string;
  website?: string;
  onCall: () => void;
  onDirections: () => void;
  onWebsite?: () => void;
}

export default function SafetyResourceCard({
  title,
  type,
  phone,
  address,
  distance,
  website,
  onCall,
  onDirections,
  onWebsite,
}: SafetyResourceCardProps) {
  const getTypeIcon = () => {
    switch (type) {
      case 'police': return '👮‍♂️';
      case 'ambulance': return '🚑';
      case 'fire': return '🚒';
      case 'embassy': return '🏛️';
      default: return '🔰';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.typeIcon}>{getTypeIcon()}</Text>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.type}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
        </View>
      </View>

      {address && (
        <View style={styles.addressContainer}>
          <MapPin color={Colors.lightGray} size={16} />
          <Text style={styles.address}>{address}</Text>
          {distance && <Text style={styles.distance}>{distance}</Text>}
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.mainAction} onPress={onCall}>
          <Phone color={Colors.white} size={18} />
          <Text style={styles.mainActionText}>{phone}</Text>
        </TouchableOpacity>

        <View style={styles.secondaryActions}>
          <TouchableOpacity style={styles.secondaryAction} onPress={onDirections}>
            <Text style={styles.secondaryActionText}>Directions</Text>
          </TouchableOpacity>

          {website && onWebsite && (
            <TouchableOpacity 
              style={[styles.secondaryAction, styles.websiteAction]} 
              onPress={onWebsite}
            >
              <ExternalLink color={Colors.primary} size={14} />
              <Text style={[styles.secondaryActionText, styles.websiteText]}>Website</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  type: {
    color: Colors.lightGray,
    fontSize: 12,
    marginTop: 2,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  address: {
    color: Colors.white,
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  distance: {
    color: Colors.lightGray,
    fontSize: 12,
    marginLeft: 8,
  },
  actions: {
    gap: 12,
  },
  mainAction: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  mainActionText: {
    color: Colors.white,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondaryAction: {
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#444',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  secondaryActionText: {
    color: Colors.white,
    fontSize: 14,
  },
  websiteAction: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  websiteText: {
    color: Colors.primary,
  },
});