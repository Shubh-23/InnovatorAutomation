const adminService = require('../service/admin.service')

class admin{
    getAdminDetails(req,res){
        const params = req.body
        return adminService.getAdminDetails(params).then((data)=>{
            if(data){
                return res.json({"statusCode":200,"submitUserDetails":data,"message":"successfully"})
            }else{
                return res.json({"statusCode":500,"submitUserDetails":{},"message":"something went wrong"})
            }
        })
    }

    addAdminDetails(req,res){
        const params = req.body
        console.log("params");
        return adminService.addAdminDetails(params).then(data=>{
            if(data){
                return res.json({"statusCode":200,"AllCategories":data,"message":"successfully"})
            }
            else{
                return res.json({"statusCode":500,"UserDetails":{},"message":"something went wrong"})
            }
        })
    }

 
}

                

module.exports = new admin