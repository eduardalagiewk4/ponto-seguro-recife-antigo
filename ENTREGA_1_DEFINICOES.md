# Ponto Seguro Recife Antigo
## Documentação da entrega 1 da AV2 — definições e planejamento da v0.1

**Disciplina:** Fundamentos de Programação • ADM Tech — CESAR School
**Etapa de referência:** 17/11 — definições e planejamento (3,5 pontos)

> Os horários, as linhas e as baias usados neste documento são **dados simulados**, criados pela equipe para planejar e testar a v0.1. Eles precisam ser confirmados com fontes oficiais (Grande Recife Consórcio / CTM e CTTU) antes de qualquer uso real.

### Identificação do grupo

| Campo | Preenchimento |
|---|---|
| Projeto e equipe | Ponto Seguro Recife Antigo — Squad Vaga-lumes Figitais (Grupo 6) |
| Lente | Lente 6 — Noite Segura, Cidade Viva · Tensão T1: atratividade da vida noturna × dispersão insegura |
| Turma e docente | ADM Tech, José Adeilmo Nunes Barbosa Junior |
| Versão e data | Planejamento da v0.1, 16/11/2026 |
| Repositório | https://github.com/eduardalagiewk4/ponto-seguro-recife-antigo |

Integrantes: Ana Luísa Mendonça dos Anjos Raposo · Eduarda Stalliviere Lagiewka Martins · Guilherme Monteiro Saldanha · João Pedro Bandeira de Souza · Maria Luísa Ramos Gomes Barros. Os usuários do GitHub estão na seção 9.

---

## 1 Visão geral do projeto

**Contexto e problema.** Quando bares e eventos do Bairro do Recife fecham, o público se espalha pela Av. Alfredo Lisboa, num trecho com iluminação fraca e paradas sem informação. O problema não é chegar ao Recife Antigo, e sim **sair dele com previsibilidade**. Na pesquisa de campo (observação de 21/08/2026 e conversas de 22/08/2026), as pessoas resolviam a volta sozinhas, com estratégias defensivas: chamada de vídeo, grupo compacto e corrida por aplicativo de cerca de 250 m pedida por medo. Há pouca informação sobre quais linhas noturnas (corujões) passam, em que horário e onde embarcar.

**Proposta figital.** No projeto de Empreendedorismo (Artefato III), a equipe propôs um **ponto de espera e embarque** iluminado, sinalizado e com orientadores. O software desta disciplina é a parte digital: organiza a informação de transporte e orienta a pessoa até o ponto físico.

**Usuário principal.** Frequentador(a) ou trabalhador(a) da vida noturna do Bairro do Recife que vai voltar para casa e consulta o sistema pelo celular.
**Usuário secundário (fora da v0.1).** Orientador(a) do ponto, que registra o tipo de transporte escolhido para contagem estatística.

**Objetivo.** A partir do bairro de destino e do horário, informar se o Ponto Seguro está funcionando, qual linha corujão serve, o próximo horário de saída e a baia de embarque. Quando não houver corujão, indicar a alternativa por aplicativo. Mostrar também como chegar ao ponto pela rota iluminada.

**Recorte.** Um ponto seguro na Av. Alfredo Lisboa, entre o Paço do Frevo e o Terminal de Passageiros, funcionando **sextas e sábados, das 22h às 00h**. A v0.1 atende uma consulta por vez, com uma lista fixa de seis bairros de destino e horários simulados.

## 2 História de usuário e esclarecimentos

**História de usuário.** Como frequentador(a) da noite no Recife Antigo, quero informar o bairro para onde vou e ver a linha, o próximo horário e o local de embarque, para voltar para casa com previsibilidade sem precisar improvisar.

| Pergunta de esclarecimento | Resposta | Origem |
|---|---|---|
| Quem usa a solução? | A pessoa que vai voltar para casa, pelo celular. O orientador entra numa versão futura. | Artefato III (pesquisa de campo) |
| Em que horário o ponto funciona? | Sexta e sábado, das 22h00 às 23h59. A partir de 00h00 o ponto já está inativo. | Decisão do grupo, a partir do Artefato II |
| As linhas e os horários são reais? | Não. Na v0.1 são simulados e identificados como tal. | Decisão do grupo; validação com o Grande Recife Consórcio pendente |
| Uma saída às 00h20 conta como "próximo horário" para quem consulta às 23h45? | Sim. Saídas depois da meia-noite pertencem à mesma noite de operação. | Decisão do grupo |
| Onde fica o embarque por aplicativo? | Numa área junto ao ponto, em frente ao Terminal de Passageiros (simulada). | Pendente: validar com a CTTU |
| O sistema guarda dados pessoais? | Não. Segurança por presença, não por vigilância. | Artefato III (Pilar 3) |

