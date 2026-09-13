# Calibrar estados interativos do leitor

## Objetivo
Tornar hover, foco por teclado e seleção ativa inequívocos e confortáveis nos temas Escuro, Sépia e Claro, sem alterar o fluxo do leitor.

## Alterações
- Definir, em cada tema do leitor, cores semânticas próprias para destaque, texto sobre destaque e anel de foco, preservando contraste sem brilho excessivo.
- Padronizar os botões da barra superior, do menu de ajustes e das ações do leitor com hover visível, texto estável e `focus-visible` de 2 px com afastamento do fundo.
- Reforçar as opções selecionáveis de tema, tipografia, largura e alinhamento com preenchimento, borda e indicador visual persistente; manter `aria-pressed`.
- Ajustar os botões de incremento/decremento e o gatilho de Ajustes para os mesmos estados acessíveis.
- Refinar os sliders: trilho inativo mais perceptível, faixa ativa contrastante, thumb maior com borda e anel de foco por teclado.
- Manter tooltips temáticos com fundo, borda e texto legíveis, além de espaçamento consistente.
- Aplicar o mesmo padrão aos seletores de tipo de destaque e itens do sumário dentro do leitor.

## Validação
- Verificar navegação por teclado, foco visível, hover e seleção nos três temas.
- Conferir o menu de ajustes em desktop e celular, sem cortes ou sobreposição.
- Confirmar ausência de erros e funcionamento das rotas do leitor.

## Detalhes técnicos
As mudanças ficarão restritas à apresentação do leitor, aos tokens dos temas e ao componente compartilhado de slider; não haverá alteração de dados, progresso ou anotações.
