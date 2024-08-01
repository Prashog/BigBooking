const httpStatus = require("http-status")

const {CreateNewAdventureInDBService, GetAllAdventuresInACityFromDBService, DeleteAdventuresFromDBService, UpdateAdventuresInDBService}  = require('./../service/Adventure.Service')

async function CreateNewAdventureController(request, response) {
    try {
        const { id: cityId } = request.query;
        const { name, category, images, duration, pricePerHead } = request.body;

        if (!cityId || !name || !category || !images || !duration || !pricePerHead) {
            return response.status(400).json({
                success: false,
                message: "Missing required parameters"
            });
        }

        const result = await CreateNewAdventureInDBService(cityId, name, category, images, duration, pricePerHead);

        if (!result.success) {
            throw new Error("CreateNewAdventureInDBService failed to complete task");
        }

        response.status(201).json({
            success: true,
            data: result.data
        });

    } catch (error) {
        console.error("Error in CreateNewAdventureController:", error.message);
        response.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

/**********************************************************************
 * This function is a controller, which will help to get all adventures in a city
 * 
 * @param {Object} request - Request object of http request
 * @param {Object} response - Response object of http request
 * 
 * @return None
***********************************************************************/
async function GetAllAdventuresInACityController(request, response){
    try{

        const {id : cityId} = request.query

        const result = await GetAllAdventuresInACityFromDBService(cityId)

        if(result.success){
            response.status(httpStatus.OK).json({
                success : true,
                data : result.data
            })
        }else{
            throw new Error(`GetAllAdventuresInACityFromDBService didn't get any adventures for cityId : ${cityId}`)
        }

    }catch(error){
        console.log(error)
        response.status(500).json({
            success : false,
            message : "Something went wrong" 
        })   
    }
}

async function DeleteAdventuresInACityController(request,response) {
    try {

        const {id : cityId} = request.query
        
        const result = await DeleteAdventuresFromDBService(cityId);

        if (result.deletedCount === 1) {
            return { success: true };
        } else {
            return { success: false, message: 'Adventure not found' };
        }
    } catch (error) {
        console.error("Error deleting adventure:", error);
        return { success: false, message: 'Error deleting adventure' };
    }
}

async function UpdateAdventuresController(request, response) {
    try {
        const { id: adventureId } = request.query;
        const { name, category, images, duration, pricePerHead } = request.body;

        if (!adventureId) {
            return response.status(400).json({
                success: false,
                message: "Missing required parameter: id"
            });
        }

        const updateData = {};

        if (name) updateData.name = name;
        if (category) updateData.category = category;
        if (images) updateData.images = images;
        if (duration) updateData.duration = duration;
        if (pricePerHead) updateData.pricePerHead = pricePerHead;

        const result = await UpdateAdventuresInDBService(adventureId, updateData);

        if (result.success) {
            response.status(httpStatus.OK).json({
                success: true,
                data: result.data
            });
        } else {
            response.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: result.message
            });
        }
    } catch (error) {
        console.error("Error in UpdateAdventuresController:", error.message);
        response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

module.exports = {
    CreateNewAdventureController,
    GetAllAdventuresInACityController,
    DeleteAdventuresInACityController,
    UpdateAdventuresController
}