@echo off
cd /d C:\Dev\DermpathNav
del .git\index.lock 2>nul
git add -A
git commit -m "fix(ted): corrige imagens e exclui questoes clinicas do scope Dermatopatologia 2025 TP

- Re-extrai e separa imagens de 16 questoes (Q02, Q03, Q06, Q08-10, Q13, Q16, Q21-24, Q27, Q29-30, Q34)
- Atualiza imageMode para 'multiple' em todas as questoes com histopatologia
- Adiciona QUESTION_TAXONOMY overrides excluindo 14 questoes clinicas/dermoscopicas
  do mini-simulado Dermatopatologia (Q04, Q05, Q07, Q11, Q12, Q14, Q15, Q26, Q32-33, Q35-38)
- Atualiza link de video comentado da Q03 (Siringoma condroide)"
git push
echo.
echo Concluido! Pressione qualquer tecla para fechar.
pause >nul
