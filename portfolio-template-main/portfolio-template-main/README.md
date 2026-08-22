Portfolio Template - Documentation &amp; Guide
A customizable personal portfolio website built with React, TypeScript, and Tailwind CSS.
Features interactive elements, smooth animations, dark/light mode, and a clean design.
1. Getting Started
Prerequisites
• Node.js (v16 or higher)
• npm or yarn
Installation
1. Clone the repository:
git clone https://github.com/cupidbity/portfolio-template.git
cd portfolio-template
2. Install dependencies:
npm install
3. Set up environment variables:
cp .env.example .env
4. Start the development server:
npm run dev
5. Build for production:
npm run build
2. Customization Guide
Personal Information
• index.html: Page &lt;title&gt;
• src/components/section/Navigation.tsx: Nav bar name and aria-label
• src/components/section/About.tsx: Hero greeting text (AsciiMorphText)
• src/components/Footer.tsx: Copyright name
Roles — Edit the typewriter carousel roles in src/components/section/About.tsx
Profile Images
Add your profile images to src/assets/ (profile1.jpg, profile2.jpg, profile3.jpg) and
uncomment imports in src/assets/index.ts.
Journal Image

Replace src/assets/journal.PNG with your own journal-style background image for the
About section.
Resume
Place your resume PDF at public/resume.pdf.
Social Links &amp; Environment Variables
Edit your .env file with your actual URLs:
VITE_GITHUB_URL=https://github.com/yourusername
VITE_LINKEDIN_URL=https://linkedin.com/in/yourusername
VITE_EMAIL=your.email@example.com
VITE_GITHUB_PROJECT1_URL=https://github.com/yourusername/project-one
Projects
Edit the projects array in src/components/section/Projects.tsx and add corresponding
project icons and detail pages.
Experience
Edit src/components/section/Experience.tsx with your work history (e.g., Nokia internship,
etc.).
Certifications &amp; Skills
Update your credentials in src/components/section/Certifications.tsx and technical skills in
src/components/section/Skills.tsx.
3. Features &amp; Technologies
Features:
• Dark/light mode with system preference detection
• Interactive ASCII text with morphing effects
• Draggable star decorations
• Aurora gradient backgrounds
• Responsive design across all devices
Technologies:
• React 19, TypeScript, Vite
• Tailwind CSS, Radix UI, Lucide Icons
• GSAP, React Spring, OGL (WebGL)
• React Router DOM