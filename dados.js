// =====================================================================
// dados.js — Base de transporte do Ponto Seguro (T06)
//
// ATENÇÃO: DADOS SIMULADOS. As linhas, os horários e as baias abaixo
// foram criados pela equipe para planejar e testar a v0.1. Não são
// horários oficiais: precisam ser confirmados com o Grande Recife
// Consórcio / CTM e com a CTTU antes de qualquer uso real.
// =====================================================================

// Bairros de destino atendidos na v0.1 (RF01, RN03).
// - linha: nome da linha corujão, ou null quando não há corujão direto (RN05)
// - saidas: horários de saída em ordem, na noite de sexta ou sábado
// - baia: local de embarque no Ponto Seguro
const BAIRROS = [
  {
    nome: "Boa Viagem",
    linha: "CJ-01 Recife Antigo / Boa Viagem",
    saidas: ["22h20", "23h00", "23h40", "00h20"],
    baia: "Baia 1",
  },
  {
    nome: "Casa Amarela",
    linha: "CJ-02 Recife Antigo / Casa Amarela",
    saidas: ["22h30", "23h30", "00h30"],
    baia: "Baia 2",
  },
  {
    nome: "Afogados",
    linha: "CJ-03 Recife Antigo / Afogados",
    saidas: ["22h15", "23h15", "00h15"],
    baia: "Baia 1",
  },
  {
    nome: "Olinda",
    linha: "CJ-04 Recife Antigo / Olinda",
    saidas: ["22h40", "23h50"],
    baia: "Baia 3",
  },
  { nome: "Madalena", linha: null, saidas: [], baia: null },
  { nome: "Várzea", linha: null, saidas: [], baia: null },
];

// Local de embarque por aplicativo (RN05). Simulado: validar com a CTTU.
const AREA_APP =
  "Área de embarque por app, em frente ao Terminal de Passageiros, ao lado do Ponto Seguro.";

// Guia de rota luminosa do Polo da Alfândega até o ponto (RN06).
// Texto provisório, a validar em campo.
const ROTA_LUMINOSA = [
  "Saia do Polo da Alfândega em direção à Av. Alfredo Lisboa.",
  "Siga pela calçada do lado dos armazéns, o trecho mais iluminado.",
  "O Ponto Seguro fica entre o Paço do Frevo e o Terminal de Passageiros, sinalizado com luz e cartaz.",
  "Se precisar, fale com um(a) orientador(a) de colete.",
];

// Orientação quando o ponto está inativo (RN02).
const OPCOES_REGULARES =
  "Consulte as linhas regulares no site ou no app do Grande Recife Consórcio, ou use um aplicativo de transporte.";
