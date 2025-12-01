# GitHub Pages Deployment Guide

## Prerequisites
1. Make sure you have a GitHub repository created
2. Your repository should be named appropriately (e.g., `scale-github-actions`)
3. Git should be initialized in your project

## Setup Instructions

### 1. Update Configuration
The following files have been configured for GitHub Pages deployment:

- `package.json`: Added homepage URL and deployment scripts
- `.env`: Added PUBLIC_URL configuration
- `App.jsx`: Added basename configuration for React Router

### 2. Update Repository-Specific Settings

**Important**: Update the repository name in the following locations:

1. In `package.json`, update the homepage URL:
   ```json
   "homepage": "https://YOURUSERNAME.github.io/YOUR-REPOSITORY-NAME"
   ```

2. In `App.jsx`, update the basename:
   ```jsx
   <Router basename={process.env.NODE_ENV === 'production' ? '/YOUR-REPOSITORY-NAME' : ''}>
   ```

### 3. Initialize Git and Connect to GitHub

```bash
# Navigate to your project directory
cd "C:\Users\paulj\OneDrive\Desktop\Scale Github Actions"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit - Prepare for GitHub Pages deployment"

# Add your GitHub repository as remote origin
git remote add origin https://github.com/YOURUSERNAME/YOUR-REPOSITORY-NAME.git

# Push to main branch
git branch -M main
git push -u origin main
```

### 4. Deploy to GitHub Pages

```bash
# Navigate to frontend directory
cd frontend

# Build and deploy to GitHub Pages
npm run deploy
```

This command will:
- Build your React app (`npm run build`)
- Create a `gh-pages` branch in your repository
- Push the build files to that branch
- Make your site available at `https://YOURUSERNAME.github.io/YOUR-REPOSITORY-NAME`

### 5. Enable GitHub Pages (First time only)

1. Go to your GitHub repository
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Select **gh-pages** branch and **/ (root)** folder
6. Click **Save**

### 6. Subsequent Deployments

For future updates, simply run:
```bash
npm run deploy
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm run deploy` - Build and deploy to GitHub Pages
- `npm test` - Run tests

## Important Notes

1. **Repository Name**: Make sure to replace `scale-github-actions` with your actual repository name in both `package.json` and `App.jsx`

2. **Custom Domain** (Optional): If you have a custom domain, create a `CNAME` file in the `public` folder with your domain name

3. **Environment Variables**: GitHub Pages only supports environment variables that start with `REACT_APP_`

4. **Routing**: The app uses React Router with Hash Router fallback for GitHub Pages compatibility

5. **Assets**: All assets should use relative paths, which is already configured

## Troubleshooting

- **404 on refresh**: This is normal for SPAs on GitHub Pages. The app will redirect properly
- **Blank page**: Check that the homepage URL in package.json matches your repository name
- **CSS/JS not loading**: Ensure PUBLIC_URL is set correctly in .env file

## File Structure After Deployment
```
your-repo/
├── main branch (source code)
└── gh-pages branch (built files - auto-generated)
```

Your site will be available at: `https://YOURUSERNAME.github.io/YOUR-REPOSITORY-NAME`