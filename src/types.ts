export interface ProjectApp {
  id: string;
  title: string;
  slug?: string;
  tagline: string;
  description: string;
  fullDescription?: string;
  problem?: string;
  solution?: string;
  role: string;
  impact?: string;
  whatILearned?: string;
  liveUrl: string;
  githubUrl?: string;
  category: 'Fullstack' | 'SaaS' | 'AI & Tech' | 'E-commerce' | 'Tools';
  tags: string[];
  featured: boolean;
  published?: boolean; // Draft / Published status (default: true)
  displayOrder?: number;
  image: string;
  gallery?: string[];
  metrics?: string;
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
  startDate?: string;
  endDate?: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Freelance' | 'Remote' | string;
  summary: string;
  responsibilities?: string[];
  achievements: string[];
  technologies: string[];
  companyUrl?: string;
  logo?: string;
  displayOrder?: number;
  published?: boolean; // Draft / Published status (default: true)
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

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company?: string;
  roleTitle?: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'archived';
}

export interface VisitorEvent {
  type: string;
  details?: string;
  timestamp: string;
}

export interface VisitorLog {
  id: string;
  visitorId: string;
  sessionId: string;
  timestamp: string;
  ip?: string;
  city?: string;
  region?: string;
  country?: string;
  countryCode?: string;
  isp?: string;
  org?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  device: 'Desktop' | 'Mobile' | 'Tablet' | string;
  browser: string;
  browserVersion?: string;
  os: string;
  screenResolution: string;
  windowSize?: string;
  referrer: string;
  language: string;
  colorScheme?: 'dark' | 'light';
  connectionType?: string;
  pagePath?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  refTag?: string;
  scrollDepth?: number;
  durationSeconds: number;
  events?: VisitorEvent[];
  visitedProjects?: string[];
  leadScore?: 'hot' | 'warm' | 'new' | 'casual';
  lastActive: string;
}

export interface UserProfile {
  fullName: string;
  title: string;
  headline: string;
  bio: string;
  aboutSummary?: string;
  avatarUrl: string;
  email: string;
  phone: string;
  location: string;
  dateOfBirth?: string;
  availableForHire: boolean;
  yearsOfExperience: number;
  completedProjectsCount: number;
  ctaText?: string;
  ctaLink?: string;
  seoTitle?: string;
  seoDescription?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    facebook?: string;
    telegram?: string;
    website?: string;
    youtube?: string;
  };
  cvDownloadUrl?: string;
  projects: ProjectApp[];
  experiences: WorkExperience[];
  educations: EducationItem[];
  skillCategories: SkillCategory[];
  certifications?: CertificationItem[];
  awards?: AwardItem[];
}
