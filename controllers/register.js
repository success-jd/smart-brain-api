
const handleRegister =  (req, res,db,bcrypt,saltRounds) => {
    const { name,email,password } = req.body
    if(!email || !name || !password) {
        return res.status(400).json("incorrect form details")
    }
    const hashPassword = bcrypt.hashSync(password,saltRounds)
    db.transaction(trx => {
        trx.insert({
            email: email,
            hash: hashPassword
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
               return trx('users')
                .returning('*')
                .insert({
                    name: name,
                    email: loginEmail[0],
                    joined: new Date()
                })
                .then(user => {
                    res.json({
                        message: "successfully registered",
                        user: user[0]
                    })
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json(err))

}

module.exports = {
    handleRegister: handleRegister 
}