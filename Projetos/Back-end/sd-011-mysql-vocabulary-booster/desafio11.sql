SELECT t1.contactName AS Nome,
t1.country AS 'País',
COUNT(*) - 1 AS 'Número de compatriotas'
FROM w3schools.customers AS t1, w3schools.customers AS t2
WHERE t1.country = t2.country
GROUP BY Nome, País
HAVING `Número de compatriotas` > 0
ORDER BY Nome;
