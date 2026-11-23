// =====================================================================
// app.js — Liga a tela à consulta (T10)
// Lê o formulário, chama consultar() e mostra o resultado na tela.
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

// RF01: lista de bairros vinda de dados.js.
function preencherBairros() {
  for (const bairro of BAIRROS) {
    campoBairro.append(new Option(bairro.nome, bairro.nome));
  }
}

// RF02: dia e horário vêm do relógio do aparelho, mas podem ser mudados.
function preencherDiaEHorario() {
  NOMES_DOS_DIAS.forEach((nome, numero) => campoDia.append(new Option(nome, numero)));
  const agora = new Date();
  campoDia.value = agora.getDay();
  const hh = String(agora.getHours()).padStart(2, "0");
  const mm = String(agora.getMinutes()).padStart(2, "0");
  campoHorario.value = `${hh}:${mm}`;
}

// Um bloco "rótulo + valor" (ex.: Linha corujão / CJ-01 ...).
function bloco(rotulo, valor) {
  const item = criar("div");
  item.append(criar("dt", null, rotulo), criar("dd", null, valor));
  return item;
}

function cartaoDaRota(passos) {
  const cartao = criar("div", "cartao rota resultado-entrando");
  cartao.append(criar("h2", null, "Rota luminosa até o ponto"));
  const lista = criar("ol");
  for (const passo of passos) lista.append(criar("li", null, passo));
  cartao.append(lista);
  return cartao;
}

function mostrarResultado(r) {
  areaResultado.replaceChildren();

  // Entrada inválida (RN03).
  if (r.tipo === "erro") {
    const cartao = criar("div", "cartao erro resultado-entrando");
    cartao.append(criar("p", null, r.mensagem));
    areaResultado.append(cartao);
    return;
  }

  const cartao = criar("div", "cartao resultado-entrando");
  const ativo = r.status === "Ativo";
  cartao.append(criar("span", ativo ? "status ativo" : "status inativo", `Ponto Seguro: ${r.status}`));

  if (r.tipo === "inativo") {
    // RN02: sem baia e sem horário de corujão.
    cartao.append(criar("p", "mensagem-forte", r.mensagem));
    cartao.append(criar("p", "mensagem", r.opcoes));
  }

  if (r.tipo === "corujao") {
    // RN04: próximo horário, linha e baia.
    cartao.append(criar("p", "destaque", "Próximo ônibus"));
    cartao.append(criar("p", "horario-grande", r.proximaSaida));
    const dados = criar("dl", "dados");
    dados.append(bloco("Linha corujão", r.linha), bloco("Onde embarcar", r.baia));
    cartao.append(dados);
  }

  if (r.tipo === "app") {
    // RN05: alternativa por aplicativo.
    cartao.append(criar("p", "mensagem-forte", r.motivo));
    const dados = criar("dl", "dados");
    dados.append(bloco("Alternativa", "Pedir carro por aplicativo"), bloco("Onde embarcar", r.local));
    cartao.append(dados);
  }

  // RNF05: aviso de dados simulados em todo resultado.
  cartao.append(criar("p", "aviso-simulado", "Dados simulados: confirme horários na fonte oficial."));
  areaResultado.append(cartao);

  // RN06: rota luminosa quando o ponto está ativo.
  if (r.rota) areaResultado.append(cartaoDaRota(r.rota));
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const resultado = consultar(campoBairro.value, Number(campoDia.value), campoHorario.value);
  mostrarResultado(resultado);
});

preencherBairros();
preencherDiaEHorario();
