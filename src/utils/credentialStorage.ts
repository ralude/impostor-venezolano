import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

import { STORAGE_KEYS } from '@/utils/storageKeys';

const WEB_SESSION_KEY = 'impostor-veneco:gemini-api-key';

function getSessionStorage(): Storage {
  const storage = globalThis.sessionStorage;
  if (!storage) throw new Error('El almacenamiento de sesión no está disponible.');
  return storage;
}

export async function getGeminiApiKey(): Promise<string | null> {
  if (Platform.OS === 'web') {
    return getSessionStorage().getItem(WEB_SESSION_KEY);
  }

  const segura = await SecureStore.getItemAsync(STORAGE_KEYS.GEMINI_API_KEY);
  if (segura) return segura;

  const anterior = await AsyncStorage.getItem(STORAGE_KEYS.GEMINI_API_KEY);
  if (!anterior) return null;

  await SecureStore.setItemAsync(STORAGE_KEYS.GEMINI_API_KEY, anterior);
  await AsyncStorage.removeItem(STORAGE_KEYS.GEMINI_API_KEY);
  return anterior;
}

export async function setGeminiApiKey(value: string): Promise<void> {
  if (Platform.OS === 'web') {
    getSessionStorage().setItem(WEB_SESSION_KEY, value);
    return;
  }

  await SecureStore.setItemAsync(STORAGE_KEYS.GEMINI_API_KEY, value);
  await AsyncStorage.removeItem(STORAGE_KEYS.GEMINI_API_KEY);
}

export async function removeGeminiApiKey(): Promise<void> {
  if (Platform.OS === 'web') {
    getSessionStorage().removeItem(WEB_SESSION_KEY);
    return;
  }

  await Promise.all([
    SecureStore.deleteItemAsync(STORAGE_KEYS.GEMINI_API_KEY),
    AsyncStorage.removeItem(STORAGE_KEYS.GEMINI_API_KEY),
  ]);
}
