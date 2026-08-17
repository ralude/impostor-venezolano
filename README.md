# Impostor Venezolano

Juego local de deducción y palabras venezolanas construido con Expo SDK 57, Expo Router y NativeWind.

## Requisitos

- Node.js 22.13 o superior.
- npm 11.
- Android Studio o Xcode para compilaciones locales nativas.

## Desarrollo

```bash
npm ci
npm start
```

Las rutas viven en `src/app`. El alias `@/` apunta a `src/`.

## Verificación

```bash
npm run typecheck
npm run lint
npm test
npm run export:web
```

## Datos locales

- Los nombres y categorías personalizadas se guardan en AsyncStorage.
- La API key de Gemini se guarda con SecureStore en Android/iOS.
- En web, la API key solo permanece durante la sesión actual del navegador.
- Las rondas son efímeras: si la app se cierra durante una ronda, debe iniciarse otra.

## Builds

Los builds de producción se realizan con EAS y credenciales administradas, usando los perfiles de `eas.json`.

```bash
npm run build:android:production
```
