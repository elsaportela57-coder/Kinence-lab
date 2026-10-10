KINENCE-LAB — GUIA DO PROJETO
Autor: Ibrahim Domingos

FICHEIROS
- index.html: conteúdo, estrutura, artigos, painel económico e calculadora.
- style.css: design responsivo para telemóveis, tablets e computadores.
- script.js: pesquisa, filtros, leitura dos artigos, calculadora e ligação à API.
- README.txt: estas instruções.

O QUE FUNCIONA
- Pesquisa local dos artigos e filtros por categoria.
- Seis artigos explicativos incorporados no site.
- Calculadora de orçamento mensal no navegador.
- Painel de quatro indicadores económicos de Angola via API pública do Banco Mundial.
- Botão para atualizar os indicadores manualmente.
- Design responsivo e menu móvel.

IMPORTANTE SOBRE DADOS
A API do Banco Mundial fornece indicadores estatísticos cuja frequência varia e que podem ter atraso. Não são cotações em tempo real segundo a segundo. O painel mostra o último valor disponível e o respetivo período. A taxa USD/AOA não foi inventada nem apresentada como cotação live; para a adicionar corretamente, será necessário escolher uma fonte oficial/fiável que disponibilize dados utilizáveis por API e verificar as condições de utilização.

PUBLICAR GRATUITAMENTE COM GITHUB PAGES
1. Abre https://github.com/ e cria/inicia sessão na tua conta.
2. Cria um repositório público chamado kinence-lab.
3. Carrega index.html, style.css e script.js para a raiz do repositório.
4. Abre Settings > Pages.
5. Em Build and deployment, escolhe Deploy from a branch, seleciona main e /(root), e guarda.
6. Espera pela publicação. O GitHub apresenta o endereço do site nas definições de Pages. Pode demorar alguns minutos.
Documentação oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

NOTAS ANTES DE PUBLICAR
- Substitui kinencelab@example.com pelo email que quiseres usar.
- Revê os artigos e acrescenta fontes e datas editoriais sempre que publicares dados.
- Não coloques palavras-passe, dados pessoais ou chaves secretas no repositório.
- O GitHub Pages publica ficheiros estáticos; não oferece uma base de dados nem código de servidor para gerir contas/comentários.
- Se a API não responder no navegador, verifica a ligação à Internet e tenta novamente mais tarde.
- Este projeto é educativo e não constitui aconselhamento financeiro.
