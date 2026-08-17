import { useEffect, useState } from 'react';
import { Alert, Platform, ScrollView, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ScreenLayout } from '@/components/ui/screen-layout';
import {
  getGeminiApiKey,
  removeGeminiApiKey,
  setGeminiApiKey,
} from '@/utils/credentialStorage';

export default function Settings() {
  const [apiKey, setApiKey] = useState('');
  const [guardado, setGuardado] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getGeminiApiKey()
      .then((key) => {
        if (key) setApiKey(key);
      })
      .catch(() => setError('No se pudo leer la API key.'))
      .finally(() => setCargando(false));
  }, []);

  const handleGuardar = async () => {
    const trimmed = apiKey.trim();
    setGuardando(true);
    setError(null);
    try {
      if (trimmed) {
        await setGeminiApiKey(trimmed);
        setGuardado(true);
        Alert.alert('Guardado', 'API key de Gemini guardada correctamente.');
      } else {
        await removeGeminiApiKey();
        setGuardado(true);
        Alert.alert('Eliminado', 'API key eliminada. Solo se usará Datamuse para sinónimos.');
      }
    } catch {
      setError('No se pudo guardar la API key. Inténtalo nuevamente.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <ScreenLayout>
      <ScrollView
        className="flex-1"
        contentContainerClassName="w-full max-w-2xl self-center px-6 pb-10 pt-4"
        showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Configuración" />

        <View className="mt-8 rounded-3xl bg-surface-container-high p-6">
          <Text className="text-xs font-semibold uppercase tracking-widest text-primary">Opcional</Text>
          <Text className="mt-3 text-xl font-bold text-on-surface">Generación con IA</Text>
          <Text className="mt-2 text-sm text-on-surface-variant">
            Gemini genera palabras clave y complementa la búsqueda de sinónimos. Necesitas una API
            key de Google AI Studio.
          </Text>

          <View className="mt-6">
            <Text className="text-sm font-medium text-on-surface-variant">
              Gemini API Key (opcional)
            </Text>
            <Input
              className="mt-2"
              placeholder="AIza..."
              value={apiKey}
              onChangeText={(text) => {
                setApiKey(text);
                setGuardado(false);
              }}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              editable={!cargando && !guardando}
            />
            {Platform.OS === 'web' && (
              <Text className="mt-2 text-xs text-on-surface-variant">
                En web la key solo permanece durante esta sesión del navegador.
              </Text>
            )}
            {error && (
              <Text accessibilityLiveRegion="polite" className="mt-2 text-sm text-error">
                {error}
              </Text>
            )}
          </View>

          <View className="mt-4 rounded-2xl bg-surface-container p-4">
            <Text className="text-xs text-on-surface-variant">
              Cómo obtener tu API key:{'\n'}
              1. Ve a aistudio.google.com{'\n'}
              2. Inicia sesión con tu cuenta de Google{'\n'}
              3. Haz clic en {'“Get API key”'}{'\n'}
              4. Copia la key y pégala aquí
            </Text>
          </View>

          <View className="mt-6">
            <Button
              title={guardando ? 'Guardando…' : guardado ? 'Guardado' : 'Guardar API key'}
              onPress={handleGuardar}
              disabled={guardado || cargando || guardando}
            />
          </View>
        </View>

        <View className="mt-8 rounded-2xl border border-outline p-5">
          <Text className="text-lg font-semibold text-on-surface">
            Cómo funciona la palabra clave
          </Text>
          <Text className="mt-2 text-sm text-on-surface-variant">
            Al crear una palabra personalizada, puedes generar automáticamente una palabra clave
            relacionada. Durante el juego, todos los impostores reciben la misma clave, mientras
            los demás jugadores ven la palabra secreta.
          </Text>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
