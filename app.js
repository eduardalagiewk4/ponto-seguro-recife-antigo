// =====================================================================
// app.js — Liga a tela às regras (T10)
// Não tem regra de negócio própria: usa BAIRROS (dados.js),
// pontoAtivo() (janela.js), proximaSaida() (horarios.js) e
// consultar() (consulta.js) e só mostra os resultados na tela.
// =====================================================================

const formulario = document.getElementById("formulario");
const campoBairro = document.getElementById("bairro");
const campoDia = document.getElementById("dia");
const campoHorario = document.getElementById("horario");
const areaResultado = document.getElementById("resultado");

// Cria um elemento com classe e texto (evita repetir código).
function criar(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto) elemento.textContent = texto;
  return elemento;
}

// Agora: dia da semana (0 = domingo) e minutos desde 00h00.
function agora() {
  const data = new Date();
  return { dia: data.getDay(), minutos: data.getHours() * 60 + data.getMinutes() };
}

// "Sexta-feira" -> "sexta" ; "Sábado" -> "sábado"
function diaCurto(numero) {
  return NOMES_DOS_DIAS[numero].split("-")[0].toLowerCase();
}

// ---------------------------------------------------------------------
// Status do ponto na abertura da página (usa a RN01 de janela.js)
// ---------------------------------------------------------------------
function proximaAbertura(dia, minutos) {
  const diaDeOperacao = dia === SEXTA || dia === SABADO;
  if (diaDeOperacao && minutos < INICIO_DA_JANELA) return "hoje às 22h";
  for (let passo = 1; passo <= 7; passo++) {
    const proximo = (dia + passo) % 7;
    if (proximo === SEXTA || proximo === SABADO) {
      return passo === 1 ? "amanhã às 22h" : `${diaCurto(proximo)} às 22h`;
    }
  }
  return "sexta às 22h";
}

function mostrarStatusDoPonto() {
  const { dia, minutos } = agora();
  const caixa = document.getElementById("status-ponto");
  const texto = document.getElementById("status-texto");
  if (pontoAtivo(dia, minutos)) {
    caixa.classList.add("ativo");
    texto.textContent = "Ponto ativo agora, até 00h";
  } else {
    caixa.classList.add("inativo");
    texto.textContent = `Ponto fechado agora · abre ${proximaAbertura(dia, minutos)}`;
  }
}

// ---------------------------------------------------------------------
// Painel de saídas: mostra o sistema funcionando logo na abertura.
// Com o ponto ativo, a próxima saída de cada linha (RN04).
// Com o ponto fechado, a primeira saída da próxima noite de operação.
// ---------------------------------------------------------------------
function mostrarPainel() {
  const { dia, minutos } = agora();
  const ativo = pontoAtivo(dia, minutos);
  document.getElementById("painel-quando").textContent = ativo
    ? "Agora"
    : `Primeiras saídas · ${proximaAbertura(dia, minutos).replace(" às 22h", "")}`;

  const corpo = document.getElementById("painel-linhas");
  for (const bairro of BAIRROS) {
    if (!bairro.linha) continue; // sem corujão: aparece na legenda do painel
    const saida = ativo ? proximaSaida(bairro.saidas, minutos) : bairro.saidas[0];
    const linha = document.createElement("tr");

    const celulaLinha = criar("td");
    celulaLinha.append(criar("span", "p-linha", bairro.linha.split(" ")[0]));
    const celulaHora = criar("td", saida ? "p-hora" : "p-hora encerrada", saida || "Encerrada");
    linha.append(
      celulaLinha,
      criar("td", "p-destino", bairro.nome),
      celulaHora,
      criar("td", "p-baia", bairro.baia.replace("Baia ", "")),
    );
    corpo.append(linha);
  }
}

// ---------------------------------------------------------------------
// Formulário de consulta
// ---------------------------------------------------------------------

