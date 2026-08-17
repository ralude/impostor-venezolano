import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { COLORES } from '@/utils/constants';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="w-full max-w-xl self-center items-end px-6 pt-4">
        <Pressable
          onPress={() => router.push('/settings')}
          accessibilityRole="button"
          accessibilityLabel="Abrir ajustes"
          className="h-12 w-12 items-center justify-center rounded-full bg-surface-container active:opacity-70">
          <Ionicons name="settings-outline" size={22} color={COLORES.ON_SURFACE_VARIANT} />
        </Pressable>
      </View>

      <View className="w-full max-w-xl flex-1 self-center justify-center px-6">
        <Text className="text-sm font-semibold uppercase tracking-[3px] text-primary">
          Impostor Veneco
        </Text>
        <Text accessibilityRole="header" className="mt-4 text-5xl font-extrabold leading-tight text-on-surface">
          ¿Quién está echando cuento?
        </Text>
        <Text className="mt-5 max-w-md text-lg leading-7 text-on-surface-variant">
          Arma una ronda, pasa el teléfono y descubre quién está improvisando.
        </Text>
      </View>

      <View className="w-full max-w-xl self-center gap-3 px-6 pb-6">
        <Button title="Armar una ronda" onPress={() => router.push('/partida')} />
        <Button
          title="Cómo jugar"
          variant="outlined"
          onPress={() => router.push('/como-jugar')}
        />
      </View>
    </SafeAreaView>
  );
}
