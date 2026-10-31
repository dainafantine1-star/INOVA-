# Inove — Atendimento sob medida

Landing page estática em português, com blog, comparador de custos e solicitação pelo WhatsApp. HTML, CSS e JavaScript sem dependências de build.

## Arquivos

- `dist/index.html`: página principal.
- `dist/blog/`: quatro artigos com links para fontes oficiais.
- `dist/contact-config.js`: número comercial do WhatsApp.
- `dist/app.js`: formulário, modalidades e comparador.
- `vercel.json`: publicação da pasta `dist` na Vercel.

## WhatsApp

Configure o número comercial verificado em `dist/contact-config.js`, com país e DDD, apenas dígitos. O formulário valida as opções e abre `https://wa.me/NUMERO?text=MENSAGEM` com todas as informações preenchidas. A modalidade do mapa de cobertura usa o mesmo fluxo. O visitante confirma o envio no WhatsApp. Não há etapa de copiar e colar.

Se o número não estiver configurado, uma mensagem informa a indisponibilidade. A página nunca adivinha o destinatário.

## Vercel

Importe o repositório como projeto **Other**. A pasta de saída é `dist`; não é necessário comando de build nem instalação de pacotes. As páginas do blog são arquivos estáticos e não exigem rotas de SPA.

Depois de definir o domínio definitivo, atualize o endereço canônico, os metadados sociais e `dist/sitemap.xml` para esse domínio.

## Imagens e informações

A fotografia da abertura é ilustrativa e gerada por IA; as demais fotos são ilustrativas de Pexels e Unsplash, com créditos no rodapé. Não representam a equipe ou instalações da Inove.

Conteúdo jurídico informativo verificado em 31/10/2026. Enquadramento, normas coletivas e exigências setoriais devem ser avaliados para cada operação. Não há promessa de economia fixa ou garantia de conformidade automática.
