# Padrão visual — Tome nota

## Nome oficial

O nome deste recurso e de seu botão de acesso é **Tome nota**.

Não usar “Dicas que valem ouro” para nomear novas implementações desse padrão. Rotas antigas com `/dicas-que-valem-ouro/` podem permanecer temporariamente como compatibilidade técnica, mas não definem a nomenclatura apresentada ao usuário.

## Referências canônicas

### Botão de acesso

- Componente: `TomeNotaLink`, em `src/components/ResultCard.tsx`.
- Deve apresentar post-it amarelo com lâmpada, título manuscrito azul-marinho, traços e sublinhado vermelhos, fundo de papel pautado e ação “Abrir”.

### Páginas de conteúdo

- Rotas canônicas:
  - `/tome-nota/lupus-cutaneo`;
  - `/tome-nota/rosacea`;
  - `/tome-nota/dermatose-urticariforme-neutrofilica`;
  - `/tome-nota/vasculite-leucocitoclastica`;
  - `/tome-nota/dermatite-neutrofilica-granulomatosa-palicada`.
- A página de vasculite leucocitoclástica permanece como principal referência visual.
- Componente-base: `src/components/StudyNoteCard.tsx`.
- Ícones: `src/components/icons/SectionIcons.tsx`.

Novas páginas devem fornecer conteúdo ao `StudyNoteCard`. Não devem copiar sua estrutura visual para um novo componente, salvo quando houver uma necessidade comprovada que o componente não consiga representar.

## Linguagem visual

O padrão deve lembrar uma página de caderno de revisão feita à mão, com acabamento limpo e profissional:

- fundo em papel creme com linhas horizontais;
- encadernação espiral na lateral esquerda;
- tipografia manuscrita `Shantell Sans` no conteúdo didático;
- títulos em azul-marinho sobre marca-texto amarelo;
- post-it amarelo com lâmpada próximo ao cabeçalho;
- quatro blocos numerados e codificados por cor;
- termos essenciais destacados em amarelo;
- uma faixa de “Pérola” no rodapé;
- ornamentos discretos, como sublinhado irregular e brilhos.

O resultado deve ser lúdico e memorável, sem parecer infantil ou excessivamente decorado.

## Estrutura recomendada

1. Cabeçalho centralizado com “Tome nota!”, título e subtítulo curto.
2. Quatro seções numeradas em grade 2 × 2 no desktop.
3. Cada seção deve ter título curto, ícone e lista de pontos objetivos.
4. Nota complementar opcional.
5. Uma única “Pérola” com a mensagem diagnóstica mais importante.
6. Fonte bibliográfica curta no final.

No celular, a grade deve virar uma coluna sem rolagem horizontal.

## Densidade e conteúdo

- Priorize de 3 a 6 tópicos por seção.
- Use frases curtas e escaneáveis.
- Destaque apenas palavras ou expressões decisivas.
- Evite grandes áreas vazias dentro dos cartões.
- O título deve permanecer em uma linha quando houver largura suficiente.
- Em telas de notebook, o usuário deve enxergar o cabeçalho, a primeira linha completa de cartões e o começo da segunda linha sem precisar rolar.

## Cores semânticas

- Verde: conceito e definição.
- Azul: pistas clínicas e apresentação.
- Roxo: histopatologia e microscopia.
- Laranja: avaliação, causas, complicações ou manifestações sistêmicas.
- Amarelo: destaque de termos-chave.
- Rosa/vermelho: “Pérola”, traços e sublinhados.

As cores devem vir das variantes já definidas em `StudyNoteCard`, evitando valores novos em cada página.

## Reutilização no restante do site

Essa linguagem pode ser aplicada a outros resumos didáticos quando o conteúdo tiver caráter de revisão rápida. Elementos isolados — marca-texto, post-it, título manuscrito ou cartões numerados — podem ser reutilizados, desde que mantenham a mesma tipografia, paleta e proporções.

Não aplicar o estilo de caderno a fluxos operacionais, formulários, resultados de quiz ou navegação principal quando isso prejudicar clareza e consistência funcional.

## Checklist de entrega

- O acesso é apresentado ao usuário como “Tome nota”.
- O botão reutiliza `TomeNotaLink` ou um componente compartilhado derivado dele.
- A página usa `StudyNoteCard` ou estende o componente sem duplicá-lo.
- A ordem das seções segue uma narrativa diagnóstica clara.
- Desktop e celular foram verificados visualmente.
- O título não quebra desnecessariamente.
- Não há texto cortado, sobreposto ou com contraste insuficiente.
- `npm run build` termina com sucesso.
