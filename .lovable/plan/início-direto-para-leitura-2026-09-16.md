# Início direto para leitura

## Objetivo
Simplificar a página inicial para apresentar a biblioteca, o apoio via PIX e todos os livros imediatamente, sem navegação de conta.

## Alterações
- Remover o cabeçalho da página inicial, incluindo menu, abas e acesso à conta.
- Enxugar a apresentação para um título e uma descrição direta do acervo gratuito.
- Colocar o card de apoio via PIX em posição de destaque, com os dados existentes e cópia em um clique.
- Exibir todos os livros na própria página inicial, com capa maior, título em evidência e botão principal “LER AGORA” apontando diretamente ao leitor.
- Retirar da página inicial favoritos, estante, progresso, estatísticas e chamadas de cadastro/login.
- Manter as demais páginas existentes intactas; apenas o início deixará de usar o cabeçalho compartilhado.

## Validação
- Conferir a página inicial em computador e celular.
- Confirmar que cada botão “LER AGORA” abre o livro correspondente.
- Confirmar a cópia da chave PIX e a ausência de menções a conta/login no início.
- Verificar que o aplicativo continua sem erros.

## Detalhes técnicos
A listagem continuará usando os dados atuais do acervo e as capas já geradas. O início terá sua própria estrutura sem o `SiteHeader`, enquanto outras páginas conservarão o cabeçalho atual para evitar alterações além do escopo solicitado.
