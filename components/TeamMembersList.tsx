import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Contact, fetchContacts } from '../constants/contacts';

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
          <Text style={styles.phoneText}>{item.phone}</Text>
        </View>
      </View>
      <TouchableOpacity>
        <Text style={styles.deleteText}>Delete</Text>
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
        <Text style={styles.headerText}>Team members</Text>
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
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
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
    color: '#333',
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
  phoneText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  deleteText: {
    color: '#E57373',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#C2185B',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
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