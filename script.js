// Kinence-Lab — pesquisa, artigos, calculadora e indicadores.
const articleContent = {
  budget: {category:"FINANÇAS PESSOAIS · GUIA PRÁTICO", title:"Como criar o teu primeiro orçamento pessoal", body:`<p>Um orçamento é um plano para decidires como usar o dinheiro que recebes. Não precisa de ser complicado: o mais importante é registares os valores com honestidade e reveres o plano regularmente.</p><h3>1. Regista o que entra</h3><p>Anota os rendimentos do mês, como salário, mesada ou outros rendimentos legítimos. Usa valores reais e não contes com dinheiro que ainda não recebeste.</p><h3>2. Regista o que sai</h3><p>Aponta despesas como alimentação, transporte, escola, comunicações e lazer. As pequenas compras também contam.</p><h3>3. Distingue prioridades</h3><p>Separa despesas essenciais das que podem esperar. As prioridades dependem da tua situação e das responsabilidades que tens.</p><h3>4. Define uma meta</h3><p>Escolhe um objetivo concreto e decide quanto consegues reservar sem comprometer necessidades importantes. Revê o plano se as circunstâncias mudarem.</p><p><strong>Exercício:</strong> cria três colunas num caderno: Entradas, Despesas e Objetivo. Atualiza-as semanalmente.</p>`},
  saving: {category:"POUPANÇA · HÁBITOS", title:"Como criar o hábito de poupar", body:`<p>Poupar não significa guardar uma grande quantia de uma só vez. O primeiro passo é construir um hábito que se adapte à tua realidade.</p><h3>Define uma meta concreta</h3><p>Em vez de dizer apenas “quero poupar”, decide para que finalidade queres guardar dinheiro e qual é o valor aproximado de que precisas.</p><h3>Começa com uma quantia possível</h3><p>Se os teus rendimentos permitirem, separa uma pequena quantia quando receberes dinheiro. Não existe uma percentagem que funcione para toda a gente.</p><h3>Reduz desperdícios, não necessidades</h3><p>Compara preços e planeia compras, mas não cortes em alimentação, saúde, segurança ou outras necessidades essenciais para cumprir uma meta de poupança.</p><h3>Prepara-te para imprevistos</h3><p>Uma reserva pode ajudar a lidar com despesas inesperadas. Constrói-a gradualmente e guarda-a num local seguro.</p>`},
  inflation: {category:"ECONOMIA · EXPLICADOR", title:"O que é a inflação e como afeta o dia a dia?", body:`<p>Inflação é o aumento generalizado dos preços de bens e serviços ao longo do tempo. Quando os preços sobem e o rendimento não acompanha essa subida, o dinheiro compra menos coisas.</p><h3>Um exemplo simples</h3><p>Se um conjunto de produtos custava 1.000 kwanzas e, mais tarde, custa 1.100 kwanzas, o preço desse conjunto aumentou 10%. Este é apenas um exemplo ilustrativo.</p><h3>Porque acontece?</h3><p>As causas podem incluir aumentos nos custos de produção e transporte, mudanças na procura ou limitações na oferta. A combinação de causas varia conforme o país e o período.</p><h3>Como interpretar?</h3><p>O índice oficial de preços acompanha um conjunto de bens e serviços. A experiência de cada família pode ser diferente porque os hábitos de consumo também são diferentes.</p><p>Planear compras e acompanhar despesas pode ajudar a gerir o orçamento, mas não elimina a inflação.</p>`},
  interest: {category:"FINANÇAS PESSOAIS · CONCEITOS", title:"O que são juros?", body:`<p>Juros são o custo de usar dinheiro emprestado ou, em certos produtos financeiros, o rendimento recebido por disponibilizar dinheiro durante um período.</p><h3>Quando pedes emprestado</h3><p>Os juros fazem parte do custo do crédito. Antes de assumir um empréstimo, é importante compreender a taxa, o prazo, as comissões e o valor total a pagar.</p><h3>Quando poupas</h3><p>Alguns depósitos podem pagar juros. O rendimento depende das condições do produto, do prazo, de impostos e de outras regras.</p><h3>Compara o custo total</h3><p>Uma taxa anunciada não conta necessariamente toda a história. Lê as condições e pede esclarecimentos antes de assinar um contrato.</p>`},
  gdp: {category:"ECONOMIA · EXPLICADOR", title:"O que significa PIB?", body:`<p>O Produto Interno Bruto (PIB) mede o valor dos bens e serviços finais produzidos dentro de um país durante um período, normalmente um trimestre ou um ano.</p><h3>PIB nominal e real</h3><p>O PIB nominal usa os preços do período. O PIB real tenta retirar o efeito das mudanças de preços para ajudar a comparar a produção ao longo do tempo.</p><h3>O que o PIB nos diz?</h3><p>É uma medida importante da atividade económica, mas não mostra, sozinho, como o rendimento é distribuído, a qualidade de vida de cada pessoa ou todo o trabalho não remunerado.</p><h3>Olha para o contexto</h3><p>Para compreender a economia, analisa o PIB em conjunto com indicadores como inflação, emprego, produtividade e rendimento.</p>`},
  needs: {category:"POUPANÇA · DECISÕES", title:"Necessidades, desejos e prioridades", body:`<p>Distinguir necessidades de desejos pode ajudar a organizar as despesas, sem transformar o orçamento numa lista de proibições.</p><h3>Identifica o essencial</h3><p>Necessidades incluem aquilo de que dependes, como alimentação, habitação, saúde, transporte necessário e educação.</p><h3>Planeia os desejos</h3><p>Desejos também podem trazer satisfação. A ideia é decidir conscientemente quanto espaço lhes dar depois de considerar as responsabilidades essenciais.</p><h3>Usa três perguntas</h3><ul><li>Preciso disto agora?</li><li>Está dentro do meu orçamento?</li><li>Esta compra afasta-me de uma prioridade importante?</li></ul><p>Não existe um orçamento perfeito para toda a gente. O objetivo é ter informação suficiente para fazer escolhas adequadas à tua realidade.</p>`}
};

