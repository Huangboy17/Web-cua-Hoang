export interface ProjectApp {
  id: string;
  title: string;
  tagline: string;
  description: string;
  liveUrl: string;
  githubUrl?: string;
  category: 'Fullstack' | 'SaaS' | 'AI & Tech' | 'E-commerce' | 'Tools';
  tags: string[];
  featured: boolean;
  image: string;
  metrics?: string;
  role: string;
  challenges?: string[];
  keyFeatures: string[];
  demoAccount?: {
    username: string;
    password?: string;
    note?: string;
  };
  completionYear: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Freelance' | 'Remote';
  summary: string;
  achievements: string[];
  technologies: string[];
  companyUrl?: string;
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  period: string;
  major: string;
  description?: string;
}

export interface SkillCategory {
  categoryName: string;
  skills: {
    name: string;
    level: number; // 1-100
    icon?: string;
    experience?: string;
  }[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface AwardItem {
  id: string;
  title: string;
  awarder: string;
  date: string;
  description?: string;
}

export interface UserProfile {
  fullName: string;
  title: string;
  headline: string;
  bio: string;
  avatarUrl: string;
  email: string;
  phone: string;
  location: string;
  dateOfBirth?: string;
  availableForHire: boolean;
  yearsOfExperience: number;
  completedProjectsCount: number;
  socialLinks: {
    github?: string;
    linkedin?: string;
    facebook?: string;
    telegram?: string;
    website?: string;
  };
  cvDownloadUrl?: string;
  projects: ProjectApp[];
  experiences: WorkExperience[];
  educations: EducationItem[];
  skillCategories: SkillCategory[];
  certifications?: CertificationItem[];
  awards?: AwardItem[];
}
