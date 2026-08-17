import { Pressable, Text, View } from 'react-native';

interface ImpostorStepperProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

export function ImpostorStepper({ value, min, max, onChange }: ImpostorStepperProps) {
  return (
    <View className="flex-row items-center justify-center gap-6">
      <Pressable
        onPress={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        accessibilityRole="button"
        accessibilityLabel="Disminuir número de impostores"
        accessibilityState={{ disabled: value <= min }}
        className={`h-12 w-12 items-center justify-center rounded-full bg-surface-container active:opacity-70 ${
          value <= min ? 'opacity-30' : ''
        }`}>
        <Text className="text-2xl font-bold text-on-surface">−</Text>
      </Pressable>

      <Text className="w-16 text-center text-5xl font-extrabold text-primary">
        {value}
      </Text>

      <Pressable
        onPress={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        accessibilityRole="button"
        accessibilityLabel="Aumentar número de impostores"
        accessibilityState={{ disabled: value >= max }}
        className={`h-12 w-12 items-center justify-center rounded-full bg-surface-container active:opacity-70 ${
          value >= max ? 'opacity-30' : ''
        }`}>
        <Text className="text-2xl font-bold text-on-surface">+</Text>
      </Pressable>
    </View>
  );
}
