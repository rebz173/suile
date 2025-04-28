import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Platform } from 'react-native';
import { TriangleAlert as AlertTriangle, Phone, X } from 'lucide-react-native';
import { router, useNavigation } from 'expo-router';
import Colors from '@/constants/Colors';

export default function EmergencyScreen() {
  const navigation = useNavigation();
  const [countdown, setCountdown] = useState(5);
  const pulseAnim = new Animated.Value(1);
  
  useEffect(() => {
    navigation.setOptions({
      title: 'Emergency Alert',
      headerRight: () => (
        <TouchableOpacity onPress={() => router.back()}>
          <X color={Colors.white} size={24} />
        </TouchableOpacity>
      ),
    });
    
    // Start pulsing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    // Start countdown
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          <AlertTriangle color={Colors.white} size={64} />
        </Animated.View>
        
        <Text style={styles.title}>Emergency Mode Activated</Text>
        
        <Text style={styles.description}>
          Contacting emergency services in {countdown} seconds. Your location is being shared with emergency responders.
        </Text>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.callButton} onPress={() => {}}>
            <Phone color={Colors.white} size={24} />
            <Text style={styles.callButtonText}>Call Emergency Services</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.cancelButton} 
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Cancel Emergency</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>What happens next:</Text>
          <Text style={styles.infoText}>
            • Emergency services will be contacted
          </Text>
          <Text style={styles.infoText}>
            • Your emergency contacts will be notified
          </Text>
          <Text style={styles.infoText}>
            • Your location will be shared
          </Text>
          <Text style={styles.infoText}>
            • A recording will be started for your safety
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    color: Colors.white,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  actionsContainer: {
    width: '100%',
    marginBottom: 32,
  },
  callButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginBottom: 16,
  },
  callButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 16,
  },
  cancelButtonText: {
    color: Colors.lightGray,
    fontSize: 16,
  },
  infoBox: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    width: '100%',
  },
  infoTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoText: {
    color: Colors.lightGray,
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
});