import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo/vector-icons

interface TeamMember {
  initials: string;
  name: string;
  phone: string;
}

export default function TeamMembersList() {
  const members: TeamMember[] = [
    { initials: 'SS', name: 'Suraj Sinha', phone: '+91 - 9988445577' },
    { initials: 'AM', name: 'Aisha Malhotra', phone: '+91 - 9877554321' },
    // Add more members as needed
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Team members</Text>
        <TouchableOpacity>
          <Ionicons name="information-circle-outline" size={24} color="#2D9CDB" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.membersList}>
        {members.map((member, index) => (
          <View key={index} style={styles.memberCard}>
            <View style={styles.memberInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{member.initials}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{member.name}</Text>
                <Text style={styles.phoneText}>{member.phone}</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Ionicons name="trash-outline" size={20} color="#E57373" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

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
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  membersList: {
    flex: 1,
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
});