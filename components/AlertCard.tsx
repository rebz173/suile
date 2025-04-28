import { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Clock, MapPin, MessageCircle, Share2 } from 'lucide-react-native';
import Colors from '@/constants/Colors';

type AlertCardProps = {
  title: string;
  description: string;
  location: string;
  time: string;
  imageUrl?: string;
  distance: string;
  comments: number;
  priority: 'high' | 'medium' | 'low';
  onPress: () => void;
};

export default function AlertCard({
  title,
  description,
  location,
  time,
  imageUrl,
  distance,
  comments,
  priority,
  onPress,
}: AlertCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const priorityColors = {
    high: Colors.primary,
    medium: Colors.warning,
    low: Colors.gray,
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.priorityIndicator(priorityColors[priority])} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.locationContainer}>
              <MapPin color={Colors.lightGray} size={14} />
              <Text style={styles.location}>{location}</Text>
              <Text style={styles.distance}>{distance}</Text>
            </View>
          </View>
          <View style={styles.timeContainer}>
            <Clock color={Colors.lightGray} size={14} />
            <Text style={styles.time}>{time}</Text>
          </View>
        </View>

        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        <Text 
          style={styles.description}
          numberOfLines={isExpanded ? undefined : 2}
        >
          {description}
        </Text>
        
        {description.length > 100 && (
          <TouchableOpacity onPress={toggleExpanded} style={styles.readMoreButton}>
            <Text style={styles.readMoreText}>
              {isExpanded ? 'Show less' : 'Read more'}
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.footer}>
          <View style={styles.commentsContainer}>
            <MessageCircle color={Colors.lightGray} size={16} />
            <Text style={styles.commentsText}>{comments}</Text>
          </View>
          <TouchableOpacity style={styles.shareButton}>
            <Share2 color={Colors.lightGray} size={16} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
  },
  priorityIndicator: (color: string) => ({
    backgroundColor: color,
    width: 4,
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  }),
  content: {
    padding: 16,
    paddingLeft: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    color: Colors.lightGray,
    fontSize: 12,
    marginLeft: 4,
  },
  distance: {
    color: Colors.gray,
    fontSize: 12,
    marginLeft: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    color: Colors.lightGray,
    fontSize: 12,
    marginLeft: 4,
  },
  image: {
    height: 180,
    borderRadius: 8,
    marginVertical: 8,
  },
  description: {
    color: Colors.white,
    fontSize: 14,
    lineHeight: 20,
  },
  readMoreButton: {
    marginTop: 4,
  },
  readMoreText: {
    color: Colors.primary,
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    alignItems: 'center',
  },
  commentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentsText: {
    color: Colors.lightGray,
    fontSize: 14,
    marginLeft: 6,
  },
  shareButton: {
    padding: 8,
  },
});