const searchInput = document.getElementById("searchInput");
const filters = document.getElementById("filters");
let activeCategory = "Todos";

function filterArticles() {
  const query = searchInput.value.trim().toLocaleLowerCase("pt");
  let visible = 0;
  document.querySelectorAll(".article-card").forEach(card => {
    const matchesCategory = activeCategory === "Todos" || card.dataset.category === activeCategory;
    const searchable = (card.dataset.search + " " + card.innerText).toLocaleLowerCase("pt");
    const matchesQuery = searchable.includes(query);
    card.hidden = !(matchesCategory && matchesQuery);
    if (!card.hidden) visible++;
  });
  document.getElementById("noResults").hidden = visible !== 0;
}
searchInput.addEventListener("input", filterArticles);
filters.addEventListener("click", event => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  filters.querySelectorAll("button").forEach(item => item.classList.toggle("active", item === button));
  filterArticles();
});

const dialog = document.getElementById("articleDialog");
document.querySelectorAll("[data-article]").forEach(button => {
  button.addEventListener("click", () => {
    const article = articleContent[button.dataset.article];
    document.getElementById("dialogContent").innerHTML =
      `<span class="eyebrow">${article.category}</span><h2 id="dialogTitle">${article.title}</h2>${article.body}`;
    dialog.showModal();
  });
});
document.getElementById("dialogClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
document.addEventListener("keydown", event => { if (event.key === "Escape" && dialog.open) dialog.close(); });

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
menuToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});
navMenu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.getElementById("budgetForm").addEventListener("submit", event => {
  event.preventDefault();
  const income = Number(document.getElementById("income").value);
  const expenses = Number(document.getElementById("expenses").value);
  const result = document.getElementById("budgetResult");
  if (!Number.isFinite(income) || !Number.isFinite(expenses) || income < 0 || expenses < 0) {
    result.textContent = "Introduz valores válidos e não negativos.";
    return;
  }
  const balance = income - expenses;
  const fmt = new Intl.NumberFormat("pt-PT", {style:"currency", currency:"AOA", maximumFractionDigits:2});
  result.innerHTML = `Saldo mensal: <strong>${fmt.format(balance)}</strong><br>${balance > 0 ? "As despesas indicadas são inferiores ao rendimento." : balance < 0 ? "As despesas indicadas ultrapassam o rendimento. Revê as prioridades e os valores." : "As despesas indicadas são iguais ao rendimento."}`;
});