## 3 Requisitos funcionais

| ID | Comportamento esperado | Entrada e saída | Regras | Prioridade |
|---|---|---|---|---|
| RF01 | Exibir os bairros de destino disponíveis. | **Entrada:** abertura da consulta<br>**Saída:** lista dos 6 bairros cadastrados | RN03 | Essencial |
| RF02 | Definir o dia e o horário da consulta: usa o relógio do aparelho e permite ajustar para teste. | **Entrada:** dia da semana e horário<br>**Saída:** dia e horário usados, mostrados na tela | RN01 | Essencial |
| RF03 | Exibir o status do Ponto Seguro. | **Entrada:** dia e horário<br>**Saída:** "Ativo" ou "Inativo", com mensagem | RN01, RN02 | Essencial |
| RF04 | Consultar o transporte por bairro de destino. | **Entrada:** bairro, dia e horário<br>**Saída:** linha corujão, próximo horário e baia | RN03, RN04 | Essencial |
| RF05 | Indicar a alternativa por aplicativo quando não houver corujão. | **Entrada:** bairro sem linha direta ou sem saída restante na noite<br>**Saída:** orientação de embarque por app e local | RN05 | Essencial |
| RF06 | Exibir o guia de rota luminosa até o ponto. | **Entrada:** consulta com o ponto ativo<br>**Saída:** passos do Polo da Alfândega até o ponto | RN06 | Essencial |
| RF07 | Avisar quando a consulta é feita sem destino. | **Entrada:** consultar sem escolher bairro<br>**Saída:** mensagem de aviso; nenhum horário exibido | RN03 | Essencial |
| RF08 | Modo orientador: registrar o tipo de transporte escolhido e mostrar a contagem da noite. | **Entrada:** senha do orientador e tipo (corujão, app, outro)<br>**Saída:** registro e contagem, ou acesso negado | RN07 | Fora da v0.1 (candidata à v0.2) |

## 4 Requisitos não funcionais

| ID | Condição exigida | Como conferir |
|---|---|---|
| RNF01 | Textos, orientações e mensagens estão em português. | Percorrer o fluxo e ler os textos exibidos. |
| RNF02 | A página funciona no navegador do celular, sem rolagem horizontal. | Abrir no celular, ou no modo responsivo do navegador com 360 px de largura. |
| RNF03 | Status, linha, próximo horário e baia (ou a alternativa por app) aparecem juntos, na mesma tela. | Fazer uma consulta e localizar todas as informações sem mudar de página. |
| RNF04 | Horários aparecem no formato 24h, como 23h40 e 00h20. | Conferir os horários no resultado. |
| RNF05 | A tela de resultado mostra o aviso "dados simulados". | Fazer uma consulta e localizar o aviso. |
| RNF06 | O sistema não pede nem guarda nome, telefone ou localização do usuário. | Percorrer o fluxo e verificar que não existe campo de dado pessoal. |
| RNF07 | O avaliador acessa o fluxo de graça, pelo link publicado ou abrindo o `index.html`. | Abrir o link do GitHub Pages num navegador comum e percorrer o fluxo. |

## 5 Regras de negócio e dados

### Base de transporte de referência (DADOS SIMULADOS)

Linhas, horários e baias fictícios, criados pela equipe para os cenários de teste. As saídas valem para sextas e sábados à noite.

| Bairro de destino | Linha corujão (simulada) | Saídas previstas | Baia |
|---|---|---|---|
| Boa Viagem | CJ-01 Recife Antigo / Boa Viagem | 22h20, 23h00, 23h40, 00h20 | Baia 1 |
| Casa Amarela | CJ-02 Recife Antigo / Casa Amarela | 22h30, 23h30, 00h30 | Baia 2 |
| Afogados | CJ-03 Recife Antigo / Afogados | 22h15, 23h15, 00h15 | Baia 1 |
| Olinda | CJ-04 Recife Antigo / Olinda | 22h40, 23h50 | Baia 3 |
| Madalena | Sem corujão direto | — | Embarque por app |
| Várzea | Sem corujão direto | — | Embarque por app |

**Área de embarque por app (simulada):** em frente ao Terminal de Passageiros, ao lado do Ponto Seguro. Precisa ser validada com a CTTU.

