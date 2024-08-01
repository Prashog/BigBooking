const {CreateNewCityInDBService, GetAllCityFromDBService, UpdateACityInDBService, DeleteACityInDBService} = require("./../service/City.Service")

async function CreateNewCityConytoller(request, response){
    try{

        const { name, description, image, cuisines} = request.body

        const result = await CreateNewCityInDBService(name, image, description, cuisines)

        if(!result.success){
            throw new Error("CreateNewCityInDBService failed to complete task")
        }

        response.status(201).json({
            success : true,
            data : result.data
        })

    }catch(error){
        console.log(error)
        response.status(500).json({
            success : false,
            message : "Something went wrong" 
        })
    }
}

async function GetAllCityController(request, response){
    try{

        const result = await GetAllCityFromDBService()

        if(result.success){

            const DATA = result.data.map((element)=>{

                const {_id, name, description, cuisines, image} = element

                return {
                    id : _id,
                    name,
                    description,
                    cuisines,
                    image
                }
                
            })

            response.status(200).json({
                success : true,
                data : DATA
            })

        }else{
            throw new Error("GetAllCityFromDBService didn't give any city")
        }

    }catch(error){
        console.log(error)
        response.status(500).json({
            success : false,
            message : "Something went wrong" 
        })
    }
}

async function UpdateACityController(request, response){
    try{

        const {id : cityId} = request.query

        const {name, description, image, cuisines} = request.body

        const DATA = {}

        if(name){
            DATA.name = name
        }

        if(description){
            DATA.description = description
        }

        if(image){
            DATA.image = image
        }

        if(cuisines){
            DATA.cuisines = cuisines
        }

        const result = await UpdateACityInDBService(cityId, DATA)

        if(result.success){

           response.status(200).json({
                success : true,
                data : response.data
           })

        }else{
            throw new Error("UpdateACityInDBService didn't give result")
        }


    }catch(error){
        console.log(error)
        response.status(500).json({
            success : false,
            message : "Something went wrong" 
        })
    }
}

async function DeleteACityController(request, response) {
    try {
        const { id: cityId } = request.query;

        if (!cityId) {
            return response.status(400).json({
                success: false,
                message: "Missing required parameter: id"
            });
        }

        const result = await DeleteACityInDBService(cityId);

        if (result.success) {
            response.status(httpStatus.OK).json({
                success: true,
                message: result.message
            });
        } else {
            response.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: result.message
            });
        }
    } catch (error) {
        console.error("Error in DeleteACityController:", error);
        response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error deleting city'
        });
    }
}


module.exports = {
    CreateNewCityConytoller,
    GetAllCityController,
    UpdateACityController,
    DeleteACityController
}