// API pública do Banco Mundial: dados macroeconómicos anuais, não cotações em tempo real.
const indicators = [
  {id:"inflation", code:"FP.CPI.TOTL.ZG", valueId:"inflationValue", dateId:"inflationDate", decimals:2, suffix:"%"},
  {id:"gdp", code:"NY.GDP.MKTP.KD.ZG", valueId:"gdpValue", dateId:"gdpDate", decimals:2, suffix:"%"},
  {id:"unemployment", code:"SL.UEM.TOTL.ZS", valueId:"unemploymentValue", dateId:"unemploymentDate", decimals:2, suffix:"%"},
  {id:"nominalGdp", code:"NY.GDP.MKTP.CD", valueId:"nominalGdpValue", dateId:"nominalGdpDate", decimals:0, currency:true}
];
function formatIndicator(item, value) {
  if (item.currency) {
    const number = Number(value);
    if (Math.abs(number) >= 1e12) return (number / 1e12).toLocaleString("pt-PT",{maximumFractionDigits:2}) + " biliões US$";
    if (Math.abs(number) >= 1e9) return (number / 1e9).toLocaleString("pt-PT",{maximumFractionDigits:2}) + " mil milhões US$";
    if (Math.abs(number) >= 1e6) return (number / 1e6).toLocaleString("pt-PT",{maximumFractionDigits:2}) + " milhões US$";
    return number.toLocaleString("pt-PT",{maximumFractionDigits:0}) + " US$";
  }
  return Number(value).toLocaleString("pt-PT",{minimumFractionDigits:0,maximumFractionDigits:item.decimals}) + item.suffix;
}
async function loadIndicator(item) {
  const valueEl = document.getElementById(item.valueId);
  const dateEl = document.getElementById(item.dateId);
  const url = `https://api.worldbank.org/v2/country/AGO/indicator/${item.code}?format=json&per_page=70`;
  try {
    const response = await fetch(url, {headers:{"Accept":"application/json"}});
    if (!response.ok) throw new Error("A fonte respondeu com erro.");
    const payload = await response.json();
    const rows = Array.isArray(payload) && Array.isArray(payload[1]) ? payload[1] : [];
    const latest = rows.find(row => row.value !== null && row.value !== undefined);
    if (!latest) throw new Error("Sem valores disponíveis.");
    valueEl.textContent = formatIndicator(item, latest.value);
    dateEl.textContent = `Período: ${latest.date} · último valor publicado`;
    return true;
  } catch (error) {
    valueEl.textContent = "Indisponível";
    dateEl.textContent = "Não foi possível obter dados. Consulta a fonte oficial.";
    return false;
  }
}
async function refreshIndicators() {
  const status = document.getElementById("dataStatus");
  const button = document.getElementById("refreshIndicators");
  button.disabled = true;
  button.innerHTML = "↻ A atualizar…";
  status.textContent = "A consultar a API do Banco Mundial…";
  const results = await Promise.all(indicators.map(loadIndicator));
  const success = results.filter(Boolean).length;
  const now = new Date().toLocaleString("pt-PT", {dateStyle:"short", timeStyle:"short"});
  status.textContent = `${success} de ${indicators.length} indicadores carregados. Consulta realizada: ${now}. Os dados refletem o período estatístico indicado em cada cartão.`;
  button.disabled = false;
  button.innerHTML = "↻ Atualizar dados";
}
document.getElementById("refreshIndicators").addEventListener("click", refreshIndicators);
document.getElementById("year").textContent = new Date().getFullYear();
refreshIndicators();
