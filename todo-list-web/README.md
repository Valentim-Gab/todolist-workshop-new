# Whitelabel - Starter

Aplicação para começar um projeto Vue com Quasar

## Sumário

- [ReCaptcha v3](#recaptcha-v3)

<br>

# ReCaptcha v3

Para utilizar o ReCaptcha v3 já existente no projeto:

> - Em `quasar.config.js` descomentar o item `vue-recaptcha` da lista de boot
>   (`boot: ['i18n', 'axios' /*, 'vue-recaptcha'*/],`).
> - Descomentar o código em `src/boot/vue-recaptcha.ts`
> - Configurar as regras em conjunto do arquivo `src/services/RecaptchaService.ts`

[Biblioteca de ReCaptcha v3 para Vue.js](https://www.npmjs.com/package/vue-recaptcha-v3)

```bash
npm install vue-recaptcha-v3
```
