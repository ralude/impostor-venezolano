import { Text, View } from 'react-native';
import { RevealText } from '@/components/ui/reveal-text';

interface ImpostorRevealProps {
  palabraClave: string;
  categoria: string;
  onComplete: () => void;
}

export function ImpostorReveal({ palabraClave, categoria, onComplete }: ImpostorRevealProps) {
  return (
    <View className="items-center rounded-3xl bg-error-container px-8 py-12">
      <Text className="text-center text-sm font-bold uppercase tracking-widest text-on-error-container">Eres el impostor</Text>
      <Text className="mt-6 text-center text-sm font-medium uppercase tracking-widest text-on-error-container/80">
        Tu palabra clave es
      </Text>
      <RevealText
        key={palabraClave}
        text={palabraClave}
        onComplete={onComplete}
        className="mt-4 text-center text-5xl font-extrabold text-on-error-container"
      />
      <Text className="mt-6 text-center text-sm text-on-error-container/80">
        Improvisa sin revelar que no conoces la palabra secreta.
      </Text>
      <Text className="mt-4 text-center text-sm text-on-error-container/80">
        {categoria}
      </Text>
    </View>
  );
}
