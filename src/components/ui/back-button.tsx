import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { COLORES } from '@/utils/constants';

interface BackButtonProps {
  onPress?: () => void;
}

/**
 * Boton de retroceso con icono de flecha hacia la izquierda.
 * Por defecto ejecuta `router.back()`.
 */
export function BackButton({ onPress }: BackButtonProps) {
  const router = useRouter();

  return (
    <Pressable
      onPress={onPress ?? (() => router.back())}
      accessibilityRole="button"
      accessibilityLabel="Volver atrás"
      className="h-12 w-12 items-center justify-center rounded-full active:opacity-60"
      android_ripple={{ color: 'rgba(223, 232, 228, 0.12)', borderless: true, radius: 24 }}>
      <Ionicons name="arrow-back" size={24} color={COLORES.ON_SURFACE} />
    </Pressable>
  );
}
