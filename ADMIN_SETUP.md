# Admin Login Setup Guide

## 🔐 How to Create an Admin User

You need to create a user account in Firebase Authentication before you can log in to the admin dashboard.

### Step 1: Create User in Firebase Console

1. **Go to Firebase Console**
   - Visit [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Select your project

2. **Navigate to Authentication**
   - Click on **Authentication** in the left sidebar
   - If you haven't enabled it yet, click **Get Started**

3. **Enable Email/Password Authentication**
   - Click on the **Sign-in method** tab
   - Find **Email/Password** in the list
   - Click on it and toggle **Enable**
   - Click **Save**

4. **Add a New User**
   - Go to the **Users** tab
   - Click **Add user** button (top of the page)
   - Enter your email address (e.g., `admin@example.com`)
   - Enter a password (minimum 6 characters)
   - Click **Add user**

### Step 2: Configure Admin Email

1. **Open your `.env.local` file**
   - In the root directory of your project
   - Find the line: `NEXT_PUBLIC_ADMIN_EMAILS=`

2. **Add your email address**
   ```env
   NEXT_PUBLIC_ADMIN_EMAILS=admin@example.com
   ```
   - Replace `admin@example.com` with the email you used in Firebase
   - For multiple admins, separate with commas:
   ```env
   NEXT_PUBLIC_ADMIN_EMAILS=admin1@example.com,admin2@example.com
   ```

3. **Restart your dev server**
   - Stop the server (Ctrl+C)
   - Run `npm run dev` again
   - **Important**: Changes to `.env.local` require a server restart!

### Step 3: Log In to Admin Dashboard

1. **Go to the login page**
   - Navigate to: `http://localhost:3000/admin/login`

2. **Enter your credentials**
   - Email: The email you created in Firebase
   - Password: The password you set in Firebase

3. **Click "Sign in"**

---

## 📝 Quick Setup Checklist

- [ ] Firebase Authentication enabled
- [ ] Email/Password sign-in method enabled
- [ ] User created in Firebase Authentication
- [ ] Email added to `NEXT_PUBLIC_ADMIN_EMAILS` in `.env.local`
- [ ] Dev server restarted after updating `.env.local`
- [ ] Can log in at `/admin/login`

---

## ❓ Troubleshooting

### "Access denied. Admin privileges required."

**Problem**: Your email is not in the admin list.

**Solution**:
1. Check `.env.local` has your email in `NEXT_PUBLIC_ADMIN_EMAILS`
2. Make sure there are no spaces: `admin@example.com` not `admin@example.com `
3. Restart your dev server

### "Invalid email or password"

**Problem**: Wrong credentials or user doesn't exist.

**Solution**:
1. Verify the user exists in Firebase Console → Authentication → Users
2. Check you're using the exact email (case-sensitive)
3. Try resetting the password in Firebase Console

### "Firebase: Error (auth/invalid-api-key)"

**Problem**: Firebase configuration is missing or incorrect.

**Solution**:
1. Check your `.env.local` file exists
2. Verify all `NEXT_PUBLIC_FIREBASE_*` variables are set
3. See `ENV_CHECKLIST.md` for validation

### Can't see "Add user" button

**Problem**: Authentication might not be enabled.

**Solution**:
1. Go to Authentication → Sign-in method
2. Enable Email/Password
3. Save and refresh

---

## 🎯 Example Setup

Let's say you want to create an admin with email `ruben@example.com`:

1. **In Firebase Console:**
   - Authentication → Users → Add user
   - Email: `ruben@example.com`
   - Password: `MySecurePassword123!`
   - Click Add user

2. **In `.env.local`:**
   ```env
   NEXT_PUBLIC_ADMIN_EMAILS=ruben@example.com
   ```

3. **Restart dev server:**
   ```bash
   npm run dev
   ```

4. **Log in:**
   - Go to `http://localhost:3000/admin/login`
   - Email: `ruben@example.com`
   - Password: `MySecurePassword123!`

---

## 🔒 Security Notes

- **Never commit `.env.local`** to git (it's already in `.gitignore`)
- Use strong passwords for admin accounts
- In production, consider using Firebase Custom Claims for admin roles instead of environment variables
- For multiple admins, separate emails with commas (no spaces)

---

## 📸 Visual Guide

### Firebase Console → Authentication → Users

```
┌─────────────────────────────────────┐
│  Authentication                     │
│                                     │
│  [Users] [Sign-in method] [Templates]│
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Users                        │ │
│  │                               │ │
│  │  [+ Add user]                 │ │
│  │                               │ │
│  │  Email          | Created     │ │
│  │  admin@ex.com   | 2024-01-15  │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Adding User Dialog

```
┌─────────────────────────────┐
│  Add user                   │
│                             │
│  Email:                     │
│  [admin@example.com      ]  │
│                             │
│  Password:                  │
│  [**********************]  │
│                             │
│  [Cancel]  [Add user]       │
└─────────────────────────────┘
```

---

That's it! Once you've created the user in Firebase and added the email to `.env.local`, you should be able to log in. 🎉

