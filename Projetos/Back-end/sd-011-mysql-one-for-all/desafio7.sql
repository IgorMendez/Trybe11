CREATE VIEW perfil_artistas AS
SELECT
A.artista,
Al.album,
COUNT(Ss.artista_id) AS seguidores
FROM SpotifyClone.artista AS A
INNER JOIN SpotifyClone.seguidores AS Ss
ON A.artista_id = Ss.artista_id
INNER JOIN SpotifyClone.album AS Al
ON Al.artista_id = A.artista_id
GROUP BY Ss.artista_id, Al.album
ORDER BY COUNT(Ss.artista_id) DESC, A.artista, Al.album;
