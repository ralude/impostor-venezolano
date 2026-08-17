import { Pressable, Text } from 'react-native';

interface TarjetaJugadorProps {
  nombre: string;
  revelada: boolean;
  onPress: () => void;
}

export function TarjetaJugador({ nombre, revelada, onPress }: TarjetaJugadorProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={revelada}
      accessibilityRole="button"
      accessibilityLabel={`${nombre}${revelada ? ', palabra vista' : ', revelar palabra'}`}
      accessibilityState={{ disabled: revelada }}
      className={`min-h-20 max-w-56 basis-36 grow items-center justify-center rounded-2xl px-3 py-5 ${
        revelada ? 'opacity-40' : 'bg-surface-container active:opacity-80'
      }`}>
      <Text
        className={`text-center text-base font-semibold ${
          revelada ? 'text-on-surface-variant' : 'text-on-surface'
        }`}
        numberOfLines={2}>
        {nombre}
      </Text>
      {revelada && (
        <Text className="mt-1 text-xs text-on-surface-variant">Vista</Text>
      )}
    </Pressable>
  );
}
