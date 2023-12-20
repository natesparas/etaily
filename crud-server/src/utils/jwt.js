const bcrypt = require('bcrypt')

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err)
            }

            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err)
                }

                resolve(hash)
            })
        })
    })
}

const checkDuplicate = (username, users) => {

    if (users.length > 0) {

        users = JSON.parse(users)
        const exist = users.find(item => item.username.toLowerCase() === username.toLowerCase())

        if (exist) {
            return true
        } else {
            return false
        }

    } else {
        return false
    }

}

module.exports = {
    hashPassword,
    checkDuplicate
}