DELIMITER $$

CREATE PROCEDURE albuns_do_artista(IN art_nome VARCHAR(100))
BEGIN
SELECT
A.artista,
Al.album
FROM SpotifyClone.artista AS A
INNER JOIN SpotifyClone.album AS Al
ON A.artista_id = Al.artista_id
WHERE A.artista = art_nome; 
END $$
