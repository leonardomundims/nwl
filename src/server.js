//dependencias usadas
//express para uar como servidor
const express = require("express")
const server = express()

//template engine -> transforma html estático em dinâmico
const nunjucks = require("nunjucks")
    //configurar o nunjucks  
nunjucks.configure("src/views", //pasta onde estão os arq. html
    {
        express: server, //quem é o servidor express
        noCache: true //desabilita o uso de memória cache (true em desenvolvimento, false em prod)
    })


// configurar pasta publica/public
server.use(express.static("public"))

// importar o objeto de acesso ao banco de dados
const db = require("./database/db")


//configurar as rotas do servidor
//pagina inicial home = "/"
//req: Requisiçao
//resp: Resposta
server.get("/", (req, resp) => {
    return resp.render("index.html") //resposta a requisição de acesso a pagina inicial
})

//pagina create-point
server.get("/create-point", (req, resp) => {
    return resp.render("create-point.html")
})

//pagina search-results
server.get("/search-results", (req, resp) => {

    return resp.render("search-results.html")
})


// ligar o servidor na porta 3000
server.listen(3000)
    // depois no terminal dar comando node e passar o caminho do arquivo server.js, nesse caso
    // node src/server.js -> da para criar um atalho para essa função no arquivo package.json