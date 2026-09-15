# Apoio via PIX na autenticação

## Implementação
- Reaproveitar os dados e a lógica de cópia do PIX já usados no menu.
- Criar uma apresentação em card, com chave, nome, botão de copiar e estado confirmado.
- Exibir o card abaixo do formulário de login/cadastro, mantendo a adaptação ao celular.
- Validar visualmente os modos “Entrar” e “Criar conta”, a cópia e o build.

## Detalhes técnicos
- Manter uma única fonte para a chave e a função de cópia, evitando divergência entre menu e autenticação.
- Usar os componentes e tokens visuais existentes, com feedback via toast e ícone.
