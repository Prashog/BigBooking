const AdventureDetailModel = require("./../model/AdventureDetail.Model")

async function CreateNewAdventureDetailInDbService(adventureId, subtitle, description, slots){
    try{

        const result = await AdventureDetailModel.create({
            adventureId,
            subtitle,
            description,
            slots
        })

        if(result){
            return {
                success : true,
                data : result
            }
        }else{
            throw new Error("CreateNewAdventureDetailInDbService unable to create new adventure detail")
        }

    }catch(error){
        console.log(error)
        return {
            success : false
        }
    }
}

module.exports = {
    CreateNewAdventureDetailInDbService
}