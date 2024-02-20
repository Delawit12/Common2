const messageQuery={
    getConversation: `SELECT * from conversations where userOneId=? and userTwoId=?`,
    createConversation: `INSERT INTO conversations (userOneId, userTwoId) VALUES (?, ?);`,
    insertIntoMessage: `INSERT INTO messages (conversationId, senderId, createdDate, seen)
    VALUES (?, ?, now(), 0);`,
    insertIntoMessageContent: `INSERT INTO messageContent (messageId, isText, imageUrl, messageText)
    VALUES (?,?,?,?);`,
    getMessage: `SELECT * FROM messages WHERE conversationId = ?; `,
    getcompanyRoleName: `SELECT companyRoleName FROM companyRoles WHERE companyRoleId = ?;`
}
export default messageQuery;

  