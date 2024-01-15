const bcrypt = require('bcrypt');
const saltRounds = 10;


class  helper{
    async hashPassword(password) {
        return new Promise((resolve, reject) => {
          bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
              reject(err);
            } else {
              resolve(hash);
            }
          });
        });
      }

    async comparePassword(enteredPassword,userPassword) {
        return new Promise(async (resolve, reject) => {
          try {
            const hashedPassword = await this.hashPassword(enteredPassword);
              const passwordMatches = await bcrypt.compare(enteredPassword, hashedPassword);
              if (passwordMatches) {
                console.log("Password is correct!");
                return resolve(true)
              } else {
                console.log("Password is incorrect.");
                return resolve(false)
              }
          } catch (error) {
              console.error("Error:", error);
          }
        });
      }

     generateRandomId() {
        const min = 100000000; // Minimum 9-digit number
        const max = 999999999; // Maximum 9-digit number

        return  Math.floor(Math.random() * (max - min + 1)) + min;

      
      }
      

      
}







module.exports = new helper