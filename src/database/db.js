//importar a dependencia sqlite3 - verbose = verbosa
const sqlite3 = require("sqlite3").verbose()

//criar o objeto que fara as oprerações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

//exportar objeto db para fora deste arquivo
module.exports = db


/*  como usar sql com js  

//utilizar o onjeto banco de dados para realizar operações
db.serialize(() => {
    //com linguegem SQL vamos:

    // 1 -------  criar tabela ------ //
     db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            image TEXT,
            adress TEXT,
            adress2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `) 

    // 2 ------ inserir dados na tabela  ------- //

    //código para inserir dados
    const query = `
            INSERT INTO places (
                name, image, adress, adress2, state, city, items
            ) VALUES (?,?,?,?,?,?,?);
            `
        // valores a serem inseridos
    const values = [
            "name 2",
            "https://images.unsplash.com/photo-1591241899186-9d75d9218a7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            "rua qualquer",
            "nuemro nao sei",
            "Minas Gerais",
            "Piumhi",
            "Items de coleta"
        ]
        //função depois de inserir dados
    function afterIsertData(err) {
        //se der erro ao cadastrar mostra no console
        if (err) {}
        // se não der erro mostra o que foi cadastrado
        console.log("Cadastrado com sucesso")
        console.log(this)
    }
    //função que executa no banco de dados
    db.run(query, values, afterIsertData)

    // ------   fim inserir dados na tabela    -------- //

    // 3 -------  consultar dados na tabela   ------ //
    //      selecione todos os dados de palces, a função recebe um erro e um array "rows" cada item do array é uma linha da tabela
     db.all(`SELECT * FROM places`, function(err, rows) {
        //se der erro ao ler
        if (err) {
            return console.log(err)
        }
        //se não der erro
        console.log("os dados são:")
        console.log(rows)
    }) 

    //editar dados na tabela

    // 4 --------  excluir dados da tabela  -------- //
    //      deletar da tabela places onde o id = ?, [id da linha a ser deletada]
     db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
        if (err) {
            console.log(err)
        }

        console.log("cadastro excluido com sucesso")
    }) 

})  
*/