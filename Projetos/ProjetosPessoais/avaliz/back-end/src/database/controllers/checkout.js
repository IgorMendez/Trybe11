const { SolicitacaoCliente } = require('../models');

const createNewRequest = async (req, res) => {
    try {
        const { serviceName, clienteData, linkRef, productId } = req.body[1]
        const { type } = JSON.parse(req.body[0])

        const { documentSign, checkout, Name, dataCar, date, cpfCnpj, Phone,
                Email, nameRecived, phoneRecived, placa, valorEstimadoCliente,
                houseNumber, complementAdress, address, district, City, State, cep,
                serviceTotalPrice, moreInfos 
            } = clienteData
        const personCpfOrCnpj = type === 1 ? `billing_cpf=${cpfCnpj}` :  `billing_cnpj_field=${cpfCnpj}`

        const firstName = Name.split(' ')[0]
        const lastName = Name.split(' ').slice(1).join(' ');
        const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '')

        const url = linkRef;
        const billing_id_product = `aero-add-to-checkout=${productId}`
        const billing_qty = `aero-qty=${serviceTotalPrice}`
        const billing_first_name = `billing_first_name=${firstName}`
        const billing_last_name = `billing_last_name=${lastName}`
        const billing_cellphone = `billing_cellphone=${Phone.replace('(', '').replace(')', '').replace('-', '').replace(' ', '')}`
        const billing_email = `billing_email=${Email}`
        const billing_address_1 = `billing_address_1=${address}`
        const billing_address_2 = complementAdress ? `billing_address_2=${complementAdress}` : `billing_address_2=`
        const billing_city = `billing_city=${City}`
        const billing_postcode = `billing_postcode=${cep}`
        const billing_state = `billing_state=${State}`
        const billing_number = `billing_number=${houseNumber}`
        const billing_neighborhood = `billing_neighborhood=${district}`


        /** Banco de Dados */
        await SolicitacaoCliente.create({
            serviceName, district, City, State, cep, serviceTotalPrice, moreInfos,
            documentSign: JSON.stringify(documentSign), checkout, Name,
            dataCar: JSON.stringify(dataCar), date, cpfCnpj,
            Phone, Email, nameRecived, phoneRecived, placa,
            valorEstimadoCliente, address: JSON.stringify(address), houseNumber,
            complementAdress, ip
        })


        return res.status(200).json({
            link: `${url}?${billing_id_product}&${billing_qty}&${billing_first_name}&` +
                `${billing_last_name}&${billing_cellphone}&${billing_email}&${billing_address_1}&` +
                `${billing_address_2}&${billing_city}&${billing_postcode}&${billing_state}&${billing_number}&${billing_neighborhood}&${personCpfOrCnpj}`,
        })
    } catch (e) {
        return res.status(400).json({
            error: 'Verifique os campos', messageError: e.message
        })
    }
}

module.exports = {
    createNewRequest
}


/*
    Se existir nameRecived, phoneRecived, inserir no lugar de Name, Phone; (questionar)
    Colocar no localStorage script imbutido, select cpf/cnpj (personType);
*/
