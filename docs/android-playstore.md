# Android / Play Store

## O que já está pronto

- Projeto Android gerado com Capacitor em `android/`
- Build mobile do app web em `dist/`
- Configuração base do app em `capacitor.config.ts`

## Comandos principais

```powershell
npm.cmd run build:mobile
npm.cmd run android:assets
npx cap sync
npx cap open android
```

## Fluxo recomendado

1. Rode `npm.cmd run build:mobile`
2. Rode `npm.cmd run android:assets`
3. Rode `npx cap sync`
4. Rode `npx cap open android`
5. No Android Studio, espere o Gradle sincronizar
6. Teste no emulador ou celular Android

## Gerar pacote para Play Store

No Android Studio:

1. `Build`
2. `Generate Signed Bundle / APK`
3. Escolha `Android App Bundle`
4. Crie ou selecione seu `keystore`
5. Gere a build `release`

O arquivo final para a Play Store será um `.aab`.

## Antes de publicar

- Revisar telas largas no celular, principalmente o mapa da árvore
- Criar capturas de tela para Play Store
- Definir política de privacidade se a loja exigir
- Confirmar nome, descrição curta e descrição completa do app
- Confirmar categoria correta na Play Console

## Arquivos importantes

- `android/app/build.gradle`
- `android/app/src/main/AndroidManifest.xml`
- `android/app/src/main/res/values/strings.xml`
- `android/app/src/main/res/`
