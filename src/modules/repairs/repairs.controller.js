import { RepairService } from "./repairs.service.js";

const repairsService = new RepairService();
export const findAllRepairs = async (req, res, next) => {
   try {
      const repairs = await repairsService.findAllRepairs();
      return res.status(200).json(repairs);
   } catch (error) {
      return res.status(500).json({
         status: "fail",
         message: "Something went very wrong! 💥",
      });
   }
};

export const findOneRepair = async (req, res, next) => {
   try {
      const { id } = req.params;
      const repair = await repairsService.findOneRepair(id);
      if (!repair) {
         return res.status(404).json({
            status: "error",
            message: `Repair with id: ${id} not found`,
         });
      }
      if (repair.status !== "pending") {
         return res.status(404).json({
            status: "error",
            message: `Repair its completed or cancelled`,
         });
      }
      return res.status(200).json(repair);
   } catch (error) {
      return res.status(500).json({
         status: "fail",
         message: "Something went very wrong! 💥",
      });
   }
};
export const createRepair = async (req, res, next) => {
   try {
      const { date, userId } = req.body;
      const repair = await repairsService.createRepair({ date, userId });
      return res.status(201).json(repair);
   } catch (error) {
      return res.status(500).json({
         status: "fail",
         message: "Something went very wrong! 💥",
      });
   }
};

export const updateRepair = async (req, res, next) => {
   try {
      const { id } = req.params;
      const repair = await repairsService.findOneRepair(id);
      if (!repair) {
         return res.status(404).json({
            status: "error",
            message: `Repair with id: ${id} not found`,
         });
      }
      if (repair.status !== "pending") {
         return res.status(404).json({
            status: "error",
            message: `Repair its already completed or cancelled`,
         });
      }
      const updatedRepair = await repairsService.updateRepair(repair);
      return res.status(200).json(updatedRepair);
   } catch (error) {
      return res.status(500).json({
         status: "fail",
         message: "Something went very wrong! 💥",
      });
   }
};

export const deleteRepair = async (req, res, next) => {
   try {
      const { id } = req.params;
      const repair = await repairsService.findOneRepair(id);
      if (!repair) {
         return res.status(404).json({
            status: "error",
            message: `Repair with id: ${id} not found`,
         });
      }
      if (repair.status === "completed") {
         return res.status(404).json({
            status: "error",
            message: `The repair is completed, it cannot be cancelled`,
         });
      }
      await repairsService.deleteRepair(repair);
      return res.status(204).json(null);
   } catch (error) {
      return res.status(500).json({
         status: "fail",
         message: "Something went very wrong! 💥",
      });
   }
};