**Rota luminosa (texto provisório, a validar em campo):**
1. Saia do Polo da Alfândega em direção à Av. Alfredo Lisboa.
2. Siga pela calçada do lado dos armazéns, o trecho mais iluminado.
3. O Ponto Seguro fica entre o Paço do Frevo e o Terminal de Passageiros, sinalizado com luz e cartaz.
4. Se precisar, fale com um(a) orientador(a) de colete.

### Regras aplicadas à consulta

| ID | Regra | Origem |
|---|---|---|
| RN01 | O ponto está **ativo** somente na sexta e no sábado, das **22h00 às 23h59**, incluindo 22h00. A partir de 00h00, e em qualquer outro dia ou horário, está **inativo**. | Proposta do Artefato II / decisão do grupo |
| RN02 | Fora da janela, a solução informa que o ponto presencial está inativo e mostra as opções regulares: linhas regulares no Grande Recife Consórcio ou aplicativo de transporte. Nesse caso **não** mostra baia nem horário de corujão. | Regra 01 da apresentação de 10/11 |
| RN03 | A consulta só é feita para um dos bairros cadastrados. Sem destino, a solução pede que o usuário escolha um bairro e não mostra horários. | Decisão do grupo |
| RN04 | O **próximo horário** é a primeira saída igual ou posterior ao horário da consulta (o próprio horário conta). Saídas entre 00h00 e 00h59 pertencem à mesma noite e vêm depois das 23h59. | Decisão do grupo |
| RN05 | Se o bairro não tem corujão direto, **ou** se não há mais saídas naquela noite depois do horário da consulta, a solução indica o embarque por aplicativo na área validada junto ao ponto. | Regra 02 da apresentação de 10/11 |
| RN06 | Com o ponto ativo, o resultado mostra o guia de rota luminosa do Polo da Alfândega até o ponto. | Função 03 da apresentação de 10/11 |
| RN07 | O registro de atendimento só é permitido depois da autenticação do perfil orientador. *(Planejada para depois da v0.1.)* | Regra 03 da apresentação de 10/11 |

### Relação entre o requisito e o critério

O RF04 pede que a solução informe o próximo horário. A RN04 define o que é "próximo": o próprio horário conta, e a meia-noite não encerra a noite. O CA04 testa uma consulta às 23h00 exatas (deve mostrar 23h00, não 23h40), e o CA05 testa uma consulta às 23h45 (deve mostrar 00h20).

## 6 Critérios de aceitação

Nesta etapa registramos o resultado **esperado**. Os resultados observados serão anotados na entrega da v0.1.

| ID | Dado | Quando | Então | RF e RN |
|---|---|---|---|---|
| CA01 | A consulta aberta. | O usuário abre a lista de destinos. | A solução lista os 6 bairros: Boa Viagem, Casa Amarela, Afogados, Olinda, Madalena e Várzea. | RF01 · RN03 |
| CA02 | Sexta-feira, 23h10. | O usuário consulta Boa Viagem. | Status **Ativo**; linha CJ-01; próximo horário **23h40**; **Baia 1**; rota luminosa exibida. | RF02–RF04, RF06 · RN01, RN04, RN06 |
| CA03 | Sexta-feira, **22h00** (início da janela). | O usuário consulta Casa Amarela. | Status **Ativo**; linha CJ-02; próximo horário **22h30**; **Baia 2**. | RF03, RF04 · RN01, RN04 |
| CA04 | Sábado, **23h00** (igual a uma saída). | O usuário consulta Boa Viagem. | Próximo horário **23h00**, não 23h40; Baia 1. | RF04 · RN04 |
| CA05 | Sábado, 23h45. | O usuário consulta Boa Viagem. | Próximo horário **00h20**; Baia 1. | RF04 · RN04 |
| CA06 | Sexta-feira, 23h00. | O usuário consulta Madalena. | Status Ativo; informa que **não há corujão direto** e indica o embarque por app na área junto ao ponto; rota luminosa exibida. | RF05, RF06 · RN05, RN06 |
| CA07 | Sábado, 23h55. | O usuário consulta Olinda. | Informa que **não há mais saídas** da CJ-04 nesta noite (a última foi 23h50) e indica o embarque por app. | RF05 · RN04, RN05 |
| CA08 | Quinta-feira, 23h00. | O usuário consulta Boa Viagem. | Status **Inativo**; mostra as opções regulares; **não** mostra baia nem horário de corujão. | RF03 · RN01, RN02 |
| CA09 | Sexta-feira, **21h59** (um minuto antes da janela). | O usuário consulta Boa Viagem. | Status **Inativo**, com a mesma resposta do CA08. | RF03 · RN01, RN02 |
| CA10 | Sexta-feira, 23h00. | O usuário consulta sem escolher bairro. | Mostra "Escolha um bairro de destino" e nenhum horário. | RF07 · RN03 |