// RF01: lista de bairros vinda de dados.js.
function preencherBairros() {
  for (const bairro of BAIRROS) {
    campoBairro.append(new Option(bairro.nome, bairro.nome));
  }
}

// RF02: dia e horário vêm do relógio do aparelho, mas podem ser mudados.
function preencherDiaEHorario() {
  NOMES_DOS_DIAS.forEach((nome, numero) => campoDia.append(new Option(nome, numero)));
  const data = new Date();
  campoDia.value = data.getDay();
  const hh = String(data.getHours()).padStart(2, "0");
  const mm = String(data.getMinutes()).padStart(2, "0");
  campoHorario.value = `${hh}:${mm}`;
}

// Um bloco "rótulo + valor" (ex.: Linha corujão / CJ-01 ...).
function bloco(rotulo, valor) {
  const item = criar("div");
  const dd = criar("dd");
  if (valor instanceof Node) dd.append(valor);
  else dd.textContent = valor;
  item.append(criar("dt", null, rotulo), dd);
  return item;
}

function cartaoDaRota(passos) {
  const cartao = criar("div", "rota entrando");
  cartao.append(criar("h3", null, "Rota luminosa até o ponto"));
  const lista = criar("ol");
  for (const passo of passos) lista.append(criar("li", null, passo));
  cartao.append(lista);
  return cartao;
}

function mostrarResultado(r, nomeDoBairro) {
  areaResultado.replaceChildren();

  // Entrada inválida (RN03).
  if (r.tipo === "erro") {
    const cartao = criar("div", "erro entrando");
    cartao.append(criar("p", null, r.mensagem));
    areaResultado.append(cartao);
    return;
  }

  const bilhete = criar("article", "bilhete entrando");
  const topo = criar("div", "bilhete-topo");
  const ativo = r.status === "Ativo";
  topo.append(
    criar("span", ativo ? "selo-status ativo" : "selo-status inativo", `Ponto Seguro: ${r.status}`),
    criar("p", "bilhete-destino", `Destino: ${nomeDoBairro}`),
  );
  const corpo = criar("div", "bilhete-corpo");

  if (r.tipo === "inativo") {
    // RN02: sem baia e sem horário de corujão.
    corpo.append(criar("p", "bilhete-mensagem", r.mensagem));
    corpo.append(criar("p", "bilhete-texto", r.opcoes));
  }

  if (r.tipo === "corujao") {
    // RN04: próximo horário, linha e baia.
    corpo.append(criar("p", "bilhete-rotulo", "Próximo ônibus"));
    corpo.append(criar("p", "bilhete-hora", r.proximaSaida));
    const dados = criar("dl", "bilhete-dados");
    dados.append(
      bloco("Linha corujão", r.linha),
      bloco("Onde embarcar", criar("span", "placa-baia", r.baia)),
    );
    corpo.append(dados);
  }

  if (r.tipo === "app") {
    // RN05: alternativa por aplicativo.
    corpo.append(criar("p", "bilhete-mensagem", r.motivo));
    const dados = criar("dl", "bilhete-dados");
    dados.append(bloco("Alternativa", "Pedir carro por aplicativo"), bloco("Onde embarcar", r.local));
    corpo.append(dados);
  }

  // RNF05: aviso de dados simulados em todo resultado.
  bilhete.append(topo, corpo, criar("p", "aviso-simulado", "Dados simulados: confirme os horários na fonte oficial."));
  areaResultado.append(bilhete);

  // RN06: rota luminosa quando o ponto está ativo.
  if (r.rota) areaResultado.append(cartaoDaRota(r.rota));
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const resultado = consultar(campoBairro.value, Number(campoDia.value), campoHorario.value);
  mostrarResultado(resultado, campoBairro.value);
  // No celular, leva a pessoa até o resultado.
  if (window.matchMedia("(max-width: 959px)").matches) {
    areaResultado.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

mostrarStatusDoPonto();
mostrarPainel();
preencherBairros();
preencherDiaEHorario();
