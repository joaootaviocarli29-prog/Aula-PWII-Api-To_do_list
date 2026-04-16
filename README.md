# Minha Primeira API de Tarefas 

### Sobre o projeto
Oi! Esse aqui é o resultado de um desafio que fiz para criar uma API de lista de tarefas (To-Do List). A ideia era criar um sistema onde eu pudesse anotar coisas, marcar como feitas e não perder nada, mesmo se eu fechasse o programa.

### O que eu usei
* **Node.js**: Usei para rodar o código no servidor.
* **Módulos do próprio Node**: Usei coisas que já vêm nele, como `http` para a conexão, `fs` para salvar arquivos e `path` para organizar os caminhos das pastas.
* **JSON**: É o formato que escolhi para salvar as tarefas.

### Explicação da solução
O maior desafio aqui não foi só fazer a API funcionar, mas garantir que os dados não sumissem. Para chegar no nível avançado, foquei em três pontos:

* **Persistência Real (tasks.json)**: Em vez de deixar as tarefas "vizinhas" apenas na memória (que apaga quando o servidor desliga), usei o módulo fs do Node para criar um banco de dados em arquivo JSON. Toda vez que você cria ou muda algo, o código abre o arquivo, escreve e salva. É o que faz o projeto ser "Sênior".

* **IDs Inteligentes**: Como o servidor reinicia, não dava para usar um contador simples que volta para o 1. Criei uma lógica que olha qual foi a última tarefa salva no arquivo e gera o próximo ID a partir dali. Assim, nunca tem bagunça de número repetido.

* **Tratamento de Erros no Arquivo**: Se o arquivo tasks.json não existir ou estiver vazio na primeira vez que o servidor liga, o código é esperto o suficiente para não quebrar; ele entende que é um começo do zero e cria a estrutura necessária.

* **Status de Conclusão**: Adicionei o campo completed em tudo. Agora, além de mudar o nome da tarefa, dá para avisar o sistema se ela está pronta ou não, e isso fica gravado permanentemente.

**Destaque:** O que eu achei mais legal foi conseguir fazer os dados ficarem salvos num arquivo chamado `tasks.json`. Assim, se eu desligar o PC e ligar de novo, minhas tarefas continuam lá!

### Como rodar na sua máquina
1. Tenha o Node.js instalado.
2. Baixe os arquivos e abra o terminal na pasta.
3. Se precisar, dê um `npm install` (caso você use o nodemon).
4. Digite `node app.js` para ligar o servidor.
5. O servidor vai rodar no link: `http://localhost:3000`

Usei o **Postman** para testar tudo e ver os dados entrando e saindo!

### Demonstração do projeto
![Assita o vídeo:](./video_api.mp4)