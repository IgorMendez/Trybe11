SELECT p.productName AS Produto,
MIN(od.quantity) AS 'Mínima',
MAX(od.quantity) AS 'Máxima',
ROUND(AVG(od.quantity), 2) AS 'Média'
FROM w3schools.order_details AS od
INNER JOIN w3schools.products AS p
ON od.ProductID = p.ProductID
GROUP BY Produto
HAVING Média > 20
ORDER BY Média, Produto;
