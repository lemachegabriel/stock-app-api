const mongoose = require('mongoose');
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authconfig = require('../config/auth.json')
const cookies= require('cookies')

module.exports = {
    async index(req, res) {
        const user = await User.find();

        return res.json(user);
    },
    async auth(req, res) {
        const {email, password} = req.body;
        const user = await User.findOne({email}).select('+password')

        if(!user){
            return res.status(400).send({err: "Usuario não encontrado"})
        }
        if(!await bcrypt.compare(password, user.password)){
            return res.status(400).send({error: "Senha invalida"})
        }
        user.password = undefined
        const token = jwt.sign({id: user.id}, authconfig.secret, {
            expiresIn: 86400
        })
        res.send({user,token});

        res.setHeader(
            "Set-Cookie",
            cookie.serialize("stock.token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              maxAge: 60 * 60,
              sameSite: "strict",
              path: "/",
            })
          );
    },
    async store(req, res) {
        const {email} = req.body;
        try{
            if(await User.findOne({email})){
                return res.status(400).send({ error: "Usuario ja existe" })
            }

            const user = await User.create(req.body);

            const token = jwt.sign({id: user.id}, authconfig.secret, {
                expiresIn: 86400
            })
            
            res.send({user, token});
        }catch(err){
            return res.status(400).send({error: "Registro falho"})
        }
        
    },
    async update(req, res) {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});

        return res.json(user); 
    },
    async destroy(req, res) {
        await User.findByIdAndRemove(req.params.id);

        return res.send('excluido');
    }
}