const modeloUsuarios = {
    querygetUsuarios:  "SELECT * FROM Usuarios",
    querygetUsuariosByID:  ` SELECT *FROM Usuarios WHERE ID = ?`,
    querydeleteUsuariosByID: ` UPDATE Usuarios SET Activo = 'N' WHERE ID = ?` ,
 
    queryaddUser: `
    INSERT INTO Usuarios (
        Nombre_Usuario,
        DeptoU,
        Contraseña
    )VALUES(
    '?',
    '?',
    '?'
    )
`,
queryGetUSerInfo: `
            SELECT Usuarios, Nombre_Usuario, DeptoU, Contraseña
            FROM Usuarios 
            WHERE Usuarios = '?'
    `,
    queryupdateUserByeUsuario:` 
    UPDATE Usuarios SET
        Nombre_Usuarios = '?',
        DeptoU = '?',
        Contraseña = ? , 
    WHERE Usuarios = '?'`
}

const updateUsuarios = (
    Nombre_Usuarios,
    DeptoU,
    Contraseña
) => { 
    return`
        UPDATE Usuarios SET
            Nombre_Usuarios = '${Nombre_Usuarios}',
            DeptoU = ${DeptoU},
            Contraseña  = '${Contraseña}',
        WHERE Usuario = '${Usuarios}' 
    `
}

module.exports = {modeloUsuarios, updateUsuarios}