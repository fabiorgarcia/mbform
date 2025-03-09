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

            //Validates fields
            if (service.naturalLegalPerson == 'natural') {
                if (service.email && service.name && service.cpf && service.birth && service.telephone && service.password ) {
                    res.json({ service, msg: "Service created successfully!"})
                } else {
                    res.json({ service, msg: "Error. Invalid fields."})
                }
            } else if (service.naturalLegalPerson == 'person') {
                if (service.email && service.corporate && service.cnpj && service.opening && service.telephoneCorporate && service.password ) {
                    res.json({ service, msg: "Service created successfully!"})
                } else {
                    res.json({ service, msg: "Error. Invalid fields."})
                }
            } else {
                const responseOk = 'ok';
                res.json({ responseOk, msg: "Service created successfully!"})
            }


        } catch (error) {
            console.log(error)
        }
    }

};

module.exports = servicecontroller;
