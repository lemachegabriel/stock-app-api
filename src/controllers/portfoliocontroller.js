const mongoose = require('mongoose')
const Portfolio = mongoose.model('Portfolio')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


module.exports = {
    async index(req, res){
        const token = req.cookies['stock-token2']
        if (!token) 
            return res.status(401).send({ auth: false, message: 'Token não informado.'})
             
        jwt.verify(token, process.env.AUTH_KEY, (err, decoded) => { 
            if (err) 
                return res.status(500).send({ auth: false, message: 'Token inválido.' });
            req.UserId = decoded.id
        })

        const data = await Portfolio.find()

        return res.json(data)
    },
    async create(req, res){
        const data = await Portfolio.create(req.body)

        return res.json(data)
    },
    async update(req, res){
        const token = req.cookies['stock-token2']
        if (!token) 
            return res.status(401).send({ auth: false, message: 'Token não informado.'})
             
        jwt.verify(token, process.env.AUTH_KEY, (err, decoded) => { 
            if (err) 
                return res.status(500).send({ auth: false, message: 'Token inválido.' });
            req.UserId = decoded.id
        })
        const ID = req.UserId
        const {ticker, price, quantity} = req.body
        if(price <= 0){
            return res.status(500).send({message: 'Error preço invalido'})
        }
        const postData = {
            "$push" : {
                "portfolio" : [
                    {
                        "ticker" : ticker,
                        "price" : price,
                        "quantity" : quantity
                    }
                ]
            }
        }
        const data = await Portfolio.findOneAndUpdate({"owner": ID}, postData, {new: true})
        return res.json(data)
    },
    async userStocks(req, res){
        const token = req.cookies['stock-token2']
        if (!token) 
            return res.status(401).send({ auth: false, message: 'Token não informado.'})
             
        jwt.verify(token, process.env.AUTH_KEY, (err, decoded) => { 
            if (err) 
                return res.status(500).send({ auth: false, message: 'Token inválido.' });
            req.UserId = decoded.id
        })
        const ID = req.UserId
        const data = await Portfolio.findOne({"owner": ID})

        return res.json(data)
    }
}