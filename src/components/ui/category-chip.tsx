import { Pressable, Text } from 'react-native';

interface CategoryChipProps {
  label: string;
  activa: boolean;
  onPress: () => void;
}

export function CategoryChip({ label, activa, onPress }: CategoryChipProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      accessibilityState={{ checked: activa }}
      className={`min-h-12 justify-center rounded-full border px-4 py-2 ${
        activa
          ? 'border-primary-container bg-primary-container active:opacity-80'
          : 'border-outline bg-surface-container active:bg-surface-container-high'
      }`}>
      <Text
        className={`text-sm font-medium ${
          activa ? 'text-on-primary-container' : 'text-on-surface-variant'
        }`}>
        {label}
      </Text>
    </Pressable>
  );
}
