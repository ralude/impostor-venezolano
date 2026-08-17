import { useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ScreenLayout } from '@/components/ui/screen-layout';

const PASOS = [
  ['Armen el grupo', 'Agreguen al menos tres panas y elijan categorías.'],
  ['Pasen el teléfono', 'Cada quien mira su rol a solas y oculta la pantalla.'],
  ['Echen sus pistas', 'Digan algo relacionado sin regalar la palabra secreta.'],
  ['Voten y descubran', 'Señalen al sospechoso y revelen quién estaba improvisando.'],
];

export default function ComoJugarScreen() {
  const router = useRouter();

  return (
    <ScreenLayout>
      <View className="w-full max-w-xl self-center px-6 pt-4">
        <ScreenHeader title="Cómo se juega" />
      </View>

      <ScrollView
        className="w-full max-w-xl flex-1 self-center px-6"
        contentContainerClassName="grow justify-center gap-3 py-8">
        {PASOS.map(([titulo, detalle], index) => (
          <View key={titulo} className="flex-row gap-4 rounded-2xl bg-surface-container p-5">
            <View className="h-9 w-9 items-center justify-center rounded-full bg-primary-container">
              <Text className="font-bold text-on-primary-container">{index + 1}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-on-surface">{titulo}</Text>
              <Text className="mt-1 text-sm leading-5 text-on-surface-variant">{detalle}</Text>
            </View>
          </View>
        ))}
        <Text className="mt-2 text-center text-sm text-primary">
          Regla de oro: que nadie más mire cuando reveles tu rol.
        </Text>
      </ScrollView>

      <View className="w-full max-w-xl self-center px-6 pb-6">
        <Button title="Armar una ronda" onPress={() => router.push('/partida')} />
      </View>
    </ScreenLayout>
  );
}
