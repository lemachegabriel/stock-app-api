const axios = require('axios')

module.exports = {
    async getData(req, res) {
      
        const HEADER = {'User-Agent' : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246"}
        const RANGE = '1d'
        const INTERVAL = '1d'
        const {TICKER} = req.body
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${TICKER}.SA?region=US&lang=en-US&includePrePost=false&interval=${INTERVAL}&useYfid=true&range=${RANGE}&corsDomain=finance.yahoo.com&.tsrc=finance`
        
        let open, close, vari

        await axios.get(url, {headers:HEADER}).then((response) => {
            
            open = response.data['chart']['result'][0]['indicators']['quote'][0]['open'][0]
            close = response.data['chart']['result'][0]['indicators']['quote'][0]['close'][0]

            open = Math.round(open * 100)/100
            close = Math.round(close * 100)/100
            vari = (close / open - 1) * 100        
        })
        return res.json({open, close, vari})
    } 
}


