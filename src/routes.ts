import * as express from 'express';
import { Database } from './database';

const router = express.Router();
const db = new Database();

router.post('/users', (req, res) => {
    const user = req.body;
    db.addUser(user, (err) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        res.send({ message: 'User added successfully.' });
    });
});

router.get('/users/:id', (req, res) => {
    db.getUser(Number(req.params.id), (err, user) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        if (!user) {
            return res.status(404).send({ error: 'User not found.' });
        }
        res.send(user);
    });
});

router.delete('/users/:id', (req, res) => {
    db.deleteUser(Number(req.params.id), (err) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        res.send({ message: 'User deleted successfully.' });
    });
});

export default router;