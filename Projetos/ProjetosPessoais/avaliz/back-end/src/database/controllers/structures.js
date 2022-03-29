const  { Cerca }  = require('../models');
const request = require('request');

const getAllCercas = (_req, res) => {
  try {
    return Cerca.findAll()
      .then((e) => res.status(200).json(e[0].dataValues))
  } catch (err) {
    return res.status(500).json({Erro: 'Erro interno', err})
  }
}

const isInPolugon = async (req, res) => {
  const { enderecoCompleto } = req.body
  const API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
  const API_KEY = '';

  const parseJson = (string) => {
    try{
      return JSON.parse(string);
    }catch(e) {
      return null;
    }
  }

  const doRequest = (url) =>{
    const promisseCallback = (resolve, reject) => {
      request(url, (error, response, body) => {
        if (error) reject(error);
        const data = parseJson(body);
        resolve(data);
      });
    };
    return new Promise(promisseCallback);
  }

  const getApiUrl = (address) => {
    return `${API_URL}?key=${API_KEY}&address=${encodeURI(address)}`;
  }

  const address = enderecoCompleto;

  (async () => {
    const apiUrl = getApiUrl(address);
    const data = await doRequest(apiUrl);
    
    if (!data || data.error_message) {
      const message = (data && data.error_message) ? data.error_message : 'Api Error';
      console.log(message);
      return;
    }
    
    return res.status(200).json(data.results[0].geometry.location)
  })();
}
module.exports = {
  getAllCercas,
  isInPolugon
}
