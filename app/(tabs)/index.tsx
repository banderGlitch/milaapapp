import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import TeamMembersList from '../../components/TeamMembersList';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TeamMembersList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})