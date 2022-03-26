CREATE VIEW top_3_artistas AS
SELECT Ar.artista, COUNT(Ar.artista_id) AS seguidores
FROM SpotifyClone.artista AS Ar
INNER JOIN SpotifyClone.seguidores AS Ss
ON Ar.artista_id = Ss.artista_id
GROUP BY Ss.artista_id
ORDER BY COUNT(Ss.artista_id) DESC, Ar.artista
LIMIT 3;
