const mongoose = require('mongoose')
const Portfolio = mongoose.model('Portfolio')

module.exports = {
    async index(req, res){
        const data = await Portfolio.find()

        return res.json(data)
    },
    async create(req, res){
        const data = await Portfolio.create(req.body)

        return res.json(data)
    },
    async update(req, res){
        const data = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {new: true})

        return res.send(data)
    },
    async userStocks(req, res){
        const data = await Portfolio.findById(req.params.id)

        return res.json(data)
    }
}