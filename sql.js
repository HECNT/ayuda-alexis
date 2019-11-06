var usuario = 37553;
var pass = 'mi_password';
`
  SELECT
    *
  FROM
    usuario
  WHERE
    usuario_id = ${usuario}
  AND
    pass = ${pass}
`
