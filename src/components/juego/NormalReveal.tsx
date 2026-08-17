import { Text, View } from 'react-native';

interface NormalRevealProps {
  palabra: string;
  categoria: string;
}

export function NormalReveal({ palabra, categoria }: NormalRevealProps) {
  return (
    <View className="mt-6 items-center rounded-3xl bg-surface-container px-8 py-10">
      <Text className="text-center text-sm font-medium uppercase tracking-widest text-on-surface-variant">
        Tu palabra es
      </Text>
      <Text className="mt-4 text-center text-5xl font-extrabold text-primary">
        {palabra}
      </Text>

      <Text className="mt-4 text-center text-sm text-on-surface-variant">
        Categoría: {categoria}
      </Text>
    </View>
  );
}
