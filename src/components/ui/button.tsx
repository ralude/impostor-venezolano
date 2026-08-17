import { Pressable, Text, type PressableProps } from 'react-native';

export type ButtonVariant = 'filled' | 'tonal' | 'outlined';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  /** Texto del botón (MD3 label-large). */
  title: string;
  /** Variante visual según Material Design 3. Por defecto `filled`. */
  variant?: ButtonVariant;
  /** Clases extra de NativeWind para el contenedor. */
  className?: string;
}

/**
 * Feedback táctil inmediato (sin transiciones JS):
 * - Android: ripple con el color de contenido al 12-16 % (state layer MD3).
 * - iOS/Web: estado `active:` de NativeWind (escala + opacidad al instante).
 */
const BASE_CLASSES =
  'min-h-14 w-full flex-row items-center justify-center rounded-full px-8 py-3 active:scale-[0.98] active:opacity-90';

const LABEL_CLASSES = 'text-base font-semibold tracking-wide';

const VARIANTS: Record<ButtonVariant, { container: string; label: string; ripple: string }> = {
  filled: {
    container: 'bg-primary',
    label: 'text-on-primary',
    ripple: 'rgba(0, 43, 34, 0.16)',
  },
  tonal: {
    container: 'bg-primary-container',
    label: 'text-on-primary-container',
    ripple: 'rgba(140, 248, 220, 0.12)',
  },
  outlined: {
    container: 'border border-primary bg-transparent',
    label: 'text-primary',
    ripple: 'rgba(0, 240, 200, 0.12)',
  },
};

export function Button({ title, variant = 'filled', className, disabled, ...props }: ButtonProps) {
  const styles = VARIANTS[variant];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      android_ripple={{ color: styles.ripple }}
      className={[BASE_CLASSES, styles.container, disabled && 'opacity-40', className]
        .filter(Boolean)
        .join(' ')}
      {...props}>
      <Text className={`${LABEL_CLASSES} ${styles.label}`}>{title}</Text>
    </Pressable>
  );
}
