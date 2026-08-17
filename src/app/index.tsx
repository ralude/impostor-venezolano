import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="w-full max-w-xl flex-1 self-center items-center justify-center px-6">
        <Text className="text-6xl font-extrabold tracking-tight text-primary">Impostor</Text>
        <Text className="mt-3 text-lg text-on-surface-variant">Juego de palabras</Text>
      </View>

      <View className="w-full max-w-xl self-center gap-3 px-6 pb-6">
        <Button title="Empezar" onPress={() => router.push('/partida')} />
        <Button
          title="Cómo jugar"
          variant="outlined"
          onPress={() => router.push('/como-jugar')}
        />
        <Button
          title="Configuración"
          variant="tonal"
          onPress={() => router.push('/settings')}
        />
      </View>
    </SafeAreaView>
  );
}
