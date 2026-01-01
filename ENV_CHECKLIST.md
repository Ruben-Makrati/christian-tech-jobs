# .env.local Configuration Checklist

Use this checklist to verify your `.env.local` file is configured correctly.

## ✅ Required Variables (All must be set with real values)

Your `.env.local` file should have these 6 required variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy... (should start with "AIza")
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789 (numbers only)
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef (format: 1:numbers:web:letters)
```

## ⚠️ Recommended Variable

```env
NEXT_PUBLIC_ADMIN_EMAILS=your-email@example.com
```

## 🔍 Quick Validation

Check each line:

1. **NEXT_PUBLIC_FIREBASE_API_KEY**
   - ✅ Should start with `AIza`
   - ✅ Should be a long string (40+ characters)
   - ❌ Should NOT contain "your_" or "example"

2. **NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN**
   - ✅ Should end with `.firebaseapp.com`
   - ✅ Format: `project-id.firebaseapp.com`
   - ❌ Should NOT contain "your_" or "example"

3. **NEXT_PUBLIC_FIREBASE_PROJECT_ID**
   - ✅ Should be your Firebase project ID
   - ❌ Should NOT contain "your_" or "example"

4. **NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET**
   - ✅ Should end with `.appspot.com`
   - ✅ Format: `project-id.appspot.com`
   - ❌ Should NOT contain "your_" or "example"

5. **NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID**
   - ✅ Should be numbers only
   - ❌ Should NOT contain "your_" or "example"

6. **NEXT_PUBLIC_FIREBASE_APP_ID**
   - ✅ Format: `1:numbers:web:letters`
   - ✅ Example: `1:123456789:web:abcdef123456`
   - ❌ Should NOT contain "your_" or "example"

7. **NEXT_PUBLIC_ADMIN_EMAILS** (Recommended)
   - ✅ Should be a valid email address
   - ✅ Can be comma-separated for multiple admins
   - ✅ Example: `admin@example.com` or `admin1@example.com,admin2@example.com`

## 📝 Example of a GOOD .env.local file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz1234567890
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=my-project-12345.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=my-project-12345
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=my-project-12345.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890abcdef
NEXT_PUBLIC_ADMIN_EMAILS=admin@mycompany.com
```

## ❌ Common Mistakes:

1. ❌ Using placeholder values like `your_api_key_here`
2. ❌ Missing quotes around values with special characters
3. ❌ Having spaces around the `=` sign
4. ❌ Forgetting to restart the dev server after changes
5. ❌ Using `.env` instead of `.env.local`

## 🔗 Where to Get Your Firebase Config:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon ⚙️ → Project Settings
4. Scroll down to "Your apps" section
5. Click on the Web icon `</>` (or add a web app if you haven't)
6. Copy the config values

## ✅ After Configuration:

1. Save the `.env.local` file
2. **Restart your dev server** (stop with Ctrl+C and run `npm run dev` again)
3. The error should be gone!

