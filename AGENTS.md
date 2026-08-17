# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

# Stack

- Expo SDK 57 + expo-router (rutas tipadas) en `src/app/`, alias `@/*` → `./src/*`.
- Estilos: **NativeWind v4** (Tailwind CSS 3.4). Clases `className` en componentes RN; nada de `StyleSheet` para estilos visuales nuevos.
- Tema: **solo oscuro**, estilo Material Design 3. Paleta definida en `tailwind.config.js` (primario turquesa neón `#00F0C8`, fondo `#0B1210`). Usa los tokens (`bg-primary`, `text-on-surface`, etc.), no valores hex sueltos.
- Componentes reutilizables en `src/components/ui/` (ej. `button.tsx` con variantes `filled`/`tonal`/`outlined`, ripple Android + estados `active:`).
- Config NativeWind: `babel.config.js` (jsxImportSource), `metro.config.js` (withNativeWind, input `src/global.css`), `nativewind-env.d.ts`.

# Comandos

- Verificar tipos: `npx tsc --noEmit` (si fallan las rutas tipadas, regenerar con `npx expo start` una vez).
- Build de prueba web: `npx expo export --platform web`.
