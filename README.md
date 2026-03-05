# Dr. Shantipal S. Ohol - Academic Portfolio Website

A premium, fully responsive portfolio website built with Next.js 14, showcasing the academic and research accomplishments of Dr. Shantipal S. Ohol, Associate Professor at COEP Technological University, Pune.

## 🚀 Features

- **Premium Light Theme Design**: Elegant glassmorphism effects with soft gradients
- **Fully Responsive**: Optimized for all devices from mobile to desktop
- **Smooth Animations**: Framer Motion animations throughout for professional feel
- **Complete Data Coverage**: All resume information included
- **8 Comprehensive Pages**:
  - Home with hero section and stats
  - About with timeline and qualifications
  - Research with tabbed interface
  - Publications with filtering
  - Awards showcase
  - Leadership & Affiliations
  - Students & Guidance
  - Contact with functional form

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Custom components with ShadCN-inspired design

## 📁 Project Structure

```
portfolio/
├── app/                      # Next.js app directory
│   ├── about/               # About page
│   ├── research/            # Research page with tabs
│   ├── publications/        # Publications with filters
│   ├── awards/              # Awards showcase
│   ├── leadership/          # Leadership & affiliations
│   ├── guidance/            # Students & guidance
│   ├── contact/             # Contact page with form
│   ├── layout.tsx           # Root layout with navbar/footer
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # Reusable components
│   ├── ui/                  # UI components
│   │   ├── Card.tsx         # Card components
│   │   └── AnimatedSection.tsx
│   ├── Navbar.tsx           # Navigation bar
│   └── Footer.tsx           # Footer
├── data/                    # Data files
│   ├── resumeData.ts        # Personal info, experience, etc.
│   ├── researchData.ts      # Research projects, PhD, patents
│   ├── publicationsData.ts  # Publications data
│   ├── awardsData.ts        # Awards data
│   └── studentsData.ts      # Student projects & achievements
├── lib/                     # Utility functions
│   └── utils.ts
├── public/                  # Static assets
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies

```

## 🎨 Design Features

### Color Palette
- **Primary**: Royal Blue (#2563eb to #1e40af)
- **Accent**: Soft Teal (#14b8a6) & Deep Indigo (#4f46e5)
- **Background**: Soft white with subtle gradients

### UI Elements
- **Glassmorphism Cards**: Translucent cards with backdrop blur
- **Smooth Hover Effects**: Scale and shadow animations
- **Gradient Buttons**: Eye-catching CTAs
- **Sticky Navbar**: Transparent to glass effect on scroll
- **Custom Scrollbar**: Branded scrollbar design

### Animations
- **Fade-in on Scroll**: All sections animate as they enter viewport
- **Stagger Animations**: Cards animate sequentially
- **Hover Interactions**: Lift and glow effects
- **Page Transitions**: Smooth navigation feel

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📊 Data Structure

All data is organized in TypeScript files under `/data`:

- **resumeData.ts**: Personal info, qualifications, experience, memberships, grants
- **researchData.ts**: Projects, PhD guidance, patents
- **publicationsData.ts**: Books, journals, conferences
- **awardsData.ts**: International, national, and institute awards
- **studentsData.ts**: Student projects and achievements

### Updating Data

To update any information:

1. Navigate to the appropriate data file in `/data`
2. Modify the TypeScript objects
3. The changes will automatically reflect on the website

Example:
```typescript
// data/resumeData.ts
export const personalInfo = {
  name: "Dr. Shantipal Suresh Ohol",
  designation: "Associate Professor...",
  // ... update any field
};
```

## 🎯 Pages Overview

### 1. Home (`/`)
- Hero section with name and summary
- Animated statistics
- About summary
- Current portfolios
- Featured awards
- Call-to-action sections

### 2. About (`/about`)
- Professional philosophy
- Academic qualifications with icons
- Animated experience timeline (Industrial & Teaching)
- Professional memberships grid

### 3. Research (`/research`)
- Tabbed interface (Projects, PhD, Patents, Grants)
- Completed and ongoing projects
- PhD guidance tracking
- Patent awards and filings
- Research grants overview

### 4. Publications (`/publications`)
- Filter tabs (All, Books, Journals, Conferences)
- Publication statistics
- 91 total publications listed
- Organized by category with metadata

### 5. Awards (`/awards`)
- Statistics by category
- International awards (5)
- National awards (4)
- Institute-level awards (10)
- Award cards with year badges

### 6. Leadership (`/leadership`)
- Present portfolios (9+)
- Professional affiliations (7)
- Industry coalitions (6)
- Visual statistics summary

### 7. Students & Guidance (`/guidance`)
- Student statistics
- Student achievements
- Competition mentorship
- MTech project samples
- Impact summary

### 8. Contact (`/contact`)
- Contact information
- Research interests
- Functional contact form
- Form validation and submission

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to change the color scheme:

```typescript
colors: {
  primary: {
    // Your custom colors
  },
}
```

### Fonts
Default font is Inter. To change, update in `app/layout.tsx`:

```typescript
import { YourFont } from 'next/font/google';
```

### Animations
Adjust animation delays and durations in component files using Framer Motion props:

```typescript
transition={{ duration: 0.6, delay: 0.2 }}
```

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

All components adapt gracefully to different screen sizes.

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📝 License

This portfolio website is created for Dr. Shantipal S. Ohol. All rights reserved.

## 👤 About Dr. Shantipal S. Ohol

- **Position**: Associate Professor, Mechanical Engineering Department
- **Institution**: COEP Technological University, Pune
- **Expertise**: Robotics, Automation, Mechatronics
- **Experience**: 27+ years in academia
- **Research**: 26 international journals, 54 international conferences, 4 patents

## 📧 Contact

For any queries about this website:
- Email: sso.mech@coep.ac.in
- Email: shantipalso@gmail.com

---

Built with ❤️ using Next.js 14, TypeScript, and Tailwind CSS
