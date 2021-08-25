const mongoose = require('mongoose');
const stock = mongoose.model('stocks_information')

module.exports = {
    async index(req, res) {
        const ativos = await stock.find({}, 'name ticker -_id');

        return res.json(ativos);
    },
    async show(req, res) {
        const ativos = await stock.findById(req.params.id);

        return res.json(ativos)
    },
    async store(req, res) {
        const ativos = await stock.create(req.body);

        return res.json(ativos);
    },
    async update(req, res) {
        const ativos = await stock.findByIdAndUpdate(req.params.id, req.body, {new: true});

        return res.json(ativos); 
    },
    async destroy(req, res) {
        await stock.findByIdAndRemove(req.params.id);

        return res.send('excluido');
    }
}