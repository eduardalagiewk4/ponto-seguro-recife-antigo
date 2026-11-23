# Ponto Seguro Recife Antigo
## Documentação da entrega 2 da AV2 — versão v0.1

**Disciplina:** Fundamentos de Programação • ADM Tech — CESAR School
**Etapa de referência:** 24/11 — v0.1 e oficina (2,5 pontos)
**Squad:** Vaga-lumes Figitais (Grupo 6) · Lente 6 — Noite Segura, Cidade Viva
**Definições de referência:** [Entrega 1 — Definições e planejamento](ENTREGA_1_DEFINICOES.md)

> As linhas, os horários e as baias usados na v0.1 são **dados simulados**, criados pela equipe (arquivo `dados.js`). Não são horários oficiais.

## 1 Versão e acesso

| Campo | Preenchimento |
|---|---|
| Versão | **v0.1**, identificada pela tag `v0.1` no repositório |
| Data | 23/11/2026 |
| Acesso publicado | https://eduardalagiewk4.github.io/ponto-seguro-recife-antigo/ |
| Testes automáticos | https://eduardalagiewk4.github.io/ponto-seguro-recife-antigo/testes.html |
| Tecnologia | HTML, CSS e JavaScript, executados no navegador; publicação no GitHub Pages |
| Dependências | Nenhuma. Basta um navegador comum. |

**Como executar sem internet:** baixar o repositório (**Code → Download ZIP**), descompactar e abrir `index.html` no navegador. Para os testes, abrir `testes.html`.

## 2 O que a v0.1 faz

Fluxo principal: o usuário escolhe o bairro de destino, confere o dia e o horário (que vêm do relógio do aparelho e podem ser ajustados para teste) e toca em **Consultar**. A solução mostra:

- **Ponto ativo, com corujão:** linha, próximo horário e baia, mais a rota luminosa até o ponto.
- **Ponto ativo, sem corujão** (bairro sem linha direta ou depois da última saída): indicação de embarque por aplicativo e local, mais a rota luminosa.
- **Ponto inativo** (fora de sexta e sábado, 22h00 às 23h59): aviso e opções regulares, sem baia nem horário de corujão.
- **Entrada inválida** (sem bairro ou horário inválido): mensagem pedindo a correção.

Requisitos atendidos: RF01 a RF07. O RF08 (modo orientador) continua fora da v0.1, como planejado.

## 3 Lógica: entrada → regra → saída

A função `consultar(bairro, dia, horario)`, em `consulta.js`, aplica as regras **nesta ordem**:

| Passo | Pergunta | Regra | Arquivo | Se sim → saída |
|---|---|---|---|---|
| 1 | Falta o bairro, ou o horário é inválido? | RN03 | `consulta.js`, `horarios.js` | Mensagem de erro |
| 2 | Está fora da janela de sexta e sábado, 22h00 às 23h59? | RN01, RN02 | `janela.js` | "Inativo" e opções regulares |
| 3 | O bairro não tem corujão direto? | RN05 | `consulta.js` | Aplicativo e rota |
| 4 | Não há mais saídas na noite depois do horário da consulta? | RN04, RN05 | `horarios.js` | Aplicativo e rota |
| 5 | Caso contrário | RN04, RN06 | `horarios.js` | Linha, próximo horário, baia e rota |

**Decisões lógicas principais:**
- **Janela (RN01):** `pontoAtivo()` em `janela.js` exige dia 5 (sexta) ou 6 (sábado) **e** minutos ≥ 1320 (22h00). Como 00h00 vale 0 minutos, a meia-noite já fica fora.
- **Próximo horário (RN04):** `proximaSaida()` em `horarios.js` devolve a primeira saída com minutos **≥** ao horário da consulta, então o próprio horário conta. Saídas antes do meio-dia (00h15, 00h20, 00h30) recebem +24h e ficam depois de 23h59.

## 4 Dados simulados

Todos em `dados.js`, com o aviso no início do arquivo e na tela de resultado (RNF05):
- 6 bairros: Boa Viagem, Casa Amarela, Afogados e Olinda (com corujão simulado); Madalena e Várzea (sem corujão direto).
- Linhas CJ-01 a CJ-04, saídas e baias inventadas.
- Local de embarque por app e texto da rota luminosa: provisórios, a validar com a CTTU e em campo.

## 5 Testes reproduzíveis

Os testes estão em `testes.js` e rodam ao abrir `testes.html`. Cada caso usa uma entrada fixa e compara o resultado **esperado** (definido na entrega 1) com o **observado** (o que `consultar()` devolve).

