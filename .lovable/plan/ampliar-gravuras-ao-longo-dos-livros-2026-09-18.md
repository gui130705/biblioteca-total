# Ampliar gravuras ao longo dos livros

## Resultado
Cada obra passará a ter uma sequência visual mais rica no leitor: além da capa e da gravura atual, serão incluídas duas novas ilustrações históricas em momentos narrativos distintos. Livros com vários capítulos terão imagens distribuídas entre capítulos; o Pai Nosso, que possui um único capítulo, terá imagens em seções separadas.

## Implementação
- Gerar 18 novas ilustrações horizontais inéditas, duas por livro, mantendo a linguagem visual coesa de gravura clássica, manuscrito antigo, arte sacra e tradição bíblica apócrifa, sem texto incorporado.
- Ampliar o catálogo editorial de imagens para aceitar várias gravuras por obra, cada uma com capítulo, posição, legenda contextual e texto alternativo próprios.
- Posicionar as novas imagens em passagens relevantes do conteúdo real, evitando concentração no início e criando ritmo visual ao longo da leitura.
- Manter capa e gravura já existentes; nenhuma imagem anterior será substituída.
- Preservar integralmente os índices dos parágrafos usados por progresso, destaques e anotações.
- Manter proporção estável, carregamento tardio, legendas discretas e adaptação aos temas Escuro, Sépia e Claro.

## Validação
- Conferir as 9 obras e confirmar três gravuras temáticas por livro, além da capa.
- Verificar a distribuição em capítulos distintos quando o livro permitir.
- Testar desktop e celular, incluindo carregamento, legendas e ausência de sobreposição.
- Confirmar compilação aprovada e ausência de erros no leitor.

## Detalhes técnicos
- Novas imagens em `src/assets/reader-illustrations/`, carregadas por importação estática.
- `readerIllustrationFor` será evoluído para retornar uma coleção ordenada por livro.
- O leitor filtrará as ilustrações do capítulo atual e as inserirá após os parágrafos configurados, sem criar ou alterar `data-paragraph`.
