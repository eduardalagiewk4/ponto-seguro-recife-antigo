// =====================================================================
// testes.js — Testes reproduzíveis dos critérios de aceitação (T11)
//
// Cada caso tem: entrada (bairro, dia, horário), resultado ESPERADO
// (escrito antes, na entrega 1) e resultado OBSERVADO (o que a função
// consultar() devolve agora). Se forem iguais, o teste passa.
// Dias: 4 = quinta, 5 = sexta, 6 = sábado.
// =====================================================================

const CASOS = [
  { id: "CA02", descricao: "Fluxo principal", bairro: "Boa Viagem", dia: 5, horario: "23:10",
    esperado: "Ativo · CJ-01 · 23h40 · Baia 1 · com rota" },
  { id: "CA03", descricao: "Início da janela (22h00)", bairro: "Casa Amarela", dia: 5, horario: "22:00",
    esperado: "Ativo · CJ-02 · 22h30 · Baia 2 · com rota" },
  { id: "CA04", descricao: "Horário igual a uma saída", bairro: "Boa Viagem", dia: 6, horario: "23:00",
    esperado: "Ativo · CJ-01 · 23h00 · Baia 1 · com rota" },
  { id: "CA05", descricao: "Saída depois da meia-noite", bairro: "Boa Viagem", dia: 6, horario: "23:45",
    esperado: "Ativo · CJ-01 · 00h20 · Baia 1 · com rota" },
  { id: "CA06", descricao: "Bairro sem corujão direto", bairro: "Madalena", dia: 5, horario: "23:00",
    esperado: "Ativo · aplicativo · com rota" },
  { id: "CA07", descricao: "Sem mais saídas na noite", bairro: "Olinda", dia: 6, horario: "23:55",
    esperado: "Ativo · aplicativo · com rota" },
  { id: "CA08", descricao: "Fora da janela (quinta)", bairro: "Boa Viagem", dia: 4, horario: "23:00",
    esperado: "Inativo · opções regulares" },
  { id: "CA09", descricao: "Um minuto antes da janela", bairro: "Boa Viagem", dia: 5, horario: "21:59",
    esperado: "Inativo · opções regulares" },
  { id: "CA10", descricao: "Consulta sem destino", bairro: "", dia: 5, horario: "23:00",
    esperado: "Erro: Escolha um bairro de destino." },
  { id: "EX01", descricao: "Exceção: horário inválido", bairro: "Boa Viagem", dia: 5, horario: "25:00",
    esperado: "Erro: Informe um horário válido, por exemplo 23:10." },
];

// Transforma o resultado de consultar() num texto curto, para comparar
// com o esperado.
function resumir(r) {
  if (r.tipo === "erro") return `Erro: ${r.mensagem}`;
  if (r.tipo === "inativo") return "Inativo · opções regulares";
  const rota = r.rota ? " · com rota" : "";
  if (r.tipo === "app") return `Ativo · aplicativo${rota}`;
  const codigoDaLinha = r.linha.split(" ")[0];
  return `Ativo · ${codigoDaLinha} · ${r.proximaSaida} · ${r.baia}${rota}`;
}

// CA01 é diferente: confere a lista de bairros cadastrados.
function testarCA01() {
  const esperado = "Boa Viagem, Casa Amarela, Afogados, Olinda, Madalena, Várzea";
  const observado = BAIRROS.map((b) => b.nome).join(", ");
  return { id: "CA01", descricao: "Lista de bairros", entrada: "Abrir a lista de destinos",
    esperado, observado, passou: esperado === observado };
}

function rodarTestes() {
  const resultados = [testarCA01()];
  for (const caso of CASOS) {
    const observado = resumir(consultar(caso.bairro, caso.dia, caso.horario));
    resultados.push({
      id: caso.id,
      descricao: caso.descricao,
      entrada: `${caso.bairro || "(sem bairro)"} · ${NOMES_DOS_DIAS[caso.dia]} · ${caso.horario}`,
      esperado: caso.esperado,
      observado,
      passou: observado === caso.esperado,
    });
  }
  return resultados;
}

// Mostra os resultados na página testes.html.
function mostrarTestes() {
  const resultados = rodarTestes();
  const corpo = document.getElementById("corpo-testes");
  for (const t of resultados) {
    const linha = document.createElement("tr");
    for (const valor of [t.id, t.descricao, t.entrada, t.esperado, t.observado, t.passou ? "✅ Passou" : "❌ Falhou"]) {
      const celula = document.createElement("td");
      celula.textContent = valor;
      linha.append(celula);
    }
    if (!t.passou) linha.className = "falhou";
    corpo.append(linha);
  }
  const passaram = resultados.filter((t) => t.passou).length;
  document.getElementById("placar").textContent =
    `${passaram} de ${resultados.length} testes passaram.`;
}

if (typeof document !== "undefined") mostrarTestes();
