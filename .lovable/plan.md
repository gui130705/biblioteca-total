# Ilustrações editoriais no leitor

## Resultado
Cada um dos 9 livros terá uma apresentação visual própria dentro do leitor: a capa na abertura e uma nova gravura temática inserida em um ponto narrativo relevante, com legenda discreta. As imagens acompanharão os temas Escuro, Sépia e Claro sem prejudicar a leitura.

## Implementação
- Gerar 9 ilustrações horizontais inéditas, uma para cada obra, em linguagem visual coesa de gravura clássica, manuscrito histórico, arte sacra e tradição bíblica apócrifa, sem texto incorporado.
- Criar um catálogo editorial que associe cada livro à ilustração, legenda, texto alternativo e capítulo/ponto de inserção adequado.
- Exibir a capa existente como abertura visual do primeiro capítulo e a gravura inédita entre blocos de texto no capítulo selecionado de cada obra.
- Usar carregamento tardio, proporção estável e tamanhos responsivos para evitar saltos de página e manter boa leitura no celular.
- Aplicar moldura, contraste e legenda adaptativos aos três ambientes visuais do leitor, sem transformar as imagens em cards.
- Preservar os índices originais dos parágrafos, garantindo que destaques, anotações, progresso e restauração continuem funcionando.

## Qualidade e validação
- Conferir as 9 obras no leitor e testar ao menos uma inserção em cada tema visual.
- Verificar desktop e celular, incluindo largura editorial, legenda, foco e ausência de sobreposição com a barra flutuante.
- Confirmar compilação aprovada e ausência de erros no leitor.

## Detalhes técnicos
- As imagens ficarão em `src/assets/reader-illustrations/` e serão carregadas por importação estática.
- Um pequeno módulo de metadados controlará capítulo, posição após parágrafo, legenda e `alt` por `slug`.
- A figura será inserida durante o `map` dos parágrafos, sem adicionar elementos com `data-paragraph` e sem mudar os índices usados pelas marcações.
