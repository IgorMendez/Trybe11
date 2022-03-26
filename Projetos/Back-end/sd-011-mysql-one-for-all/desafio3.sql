CREATE VIEW historico_reproducao_usuarios AS
SELECT
Us.usuario,
Ca.cancao AS nome
FROM SpotifyClone.usuario AS Us
INNER JOIN SpotifyClone.historico_reproducao AS Hc
ON Us.usuario_id = Hc.usuario_id
INNER JOIN SpotifyClone.cancao AS Ca
ON Ca.cancao_id = Hc.cancao_id
ORDER BY Us.usuario, Ca.cancao;
