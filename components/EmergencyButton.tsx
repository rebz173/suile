import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Pressable, Animated } from 'react-native';
import { OctagonAlert as AlertOctagon } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface EmergencyButtonProps {
  onEmergency: () => void;
}

export default function EmergencyButton({ onEmergency }: EmergencyButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    // Pulsing animation for the emergency button
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Handle the countdown logic
    let interval: NodeJS.Timeout;
    
    if (isPressed && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      onEmergency();
      // Reset after triggering
      setIsPressed(false);
      setCountdown(3);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPressed, countdown]);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    if (countdown > 0) {
      setIsPressed(false);
      setCountdown(3);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          isPressed && styles.buttonActive,
        ]}
      >
        <Animated.View
          style={[
            styles.pulseCircle,
            {
              transform: [{ scale: pulseAnim }],
              opacity: isPressed ? 0.6 : 0.2,
            },
          ]}
        />
        
        <View style={styles.contentContainer}>
          <AlertOctagon color={Colors.white} size={24} />
          <Text style={styles.text}>
            {isPressed ? `Hold (${countdown})` : 'Emergency'}
          </Text>
        </View>
      </Pressable>
      <Text style={styles.helperText}>
        Hold for {countdown} seconds to trigger emergency alert
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.primary,
    width: 160,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    elevation: 5,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  buttonPressed: {
    backgroundColor: '#D32F2F',
  },
  buttonActive: {
    backgroundColor: '#B71C1C',
  },
  pulseCircle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 30,
    backgroundColor: Colors.primary,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  helperText: {
    color: Colors.lightGray,
    fontSize: 12,
    marginTop: 8,
  },
});