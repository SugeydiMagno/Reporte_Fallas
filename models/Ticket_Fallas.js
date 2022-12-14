const modeloTicket_Fallas = {
    querygetTicket:  "SELECT * FROM Ticket",
    querygetTicketByID:  ` SELECT *FROM Ticket WHERE ID = ?`,
    querydeleteTIcketByID: ` UPDATE TIcket SET Activo = 'N' WHERE ID_T = ?` ,

    queryaddTicket: `
    INSERT INTO Ticket_Fallas (
        Resp,
        DeptoT,
        Especificaciones,
        TipFalla,
        Fecha ,
        PersonAsign
    )VALUES(
    '?',
    '?',
    '?',
    '?',
    '?',
    '?'
    )
`,

queryGetTicketInfo: `
            SELECT Ticket_Fallas,
            Resp,
            DeptoT,
            Especificaciones,
            TipFalla,
            Fecha ,
            PersonAsign

            FROM Ticket_Fallas
            WHERE Ticket_Fallas = '?'
    `,

}

module.exports = {modeloTicket_Fallas}