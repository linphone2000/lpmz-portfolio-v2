import { DATA } from './data';

/**
 * Formats experience entry into a searchable passage
 */
function formatExperience(exp: (typeof DATA.experience)[0]): string {
  const bullets = exp.bullets.join(' ');
  const tech = exp.technologies.join(', ');
  return `${exp.role} at ${exp.company} (${exp.type}) from ${exp.period} in ${exp.location}. ${bullets} Technologies used: ${tech}.`;
}

/**
 * Formats project into a searchable passage
 */
function formatProject(project: (typeof DATA.projects)[0]): string {
  const features = project.features?.join(', ') || '';
  const stack = project.stack.join(', ');
  return `${project.name} (${project.category}, ${project.year}, ${project.status}): ${project.blurb} Features: ${features}. Built with: ${stack}.`;
}

/**
 * Formats education entry into a searchable passage
 */
function formatEducation(edu: (typeof DATA.education)[0]): string {
  const courses = edu.relevantCourses?.join(', ') || '';
  return `${edu.credential} from ${edu.school} (${edu.period}) in ${edu.location}. GPA: ${edu.gpa}. Relevant courses: ${courses}.`;
}

/**
 * Formats certification into a searchable passage
 */
function formatCertification(cert: (typeof DATA.certs)[0]): string {
  return `${cert.name} (${cert.year}) from ${cert.issuer}: ${cert.description}.`;
}

/**
 * Combines all portfolio data into a single searchable passage
 * for use with TensorFlow.js QnA model
 * Formats as natural language text for better QnA performance
 */
export function getPortfolioPassage(): string {
  const sections: string[] = [];

  // About section - natural language format
  sections.push(
    `${DATA.name} is a ${DATA.title} based in ${DATA.location}. ${DATA.summary} ${DATA.about.tagline}. ${DATA.about.availability}. Started learning JavaScript-based frameworks in 2022. Has ${DATA.about.yearsOfExperience} years of coding experience including professional work, academic projects, freelance work, and personal projects.`
  );

  // Skills section - natural sentences
  sections.push(
    `Frontend technologies include ${DATA.skills.frontend.join(', ')}. Backend technologies include ${DATA.skills.backend.join(', ')}. Database experience includes ${DATA.skills.databases.join(', ')}. Programming languages known are ${DATA.skills.languages.join(', ')}. Tools used include ${DATA.skills.tools.join(', ')}. AI and machine learning skills include ${DATA.skills.aiml.join(', ')}. Soft skills include ${DATA.skills.soft.join(', ')}.`
  );

  // Experience section
  sections.push('Work Experience:');
  DATA.experience.forEach((exp) => {
    sections.push(formatExperience(exp));
  });

  // Projects section
  sections.push('Projects:');
  DATA.projects.forEach((project) => {
    sections.push(formatProject(project));
  });

  // Education section
  sections.push('Education:');
  DATA.education.forEach((edu) => {
    sections.push(formatEducation(edu));
  });

  // Certifications section
  sections.push('Certifications:');
  DATA.certs.forEach((cert) => {
    sections.push(formatCertification(cert));
  });

  // Achievements section
  sections.push('Achievements:');
  DATA.achievements.forEach((achievement) => {
    sections.push(
      `${achievement.title} (${achievement.year}, ${achievement.category}): ${achievement.description}.`
    );
  });

  return sections.join('\n\n');
}
