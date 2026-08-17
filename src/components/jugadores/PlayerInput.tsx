import { Pressable, Text, View } from 'react-native';
import { Input } from '@/components/ui/input';
import { MAX_NOMBRE_JUGADOR } from '@/utils/constants';

interface PlayerInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}

export function PlayerInput({ value, onChangeText, onSubmit }: PlayerInputProps) {
  return (
    <View className="flex-row gap-3">
      <Input
        className="flex-1"
        accessibilityLabel="Nombre del jugador"
        placeholder="Nombre del jugador"
        maxLength={MAX_NOMBRE_JUGADOR}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        returnKeyType="done"
      />
      <Pressable
        onPress={onSubmit}
        accessibilityRole="button"
        accessibilityLabel="Agregar jugador"
        className="h-14 w-14 items-center justify-center rounded-2xl bg-primary active:opacity-80">
        <Text className="text-2xl font-bold text-on-primary">+</Text>
      </Pressable>
    </View>
  );
}
