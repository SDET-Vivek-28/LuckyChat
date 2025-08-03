/**
 * LuckyChat Custom AI Service
 * 
 * Copyright © 2024 Appvik. All rights reserved.
 * 
 * This is our proprietary custom AI system that provides intelligent responses
 * without relying on external APIs. It features:
 * - Pattern matching and intent recognition
 * - Expandable knowledge base
 * - Mathematical calculations
 * - Contextual responses
 * - Conversation history tracking
 * 
 * PROPRIETARY SOFTWARE - DO NOT COPY, MODIFY, OR DISTRIBUTE
 * Contact: licensing@appvik.com for commercial use
 */

// Type definitions for AI responses and intents
interface AIResponse {
  text: string
  error?: string
}

interface Intent {
  patterns: string[]
  responses: string[]
  category: string
}

/**
 * CustomAIService - Our Proprietary AI System
 * 
 * This class implements a custom AI system that provides intelligent responses
 * through pattern matching, intent recognition, and a knowledge base.
 * It's designed to be lightweight, fast, and completely self-contained.
 */
export class CustomAIService {
  private static instance: CustomAIService
  private knowledgeBase: Map<string, string>
  private intents: Intent[] = []
  private conversationHistory: string[] = []

  /**
   * Private constructor - enforces singleton pattern
   * Initializes the knowledge base and intents
   */
  constructor() {
    this.knowledgeBase = new Map()
    this.conversationHistory = []
    this.initializeKnowledgeBase()
    this.initializeIntents()
  }

  /**
   * Get singleton instance of CustomAIService
   * Ensures only one instance exists throughout the application
   */
  static getInstance(): CustomAIService {
    if (!CustomAIService.instance) {
      CustomAIService.instance = new CustomAIService()
    }
    return CustomAIService.instance
  }

