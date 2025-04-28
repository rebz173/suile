import { useState, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import { Camera as CameraIcon, MapPin, X, Plus, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Colors from '@/constants/Colors';

const incidentTypes = [
  { id: 'crime', label: 'Crime', icon: '🚨' },
  { id: 'fire', label: 'Fire', icon: '🔥' },
  { id: 'medical', label: 'Medical', icon: '🚑' },
  { id: 'traffic', label: 'Traffic', icon: '🚗' },
  { id: 'other', label: 'Other', icon: '⚠️' },
];

export default function ReportScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [location, setLocation] = useState('Current Location');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraType, setCameraType] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const cameraRef = useRef<CameraView>(null);

  const handleOpenCamera = async () => {
    if (!permission?.granted) {
      await requestPermission();
      return;
    }
    if (!mediaPermission?.granted) {
      await requestMediaPermission();
      return;
    }
    setIsCameraOpen(true);
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
  };

  const handleCapture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        
        // Save to media library
        const asset = await MediaLibrary.createAssetAsync(photo.uri);
        const album = await MediaLibrary.getAlbumAsync('Suile');
        if (album === null) {
          await MediaLibrary.createAlbumAsync('Suile', asset, false);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }
        
        setPhotos([...photos, photo.uri]);
        setIsCameraOpen(false);
      } catch (error) {
        console.error('Error taking photo:', error);
        alert('Failed to take photo. Please try again.');
      }
    }
  };

  const toggleCameraType = () => {
    setCameraType(current => (current === 'back' ? 'front' : 'back'));
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };

  const isSubmitDisabled = !title || !description || !selectedType;

  const handleSubmit = () => {
    // In a real app, this would submit the report to the backend
    console.log({
      title,
      description,
      type: selectedType,
      location,
      photos,
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setSelectedType(null);
    setPhotos([]);
    
    // Show success message
    alert('Report submitted successfully!');
  };

  if (isCameraOpen) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView 
          ref={cameraRef}
          style={styles.camera}
          facing={cameraType}
        >
          <View style={styles.cameraControls}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={handleCloseCamera}
            >
              <X color={Colors.white} size={24} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.captureButton}
              onPress={handleCapture}
            />
            
            <TouchableOpacity 
              style={styles.flipButton}
              onPress={toggleCameraType}
            >
              <CameraIcon color={Colors.white} size={24} />
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <AlertTriangle color={Colors.primary} size={32} />
          <Text style={styles.headerTitle}>Report an Incident</Text>
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>What happened?</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="Enter a title for your report"
            placeholderTextColor={Colors.lightGray}
            value={title}
            onChangeText={setTitle}
          />
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Type of Incident</Text>
          <View style={styles.typeContainer}>
            {incidentTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeButton,
                  selectedType === type.id && styles.selectedTypeButton,
                ]}
                onPress={() => setSelectedType(type.id)}
              >
                <Text style={styles.typeIcon}>{type.icon}</Text>
                <Text
                  style={[
                    styles.typeLabel,
                    selectedType === type.id && styles.selectedTypeLabel,
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Description</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Describe what happened in detail"
            placeholderTextColor={Colors.lightGray}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          />
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Location</Text>
          <TouchableOpacity style={styles.locationButton}>
            <MapPin color={Colors.white} size={20} />
            <Text style={styles.locationText}>{location}</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Photos/Evidence</Text>
          <View style={styles.photosContainer}>
            {photos.map((photo, index) => (
              <View key={index} style={styles.photoWrapper}>
                <Image source={{ uri: photo }} style={styles.photo} />
                <TouchableOpacity
                  style={styles.removePhotoButton}
                  onPress={() => removePhoto(index)}
                >
                  <X color={Colors.white} size={16} />
                </TouchableOpacity>
              </View>
            ))}
            
            <TouchableOpacity
              style={styles.addPhotoButton}
              onPress={handleOpenCamera}
            >
              <Plus color={Colors.white} size={24} />
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity
          style={[
            styles.submitButton,
            isSubmitDisabled && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={isSubmitDisabled}
        >
          <Text style={styles.submitButtonText}>Submit Report</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  formSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  titleInput: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 16,
    color: Colors.white,
    fontSize: 16,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  typeButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    margin: 6,
    width: '29%',
  },
  selectedTypeButton: {
    backgroundColor: Colors.primary,
  },
  typeIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  typeLabel: {
    color: Colors.white,
    fontSize: 14,
  },
  selectedTypeLabel: {
    fontWeight: 'bold',
  },
  descriptionInput: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 16,
    color: Colors.white,
    fontSize: 16,
    height: 120,
  },
  locationButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: Colors.white,
    fontSize: 16,
    marginLeft: 8,
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  photoWrapper: {
    margin: 6,
    position: 'relative',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removePhotoButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoButton: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 20,
  },
  closeButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 6,
    borderColor: Colors.white,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  flipButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});