import  {z} from 'zod'
export const companySchema = z.object({

    name: z.string(),

    logo: z.string(),

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
     eligibleBranches: z.array(z.string()),

    requirements: z.array(z.string())
});

export const updateCompanySchema = companySchema.partial();