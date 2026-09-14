# Capas temáticas e apoio via PIX

## Resultado

- Cada um dos 9 livros terá uma capa ilustrada exclusiva, de alta qualidade e coerente com seu tema histórico ou espiritual.
- As novas capas aparecerão no catálogo, destaques, estante, card de leitura atual e página de detalhes.
- O cabeçalho terá uma ação “Apoiar via PIX” tanto no computador quanto no menu do celular.
- A janela de apoio exibirá a chave celular `11971616496` e o nome `Wagner S. Apolinário`, com cópia em um clique e confirmação visual.

## Direção visual

- Ilustrações verticais com linguagem editorial cinematográfica, inspiradas em manuscritos antigos, gravura e pintura histórica.
- Composição, símbolos e paleta específicos para cada obra, mantendo unidade com a interface escura carmim e ouro.
- Capas sem textos gerados na imagem; os títulos continuam legíveis e controlados pela interface.
- Recorte estável e adaptação cuidadosa para cards pequenos, destaque grande e celular.

## Implementação

1. Gerar nove imagens verticais e armazená-las junto aos recursos do aplicativo.
2. Criar um catálogo interno que associe cada livro à sua capa e texto alternativo.
3. Atualizar o componente de capa e todos os pontos em que ele é usado, preservando o fallback visual atual.
4. Criar uma janela de apoio via PIX reutilizável com dados, botão de copiar, ícone e toast de sucesso/erro.
5. Inserir o acionador no menu principal e no menu mobile, fechando o menu mobile ao abrir a janela.
6. Validar visualmente catálogo, detalhe, estante e navegação em desktop e celular, além de conferir o build.

## Fora do escopo

- Não será criado pagamento, cobrança automática ou QR Code; o apoio será feito pela cópia da chave informada.
- Nenhum dado de leitura, catálogo ou conta será alterado.
