const clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: '4271b38dc9014046b19b32e613cc15aa'
   });

const handleApiCall = (req,res) => {
    const { input } = req.body
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input) 
    .then(data => {
        res.json(data)
    })
}

const handleImage = (req, res, db) => {
    const { id } = req.body

    db('users').
    where({id}).
    increment('entries',1)
    .returning('entries')
    .then(entries => {
        if(entries.length > 0) {
            res.json({
                message: 'updated successfully',
                entries: entries[0]
            })
        }
        else{
            res.status(400).json('entries not found')
        }
    })
    .catch(err => res.status(400).json('unable to get entries'))
}
module.exports = {
    handleImage,
    handleApiCall
}