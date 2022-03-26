CREATE VIEW top_2_hits_do_momento AS
SELECT
C.cancao,
COUNT(H.cancao_id) AS reproducoes
FROM SpotifyClone.cancao AS C
INNER JOIN SpotifyClone.historico_reproducao AS H
ON C.cancao_id = H.cancao_id
GROUP BY H.cancao_id
ORDER BY COUNT(H.cancao_id) DESC, C.cancao
LIMIT 2;
