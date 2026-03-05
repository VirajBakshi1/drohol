# Quick Start Guide

Get the portfolio website running in 5 minutes!

## 🚀 Step 1: Open Terminal

Navigate to the portfolio folder:

```bash
cd /Users/purva/Desktop/dr_ohol/portfolio
```

## 📦 Step 2: Install Dependencies (if not already done)

```bash
npm install
```

This will install all required packages. Takes about 30 seconds.

## ▶️ Step 3: Start Development Server

```bash
npm run dev
```

## 🌐 Step 4: View Website

Open your browser and go to:

```
http://localhost:3000
```

The website should now be running!

## 📱 Step 5: Navigate Through Pages

Visit these pages to see all content:

- **Home**: http://localhost:3000
- **About**: http://localhost:3000/about
- **Research**: http://localhost:3000/research
- **Publications**: http://localhost:3000/publications
- **Awards**: http://localhost:3000/awards
- **Leadership**: http://localhost:3000/leadership
- **Students**: http://localhost:3000/guidance
- **Contact**: http://localhost:3000/contact

## 🛠️ Making Changes

### Update Personal Information
Edit: `data/resumeData.ts`

### Update Research Projects
Edit: `data/researchData.ts`

### Update Publications
Edit: `data/publicationsData.ts`

### Update Awards
Edit: `data/awardsData.ts`

### Update Student Data
Edit: `data/studentsData.ts`

### Change Colors
Edit: `tailwind.config.ts`

### Modify Styles
Edit: `app/globals.css`

## 🏗️ Build for Production

When ready to deploy:

```bash
npm run build
npm start
```

## 🚀 Deploy to Web

### Option 1: Vercel (Recommended - Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Sign up/login
3. Click "New Project"
4. Import this folder
5. Deploy!

Your site will be live at: `https://your-project-name.vercel.app`

### Option 2: Netlify

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `.next` folder
3. Done!

## 📖 Need More Help?

- Full documentation: See `README.md`
- Deployment guide: See `DEPLOYMENT.md`
- Project overview: See `PROJECT_OVERVIEW.md`

## ⚠️ Troubleshooting

### Server won't start?

```bash
# Stop any running processes
# Press Ctrl+C in terminal

# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

### Port 3000 already in use?

```bash
# Use different port
PORT=3001 npm run dev
```

Then visit: http://localhost:3001

### Changes not showing?

1. Save the file
2. Refresh browser (Cmd+R on Mac, Ctrl+R on Windows)
3. If still not working, restart server (Ctrl+C, then `npm run dev`)

## ✅ Checklist

- [ ] Node.js installed (version 18+)
- [ ] Terminal open in portfolio folder
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Visit http://localhost:3000
- [ ] Website loads correctly
- [ ] All pages accessible
- [ ] Ready to customize!

## 🎉 You're All Set!

The portfolio website is now running on your computer.

**Next Steps:**
1. Explore all pages
2. Make any customizations you need
3. Deploy when ready

Enjoy! 🚀
