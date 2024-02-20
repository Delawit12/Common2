const messageQuery={
    getConversation: `SELECT 
    c.conversationId,
    JSON_OBJECT(
        'userId', u1.userId,
        'firstname', u1.firstName,
        'lastname', u1.lastName,
        'imageUrl', up1.imageUrl
    ) AS userOne,
    JSON_OBJECT(
        'userId', u2.userId,
        'firstname', u2.firstName,
        'lastname', u2.lastName,
        'imageUrl', up2.imageUrl
    ) AS userTwo,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'messageId', m.messageId,
            'createdDate', m.createdDate,
            'seen', m.seen,
            'senderId', m.senderId,
            'messageContent', JSON_OBJECT(
                'isText', mc.isText,
                'imageUrl', mc.imageUrl,
                'messageText', mc.messageText
            )
        )
    ) AS messages
FROM 
    conversations c
JOIN 
    users u1 ON c.userOneId = u1.userId
JOIN 
    users u2 ON c.userTwoId = u2.userId
LEFT JOIN 
    messages m ON c.conversationId = m.conversationId
LEFT JOIN 
    messageContent mc ON m.messageId = mc.messageId
LEFT JOIN
    usersPictures up1 ON u1.userId = up1.userId
LEFT JOIN
    usersPictures up2 ON u2.userId = up2.userId
WHERE
    u1.userId = ? OR u2.userId =?
GROUP BY 
    c.conversationId;`,
    getMessageById: `SELECT * from conversations where conversationId =?`,
    createConversation: `INSERT INTO conversations (userOneId, userTwoId) VALUES (?, ?);`,
    insertIntoMessage: `INSERT INTO messages (conversationId, senderId, createdDate, seen)
    VALUES (?, ?, now(), 0);`,
    insertIntoMessageContent: `INSERT INTO messageContent (messageId, isText, imageUrl, messageText)
    VALUES (?,?,?,?);`,
    getMessage: `SELECT 
    m.messageId,
    m.createdDate,
    m.seen,
    m.senderId,
    JSON_OBJECT(
        'isText', mc.isText,
        'imageUrl', mc.imageUrl,
        'messageText', mc.messageText
    ) AS messageContent
FROM 
    messages m
LEFT JOIN 
    messageContent mc ON m.messageId = mc.messageId
WHERE
    m.conversationId = ?;`,
    getcompanyRoleName: `SELECT companyRoleName FROM companyRoles WHERE companyRoleId = ?;`
}
export default messageQuery;

  