### Conferência dos casos de limite

- **CA03 e CA09** testam as bordas da janela: 22h00 está dentro (ativo) e 21h59 está fora (inativo).
- **CA04:** as saídas da CJ-01 são 22h20, 23h00, 23h40 e 00h20. A primeira igual ou posterior a 23h00 é a própria 23h00.
- **CA05:** depois de 23h45, a próxima saída da noite é 00h20, porque a RN04 coloca 00h20 depois de 23h59.
- **CA07:** as saídas da CJ-04 são 22h40 e 23h50. Nenhuma é igual ou posterior a 23h55, então vale a RN05 (aplicativo).

## 7 Escopo e tecnologia da primeira versão

| Incluído na v0.1 | Fora da v0.1 |
|---|---|
| Lista fixa de 6 bairros com dados simulados. | Horários reais em tempo real, integração com API ou GPS. |
| Status do ponto pela janela de sexta e sábado, das 22h às 00h. | Modo orientador, com senha e registro (RF08, RN07): candidato à v0.2. |
| Consulta de linha, próximo horário e baia. | Mapa interativo. |
| Alternativa por app quando não há corujão. | Pedido de corrida dentro do sistema. |
| Guia textual de rota luminosa. | Cadastro de usuários e qualquer coleta de dado pessoal. |
| Aviso quando a consulta não tem destino. | Mais de um ponto seguro. |

### Fluxo principal planejado

1. O usuário abre a página no celular.
2. A solução mostra a data e o horário atuais, que podem ser ajustados para teste.
3. O usuário escolhe o bairro de destino e toca em "Consultar".
4. A solução verifica a janela (RN01) e mostra o status do ponto.
5. Se o ponto está ativo, mostra a linha, o próximo horário e a baia (RN04), ou a alternativa por app (RN05), e a rota luminosa (RN06).
6. Se o ponto está inativo, mostra as opções regulares (RN02).

**Tecnologia e ambiente.** HTML, CSS e JavaScript, executados no navegador e publicados no GitHub Pages. A base simulada fica num arquivo de dados local do projeto.

**Motivo da escolha.** O usuário consulta pelo celular na hora de ir embora. Um link aberto no navegador funciona sem instalar nada, de graça para o usuário e para o avaliador (RNF07). A lógica da v0.1 é toda de consulta e comparação de horários, e cabe no navegador sem servidor.

**Condição de sucesso do recorte:** percorrer o fluxo com um bairro e um horário e obter um resultado coerente com as regras, conferido pelos CA01 a CA10.

## 8 Backlog e responsabilidades

> **Proposta de divisão: confirmar com o grupo antes de enviar.** A pessoa responsável não precisa fazer tudo sozinha; o apoio e a revisão também ficam registrados.

| ID | Resultado esperado | Responsável | Apoio ou revisão | Previsão |
|---|---|---|---|---|
| T01 | Usuário, problema e recorte registrados (seções 1 e 2). | Eduarda | Maria Luísa | 16/11 |
| T02 | Requisitos funcionais e não funcionais coerentes (seções 3 e 4). | Maria Luísa | Ana Luísa | 16/11 |
| T03 | Regras e base simulada (seção 5). | Ana Luísa | Eduarda | 16/11 |
| T04 | Critérios de aceitação com os casos de limite conferidos (seção 6). | Ana Luísa | Maria Luísa | 16/11 |
| T05 | Escopo, tecnologia, repositório e acesso do docente (seções 7 e 8). | Eduarda | Maria Luísa | 16/11 |
| T06 | Arquivo de dados simulados (bairros, linhas, saídas, baias). | Ana Luísa | Maria Luísa | 23/11 |
| T07 | Regra da janela e status do ponto (RF02, RF03, RN01, RN02). | Eduarda | João Pedro | 23/11 |
| T08 | Consulta e cálculo do próximo horário (RF01, RF04, RF07, RN03, RN04). | Maria Luísa | Ana Luísa | 23/11 |
| T09 | Alternativa por app e rota luminosa (RF05, RF06, RN05, RN06). | Guilherme | Eduarda | 23/11 |
| T10 | Tela responsiva e publicação no GitHub Pages (RNF01 a RNF07). | João Pedro | Guilherme | 23/11 |
| T11 | Execução dos CA01 a CA10 e registro de esperado × observado. | Toda a equipe | Eduarda (coordenação) | 23/11 |

