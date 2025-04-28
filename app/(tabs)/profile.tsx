import { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Switch, Platform } from 'react-native';
import { User, Settings, LogOut, Shield, MapPin, ChevronRight, Lock, Bell, Info } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import SafetyResourceCard from '@/components/SafetyResourceCard';

const mockEmergencyContacts = [
  { id: '1', name: 'John Smith', phone: '+353 87 123 4567', relationship: 'Family' },
  { id: '2', name: 'Emergency Contact', phone: '+353 83 765 4321', relationship: 'Friend' },
];

export default function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [anonymousReporting, setAnonymousReporting] = useState(false);
  const [showSafetyResources, setShowSafetyResources] = useState(false);

  const toggleSafetyResources = () => {
    setShowSafetyResources(!showSafetyResources);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
            style={styles.avatar}
          />
          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>Alex Morgan</Text>
            <Text style={styles.userLocation}>Dublin, Ireland</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.membershipCard}>
        <View style={styles.membershipHeader}>
          <Text style={styles.membershipTitle}>Súile Premium</Text>
          <Shield color={Colors.primary} size={20} />
        </View>
        <Text style={styles.membershipSubtitle}>Active Member</Text>
        <Text style={styles.membershipDescription}>
          You have access to all premium features including live incident streaming,
          enhanced alerts, and priority reporting.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Contacts</Text>
        
        {mockEmergencyContacts.map((contact) => (
          <View key={contact.id} style={styles.contactCard}>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactRelationship}>{contact.relationship}</Text>
              <Text style={styles.contactPhone}>{contact.phone}</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        ))}
        
        <TouchableOpacity style={styles.addContactButton}>
          <Text style={styles.addContactButtonText}>+ Add Emergency Contact</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Safety Resources</Text>
        <TouchableOpacity 
          style={styles.safetyToggleButton}
          onPress={toggleSafetyResources}
        >
          <Text style={styles.safetyToggleText}>
            {showSafetyResources ? 'Hide Resources' : 'Show Local Resources'}
          </Text>
          <ChevronRight 
            color={Colors.primary} 
            size={16} 
            style={{ transform: [{ rotate: showSafetyResources ? '90deg' : '0deg' }] }}
          />
        </TouchableOpacity>
        
        {showSafetyResources && (
          <View style={styles.safetyResourcesContainer}>
            <SafetyResourceCard
              title="National Police"
              type="police"
              phone="112"
              address="Garda Headquarters, Phoenix Park, Dublin"
              distance="2.3 km"
              website="https://www.garda.ie"
              onCall={() => {}}
              onDirections={() => {}}
              onWebsite={() => {}}
            />
            
            <SafetyResourceCard
              title="Local Hospital"
              type="ambulance"
              phone="999"
              address="St. James's Hospital, James's Street, Dublin"
              distance="1.8 km"
              website="https://www.stjames.ie"
              onCall={() => {}}
              onDirections={() => {}}
              onWebsite={() => {}}
            />
            
            <SafetyResourceCard
              title="Fire Brigade"
              type="fire"
              phone="112"
              address="Dublin Fire Brigade, Townsend Street, Dublin"
              distance="0.9 km"
              onCall={() => {}}
              onDirections={() => {}}
            />
          </View>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Bell color={Colors.white} size={20} />
            <Text style={styles.settingTitle}>Notifications</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#444', true: Colors.primary }}
            thumbColor={Colors.white}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <MapPin color={Colors.white} size={20} />
            <Text style={styles.settingTitle}>Location Services</Text>
          </View>
          <Switch
            value={locationServices}
            onValueChange={setLocationServices}
            trackColor={{ false: '#444', true: Colors.primary }}
            thumbColor={Colors.white}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Settings color={Colors.white} size={20} />
            <Text style={styles.settingTitle}>Dark Mode</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#444', true: Colors.primary }}
            thumbColor={Colors.white}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Lock color={Colors.white} size={20} />
            <Text style={styles.settingTitle}>Anonymous Reporting</Text>
          </View>
          <Switch
            value={anonymousReporting}
            onValueChange={setAnonymousReporting}
            trackColor={{ false: '#444', true: Colors.primary }}
            thumbColor={Colors.white}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <TouchableOpacity style={styles.optionItem}>
          <View style={styles.optionInfo}>
            <Info color={Colors.white} size={20} />
            <Text style={styles.optionText}>About Súile</Text>
          </View>
          <ChevronRight color={Colors.lightGray} size={16} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionItem}>
          <View style={styles.optionInfo}>
            <Lock color={Colors.white} size={20} />
            <Text style={styles.optionText}>Privacy Policy</Text>
          </View>
          <ChevronRight color={Colors.lightGray} size={16} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionItem}>
          <View style={styles.optionInfo}>
            <Info color={Colors.white} size={20} />
            <Text style={styles.optionText}>Terms of Service</Text>
          </View>
          <ChevronRight color={Colors.lightGray} size={16} />
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.optionItem, styles.logoutButton]}>
          <View style={styles.optionInfo}>
            <LogOut color={Colors.primary} size={20} />
            <Text style={[styles.optionText, styles.logoutText]}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.version}>Súile v1.0.0</Text>
        <Text style={styles.copyright}>© 2025 Súile Safety. All rights reserved.</Text>
      </View>
    </ScrollView>
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
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  userInfoContainer: {
    marginLeft: 16,
  },
  userName: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  userLocation: {
    color: Colors.lightGray,
    fontSize: 14,
    marginTop: 4,
  },
  editProfileButton: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  editProfileButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  membershipCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  membershipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  membershipTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  membershipSubtitle: {
    color: Colors.primary,
    fontSize: 14,
    marginTop: 4,
    marginBottom: 8,
  },
  membershipDescription: {
    color: Colors.lightGray,
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    margin: 16,
    marginTop: 0,
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  contactCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  contactRelationship: {
    color: Colors.lightGray,
    fontSize: 12,
    marginTop: 2,
  },
  contactPhone: {
    color: Colors.white,
    fontSize: 14,
    marginTop: 4,
  },
  editButton: {
    backgroundColor: '#333',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  editButtonText: {
    color: Colors.white,
    fontSize: 12,
  },
  addContactButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  addContactButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  safetyToggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  safetyToggleText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  safetyResourcesContainer: {
    marginTop: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  optionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
  logoutButton: {
    borderColor: 'rgba(255, 59, 48, 0.3)',
  },
  logoutText: {
    color: Colors.primary,
  },
  footer: {
    alignItems: 'center',
    padding: 24,
    paddingBottom: 40,
  },
  version: {
    color: Colors.gray,
    fontSize: 14,
  },
  copyright: {
    color: Colors.gray,
    fontSize: 12,
    marginTop: 4,
  },
});