const {Service: ServiceModel} = require("../models/Service");

const servicecontroller = {

    create: async(req, res) => {
        try {

            const service = {
                email: req.body.email,
                naturalLegalPerson: req.body.naturalLegalPerson,
                name: req.body.name,
                cpf: req.body.cpf,
                birth: req.body.birth,
                telephone: req.body.telephone,
                corporate: req.body.corporate,
                cnpj: req.body.cnpj,
                opening: req.body.opening,
                telephoneCorporate: req.body.telephoneCorporate,
                password: req.body.password
            }

            const response = 'ok';
            res.json({ response, msg: "Serviço criado com sucesso!"})

        } catch (error) {
            console.log(error)
        }
    }

};

module.exports = servicecontroller;
