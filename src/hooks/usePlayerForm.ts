import { useState } from 'react';
import { Alert } from 'react-native';

import type { Jugador } from '@/utils/gameLogic';
import { MIN_JUGADORES, MENSAJES } from '@/utils/constants';

export function usePlayerForm(
  jugadores: Jugador[],
  onAgregar: (nombre: string) => void,
  onEditar: (id: string, nombre: string) => void,
  onEliminar: (id: string) => void,
) {
  const [nombreInput, setNombreInput] = useState('');
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [editandoNombre, setEditandoNombre] = useState('');

  const handleAgregar = () => {
    if (!nombreInput.trim()) return;
    onAgregar(nombreInput);
    setNombreInput('');
  };

  const handleEditar = (id: string, nombreActual: string) => {
    setEditandoId(id);
    setEditandoNombre(nombreActual);
  };

  const handleGuardarEdicion = () => {
    if (!editandoId || !editandoNombre.trim()) return;
    onEditar(editandoId, editandoNombre);
    setEditandoId(null);
    setEditandoNombre('');
  };

  const handleEliminar = (id: string) => {
    onEliminar(id);
  };

  const handleSiguiente = (onNavigate: () => void) => {
    if (jugadores.length < MIN_JUGADORES) {
      Alert.alert(MENSAJES.MINIMO_JUGADORES.titulo, MENSAJES.MINIMO_JUGADORES.cuerpo);
      return;
    }
    onNavigate();
  };

  return {
    nombreInput,
    setNombreInput,
    editandoId,
    editandoNombre,
    setEditandoNombre,
    handleAgregar,
    handleEditar,
    handleGuardarEdicion,
    handleEliminar,
    handleSiguiente,
  };
}
