import  {z} from 'zod'
export const companySchema = z.object({

    name: z.string(),

    logo: z.string().url(),

    industry: z.string(),

    location: z.string(),

    packageLPA: z.number(),

    positions: z.number(),

    minCGPA: z.number().min(0).max(10),

    deadline: z.string(),

    description: z.string(),

    status: z.enum([
        "Active",
        "Closed",
        "Upcoming"
    ]),

    jobRole: z.string(),

    requirements: z.array(z.string())
});