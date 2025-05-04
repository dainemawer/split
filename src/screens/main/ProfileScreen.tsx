import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, List, Button, Avatar, Portal, Modal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';

type ProfileScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { signOut, session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (session?.user?.id) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('avatar_url')
          .eq('id', session.user.id)
          .single();

        if (profile?.avatar_url) {
          setAvatarUrl(profile.avatar_url);
        }
      }
    };

    fetchProfile();
  }, [session?.user?.id]);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
      // Navigation will be handled by the auth state change listener in AuthProvider
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get user's initials for the avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Get user's full name from metadata or email
  const getUserName = () => {
    if (session?.user?.user_metadata?.full_name) {
      return session.user.user_metadata.full_name;
    }
    if (session?.user?.user_metadata?.name) {
      return session.user.user_metadata.name;
    }
    return session?.user?.email?.split('@')[0] || 'User';
  };

  const handleAvatarPress = () => {
    setShowAvatarModal(true);
  };

  const handleUploadAvatar = () => {
    // TODO: Implement avatar upload
    setShowAvatarModal(false);
  };

  const handleTakePhoto = () => {
    // TODO: Implement camera capture
    setShowAvatarModal(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.profileHeader}>
            <TouchableOpacity onPress={handleAvatarPress}>
              <View style={styles.avatarContainer}>
                {avatarUrl ? (
                  <Avatar.Image
                    size={80}
                    source={{ uri: avatarUrl }}
                    accessibilityLabel="User avatar"
                  />
                ) : (
                  <Avatar.Text
                    size={80}
                    label={getInitials(getUserName())}
                    accessibilityLabel="User avatar"
                  />
                )}
                <View style={styles.editAvatarButton}>
                  <MaterialCommunityIcons name="camera" size={20} color="#fff" />
                </View>
              </View>
            </TouchableOpacity>
            <Text variant="headlineMedium" style={styles.name}>
              {getUserName()}
            </Text>
            <Text variant="bodyLarge" style={styles.email}>
              {session?.user?.email}
            </Text>
          </View>

          <List.Section>
            <List.Item
              title="Payment Methods"
              left={props => <List.Icon {...props} icon="credit-card" />}
              accessibilityLabel="Payment methods"
              accessibilityHint="Press to manage payment methods"
            />
            <List.Item
              title="Notifications"
              left={props => <List.Icon {...props} icon="bell" />}
              accessibilityLabel="Notifications"
              accessibilityHint="Press to manage notifications"
            />
            <List.Item
              title="Privacy"
              left={props => <List.Icon {...props} icon="shield" />}
              accessibilityLabel="Privacy settings"
              accessibilityHint="Press to manage privacy settings"
            />
            <List.Item
              title="Help & Support"
              left={props => <List.Icon {...props} icon="help-circle" />}
              accessibilityLabel="Help and support"
              accessibilityHint="Press to access help and support"
            />
          </List.Section>

          <Button
            mode="outlined"
            onPress={handleSignOut}
            loading={loading}
            disabled={loading}
            accessibilityLabel="Sign out button"
            accessibilityHint="Press to sign out of your account"
            style={styles.signOutButton}
          >
            Sign Out
          </Button>
        </View>
      </ScrollView>

      <Portal>
        <Modal
          visible={showAvatarModal}
          onDismiss={() => setShowAvatarModal(false)}
          contentContainerStyle={styles.modalContent}
        >
          <Text variant="titleLarge" style={styles.modalTitle}>
            Update Profile Picture
          </Text>
          <View style={styles.modalButtons}>
            <Button
              mode="outlined"
              onPress={handleTakePhoto}
              icon="camera"
              style={styles.modalButton}
            >
              Take Photo
            </Button>
            <Button
              mode="outlined"
              onPress={handleUploadAvatar}
              icon="image"
              style={styles.modalButton}
            >
              Choose from Library
            </Button>
          </View>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    position: 'relative',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 4,
  },
  name: {
    marginTop: 16,
    marginBottom: 4,
  },
  email: {
    color: '#666',
  },
  signOutButton: {
    marginTop: 32,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    gap: 12,
  },
  modalButton: {
    marginTop: 0,
  },
});

export default ProfileScreen;
