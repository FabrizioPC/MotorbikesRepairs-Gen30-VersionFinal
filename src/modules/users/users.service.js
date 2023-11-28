import User from "./users.model.js";

export class UsersService {
   async findAllUsers() {
      return await User.findAll({
         where: {
            status: "available",
         },
      });
   }
   async findUserById(id) {
      return await User.findOne({
         where: {
            id,
         },
      });
   }
   async findUserByEmail(email) {
      return await User.findOne({
         where: {
            email,
         },
      });
   }
   async createUser(data) {
      return await User.create(data);
   }
   async updateUser(user, data) {
      return await user.update(data, { fields: ["name", "email"] });
   }
   async deleteUser(user) {
      return await user.update({ status: "disabled" });
   }
}
