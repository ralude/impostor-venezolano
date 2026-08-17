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
      className={`min-h-28 basis-[48%] items-center justify-center rounded-2xl border px-3 py-5 md:basis-[31%] ${
        revelada
          ? 'border-outline bg-background'
          : 'border-transparent bg-surface-container active:bg-surface-container-high'
      }`}>
      <Text
        className={`text-center text-base font-semibold ${
          revelada ? 'text-on-surface-variant' : 'text-on-surface'
        }`}
        numberOfLines={2}>
        {nombre}
      </Text>
      {revelada && (
        <Text className="mt-2 text-xs font-medium text-primary">Rol visto ✓</Text>
      )}
    </Pressable>
  );
}
