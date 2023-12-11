import { fastify } from 'fastify'
import {DatabaseMemory} from "./database-memory.js"

const server = fastify()
const database = new DatabaseMemory()

server.get('/', () => {
    return 'Olá Mundo'
})

server.post('/pizza', (request, reply) => {
    //const body = request.body//
   //console.log(body)//
   const { tamanho, sabor, preco } = request.body
    database.create({
        tamanho: tamanho,
        sabor: sabor,
        preco: preco,
    })
    console.log(database.list())
    return reply.status(201).send()
})

server.get('/pizza', (request) => {
    const search = request.query.search

    //console.log (search)

    const pizzas = database.list(search)

    return pizzas
})

server.put('/pizza/:id', (request, reply) => {

    const pizzaId = request.params.id
    const {tamanho, sabor, preco} = request.body
    const pizza = database.update(pizzaId, {
        tamanho,
        sabor,
        preco,
    })
    return reply.status(204).send()

})

server.delete('/pizzas/:id', (request, reply) =>{
    const pizzaId = request.params.id

    database.delete(pizzaId)

    return reply.status(204).send()
})

server.listen({
    port: 3333,
})