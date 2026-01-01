# Firebase Firestore Database Structure

This document shows the database structure and sample data for the Christian Tech Jobs application.

## 📊 Collections Overview

The database has **2 main collections**:
1. `jobs` - Stores job postings
2. `applications` - Stores job applications

---

## 📁 Collection: `jobs`

Each document in the `jobs` collection represents a single job posting.

### Document Structure

```typescript
{
  id: string,                    // Auto-generated document ID
  title: string,
  company: string,
  description: string,
  techStack: string[],           // Array of technology names
  jobType: "Intern" | "Full-time" | "Contract",
  location: "Remote" | "On-site" | "Hybrid",
  status: "open" | "closed",
  createdAt: Timestamp           // Firestore Timestamp
}
```

### Sample Documents

#### Example 1: Full-time Remote Developer

```json
{
  "title": "Senior Full Stack Developer",
  "company": "FaithTech Solutions",
  "description": "We are looking for an experienced full stack developer to join our team. You will work on building modern web applications using React and Node.js. This is a remote position with flexible hours.\n\nRequirements:\n- 5+ years of experience\n- Strong knowledge of React, Node.js, and TypeScript\n- Experience with cloud services (AWS, Firebase)\n- Passion for building products that serve the Christian community",
  "techStack": [
    "React",
    "Node.js",
    "TypeScript",
    "Firebase",
    "AWS",
    "PostgreSQL"
  ],
  "jobType": "Full-time",
  "location": "Remote",
  "status": "open",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### Example 2: Intern Position

```json
{
  "title": "Software Engineering Intern",
  "company": "Christian Dev Academy",
  "description": "Join our internship program and learn from experienced developers. You'll work on real projects, learn best practices, and grow your skills in a supportive Christian environment.\n\nWhat you'll learn:\n- Modern web development\n- Team collaboration\n- Agile methodologies\n- Code reviews and best practices",
  "techStack": [
    "JavaScript",
    "React",
    "Python",
    "Git"
  ],
  "jobType": "Intern",
  "location": "Hybrid",
  "status": "open",
  "createdAt": "2024-01-20T14:15:00Z"
}
```

#### Example 3: Contract Position

```json
{
  "title": "Frontend Developer (Contract)",
  "company": "Gospel Media",
  "description": "We need a skilled frontend developer for a 6-month contract to help us rebuild our website. You'll work with our design team to create a beautiful, responsive user experience.\n\nProject details:\n- 6-month contract\n- Remote work available\n- Start date: February 2024",
  "techStack": [
    "React",
    "Next.js",
    "Tailwind CSS",
    "TypeScript"
  ],
  "jobType": "Contract",
  "location": "Remote",
  "status": "open",
  "createdAt": "2024-01-18T09:00:00Z"
}
```

#### Example 4: Closed Position

```json
{
  "title": "Backend Developer",
  "company": "Scripture Tech",
  "description": "This position has been filled. Thank you for your interest!",
  "techStack": [
    "Node.js",
    "Express",
    "MongoDB",
    "Docker"
  ],
  "jobType": "Full-time",
  "location": "On-site",
  "status": "closed",
  "createdAt": "2023-12-10T11:20:00Z"
}
```

---

## 📁 Collection: `applications`

Each document in the `applications` collection represents a job application submitted by a candidate.

### Document Structure

```typescript
{
  id: string,                    // Auto-generated document ID
  jobId: string,                 // Reference to the job document ID
  name: string,                  // Applicant's full name
  email: string,                 // Applicant's email address
  resumeLink: string,            // URL to resume (Google Drive, Dropbox, etc.)
  appliedAt: Timestamp          // Firestore Timestamp
}
```

### Sample Documents

#### Example 1: Application for Senior Developer Position

```json
{
  "jobId": "abc123xyz",  // ID of the job from jobs collection
  "name": "John Smith",
  "email": "john.smith@example.com",
  "resumeLink": "https://drive.google.com/file/d/1a2b3c4d5e6f/view",
  "appliedAt": "2024-01-16T15:30:00Z"
}
```

#### Example 2: Application for Intern Position

```json
{
  "jobId": "def456uvw",
  "name": "Sarah Johnson",
  "email": "sarah.j@example.com",
  "resumeLink": "https://www.linkedin.com/in/sarahjohnson",
  "appliedAt": "2024-01-21T10:45:00Z"
}
```

#### Example 3: Application for Contract Position

```json
{
  "jobId": "ghi789rst",
  "name": "Michael Chen",
  "email": "mchen@example.com",
  "resumeLink": "https://dropbox.com/s/xyz123/resume.pdf",
  "appliedAt": "2024-01-19T16:20:00Z"
}
```

---

## 🗂️ Visual Database Structure

```
Firestore Database
│
├── jobs (collection)
│   ├── abc123xyz (document)
│   │   ├── title: "Senior Full Stack Developer"
│   │   ├── company: "FaithTech Solutions"
│   │   ├── description: "..."
│   │   ├── techStack: ["React", "Node.js", ...]
│   │   ├── jobType: "Full-time"
│   │   ├── location: "Remote"
│   │   ├── status: "open"
│   │   └── createdAt: Timestamp
│   │
│   ├── def456uvw (document)
│   │   └── ...
│   │
│   └── ghi789rst (document)
│       └── ...
│
└── applications (collection)
    ├── app001 (document)
    │   ├── jobId: "abc123xyz"
    │   ├── name: "John Smith"
    │   ├── email: "john.smith@example.com"
    │   ├── resumeLink: "https://..."
    │   └── appliedAt: Timestamp
    │
    ├── app002 (document)
    │   └── ...
    │
    └── app003 (document)
        └── ...
