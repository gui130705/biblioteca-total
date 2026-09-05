# Catálogo gratuito em lista

## Objetivo
Transformar as vitrines de livros em listas horizontais responsivas e substituir toda a jornada de compra por acesso gratuito.

## Alterações
- Redesenhar o card de livro com capa à esquerda e conteúdo/ações à direita, empilhando de forma legível em telas estreitas.
- Aplicar a lista horizontal no catálogo, destaques da página inicial e favoritos.
- Exibir “Grátis” em vez de preços e trocar ações de compra por “Ler agora” ou “Adicionar à biblioteca”.
- Atualizar a página de detalhes, o antigo carrinho, a área do leitor, cabeçalho, rodapé e mensagens para remover referências a cobrança, checkout e pedidos pagos.
- Manter favoritos e usar a lista local existente como “Minha biblioteca”, sem criar pagamentos ou novas tabelas.

## Validação
- Conferir as páginas principais em desktop e celular.
- Verificar interações de adicionar/remover da biblioteca e navegação para leitura.
- Confirmar typecheck e build aprovados, sem erros no navegador.

## Detalhes técnicos
A coluna de preço continuará existindo apenas como compatibilidade administrativa, mas os títulos atuais serão tratados como gratuitos na interface. A rota existente do carrinho será mantida para não quebrar links antigos, passando a representar a biblioteca do leitor.
