import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const createRepairSchema = z.object({
  date: z.date({
    required_error: 'Date is required',
    invalid_type_error: "That's not a date!, correct date: YYYY-MM-DD",
  }),
  motorsNumber: z.string({ required_error: 'motorsNumber is required' }),
  description: z.string({ required_error: 'Description is required' }),
  userId: z
    .number({ required_error: 'userId is required' })
    .int({ invalid_type_error: 'The userId must be a integer' }),
  status: z.enum(['pending', 'completed', 'cancelled']).default('pending'),
});

export function validateRepairSchema(data) {
  const result = createRepairSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: repairData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    repairData,
  };
}
