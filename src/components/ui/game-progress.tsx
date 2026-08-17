import { Text, View } from 'react-native';

interface GameProgressProps {
  current: number;
  total: number;
  label: string;
}

export function GameProgress({ current, total, label }: GameProgressProps) {
  return (
    <View accessibilityRole="progressbar" accessibilityValue={{ min: 1, max: total, now: current }}>
      <View className="flex-row items-center justify-between">
        <Text className="text-xs font-medium uppercase tracking-widest text-primary">{label}</Text>
        <Text className="text-xs font-medium text-on-surface-variant">
          {current}/{total}
        </Text>
      </View>
      <View className="mt-3 flex-row gap-2">
        {Array.from({ length: total }, (_, index) => (
          <View
            key={index}
            className={`h-1 flex-1 rounded-full ${index < current ? 'bg-primary' : 'bg-outline'}`}
          />
        ))}
      </View>
    </View>
  );
}
