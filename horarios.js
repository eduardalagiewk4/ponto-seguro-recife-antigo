// =====================================================================
// horarios.js — Conversão de horários e próximo horário (T08, RN04)
// =====================================================================

// Converte o texto do campo de horário ("23:10") em minutos desde 00h00.
// Exemplo: "23:10" -> 23 * 60 + 10 = 1390.
// Retorna null quando o texto não é um horário válido.
function horarioParaMinutos(texto) {
  const partes = /^(\d{1,2}):(\d{2})$/.exec(String(texto).trim());
  if (!partes) return null;

  const horas = Number(partes[1]);
  const minutos = Number(partes[2]);
  if (horas > 23 || minutos > 59) return null;

  return horas * 60 + minutos;
}

// Converte uma saída da base ("23h40" ou "00h20") em minutos da noite.
// RN04: saídas entre 00h00 e 00h59 pertencem à MESMA noite, então
// somamos 24 horas para que fiquem depois de 23h59.
// Exemplo: "23h40" -> 1420 ; "00h20" -> 20 + 1440 = 1460.
function saidaParaMinutosDaNoite(saida) {
  const [horas, minutos] = saida.split("h").map(Number);
  const total = horas * 60 + minutos;
  return horas < 12 ? total + 24 * 60 : total;
}

// RN04: o próximo horário é a PRIMEIRA saída igual ou posterior ao
// horário da consulta. O próprio horário conta (por isso ">=").
// Retorna null quando não há mais saídas naquela noite.
function proximaSaida(saidas, minutosConsulta) {
  for (const saida of saidas) {
    if (saidaParaMinutosDaNoite(saida) >= minutosConsulta) {
      return saida;
    }
  }
  return null;
}