```

---

## 📝 Field Types in Firestore

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Job title |
| `company` | string | Company name |
| `description` | string | Job description (can include newlines) |
| `techStack` | array | Array of strings (technology names) |
| `jobType` | string | One of: "Intern", "Full-time", "Contract" |
| `location` | string | One of: "Remote", "On-site", "Hybrid" |
| `status` | string | One of: "open", "closed" |
| `createdAt` | timestamp | Firestore Timestamp (auto-generated) |
| `jobId` | string | Reference to job document ID |
| `name` | string | Applicant's full name |
| `email` | string | Applicant's email address |
| `resumeLink` | string | URL to resume (must be valid URL) |
| `appliedAt` | timestamp | Firestore Timestamp (auto-generated) |

---

## 🔍 Query Examples

### Get all open jobs
```javascript
// In Firestore Console or code
jobs.where('status', '==', 'open')
    .orderBy('createdAt', 'desc')
```

### Get jobs by location
```javascript
jobs.where('location', '==', 'Remote')
    .where('status', '==', 'open')
```

### Get applications for a specific job
```javascript
applications.where('jobId', '==', 'abc123xyz')
            .orderBy('appliedAt', 'desc')
```

---

## 🚀 How to Add Sample Data

### Option 1: Using Firebase Console (Web UI)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click on **Firestore Database**
4. Click **Start collection** (if empty) or **Add document**
5. Collection ID: `jobs`
6. Add the fields manually using the sample data above

### Option 2: Using the Admin Dashboard

1. Sign in as admin at `/admin/login`
2. Go to `/admin`
3. Click **Create New Job**
4. Fill in the form with sample data
5. Submit to create a job in the database

### Option 3: Using Firebase CLI (Advanced)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize (if not done)
firebase init firestore

# Use the emulator or import data
```

---

## 📋 Sample Data for Testing

Here's a complete set of sample data you can use to populate your database:

### Jobs Collection

**Job 1:**
- Title: "Full Stack Developer"
- Company: "Christian Tech Co"
- Description: "We're looking for a talented full stack developer..."
- Tech Stack: React, Node.js, TypeScript, MongoDB
- Job Type: Full-time
- Location: Remote
- Status: open

**Job 2:**
- Title: "Frontend Developer Intern"
- Company: "Faithful Apps"
- Description: "Join our internship program..."
- Tech Stack: React, JavaScript, CSS
- Job Type: Intern
- Location: Hybrid
- Status: open

**Job 3:**
- Title: "Backend Developer (Contract)"
- Company: "Scripture Systems"
- Description: "6-month contract position..."
- Tech Stack: Node.js, Express, PostgreSQL
- Job Type: Contract
- Location: Remote
- Status: open

---

## ⚠️ Important Notes

1. **Document IDs**: Firestore auto-generates document IDs (like `abc123xyz`)
2. **Timestamps**: Use Firestore Timestamp type, not JavaScript Date
3. **Arrays**: `techStack` is stored as an array of strings
4. **Case Sensitivity**: Field values are case-sensitive ("open" ≠ "Open")
5. **Required Fields**: All fields shown above are required by the application

---

## 🔐 Security Rules (Recommended)

For production, set up Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Jobs: Anyone can read, only authenticated users can write
    match /jobs/{jobId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Applications: Anyone can create, only authenticated users can read
    match /applications/{applicationId} {
      allow create: if true;
      allow read: if request.auth != null;
    }
  }
}
```

---

This structure matches exactly what the application expects. Use these samples as a reference when creating jobs through the admin dashboard!

