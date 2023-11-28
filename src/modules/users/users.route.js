import express from "express";
import {
   createUser,
   deleteUser,
   findAllUsers,
   findOneUserById,
   updateUser,
} from "./users.controller.js";

export const router = express.Router();

router.route("/").get(findAllUsers).post(createUser);

router.route("/:id").get(findOneUserById).patch(updateUser).delete(deleteUser);
