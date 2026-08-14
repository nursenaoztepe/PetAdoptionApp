import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { FavoritesContext } from '../context/FavoritesContext';

export default function FavoritesScreen({ navigation }) {
  const { favorites } = useContext(FavoritesContext);

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>💔</Text>
        <Text style={styles.emptyTitle}>Henüz Favoriniz Yok</Text>
        <Text style={styles.emptyText}>Ana sayfaya dönüp dikkatinizi çeken dostlarımızı favorilerinize ekleyebilirsiniz.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Favorilerim ❤️</Text>
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          // KARTIN KENDİSİNİ TOUCHABLEOPACITY İLE SARMALADIK
          <TouchableOpacity 
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Details', { pet: item })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.breedText}>{item.type} - {item.breed}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9FC', paddingTop: 60 },
  headerContainer: { paddingHorizontal: 20, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '800', color: '#2D3748' },
  emptyContainer: { flex: 1, backgroundColor: '#F7F9FC', justifyContent: 'center', alignItems: 'center', padding: 30 },
  emptyEmoji: { fontSize: 60, marginBottom: 20 },
  emptyTitle: { fontSize: 22, fontWeight: 'bold', color: '#2D3748', marginBottom: 10 },
  emptyText: { fontSize: 15, color: '#718096', textAlign: 'center', lineHeight: 22 },
  listContainer: { paddingHorizontal: 20, paddingBottom: 30 },
  card: { backgroundColor: '#FFFFFF', marginBottom: 25, borderRadius: 20, elevation: 6 },
  image: { width: '100%', height: 200, borderTopLeftRadius: 20, borderTopRightRadius: 20, resizeMode: 'cover' },
  infoContainer: { padding: 16 },
  name: { fontSize: 22, fontWeight: '700', color: '#1A202C' },
  breedText: { fontSize: 15, color: '#718096', marginTop: 5 },
});