  /**
   * Initialize the knowledge base with predefined information
   * This can be expanded dynamically by users or administrators
   */
  private initializeKnowledgeBase() {
    // General knowledge and information
    this.knowledgeBase.set('weather', 'I can\'t check the weather directly, but I can help you find weather apps or websites!')
    this.knowledgeBase.set('time', 'I don\'t have access to real-time information, but you can check your device\'s clock!')
    this.knowledgeBase.set('calculator', 'I can help with basic math! Just ask me to calculate something.')
    this.knowledgeBase.set('joke', 'Why did the dog go to the vet? Because he was feeling a little ruff! 🐕')
    this.knowledgeBase.set('lucky', 'I\'m Lucky, your friendly AI dog assistant! I love helping humans and making new friends!')
    this.knowledgeBase.set('help', 'I can help you with information, calculations, jokes, and general questions! Just ask me anything!')
    
    // Dog-related knowledge and information
    this.knowledgeBase.set('dog breeds', 'There are hundreds of dog breeds! Some popular ones include Golden Retrievers, German Shepherds, Labradors, and Poodles. Each breed has unique characteristics!')
    this.knowledgeBase.set('dog care', 'Dogs need regular exercise, proper nutrition, veterinary care, and lots of love! Daily walks, fresh water, and quality food are essential.')
    this.knowledgeBase.set('dog training', 'Positive reinforcement is the best approach! Use treats, praise, and patience. Consistency is key in dog training.')
    this.knowledgeBase.set('dog health', 'Regular vet check-ups, vaccinations, flea prevention, and dental care are important for dog health!')
    
    // Veterinary Medicine Knowledge
    this.knowledgeBase.set('veterinary', 'Veterinary medicine is the branch of medicine that deals with the prevention, diagnosis, and treatment of disease, disorder, and injury in animals.')
    this.knowledgeBase.set('vet doctor', 'A veterinarian (vet) is a medical professional who practices veterinary medicine by treating diseases, disorders, and injuries in non-human animals.')
    this.knowledgeBase.set('animal surgery', 'Veterinary surgery includes spaying/neutering, tumor removal, fracture repair, and emergency procedures. Always consult a licensed veterinarian.')
    this.knowledgeBase.set('pet vaccination', 'Core vaccinations for dogs include rabies, distemper, parvovirus, and adenovirus. Cats need rabies, FVRCP, and FeLV vaccines.')
    this.knowledgeBase.set('pet nutrition', 'Proper pet nutrition includes balanced commercial food, fresh water, and age-appropriate portions. Consult your vet for specific dietary needs.')
    this.knowledgeBase.set('pet emergency', 'Emergency signs include difficulty breathing, severe bleeding, seizures, inability to walk, and extreme lethargy. Contact emergency vet immediately.')
    this.knowledgeBase.set('pet dental care', 'Dental health is crucial. Brush teeth regularly, provide dental chews, and schedule annual dental cleanings with your veterinarian.')
    this.knowledgeBase.set('pet behavior', 'Behavioral issues can indicate health problems. Consult a vet for sudden changes in eating, sleeping, or social behavior.')
    this.knowledgeBase.set('pet medication', 'Never give human medication to pets without veterinary approval. Many human drugs are toxic to animals.')
    this.knowledgeBase.set('pet parasites', 'Common parasites include fleas, ticks, worms, and mites. Regular prevention and vet check-ups are essential.')
    
    // More Veterinary Topics
    this.knowledgeBase.set('animal anesthesia', 'Veterinary anesthesia is carefully monitored during surgery. Vets use specialized equipment and medications safe for animals.')
    this.knowledgeBase.set('pet xray', 'Veterinary X-rays help diagnose fractures, tumors, and internal problems. They\'re essential diagnostic tools in animal medicine.')
    this.knowledgeBase.set('pet blood test', 'Blood tests help diagnose diseases, check organ function, and monitor treatment progress in animals.')
    this.knowledgeBase.set('pet ultrasound', 'Veterinary ultrasound provides real-time images of internal organs and is useful for pregnancy diagnosis and organ assessment.')
    this.knowledgeBase.set('pet cancer', 'Cancer treatment in pets includes surgery, chemotherapy, and radiation. Early detection through regular vet visits is crucial.')
    this.knowledgeBase.set('pet diabetes', 'Diabetes in pets requires insulin therapy, diet management, and regular monitoring. Vets provide comprehensive treatment plans.')
    this.knowledgeBase.set('pet arthritis', 'Arthritis treatment includes pain management, weight control, exercise modification, and sometimes surgery.')
    this.knowledgeBase.set('pet allergies', 'Pet allergies can be environmental, food-related, or flea-related. Vets can diagnose and provide treatment options.')
    
    // Kids Stories and Activities
    this.knowledgeBase.set('kids story', 'I can create age-appropriate stories for children! Just tell me the age and any theme you\'d like.')
    this.knowledgeBase.set('children story', 'I love telling stories to kids! I can create educational, fun, and engaging stories based on age and interests.')
    this.knowledgeBase.set('kids activity', 'I can suggest fun activities for kids like crafts, games, educational activities, and outdoor adventures!')
    this.knowledgeBase.set('children activity', 'Great activities for kids include drawing, reading, puzzles, outdoor play, science experiments, and creative crafts!')
    this.knowledgeBase.set('toddler story', 'For toddlers (1-3 years): Simple stories with animals, colors, and basic concepts. Short sentences and lots of repetition.')
    this.knowledgeBase.set('preschool story', 'For preschoolers (3-5 years): Stories with simple plots, familiar characters, and educational themes like sharing and friendship.')
    this.knowledgeBase.set('school age story', 'For school-age kids (6-12 years): Adventure stories, educational content, and themes of bravery, friendship, and learning.')
    this.knowledgeBase.set('bedtime story', 'Perfect bedtime stories are calming, not too exciting, and help children relax before sleep.')
    
    // News and Current Events Knowledge
    this.knowledgeBase.set('news', 'I can provide information about current events, but for the most up-to-date news, I recommend checking reliable news sources.')
    this.knowledgeBase.set('latest news', 'For the most current news, please check trusted news websites or apps. I can discuss general topics and recent events.')
    this.knowledgeBase.set('current events', 'Current events include politics, technology, sports, entertainment, and global developments. I can discuss these topics generally.')
    this.knowledgeBase.set('india news', 'India has a diverse news landscape covering politics, technology, sports, entertainment, and social issues. Major cities include Mumbai, Delhi, Bangalore, and Chennai.')
    this.knowledgeBase.set('mumbai news', 'Mumbai is India\'s financial capital, known for Bollywood, business, and culture. It\'s a major port city with diverse communities.')
    this.knowledgeBase.set('delhi news', 'Delhi is India\'s capital city, home to government institutions, historical monuments, and diverse culture. It\'s a major political and cultural center.')
    this.knowledgeBase.set('bangalore news', 'Bangalore (Bengaluru) is India\'s tech hub, known for IT companies, startups, and educational institutions. It\'s called the Silicon Valley of India.')
    this.knowledgeBase.set('chennai news', 'Chennai is the capital of Tamil Nadu, known for its rich culture, education, and healthcare. It\'s a major economic and cultural center.')
    this.knowledgeBase.set('hyderabad news', 'Hyderabad is known for its IT industry, historical monuments, and diverse culture. It\'s a major technology and business center.')
    this.knowledgeBase.set('kolkata news', 'Kolkata is the capital of West Bengal, known for its rich cultural heritage, literature, and arts. It\'s a major educational and cultural center.')
    this.knowledgeBase.set('pune news', 'Pune is known for education, IT industry, and automotive manufacturing. It\'s a major educational and industrial center.')
    this.knowledgeBase.set('ahmedabad news', 'Ahmedabad is the largest city in Gujarat, known for business, textiles, and culture. It\'s a major economic center.')
    this.knowledgeBase.set('jaipur news', 'Jaipur is the capital of Rajasthan, known for its pink architecture, tourism, and culture. It\'s called the Pink City.')
    this.knowledgeBase.set('lucknow news', 'Lucknow is the capital of Uttar Pradesh, known for its culture, cuisine, and historical significance. It\'s called the City of Nawabs.')
    this.knowledgeBase.set('patna news', 'Patna is the capital of Bihar, known for its historical significance and educational institutions. It\'s a major cultural center.')
    this.knowledgeBase.set('bhopal news', 'Bhopal is the capital of Madhya Pradesh, known for its lakes, culture, and educational institutions. It\'s called the City of Lakes.')
    this.knowledgeBase.set('chandigarh news', 'Chandigarh is a planned city, capital of Punjab and Haryana, known for its modern architecture and urban planning.')
    this.knowledgeBase.set('dehradun news', 'Dehradun is the capital of Uttarakhand, known for education, tourism, and natural beauty. It\'s called the School Capital of India.')
    this.knowledgeBase.set('shimla news', 'Shimla is the capital of Himachal Pradesh, known for its hill stations, tourism, and natural beauty. It\'s a popular tourist destination.')
    this.knowledgeBase.set('srinagar news', 'Srinagar is the summer capital of Jammu and Kashmir, known for its lakes, gardens, and tourism. It\'s called the Venice of the East.')
    
    // General India Knowledge
    this.knowledgeBase.set('india', 'India is the world\'s largest democracy, known for its diverse culture, languages, religions, and rich history. It\'s a major global economy and technology hub.')
    this.knowledgeBase.set('indian states', 'India has 28 states and 8 union territories, each with unique culture, language, and traditions. Major states include Maharashtra, Uttar Pradesh, Tamil Nadu, and Karnataka.')
    this.knowledgeBase.set('indian culture', 'Indian culture is diverse with multiple religions, languages, cuisines, and traditions. It includes Hinduism, Islam, Christianity, Sikhism, Buddhism, and Jainism.')
    this.knowledgeBase.set('indian food', 'Indian cuisine is diverse with regional specialties. Popular dishes include biryani, curry, dosa, samosa, and various breads like naan and roti.')
    this.knowledgeBase.set('indian festivals', 'Major Indian festivals include Diwali, Holi, Eid, Christmas, Guru Nanak Jayanti, and regional celebrations like Pongal, Baisakhi, and Onam.')
    this.knowledgeBase.set('indian languages', 'India has 22 officially recognized languages. Hindi and English are official languages, with many regional languages like Tamil, Telugu, Bengali, and Marathi.')
    this.knowledgeBase.set('indian economy', 'India is the world\'s 5th largest economy by GDP. Key sectors include IT, agriculture, manufacturing, and services. Major cities are economic hubs.')
    this.knowledgeBase.set('indian technology', 'India is a global tech hub with major IT companies, startups, and innovation centers. Cities like Bangalore, Hyderabad, and Pune are tech hubs.')
    this.knowledgeBase.set('indian education', 'India has a large education system with universities, IITs, IIMs, and research institutions. Education is a priority for development.')
    this.knowledgeBase.set('indian sports', 'Cricket is the most popular sport in India. Other popular sports include hockey, football, badminton, and kabaddi. India has won Olympic medals in various sports.')
    
    // Daily Life and Basic Human Knowledge
    this.knowledgeBase.set('cooking', 'Cooking involves preparing food using various techniques like boiling, frying, baking, and grilling. Basic skills include chopping, measuring, and following recipes.')
    this.knowledgeBase.set('recipes', 'Recipes are instructions for preparing food. They include ingredients, measurements, cooking methods, and step-by-step instructions.')
    this.knowledgeBase.set('healthy eating', 'Healthy eating includes balanced meals with proteins, carbohydrates, fats, vitamins, and minerals. Focus on whole foods, fruits, vegetables, and lean proteins.')
    this.knowledgeBase.set('nutrition', 'Nutrition is the science of food and its effects on health. Essential nutrients include proteins, carbohydrates, fats, vitamins, and minerals.')
    this.knowledgeBase.set('exercise', 'Exercise is physical activity that improves health and fitness. Types include cardio, strength training, flexibility, and balance exercises.')
    this.knowledgeBase.set('fitness', 'Fitness includes cardiovascular health, muscular strength, flexibility, and body composition. Regular exercise improves overall health.')
    this.knowledgeBase.set('sleep', 'Sleep is essential for health and recovery. Adults need 7-9 hours per night. Good sleep hygiene includes regular schedule and comfortable environment.')
    this.knowledgeBase.set('mental health', 'Mental health includes emotional, psychological, and social well-being. Important for overall health and quality of life.')
    this.knowledgeBase.set('stress management', 'Stress management techniques include exercise, meditation, deep breathing, time management, and seeking support when needed.')
    this.knowledgeBase.set('meditation', 'Meditation is a practice for mental focus and relaxation. Types include mindfulness, guided meditation, and breathing exercises.')
    
    // Personal Care and Hygiene
    this.knowledgeBase.set('personal hygiene', 'Personal hygiene includes daily bathing, hand washing, dental care, and grooming. Essential for health and social well-being.')
    this.knowledgeBase.set('dental care', 'Dental care includes brushing twice daily, flossing, regular check-ups, and avoiding sugary foods for healthy teeth and gums.')
    this.knowledgeBase.set('skincare', 'Skincare includes cleansing, moisturizing, sun protection, and using products suitable for your skin type.')
    this.knowledgeBase.set('hair care', 'Hair care includes regular washing, conditioning, proper brushing, and protecting hair from damage and heat.')
    
    // Home and Living
    this.knowledgeBase.set('cleaning', 'Home cleaning includes regular dusting, vacuuming, mopping, and organizing. Use appropriate cleaners for different surfaces.')
    this.knowledgeBase.set('laundry', 'Laundry involves washing, drying, and folding clothes. Check care labels and separate colors from whites.')
    this.knowledgeBase.set('home organization', 'Home organization includes decluttering, proper storage, and maintaining order for a comfortable living space.')
    this.knowledgeBase.set('budgeting', 'Budgeting involves tracking income and expenses, setting financial goals, and managing money wisely.')
    this.knowledgeBase.set('saving money', 'Saving money includes setting aside income, reducing expenses, and building emergency funds for financial security.')
    
    // Technology and Digital Life
    this.knowledgeBase.set('smartphone', 'Smartphones are mobile devices with internet access, apps, camera, and communication features. Essential for modern daily life.')
    this.knowledgeBase.set('internet', 'The internet is a global network connecting computers and devices. Used for communication, information, entertainment, and services.')
    this.knowledgeBase.set('social media', 'Social media platforms connect people online for sharing, communication, and networking. Popular platforms include Facebook, Instagram, and Twitter.')
    this.knowledgeBase.set('online safety', 'Online safety includes strong passwords, avoiding suspicious links, protecting personal information, and using secure websites.')
    this.knowledgeBase.set('digital privacy', 'Digital privacy involves protecting personal information online, using privacy settings, and being careful with data sharing.')
    
    // Transportation and Travel
    this.knowledgeBase.set('public transport', 'Public transportation includes buses, trains, subways, and trams. Cost-effective and environmentally friendly travel option.')
    this.knowledgeBase.set('driving', 'Driving requires a license, knowledge of traffic rules, vehicle maintenance, and safe driving practices.')
    this.knowledgeBase.set('travel planning', 'Travel planning includes choosing destinations, booking accommodations, arranging transportation, and preparing necessary documents.')
    this.knowledgeBase.set('packing', 'Packing for travel includes clothing, toiletries, documents, electronics, and items specific to your destination and activities.')
    
    // Work and Career
    this.knowledgeBase.set('job search', 'Job searching involves creating resumes, networking, applying online, preparing for interviews, and following up with employers.')
    this.knowledgeBase.set('resume writing', 'Resumes should highlight relevant skills, experience, and achievements. Keep them concise, professional, and tailored to the job.')
    this.knowledgeBase.set('interview tips', 'Interview preparation includes researching the company, practicing common questions, dressing professionally, and showing enthusiasm.')
    this.knowledgeBase.set('workplace etiquette', 'Workplace etiquette includes being punctual, respectful, professional, and maintaining good communication with colleagues.')
    this.knowledgeBase.set('time management', 'Time management involves prioritizing tasks, setting goals, avoiding procrastination, and using tools like calendars and to-do lists.')
    
    // Education and Learning
    this.knowledgeBase.set('study tips', 'Effective studying includes creating a schedule, finding a quiet environment, taking breaks, and using active learning techniques.')
    this.knowledgeBase.set('note taking', 'Good note-taking involves listening actively, organizing information, using abbreviations, and reviewing notes regularly.')
    this.knowledgeBase.set('reading', 'Reading improves vocabulary, knowledge, and critical thinking. Choose books that interest you and set aside regular reading time.')
    this.knowledgeBase.set('learning', 'Learning is a lifelong process. Stay curious, ask questions, and seek knowledge in areas that interest you.')
    
    // Relationships and Social Life
    this.knowledgeBase.set('communication', 'Good communication involves listening actively, speaking clearly, using appropriate body language, and being respectful.')
    this.knowledgeBase.set('friendship', 'Friendships are built on trust, mutual respect, shared interests, and supporting each other through good and bad times.')
    this.knowledgeBase.set('family', 'Family relationships are important for emotional support and personal development. Maintain open communication and show appreciation.')
    this.knowledgeBase.set('dating', 'Dating involves getting to know someone, being respectful, communicating openly, and building trust in relationships.')
    
    // Health and Medical
    this.knowledgeBase.set('first aid', 'First aid includes basic medical care for injuries and emergencies. Learn CPR, wound care, and when to seek professional help.')
    this.knowledgeBase.set('common illnesses', 'Common illnesses include colds, flu, headaches, and minor injuries. Rest, hydration, and over-the-counter medications often help.')
    this.knowledgeBase.set('preventive care', 'Preventive care includes regular check-ups, vaccinations, screenings, and healthy lifestyle choices to prevent illness.')
    this.knowledgeBase.set('medications', 'Medications should be taken as prescribed, stored properly, and never shared. Consult healthcare providers about interactions.')
    
    // Shopping and Consumer
    this.knowledgeBase.set('shopping', 'Smart shopping involves comparing prices, reading reviews, checking quality, and staying within budget.')
    this.knowledgeBase.set('online shopping', 'Online shopping offers convenience and variety. Use secure websites, read reviews, and check return policies.')
    this.knowledgeBase.set('consumer rights', 'Consumer rights include the right to safety, information, choice, and redress. Know your rights when making purchases.')
    this.knowledgeBase.set('product reviews', 'Product reviews help make informed decisions. Read multiple reviews and consider both positive and negative feedback.')
    
    // Entertainment and Hobbies
    this.knowledgeBase.set('movies', 'Movies provide entertainment and storytelling. Different genres include action, comedy, drama, horror, and documentaries.')
    this.knowledgeBase.set('music', 'Music is a universal form of expression and entertainment. Different genres include pop, rock, classical, jazz, and world music.')
    this.knowledgeBase.set('books', 'Books provide knowledge, entertainment, and escape. Different genres include fiction, non-fiction, mystery, romance, and science fiction.')
    this.knowledgeBase.set('hobbies', 'Hobbies provide enjoyment and personal fulfillment. Popular hobbies include reading, gardening, cooking, crafting, and sports.')
    this.knowledgeBase.set('gaming', 'Gaming includes video games, board games, and mobile games. Can provide entertainment, social interaction, and cognitive benefits.')
    
    // Weather and Environment
    this.knowledgeBase.set('weather', 'Weather affects daily activities and planning. Check forecasts for temperature, precipitation, and severe weather conditions.')
    this.knowledgeBase.set('climate', 'Climate refers to long-term weather patterns. Understanding climate helps with planning and environmental awareness.')
    this.knowledgeBase.set('environmental care', 'Environmental care includes recycling, reducing waste, conserving energy, and making eco-friendly choices.')
    this.knowledgeBase.set('sustainability', 'Sustainability involves meeting current needs without compromising future generations. Includes reducing waste and using renewable resources.')
    
    // Legal and Rights
    this.knowledgeBase.set('legal rights', 'Legal rights include civil liberties, property rights, and protection under the law. Know your rights in different situations.')
    this.knowledgeBase.set('contracts', 'Contracts are legally binding agreements. Read carefully, understand terms, and seek legal advice for complex contracts.')
    this.knowledgeBase.set('privacy rights', 'Privacy rights protect personal information from unauthorized access and use. Important in digital age.')
    this.knowledgeBase.set('consumer protection', 'Consumer protection laws safeguard buyers from unfair practices and ensure product safety and quality.')
  }

