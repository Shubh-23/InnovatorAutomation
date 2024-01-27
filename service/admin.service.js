const adminTable = require('../model/admin.model')
const user = require('../model/user.model')

const helper = require('../helper/common.helper')



class admin {


  async addAdminDetails(params) {
    try {
      // Hash the password using async/await
      const hashedPassword = await helper.hashPassword(params.password);
      // Update the params object with the hashed password
      params.password = hashedPassword;
      const data = {
        "name": params.name,
        "email": params.email,
        "password": params.password,
        "role": params.role,
      };
      const adminData = new adminTable(data);

      // Save the user data to the database using async/await
      const savedUserData = await adminData.save();

      console.log('User object with hashed password:', savedUserData);

      return savedUserData;
    } catch (error) {
      console.error('Error:', error);
      throw error; // Rethrow the error or handle it accordingly
    }
  }



  async getAdminDetails(params) {
    const hashedPassword = await helper.hashPassword(params.password);
    // Update the params object with the hashed password
    params.password = hashedPassword;
    console.log(params);
    return await adminTable.forge().query((qb) => {
        qb.where({ "email": params.email })
        qb.andWhere({ "status": 1 })
    }).fetch().then(async (user) => {
      console.log(user);
      if (user) {
        // User found, compare hashed passwords
        const isPasswordMatch = await helper.comparePassword(params.password, user.attributes.password);
        if (isPasswordMatch) {
          // Passwords match, you can proceed with additional actions
          console.log("Password matched");
          return user;
        } else {
          // Passwords do not match
          console.log("Password did not match");
          return null;
        }
      } else {
        // User not found
        console.log("User not found");
        return null;
      }
      }).catch((err) => {
        console.log(err);
        return err
      })

  }

  // getAllDetailsByUserId(params) {
  //     console.log(params);
  //     return user.where({ Id: params.userId }).fetchAll({ withRelated: ['sales'] }).then((data) => {
  //         return data
  //     }).catch((err) => {
  //         return err
  //     })
  // }



    async updateAdminNameById(params) {
      console.log(params);
      try {
        // Perform the update query
        const updatedRows = await adminTable
          .forge()
          .where({ id: params.id })
          .save({ name: params.name }, { method: 'update' });
    
        if (updatedRows > 0) {
          console.log(`Name updated successfully for admin with id ${params.id}`);
        } else {
          console.log(`Admin with id ${params.id} not found`);
        }
    
        return updatedRows;
      } catch (error) {
        console.error('Error updating name:', error);
        return null;
      }
      try {
        // Perform the delete query
        const deletedRows = await adminTable.forge().del();
    
        console.log(`${deletedRows} row(s) deleted from the adminTable.`);
        return deletedRows;
      } catch (error) {
        console.error('Error deleting data:', error);
        return null;
      }
    }
}

module.exports = new admin