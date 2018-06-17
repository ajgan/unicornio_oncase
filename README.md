# unicornio_oncase
Projeto para a seletiva de estágio da Oncase.

O objetivo do projeto foi analisar uma base dados pare extrair informações relevantes e com potencial para tomada de decisão.

O problema escolhido foi analisar o mercado financeiro do futebol brasileiro, entender como o Campeonato Brasileiro funciona em termos de investimento, além de tentar descobrir padrões para que clubes de baixo orçamento tenham um bom desempenho na competição.

Os dados foram coletados do site [Transfermaket](http://transfermarkt.com) e as análises foram feitas em Python com auxílio da ferramenta do Jupyter Notebook. Uma das visualizações do estudo foi feita em Javascript usando D3.

#### **Arquivos:**
- **Unicornio.ipynb** - Notebook com toda a coleta e análise de dados, além de estar organizado com comentários que explicam a linha de raciocínio do problema.
- **brasileirao.csv** - Csv com dados do Campeonato Brasileiro de 2008 até 2017.
- **brasileiraoNE.csv** - Csv com dados financeiros e de desempenho dos clubes nordestinos que disputaram o Campeonato Brasileiro entre 2008 e 2017.
- **brasileiraNE2018.csv** - Csv com dados financeiros e de desempenho dos 4 clubes nordestinos que estão disputando o Campeonato Brasileiro de 2018(Bahia, Ceará, Sport e Vitória).
- **brasileiraov1.html** - Página html onde pode ser vista a visualização interativa que é citada no Notebook.
- **brasileiraov1.js** - Código-fonte da visualização que pode ser acessada através do html.

#### **Bibliotecas Utilizadas:**
- **pandas** - Uso da estrutura de DataFrames e para salvar e carregar arquivos csv.
- **numpy** - Para alguns cálculos matemáticos no DataFrame.
- **requests** - Para coletar as páginas web.
- **BeautifulSoup** - Para ler as páginas coletadas e extrair os dados delas.
- **matplotlib** - Para plotar visualizações.
- **seaborn** - Gera visualizações mais bonitas que o plt básico.
- **statsmodels** - Usada para cálculo de regressão linear.
- **sklearn** - Usada para criação e uso de modelos de aprendizagem.
- **graphviz** - Para visualizar uma árvore de decisão gerada no processo.
- **d3.js** - Usada para a criação de uma visualização mais complexa e interativa.
