import { Text, View } from 'react-native';

interface PalabrasPendientesListProps {
  palabras: { palabra: string; palabraClaveImpostor: string; sinonimos?: string[] }[];
}

export function PalabrasPendientesList({ palabras }: PalabrasPendientesListProps) {
  if (palabras.length === 0) return null;

  return (
    <View className="mt-6">
      <Text className="text-sm font-medium text-on-surface-variant">
        Palabras listas para guardar ({palabras.length})
      </Text>
      {palabras.map((p, i) => (
        <View key={i} className="mt-2 rounded-lg bg-surface-container px-3 py-2">
          <Text className="text-base text-on-surface">{p.palabra}</Text>
          <Text className="mt-1 text-xs text-on-surface-variant">
            Clave del impostor: {p.palabraClaveImpostor}
          </Text>
          {p.sinonimos && p.sinonimos.length > 0 && (
            <Text className="mt-1 text-xs text-primary">
              Sinonimos: {p.sinonimos.join(', ')}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
}
