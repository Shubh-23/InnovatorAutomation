const salesService = require('../service/sales.service')

class Products{
    inserReportDetailsByEmployeeId(req,res){
        const params = req.body
        return salesService.inserReportDetailsByEmployeeId(params).then((data)=>{
            if(data){
                return res.json({"statusCode":200,"inserReportDetailsByEmployeeId":data,"message":"successfully"})
            }else{
                return res.json({"statusCode":500,"inserReportDetailsByEmployeeId":{},"message":"something went wrong"})
            }
        })
    }
    getReportDetailsByEmployeeId(req,res){
        const params = req.params
        console.log(params);
        return salesService.getReportDetailsByEmployeeId(params).then(data=>{
            if(data){
                return res.json({"errorCode":"200","getReportDetailsByEmployeeId":data,"message":"successfully"})
            }
            else{
                return res.json({"errorCode":"500","getReportDetailsByEmployeeId":{},"message":"something went wrong"})
            }
        })
    }
    getReportDetailsByAdminId(req,res){
        const params = req.params
        return salesService.getReportDetailsByAdminId(params).then(data=>{
            if(data){
                return res.json({"errorCode":"200","getReportDetailsByEmployeeId":data,"message":"successfully"})
            }
            else{
                return res.json({"errorCode":"500","getReportDetailsByEmployeeId":{},"message":"something went wrong"})
            }
        })
    }

    deleteReportDetailByEmployeeId(req,res){
        const params = req.body
        console.log(params,"testt");
        return salesService.deleteReportDetailByEmployeeId(params).then(data=>{
            console.log("11111111111111111111111111111111111111",data.length);
            if(data.length){
                return res.json({"errorCode":"200","deleteReportDetailByEmployeeId":params,"message":"Delete Successfully"})
            }
            else{
                return res.json({"errorCode":"500","getReportDetailsByEmployeeId":{},"message":"something went wrong"})
            }
        })
    }

    getLastSevenDays(req,res){
        const params = req.body
        return salesService.getLastSevenDays(params).then(data=>{
            if(data){
                return res.json({"errorCode":"200","SalesbyDateDuration":data,"message":"successfully"})
            }
            else{
                return res.json({"errorCode":"500","SalesbyDateDuration":{},"message":"something went wrong"})
            }
        })
    }
}

                

module.exports = new Products