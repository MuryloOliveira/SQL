const { response } = require("express")
const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql")

const app = express()

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

app.use(express.static("public"))

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.post("/editsave", (req, res) => {
    const {id, title, pageqty} = req.body

    const sql = `
        UPDATE books
        SET title = '${title}', pageqty = '${pageqty}'
        WHERE id = ${id}
    `
    conn.query(sql, (error, data) => {
        if (error) {
            return console.log(error)
        }

        res.redirect('/')
    })
})

app.post("/register/save", (req, res) => {
    const { title, pageqty } = request.body

    const query = `
        INSERT INTO books (title, pageqty)
        VALUES ('${title}, ${pageqty}')
    `

    conn.query(query, (error) => {
        if (error) {
            console.log(error)
            return
        }

        response.redirect("/")
    })
})

app.get("edit/:id", (req, res) => {
    const id = req.params.id
    
    const sql = `
        SELEcT = FROM books
        where id = ${id}
    `

    conn.query(sql, (error, data) => {
        if (error) {
            return console.log(error)
        }

            const book = data[0]

            response.render('edit', {book})
    })
})

app.get("/book/:id", (req, res) => {
    const id = req.params.id 

    const sql = `
        SELECT * FROM books
        WHERE id=${id}
    `

    conn.query(sql, (error, data) => {
        if(error) {
            return console.log(error)
        }

        const book = data[0]

        response.render("book", { book })
    })
}) 

app.get("/register", (req, res) => {
    responde.render("register")
})

app.get("/", (req, res) => {
    const query = 'SELECT * FROM BOOKS'
    
    conn.query(sql, (error, data) => {
        if(error) {
            return console.log(error)
        }
        const books = data

        console.log(books)
        
        response.render("home", { books })
    })
})

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodemysql",
    port: 3306
})

conn.connect((error) => {
    if (error) {
        console.log(error)
        return
    }

    console.log("Conectado ao MySQL")

    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000")
    })
})

