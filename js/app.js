let carrinho = [];
let categoriaAtiva = "Esteiras";
let paginaAtual = 1;
const PRODUTOS_POR_PAGINA = 4;

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function getProdutos(categoria) {
  if (categoria === "Promoções") {
    return produtos.filter(p => p.desconto > 0);
  }
  return produtos.filter(p => p.categoria === categoria);
}

function renderizarProdutos(categoria) {
  const grid = document.getElementById("grid-produtos");
  const titulo = document.getElementById("titulo-categoria");
  titulo.textContent = categoria;

  const lista = getProdutos(categoria);
  const totalPaginas = Math.ceil(lista.length / PRODUTOS_POR_PAGINA);
  const inicio = (paginaAtual - 1) * PRODUTOS_POR_PAGINA;
  const fim = inicio + PRODUTOS_POR_PAGINA;
  const paginados = lista.slice(inicio, fim);

  grid.innerHTML = paginados.map(p => gerarCardHTML(p)).join("");

  renderizarPaginacao(totalPaginas);
}

function renderizarPaginacao(totalPaginas) {
  const container = document.getElementById("paginacao");
  if (totalPaginas <= 1) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = `
    <button class="btn-pagina" onclick="mudarPagina(-1)" ${paginaAtual === 1 ? "disabled" : ""}>← Anterior</button>
    <span class="pagina-info">Página ${paginaAtual} de ${totalPaginas}</span>
    <button class="btn-pagina" onclick="mudarPagina(1)" ${paginaAtual === totalPaginas ? "disabled" : ""}>Próximo →</button>
  `;
}

function mudarPagina(direcao) {
  const lista = getProdutos(categoriaAtiva);
  const totalPaginas = Math.ceil(lista.length / PRODUTOS_POR_PAGINA);
  paginaAtual = Math.min(Math.max(paginaAtual + direcao, 1), totalPaginas);
  renderizarProdutos(categoriaAtiva);
}

function adicionarAoCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  mostrarModalQuantidade(produto);
}

