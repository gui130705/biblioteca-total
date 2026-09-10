# Biblioteca Proibida — leitura imersiva estilo Ziggur

Redesenho completo do app em torno da leitura: visual escuro minimalista, leitor de texto com controles de tema e tipografia, progresso real, marcações e anotações, e uma estante pessoal organizada por status.

## 1. Livros em texto

Os 9 PDFs viram texto navegável por capítulos (o PDF original continua disponível para baixar).

- Extração do texto de cada PDF, limpeza de quebras, cabeçalhos e numeração solta.
- Cada livro vira um arquivo de conteúdo com capítulos e parágrafos, versionado no projeto (leitura instantânea, sem consulta ao banco).
- Estimativa de tempo de leitura por capítulo e para o livro inteiro, calculada a partir do número de palavras.
- Títulos sem texto aproveitável continuam apenas em PDF, com aviso claro no lugar do leitor.

## 2. Leitor imersivo

Nova tela de leitura sem distrações: só o texto, com uma barra superior que some ao rolar.

- Temas de leitura: escuro, sépia e claro/papel — independentes do tema do site.
- Tipografia ajustável: tamanho da fonte, espaçamento entre linhas, largura da coluna e alternância serifada/sem serifa.
- Barra fina de progresso no topo, com percentual lido e tempo restante estimado.
- Navegação entre capítulos com sumário lateral.
- Seleção de trecho abre um menu flutuante: destacar (4 cores), copiar ou anotar.
- Marca-página: retoma automaticamente de onde parou, por livro.
- Preferências de leitura salvas no aparelho; progresso, destaques e notas salvos na conta.

## 3. Estante pessoal

Início e biblioteca reorganizados como prateleiras.

- "Continuar lendo" em destaque: capa, percentual, tempo restante e botão retomar.
- Prateleiras: Em andamento, Quero ler, Concluídos, Favoritos.
- Mover um livro entre prateleiras a partir do card e da página de detalhes.
- Catálogo mantém a busca, os filtros por categoria e a lista horizontal, com visual novo.
- Página "Minhas anotações": todos os destaques e notas, agrupados por livro, com link para o trecho.

## 4. Identidade visual

- Paleta escura mais sóbria: fundo quase preto neutro, tipografia clara de alto contraste, carmim usado só como acento pontual; ouro reservado a destaques.
- Tipografia: serifada elegante para títulos e leitura, sem serifa discreta para a interface.
- Cards e superfícies mais silenciosos: menos bordas, mais espaço, transições suaves.
- Ajustes aplicados aos tokens globais, então todas as telas acompanham.

## Detalhes técnicos

- Conteúdo: `src/content/books/<slug>.json` (capítulos + parágrafos), gerado por script Python com `pdfplumber`; índice tipado em `src/lib/book-content.ts`.
- Banco (novas tabelas, RLS por `auth.uid()`, GRANTs para `authenticated`/`service_role`):
  - `reading_progress` (user_id, book_id, chapter_index, scroll_ratio, percent, status: `want`/`reading`/`done`, last_read_at) — único por usuário/livro.
  - `highlights` (user_id, book_id, chapter_index, texto, offsets inicial/final, cor, nota opcional).
- Leitura/escrita pelo cliente Supabase existente + React Query; `favorites` permanece como está.
- Rotas: `/ler/$slug` reescrita como leitor de texto (com botão "PDF original"), `/estante` (ou `/carrinho` renomeada) para a estante, `/anotacoes` para destaques e notas.
- Preferências de leitura em `localStorage` via hook `useReaderPrefs`; temas do leitor como classes/tokens CSS próprios em `src/styles.css`.
- Sem login, o leitor funciona normalmente e o app convida a entrar para salvar progresso.
