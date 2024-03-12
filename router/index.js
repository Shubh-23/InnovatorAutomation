const express = require('express')
const route = express.Router()
const employeeController = require('../controller/user.controller')

const adminController = require('../controller/admin.controller')
const SalesController = require('../controller/sales.controller')

//admin route
// {"name": ,"email":"phone":"role_id":"password": }
route.post('/admin/getAdminDetails',adminController.getAdminDetails)      //done
// {"email":    "password": }
route.post('/admin/addAdminDetails',adminController.addAdminDetails)      //done

//employee
// {"admin_id":,"employee_id":,"employe_name":,"mobile_no":,"address":,"status":,"gender":,};
route.post('/user/addEmployeeDetails',employeeController.addEmployeeDetails)      //done

// {  adminId:"" }
route.get('/getAllEmployeeDetailByAdminId/:admin_id',employeeController.getAllEmployeeDetailByAdminId)   //done


route.get('/user/getAllDetailsByEmployeeId/:employeeId',employeeController.getAllDetailsByEmployeeId)   //done


//report

//{   "user_id":params.userId,"Amount":params.Amount,"Date":params.Date}
route.post('/report/inserReportDetailsByEmployeeId',SalesController.inserReportDetailsByEmployeeId)   //done


// {   "employeeId":}
// {   "employeeId":"2023/01/16"}
route.get('/report/getReportDetailsByEmployeeId/:employeeId',SalesController.getReportDetailsByEmployeeId)   //done


route.post('/admin/updateAdminNameById',adminController.updateAdminNameById)   //done



route.post('/report/deleteReportDetailByEmployeeId',SalesController.deleteReportDetailByEmployeeId)   //done
// {dateCount:1,dateType:'M'} // for the 1 month
// {dateCount:6,dateType:'M'} // for the 6 month
// {dateCount:1,dateType:'y'} // for the 1 year
route.post('/sales/getLastSevenDays',SalesController.getLastSevenDays)   //

route.get('/sales/getAllEmployeeCounts',SalesController.getAllEmployeeCounts)   //
module.exports = route