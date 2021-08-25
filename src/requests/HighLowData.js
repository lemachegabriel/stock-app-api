const axios = require('axios')
const mongoose = require('mongoose');
const stock = mongoose.model('stocks_information')

module.exports = {
    async GetVar() {
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        const HEADER = {"User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246"}
        const URL = 'https://statusinvest.com.br/acao/getaltabaixa?IndiceCode=ibovespa&Filter='
        const URL2 = 'https://statusinvest.com.br/acao/getaltabaixa?IndiceCode=&Filter='
        let data
        await axios.get(URL2, {headers:HEADER})
        .then((res) => {
            console.log('chamado')
            data = res.data
        }).catch((err) => {
            console.log(err)
        })

        for(let i=0; i<data.length; i++){
            let datares = await stock.findOne({'ticker': data[i]["code"]}) 
            if(datares){
                console.log(datares["_id"])
                await stock.findByIdAndUpdate({'_id': datares['_id']}, {'name': data[i]["companyNameClean"]}, {new:true})
            }else{
                console.log(data[i]["code"])
                //await stock.create({'ticker': data[i]['code']})
            }
        }
    }
}