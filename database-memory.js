import { randomUUID } from "crypto"


export class DatabaseMemory{
    #pizzas = new Map()

list(search){
    return Array.from(this.#pizzas.entries()).map((pizzaArray) =>{
        const id = pizzaArray[0]

        const data = pizzaArray[1]
 
        return{
            id,
            ...data, 
        }
    })
        .filter(pizza => {
            if (search){  
            return pizza.sabor.includes(search)
            }
            return true
        })
        
    
}

    create(pizza){
        const pizzaId = randomUUID()
        this.#pizzas.set(pizzaId, pizza)
    }
    
    update(id, pizza){
        this.#pizzas.set(id, pizza)
    }

    delete(id, pizza){
        this.#pizzas.delete(id, pizza)
    }
}