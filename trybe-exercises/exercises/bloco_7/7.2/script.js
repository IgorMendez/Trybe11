const order = {
  name: 'Rafael Andrade',
  phoneNumber: '11-98763-1416',
  address: {
    street: 'Rua das Flores',
    number: '389',
    apartment: '701',
  },
  order: {
    pizza: {
      margherita: {
        amount: 1,
        price: 25,
      },
      pepperoni: {
        amount: 1,
        price: 20,
      }
    },
    drinks: {
      coke: {
        type: 'Coca-Cola Zero',
        price: 10,
        amount: 1,
      }
    },
    delivery: {
      deliveryPerson: 'Ana Silveira',
      price: 5,
    }
  },
  payment: {
    total: 60,
  },
};
  
const customerInfo = (order) => {
    return `Olá ${order.order.delivery.deliveryPerson}, entrega para: ${order.name}, Telefone:${order.phoneNumber}, ${order.address.street}, Nº: ${order.address.number}, AP: ${order.address.apartment}`
}

console.log(customerInfo(order));

// Exercício 2

const order2 = {
  name: 'Luiz Silva',
  phoneNumber: '11-98763-1416',
  address: {
    street: 'Rua das Flores',
    number: '389',
    apartment: '701',
  },
  order: {
    pizza: {
      margherita: {
        amount: 1,
        price: 25,
        sabor: ['muzzarella', 'calabresa']
      },
      pepperoni: {
        amount: 1,
        price: 20,
      }
    },
    drinks: {
      coke: {
        type: 'Coca-Cola Zero',
        price: 10,
        amount: 1,
      }
    },
    delivery: {
      deliveryPerson: 'Ana Silveira',
      price: 5,
    }
  },
  payment: {
    total: 60,
  },
};
  


const orderModifier = (order1) => {
  return `Olá ${order1.name}, o total do seu pedido de ${order1.order.pizza.margherita.sabor[0]}, ${order1.order.pizza.margherita.sabor[1]} e ${order1.order.drinks.coke.type} é ${order1.order.drinks.coke.price + order1.order.pizza.margherita.price*2}`

}

console.log(orderModifier(order2));


