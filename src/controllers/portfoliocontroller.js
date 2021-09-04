const mongoose = require('mongoose')
const Portfolio = mongoose.model('Portfolio')
const jwt = require('jsonwebtoken')

module.exports = {
    async create(req, res){
        const data = await Portfolio.create(req.body)
        return res.json(data)
    },

    async buy(req, res){
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
        const Money = (price * quantity) * -1
        const postData = {"$inc": {"money": Money} ,"$push" : {"portfolio" : [{"ticker" : ticker,"price" : price,"quantity" : quantity}]}}
        const data = await Portfolio.findOneAndUpdate({"owner": ID}, postData, {new: true})
        return res.json(data)
    },

    async sell(req, res){
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

        const Money = (price * quantity) 
        const postData = {"$inc": {"money": Money} ,"$pull" : {"portfolio" :{"ticker" : ticker}}}
        const data = await Portfolio.findOneAndUpdate({"owner": ID}, postData, {safe: true})

        return res.json(data)
    },

    async updatePortfolio(req, res){
        const {ticker, quantity, price} = req.body
        const token = req.cookies['stock-token2']
        if (!token) 
            return res.status(401).send({ auth: false, message: 'Token não informado.'})
             
        jwt.verify(token, process.env.AUTH_KEY, (err, decoded) => { 
            if (err) 
                return res.status(500).send({ auth: false, message: 'Token inválido.' });
            req.UserId = decoded.id
        })
        const ID = req.UserId
        /////////////////////////////////////////////////////////////////////////////////////////
        const portfolio = await Portfolio.findOne({"owner": ID})
        let i
        for(i=0; i<portfolio["portfolio"].length; i++){
            if(portfolio["portfolio"][i]["ticker"] == ticker){break}
        }
        const dataFil = portfolio["portfolio"][i]
        const oldPrice = dataFil["price"], oldQuant = dataFil["quantity"]
        ////////////////////////////////////////////////////////////////////////////////////////
        let adjPrice, Money = (price * quantity) * -1
        if(quantity>0){
            adjPrice = ((price * quantity) + (oldPrice * oldQuant)) /  (quantity + oldQuant)
        }else{adjPrice = oldPrice}
        adjPrice = Math.round(adjPrice * 100)/100
    
        ///////////////////////////////////////////////////////////////////////////////////////
        const query = {"owner": ID, "portfolio.ticker": ticker}
        const postData = {"$inc": {"money": Money, "portfolio.$.quantity": quantity}, "$set": {"portfolio.$.price": adjPrice}}
        const update = await Portfolio.updateOne(query, postData)

        return res.json(update)
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