import  {z} from 'zod'
export const updateStatusSchema = z.object({

    status: z.enum([
        "Applied",
        "Shortlisted",
        "Rejected",
        "Selected"
    ])

});