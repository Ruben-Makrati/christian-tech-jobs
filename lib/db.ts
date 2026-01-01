import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { db } from './firebase';
import { Job, Application } from '@/types';

// Check if Firebase is initialized
const checkFirebase = () => {
  if (!db) {
    const errorMessage = 
      'Firebase is not initialized. Please check your .env.local file.\n\n' +
      'Required environment variables:\n' +
      '  - NEXT_PUBLIC_FIREBASE_API_KEY\n' +
      '  - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN\n' +
      '  - NEXT_PUBLIC_FIREBASE_PROJECT_ID\n' +
      '  - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET\n' +
      '  - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID\n' +
      '  - NEXT_PUBLIC_FIREBASE_APP_ID\n\n' +
      'Get your Firebase config from: https://console.firebase.google.com/';
    throw new Error(errorMessage);
  }
};

// Jobs collection
const JOBS_COLLECTION = 'jobs';
const APPLICATIONS_COLLECTION = 'applications';

// Convert Firestore data to Job
const jobFromFirestore = (doc: QueryDocumentSnapshot<DocumentData>): Job => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    createdAt: data.createdAt?.toDate() || new Date(),
  } as Job;
};

// Convert Firestore data to Application
const applicationFromFirestore = (doc: QueryDocumentSnapshot<DocumentData>): Application => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    appliedAt: data.appliedAt?.toDate() || new Date(),
  } as Application;
};

// Get all jobs with filters and pagination
export const getJobs = async (
  filters?: {
    status?: 'open' | 'closed';
    jobType?: string;
    location?: string;
    techStack?: string;
  },
  pagination?: {
    limitCount?: number;
    lastDoc?: QueryDocumentSnapshot<DocumentData>;
  }
): Promise<{ jobs: Job[]; lastDoc: QueryDocumentSnapshot<DocumentData> | null }> => {
  checkFirebase();
  try {
    let q = query(collection(db, JOBS_COLLECTION));

    // Apply filters
    if (filters?.status) {
      q = query(q, where('status', '==', filters.status));
    }
    if (filters?.jobType) {
      q = query(q, where('jobType', '==', filters.jobType));
    }
    if (filters?.location) {
      q = query(q, where('location', '==', filters.location));
    }

    // Order by createdAt descending
    q = query(q, orderBy('createdAt', 'desc'));

    // Apply pagination
    if (pagination?.lastDoc) {
      q = query(q, startAfter(pagination.lastDoc));
    }
    if (pagination?.limitCount) {
      q = query(q, limit(pagination.limitCount));
    }

    const snapshot = await getDocs(q);
    const jobs = snapshot.docs.map(jobFromFirestore);
    const lastDoc = snapshot.docs[snapshot.docs.length - 1] || null;

    // Filter by techStack on client side (Firestore doesn't support array-contains easily with other filters)
    let filteredJobs = jobs;
    if (filters?.techStack) {
      filteredJobs = jobs.filter(job => 
        job.techStack.some(tech => 
          tech.toLowerCase().includes(filters.techStack!.toLowerCase())
        )
      );
    }

    return { jobs: filteredJobs, lastDoc };
  } catch (error) {
    console.error('Error getting jobs:', error);
    throw error;
  }
};

// Get a single job by ID
export const getJobById = async (id: string): Promise<Job | null> => {
  checkFirebase();
  try {
    const docRef = doc(db, JOBS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return jobFromFirestore(docSnap as QueryDocumentSnapshot<DocumentData>);
    }
    return null;
  } catch (error) {
    console.error('Error getting job:', error);
    throw error;
  }
};

// Create a new job
export const createJob = async (jobData: Omit<Job, 'id' | 'createdAt'>): Promise<string> => {
  checkFirebase();
  try {
    const docRef = await addDoc(collection(db, JOBS_COLLECTION), {
      ...jobData,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
};

// Update a job
export const updateJob = async (id: string, jobData: Partial<Job>): Promise<void> => {
  checkFirebase();
  try {
    const docRef = doc(db, JOBS_COLLECTION, id);
    await updateDoc(docRef, jobData);
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
};

// Delete a job
export const deleteJob = async (id: string): Promise<void> => {
  checkFirebase();
  try {
    const docRef = doc(db, JOBS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
};

// Create an application
export const createApplication = async (
  applicationData: Omit<Application, 'id' | 'appliedAt'>
): Promise<string> => {
  checkFirebase();
  try {
    const docRef = await addDoc(collection(db, APPLICATIONS_COLLECTION), {
      ...applicationData,
      appliedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating application:', error);
    throw error;
  }
};

// Get applications for a job
export const getApplicationsByJobId = async (jobId: string): Promise<Application[]> => {
  checkFirebase();
  try {
    const q = query(
      collection(db, APPLICATIONS_COLLECTION),
      where('jobId', '==', jobId),
      orderBy('appliedAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(applicationFromFirestore);
  } catch (error) {
    console.error('Error getting applications:', error);
    throw error;
  }
};

