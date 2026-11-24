# Portfólio — Alex Fernandes

Site estático (HTML, CSS e JavaScript puros), sem build e sem dependências. Duas abas: **Currículo** e **Cases**.

## Publicar no GitHub Pages
1. Crie um repositório. Para a URL `https://SEU-USUARIO.github.io`, nomeie-o `SEU-USUARIO.github.io`.
2. Envie todo o conteúdo desta pasta para a branch `main` (o `index.html` deve ficar na raiz).
3. Em **Settings → Pages**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`.
4. Aguarde 1–2 minutos e acesse a URL.

## Testar localmente
Abra o `index.html` no navegador, ou rode `python3 -m http.server` na pasta.

## Como editar
- **Tudo em `js/data.js`:** dados do currículo, ferramentas (basta incluir o nome na lista da categoria) e cases.
- **Novo case:** copie um bloco de `window.CASES` e troque `id`, `titulo`, `categoria` (Produto, Growth, Dados, Estratégia ou Monetização) e os textos. Campos vazios aparecem como "A preencher".
- **Imagens, vídeos e links:** coloque os arquivos em `assets/img/` e liste em `media`:
  `{ tipo: "imagem", src: "assets/img/print.png", legenda: "..." }`, `{ tipo: "video", src: "https://www.youtube.com/embed/ID" }`, `{ tipo: "link", src: "https://...", legenda: "Abrir" }`.
  Para a capa do card, use `capa: "assets/img/arquivo.jpg"`; sem imagem, o card usa um gradiente azul.
- **PDF do currículo:** substitua `assets/docs/curriculo-alex-fernandes.pdf` mantendo o nome.
- **Cores e fontes:** variáveis no topo de `css/style.css`.

## Observação
Os resultados exibidos nos cases vêm exclusivamente do currículo. Complete contexto, estratégia e aprendizados com dados reais e confirme o que pode ser divulgado publicamente.
