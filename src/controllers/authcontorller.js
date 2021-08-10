const mongoose = require('mongoose');
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authconfig = require('../config/auth.json')
const cookie = require('cookie')

require("dotenv").config();

module.exports = {
    async index(req, res) {
        const user = await User.find();

        return res.json(user);
    },
    async auth_cookies(req, res){
        res.cookie("stock-token", req.body.token,{
            maxAge:60*60*24,
            httpOnly:true,    
        })
          res.statusCode = 200;
          res.json({ success: true });
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
        res.cookie("stock-token", JSON.stringify(token),{
            expires : new Date(Date.now() + 900000),
            httpOnly: true,    
        })

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