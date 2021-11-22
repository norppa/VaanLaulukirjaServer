const router = require('express').Router()
const db = require('better-sqlite3')('songs.db')

router.get('/', (req, res) => {
    const songs = db.prepare('SELECT * FROM songs').all()
    res.send(songs)
})

router.post('/', (req, res) => {
    const { title, lyrics } = req.body
    const result = db.prepare('INSERT INTO songs (title, lyrics) VALUES (?,?)').run(title, lyrics)
    if (result.changes !== 1) return res.status(500).send('Database failure')
    res.status(200).send()
})

router.put('/:id', (req, res) => {
    const { title, lyrics } = req.body
    const result = db.prepare('UPDATE songs SET title=?, lyrics=? WHERE id=?').run(title, lyrics, req.params.id)
    if (result.changes !== 1) return res.status(500).send('Database failure')
    res.status(200).send()
})

router.delete('/:id', (req, res) => {
    const result = db.prepare('DELETE FROM songs WHERE id=?').run(req.params.id)
    res.status(200).send()
})

module.exports = router