import { Text, View } from 'react-native';

interface NormalRevealProps {
  palabra: string;
  categoria: string;
}

export function NormalReveal({ palabra, categoria }: NormalRevealProps) {
  return (
    <View className="items-center rounded-3xl bg-surface-container-high px-8 py-12">
      <Text className="text-center text-sm font-medium uppercase tracking-widest text-on-surface-variant">
        Tu palabra es
      </Text>
      <Text className="mt-4 text-center text-5xl font-extrabold text-primary">
        {palabra}
      </Text>

      <Text className="mt-4 text-center text-sm text-on-surface-variant">
        {categoria}
      </Text>
      <Text className="mt-8 text-center text-sm leading-5 text-on-surface-variant">Memorízala. Luego oculta la pantalla y pásala.</Text>
    </View>
  );
}
