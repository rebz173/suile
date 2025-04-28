import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, RefreshControl, Platform } from 'react-native';
import { Bell, BellMinus, BellPlus, ChevronRight, Clock } from 'lucide-react-native';
import Colors from '@/constants/Colors';

// Mock data
const mockUpdates = [
  {
    id: '1',
    title: 'Suspicious Activity',
    status: 'Ongoing',
    description: 'Police are investigating reports of suspicious activity.',
    location: 'Grafton Street, Dublin',
    time: '15 minutes ago',
    hasNewInfo: true,
  },
  {
    id: '2',
    title: 'Traffic Accident',
    status: 'Resolved',
    description: 'The scene has been cleared and traffic is flowing normally.',
    location: 'O\'Connell Bridge, Dublin',
    time: '1 hour ago',
    hasNewInfo: false,
  },
  {
    id: '3',
    title: 'Fire Report',
    status: 'Resolved',
    description: 'Fire services have extinguished the fire. No injuries reported.',
    location: 'Temple Bar, Dublin',
    time: '2 hours ago',
    hasNewInfo: false,
  },
  {
    id: '4',
    title: 'Public Demonstration',
    status: 'Scheduled',
    description: 'Peaceful demonstration scheduled to begin at 14:00.',
    location: 'St. Stephen\'s Green, Dublin',
    time: '3 hours ago',
    hasNewInfo: true,
  },
];

type NotificationType = 'all' | 'important' | 'none';

interface PreferenceItem {
  id: string;
  title: string;
  description: string;
  status: NotificationType;
}

const notificationPreferences: PreferenceItem[] = [
  {
    id: 'crime',
    title: 'Crime Reports',
    description: 'Notifications for reported criminal activity in your area',
    status: 'all',
  },
  {
    id: 'fire',
    title: 'Fire Alerts',
    description: 'Notifications for fires and related hazards',
    status: 'important',
  },
  {
    id: 'traffic',
    title: 'Traffic Incidents',
    description: 'Notifications for traffic accidents, closures, and congestion',
    status: 'all',
  },
  {
    id: 'medical',
    title: 'Medical Emergencies',
    description: 'Notifications for medical emergencies in public spaces',
    status: 'none',
  },
  {
    id: 'weather',
    title: 'Weather Alerts',
    description: 'Notifications for severe weather conditions',
    status: 'important',
  },
];