As tarefas T06 a T11 são o plano de implementação da v0.1.

## 9 Revisão e contribuições individuais

### Registro da revisão

Na revisão de 16/11, a divisão de tarefas da seção 8 foi ajustada: as tarefas de definição (T01 a T05) ficaram com Eduarda, Maria Luísa e Ana Luísa, que fizeram e revisaram esta entrega. Ana Luísa recalculou os casos de limite de horário (CA04, CA05 e CA07) e confirmou as bordas da RN01 (21h59 inativo, 22h00 ativo). Maria Luísa conferiu que cada RF da v0.1 tem pelo menos um critério de aceitação. Eduarda conferiu o recorte com o Dossiê e a apresentação de 10/11.


### Registro de uso de IA

A equipe usou o Claude para redigir a primeira versão deste documento, adaptando o modelo da cafeteria ao projeto a partir do Dossiê (Artefato III) e da apresentação de 10/11, e também como apoio para aprender o fluxo de commits no GitHub. A equipe revisou o conteúdo: aceitou a estrutura, as regras e os critérios de aceitação, e ajustou a divisão de tarefas da seção 8 para refletir quem participou desta entrega. Para verificar, Ana Luísa recalculou à mão os horários dos CA04, CA05 e CA07 com a tabela de saídas, Maria Luísa conferiu a ligação entre cada RF e os critérios de aceitação, e Eduarda conferiu o recorte com o Dossiê e a apresentação de 10/11.

### Evidências de autoria e coautoria

Cada integrante indica o que escreveu ou revisou, cita os IDs e descreve como conferiu. Colar ao menos uma URL completa de commit por pessoa.

| Integrante | Contribuição | Como conferiu | Commit |
|---|---|---|---|
| Ana Luísa Raposo<br>@almar-sys | Revisei as regras RN01 a RN07, a base simulada e os critérios CA01 a CA10. | Recalculei à mão o próximo horário dos CA04, CA05 e CA07 com a tabela de saídas e conferi os limites de 21h59 e 22h00 da RN01. | |
| Eduarda Stalliviere<br>@eduardalagiewk4 | Organizei o documento a partir do modelo e revisei as seções 1, 2 e 7 (usuário, recorte e escopo). | Conferi se o recorte bate com o Dossiê e a apresentação de 10/11. | |
| Guilherme Saldanha<br>@usuario | | | |
| João Pedro Souza<br>@usuario | | | |
| Maria Luísa Barros<br>@marialuisaram0s | Revisei os requisitos RF01 a RF08 e RNF01 a RNF07. | Conferi se cada RF da v0.1 tem pelo menos um critério de aceitação que o testa e se cada RNF tem forma de verificação. | |


## 10 Envio e avaliação

- **No repositório:** este documento, com as definições, o planejamento e as evidências.
- **No Classroom (até 16/11/2026, 23h59):** cada integrante envia o link do próprio commit, o que fez e como conferiu, mais o link deste documento e do repositório, com acesso do docente conferido.
- **Na apresentação de 17/11:** a equipe explica o recorte e a v0.1 planejada. Cada integrante explica uma decisão ligada ao usuário e um resultado esperado.

**Exemplo de fala individual.** "O ponto só aparece como ativo na sexta e no sábado, das 22h às 23h59, porque é quando o público se dispersa e os orientadores estão lá. No CA09, às 21h59 de sexta, espero ver o ponto inativo e as opções regulares, sem baia."

## 11 Checklist antes de enviar

- [ ] O usuário e o problema estão claros.
- [ ] O recorte é pequeno e viável.
- [ ] Os requisitos dizem o que a solução deve fazer.
- [ ] Os requisitos não funcionais têm uma forma de verificação.
- [ ] As regras não deixam dúvida sobre limites de horário.
- [ ] Os critérios têm situações e resultados esperados verificáveis.
- [ ] Está explícito o que entra e o que fica fora da v0.1.
- [ ] As tarefas têm responsáveis e previsão (divisão confirmada pelo grupo).
- [ ] Todos registraram contribuição na seção 9.
- [ ] O professor tem acesso de leitura ao repositório.
- [ ] Cada integrante enviou o próprio link no Classroom.
