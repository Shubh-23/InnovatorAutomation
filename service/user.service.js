const user = require('../model/user.model')
const sales = require('../model/sales.model')
const helper = require('../helper/common.helper')



class Users {


    async addEmployeeDetails(params) {
        try {
          const employeeId = await helper.generateRandomId();
          // Update the params object with the hashed password
  
      
          console.log("params", params);
      
          const data = {
            "admin_id":params.admin_id,
            "employee_id": employeeId,
            "employe_name": params.employe_name,
            "mobile_no": params.mobile_no,
            "address": params.address,
            "status": params.status,
            "gender": params.gender,
          };
          console.log(data);
          const UserData = new user(data);
      
          // Save the user data to the database using async/await
          const savedUserData = await UserData.save();
      
          console.log('User object with hashed password:', savedUserData);
      
          return savedUserData;
        } catch (error) {
          console.error('Error:', error);
          throw error; // Rethrow the error or handle it accordingly
        }
      }
      



    getAllEmployeeDetailByAdminId(params) {
        return user.forge().query((qb) => {
            qb.where({ "admin_id": params.admin_id })
        }).fetchAll().then((data) => {
            console.log(data);
            return data

        }).catch((err) => {
            return err
        })
    }

    getAllDetailsByEmployeeId(params) {
        console.log(params);
        return user.where({ id: params.id }).fetchAll({ withRelated: ['sales'] }).then((data) => {
            return data
        }).catch((err) => {
            return err
        })
    }

}

module.exports = new Users