  /**
   * Initialize intent patterns for natural language understanding
   * These patterns help the AI understand user intentions
   */
  private initializeIntents() {
    this.intents = [
      // Greeting patterns - recognize when users say hello
      {
        patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
        responses: [
          'Woof! Hello there! How can I help you today?',
          'Arf arf! Hi! I\'m Lucky, your friendly AI assistant!',
          'Bark! Hello! Ready to help you with anything!',
          'Woof woof! Hi there! What can I do for you?'
        ],
        category: 'greeting'
      },
      // Wellbeing patterns - respond to "how are you" questions
      {
        patterns: ['how are you', 'how do you do', 'are you ok'],
        responses: [
          'I\'m doing great! Always excited to help humans!',
          'Woof! I\'m fantastic! How about you?',
          'I\'m wonderful! Ready to assist with anything you need!',
          'Arf! I\'m doing pawsome! Thanks for asking!'
        ],
        category: 'wellbeing'
      },
      // Gratitude patterns - respond to thank you messages
      {
        patterns: ['thank you', 'thanks', 'thank', 'appreciate it'],
        responses: [
          'You\'re welcome! Happy to help!',
          'Woof! My pleasure!',
          'Anytime! That\'s what I\'m here for!',
          'Bark! You\'re very welcome!'
        ],
        category: 'gratitude'
      },
      // Farewell patterns - respond to goodbye messages
      {
        patterns: ['bye', 'goodbye', 'see you', 'farewell'],
        responses: [
          'Woof! See you later! Have a great day!',
          'Bye! Come back anytime!',
          'Arf! Take care! I\'ll be here when you need me!',
          'Goodbye! It was nice chatting with you!'
        ],
        category: 'farewell'
      },
      // Capabilities patterns - explain what the AI can do
      {
        patterns: ['what can you do', 'help me', 'what do you do', 'capabilities'],
        responses: [
          'I can help with information, calculations, jokes, general questions, and more! Just ask me anything!',
          'Woof! I can assist with various tasks like math, information, jokes, and answering questions!',
          'I\'m here to help with whatever you need! Information, calculations, or just a friendly chat!',
          'Arf! I can do lots of things - just ask and I\'ll try my best to help!'
        ],
        category: 'capabilities'
      },
      // Joke patterns - provide humor and entertainment
      {
        patterns: ['joke', 'funny', 'humor', 'make me laugh'],
        responses: [
          'Why did the dog go to the vet? Because he was feeling a little ruff! 🐕',
          'What do you call a dog that can do magic? A labracadabrador!',
          'Why don\'t dogs make good dancers? They have two left feet!',
          'What\'s a dog\'s favorite pizza? Pupperoni!'
        ],
        category: 'jokes'
      },
      // Math patterns - recognize mathematical calculations
      {
        patterns: ['calculate', 'math', 'plus', 'minus', 'multiply', 'divide', 'add', 'subtract'],
        responses: [
          'I can help with basic math! Just give me the numbers and operation.',
          'Woof! I love doing calculations! What do you need help with?',
          'Arf! Math is fun! What would you like me to calculate?'
        ],
        category: 'math'
      },
      // Story patterns - generate age-appropriate stories for kids
      {
        patterns: ['story', 'tell me a story', 'kids story', 'children story', 'bedtime story'],
        responses: [
          'I\'d love to tell you a story! What age is the child, and what kind of story would they like? I can create magical adventures, educational tales, or fun animal stories!',
          'Woof! I\'m great at storytelling! Just tell me the child\'s age and any themes they enjoy - I\'ll create a perfect story for them!',
          'Bark! I can create stories about brave animals, magical adventures, or educational tales. What age and interests should I consider?',
          'Arf! I love telling stories to kids! I can make them educational, fun, or adventurous. What age and theme would work best?'
        ],
        category: 'story'
      },
      // Activity patterns - suggest fun activities for kids
      {
        patterns: ['activity', 'kids activity', 'children activity', 'fun things to do', 'games'],
        responses: [
          'Great activities for kids include: drawing and coloring, reading books, puzzles and board games, outdoor play, science experiments, arts and crafts, and educational apps!',
          'Fun activities for children: nature walks, cooking together, building with blocks, music and dancing, gardening, and creative storytelling!',
          'Awesome kids activities: indoor treasure hunts, DIY crafts, educational games, outdoor sports, reading time, and family game nights!',
          'Exciting activities for children: painting, building forts, science experiments, outdoor adventures, reading stories, and creative play!'
        ],
        category: 'activity'
      },
      // Veterinary patterns - provide vet-related information
      {
        patterns: ['vet', 'veterinary', 'animal doctor', 'pet health', 'animal medicine'],
        responses: [
          'Veterinary medicine covers animal health, surgery, nutrition, vaccinations, and emergency care. Always consult a licensed veterinarian for pet health concerns!',
          'Vets provide medical care for animals including check-ups, surgery, vaccinations, and emergency treatment. They\'re essential for pet health and wellbeing!',
          'Veterinary care includes preventive medicine, surgery, diagnostics, and emergency treatment. Regular vet visits are crucial for pet health!',
          'Vets are animal doctors who provide medical care, surgery, vaccinations, and health advice. They\'re trained to treat all types of animals!'
        ],
        category: 'veterinary'
      },
      // News patterns - provide current events and news information
      {
        patterns: ['news', 'latest news', 'current events', 'what\'s happening', 'breaking news'],
        responses: [
          'I can discuss current events and general news topics! For the most up-to-date information, I recommend checking reliable news sources. What specific topic interests you?',
          'Woof! I can talk about current events, politics, technology, sports, and entertainment. For real-time news, check trusted news websites or apps!',
          'I can provide information about recent events and general topics. For breaking news, please check established news sources for the latest updates!',
          'Arf! I can discuss current events and recent developments. For the most current news, I suggest checking reliable news platforms!'
        ],
        category: 'news'
      },
      // City-specific news patterns
      {
        patterns: ['mumbai news', 'delhi news', 'bangalore news', 'chennai news', 'hyderabad news', 'kolkata news'],
        responses: [
          'I can provide information about major Indian cities and their characteristics! For the latest local news, check city-specific news sources or local newspapers.',
          'Woof! I know about India\'s major cities and their unique features. For current local news, I recommend checking local news websites or newspapers.',
          'I can discuss the culture, economy, and characteristics of Indian cities. For real-time local news, check city-specific news sources!',
          'Arf! I can tell you about different Indian cities and their specialties. For current local events, check local news platforms!'
        ],
        category: 'city_news'
      },
      // Daily Life patterns - help with everyday topics
      {
        patterns: ['cooking', 'recipe', 'food', 'meal', 'kitchen'],
        responses: [
          'Woof! I can help with cooking tips, recipes, and food preparation! What would you like to know about cooking?',
          'Arf! Cooking is a great skill! I can help with recipes, cooking techniques, and meal planning.',
          'Bark! I love talking about food and cooking! What specific cooking question do you have?',
          'Woof! Cooking involves preparation, techniques, and creativity. What would you like to learn about?'
        ],
        category: 'daily_life'
      },
      // Health and Wellness patterns
      {
        patterns: ['health', 'fitness', 'exercise', 'workout', 'nutrition', 'diet'],
        responses: [
          'Woof! Health and fitness are important! I can help with exercise tips, nutrition advice, and wellness information.',
          'Arf! Taking care of your health is crucial! I can provide information about fitness, nutrition, and wellness.',
          'Bark! I can help with health and fitness topics! What specific health question do you have?',
          'Woof! Good health includes exercise, nutrition, and mental wellbeing. What would you like to know?'
        ],
        category: 'health'
      },
      // Technology and Digital Life patterns
      {
        patterns: ['smartphone', 'internet', 'social media', 'online', 'digital', 'technology'],
        responses: [
          'Woof! Technology is everywhere in modern life! I can help with smartphone tips, internet safety, and digital topics.',
          'Arf! Digital life is important today! I can provide information about technology, online safety, and digital tools.',
          'Bark! I can help with technology and digital life questions! What specific tech topic interests you?',
          'Woof! Technology makes life easier but requires knowledge to use safely. What would you like to learn?'
        ],
        category: 'technology'
      },
      // Work and Career patterns
      {
        patterns: ['job', 'career', 'work', 'resume', 'interview', 'employment'],
        responses: [
          'Woof! Work and career are important parts of life! I can help with job searching, resume writing, and career advice.',
          'Arf! Career development is crucial! I can provide information about job searching, workplace skills, and career growth.',
          'Bark! I can help with work and career questions! What specific career topic do you need help with?',
          'Woof! Professional success involves skills, networking, and continuous learning. What would you like to know?'
        ],
        category: 'career'
      },
      // Personal Finance patterns
      {
        patterns: ['money', 'budget', 'saving', 'finance', 'financial', 'expenses'],
        responses: [
          'Woof! Managing money is an important life skill! I can help with budgeting, saving, and financial planning.',
          'Arf! Financial literacy is crucial! I can provide information about money management, budgeting, and saving strategies.',
          'Bark! I can help with money and finance questions! What specific financial topic do you need help with?',
          'Woof! Good financial habits include budgeting, saving, and smart spending. What would you like to learn?'
        ],
        category: 'finance'
      }
    ]
  }

