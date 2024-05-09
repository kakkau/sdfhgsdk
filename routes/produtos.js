const express = require('express')

const router = express.Router()

let listaProdutos = [
    {
        nome : "João",
        idade: 20,
        email:  "joão@email.com",
        telefone: "61900010002"
    }
]

// middlewares de validação
// Validar se a pessoa existe
function validarProduto(req, res, next) {
    const nome = req.params.nome
    const produto = listaProdutos.find(produto => produto.nome == nome)
    if (produto) {
        req.produto = produto
        next()
    } else {
        return res.status(404).json({ mensagem: "Pessoa não encontrado!" })
    }
}

// validar os atributos do corpo
function validarAtributos(req, res, next) {
    const dadosRecebidos = req.body
    if (!dadosRecebidos.idade || !dadosRecebidos.email) {
        return res.status(400).json({ mensagem: "nome e idade são obrigatórios" })
    } else {
        next()
    }
}


// READ -> Buscar todos os produtos
router.get('/produtos', (req, res) => {
    res.status(200).json(listaProdutos)
})

// READ -> Busca de produto especifico
router.get('/produtos/:nome', validarProduto, (req, res) => {
    res.json(req.produto)
})


// CREATE -> Cadastro de um produto
router.post('/produtos', validarAtributos, (req, res) => {
    const dados = req.body

    const produto = {
        nome: Math.round(Math.random() * 1000),
        idade: dados.idade,
        email: dados.email,
        telefone: dados.telefone
    }

    listaProdutos.push(produto)

    res.status(201).json(
        {
            mensagem: "Pessoa cadastrado com sucesso!",
            pessoa
        }
    )
})

// UPDATE -> Alterar um produto
router.put('/produtos/:nome', validarAtributos, validarProduto, (req, res) => {
    const nome = req.params.nome
    const novosDados = req.body

    const index = listaProdutos.findIndex(produto => produto.nome == id)
    
    const produto = {
        nome: Number(nome),
        idade: novosDados.idade,
        email: novosDados.email,
        telefone: novosDados.telefone
    }

    listaProdutos[index] = produto

    res.status(200).json(
        {
            mensagem: "Produto alterado com sucesso!",
            produto
        }
    )
})

// DELETE -> Excluir produto
router.delete('/produtos/:nome', validarProduto, (req, res) => {
    const nome = req.params.nome
    const index = listaProdutos.findIndex(produto => produto.nome == nome)
    listaProdutos.splice(index, 1)
    res.status(200).json({ mensagem: "Pessoa excluida sucesso!" })
})




module.exports = router