# Setup Instructions

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project (or use an existing one)
   - Enable **Firestore Database** (Start in test mode for development)
   - Enable **Authentication** → Sign-in method → Email/Password → Enable

3. **Get Firebase Configuration**
   - In Firebase Console, go to Project Settings (gear icon)
   - Scroll down to "Your apps" section
   - Click on the Web icon (`</>`) to add a web app
   - Copy the Firebase configuration object

4. **Create `.env.local` file**
   ```bash
   # Copy the example file
   cp .env.example .env.local
   ```

5. **Fill in your Firebase config in `.env.local`**
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...your_actual_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
   NEXT_PUBLIC_ADMIN_EMAILS=your-email@example.com
   ```

6. **Create an admin user**
   - In Firebase Console → Authentication
   - Click "Add user"
   - Enter your email and password
   - Make sure this email matches what you put in `NEXT_PUBLIC_ADMIN_EMAILS`

7. **Run the development server**
   ```bash
   npm run dev
   ```

8. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - Go to `/admin/login` to sign in as admin

## Troubleshooting

### Error: "Firebase: Error (auth/invalid-api-key)"

This means your Firebase configuration is missing or incorrect. Check:
- ✅ `.env.local` file exists in the root directory
- ✅ All `NEXT_PUBLIC_*` variables are set correctly
- ✅ No typos in variable names
- ✅ Restart your dev server after changing `.env.local`

### Error: "Unauthorized" when accessing admin routes

- Make sure you've created a user in Firebase Authentication
- Make sure the user's email is in `NEXT_PUBLIC_ADMIN_EMAILS`
- Make sure you're signed in at `/admin/login`

### Firestore Permission Denied

For development, you can use test mode. For production, set up proper security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /jobs/{jobId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /applications/{applicationId} {
      allow create: if true;
      allow read: if request.auth != null;
    }
  }
}
```

## Next Steps

- Create your first job posting from the admin dashboard
- Customize the UI and branding
- Set up production deployment (Vercel recommended for Next.js)

