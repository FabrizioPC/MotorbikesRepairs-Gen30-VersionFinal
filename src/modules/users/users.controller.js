import { UsersService } from "./users.service.js";

const usersService = new UsersService();

export const findAllUsers = async (req, res, next) => {
   try {
      const users = await usersService.findAllUsers();
      return res.status(200).json(users);
   } catch (error) {
      return res.status(500).json({
         status: "fail",
         message: "Something went very wrong! 💥",
      });
   }
};

export const createUser = async (req, res, next) => {
   try {
      const { name, email, password, role } = req.body;
      const userExist = await usersService.findUserByEmail(email);
      if (userExist) {
         return res.status(404).json({
            status: "error",
            message: `This email already exists and belongs to the user with the id: ${userExist.id}`,
         });
      }
      const newUser = await usersService.createUser({
         name,
         email,
         password,
         role,
      });
      return res.status(201).json(newUser);
   } catch (error) {
      return res.status(500).json({
         status: "fail",
         message: "Something went very wrong! 💥",
      });
   }
};

export const findOneUserById = async (req, res, next) => {
   try {
      const { id } = req.params;
      const user = await usersService.findUserById(id);
      if (!user) {
         return res.status(404).json({
            status: "error",
            message: `User with id: ${id} not found`,
         });
      }
      return res.status(200).json(user);
   } catch (error) {
      return res.status(500).json({
         status: "fail",
         message: "Something went very wrong! 💥",
      });
   }
};

export const updateUser = async (req, res, next) => {
   try {
      const { id } = req.params;
      const { name, email } = req.body;

      const user = await usersService.findUserById(id);

      if (!user) {
         return res.status(404).json({
            status: "error",
            message: `User with id: ${id} not found`,
         });
      }

      const updatedUser = await usersService.updateUser(user, { name, email });

      return res.status(200).json(updatedUser);
   } catch (error) {
      return res.status(500).json({
         status: "fail",
         message: "Something went very wrong! 💥",
      });
   }
};

export const deleteUser = async (req, res, next) => {
   try {
      const { id } = req.params;
      const user = await usersService.findUserById(id);
      if (!user) {
         return res.status(404).json({
            status: "error",
            message: `User with id: ${id} not found`,
         });
      }
      await usersService.deleteUser(user);
      return res.status(204).json(null);
   } catch (error) {
      return res.status(500).json({
         status: "fail",
         message: "Something went very wrong! 💥",
      });
   }
};
