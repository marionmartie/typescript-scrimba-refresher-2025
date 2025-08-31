/**
 * 1.8 Challenge: Create a Pizza object type. It should include a `name`
 * and a `price` property.
 */

type Pizza = {
    id: number,
    name: string,
    price: number,
}

/**
 * 1.10 Challenge: Add an Order type. It should have `id`, `pizza`, and `status` properties.
 * Look through the code if you need a reminder as to what data types those should be.
 */

/**
 * 1.14 Challenge: using literal types and unions, update the Order status so that
 * it can only ever be "ordered" or "completed"
 */

type Order = {
    id: number,
    pizza: Pizza,
    status: 'ordered' | 'completed',
}

let cashInRegister = 100
let nextOrderId: number = 0
let nextPizzaId = 1

const menu: Pizza[] = [
    { id: nextPizzaId++,name: "Margherita", price: 8 },
    { id: nextPizzaId++,name: "Pepperoni", price: 10 },
    { id: nextPizzaId++,name: "Hawaiian", price: 10 },
    { id: nextPizzaId++,name: "Veggie", price: 9 },
]


const orderHistory: Order[] = []

/**
 * 1.8.2 Challenge: teach TS that the pizzaObj is supposed to be a Pizza type.
 * Then like before, look through the code to see if there are any new
 * TS warnings to deal with (😉), and fix those issues
 */


function addNewPizza(pizzaObj: Pizza) {
    pizzaObj.id = nextPizzaId++
    menu.push(pizzaObj)
}

/**
 * Challenge part 1.5: Try to move the logic for adding an ID to the pizza objects 
 * inside the addNewPizza function, so that we can call addNewPizza with no id, and
 * the function will handle that part for us.
 * 
 * NOTE: you will run into TS warnings that we'll address soon, but the code should
 * still run.
 */

/**
 * Challenge part 1: Make it so we can use a global variable to track the nextPizzaId
 * and use the same trick we use with `nextOrderId++` when you're calling addNewPizza.
 * Update the menu items to use this as well so we don't have to manually enter ids 1-4
 * like we're currently doing
 */

/**
 * Write another utility function, placeOrder, that takes a pizza name parameter and:
 * 1. finds that pizza object in the menu,
 * 2. adds the income to the cashInRegister,
 * 3. pushes a new "order object" to the orderQueue 
 *    (e.g. { pizza: selectedPizzaObjectFromStep1, status: "ordered" })
 * 4. returns the new order object (just in case we need it later)
 */

function placeOrder(pizzaName: string) {
    let order = menu.find(pizzaObj => pizzaObj.name === pizzaName)
    if (!order || order === undefined) {
        console.error(`${order} does not exist in the menu`)
        return 
    }
    cashInRegister += order.price
    const newOrder: Order = { id: nextOrderId++, pizza: order, status: 'ordered' }
    nextOrderId = newOrder.id
    orderHistory.push(newOrder)
    return newOrder
}

/**
 * 1.2 Challenge: write another utility function, completeOrder, that takes an orderId as a parameter
 * finds the correct order in the orderQueue, and marks its status as "completed". For good measure,
 * return the found order from the function.
 * 
 * Note: you'll need to ensure that we're adding IDs to our orders when we create new orders. You can use a global `nextOrderId` variable and increment it every time a new order is created to simulate real IDs being managed for us by a database.
 */

/**
 * 
 * 1.6 Challenge: Teach TS what data type should be used for the 
 * orderId in the completeOrder function. Then check for any
 * additional warnings TS comes up with and fix those.
 */

function completeOrder(orderId: number) {
    let order = orderHistory.find(order => order.id === orderId)
    if (!order) {
        console.log(`${order} does not exist`);
        return
    }
    order.status = 'completed'
    return order
}

// Test functions
addNewPizza({ name: "Chicken Bacon Ranch", price: 12 })
addNewPizza({ name: "BBQ Chicken", price: 12 })
addNewPizza({ name: "Spicy Sausage", price: 11 })

placeOrder("Chicken Bacon Ranch")
completeOrder(1)

console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister)
console.log("Order queue:", orderHistory)