const handleSignin = (req, res, compare, db) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json('invalid form data')
  }
  db('login')
    .select('hash')
    .where('email', email)
    .then(user => {
      compare(password, user[0].hash, (err, isValid) => {
        if (err) console.log(err)
        else if (isValid) {
          db('users')
            .select('*')
            .where('email', email)
            .then(user => {
              res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to get user'))
        } else res.status(400).json('wrong credentials')
      })
    })
    .catch(err => res.status(400).json('wrong credentials'))
}

export default handleSignin
