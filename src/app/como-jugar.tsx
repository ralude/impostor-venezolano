import { useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton } from '@/components/ui/back-button';
import { Button } from '@/components/ui/button';

const REGLAS = [
  'Todos los jugadores reciben la misma palabra secreta, excepto el impostor.',
  'Por turnos, cada jugador dice una pista sobre la palabra.',
  'El impostor debe disimular e intentar pasar desapercibido.',
  'Al final, todos votan para descubrir quién es el impostor.',
];

export default function ComoJugarScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="w-full max-w-xl self-center flex-row items-center gap-2 px-6 pt-4">
        <BackButton />
        <Text className="text-4xl font-bold text-on-surface">Cómo jugar</Text>
      </View>

      <ScrollView
        className="w-full max-w-xl flex-1 self-center px-6"
        contentContainerClassName="grow justify-center gap-4 py-8">
        {REGLAS.map((regla) => (
          <View key={regla} className="flex-row gap-3">
            <Text className="text-base text-primary">•</Text>
            <Text className="flex-1 text-base text-on-surface-variant">{regla}</Text>
          </View>
        ))}
      </ScrollView>

      <View className="w-full max-w-xl self-center px-6 pb-6">
        <Button title="Volver" variant="outlined" onPress={() => router.back()} />
      </View>
    </SafeAreaView>
  );
}
