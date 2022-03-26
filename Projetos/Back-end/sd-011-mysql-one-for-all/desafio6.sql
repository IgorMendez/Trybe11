CREATE VIEW faturamento_atual AS
SELECT
MIN(Vp.valor_plano) AS faturamento_minimo,
MAX(Vp.valor_plano) AS faturamento_maximo,
ROUND(AVG(Vp.valor_plano), 2) AS faturamento_medio,
SUM(Vp.valor_plano) AS faturamento_total
FROM SpotifyClone.plano AS Vp
INNER JOIN SpotifyClone.usuario AS U
ON Vp.plano_id = U.plano_id;
