 import  {z} from 'zod'
export const studentSchema = z.object({
    rollNo: z.string(),

    department: z.string(),

    year: z.number().min(1).max(4),

    cgpa: z.number().min(0).max(10),

    phone: z.string().length(10),

    skills: z.array(z.string()),

    about: z.string(),

    linkedin: z.string().url(),

    github: z.string().url()
});