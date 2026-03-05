# Deployment Guide

This guide covers deploying the portfolio website to various hosting platforms.

## 🚀 Recommended: Vercel (Easiest)

Vercel is the recommended platform as it's made by the creators of Next.js and offers the best performance.

### Steps:

1. **Create a Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub, GitLab, or Bitbucket

2. **Push Code to Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

3. **Deploy on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your Git repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"
   - Your site will be live in ~2 minutes!

4. **Custom Domain** (Optional)
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

### Automatic Deployments
- Every push to `main` branch triggers automatic deployment
- Preview deployments for pull requests

---

## 🔷 Alternative: Netlify

### Steps:

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Click "Deploy"

---

## 📦 Alternative: Static Export

If you want to host on traditional web servers:

1. **Update `next.config.ts`**:
   ```typescript
   const nextConfig: NextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   };
   ```

2. **Build Static Site**:
   ```bash
   npm run build
   ```

3. **Deploy the `out` folder** to:
   - GitHub Pages
   - AWS S3
   - Any static hosting service

---

## 🐳 Docker Deployment

### Dockerfile

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Build the app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Build and Run:

```bash
docker build -t dr-ohol-portfolio .
docker run -p 3000:3000 dr-ohol-portfolio
```

---

## 🌐 Environment Variables

If you add any environment variables in the future:

1. Create `.env.local` file:
   ```
   NEXT_PUBLIC_API_URL=https://api.example.com
   EMAIL_SERVICE_KEY=your_key_here
   ```

2. Add to `.gitignore` (already done)

3. Add to your hosting platform:
   - **Vercel**: Project Settings → Environment Variables
   - **Netlify**: Site settings → Build & deploy → Environment

---

## 📊 Performance Optimization

### Before Deployment:

1. **Optimize Images**: Use WebP format for better compression
2. **Enable Compression**: Most platforms do this automatically
3. **Check Lighthouse Score**:
   ```bash
   npm run build
   npm start
   # Open Chrome DevTools → Lighthouse
   ```

### After Deployment:

1. **Add Analytics** (Optional):
   - Vercel Analytics (built-in)
   - Google Analytics
   - Plausible

2. **Set up CDN**: Vercel/Netlify handle this automatically

3. **Monitor Performance**:
   - Use Vercel Speed Insights
   - Google PageSpeed Insights

---

## 🔒 Security

### Recommended Headers

For static deployments, add these headers:

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### SSL/HTTPS

- Vercel and Netlify provide free SSL certificates automatically
- For custom deployments, use Let's Encrypt

---

## 🔧 Troubleshooting

### Build Fails

1. Check Node version: `node -v` (should be 18+)
2. Clear cache:
   ```bash
   rm -rf .next node_modules
   npm install
   npm run build
   ```

### Styling Issues

1. Ensure Tailwind is properly configured
2. Check if PostCSS is working
3. Verify all CSS files are imported

### Deployment Issues on Vercel

1. Check build logs in Vercel dashboard
2. Verify all dependencies are in `package.json`
3. Ensure TypeScript has no errors

---

## 📱 Testing Before Deployment

```bash
# 1. Build the project
npm run build

# 2. Test production build locally
npm start

# 3. Open http://localhost:3000

# 4. Test on different devices/browsers
```

---

## 🎯 Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] Navigation works
- [ ] Forms submit properly
- [ ] Responsive on mobile
- [ ] Images load correctly
- [ ] Animations smooth
- [ ] No console errors
- [ ] Meta tags correct (SEO)
- [ ] Custom domain connected (if applicable)

---

## 💡 Tips

1. **Use Vercel** for zero-configuration deployment
2. **Enable automatic deployments** from your Git repository
3. **Set up preview deployments** for testing changes
4. **Monitor performance** with built-in analytics
5. **Keep dependencies updated** regularly

---

## 📞 Support

For deployment issues:
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Netlify: [docs.netlify.com](https://docs.netlify.com)
- Next.js: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)

---

**Congratulations! Your portfolio is ready to go live! 🎉**
