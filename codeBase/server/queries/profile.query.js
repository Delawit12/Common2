export default {
  updateProfile: `INSERT INTO usersProfile (userId, firstName, middleName, lastName, createdDate) VALUES (?,?,?,?,NOW());`,
  getUserById: `select * from users where userId = ?`,
  getUserProfile: `SELECT JSON_OBJECT(
    'userInfo', JSON_OBJECT(
        'userId', u.userId, 'userEmail', u.userEmail, 'userPhone', u.userPhone, 'companyRoles', cr.companyRoleName
    ), 'userProfile', JSON_OBJECT(
        'fname', up.firstName, 'lname', up.lastName, 'mname', up.middleName
    ), 'profilePictures', JSON_ARRAYAGG(
        JSON_OBJECT(
            'imageUrl', upic.imageUrl, 'pictureVisibility', upic.pictureVisibility
        )
    ), 'emailStatus', cv.emailStatus, 'phoneStatus', cv.phoneStatus
) AS userInfo
FROM
users u
LEFT JOIN usersRole ur ON u.userId = ur.userId
LEFT JOIN companyRoles cr ON ur.companyRoleId = cr.companyRoleId
LEFT JOIN usersProfile up ON u.userId = up.userId
LEFT JOIN contactVerification cv ON u.userId = cv.userId
LEFT JOIN usersPictures upic ON u.userId = upic.userId
WHERE
u.userId = ?;`,
};
