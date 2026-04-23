interface SkillRecord {
    id:string;
    title: string;
    slug: string;
    description: string;
    category: string;
    tags: string[];
    installCommand: string;
    authorClerkId: string;
    authorEmail: string;
    createdAt: string | null;
   
}