const { DeleteAdventuresInACityController } = require('../controller/Adventure.controller')
const AdventureModel = require('./../model/Adventure.Model')

async function CreateNewAdventureInDBService(cityId, name, category, images, duration, pricePerHead) {
    try {
        const result = await AdventureModel.create({
            cityId,
            name,
            category,
            images,
            duration,
            pricePerHead
        });

        if (result) {
            return {
                success: true,
                data: result
            };
        } else {
            throw new Error("CreateNewAdventureInDBService unable to create");
        }
    } catch (error) {
        console.error("Error in CreateNewAdventureInDBService:", error.message);
        return {
            success: false,
            message: error.message
        };
    }
}


async function GetAllAdventuresInACityFromDBService(cityId){
    try{

        const result = await AdventureModel.find(cityId)

        if(result){
            return {
                success : true,
                data : result
            }
        }else{
            throw new Error("GetAllAdventuresInACityFromDBService unable to find the adventures for cityId - " + cityId)
        }

    }catch(error){
        console.log(error)
        return {
            success : false
        } 
    }
}

async function DeleteAdventuresFromDBService(cityId) {
    try {
        const result = await AdventureModel.findByIdAndDelete( cityId );

        if (result) {
            return {
                success: true,
                message: `Successfully deleted adventure with ID: ${adventureId}`
            };
        } else {
            return {
                success: false,
                message: `No adventure found with ID: ${adventureId}`
            };
        }
    } catch (error) {
        console.error("Error in DeleteAdventureByIdService:", error);
        return {
            success: false,
            message: 'Error deleting adventure'
        };
    }
}

async function UpdateAdventuresInDBService(adventureId, updateData) {
    try {
        const result = await AdventureModel.findByIdAndUpdate(adventureId, updateData, { new: true });

        if (result) {
            return {
                success: true,
                data: result
            };
        } else {
            return {
                success: false,
                message: `No adventure found with ID: ${adventureId}`
            };
        }
    } catch (error) {
        console.error("Error in UpdateAdventuresInDBService:", error);
        return {
            success: false,
            message: 'Error updating adventure'
        };
    }
}

module.exports = {
    CreateNewAdventureInDBService,
    GetAllAdventuresInACityFromDBService,
    DeleteAdventuresFromDBService,
    UpdateAdventuresInDBService
}