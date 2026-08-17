import { Text, View } from 'react-native';

interface ImpostorRevealProps {
  palabraClave: string;
  categoria: string;
}

export function ImpostorReveal({ palabraClave, categoria }: ImpostorRevealProps) {
  return (
    <View className="mt-6 items-center rounded-3xl bg-surface-container px-8 py-10">
      <Text className="text-center text-2xl font-bold text-error">ERES EL IMPOSTOR</Text>
      <Text className="mt-6 text-center text-sm font-medium uppercase tracking-widest text-on-error-container/80">
        Tu palabra clave es
      </Text>
      <Text className="mt-4 text-center text-5xl font-extrabold text-on-error-container">
        {palabraClave}
      </Text>
      <Text className="mt-6 text-center text-sm text-on-error-container/80">
        Improvisa sin revelar que no conoces la palabra secreta.
      </Text>
      <Text className="mt-4 text-center text-sm text-on-error-container/80">
        Categoría: {categoria}
      </Text>
    </View>
  );
}
