# GOAL 02.1 — Baseline

Fonte: commit a63b9f6. Inspeção de componentes, rotas, coleções JSON, CSS, scripts, workflows e documentação. Nenhum arquivo preexistente foi alterado na coleta. O PDF não versionado na raiz é uma impressão do próprio site e foi preservado; não é currículo autorizado.

- Tipos e lint: aprovados. Testes existentes: 18/18.
- Screenshots novos: `artifacts/goal02/before/home-{360,390,768,1024,1440,1920}-{dark,light}.png`.
- PDF reproduzido: `artifacts/goal02/before/print.pdf`.
- Métricas de layout: baseline-layout.json. A hero mede aproximadamente 794px a 1440px e 1285px a 390px; projetos começam depois de 882px e 1358px, respectivamente, na coleta de 1000px de altura.
- Lighthouse atual: quatro rotas com 100 nas quatro categorias, em loopback. Resumo em baseline-lighthouse.json; relatórios completos em artifacts/lighthouse antes da implementação. Valores de laboratório, sem métricas de campo.

## Problemas confirmados

1. h1 destaca slogan, enquanto o nome tem tamanho de texto comum.
2. Ausência de disponibilidade no primeiro bloco; especialidades em inglês na página portuguesa.
3. Hero e diagrama adiam o acesso aos projetos.
4. Avisos editoriais públicos sobre confirmação e conteúdo futuro.
5. Títulos criativos dificultam identificar o tipo de sistema.
6. Predominância de desenhos conceituais e fontes pouco destacadas nos cards.
7. Vue aparece classificado como infraestrutura; links de competências são genéricos.
8. Estudos não possuem instruções de execução estruturadas nem evidências próximas da implementação.
9. Não há laboratório funcional, JSON-LD ou estilos de impressão.
10. O PDF fornecido mostra o skip link impresso sobre o conteúdo.
11. A configuração de testes pode reutilizar o dev server na porta 4321, o que enfraquece a validação da CSP de produção.
12. A coleta após screenshot registrou overflow transitório a 390px; a inspeção direta dos elementos não o reproduziu. Os novos testes devem aguardar fontes e hidratação antes de medir.

A cor acinzentada do botão não se reproduziu no navegador: o estilo calculado é azul nos dois temas. O ajuste será tornar o estilo primário explícito e impedir perda de contraste na impressão.

## Critérios de aceitação das próximas etapas

02.2: nome no h1, especialidades, disponibilidade, hero menor e ações somente autorizadas.
02.3: títulos descritivos, projetos de engenharia primeiro, filtros derivados do conteúdo publicado.
02.4: fontes imutáveis, evidências identificadas, contribuição sem autoria exclusiva inventada e execução documentada.
02.5: seis larguras, dois temas, teclado, axe e impressão sem navegação sobreposta.
02.6: A* funcional local, editável por teclado, com estados, velocidade e resultados reais; demais experimentos apenas no roadmap.
02.7: interface e demonstração bilíngues, SEO válido, JSON-LD factual e Lighthouse comparável.
02.8: documentação solicitada, validação completa, commits pequenos e push sem force.
