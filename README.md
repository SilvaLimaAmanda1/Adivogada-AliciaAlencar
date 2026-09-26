# Site institucional — Advocacia

Website one-page responsivo para advogada com atuação em Direito do Trabalho e Direito do Consumidor.

## Arquivos

- `index.html` — estrutura e conteúdo.
- `style.css` — layout, identidade visual, responsividade e animações.
- `script.js` — menu mobile, navegação ativa, animações, blog/modal e formulário.
- `assets/favicon.svg` — favicon.

## Configuração rápida

Abra `script.js` e altere apenas o objeto `siteConfig` no começo do arquivo:

```js
const siteConfig = {
  lawyerName: "Nome da Advogada",
  oab: "OAB/UF 00.000",
  email: "contato@seudominio.com",
  phoneDisplay: "(00) 00000-0000",
  whatsappNumber: "5500000000000",
  city: "Inserir cidade/UF"
};
```

Também substitua o bloco de foto profissional em `index.html` pela foto real quando ela estiver disponível.

## Formulário

O formulário está configurado sem backend: ao enviar, prepara uma mensagem por `mailto:`. Para uso profissional, recomenda-se conectar o formulário a um serviço/backend seguro e publicar uma Política de Privacidade adequada ao fluxo real de dados.

## Conteúdo jurídico

Os textos são modelos de estrutura, não pareceres jurídicos. Antes da publicação, a advogada deve revisar os conteúdos e ajustar o escopo da atuação e as informações profissionais.
