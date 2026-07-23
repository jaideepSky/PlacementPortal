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

export const updateStudentSchema = z.object({
  name:z.string(),
  phone: z.string().optional(),
  about: z.string().optional(),
  cgpa: z.coerce.number().min(0).max(10).optional(),
  skills: z.array(z.string()).optional(),

  linkedin: z.string().url().optional().or(z.literal("")),

  github: z.string().url().optional().or(z.literal("")),

  name: z.string().min(3).optional(),
});