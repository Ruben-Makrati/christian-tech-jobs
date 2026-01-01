export type JobType = "Intern" | "Full-time" | "Contract";
export type Location = "Remote" | "On-site" | "Hybrid";
export type JobStatus = "open" | "closed";

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  techStack: string[];
  jobType: JobType;
  location: Location;
  status: JobStatus;
  createdAt: Date | any; // Firestore Timestamp
}

export interface Application {
  id: string;
  jobId: string;
  name: string;
  email: string;
  resumeLink: string;
  appliedAt: Date | any; // Firestore Timestamp
}

export interface JobFormData {
  title: string;
  company: string;
  description: string;
  techStack: string[];
  jobType: JobType;
  location: Location;
  status: JobStatus;
}

export interface ApplicationFormData {
  name: string;
  email: string;
  resumeLink: string;
}

