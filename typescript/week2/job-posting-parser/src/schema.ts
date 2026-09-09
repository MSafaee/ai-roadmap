import * as z from "zod"; 

const seniority = [
    "intern",
    "entry",
    "junior",
    "mid",
    "senior",
    "manager",
    "director",
] as const;

export const JobSchema = z.object({
    title: z.string().describe(
        "The exact job title as written in the job advertisement."
    ),
    skills: z.array(z.string()).describe(
      "A list of technical and professional skills explicitly mentioned as required or preferred in the advertisement. Include programming languages, frameworks, libraries, databases, cloud platforms, and relevant tools."
    ),
    seniority: z.enum(seniority).describe(
      "The seniority level of the position. Infer it from the job title and required years of experience when it is not explicitly stated."
    ),
    remote: z.boolean().describe(
      "True if the job explicitly allows working remotely, either fully remote or partially remote. False if the job is explicitly on-site."
    ),
});

