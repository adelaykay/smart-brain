export const handleImageGet = (req, res, db) => {
  const { id } = req.body
  db('users')
    .where('id', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries[0].entries))
    .catch(err => res.status(400).json('unable to get entries'))
}

export const handleApiCall = (req, res) => {
  const raw = JSON.stringify({
    user_app_id: {
      user_id: 'laykay',
      app_id: 'my-first-application',
    },
    inputs: [
      {
        data: {
          image: {
            url: req.body.input,
          },
        },
      },
    ],
  })

  const MY_PERSONAL_TOKEN = '9cb3220d5faa4b518e3332669a2e1953'

  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Key ' + MY_PERSONAL_TOKEN,
    },
    body: raw,
  }

  // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
  // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
  // this will default to the latest version_id

  fetch(
    `https://api.clarifai.com/v2/models/face-detection/outputs`,
    requestOptions
  )
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(console.log)
}
