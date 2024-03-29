const employeeReportTable = require('../model/sales.model')
const promise = require('bluebird')
const moment = require('moment')

class Products {
    async inserReportDetailsByEmployeeId(params) {
        
        var responseData = []
        try {
            if (params.login_time == null || params.login_time.length == 0) {
                return 
            }
            const loginTime = new Date(params.login_time);
            let logoutTime;
        
            if (params.logout_time !== null) {
                logoutTime = new Date(params.logout_time);
            } else {
                logoutTime = params.logout_time;
            }
        
            const data = {
                "employee_id": params.employee_id,
                "stick_count": params.stick_count,
                "reset_count": params.reset_count,
                "login_time": loginTime,
                "logout_time": logoutTime,
            };
        
            const existingRecords = await employeeReportTable.forge()
                .query((qb) => {
                    qb.where({ "login_time": loginTime })
                        .andWhere({ "employee_id": params.employee_id });
                })
                .fetchAll();
        
            if (existingRecords.length === 0) {
                const employeedata = new employeeReportTable(data);
                const savedRecord = await employeedata.save(null);
                return savedRecord;
            } else {
                const updatedRecords = await Promise.all(existingRecords.models.map(async (res) => {
                    console.log(res.get('employee_id'));
        
                    const response = await employeeReportTable.forge()
                        .query((qb) => {
                            qb.where({ "employee_id": res.get('employee_id') })
                                .andWhere({ "login_time": loginTime });
                        })
                        .fetch();
        
                    if (response) {
                        const updateData = await response.save(data, { patch: true });
                        console.log(new Date(updateData.attributes.login_time));
                        responseData.push(updateData);
                        return responseData;
                    }
                }));
        
                return updatedRecords;
            }
        } catch (err) {
            console.error(err);
            throw err; // Rethrow the error to handle it at a higher level if needed
        }
        


    }

    getReportDetailsByEmployeeId(params) {
        return employeeReportTable.forge().query((qb) => {
            qb.where({ "employee_id": params.employeeId })
            qb.orderBy('login_time', 'desc');
        }).fetchAll().then((data) => {
            console.log(data);
            return data

        }).catch((err) => {
            return err
        })
        

    }

    deleteReportDetailByEmployeeId(params) {
        return employeeReportTable.forge().query((qb) => {
            qb.where({ "id": params.id })
            qb.del();
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
        var dateTo
        var dateFrom
        console.log(params);
        if (params.length == 0) {
            dateTo = moment().format('YYYY-MM-DD');
            dateFrom = moment().subtract(7, 'd').format('YYYY-MM-DD');
        } else {
            dateTo = moment().format('YYYY-MM-DD');
            dateFrom = moment().subtract(+params.dateCount, `${params.dateType}`).format('YYYY-MM-DD');
        }
        console.log(dateTo, dateFrom);
        return salesTable.forge().query((qb) => {
            qb.whereBetween("Date", [dateFrom, dateTo])
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

    // async getAllEmployeeCounts() {
    //     try {
    //         const employeeCounts = await employeeReportTable.query((qb) => {
    //             qb.select('employee_id')
    //                 .sum('reset_count as total_reset_count')
    //                 .sum('stick_count as total_stick_count')
    //                 .groupBy('employee_id');
    //         }).fetchAll();
    
    //         return employeeCounts.toJSON();
    //     } catch (err) {
    //         console.error(err);
    //         throw err;
    //     }
    // }
    
    // async getAllEmployeeCounts() {
    //     try {
    //         const employeeData = await employeeReportTable.query((qb) => {
    //             qb.select('employee_id','stick_count','reset_count')
    //                 .max('login_time as max_login_time')
               
    //                 .groupBy('employee_id');
    //         }).fetchAll();
    
    //         return employeeData.toJSON();
    //     } catch (err) {
    //         console.error(err);
    //         throw err;
    //     }
    // }
    async getAllEmployeeCounts() {
        try {
            const lastLoginData = await employeeReportTable.query((qb) => {
                qb.select('employee_id')
                    .max('login_time as last_login_time')
                    .groupBy('employee_id');
            }).fetchAll();
            
            const employeeData = await Promise.all(lastLoginData.map(async (data) => {
                const lastLogin = data.get('last_login_time');
                const employeeId = data.get('employee_id');
                
                const employeeInfo = await employeeReportTable.query((qb) => {
                    qb.where('employee_id', employeeId)
                        .andWhere('login_time', lastLogin)
                        .select('employee_id', 'login_time', 'stick_count', 'reset_count');
                }).fetch();
                
                return employeeInfo.toJSON();
            }));
            
            return employeeData;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

module.exports = new Products