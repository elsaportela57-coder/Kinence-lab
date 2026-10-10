// Kinence-Lab — pesquisa, calculadora e indicadores.

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
