import { DATA } from './data';

/**
 * Helper functions for making the chatbot more conversational
 */

/**
 * Check if question matches common patterns and return helpful responses
 */
export function getFallbackResponse(question: string): string | null {
  const lowerQuestion = question.toLowerCase().trim();

  // Greetings
  if (lowerQuestion.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/)) {
    return `Hello! I'm here to help you learn about ${DATA.name}'s portfolio. You can ask me about projects, work experience, skills, education, or anything else about the portfolio!`;
  }

  // Goodbyes
  if (lowerQuestion.match(/(bye|goodbye|see you|farewell|thanks|thank you)/)) {
    return "You're welcome! Feel free to ask more questions anytime.";
  }

  // Projects questions
  if (lowerQuestion.match(/(what.*projects|tell.*projects|show.*projects|list.*projects|projects.*built|projects.*worked)/)) {
    const projectNames = DATA.projects.slice(0, 3).map(p => p.name).join(', ');
    return `Some notable projects include: ${projectNames}. Would you like to know more about a specific project?`;
  }

  // Skills questions
  if (lowerQuestion.match(/(what.*skills|what.*technologies|what.*tech|what.*languages|what.*do you know|what.*can you do)/)) {
    const mainSkills = [...DATA.skills.frontend.slice(0, 3), ...DATA.skills.backend.slice(0, 2)].join(', ');
    return `Key technologies include: ${mainSkills}. There's expertise in frontend (React Native, React.js, Next.js), backend (Node.js, Express.js), and databases (PostgreSQL, MongoDB). Want to know more about a specific technology?`;
  }

  // Experience questions
  if (lowerQuestion.match(/(what.*experience|where.*worked|tell.*experience|what.*job|what.*companies)/)) {
    const companies = DATA.experience.map(e => e.company).join(', ');
    return `Work experience includes positions at: ${companies}. Current role is ${DATA.experience[0]?.role} at ${DATA.experience[0]?.company}. Would you like details about a specific role?`;
  }

  // Education questions
  if (lowerQuestion.match(/(where.*study|what.*education|what.*degree|where.*graduate|what.*university|what.*school)/)) {
    const schools = DATA.education.map(e => e.school).join(' and ');
    return `Education includes studies at ${schools}. ${DATA.education[0]?.credential}. Want more details about education or specific courses?`;
  }

  // Name/location questions
  if (lowerQuestion.match(/(what.*name|who.*are you|who.*is.*you)/)) {
    return `I'm an AI assistant helping you learn about ${DATA.name}, a ${DATA.title} based in ${DATA.location}.`;
  }

  // Location questions
  if (lowerQuestion.match(/(where.*from|where.*located|where.*live|where.*based)/)) {
    return `${DATA.name} is based in ${DATA.location} and is available for freelance opportunities.`;
  }

  // How are you / status questions
  if (lowerQuestion.match(/(how.*are you|how.*going|what.*up|how.*doing)/)) {
    return "I'm doing well, thank you for asking! I'm here to help you learn about the portfolio. What would you like to know?";
  }

  // What can you do / help questions
  if (lowerQuestion.match(/(what.*can.*you|how.*can.*you.*help|what.*help|what.*do)/)) {
    return "I can answer questions about projects, work experience, skills, technologies, education, certifications, and more! Try asking about specific projects or technologies used.";
  }

  return null;
}

/**
 * Get suggested questions to help users get started
 */
export function getSuggestedQuestions(): string[] {
  return [
    "What projects have you built?",
    "What technologies do you know?",
    "Tell me about your work experience",
    "Where did you study?",
    "What is PropertyApp?",
  ];
}

