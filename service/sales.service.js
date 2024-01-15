const employeeReportTable = require('../model/sales.model')
const promise = require('bluebird')
const moment = require('moment')

class Products {
    async inserReportDetailsByEmployeeId(params) {
        try{
        var loginTime = new Date(params.login_time)
        var logoutTime = new Date(params.logout_time)
        const data = {
            "employee_id": params.employee_id,
            "stick_count": params.stick_count,
            "reset_count": params.reset_count,
            "login_time": loginTime,
            "logout_time": logoutTime,
        }
        var responseData = []
        console.log(data);

            const employeeData = new employeeReportTable(data);

            // Save the user data to the database using async/await
            const savedEmployeeData = await employeeData.save();
  
        // console.log('User object with hashed password:', savedEmployeeData);
  
        return savedEmployeeData;
      } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error or handle it accordingly
      }

        // return await salesTable.forge().query((qb) => {
        //     qb.where({ "Date": date })
        //     qb.andWhere({ "user_id": params.userId })
        // }).fetchAll().then((result) => {

        //     if (result.length == 0) {
        //         const salesdata = new salesTable(data)
        //         return salesdata.save(null).tap(res => {
        //             return res
        //         }).catch((err) => {
        //             return err
        //         })

        //     } else {
        //       return  promise.all(result.models).each((res) => {
        //             console.log(res.get('user_id'))
        //             return salesTable.forge().query((qb) => {
        //                 qb.where({ "user_id": res.get('user_id') })
        //                 qb.andWhere({ "Date": date })
        //             }).fetch().then((response) => {
        //                 response.save(data, { patch: true }).then((updateData) => {
        //                     console.log(updateData);
        //                     responseData.push(updateData)
        //                     return responseData
        //                 })
        //                 return responseData
        //             })
        //         }).then((res)=>{
        //             return res
        //         })

        //     }
        // }).catch((err) => {
        //     return err
        // })


    }

    getReportDetailsByEmployeeId(params) {
        return employeeReportTable.forge().query((qb) => {
            qb.where({ "employee_id": params.employeeId })
        }).fetchAll().then((data) => {
            console.log(data);
            return data

        }).catch((err) => {
            return err
        })
    }

    getReportDetailsByAdminId(params) {
        return employeeReportTable.forge().query((qb) => {
            qb.where({ "employee_id": params.employeeId })
        }).fetchAll().then((data) => {
            console.log(data);
            return data

        }).catch((err) => {
            return err
        })
    }
    // getReportDetailsByEmployeeId(params) {
    //     var dateFrom  = new Date(params.Date)
    //     var dateTo = new Date()
    //     return salesTable.forge().query((qb) => {
    //         qb.whereBetween( "Date", [dateFrom, dateTo] )      
    //     }).fetchAll().then((data) => {
    //         return data
    //     }).catch((err) => {
    //         return err
    //     })
    // }


    getLastSevenDays(params) {
        var  dateTo
        var dateFrom
        console.log(params);
        if (params.length == 0) {
              dateTo = moment().format('YYYY-MM-DD');
             dateFrom = moment().subtract(7,'d').format('YYYY-MM-DD');
            }else{
            dateTo = moment().format('YYYY-MM-DD');
           dateFrom = moment().subtract(+params.dateCount,`${params.dateType}`).format('YYYY-MM-DD');
        }
            console.log(dateTo,dateFrom);
            return salesTable.forge().query((qb) => {
            qb.whereBetween( "Date", [dateFrom, dateTo] )      
        }).fetchAll().then((data) => {
            // console.log(data);
            return data
        }).catch((err) => {
            return err
        })
    }


    // getReportDetailsByEmployeeId(params) {
    //     var dateFrom  = new Date(params.Date)
    //     var dateTo = new Date()
    //     return salesTable.forge().query((qb) => {
    //         qb.whereBetween( "Date", [dateFrom, dateTo] )      
    //     }).fetchAll().then((data) => {
    //         return data
    //     }).catch((err) => {
    //         return err
    //     })
    // }

}

module.exports = new Products