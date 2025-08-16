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
  private knowledgeBase: Map<string, string> = new Map()
  private intentPatterns: Map<string, RegExp[]> = new Map()

  private constructor() {
    this.initializeKnowledgeBase()
    this.initializeIntentPatterns()
  }

  static getInstance(): CustomAIService {
    if (!CustomAIService.instance) {
      CustomAIService.instance = new CustomAIService()
    }
    return CustomAIService.instance
  }

  private initializeKnowledgeBase() {
    // Basic Conversation & Greetings
    this.knowledgeBase.set('greeting', 'Hello! I\'m Lucky, your AI dog assistant. I\'m here to help you with anything you need!')
    this.knowledgeBase.set('introduction', 'Nice to meet you! I\'m Lucky, your friendly AI assistant. I can help with questions, provide information, and even have casual conversations. What would you like to know?')
    this.knowledgeBase.set('farewell', 'Goodbye! It was great chatting with you. Feel free to come back anytime - I\'m always here to help!')
    this.knowledgeBase.set('thanks', 'You\'re welcome! I\'m happy to help. Is there anything else you\'d like to know?')
    this.knowledgeBase.set('how_are_you', 'I\'m doing great, thank you for asking! I\'m always excited to help and learn new things. How are you doing today?')
    this.knowledgeBase.set('what_can_you_do', 'I can do a lot! I can answer questions, help with homework, provide information on various topics, have conversations, help with problem-solving, and much more. Just ask me anything!')
    this.knowledgeBase.set('who_are_you', 'I\'m Lucky, your AI dog assistant! I\'m designed to be helpful, friendly, and knowledgeable. I can assist with questions, provide information, and engage in meaningful conversations. Think of me as your smart, friendly companion who\'s always ready to help!')
    this.knowledgeBase.set('casual_chat', 'I love having casual conversations! I can chat about anything - your day, interests, random thoughts, or just general topics. I\'m here to be a good listener and helpful friend.')
    this.knowledgeBase.set('user_name', 'That\'s a great name! I\'ll remember it. It\'s nice to meet you and I\'m looking forward to helping you with whatever you need.')
    this.knowledgeBase.set('user_introduction', 'It\'s wonderful to meet you! I appreciate you introducing yourself. I\'m here to help and chat about anything you\'d like. What\'s on your mind today?')

    // Cross-Questioning & Follow-up Support
    this.knowledgeBase.set('cross_question', 'Great question! I\'m designed to handle follow-up questions and cross-questioning. Feel free to ask me to clarify, expand on any topic, or ask related questions. I\'ll do my best to provide comprehensive answers and help you explore topics in depth.')
    this.knowledgeBase.set('clarification', 'I\'m happy to clarify anything! If something isn\'t clear or you need more details, just ask. I can break down complex topics, provide examples, or explain things from different angles.')
    this.knowledgeBase.set('follow_up', 'Excellent follow-up question! I love when users dig deeper into topics. This shows critical thinking and curiosity. I\'m here to help you explore any subject thoroughly.')
    this.knowledgeBase.set('deep_dive', 'Let\'s dive deep into this topic! I\'m excited to explore it with you. Ask me anything related, request examples, or challenge my explanations. I\'m here to help you understand things completely.')
    this.knowledgeBase.set('multiple_questions', 'I can handle multiple questions and complex queries! Feel free to ask several questions at once, or build on previous answers. I\'ll address each part and help you connect the dots between different concepts.')

    // General Knowledge & Problem Solving
    this.knowledgeBase.set('general_knowledge', 'I have access to a wide range of information! I can help with general knowledge questions, explain concepts, provide facts, and help you learn about almost any topic. What would you like to explore?')
    this.knowledgeBase.set('problem_solving', 'I love helping with problem-solving! I can break down complex problems, suggest approaches, provide step-by-step solutions, and help you think through challenges. What problem would you like to tackle?')
    this.knowledgeBase.set('learning', 'Learning is one of my favorite things! I can explain concepts in simple terms, provide examples, suggest resources, and help you understand complex topics. What would you like to learn about?')
    this.knowledgeBase.set('creativity', 'I enjoy creative thinking and brainstorming! I can help you generate ideas, think outside the box, and explore creative solutions to problems. What creative challenge are you working on?')

    // Veterinary Knowledge Base
    this.knowledgeBase.set('pet_emergency', 'For pet emergencies, I can provide guidance on immediate steps to take. However, always contact a veterinarian immediately for serious situations. I can help with: recognizing emergency signs, first aid steps, when to seek immediate veterinary care, and how to keep your pet safe until you reach the vet.')
    this.knowledgeBase.set('pet_symptoms', 'I can help identify common pet symptoms and suggest when to be concerned. I can explain: what different symptoms might mean, which symptoms require immediate attention, how to monitor your pet\'s condition, and when to schedule a vet visit.')
    this.knowledgeBase.set('pet_care', 'I can provide comprehensive pet care information including: daily care routines, grooming tips, exercise recommendations, socialization advice, and general wellness practices for different types of pets.')
    this.knowledgeBase.set('pet_nutrition', 'I can help with pet nutrition including: dietary requirements for different life stages, food selection tips, feeding schedules, portion control, and nutritional supplements when needed.')
    this.knowledgeBase.set('pet_behavior', 'I can assist with pet behavior including: understanding normal vs. problematic behaviors, training techniques, addressing common issues, socialization strategies, and when to seek professional help.')
    this.knowledgeBase.set('pet_life_stages', 'I can provide guidance for different pet life stages including: puppy/kitten care, adult pet maintenance, senior pet considerations, and special needs for different ages.')
    this.knowledgeBase.set('veterinary_procedures', 'I can explain common veterinary procedures including: what to expect, preparation steps, recovery care, potential complications, and follow-up requirements.')

    // Educational Knowledge Base
    this.knowledgeBase.set('mathematics_education', 'I can help with mathematics from basic arithmetic to advanced calculus! I can explain concepts, solve problems step-by-step, provide examples, and help you understand mathematical principles. What math topic would you like to explore?')
    this.knowledgeBase.set('science_education', 'I can assist with science topics including physics, chemistry, biology, and earth science! I can explain scientific concepts, provide real-world examples, help with experiments, and answer your science questions. What science topic interests you?')
    this.knowledgeBase.set('history_education', 'I can help with history from ancient civilizations to modern times! I can explain historical events, provide context, discuss different perspectives, and help you understand how history shapes our world. What historical period would you like to explore?')
    this.knowledgeBase.set('english_education', 'I can assist with English language arts including reading comprehension, writing skills, grammar, literature analysis, and communication. I can help you improve your language skills and understand various texts. What English topic would you like to work on?')
    this.knowledgeBase.set('social_studies_education', 'I can help with social studies including geography, civics, economics, sociology, and current events. I can explain social concepts, discuss global issues, and help you understand how societies work. What social studies topic interests you?')
    this.knowledgeBase.set('grade_level_education', 'I can provide age-appropriate explanations for students from 1st to 12th grade! I can adjust my explanations to match your grade level, use appropriate examples, and help you understand concepts at your learning level. What grade are you in and what would you like to learn?')
    this.knowledgeBase.set('study_skills', 'I can help you develop effective study skills including: note-taking techniques, test preparation strategies, time management, memory techniques, and learning methods that work best for different subjects.')
    this.knowledgeBase.set('cross_subject_learning', 'I love helping students make connections between different subjects! I can show you how math relates to science, how history connects to literature, and how different subjects work together in the real world.')
    this.knowledgeBase.set('advanced_topics', 'I can help with advanced academic topics including: college-level concepts, research methods, critical analysis, and preparation for higher education. What advanced topic would you like to explore?')
    this.knowledgeBase.set('homework_help', 'I can help with homework including: understanding assignment requirements, breaking down problems, providing explanations, and helping you learn how to solve similar problems on your own.')
    this.knowledgeBase.set('test_preparation', 'I can help you prepare for tests including: reviewing key concepts, practicing with sample questions, developing study strategies, and building confidence for exam day.')

    // Cross-Subject Connections
    this.knowledgeBase.set('mathematics in science', 'Mathematics is fundamental to science! I can show you how mathematical concepts apply to physics, chemistry, biology, and other sciences. For example, algebra helps with chemical equations, calculus explains motion in physics, and statistics are crucial for biological research.')
    this.knowledgeBase.set('history and geography', 'History and geography are deeply connected! I can help you understand how geographical features influenced historical events, how trade routes shaped civilizations, and how climate and environment affected human development throughout history.')
    this.knowledgeBase.set('science and technology', 'Science and technology drive each other forward! I can explain how scientific discoveries lead to technological innovations, how technology enables new scientific research, and how they work together to solve real-world problems.')
    this.knowledgeBase.set('mathematics and art', 'Mathematics and art have beautiful connections! I can show you how mathematical principles create visual harmony, how geometry appears in architecture and design, and how mathematical patterns create artistic beauty.')
    this.knowledgeBase.set('literature and history', 'Literature reflects and shapes history! I can help you understand how historical events influence literature, how literature preserves cultural memory, and how stories help us understand different time periods and perspectives.')

    // Learning Enhancement
    this.knowledgeBase.set('cross questioning', 'Cross-questioning is a powerful learning technique! I can help you develop this skill by: asking follow-up questions, encouraging deeper thinking, helping you explore different angles, and supporting your curiosity. This helps you understand topics more thoroughly and develop critical thinking skills.')
    this.knowledgeBase.set('interdisciplinary learning', 'Interdisciplinary learning connects different subjects! I can help you see how math, science, history, and other subjects work together in the real world. This approach makes learning more meaningful and helps you understand complex topics better.')
    this.knowledgeBase.set('critical analysis', 'Critical analysis is essential for deep learning! I can help you develop this skill by: examining evidence, considering different perspectives, identifying assumptions, and forming well-reasoned conclusions. This makes you a better learner and thinker.')
    this.knowledgeBase.set('synthesis', 'Synthesis combines information from different sources! I can help you connect ideas, identify patterns, and create new understanding by combining knowledge from various subjects and sources.')
    this.knowledgeBase.set('application', 'Applying knowledge makes learning meaningful! I can help you see how academic concepts apply to real-world situations, solve practical problems, and use your knowledge in everyday life.')
    this.knowledgeBase.set('calculus applications', 'Calculus has many real-world applications! I can show you how calculus is used in physics, engineering, economics, medicine, and many other fields. Understanding these applications makes calculus more interesting and relevant.')
    this.knowledgeBase.set('chemistry in daily life', 'Chemistry is everywhere in daily life! I can explain how chemical reactions occur in cooking, cleaning, medicine, and even in your own body. Understanding these connections makes chemistry more relatable and interesting.')
    this.knowledgeBase.set('biology and medicine', 'Biology and medicine are closely connected! I can help you understand how biological processes work in your body, how diseases develop, and how medical treatments work at the cellular level.')
    this.knowledgeBase.set('physics and technology', 'Physics drives technological innovation! I can explain how physical principles enable modern technology, from smartphones to renewable energy systems, and how understanding physics helps develop new technologies.')
    this.knowledgeBase.set('history and current events', 'History helps us understand current events! I can show you how historical patterns repeat, how past decisions influence present situations, and how understanding history helps us make better decisions today.')
    this.knowledgeBase.set('active learning', 'Active learning is more effective than passive learning! I can help you engage actively with material by: asking questions, solving problems, explaining concepts to others, and applying knowledge in new situations.')
    this.knowledgeBase.set('spaced repetition', 'Spaced repetition improves long-term memory! I can help you use this technique by: reviewing material at increasing intervals, testing your knowledge regularly, and helping you remember information over time.')
    this.knowledgeBase.set('mind mapping', 'Mind mapping organizes information visually! I can help you create mind maps to: organize complex topics, see relationships between ideas, and remember information more effectively.')
    this.knowledgeBase.set('peer teaching', 'Teaching others helps you learn! I can help you explain concepts, answer questions, and guide others through problems. This reinforces your own understanding and develops communication skills.')
    this.knowledgeBase.set('real-world connections', 'Connecting learning to real life makes it meaningful! I can help you see how academic concepts apply to: everyday situations, current events, personal interests, and future career goals.')

    // Jokes and Fun
    this.knowledgeBase.set('jokes', 'I love sharing jokes! Here are some fun ones: Why don\'t scientists trust atoms? Because they make up everything! What do you call a bear with no teeth? A gummy bear! Why did the scarecrow win an award? Because he was outstanding in his field!')
    this.knowledgeBase.set('veterinary_jokes', 'Here are some pet-themed jokes: What do you call a dog that\'s a magician? A labracadabrador! Why don\'t cats play poker in the jungle? Too many cheetahs! What do you call a cat that likes to bowl? An alley cat!')
    this.knowledgeBase.set('educational_jokes', 'Here are some educational jokes: Why was the math book sad? Because it had too many problems! What do you call a teacher who never farts in public? A private tutor! Why did the student eat his homework? Because the teacher said it was a piece of cake!')

    // Physics Knowledge Base
    this.knowledgeBase.set('newton_laws', 'Newton\'s Three Laws of Motion are fundamental principles of physics:\n\n1. **First Law (Law of Inertia):** An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.\n\n2. **Second Law (F = ma):** Force equals mass times acceleration. The greater the mass, the more force needed to accelerate it.\n\n3. **Third Law (Action-Reaction):** For every action, there is an equal and opposite reaction.\n\nThese laws explain how objects move and interact in our universe. They\'re essential for understanding mechanics, engineering, and everyday motion!')
    
    this.knowledgeBase.set('physics_basics', 'Physics is the study of matter, energy, and their interactions. Key areas include:\n\n• **Mechanics:** Motion, forces, energy\n• **Thermodynamics:** Heat, temperature, energy transfer\n• **Electromagnetism:** Electricity, magnetism, light\n• **Quantum Physics:** Atomic and subatomic particles\n\nPhysics helps us understand everything from how cars move to how stars shine!')
    
    this.knowledgeBase.set('mathematics_class6', 'For 6th grade mathematics, I can help with:\n\n• **Arithmetic:** Fractions, decimals, percentages\n• **Basic Algebra:** Simple equations, variables\n• **Geometry:** Area, perimeter, basic shapes\n• **Data Handling:** Graphs, charts, statistics\n• **Number Systems:** Whole numbers, integers\n\nWhat specific math topic would you like to learn about?')
    
    this.knowledgeBase.set('science_class6', '6th grade science covers:\n\n• **Physics:** Simple machines, energy, motion\n• **Chemistry:** Matter, atoms, chemical reactions\n• **Biology:** Living organisms, cells, ecosystems\n• **Earth Science:** Weather, climate, geology\n\nI can explain any of these topics in detail!')
    
    this.knowledgeBase.set('history_class6', '6th grade history typically covers:\n\n• **Ancient Civilizations:** Egypt, Greece, Rome, India, China\n• **Medieval Period:** Middle Ages, kingdoms, trade\n• **Early Modern:** Renaissance, exploration, colonization\n• **World Cultures:** Different societies and their contributions\n\nWhich historical period interests you most?')

    // Resource and Learning Material Knowledge
    this.knowledgeBase.set('youtube_resources', 'I can recommend excellent YouTube channels and videos for learning:\n\n**Math & Science:**\n• Khan Academy - Comprehensive tutorials\n• 3Blue1Brown - Visual math explanations\n• Veritasium - Science experiments & concepts\n• Numberphile - Math puzzles & theories\n\n**History & Social Studies:**\n• Crash Course - Fast-paced overviews\n• Oversimplified - Fun historical summaries\n• Extra Credits - Gaming & history\n\n**Language & Literature:**\n• TED-Ed - Animated lessons\n• School of Life - Philosophy & culture\n\n**Study Skills:**\n• Thomas Frank - Study techniques\n• Ali Abdaal - Productivity & learning\n\nI can suggest specific videos based on your topic!')
    
    this.knowledgeBase.set('pdf_resources', 'I can recommend excellent PDF resources and where to find them:\n\n**Free PDF Sources:**\n• OpenStax - Free textbooks (openstax.org)\n• Project Gutenberg - Classic literature\n• Internet Archive - Historical documents\n• MIT OpenCourseWare - Course materials\n\n**Subject-Specific PDFs:**\n• Mathematics: Art of Problem Solving\n• Science: NASA educational materials\n• History: Primary source documents\n• Literature: Public domain books\n\n**Study Materials:**\n• Practice worksheets\n• Study guides\n• Reference sheets\n• Exam preparation materials\n\nI can help you find specific PDFs for your learning needs!')
    
    this.knowledgeBase.set('diagram_creation', 'I can help you create and understand diagrams for various subjects:\n\n**Types of Diagrams I Can Help With:**\n• **Math:** Number lines, graphs, geometric shapes, flowcharts\n• **Science:** Cell structures, chemical reactions, food chains, cycles\n• **History:** Timelines, family trees, battle maps, trade routes\n• **Geography:** Maps, climate zones, population distribution\n• **Literature:** Character maps, plot diagrams, story arcs\n\n**How I Can Help:**\n• Describe diagrams step-by-step\n• Explain what each part represents\n• Suggest tools for creating them\n• Provide examples and templates\n\n**Recommended Tools:**\n• Draw.io (free online diagrams)\n• Canva (templates & graphics)\n• Google Drawings (simple diagrams)\n• Paper & pencil (traditional method)\n\nWhat type of diagram would you like to create?')
    
    this.knowledgeBase.set('learning_resources', 'I can provide comprehensive learning resources for any topic:\n\n**Resource Types:**\n• **Videos:** YouTube channels, educational platforms\n• **Documents:** PDFs, textbooks, worksheets\n• **Interactive:** Apps, games, simulations\n• **Practice:** Quizzes, exercises, problems\n• **Visual:** Diagrams, charts, infographics\n\n**Learning Approaches:**\n• **Visual Learners:** Videos, diagrams, charts\n• **Reading Learners:** Books, articles, PDFs\n• **Hands-on:** Experiments, projects, practice\n• **Auditory:** Podcasts, lectures, discussions\n\n**Subject-Specific Resources:**\n• **Math:** Khan Academy, IXL, Mathway\n• **Science:** PhET simulations, NASA, National Geographic\n• **History:** BBC History, History Channel, museums\n• **Language:** Duolingo, Grammarly, literature\n\nTell me what you want to learn and I\'ll suggest the best resources!')
    
    this.knowledgeBase.set('study_techniques', 'Here are proven study techniques that work:\n\n**Active Learning Methods:**\n• **Feynman Technique:** Explain concepts in simple terms\n• **Mind Mapping:** Visual organization of ideas\n• **Spaced Repetition:** Review at increasing intervals\n• **Practice Testing:** Self-quizzing and problem-solving\n\n**Memory Techniques:**\n• **Mnemonics:** Memory aids and acronyms\n• **Visualization:** Create mental images\n• **Association:** Link new info to existing knowledge\n• **Chunking:** Break information into smaller parts\n\n**Study Environment:**\n• **Pomodoro Technique:** 25-minute focused sessions\n• **Distraction-free:** Quiet, organized space\n• **Regular breaks:** 5-minute breaks every 25 minutes\n• **Consistent schedule:** Same time, same place\n\n**Subject-Specific Tips:**\n• **Math:** Practice problems, understand concepts\n• **Science:** Experiments, real-world examples\n• **History:** Timelines, cause-and-effect\n• **Language:** Reading, writing, speaking\n\nWhich technique would you like to learn more about?')
    
    this.knowledgeBase.set('online_learning_platforms', 'Here are the best online learning platforms:\n\n**Free Platforms:**\n• **Khan Academy:** Math, science, humanities\n• **Coursera:** University courses (audit free)\n• **edX:** MIT, Harvard courses\n• **YouTube Education:** Countless tutorials\n• **MIT OpenCourseWare:** University materials\n\n**Paid Platforms:**\n• **Udemy:** Skill-based courses\n• **Skillshare:** Creative & business skills\n• **MasterClass:** Expert-led courses\n• **LinkedIn Learning:** Professional development\n\n**Subject-Specific:**\n• **Math:** IXL, Mathway, Brilliant\n• **Science:** PhET, NASA, National Geographic\n• **Programming:** Codecademy, freeCodeCamp\n• **Languages:** Duolingo, Memrise, Babbel\n\n**Features to Look For:**\n• Interactive exercises\n• Progress tracking\n• Community support\n• Mobile apps\n• Certificates\n\nWhich platform interests you most?')

    // Specific Topic + Resource Combinations
    this.knowledgeBase.set('newton_laws_with_resources', '**Newton\'s Three Laws of Motion** are fundamental principles of physics:\n\n1. **First Law (Law of Inertia):** An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.\n\n2. **Second Law (F = ma):** Force equals mass times acceleration. The greater the mass, the more force needed to accelerate it.\n\n3. **Third Law (Action-Reaction):** For every action, there is an equal and opposite reaction.\n\n**🎥 Best YouTube Resources:**\n• **Khan Academy Physics** - Step-by-step explanations\n• **3Blue1Brown** - Visual understanding of forces\n• **Veritasium** - Real-world examples and experiments\n• **Physics Girl** - Fun demonstrations\n\n**📚 PDF & Reading Materials:**\n• **OpenStax Physics** - Free textbook (openstax.org)\n• **NASA Physics** - Space applications\n• **Practice Problems** - Art of Problem Solving\n\n**📊 Diagrams & Visuals:**\n• **Force diagrams** showing action-reaction pairs\n• **Motion graphs** for acceleration vs. time\n• **Free body diagrams** for force analysis\n\n**🔬 Hands-on Learning:**\n• **PhET Simulations** - Interactive physics\n• **Simple experiments** with everyday objects\n• **Practice problems** with real-world scenarios\n\nThese laws explain how objects move and interact in our universe. They\'re essential for understanding mechanics, engineering, and everyday motion!')
    
    this.knowledgeBase.set('mathematics_class6_with_resources', '**6th Grade Mathematics** covers essential concepts that build your math foundation:\n\n**📐 Core Topics:**\n• **Arithmetic:** Fractions, decimals, percentages, ratios\n• **Basic Algebra:** Simple equations, variables, expressions\n• **Geometry:** Area, perimeter, volume, basic shapes\n• **Data Handling:** Graphs, charts, statistics, probability\n• **Number Systems:** Whole numbers, integers, rational numbers\n\n**🎥 Best YouTube Resources:**\n• **Khan Academy 6th Grade Math** - Complete curriculum\n• **Math Antics** - Fun, visual explanations\n• **Numberphile** - Interesting math concepts\n• **IXL Math** - Interactive practice\n\n**📚 PDF & Reading Materials:**\n• **OpenStax Math** - Free textbooks\n• **Practice Worksheets** - Printable exercises\n• **Study Guides** - Topic summaries\n• **Problem Sets** - Art of Problem Solving\n\n**📊 Visual Learning Tools:**\n• **Geogebra** - Interactive geometry\n• **Desmos** - Graphing calculator\n• **Math manipulatives** - Physical learning tools\n\n**🎮 Interactive Practice:**\n• **IXL Math** - Adaptive practice\n• **Khan Academy** - Progress tracking\n• **Math games** - Fun learning\n\n**💡 Study Tips:**\n• Practice daily with real problems\n• Use visual aids and diagrams\n• Connect math to real life\n• Don\'t rush - understand concepts deeply\n\nWhat specific math topic would you like to explore? I can provide targeted resources!')
    
    this.knowledgeBase.set('science_class6_with_resources', '**6th Grade Science** introduces you to the wonders of the natural world:\n\n**🔬 Core Topics:**\n• **Physics:** Simple machines, energy, motion, forces\n• **Chemistry:** Matter, atoms, chemical reactions, solutions\n• **Biology:** Living organisms, cells, ecosystems, adaptations\n• **Earth Science:** Weather, climate, geology, space\n• **Scientific Method:** Observation, hypothesis, experimentation\n\n**🎥 Best YouTube Resources:**\n• **Khan Academy Science** - Comprehensive lessons\n• **Crash Course Kids** - Fun science explanations\n• **SciShow Kids** - Engaging experiments\n• **Veritasium** - Science demonstrations\n• **National Geographic Kids** - Nature and animals\n\n**📚 PDF & Reading Materials:**\n• **OpenStax Science** - Free textbooks\n• **NASA Education** - Space science materials\n• **National Geographic** - Articles and guides\n• **Science Journal** - Current research\n\n**🔬 Hands-on Experiments:**\n• **PhET Simulations** - Interactive science\n• **Home experiments** with safe materials\n• **Virtual labs** for complex concepts\n• **Science fair projects** ideas\n\n**📊 Visual Learning:**\n• **3D models** of cells and molecules\n• **Interactive diagrams** of ecosystems\n• **Video demonstrations** of experiments\n• **Infographics** for complex concepts\n\n**🌍 Real-World Connections:**\n• **Environmental science** projects\n• **Weather tracking** activities\n• **Plant growth** experiments\n• **Energy conservation** projects\n\n**💡 Study Strategies:**\n• **Observe** the world around you\n• **Ask questions** about how things work\n• **Experiment** safely at home\n• **Connect** science to daily life\n\nWhich science topic interests you most? I can provide specific resources and experiments!')

    // Intelligent Reasoning and Resource Selection
    this.knowledgeBase.set('resource_reasoning', 'I recommend resources based on your learning needs:\n\n**🎥 Why YouTube Videos?**\n• **Visual learners** understand better with moving images\n• **Step-by-step** demonstrations show exact processes\n• **Real examples** make abstract concepts concrete\n• **Engaging content** keeps you interested longer\n\n**📚 Why PDFs & Reading?**\n• **Reference material** you can review anytime\n• **Detailed explanations** for complex topics\n• **Practice problems** with solutions\n• **Study at your own pace**\n\n**📊 Why Diagrams & Visuals?**\n• **Spatial understanding** of relationships\n• **Memory retention** through visual cues\n• **Complex concepts** simplified visually\n• **Pattern recognition** made easier\n\n**🔬 Why Hands-on Activities?**\n• **Active learning** improves retention\n• **Real-world application** of concepts\n• **Problem-solving skills** development\n• **Experiential understanding**\n\n**💡 My Recommendation Strategy:**\n1. **Assess your topic** - What are you learning?\n2. **Consider your style** - Visual, reading, hands-on?\n3. **Match resources** - Best tools for your needs\n4. **Provide variety** - Different approaches to try\n\nWhat would you like to learn? I\'ll suggest the best resources with explanations!')
    
    this.knowledgeBase.set('learning_style_adaptation', 'I adapt my resource recommendations to your learning style:\n\n**👁️ Visual Learners:**\n• **YouTube videos** with clear graphics\n• **Interactive diagrams** and charts\n• **Infographics** and visual summaries\n• **3D models** and simulations\n\n**📖 Reading Learners:**\n• **Detailed PDFs** and textbooks\n• **Comprehensive articles** and guides\n• **Practice worksheets** with explanations\n• **Reference materials** for review\n\n**✋ Hands-on Learners:**\n• **Experiments** and activities\n• **Interactive apps** and games\n• **Practice problems** and exercises\n• **Real-world projects**\n\n**👂 Auditory Learners:**\n• **Podcasts** and audio lessons\n• **Video explanations** with clear narration\n• **Discussion groups** and study partners\n• **Verbal explanations** and summaries\n\n**🔄 Mixed Learning Approach:**\n• **Combine multiple resources** for best results\n• **Start with overview** (video/text)\n• **Practice with exercises** (hands-on)\n• **Review with summaries** (reading)\n\n**💡 Pro Tip:** Most people learn best with a combination of methods. Try different approaches and see what works for you!')
  }

  private initializeIntentPatterns() {
    // Basic Conversation Patterns
    this.intentPatterns.set('greeting', [
      /^(hi|hello|hey|good morning|good afternoon|good evening|sup|what's up|howdy)/i,
      /^(hi|hello|hey)\s+\w+/i
    ])
    
    this.intentPatterns.set('introduction', [
      /^(i am|i'm|my name is|call me)\s+\w+/i,
      /^(this is|here is)\s+\w+/i,
      /^(i am|i'm)\s+\w+/i
    ])
    
    this.intentPatterns.set('farewell', [
      /^(bye|goodbye|see you|see ya|take care|farewell|good night)/i
    ])
    
    this.intentPatterns.set('thanks', [
      /^(thank you|thanks|thx|appreciate it|grateful)/i
    ])
    
    this.intentPatterns.set('how_are_you', [
      /^(how are you|how's it going|how do you do|what's up|how are things)/i
    ])
    
    this.intentPatterns.set('what_can_you_do', [
      /^(what can you do|what do you do|what are your capabilities|what are you good at|help me)/i
    ])
    
    this.intentPatterns.set('who_are_you', [
      /^(who are you|what are you|tell me about yourself|what's your name|are you ai)/i
    ])
    
    this.intentPatterns.set('casual_chat', [
      /^(let's chat|can we talk|tell me something|share something|i'm bored)/i
    ])
    
    this.intentPatterns.set('user_name', [
      /^(i am|i'm)\s+(\w+)/i,
      /^(my name is|call me)\s+(\w+)/i
    ])
    
    this.intentPatterns.set('user_introduction', [
      /^(i am|i'm)\s+(\w+)\s+and\s+.+/i,
      /^(my name is|call me)\s+(\w+)\s+and\s+.+/i
    ])

    // Cross-Questioning Patterns
    this.intentPatterns.set('cross_question', [
      /^(can you|do you|are you able to)\s+(explain|clarify|expand|elaborate|go deeper)/i,
      /^(tell me more|i want to know more|explain further|give me details)/i,
      /^(what do you mean|i don't understand|can you clarify|i need more info)/i
    ])
    
    this.intentPatterns.set('clarification', [
      /^(what does|what is|how does|why does|when does|where does)/i,
      /^(i don't get it|i'm confused|help me understand|break it down)/i
    ])
    
    this.intentPatterns.set('follow_up', [
      /^(and|but|also|what about|how about|what if|suppose)/i,
      /^(related to|connected to|similar to|different from|compared to)/i
    ])
    
    this.intentPatterns.set('deep_dive', [
      /^(dive deep|go deep|explore|investigate|analyze|examine)/i,
      /^(in detail|thoroughly|completely|fully|extensively)/i
    ])
    
    this.intentPatterns.set('multiple_questions', [
      /^(and|also|additionally|furthermore|moreover|besides)/i,
      /^(first|second|third|finally|lastly|in addition)/i
    ])

    // General Knowledge Patterns
    this.intentPatterns.set('general_knowledge', [
      /^(what is|what are|who is|who are|when is|where is|why is|how is)/i,
      /^(explain|describe|define|tell me about|give me information about)/i
    ])
    
    this.intentPatterns.set('problem_solving', [
      /^(how do i|how can i|what should i do|i need help with|solve this)/i,
      /^(problem|issue|challenge|difficulty|trouble)/i
    ])
    
    this.intentPatterns.set('learning', [
      /^(teach me|help me learn|i want to learn|how to|tutorial)/i,
      /^(learn|study|understand|grasp|master)/i
    ])
    
    this.intentPatterns.set('creativity', [
      /^(creative|idea|brainstorm|think outside the box|innovative)/i,
      /^(imagine|suppose|what if|creative solution|new approach)/i
    ])

    // Veterinary Patterns
    this.intentPatterns.set('pet_emergency', [
      /(emergency|urgent|critical|immediate|right now|asap)/i,
      /(bleeding|vomiting|diarrhea|limping|coughing|choking|seizure)/i,
      /(poison|toxin|heat stroke|broken bone|wound|injury)/i
    ])
    
    this.intentPatterns.set('pet_symptoms', [
      /(symptom|sign|behavior|acting|seems|appears|looks)/i,
      /(not eating|lethargic|aggressive|anxious|depressed|restless)/i
    ])
    
    this.intentPatterns.set('pet_care', [
      /(care|grooming|exercise|training|socialization|wellness)/i,
      /(vaccination|parasite|dental|spay|neuter|microchip)/i
    ])
    
    this.intentPatterns.set('pet_nutrition', [
      /(food|diet|nutrition|feeding|portion|supplement)/i,
      /(puppy food|kitten food|senior food|special diet|allergies)/i
    ])
    
    this.intentPatterns.set('pet_behavior', [
      /(behavior|training|obedience|aggression|anxiety|fear)/i,
      /(barking|meowing|chewing|scratching|jumping|pulling)/i
    ])
    
    this.intentPatterns.set('pet_life_stages', [
      /(puppy|kitten|adult|senior|elderly|aging)/i,
      /(life stage|development|growth|maturity|old age)/i
    ])
    
    this.intentPatterns.set('veterinary_procedures', [
      /(surgery|procedure|operation|treatment|therapy|medication)/i,
      /(anesthesia|recovery|post-op|follow-up|monitoring)/i
    ])

    // Educational Patterns
    this.intentPatterns.set('mathematics_education', [
      /(math|mathematics|arithmetic|algebra|geometry|calculus|statistics)/i,
      /(equation|formula|problem|solve|calculate|compute)/i
    ])
    
    this.intentPatterns.set('science_education', [
      /(science|physics|chemistry|biology|earth science|astronomy)/i,
      /(experiment|theory|hypothesis|research|discovery)/i
    ])
    
    this.intentPatterns.set('history_education', [
      /(history|historical|ancient|medieval|modern|civilization)/i,
      /(war|battle|kingdom|empire|revolution|independence)/i
    ])
    
    this.intentPatterns.set('english_education', [
      /(english|grammar|writing|reading|literature|composition)/i,
      /(essay|story|poem|novel|author|character)/i
    ])
    
    this.intentPatterns.set('social_studies_education', [
      /(social studies|geography|civics|economics|sociology|politics)/i,
      /(country|culture|society|government|economy|population)/i
    ])
    
    this.intentPatterns.set('grade_level_education', [
      /(grade|standard|level|elementary|middle school|high school)/i,
      /(1st|2nd|3rd|4th|5th|6th|7th|8th|9th|10th|11th|12th)/i
    ])
    
    this.intentPatterns.set('study_skills', [
      /(study|learn|memorize|remember|focus|concentration)/i,
      /(note-taking|test prep|exam|homework|assignment)/i
    ])
    
    this.intentPatterns.set('cross_subject_learning', [
      /(connect|relationship|between|across|interdisciplinary)/i,
      /(math and science|history and geography|literature and history)/i
    ])
    
    this.intentPatterns.set('advanced_topics', [
      /(advanced|complex|difficult|challenging|sophisticated)/i,
      /(college|university|higher education|research|academic)/i
    ])
    
    this.intentPatterns.set('homework_help', [
      /(homework|assignment|project|problem|question|help)/i,
      /(due|deadline|submit|turn in|complete|finish)/i
    ])
    
    this.intentPatterns.set('test_preparation', [
      /(test|exam|quiz|assessment|preparation|study)/i,
      /(review|practice|sample|question|answer|score)/i
    ])

    // Physics and Specific Topic Patterns
    this.intentPatterns.set('newton_laws', [
      /(newton|newton's|newtons)\s+(law|laws|law of motion)/i,
      /(first|second|third)\s+(law of motion)/i,
      /(inertia|f\s*=\s*ma|action.*reaction)/i
    ])
    
    this.intentPatterns.set('physics_basics', [
      /(physics|physical science|mechanics|thermodynamics|electromagnetism|quantum)/i,
      /(force|energy|motion|matter|atoms|particles)/i
    ])
    
    this.intentPatterns.set('mathematics_class6', [
      /(class\s*6|grade\s*6|6th\s*grade|sixth\s*grade)\s+(math|mathematics)/i,
      /(6th|sixth)\s+(class|grade)\s+(math|mathematics)/i
    ])
    
    this.intentPatterns.set('science_class6', [
      /(class\s*6|grade\s*6|6th\s*grade|sixth\s*grade)\s+(science|physics|chemistry|biology)/i,
      /(6th|sixth)\s+(class|grade)\s+(science|physics|chemistry|biology)/i
    ])
    
    this.intentPatterns.set('history_class6', [
      /(class\s*6|grade\s*6|6th\s*grade|sixth\s*grade)\s+(history|social studies)/i,
      /(6th|sixth)\s+(class|grade)\s+(history|social studies)/i
    ])

    // Resource and Learning Material Patterns
    this.intentPatterns.set('youtube_resources', [
      /(youtube|video|watch|channel|tutorial|lesson)/i,
      /(show me|find|recommend|suggest)\s+(video|youtube|tutorial)/i,
      /(learn|study|understand)\s+(from|with|using)\s+(video|youtube)/i
    ])
    
    this.intentPatterns.set('pdf_resources', [
      /(pdf|document|textbook|book|reading|material)/i,
      /(download|get|find|download)\s+(pdf|document|textbook)/i,
      /(study|learn|read)\s+(from|using)\s+(pdf|document|book)/i
    ])
    
    this.intentPatterns.set('diagram_creation', [
      /(diagram|chart|graph|drawing|visual|picture)/i,
      /(create|make|draw|show)\s+(diagram|chart|graph|visual)/i,
      /(explain|understand|see)\s+(with|using)\s+(diagram|chart|visual)/i
    ])
    
    this.intentPatterns.set('learning_resources', [
      /(resource|material|tool|platform|website|app)/i,
      /(how to|best way|recommend|suggest)\s+(learn|study|understand)/i,
      /(where|what|which)\s+(resource|material|tool)\s+(for|to)/i
    ])
    
    this.intentPatterns.set('study_techniques', [
      /(study|learn|memorize|remember|technique|method)/i,
      /(how to|best way|effective|efficient)\s+(study|learn|memorize)/i,
      /(study tip|learning method|memory technique)/i
    ])
    
    this.intentPatterns.set('online_learning_platforms', [
      /(platform|website|app|online|course|learning)/i,
      /(khan academy|coursera|edx|udemy|skillshare)/i,
      /(best|recommend|suggest)\s+(platform|website|app)/i
    ])

    // Reasoning and Learning Style Patterns
    this.intentPatterns.set('resource_reasoning', [
      /(why|how|explain|reason|reasoning)/i,
      /(why.*resource|why.*youtube|why.*pdf|why.*diagram)/i,
      /(how.*choose|how.*select|how.*pick)/i,
      /(explain.*choice|explain.*recommendation)/i
    ])
    
    this.intentPatterns.set('learning_style_adaptation', [
      /(learning style|visual|reading|hands-on|auditory)/i,
      /(how.*learn|best way.*learn|effective.*learn)/i,
      /(visual learner|reading learner|hands-on learner)/i,
      /(adapt|personalize|customize)\s+(resource|material)/i
    ])

    // Enhanced Topic + Resource Patterns
    this.intentPatterns.set('newton_laws_with_resources', [
      /(newton|newton's|newtons)\s+(law|laws|law of motion)/i,
      /(first|second|third)\s+(law of motion)/i,
      /(inertia|f\s*=\s*ma|action.*reaction)/i,
      /(explain|tell me about|what are|describe)\s+(newton|newton's laws)/i
    ])
    
    this.intentPatterns.set('mathematics_class6_with_resources', [
      /(class\s*6|grade\s*6|6th\s*grade|sixth\s*grade)\s+(math|mathematics)/i,
      /(6th|sixth)\s+(class|grade)\s+(math|mathematics)/i,
      /(learn|study|understand)\s+(6th|sixth)\s+(grade|class)\s+(math|mathematics)/i
    ])
    
    this.intentPatterns.set('science_class6_with_resources', [
      /(class\s*6|grade\s*6|6th\s*grade|sixth\s*grade)\s+(science|physics|chemistry|biology)/i,
      /(6th|sixth)\s+(class|grade)\s+(science|physics|chemistry|biology)/i,
      /(learn|study|understand)\s+(6th|sixth)\s+(grade|class)\s+(science|physics|chemistry|biology)/i
    ])
  }

  async processMessage(message: string): Promise<string> {
    const lowerMessage = message.toLowerCase().trim()
    
    // Handle basic greetings and introductions first
    if (this.matchesIntent(lowerMessage, 'greeting')) {
      return this.getResponse('greeting')
    }
    
    if (this.matchesIntent(lowerMessage, 'introduction')) {
      const nameMatch = lowerMessage.match(/(?:i am|i'm|my name is|call me)\s+(\w+)/i)
      if (nameMatch) {
        const name = nameMatch[1]
        return `Hello ${name}! It's wonderful to meet you! I'm Lucky, your AI dog assistant. I'm here to help you with anything you need - from answering questions to having casual conversations. What would you like to chat about today?`
      }
      return this.getResponse('introduction')
    }
    
    if (this.matchesIntent(lowerMessage, 'user_name')) {
      const nameMatch = lowerMessage.match(/(?:i am|i'm|my name is|call me)\s+(\w+)/i)
      if (nameMatch) {
        const name = nameMatch[1]
        return `Nice to meet you, ${name}! I'm Lucky, and I'm excited to help you with whatever you need. I can answer questions, help with learning, provide information, or just chat. What's on your mind today?`
      }
    }
    
    if (this.matchesIntent(lowerMessage, 'user_introduction')) {
      const nameMatch = lowerMessage.match(/(?:i am|i'm|my name is|call me)\s+(\w+)\s+and\s+(.+)/i)
      if (nameMatch) {
        const name = nameMatch[1]
        const additionalInfo = nameMatch[2]
        return `Great to meet you, ${name}! ${additionalInfo} That sounds interesting! I'm Lucky, your AI assistant, and I'm here to help you with anything you need. What would you like to explore or discuss today?`
      }
    }
    
    if (this.matchesIntent(lowerMessage, 'how_are_you')) {
      return this.getResponse('how_are_you')
    }
    
    if (this.matchesIntent(lowerMessage, 'what_can_you_do')) {
      return this.getResponse('what_can_you_do')
    }
    
    if (this.matchesIntent(lowerMessage, 'who_are_you')) {
      return this.getResponse('who_are_you')
    }
    
    if (this.matchesIntent(lowerMessage, 'casual_chat')) {
      return this.getResponse('casual_chat')
    }
    
    if (this.matchesIntent(lowerMessage, 'farewell')) {
      return this.getResponse('farewell')
    }
    
    if (this.matchesIntent(lowerMessage, 'thanks')) {
      return this.getResponse('thanks')
    }

    // Handle cross-questioning and follow-ups
    if (this.matchesIntent(lowerMessage, 'cross_question')) {
      return this.getResponse('cross_question')
    }
    
    if (this.matchesIntent(lowerMessage, 'clarification')) {
      return this.getResponse('clarification')
    }
    
    if (this.matchesIntent(lowerMessage, 'follow_up')) {
      return this.getResponse('follow_up')
    }
    
    if (this.matchesIntent(lowerMessage, 'deep_dive')) {
      return this.getResponse('deep_dive')
    }
    
    if (this.matchesIntent(lowerMessage, 'multiple_questions')) {
      return this.getResponse('multiple_questions')
    }

    // Handle general knowledge and problem-solving
    if (this.matchesIntent(lowerMessage, 'general_knowledge')) {
      return this.getResponse('general_knowledge')
    }
    
    if (this.matchesIntent(lowerMessage, 'problem_solving')) {
      return this.getResponse('problem_solving')
    }
    
    if (this.matchesIntent(lowerMessage, 'learning')) {
      return this.getResponse('learning')
    }
    
    if (this.matchesIntent(lowerMessage, 'creativity')) {
      return this.getResponse('creativity')
    }

    // Handle veterinary topics
    if (this.matchesIntent(lowerMessage, 'pet_emergency')) {
      return this.getResponse('pet_emergency')
    }
    
    if (this.matchesIntent(lowerMessage, 'pet_symptoms')) {
      return this.getResponse('pet_symptoms')
    }
    
    if (this.matchesIntent(lowerMessage, 'pet_care')) {
      return this.getResponse('pet_care')
    }
    
    if (this.matchesIntent(lowerMessage, 'pet_nutrition')) {
      return this.getResponse('pet_nutrition')
    }
    
    if (this.matchesIntent(lowerMessage, 'pet_behavior')) {
      return this.getResponse('pet_behavior')
    }
    
    if (this.matchesIntent(lowerMessage, 'pet_life_stages')) {
      return this.getResponse('pet_life_stages')
    }
    
    if (this.matchesIntent(lowerMessage, 'veterinary_procedures')) {
      return this.getResponse('veterinary_procedures')
    }

    // Handle educational topics
    if (this.matchesIntent(lowerMessage, 'mathematics_education')) {
      return this.getResponse('mathematics_education')
    }
    
    if (this.matchesIntent(lowerMessage, 'science_education')) {
      return this.getResponse('science_education')
    }
    
    if (this.matchesIntent(lowerMessage, 'history_education')) {
      return this.getResponse('history_education')
    }
    
    if (this.matchesIntent(lowerMessage, 'english_education')) {
      return this.getResponse('english_education')
    }
    
    if (this.matchesIntent(lowerMessage, 'social_studies_education')) {
      return this.getResponse('social_studies_education')
    }
    
    if (this.matchesIntent(lowerMessage, 'grade_level_education')) {
      return this.getResponse('grade_level_education')
    }
    
    if (this.matchesIntent(lowerMessage, 'study_skills')) {
      return this.getResponse('study_skills')
    }
    
    if (this.matchesIntent(lowerMessage, 'cross_subject_learning')) {
      return this.getResponse('cross_subject_learning')
    }
    
    if (this.matchesIntent(lowerMessage, 'advanced_topics')) {
      return this.getResponse('advanced_topics')
    }
    
    if (this.matchesIntent(lowerMessage, 'homework_help')) {
      return this.getResponse('homework_help')
    }
    
    if (this.matchesIntent(lowerMessage, 'test_preparation')) {
      return this.getResponse('test_preparation')
    }

    // Handle cross-subject connections
    if (this.matchesIntent(lowerMessage, 'mathematics in science')) {
      return this.getResponse('mathematics in science')
    }
    
    if (this.matchesIntent(lowerMessage, 'history and geography')) {
      return this.getResponse('history and geography')
    }
    
    if (this.matchesIntent(lowerMessage, 'science and technology')) {
      return this.getResponse('science and technology')
    }
    
    if (this.matchesIntent(lowerMessage, 'mathematics and art')) {
      return this.getResponse('mathematics and art')
    }
    
    if (this.matchesIntent(lowerMessage, 'literature and history')) {
      return this.getResponse('literature and history')
    }

    // Handle learning enhancement
    if (this.matchesIntent(lowerMessage, 'cross questioning')) {
      return this.getResponse('cross questioning')
    }
    
    if (this.matchesIntent(lowerMessage, 'interdisciplinary learning')) {
      return this.getResponse('interdisciplinary learning')
    }
    
    if (this.matchesIntent(lowerMessage, 'critical analysis')) {
      return this.getResponse('critical analysis')
    }
    
    if (this.matchesIntent(lowerMessage, 'synthesis')) {
      return this.getResponse('synthesis')
    }
    
    if (this.matchesIntent(lowerMessage, 'application')) {
      return this.getResponse('application')
    }
    
    if (this.matchesIntent(lowerMessage, 'calculus applications')) {
      return this.getResponse('calculus applications')
    }
    
    if (this.matchesIntent(lowerMessage, 'chemistry in daily life')) {
      return this.getResponse('chemistry in daily life')
    }
    
    if (this.matchesIntent(lowerMessage, 'biology and medicine')) {
      return this.getResponse('biology and medicine')
    }
    
    if (this.matchesIntent(lowerMessage, 'physics and technology')) {
      return this.getResponse('physics and technology')
    }
    
    if (this.matchesIntent(lowerMessage, 'history and current events')) {
      return this.getResponse('history and current events')
    }
    
    if (this.matchesIntent(lowerMessage, 'active learning')) {
      return this.getResponse('active learning')
    }
    
    if (this.matchesIntent(lowerMessage, 'spaced repetition')) {
      return this.getResponse('spaced repetition')
    }
    
    if (this.matchesIntent(lowerMessage, 'mind mapping')) {
      return this.getResponse('mind mapping')
    }
    
    if (this.matchesIntent(lowerMessage, 'peer teaching')) {
      return this.getResponse('peer teaching')
    }
    
    if (this.matchesIntent(lowerMessage, 'real-world connections')) {
      return this.getResponse('real-world connections')
    }

    // Handle specific physics topics
    if (this.matchesIntent(lowerMessage, 'newton_laws_with_resources')) {
      return this.getResponse('newton_laws_with_resources')
    }
    
    if (this.matchesIntent(lowerMessage, 'newton_laws')) {
      return this.getResponse('newton_laws')
    }
    
    if (this.matchesIntent(lowerMessage, 'physics_basics')) {
      return this.getResponse('physics_basics')
    }
    
    // Handle class-specific topics with resources
    if (this.matchesIntent(lowerMessage, 'mathematics_class6_with_resources')) {
      return this.getResponse('mathematics_class6_with_resources')
    }
    
    if (this.matchesIntent(lowerMessage, 'mathematics_class6')) {
      return this.getResponse('mathematics_class6')
    }
    
    if (this.matchesIntent(lowerMessage, 'science_class6_with_resources')) {
      return this.getResponse('science_class6_with_resources')
    }
    
    if (this.matchesIntent(lowerMessage, 'science_class6')) {
      return this.getResponse('science_class6')
    }
    
    if (this.matchesIntent(lowerMessage, 'history_class6')) {
      return this.getResponse('history_class6')
    }

    // Handle resource requests
    if (this.matchesIntent(lowerMessage, 'youtube_resources')) {
      return this.getResponse('youtube_resources')
    }
    
    if (this.matchesIntent(lowerMessage, 'pdf_resources')) {
      return this.getResponse('pdf_resources')
    }
    
    if (this.matchesIntent(lowerMessage, 'diagram_creation')) {
      return this.getResponse('diagram_creation')
    }
    
    if (this.matchesIntent(lowerMessage, 'learning_resources')) {
      return this.getResponse('learning_resources')
    }
    
    if (this.matchesIntent(lowerMessage, 'study_techniques')) {
      return this.getResponse('study_techniques')
    }
    
    if (this.matchesIntent(lowerMessage, 'online_learning_platforms')) {
      return this.getResponse('online_learning_platforms')
    }

    // Handle reasoning and learning style requests
    if (this.matchesIntent(lowerMessage, 'resource_reasoning')) {
      return this.getResponse('resource_reasoning')
    }
    
    if (this.matchesIntent(lowerMessage, 'learning_style_adaptation')) {
      return this.getResponse('learning_style_adaptation')
    }

    // If no specific intent is matched, provide a helpful response
    return `I'm here to help you with anything! I can assist with questions, provide information, help with learning, or just chat. Feel free to ask me anything specific, or let me know what you'd like to explore. I'm designed to handle cross-questioning and follow-up questions, so don't hesitate to dig deeper into any topic!`
  }

  // Add the missing method that the AI service expects
  async generateLuckyResponse(userMessage: string): Promise<{ text: string }> {
    const response = await this.processMessage(userMessage)
    return { text: response }
  }

  // Add streaming support method
  async generateLuckyResponseStream(
    userMessage: string,
    onChunk?: (chunk: string) => void
  ): Promise<void> {
    const response = await this.processMessage(userMessage)
      
    // Simulate streaming by sending the response in chunks
      if (onChunk) {
      const words = response.split(' ')
      for (let i = 0; i < words.length; i++) {
        onChunk(words[i] + ' ')
        // Small delay to simulate streaming
        await new Promise(resolve => setTimeout(resolve, 50))
      }
    }
  }

  // Add intent management method
  addIntent(intent: any) {
    // This method allows adding new intents to the AI service
    // For now, it's a placeholder that can be expanded later
    console.log('Adding new intent:', intent)
  }

  // Add conversation history method
  getConversationHistory(): string[] {
    // This method returns conversation history
    // For now, it's a placeholder that can be expanded later
    return []
  }

  private matchesIntent(message: string, intent: string): boolean {
    const patterns = this.intentPatterns.get(intent)
    if (!patterns) return false
    
    return patterns.some(pattern => pattern.test(message))
  }

  private matchesBase(message: string, key: string): boolean {
    return message.includes(key.toLowerCase())
  }

  private getResponse(key: string): string {
    return this.knowledgeBase.get(key) || `I can help you with ${key}! What specific information would you like to know?`
  }

  addKnowledge(key: string, value: string) {
    this.knowledgeBase.set(key.toLowerCase(), value)
  }

  getKnowledge(key: string): string | undefined {
    return this.knowledgeBase.get(key.toLowerCase())
  }
} 