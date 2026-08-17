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
      className={`min-h-12 justify-center rounded-full px-4 py-2 ${
        activa
          ? 'bg-primary-container active:opacity-80'
          : 'bg-surface-container opacity-50 active:opacity-70'
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
