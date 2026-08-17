import { TextInput, type TextInputProps } from 'react-native';
import { COLORES } from '@/utils/constants';

export function Input({ className, placeholderTextColor, ...props }: TextInputProps) {
  return (
    <TextInput
      className={`min-h-12 rounded-xl border border-outline bg-surface-container px-4 py-3 text-base text-on-surface focus:border-primary ${className ?? ''}`}
      placeholderTextColor={placeholderTextColor ?? COLORES.ON_SURFACE_VARIANT}
      {...props}
    />
  );
}
