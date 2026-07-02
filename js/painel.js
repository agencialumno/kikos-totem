function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatarHorario(timestamp) {
  if (!timestamp) return "";
  const data = timestamp.toDate();
  return data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function gerarCardPedido(id, pedido) {
  const itensHTML = pedido.itens.map(item => `
    <li>
      <span>${item.quantidade}x ${item.nome}</span>
      <span>${formatarMoeda(item.precoVista * item.quantidade)}</span>
    </li>
  `).join("");

  const botoesHTML = pedido.status === "aguardando"
    ? `<button class="btn-acao btn-atender" onclick="atualizarStatus('${id}', 'em-atendimento')">Atender</button>
       <button class="btn-acao btn-cancelar" onclick="atualizarStatus('${id}', 'cancelado')">Cancelar</button>`
    : pedido.status === "em-atendimento"
    ? `<button class="btn-acao btn-concluir" onclick="atualizarStatus('${id}', 'concluido')">Concluir</button>
       <button class="btn-acao btn-cancelar" onclick="atualizarStatus('${id}', 'cancelado')">Cancelar</button>`
    : "";

  return `
    <div class="pedido-card" id="pedido-${id}">
      <div class="pedido-senha">${pedido.senha}</div>
      <div class="pedido-horario">${formatarHorario(pedido.horario)}</div>
      <ul class="pedido-itens">${itensHTML}</ul>
      <div class="pedido-total">Total: ${formatarMoeda(pedido.total)}</div>
      <div class="pedido-acoes">${botoesHTML}</div>
    </div>
  `;
}

function atualizarStatus(id, novoStatus) {
  db.collection("pedidos").doc(id).update({ status: novoStatus });
}

function renderizarPedidos(pedidos) {
  const aguardando = [];
  const emAtendimento = [];
  const concluidos = [];

  pedidos.forEach(doc => {
    const pedido = doc.data();
    const id = doc.id;
    if (pedido.status === "aguardando") aguardando.push({ id, pedido });
    else if (pedido.status === "em-atendimento") emAtendimento.push({ id, pedido });
    else if (pedido.status === "concluido") concluidos.push({ id, pedido });
  });

  const listaAguardando = document.getElementById("lista-aguardando");
  const listaEmAtendimento = document.getElementById("lista-em-atendimento");
  const listaConcluido = document.getElementById("lista-concluido");
  const totalAguardando = document.getElementById("total-aguardando");

  totalAguardando.textContent = `${aguardando.length} pedido${aguardando.length !== 1 ? "s" : ""} aguardando`;

  listaAguardando.innerHTML = aguardando.length === 0
    ? `<p class="sem-pedidos">Nenhum pedido aguardando</p>`
    : aguardando.map(({ id, pedido }) => gerarCardPedido(id, pedido)).join("");

  listaEmAtendimento.innerHTML = emAtendimento.length === 0
    ? `<p class="sem-pedidos">Nenhum pedido em atendimento</p>`
    : emAtendimento.map(({ id, pedido }) => gerarCardPedido(id, pedido)).join("");

  listaConcluido.innerHTML = concluidos.length === 0
    ? `<p class="sem-pedidos">Nenhum pedido concluído</p>`
    : concluidos.map(({ id, pedido }) => gerarCardPedido(id, pedido)).join("");
}

// Escuta em tempo real
db.collection("pedidos")
  .orderBy("horario", "desc")
  .onSnapshot(snapshot => {
    renderizarPedidos(snapshot.docs);
  });

  // Escuta chamados de atendente
db.collection("chamados")
  .where("status", "==", "pendente")
  .onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === "added") {
        mostrarAlertaChamado(change.doc.id);
      }
    });
  });

function mostrarAlertaChamado(id) {
  const alerta = document.createElement("div");
  alerta.className = "alerta-chamado";
  alerta.innerHTML = `
    <div class="alerta-chamado-conteudo">
      <span>🔔</span>
      <p>Cliente solicitou atendimento!</p>
      <button onclick="dispensarChamado('${id}', this.closest('.alerta-chamado'))">Dispensar</button>
    </div>
  `;
  document.body.appendChild(alerta);
}

function dispensarChamado(id, elemento) {
  db.collection("chamados").doc(id).update({ status: "dispensado" });
  elemento.remove();
}