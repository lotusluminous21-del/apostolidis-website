# Firebase Hosting Deployment Guide (Dynamic)

## Overview
This guide describes how to deploy your Next.js website to Firebase Hosting using the modern **Web Frameworks** integration. This allows features like Middleware, automatic language detection, and Image Optimization to work natively.

## What's Been Set Up

1. **Firebase Configuration:**
   - `firebase.json` - Configured to use your project as the source.
   - `.firebaserc` - Linked to project `apostolidis-demo`.
   - `src/lib/firebase.ts` - Firebase SDK initialization.

2. **Middleware & Routing:**
   - `src/middleware.ts` - Restored for automatic `/el` and `/en` routing.
   - `next.config.ts` - Reverted to standard dynamic mode.

3. **CLI Tools:**
   - Global `firebase-tools` installed.
   - `webframeworks` experiment enabled.

## Deployment Steps

### Step 1: Login to Firebase
```bash
firebase login
```

### Step 2: Deploy
Because we are using the Frameworks integration, Firebase will handle the build process for you:
```bash
firebase deploy
```
*Note: This will build the project and set up a Cloud Function to handle the dynamic requests.*

## Advantages of this Method
- **Automatic Language Detection**: Middleware works perfectly.
- **No Build Crashes**: We avoid the "Static Export" prerendering issues.
- **Better SEO**: Dynamic sitemaps and robots.txt can be brought back easily.

## Managing Secrets
Sensitive information (like the Resend API key) should never be stored in the repository. We use Firebase Secrets to manage these securely.

### Setting a Secret
To add or update a secret:
```bash
firebase functions:secrets:set SECRET_NAME
```
Then follow the prompts to enter the value.

### Using Secrets in Functions
Secrets are accessed via environment variables in your functions. For example, in Python:
```python
import os
from firebase_functions import firestore_fn

@firestore_fn.on_document_created(secrets=["MY_SECRET"])
def my_function(event):
    secret_value = os.environ.get("MY_SECRET")
```

## Troubleshooting

### Cloud Functions Region
The deployment region is set to `europe-west3` (Frankfurt) to ensure the lowest latency for users in Greece and Europe. You can change this in `firebase.json`.

### Permissions
Ensure your Google account has the "Owner" or "Editor" role on the Firebase project to allow creating Cloud Functions.

## Preview Locally
To test how it will run on Firebase:
```bash
firebase emulators:start
```