function mostrarModalQuantidade(produto) {
  const overlay = document.createElement("div");
  overlay.className = "overlay-quantidade";
  overlay.innerHTML = `
    <div class="modal-quantidade">
      <img src="${produto.foto}" alt="${produto.nome}" onerror="this.style.display='none'">
      <h3>${produto.nome}</h3>
      <p class="modal-preco">por ${formatarMoeda(produto.precoVista)} à vista</p>
      <div class="modal-quantidade-controle">
        <button onclick="alterarQuantidade(-1)">−</button>
        <input type="number" id="input-quantidade" value="1" min="1" max="99">
        <button onclick="alterarQuantidade(1)">+</button>
      </div>
      <div class="modal-quantidade-btns">
        <button class="btn-cancelar-modal" onclick="this.closest('.overlay-quantidade').remove()">Cancelar</button>
        <button class="btn-confirmar-modal" onclick="confirmarAdicao(${produto.id})">Adicionar ao pedido</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function alterarQuantidade(delta) {
  const input = document.getElementById("input-quantidade");
  const novoValor = parseInt(input.value) + delta;
  if (novoValor >= 1 && novoValor <= 99) {
    input.value = novoValor;
  }
}

function confirmarAdicao(id) {
  const produto = produtos.find(p => p.id === id);
  const quantidade = parseInt(document.getElementById("input-quantidade").value) || 1;
  const existente = carrinho.find(i => i.id === id);

  if (existente) {
    existente.quantidade += quantidade;
  } else {
    carrinho.push({ ...produto, quantidade });
  }

  document.querySelector(".overlay-quantidade").remove();
  renderizarCarrinho();
  mostrarToast(`${quantidade}x ${produto.nome} adicionado!`);
}

function mostrarToast(mensagem) {
  const toast = document.createElement("div");
  toast.className = "toast-sucesso";
  toast.innerHTML = `✓ ${mensagem}`;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("visivel"), 10);
  setTimeout(() => {
    toast.classList.remove("visivel");
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}

function removerDoCarrinho(id) {
  carrinho = carrinho.filter(i => i.id !== id);
  renderizarCarrinho();
}

function renderizarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  const contador = document.getElementById("contador-itens");
  const total = document.getElementById("total-pedido");

  const totalItens = carrinho.reduce((acc, i) => acc + i.quantidade, 0);
  const totalValor = carrinho.reduce((acc, i) => acc + i.precoVista * i.quantidade, 0);

  contador.textContent = totalItens;
  total.textContent = formatarMoeda(totalValor);

  if (carrinho.length === 0) {
    lista.innerHTML = `<p class="carrinho-vazio">Seu carrinho está vazio</p>`;
    return;
  }

  lista.innerHTML = carrinho.map(i => `
    <div class="carrinho-item">
      <img src="${i.foto}" alt="${i.nome}">
      <div class="carrinho-item-info">
        <p>${i.nome}</p>
        <span>${formatarMoeda(i.precoVista)} × ${i.quantidade}</span>
      </div>
      <button class="btn-remover" onclick="removerDoCarrinho(${i.id})">×</button>
    </div>
  `).join("");
}

function selecionarCategoria(categoria) {
  categoriaAtiva = categoria;
  paginaAtual = 1;
  document.querySelectorAll("#lista-categorias li").forEach(li => {
    li.classList.toggle("ativo", li.dataset.categoria === categoria);
  });
  renderizarProdutos(categoria);
}

document.querySelectorAll("#lista-categorias li").forEach(li => {
  li.addEventListener("click", () => selecionarCategoria(li.dataset.categoria));
});

function buscarProdutos() {
  const termo = document.querySelector(".busca-input").value.trim().toLowerCase();
  const titulo = document.getElementById("titulo-categoria");
  const grid = document.getElementById("grid-produtos");

  // Desativa categoria ativa visualmente
  document.querySelectorAll("#lista-categorias li").forEach(li => {
    li.classList.remove("ativo");
  });

  paginaAtual = 1;

  if (termo === "") {
    // Se vazio, mostra todos
    const todos = produtos;
    titulo.textContent = "Todos os produtos";
    const totalPaginas = Math.ceil(todos.length / PRODUTOS_POR_PAGINA);
    const paginados = todos.slice(0, PRODUTOS_POR_PAGINA);
    grid.innerHTML = paginados.map(p => gerarCardHTML(p)).join("");
    renderizarPaginacaoCustom(todos, totalPaginas);
  } else {
    const resultado = produtos.filter(p =>
      p.nome.toLowerCase().includes(termo)
    );
    titulo.textContent = `Resultados para "${termo}"`;
    if (resultado.length === 0) {
      grid.innerHTML = `<p style="color:#888; font-size:20px;">Nenhum produto encontrado.</p>`;
      document.getElementById("paginacao").innerHTML = "";
      return;
    }
    const totalPaginas = Math.ceil(resultado.length / PRODUTOS_POR_PAGINA);
    const paginados = resultado.slice(0, PRODUTOS_POR_PAGINA);
    grid.innerHTML = paginados.map(p => gerarCardHTML(p)).join("");
    renderizarPaginacaoCustom(resultado, totalPaginas);
  }
}

function gerarCardHTML(p) {
  return `
    <div class="produto-card">
      ${p.desconto ? `<div class="badge-desconto">até - ${p.desconto}% DESCONTO</div>` : ""}
      <img src="${p.foto}" alt="${p.nome}" onerror="this.style.display='none'">
      <div class="produto-info">
        <p class="produto-nome">${p.nome}</p>
        <p class="produto-parcelas">em até <strong>${p.parcelas}</strong> sem juros</p>
        <p class="produto-original">ou de <span>${formatarMoeda(p.precoOriginal)}</span></p>
        <p class="produto-vista">por ${formatarMoeda(p.precoVista)} à vista</p>
      </div>
      <button class="btn-add" onclick="adicionarAoCarrinho(${p.id})">Adicionar</button>
    </div>
  `;
}

function renderizarPaginacaoCustom(lista, totalPaginas) {
  const container = document.getElementById("paginacao");
  if (totalPaginas <= 1) {
    container.innerHTML = "";
    return;
  }
  container.innerHTML = `
    <button class="btn-pagina" onclick="mudarPaginaCustom(-1)" ${paginaAtual === 1 ? "disabled" : ""}>← Anterior</button>
    <span class="pagina-info">Página ${paginaAtual} de ${totalPaginas}</span>
    <button class="btn-pagina" onclick="mudarPaginaCustom(1)" ${paginaAtual === totalPaginas ? "disabled" : ""}>Próximo →</button>
  `;
}

function mudarPaginaCustom(direcao) {
  const termo = document.querySelector(".busca-input").value.trim().toLowerCase();
  const lista = termo === "" ? produtos : produtos.filter(p => p.nome.toLowerCase().includes(termo));
  const totalPaginas = Math.ceil(lista.length / PRODUTOS_POR_PAGINA);
  paginaAtual = Math.min(Math.max(paginaAtual + direcao, 1), totalPaginas);
  const paginados = lista.slice((paginaAtual - 1) * PRODUTOS_POR_PAGINA, paginaAtual * PRODUTOS_POR_PAGINA);
  document.getElementById("grid-produtos").innerHTML = paginados.map(p => gerarCardHTML(p)).join("");
  renderizarPaginacaoCustom(lista, totalPaginas);
}

document.querySelector(".btn-ver-todos").addEventListener("click", buscarProdutos);

document.querySelector(".busca-input").addEventListener("keydown", function(e) {
  if (e.key === "Enter") buscarProdutos();
});

function gerarSenha() {
  return Math.floor(100, 999) + Math.floor(Math.random() * 900);
}

document.querySelector(".btn-enviar-pedido").addEventListener("click", async () => {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  const senha = Math.floor(100 + Math.random() * 900);
  const total = carrinho.reduce((acc, i) => acc + i.precoVista * i.quantidade, 0);

  const pedido = {
    senha: senha,
    itens: carrinho.map(i => ({
      nome: i.nome,
      quantidade: i.quantidade,
      precoVista: i.precoVista
    })),
    total: total,
    status: "aguardando",
    horario: firebase.firestore.FieldValue.serverTimestamp()
  };

  try {
    await db.collection("pedidos").add(pedido);
    carrinho = [];
    renderizarCarrinho();
    mostrarSenha(senha);
  } catch (erro) {
    alert("Erro ao enviar pedido. Tente novamente.");
    console.error(erro);
  }
});

function mostrarSenha(senha) {
  const overlay = document.createElement("div");
  overlay.className = "overlay-senha";
  overlay.innerHTML = `
    <div class="modal-senha">
      <h2>Pedido enviado!</h2>
      <p>Sua senha é</p>
      <div class="numero-senha">${senha}</div>
      <p>Dirija-se ao balcão e aguarde ser chamado.</p>
      <button onclick="this.closest('.overlay-senha').remove(); mostrarSplash();">Fechar</button>
    </div>
  `;
  document.body.appendChild(overlay);
}

renderizarProdutos(categoriaAtiva);
renderizarCarrinho();

// Splash screen
const splash = document.getElementById("splash-screen");

// Trava o scroll quando a splash está visível
document.documentElement.style.overflow = "hidden";

splash.addEventListener("click", () => {
  splash.classList.add("escondida");
  document.documentElement.style.overflow = "";
});

function mostrarSplash() {
  splash.classList.remove("escondida");
  document.documentElement.style.overflow = "hidden";
}


// Chamar atendente
document.querySelector(".btn-ajuda").addEventListener("click", async () => {
  try {
    await db.collection("chamados").add({
      horario: firebase.firestore.FieldValue.serverTimestamp(),
      status: "pendente"
    });

    const overlay = document.createElement("div");
    overlay.className = "overlay-senha";
    overlay.innerHTML = `
      <div class="modal-senha">
        <div style="font-size: 64px; margin-bottom: 16px;">🔔</div>
        <h2>Atendente chamado!</h2>
        <p>Um atendente irá até você em instantes.</p>
        <button onclick="this.closest('.overlay-senha').remove()">OK</button>
      </div>
    `;
    document.body.appendChild(overlay);
  } catch (erro) {
    console.error(erro);
  }
});