| ID | Cenário | Entrada (bairro · dia · horário) | Esperado | Observado | Resultado |
|---|---|---|---|---|---|
| CA01 | Lista de bairros | Abrir a lista de destinos | Boa Viagem, Casa Amarela, Afogados, Olinda, Madalena, Várzea | Boa Viagem, Casa Amarela, Afogados, Olinda, Madalena, Várzea | ✅ |
| **CA02** | **Fluxo principal** | Boa Viagem · sexta · 23:10 | Ativo · CJ-01 · 23h40 · Baia 1 · com rota | Ativo · CJ-01 · 23h40 · Baia 1 · com rota | ✅ |
| CA03 | Início da janela | Casa Amarela · sexta · 22:00 | Ativo · CJ-02 · 22h30 · Baia 2 · com rota | Ativo · CJ-02 · 22h30 · Baia 2 · com rota | ✅ |
| CA04 | Horário igual a uma saída | Boa Viagem · sábado · 23:00 | Ativo · CJ-01 · 23h00 · Baia 1 · com rota | Ativo · CJ-01 · 23h00 · Baia 1 · com rota | ✅ |
| CA05 | Saída depois da meia-noite | Boa Viagem · sábado · 23:45 | Ativo · CJ-01 · 00h20 · Baia 1 · com rota | Ativo · CJ-01 · 00h20 · Baia 1 · com rota | ✅ |
| CA06 | Sem corujão direto | Madalena · sexta · 23:00 | Ativo · aplicativo · com rota | Ativo · aplicativo · com rota | ✅ |
| CA07 | Sem mais saídas na noite | Olinda · sábado · 23:55 | Ativo · aplicativo · com rota | Ativo · aplicativo · com rota | ✅ |
| **CA08** | **Fora da janela (comportamento diferente)** | Boa Viagem · quinta · 23:00 | Inativo · opções regulares | Inativo · opções regulares | ✅ |
| CA09 | Um minuto antes da janela | Boa Viagem · sexta · 21:59 | Inativo · opções regulares | Inativo · opções regulares | ✅ |
| CA10 | Consulta sem destino | (sem bairro) · sexta · 23:00 | Erro: Escolha um bairro de destino. | Erro: Escolha um bairro de destino. | ✅ |
| EX01 | Exceção: horário inválido | Boa Viagem · sexta · 25:00 | Erro: Informe um horário válido, por exemplo 23:10. | Erro: Informe um horário válido, por exemplo 23:10. | ✅ |

**Placar:** 11 de 11 testes passaram.

- Os dois testes mínimos pedidos são o **CA02** (fluxo principal) e o **CA08** (condição com comportamento diferente).
- Execuções registradas: os resultados observados acima vieram da primeira execução, feita com apoio do Claude em 23/11. *(Preencher: quem reexecutou `testes.html` no navegador, em que data, e o placar observado.)*

**Teste manual na tela (para a demonstração):** em `index.html`, escolher Boa Viagem, Sábado, 23:45 e tocar em Consultar. Esperado: "Ponto Seguro: Ativo", próximo ônibus **00h20**, linha CJ-01, Baia 1 e a rota luminosa.

## 6 Organização do código e responsáveis

Guilherme e João Pedro não participaram das entregas até aqui. As tarefas da v0.1 que estavam com eles (T09 e T10) foram redistribuídas entre as três integrantes.

| Arquivo | O que faz | Regras | Responsável |
|---|---|---|---|
| `dados.js` | Base simulada: bairros, linhas, saídas, baias, rota e textos fixos | RN03, RN05, RN06 | Ana Luísa (T06) |
| `consulta.js` | Fluxo da consulta: valida a entrada e decide o tipo de resultado | RN02, RN03, RN05, RN06 | Ana Luísa (T09) |
| `horarios.js` | Converte horários e encontra o próximo horário | RN04 | Maria Luísa (T08) |
| `testes.html`, `testes.js` | Testes automáticos dos CA01 a CA10 e da exceção EX01 | Todas | Maria Luísa (T11) |
| `janela.js` | Decide se o ponto está ativo | RN01 | Eduarda (T07) |
| `index.html`, `estilo.css`, `app.js` | Tela responsiva e ligação da tela com a consulta | RNF01 a RNF07 | Eduarda (T10) |

## 7 Registro individual de contribuição técnica

Cada integrante indica o que fez (código, teste ou correção), o que revisou e como verificou. Colar a URL do commit no Classroom.

| Integrante | Contribuição técnica | O que revisou | Como verificou | Commit |
|---|---|---|---|---|
| Ana Luísa Raposo<br>@almar-sys | Subi dados.js (base simulada) e consulta.js (fluxo da consulta). | Conferi os dados de cada bairro com a tabela da entrega 1 e a ordem das regras em consultar(). | Previ e testei no site o CA06 (Madalena, sexta 23:00 → app) e o CA07 (Olinda, sábado 23:55 → app, sem mais saídas). | |
| Eduarda Stalliviere<br>@eduardalagiewk4 | | | | |
| Maria Luísa Barros<br>@marialuisaram0s | | | | |

## 8 Registro de uso de IA

*(Preencher: o código da v0.1 foi gerado com o Claude a partir das definições da entrega 1. Registrar o que a equipe aceitou, corrigiu ou descartou, e como testou. Por exemplo: quem rodou `testes.html`, quem fez o teste manual do CA05, se alguém mudou algum valor para ver o teste falhar.)*

## 9 Proposta de melhoria para a v0.2

*A confirmar após a devolutiva de 24/11.*

**Proposta principal: tempo de espera e sugestão de app quando a espera é longa.**
Além do próximo horário, a solução mostra quantos minutos faltam para o ônibus. Se a espera passar de 30 minutos, mostra também a opção de embarque por aplicativo.

- **Justificativa:** quem sai do bar quer decidir rápido entre esperar o corujão ou pedir um carro. Na pesquisa de campo, a espera no escuro é justamente o que leva às estratégias defensivas. Saber "faltam 35 minutos" ajuda nessa decisão.
- **Regra nova (RN08):** tempo de espera = próximo horário − horário da consulta, em minutos. Se for **maior que 30**, mostrar também a alternativa por app. Com exatamente 30, não mostrar.
- **Testes previstos:** sexta 23h10, Boa Viagem → espera de 30 min, sem sugestão de app (limite). Sábado 23h01, Boa Viagem → próximo 23h40, espera de 39 min, com sugestão de app.
- **Exceção:** a v0.2 mantém e reexecuta os testes de entrada inválida (CA10, EX01).

**Alternativa:** o modo orientador (RF08, RN07), com registro do tipo de transporte e senha. A senha incorreta seria o caso de exceção.
