    const {request, response} = require("express");
    const db = require('../mongo/dbPool')
    const Administration = db.Administration
    const emitterUpdate = require('../messaging/emitter')


    module.exports.create = async (request, response) => {

        const {administration, isActive} = request.body
        let administrationObj = new Administration({
            administration: administration,
            isActive: isActive
        })
        administrationObj.save().then(data=>{
            return response.status(201).send(data)
        }).catch(err => {
            console.log(err)
            return response.status(500).send(err)
        })

    }

    module.exports.update = async (request, response, sendMessage) => {
        const {_id, administration, isActive} = request.body
        const filter = {_id:_id}
        emitterUpdate.emit('administration-update', filter);

        Administration.findOneAndUpdate(filter, {administration:administration, isActive:isActive},{new: true}).then(
            data=> {
                console.log(data)
                return response.status(201).send({message:"Η διεύθυνση ενημερώθηκε.", data : data})
            }
        ).catch(
                    err => {
                        console.log(err)
                        return response.status(500).send({message:'Αποτυχία ενημέρωσης διεύθυνσης'})
                    }
                )
    }

    module.exports.delete = async (request, response) => {

        const {administrationId } = request.params

        Administration.findByIdAndDelete(administrationId, (err)=>{
            if(err) {
                return response.status(500).send({message:"Σφάλμα στην απενεργοποίηση της διεύθυνσης."})
            }
            return response.status(200).send({message: "Η διευθυνση απενεργοποιήθηκε."})
        })


    }

    module.exports.getAll = async (request, response) => {
        try {
            const administrations = await Administration.find()
            return  response.status(200).send(administrations)
        }
        catch (exception) {
            return response.status(500).send({message: "Σφάλμα στην ανάκτηση διευθύνσεων."})
        }

    }

    module.exports.find = async (id) => {
        const admin = await Administration.find({_id:id})
        console.log(admin)
        return admin[0].isActive
    }