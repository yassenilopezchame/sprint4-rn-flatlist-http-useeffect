import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../config/constants';

import React, { useState, useEffect } from 'react';
import { View, TextInput, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import CharacterCard from '../components/CharacterCard';
import StateMessage from '../components/StateMessage';
import { getCharacters } from '../services/charactersService';
import { COLORS, DEBOUNCE_MS } from '../config/constants';

// TODO Paso 5: importa lo que falte de 'react-native' y el componente CharacterCard.

export default function CharactersScreen() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  // TODO Paso 4: primera carga de datos con useEffect.
  // TODO Paso 6: estados de carga / error y reintento.
  // TODO Paso 8: paginación (estado extra + función para cargar más).
  // TODO Paso 9: pull to refresh.
  // TODO Paso 10: búsqueda con debounce.

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rick and Morty</Text>

      {/* TODO Paso 10: aquí va el campo de búsqueda. */}

      {/* TODO Paso 5: sustituye este texto por tu FlatList. */}
      <Text style={styles.placeholder}>Aquí aparecerá la lista de personajes.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 16 },
  title: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: '800',
    marginTop: 12,
    marginBottom: 12,
  },
  input: {
    backgroundColor: COLORS.card,
    color: COLORS.text,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  loader: { marginTop: 40 },
  separator: { height: 10 },
  listContent: { paddingBottom: 24 },
  footer: { marginVertical: 16 },
  footerError: { color: COLORS.danger, textAlign: 'center', marginVertical: 16 },
  placeholder: { color: COLORS.textMuted, fontSize: 16, marginTop: 24 },
});
