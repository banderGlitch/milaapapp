import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Contact, fetchContacts } from '../constants/contacts';
import { Ionicons } from '@expo/vector-icons';

const ITEMS_PER_PAGE = 5;

export default function TeamMembersList() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadContacts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newContacts = await fetchContacts(currentPage, ITEMS_PER_PAGE);
      if (newContacts.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }
      setContacts(prev => [...prev, ...newContacts]);
      setCurrentPage(prev => prev + 1);
    } catch (error) {
      console.error('Error loading contacts:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, loading, hasMore]);

  // Load initial data
  React.useEffect(() => {
    loadContacts();
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  const renderItem = ({ item }: { item: Contact }) => (
    <View style={styles.memberCard}>
      <View style={styles.memberInfo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{item.name}</Text>
          <View style={styles.phoneContainer}>
            <Ionicons name="call-outline" size={14} color="#666" />
            <Text style={styles.phoneText}>{item.phone}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={20} color="#C2185B" />
      </TouchableOpacity>
    </View>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" color="#C2185B" />
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) return null;
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No contacts found</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Ionicons name="people-outline" size={24} color="#333" />
        <Text style={styles.headerText}>Team members</Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="information-circle-outline" size={24} color="#2D9CDB" />
      </TouchableOpacity>
    </View>

    <FlatList
      data={contacts}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      onEndReached={loadContacts}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      showsVerticalScrollIndicator={false}
    />

    <TouchableOpacity style={styles.addButton}>
      <Text style={styles.addButtonText}>Add members</Text>
    </TouchableOpacity>
  </View>
);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    headerText: {
      fontSize: 18,
      fontWeight: '600',
      color: '#333',
      marginLeft: 8,
    },
    memberCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
      backgroundColor: '#FFF',
      borderRadius: 8,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: '#F0F0F0',
    },
    memberInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#FFE8E8',
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarText: {
      color: '#C2185B',
      fontSize: 16,
      fontWeight: '500',
    },
    textContainer: {
      marginLeft: 12,
      flex: 1,
    },
    nameText: {
      fontSize: 16,
      fontWeight: '500',
      color: '#333',
    },
    phoneContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
      gap: 4,
    },
    phoneText: {
      fontSize: 14,
      color: '#666',
      marginLeft: 4,
    },
    deleteButton: {
      padding: 8,
    },
    addButton: {
      backgroundColor: '#C2185B',
      padding: 16,
      borderRadius: 25, // Made more rounded
      alignItems: 'center',
      marginTop: 16,
      elevation: 2, // Android shadow
      shadowColor: '#000', // iOS shadow
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    addButtonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: '500',
    },
    loaderContainer: {
      paddingVertical: 20,
      alignItems: 'center',
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
    },
    emptyText: {
      fontSize: 16,
      color: '#666',
    },
  });