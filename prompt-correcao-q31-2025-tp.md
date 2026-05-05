# PROMPT — Correção da Questão 31 | TED SBD 2025 Teórico-Prática

## CONTEXTO

Estou anexando o PDF oficial da prova TED SBD 2025 (arquivo: `TED-2025-TATULO.pdf`).

A questão 31 da seção Teórico-Prática está cadastrada incorretamente no banco de dados do app (`src/data/ted.ts`, id: `"ted-tp-2025-q31"`). Foram identificados dois erros em relação à prova original:

---

## ERRO 1 — Enunciado com vinheta clínica fabricada

### O que está no banco (ERRADO):
```
"Paciente do sexo masculino, 39 anos de idade, com lesões assintomáticas na perna esquerda há um ano. Analise as imagens a seguir. Considerando as imagens apresentadas, qual é o diagnóstico?"
```

### O que está na prova original (CORRETO):
```
"Analise as imagens a seguir. Considerando as imagens apresentadas, qual é o diagnóstico?"
```

A vinheta clínica ("Paciente do sexo masculino, 39 anos...") **não existe no enunciado original**. Foi inserida incorretamente no cadastro.

**Correção necessária em `src/data/ted.ts`**, campo `statement` da questão `ted-tp-2025-q31`:

```ts
statement: "Analise as imagens a seguir. Considerando as imagens apresentadas, qual é o diagnóstico?",
```

---

## ERRO 2 — Imagem f1 incorreta (clínica substituída por histológica)

### Estrutura de imagens atual no banco:
```ts
images: [
  { id: "f1", label: "Imagem clínica", type: "clinical", src: "/images/ted/tp/2025/ted2025_tp_q31_f1.jpg" },
  { id: "f2", label: "Histopatologia (HE)", type: "histopathology", src: "/images/ted/tp/2025/ted2025_tp_q31_f2.jpg" },
  { id: "f3", label: "Histopatologia (HE) - maior aumento", type: "histopathology", src: "/images/ted/tp/2025/ted2025_tp_q31_f3.jpg" },
]
```

### Estrutura correta segundo a prova original:
A questão 31 tem **3 imagens**:
- **f1** → Foto clínica da lesão cutânea (lesão ulcerada/infiltrada na perna) — `type: "clinical"`
- **f2** → Histopatologia HE menor aumento (infiltrado inflamatório granulomatoso) — `type: "histopathology"`
- **f3** → Histopatologia HE maior aumento (macrófagos com amastigotas intracitoplasmáticas) — `type: "histopathology"`

O arquivo `ted2025_tp_q31_f1.jpg` atualmente gravado em `public/images/ted/tp/2025/` contém uma imagem histológica, **não a foto clínica**. A foto clínica real está no PDF (página da questão 31).

### O que precisa ser feito:

1. **Extrair do PDF** a imagem clínica da questão 31 (a foto da lesão cutânea na perna, que aparece como a primeira das três imagens na questão)

2. **Salvar** o arquivo extraído como:
   ```
   public/images/ted/tp/2025/ted2025_tp_q31_f1.jpg
   ```
   Substituindo o arquivo incorreto atual.

3. Verificar se `ted2025_tp_q31_f2.jpg` e `ted2025_tp_q31_f3.jpg` correspondem corretamente às imagens histológicas da questão. Se estiverem invertidas ou incorretas, corrigir também.

> **Dica de extração**: A questão 31 fica na página 15 do PDF. As três imagens aparecem lado a lado na questão: primeiro a foto clínica da perna, depois dois cortes histopatológicos em HE.

---

## GABARITO OFICIAL (confirmado no PDF)

- **Resposta correta: D) Leishmaniose tegumentar**
- Campo `correctOption: "D"` — já está correto no banco, **não alterar**.

---

## RESUMO DAS ALTERAÇÕES

| Arquivo | O que mudar |
|---|---|
| `src/data/ted.ts` | Campo `statement` da questão `ted-tp-2025-q31`: remover a vinheta fabricada, deixar só o enunciado original |
| `public/images/ted/tp/2025/ted2025_tp_q31_f1.jpg` | Substituir pelo arquivo da foto clínica extraída do PDF (questão 31, primeira imagem) |

---

## VALIDAÇÃO ESPERADA

Após as correções:
1. `npm run build` sem erros de TypeScript
2. A questão 31 exibe o enunciado correto: *"Analise as imagens a seguir. Considerando as imagens apresentadas, qual é o diagnóstico?"*
3. A primeira imagem da questão mostra a **foto clínica da lesão na perna** (não histológica)
4. As imagens f2 e f3 exibem os cortes histopatológicos em HE (menor e maior aumento)
5. O gabarito permanece D) Leishmaniose tegumentar
