const express = require('express');

const productRouter = require('./routers/products');
const saleRouter = require('./routers/sales');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/products', productRouter);
app.use('/sales', saleRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Aplicação rodando na porta ${PORT}`));
