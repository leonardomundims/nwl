//dependencias usadas
//express para uar como servidor
const express = require("express")
const server = express()

// configurar pasta publica/public
server.use(express.static("public"))

// habiliat o uso de req.body para receber informações via requisição tipo POST
server.use(express.urlencoded({ extended: true }))

// importar o objeto de acesso ao banco de dados
const db = require("./database/db")

//template engine -> transforma html estático em dinâmico
const nunjucks = require("nunjucks")
    //configurar o nunjucks  
nunjucks.configure("src/views", //pasta onde estão os arq. html
    {
        express: server, //quem é o servidor express
        noCache: true //desabilita o uso de memória cache (true em desenvolvimento, false em prod)
    })

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

//pagina create-point receber formulario e cadastrar no banco de dados
server.post("/create-point", (req, resp) => {
    //objeto com os dados recebidos
    const data = req.body

    //código para inserir dados
    const query = `
    INSERT INTO places (
        name, image, adress, adress2, state, city, items
    ) VALUES (?,?,?,?,?,?,?);
    `
        // valores a serem inseridos
    const values = [
            data.name, data.image, data.adress, data.adress2, data.state, data.city, data.items
        ]
        //função depois de inserir dados
    function afterIsertData(err) {
        //se der erro ao cadastrar mostra no console
        if (err) {
            return resp.send("erro no cadastro")
        }
        // se não der erro mostra o que foi cadastrado
        console.log("Cadastrado com sucesso")
        console.log(data)

        return resp.render("create-point.html", { saved: true })
    }
    //função que executa no banco de dados
    db.run(query, values, afterIsertData)
})


//pagina search-results
server.get("/search", (req, resp) => {
    const search = req.query.search

    //se apesquisa for vazia
    if (search == "") {
        //mostra á pagina de resultados sem nada
        return resp.render("search-results.html", { total: 0 })
    }

    //ler o banco de dados
    //                               city é 'qualquer coisa antes "palavra" qualque coisa depois'
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        //se der erro ao ler banco de dados
        if (err) {
            return console.log(err)
        }
        //se não der erro retorna a página com os dados encontrados
        const total = rows.length
        return resp.render("search-results.html", { places: rows, total: total })
    })
})

// deletar dados do banco de dados -- passar na url ?id= id do item a ser deletado
server.get("/delete", (req, resp) => {
    const item = req.query

    db.run(`DELETE FROM places WHERE id = ?`, [item.id], function(err) {
        if (err) {
            console.log(err)
        }

        console.log("cadastro excluido com sucesso")
        return resp.render("search-results.html")
    })
})


// ligar o servidor na porta 3000
server.listen(3000)
    // depois no terminal dar comando node e passar o caminho do arquivo server.js, nesse caso
    // node src/server.js -> da para criar um atalho para essa função no arquivo package.json