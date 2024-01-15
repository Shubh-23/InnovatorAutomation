const userService = require('../service/user.service')

class User{
    addEmployeeDetails(req,res){
        const params = req.body
        return userService.addEmployeeDetails(params).then((data)=>{
            if(data){
                return res.json({"statusCode":200,"addEmployeeDetails":data,"message":"successfully"})
            }else{
                return res.json({"statusCode":500,"addEmployeeDetails":{},"message":"something went wrong"})
            }
        })
    }

    getAllEmployeeDetailByAdminId(req,res){
        const params = req.params
        console.log("params",params);
        return userService.getAllEmployeeDetailByAdminId(params).then(data=>{
            if(data){
                return res.json({"statusCode":200,"getAllEmployeeDetailByAdminId":data,"message":"successfully"})
            }
            else{
                return res.json({"statusCode":500,"getAllEmployeeDetailByAdminId":{},"message":"something went wrong"})
            }
        })
    }

    getAllDetailsByEmployeeId(req,res){
        const params = req.params
        return userService.getAllDetailsByEmployeeId(params).then(data=>{
            if(data){
                return res.json({"statusCode":200,"UserDetails":data,"message":"successfully"})
            }
            else{
                return res.json({"statusCode":500,"UserDetails":{},"message":"something went wrong"})
            }
        })
    }
}

                

module.exports = new User