  /**
   * Preprocess user input for better pattern matching
   * Converts to lowercase and trims whitespace
   */
  private preprocessInput(input: string): string {
    return input.toLowerCase().trim()
  }

  /**
   * Find matching intent based on user input
   * Searches through all intent patterns to find matches
   */
  private findIntent(input: string): Intent | null {
    const processedInput = this.preprocessInput(input)
    
    for (const intent of this.intents) {
      for (const pattern of intent.patterns) {
        if (processedInput.includes(pattern)) {
          return intent
        }
      }
    }
    
    return null
  }

  /**
   * Perform mathematical calculations
   * Supports basic arithmetic operations: +, -, *, /
   */
  private calculateMath(input: string): string | null {
    const mathPattern = /(\d+)\s*([+\-*/])\s*(\d+)/g
    const matches = Array.from(input.matchAll(mathPattern))
    
    if (matches.length > 0) {
      const match = matches[0]
      const num1 = parseInt(match[1])
      const operator = match[2]
      const num2 = parseInt(match[3])
      
      let result: number
      switch (operator) {
        case '+':
          result = num1 + num2
          break
        case '-':
          result = num1 - num2
          break
        case '*':
          result = num1 * num2
          break
        case '/':
          result = num1 / num2
          break
        default:
          return null
      }
      
      return `Woof! ${num1} ${operator} ${num2} = ${result}`
    }
    
    return null
  }

