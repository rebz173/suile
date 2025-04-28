import { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withRepeat,
  withSequence,
  cancelAnimation
} from 'react-native-reanimated';
import Colors from '@/constants/Colors';

type IncidentMapMarkerProps = {
  type: 'crime' | 'fire' | 'medical' | 'traffic' | 'other';
  severity: 'high' | 'medium' | 'low';
  isLive?: boolean;
  onPress?: () => void;
};

export default function IncidentMapMarker({ 
  type, 
  severity,
  isLive = false,
  onPress
}: IncidentMapMarkerProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  
  // Icon to show based on incident type
  const getIcon = () => {
    switch (type) {
      case 'crime': return '🚨';
      case 'fire': return '🔥';
      case 'medical': return '🚑';
      case 'traffic': return '🚗';
      default: return '⚠️';
    }
  };
  
  // Color based on severity
  const getColor = () => {
    switch (severity) {
      case 'high': return Colors.primary;
      case 'medium': return Colors.warning;
      case 'low': return '#5E5E5E';
      default: return Colors.gray;
    }
  };

  useEffect(() => {
    if (isLive) {
      // Pulsing animation for live incidents
      scale.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: 800 }),
          withTiming(1, { duration: 800 })
        ),
        -1, // infinite repeats
        true // reverse
      );
      
      // Outer ring animation
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.8, { duration: 800 }),
          withTiming(0.4, { duration: 800 })
        ),
        -1,
        true
      );
    }
    
    return () => {
      cancelAnimation(scale);
      cancelAnimation(opacity);
    };
  }, [isLive]);

  const markerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  const ringStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.container}>
        {isLive && (
          <Animated.View 
            style={[
              styles.pulsingRing,
              { backgroundColor: getColor() },
              ringStyle
            ]} 
          />
        )}
        <Animated.View 
          style={[
            styles.marker,
            { backgroundColor: getColor() },
            markerStyle
          ]}
        >
          <Text style={styles.icon}>{getIcon()}</Text>
        </Animated.View>
        {isLive && (
          <View style={styles.liveIndicator}>
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  marker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  pulsingRing: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    opacity: 0.5,
  },
  icon: {
    fontSize: 16,
  },
  liveIndicator: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  liveText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  }
});