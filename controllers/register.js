const handleRegister = (req, res, hash, db) => {
  console.log(req.body)
  const { name, email, password } = req.body
  if (!email || !password || !name) {
    return res.status(400).json('invalid form data')
  }
  hash(password, 10, (err, hash) => {
    if (err) console.log(err)
    db.transaction(trx => {
      trx
        .insert({
          email: email,
          hash: hash,
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
          trx('users')
            .insert({
              email: email,
              name: name,
              joined: new Date(),
            })
            .returning('*')
            .then(user => {
              res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    }).catch(err => res.status(400).json('unable to register'))
  })
}

export default handleRegister