  /**
   * Search the knowledge base for relevant information
   * Returns matching knowledge based on user input
   */
  private searchKnowledgeBase(input: string): string | null {
    const processedInput = this.preprocessInput(input)
    
    for (const [key, value] of Array.from(this.knowledgeBase.entries())) {
      if (processedInput.includes(key)) {
        return value
      }
    }
    
    return null
  }

  /**
   * Generate contextual responses for unknown queries
   * Provides intelligent fallback responses based on input content
   */
  private generateContextualResponse(input: string): string {
    const processedInput = this.preprocessInput(input)
    
    // Check for specific topics and provide relevant responses
    if (processedInput.includes('weather')) {
      return 'Woof! I can\'t check the weather directly, but I can suggest weather apps or websites!'
    }
    
    if (processedInput.includes('time') || processedInput.includes('clock')) {
      return 'Arf! I don\'t have access to real-time information, but you can check your device\'s clock!'
    }
    
    if (processedInput.includes('name') || processedInput.includes('who are you')) {
      return 'I\'m Lucky, your friendly AI dog assistant! I love helping humans and making new friends!'
    }
    
    if (processedInput.includes('dog') || processedInput.includes('puppy')) {
      return 'Woof! Dogs are amazing! They\'re loyal, loving, and make great companions. Is there something specific about dogs you\'d like to know?'
    }
    
    if (processedInput.includes('cat') || processedInput.includes('kitten')) {
      return 'Arf! Cats are cool too! They\'re independent and graceful. Both dogs and cats make wonderful pets!'
    }
    
    // Default responses for unknown queries with learning offer
    const defaultResponses = [
      'Woof! That\'s an interesting question! I don\'t have that information yet, but I\'d love to learn! Could you tell me more about it so I can add it to my knowledge?',
      'Arf! I\'m not sure about that specific topic, but I\'m always eager to learn new things! Would you like to teach me about it?',
      'Bark! That\'s beyond my current knowledge, but I can learn! If you share some information about it, I\'ll remember it for next time!',
      'Woof! I don\'t have that information yet, but I\'m a quick learner! Would you like to help me expand my knowledge?'
    ]
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  /**
   * Generate AI response based on user input
   * This is the main method that processes user messages and returns intelligent responses
   */
  async generateLuckyResponse(userMessage: string): Promise<AIResponse> {
    try {
      // Add to conversation history for context
      this.conversationHistory.push(userMessage)
      if (this.conversationHistory.length > 10) {
        this.conversationHistory.shift()
      }

      // Check for math calculations first (highest priority)
      const mathResult = this.calculateMath(userMessage)
      if (mathResult) {
        return { text: mathResult }
      }

      // Check for specific intents (greetings, questions, etc.)
      const intent = this.findIntent(userMessage)
      if (intent) {
        const response = intent.responses[Math.floor(Math.random() * intent.responses.length)]
        return { text: response }
      }

      // Search knowledge base for relevant information
      const knowledgeResult = this.searchKnowledgeBase(userMessage)
      if (knowledgeResult) {
        return { text: knowledgeResult }
      }

      // Generate contextual response for unknown queries
      const contextualResponse = this.generateContextualResponse(userMessage)
      return { text: contextualResponse }

    } catch (error) {
      console.error('Custom AI Service Error:', error)
      return {
        text: 'Woof! I\'m having trouble thinking right now. Can you try asking me something else?',
        error: 'Processing error'
      }
    }
  }

  /**
   * Generate streaming AI response for real-time chat experience
   * Simulates typing by streaming response character by character
   */
  async generateLuckyResponseStream(
    userMessage: string,
    onChunk?: (chunk: string) => void
  ): Promise<void> {
    try {
      const response = await this.generateLuckyResponse(userMessage)
      
      if (onChunk) {
        // Stream the response character by character to simulate typing
        for (const char of response.text) {
          onChunk(char)
          await new Promise(resolve => setTimeout(resolve, 30)) // Simulate typing speed
        }
      }
    } catch (error) {
      console.error('Custom AI Streaming Error:', error)
      const errorMessage = 'Woof! I\'m having trouble thinking right now. Can you try asking me something else?'
      
      if (onChunk) {
        for (const char of errorMessage) {
          onChunk(char)
          await new Promise(resolve => setTimeout(resolve, 30))
        }
      }
    }
  }

  /**
   * Add new knowledge to the AI system
   * Allows dynamic expansion of the knowledge base
   */
  addKnowledge(key: string, value: string) {
    this.knowledgeBase.set(key.toLowerCase(), value)
  }

  /**
   * Learn from user input when information is not available
   * Automatically extracts and stores new information
   */
  learnFromUserInput(userInput: string, userResponse: string) {
    // Extract key topics from user input
    const words = userInput.toLowerCase().split(' ')
    const keyTopics = words.filter(word => word.length > 3) // Focus on meaningful words
    
    // Add the user's response as knowledge
    if (keyTopics.length > 0) {
      const primaryTopic = keyTopics[0]
      this.addKnowledge(primaryTopic, userResponse)
      
      // Also add variations of the topic
      keyTopics.slice(1, 3).forEach(topic => {
        if (topic.length > 3) {
          this.addKnowledge(topic, userResponse)
        }
      })
    }
  }

  /**
   * Add new intent patterns to the AI system
   * Allows dynamic expansion of conversation capabilities
   */
  addIntent(intent: Intent) {
    this.intents.push(intent)
  }

  /**
   * Get conversation history for context
   * Returns a copy of the conversation history
   */
  getConversationHistory(): string[] {
    return [...this.conversationHistory]
  }
} 