import React from 'react';
import { Cpu, FileText, Layers, Database } from 'lucide-react';
import ProjectLayout from '../../components/project/ProjectLayout';
import ProjectHeader from '../../components/project/ProjectHeader';
import ProjectOverview from '../../components/project/ProjectOverview';
import ProjectSection from '../../components/project/ProjectSection';
import TechnicalHighlights from '../../components/project/TechnicalHighlights';
import TechStack from '../../components/project/TechStack';
import { comingSoon } from '../../assets';

const AIJobMatcher: React.FC = () => {
  return (
    <ProjectLayout>
      <ProjectHeader
        icon={comingSoon}
        title="AI Job Matcher"
        subtitle="A local-first CV-to-job matching engine — pure Python scoring, no LLM behind it"
        githubUrl="https://github.com/EmreGuezel/AI-Job-Matcher"
        liveUrl="https://ai-job-matcher-five-sigma.vercel.app/"
        features={[
          {
            icon: FileText,
            title: 'CV parsing',
            description: 'Reads text straight out of a PDF with PyMuPDF, so any text-based CV works without manual entry.'
          },
          {
            icon: Cpu,
            title: 'TF-IDF scoring engine',
            description: 'Every listing gets a 0-100 score and a plain-language explanation of what matched and what was missing.'
          },
          {
            icon: Layers,
            title: 'Seniority-aware ranking',
            description: 'A graduate CV and a Senior Engineer posting share almost every word — so rank is measured as its own signal.'
          },
          {
            icon: Database,
            title: 'Match history',
            description: 'Each run is stored in SQLite with the score and analysis, so past searches stay reviewable.'
          }
        ]}
      />

      <ProjectSection title="Overview">
        <ProjectOverview
          paragraphs={[
            'Job boards rank by keyword overlap, which falls apart the moment seniority enters the picture. A computer engineering graduate\'s CV and a "Senior Backend Engineer" listing share nearly every field word — python, backend, database, development — so a keyword score happily puts a mid-senior role at the top of a new graduate\'s results.',
            'AI Job Matcher takes the opposite approach. You upload your CV as a PDF, type a keyword and a location, and every scraped listing comes back with a 0-100 match score plus a short explanation: which of your skills the listing actually asks for, which of its requirements your CV never mentions, and whether the role sits above your level.',
            'Despite the "AI" in the name, no model is called at any point. The engine is TF-IDF written in plain Python — math, re and collections, no numpy or scikit-learn — because the expensive part of job matching is not language understanding, it is telling a relevant posting apart from an irrelevant one.',
            'The deployed app is aimed at the Turkish job market, so the interface and the level labels are in Turkish, and the seniority classifier understands Turkish titles alongside English ones.'
          ]}
        />
      </ProjectSection>

      <ProjectSection title="How the matching works">
        <ProjectOverview
          paragraphs={[
            'Each listing is scored in two directions. The main signal (weight 0.90) is how much of your skill weight appears in the listing; the secondary one (weight 0.10) is how much of the listing\'s non-generic requirements appear in your CV. The second is deliberately weak — a CV\'s "about me" filler makes it nearly constant, so it carries little discriminating power. The combined score is then bent through a soft curve (exponent 0.50) that lifts mid-range scores into a more readable spread.',
            'IDF is computed over the job listings only, never including the CV. This matters more than it sounds: personal noise in a CV — an email, a home address — appears in no listing at all, so it would earn the highest possible IDF and quietly dominate the score. For the same reason, "skills" are only the CV terms that appear in at least one listing, and terms that appear in no listing are treated as maximally distinctive rather than least important.',
            'Three multiplicative penalties then scale the base score down, and all three are capped at 1.0 so they can only ever lower a score: title overlap (floor 0.45), the seniority gap, and a shortfall against the years a listing asks for (floor 0.70, dropping 0.05 per missing year). The seniority penalty is asymmetric on purpose — a senior candidate looking at junior roles is not a relevance problem and is never penalized, while a graduate looking at senior roles is.',
            'The seniority classifier predicts a level from the listing title first, and only falls back to the description with a deliberately narrower keyword list. Words like "senior" or "lead" are not searched in descriptions at all: "you will work with senior engineers" is a marketing line, not a senior role.',
            'When the automatic level filter would hide so many listings that fewer than five survive, the closest-level ones are put back with a warning label instead. Showing a slightly-too-senior posting beats showing an empty page.'
          ]}
        />
      </ProjectSection>

      <ProjectSection title="Technical highlights">
        <TechnicalHighlights
          highlights={[
            'Scoring runs on the standard library alone — math, re and collections.Counter. No numpy, no scikit-learn, no external AI API, and no rate limits.',
            'Turkish-aware text folding happens before lowercasing: "İ".lower() produces "i" plus a combining dot in Python, which silently breaks the "I" to "ı" match that Turkish job titles depend on.',
            'Academic false positive removed: US universities call the final-year course "Senior Design Project", and a real CV containing "experience in senior design projects" was enough to classify a new graduate as Mid-Senior. Those phrases are stripped before the seniority scan runs.',
            'Work-experience section is sliced out by headings before year counting, so a five-year degree range is not summed as five years of employment.',
            'PDFs inject non-breaking spaces (U+00A0) between words, which defeats \\s-based regexes and whitespace splitting — normalized first, or year and section detection silently stops matching.',
            'Calibrated against a real CV and live listings: unrelated postings (nurse, chef, accountant, network engineer) land at 0-39%, relevant ones at 42-69%.',
            'Scraping fails loudly instead of quietly. Every HTTP status maps to a specific message (rejected key, exhausted quota, timeout), and a failed scrape aborts the run rather than rescoring the previous search\'s cached CSV.',
            'Deployed to Vercel through the @vercel/python builder, with the SQLite schema re-created on every connection because the serverless filesystem does not persist.'
          ]}
        />
      </ProjectSection>

      <ProjectSection title="Tech stack">
        <TechStack
          technologies={[
            'Python',
            'FastAPI',
            'Jinja2',
            'pandas',
            'PyMuPDF',
            'SQLite',
            'JSearch API',
            'Jooble API',
            'Vercel'
          ]}
        />
      </ProjectSection>
    </ProjectLayout>
  );
};

export default AIJobMatcher;