export default function UpdatesScreen() {
  const [updates, setUpdates] = useState(mockUpdates);
  const [preferences, setPreferences] = useState(notificationPreferences);
  const [refreshing, setRefreshing] = useState(false);
  const [showMuteAlert, setShowMuteAlert] = useState(false);
  const [activeTab, setActiveTab] = useState('updates');

  const onRefresh = () => {
    setRefreshing(true);
    
    // Simulate network request
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const cycleNotificationPreference = (id: string) => {
    setPreferences(prev => 
      prev.map(pref => {
        if (pref.id === id) {
          // Cycle through the options: all -> important -> none -> all
          const newStatus: NotificationType = 
            pref.status === 'all' ? 'important' :
            pref.status === 'important' ? 'none' : 'all';
          
          return { ...pref, status: newStatus };
        }
        return pref;
      })
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Updates & Notifications</Text>
        
        <View style={styles.tabBar}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'updates' && styles.activeTab]} 
            onPress={() => setActiveTab('updates')}
          >
            <Text style={[styles.tabText, activeTab === 'updates' && styles.activeTabText]}>
              Updates
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'preferences' && styles.activeTab]} 
            onPress={() => setActiveTab('preferences')}
          >
            <Text style={[styles.tabText, activeTab === 'preferences' && styles.activeTabText]}>
              Preferences
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Updates Tab */}
      {activeTab === 'updates' && (
        <ScrollView 
          style={styles.content}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh}
              tintColor={Colors.primary}
              colors={[Colors.primary]}
            />
          }
        >
          {updates.map((update) => (
            <TouchableOpacity key={update.id} style={styles.updateCard}>
              <View style={styles.updateHeader}>
                <View>
                  <Text style={styles.updateTitle}>{update.title}</Text>
                  <View style={styles.locationRow}>
                    <Clock color={Colors.lightGray} size={14} />
                    <Text style={styles.updateTime}>{update.time}</Text>
                  </View>
                </View>
                <View style={styles.statusContainer}>
                  <View 
                    style={[
                      styles.statusBadge,
                      update.status === 'Ongoing' && styles.ongoingBadge,
                      update.status === 'Resolved' && styles.resolvedBadge,
                      update.status === 'Scheduled' && styles.scheduledBadge,
                    ]}
                  >
                    <Text 
                      style={[
                        styles.statusText,
                        update.status === 'Resolved' && styles.resolvedText,
                      ]}
                    >
                      {update.status}
                    </Text>
                  </View>
                  {update.hasNewInfo && (
                    <View style={styles.newInfoBadge}>
                      <Text style={styles.newInfoText}>NEW</Text>
                    </View>
                  )}
                </View>
              </View>
              
              <Text style={styles.updateDescription}>{update.description}</Text>
              <Text style={styles.updateLocation}>{update.location}</Text>
              
              <View style={styles.updateActions}>
                <TouchableOpacity style={styles.updateAction} onPress={() => setShowMuteAlert(!showMuteAlert)}>
                  {showMuteAlert ? (
                    <BellMinus color={Colors.lightGray} size={18} />
                  ) : (
                    <BellPlus color={Colors.lightGray} size={18} />
                  )}
                  <Text style={styles.updateActionText}>
                    {showMuteAlert ? 'Mute' : 'Follow'}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.updateAction}>
                  <ChevronRight color={Colors.primary} size={18} />
                  <Text style={[styles.updateActionText, styles.viewDetailsText]}>View Details</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      
      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <ScrollView style={styles.content}>
          <Text style={styles.preferencesDescription}>
            Choose what types of incidents you want to be notified about in your area.
          </Text>
          
          {preferences.map((pref) => (
            <TouchableOpacity 
              key={pref.id} 
              style={styles.preferenceItem}
              onPress={() => cycleNotificationPreference(pref.id)}
            >
              <View style={styles.preferenceContent}>
                <Text style={styles.preferenceTitle}>{pref.title}</Text>
                <Text style={styles.preferenceDescription}>{pref.description}</Text>
              </View>
              
              <View style={styles.preferenceStatus}>
                {pref.status === 'all' && (
                  <View style={[styles.preferenceBadge, styles.allBadge]}>
                    <Bell color={Colors.white} size={14} />
                    <Text style={styles.preferenceBadgeText}>All</Text>
                  </View>
                )}
                
                {pref.status === 'important' && (
                  <View style={[styles.preferenceBadge, styles.importantBadge]}>
                    <Bell color={Colors.white} size={14} />
                    <Text style={styles.preferenceBadgeText}>Important</Text>
                  </View>
                )}
                
                {pref.status === 'none' && (
                  <View style={[styles.preferenceBadge, styles.noneBadge]}>
                    <BellMinus color={Colors.white} size={14} />
                    <Text style={styles.preferenceBadgeText}>None</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
          
          <View style={styles.privacyNote}>
            <Text style={styles.privacyNoteText}>
              Your notification preferences are stored locally on your device. You can change them at any time.
            </Text>
          </View>
        </ScrollView>
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
    paddingBottom: 0,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    color: Colors.lightGray,
    fontSize: 16,
    fontWeight: '500',
  },
  activeTabText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  updateCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  updateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  updateTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  updateTime: {
    color: Colors.lightGray,
    fontSize: 12,
    marginLeft: 4,
  },
  statusContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: Colors.gray,
  },
  ongoingBadge: {
    backgroundColor: Colors.warning,
  },
  resolvedBadge: {
    backgroundColor: '#333',
  },
  scheduledBadge: {
    backgroundColor: Colors.gray,
  },
  statusText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  resolvedText: {
    color: Colors.lightGray,
  },
  newInfoBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  newInfoText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  updateDescription: {
    color: Colors.white,
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  updateLocation: {
    color: Colors.lightGray,
    fontSize: 14,
    marginBottom: 12,
  },
  updateActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 12,
  },
  updateAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  updateActionText: {
    color: Colors.lightGray,
    fontSize: 14,
    marginLeft: 6,
  },
  viewDetailsText: {
    color: Colors.primary,
  },
  preferencesDescription: {
    color: Colors.lightGray,
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  preferenceItem: {
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
  preferenceContent: {
    flex: 1,
    marginRight: 12,
  },
  preferenceTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  preferenceDescription: {
    color: Colors.lightGray,
    fontSize: 12,
    lineHeight: 16,
  },
  preferenceStatus: {},
  preferenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    minWidth: 100,
    justifyContent: 'center',
  },
  allBadge: {
    backgroundColor: Colors.primary,
  },
  importantBadge: {
    backgroundColor: Colors.warning,
  },
  noneBadge: {
    backgroundColor: '#333',
  },
  preferenceBadgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  privacyNote: {
    marginTop: 20,
    marginBottom: 40,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
  },
  privacyNoteText: {
    color: Colors.lightGray,
    fontSize: 12,
    lineHeight: 18,
  },
});