// =====================================================================
// consulta.js — Fluxo principal da consulta (RN02, RN03, RN05, RN06)
//
// Liga ENTRADA (bairro, dia, horário) -> REGRAS -> SAÍDA (resultado).
// Usa os dados de dados.js e as funções de janela.js e horarios.js.
// =====================================================================

// Recebe o nome do bairro, o dia (0 = domingo ... 6 = sábado) e o
// horário ("23:10"). Devolve um objeto com o "tipo" do resultado:
//   "erro"     -> entrada inválida (RN03)
//   "inativo"  -> fora da janela (RN01, RN02)
//   "app"      -> sem corujão, indica aplicativo (RN05)
//   "corujao"  -> linha, próximo horário e baia (RN04)
function consultar(nomeDoBairro, dia, horario) {
  // 1. Validar a entrada (RN03).
  if (!nomeDoBairro) {
    return { tipo: "erro", mensagem: "Escolha um bairro de destino." };
  }
  const bairro = BAIRROS.find((b) => b.nome === nomeDoBairro);
  if (!bairro) {
    return { tipo: "erro", mensagem: "Bairro não cadastrado. Escolha um bairro da lista." };
  }
  if (!Number.isInteger(dia) || dia < 0 || dia > 6) {
    return { tipo: "erro", mensagem: "Escolha um dia da semana válido." };
  }
  const minutos = horarioParaMinutos(horario);
  if (minutos === null) {
    return { tipo: "erro", mensagem: "Informe um horário válido, por exemplo 23:10." };
  }

  // 2. O ponto está funcionando? (RN01) Se não, opções regulares (RN02).
  if (!pontoAtivo(dia, minutos)) {
    return {
      tipo: "inativo",
      status: "Inativo",
      mensagem: "O Ponto Seguro funciona só na sexta e no sábado, das 22h às 00h.",
      opcoes: OPCOES_REGULARES,
    };
  }

  // 3. Bairro sem corujão direto: indicar aplicativo (RN05) e a rota (RN06).
  if (!bairro.linha) {
    return {
      tipo: "app",
      status: "Ativo",
      motivo: `Não há corujão direto para ${bairro.nome}.`,
      local: AREA_APP,
      rota: ROTA_LUMINOSA,
    };
  }

  // 4. Procurar o próximo horário (RN04).
  const proxima = proximaSaida(bairro.saidas, minutos);

  // 5. Já passou a última saída da noite: indicar aplicativo (RN05).
  if (proxima === null) {
    const ultima = bairro.saidas[bairro.saidas.length - 1];
    return {
      tipo: "app",
      status: "Ativo",
      motivo: `Não há mais saídas da linha ${bairro.linha} nesta noite (a última foi às ${ultima}).`,
      local: AREA_APP,
      rota: ROTA_LUMINOSA,
    };
  }

  // 6. Resultado com corujão: linha, próximo horário, baia e rota (RN04, RN06).
  return {
    tipo: "corujao",
    status: "Ativo",
    linha: bairro.linha,
    proximaSaida: proxima,
    baia: bairro.baia,
    rota: ROTA_LUMINOSA,
  };
}
