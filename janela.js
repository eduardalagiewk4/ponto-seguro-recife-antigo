// =====================================================================
// janela.js — Janela operacional do Ponto Seguro (T07, RN01)
// =====================================================================

// Números dos dias da semana usados pelo JavaScript (0 = domingo).
const NOMES_DOS_DIAS = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];
const SEXTA = 5;
const SABADO = 6;

// Início da janela: 22h00, em minutos desde 00h00.
const INICIO_DA_JANELA = 22 * 60; // 1320

// RN01: o ponto está ATIVO somente na sexta e no sábado, das 22h00 às 23h59.
// - 22h00 está dentro (por isso ">=").
// - 00h00 vale 0 minutos, então já fica fora: o ponto está inativo.
function pontoAtivo(dia, minutos) {
  const diaDeOperacao = dia === SEXTA || dia === SABADO;
  const horarioDeOperacao = minutos >= INICIO_DA_JANELA;
  return diaDeOperacao && horarioDeOperacao;
}
