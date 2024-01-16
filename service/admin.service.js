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

}

module.exports = new admin