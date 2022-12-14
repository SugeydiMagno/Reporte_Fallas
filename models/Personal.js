const modeloPersonal = {
    querygetPersonal:  "SELECT * FROM Personal",
    querygetPersonalByID:  ` SELECT *FROM Personal WHERE ID = ?`,
    querydeletePersonnalByID: ` UPDATE Personal SET Activo = 'N' WHERE ID_P = ?` ,

    queryaddUser: `
    INSERT INTO Usuarios (
        Nombre_Personal,
        DeptoP,
        Falla,
        Horario
    )VALUES(
    '?',
    '?',
    '?',
    '?'
    )
`,

queryGetPersonalInfo: `
            SELECT Personal, Nombre_Personal, DeptoP, Falla, Horario
            FROM Personal
            WHERE Personal = '?'
    `,

}

module.exports = {modeloPersonal}