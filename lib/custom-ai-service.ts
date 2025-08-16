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
    
    // Comprehensive Veterinary Knowledge - Common Pet Health Issues
    this.knowledgeBase.set('dog vomiting', 'Vomiting in dogs can be caused by dietary indiscretion, infections, parasites, or serious conditions. Contact vet if vomiting persists or contains blood.')
    this.knowledgeBase.set('cat vomiting', 'Cats may vomit due to hairballs, dietary changes, or underlying illness. Seek vet care if vomiting is frequent or accompanied by other symptoms.')
    this.knowledgeBase.set('pet diarrhea', 'Diarrhea can result from dietary changes, infections, or parasites. Provide plenty of water and contact vet if severe or persistent.')
    this.knowledgeBase.set('pet limping', 'Limping indicates pain or injury. Common causes include sprains, fractures, arthritis, or joint problems. Rest and vet evaluation recommended.')
    this.knowledgeBase.set('pet coughing', 'Coughing can indicate respiratory infection, heart disease, or kennel cough. Persistent coughing requires veterinary attention.')
    this.knowledgeBase.set('pet sneezing', 'Sneezing may be due to allergies, infections, or foreign objects. Monitor for other symptoms and consult vet if persistent.')
    this.knowledgeBase.set('pet itching', 'Itching can be caused by fleas, allergies, skin infections, or parasites. Regular grooming and vet consultation for persistent itching.')
    this.knowledgeBase.set('pet ear problems', 'Ear issues include infections, mites, or foreign objects. Signs include scratching, head shaking, or foul odor. Vet treatment recommended.')
    this.knowledgeBase.set('pet eye problems', 'Eye issues include infections, injuries, or glaucoma. Redness, discharge, or squinting require immediate veterinary attention.')
    this.knowledgeBase.set('pet skin problems', 'Skin conditions include allergies, infections, or parasites. Regular grooming and vet consultation for persistent skin issues.')
    
    // Emergency Veterinary Care
    this.knowledgeBase.set('pet emergency signs', 'Emergency signs: difficulty breathing, severe bleeding, seizures, collapse, inability to walk, extreme lethargy, or severe pain. Contact emergency vet immediately.')
    this.knowledgeBase.set('pet poisoning', 'Poisoning symptoms include vomiting, drooling, lethargy, seizures, or unusual behavior. Contact pet poison helpline or emergency vet immediately.')
    this.knowledgeBase.set('pet heat stroke', 'Heat stroke signs: excessive panting, drooling, bright red gums, vomiting, collapse. Move to cool area and seek immediate veterinary care.')
    this.knowledgeBase.set('pet bleeding', 'Control bleeding with clean cloth pressure. For severe bleeding, apply pressure and transport to vet immediately. Never use tourniquets.')
    this.knowledgeBase.set('pet seizures', 'During seizures, keep pet safe from injury, don\'t restrain, and time the episode. Contact vet immediately, especially for first-time seizures.')
    this.knowledgeBase.set('pet choking', 'Signs of choking: pawing at mouth, gagging, difficulty breathing. If visible object, try to remove carefully. Otherwise, seek immediate veterinary care.')
    this.knowledgeBase.set('pet broken bone', 'Signs of fracture: limping, swelling, pain, abnormal limb position. Immobilize if possible and transport to vet immediately.')
    this.knowledgeBase.set('pet wound care', 'Clean minor wounds with saline solution and apply antibiotic ointment. Deep wounds, puncture wounds, or signs of infection require veterinary care.')
    
    // Preventive Veterinary Medicine
    this.knowledgeBase.set('pet wellness exam', 'Annual wellness exams include physical examination, vaccinations, parasite screening, and health recommendations. Essential for early disease detection.')
    this.knowledgeBase.set('pet vaccination schedule', 'Puppies: 6-8 weeks, 10-12 weeks, 14-16 weeks, then annually. Kittens: 6-8 weeks, 10-12 weeks, 14-16 weeks, then annually.')
    this.knowledgeBase.set('pet parasite prevention', 'Monthly flea/tick prevention, quarterly deworming, and annual parasite screening. Consult vet for appropriate products for your pet.')
    this.knowledgeBase.set('pet dental cleaning', 'Professional dental cleaning removes tartar and prevents periodontal disease. Annual cleanings recommended, with daily home care.')
    this.knowledgeBase.set('pet spay neuter', 'Spaying/neutering prevents unwanted litters and reduces health risks. Recommended at 4-6 months for most pets. Consult vet for timing.')
    this.knowledgeBase.set('pet microchipping', 'Microchipping provides permanent identification if pet is lost. Simple procedure done by veterinarian with minimal discomfort.')
    this.knowledgeBase.set('pet nutrition planning', 'Nutrition needs vary by age, size, activity level, and health status. Consult vet for personalized feeding recommendations.')
    this.knowledgeBase.set('pet exercise needs', 'Exercise requirements vary by breed, age, and health. Regular exercise maintains physical and mental health. Consult vet for appropriate activity levels.')
    
    // Veterinary Diagnostic Procedures
    this.knowledgeBase.set('veterinary physical exam', 'Physical exams include checking vital signs, examining eyes/ears/mouth, palpating abdomen, checking joints, and assessing overall condition.')
    this.knowledgeBase.set('pet blood work', 'Blood tests evaluate organ function, detect infections, assess nutritional status, and monitor treatment progress. Fasting may be required.')
    this.knowledgeBase.set('pet urinalysis', 'Urine testing helps diagnose kidney disease, diabetes, infections, and other conditions. Fresh sample collection important for accurate results.')
    this.knowledgeBase.set('pet fecal exam', 'Fecal testing detects intestinal parasites, bacteria, and other gastrointestinal issues. Annual testing recommended for all pets.')
    this.knowledgeBase.set('pet imaging', 'Veterinary imaging includes X-rays, ultrasound, CT scans, and MRI. Helps diagnose fractures, tumors, heart disease, and internal problems.')
    this.knowledgeBase.set('pet biopsy', 'Biopsy involves removing tissue samples for microscopic examination. Helps diagnose cancer, infections, and inflammatory conditions.')
    this.knowledgeBase.set('pet endoscopy', 'Endoscopy uses flexible tubes with cameras to examine internal organs. Minimally invasive diagnostic procedure for gastrointestinal and respiratory issues.')
    
    // Veterinary Surgery and Procedures
    this.knowledgeBase.set('pet surgery preparation', 'Surgery preparation includes fasting, pre-anesthetic blood work, and instructions for home care. Follow vet\'s specific instructions carefully.')
    this.knowledgeBase.set('pet anesthesia', 'Veterinary anesthesia is carefully monitored with specialized equipment. Pre-anesthetic testing helps ensure safety during procedures.')
    this.knowledgeBase.set('pet surgery recovery', 'Post-surgery care includes pain management, wound care, activity restriction, and follow-up appointments. Follow vet\'s recovery instructions exactly.')
    this.knowledgeBase.set('pet dental surgery', 'Dental surgery may include extractions, gum surgery, or jaw procedures. Important for treating advanced dental disease and relieving pain.')
    this.knowledgeBase.set('pet orthopedic surgery', 'Orthopedic surgery treats fractures, joint problems, and ligament injuries. May include pins, plates, or joint replacement procedures.')
    this.knowledgeBase.set('pet soft tissue surgery', 'Soft tissue surgery includes tumor removal, organ surgery, and wound repair. Various techniques used depending on the specific condition.')
    
    // Pet Behavior and Training
    this.knowledgeBase.set('pet behavior problems', 'Common behavior issues include aggression, anxiety, house soiling, and destructive behavior. Professional training or veterinary behaviorist consultation may be needed.')
    this.knowledgeBase.set('pet anxiety', 'Pet anxiety can manifest as destructive behavior, excessive vocalization, or withdrawal. Treatment may include behavior modification, training, or medication.')
    this.knowledgeBase.set('pet aggression', 'Aggression can be fear-based, territorial, or resource-guarding. Professional evaluation and training essential for safety and behavior modification.')
    this.knowledgeBase.set('pet socialization', 'Proper socialization helps prevent behavior problems. Expose pets to various people, animals, and environments during critical development periods.')
    this.knowledgeBase.set('pet training methods', 'Positive reinforcement training uses rewards for desired behavior. Avoid punishment-based methods which can cause fear and aggression.')
    this.knowledgeBase.set('pet crate training', 'Crate training provides safe space and helps with house training. Introduce gradually with positive associations and never use as punishment.')
    
    // Pet Life Stages and Care
    this.knowledgeBase.set('puppy care', 'Puppy care includes proper nutrition, socialization, training, vaccinations, and regular veterinary check-ups. Critical period for development and behavior.')
    this.knowledgeBase.set('kitten care', 'Kitten care includes proper nutrition, litter box training, vaccinations, and regular veterinary check-ups. Early socialization important for behavior development.')
    this.knowledgeBase.set('senior pet care', 'Senior pets need more frequent veterinary check-ups, adjusted nutrition, and monitoring for age-related conditions. Quality of life assessment important.')
    this.knowledgeBase.set('pet pregnancy care', 'Pregnant pets need special nutrition, veterinary monitoring, and preparation for whelping/queening. Consult vet for proper prenatal care.')
    this.knowledgeBase.set('pet end of life care', 'End-of-life care focuses on comfort, pain management, and quality of life. Regular veterinary assessment and family support important during this difficult time.')
    
    // Veterinary Specialties
    this.knowledgeBase.set('veterinary cardiology', 'Veterinary cardiologists specialize in heart and cardiovascular conditions. Use echocardiography, ECG, and specialized treatments for heart disease.')
    this.knowledgeBase.set('veterinary dermatology', 'Veterinary dermatologists treat skin conditions, allergies, and ear problems. Use specialized testing and treatments for complex skin issues.')
    this.knowledgeBase.set('veterinary oncology', 'Veterinary oncologists specialize in cancer diagnosis and treatment. Provide chemotherapy, radiation, and surgical options for cancer patients.')
    this.knowledgeBase.set('veterinary neurology', 'Veterinary neurologists treat brain, spinal cord, and nerve disorders. Use advanced imaging and specialized procedures for neurological conditions.')
    this.knowledgeBase.set('veterinary ophthalmology', 'Veterinary ophthalmologists treat eye conditions and perform eye surgery. Specialized equipment and techniques for complex eye problems.')
    this.knowledgeBase.set('veterinary emergency', 'Emergency veterinarians provide 24/7 care for critical conditions. Equipped for trauma, surgery, and intensive care for seriously ill pets.')
    
    // Pet Health Monitoring
    this.knowledgeBase.set('pet vital signs', 'Normal vital signs: Dogs: heart rate 60-140 bpm, respiratory rate 10-30/min, temperature 100-102.5°F. Cats: heart rate 140-220 bpm, respiratory rate 20-30/min, temperature 100.5-102.5°F.')
    this.knowledgeBase.set('pet weight management', 'Maintain healthy weight through proper nutrition and exercise. Obesity increases risk of diabetes, arthritis, and heart disease. Regular weight monitoring important.')
    this.knowledgeBase.set('pet coat condition', 'Healthy coat should be shiny, smooth, and free of excessive shedding or bald patches. Poor coat condition may indicate health problems or nutritional deficiencies.')
    this.knowledgeBase.set('pet appetite monitoring', 'Changes in appetite can indicate illness. Monitor eating habits and contact vet for significant changes in food consumption or interest.')
    this.knowledgeBase.set('pet water consumption', 'Monitor water intake. Increased drinking may indicate diabetes, kidney disease, or other conditions. Decreased drinking can lead to dehydration.')
    this.knowledgeBase.set('pet bathroom habits', 'Monitor frequency and consistency of urination and defecation. Changes may indicate urinary tract problems, digestive issues, or other health concerns.')
    
    // Veterinary Medications and Treatments
    this.knowledgeBase.set('pet antibiotics', 'Antibiotics treat bacterial infections. Complete full course as prescribed. Never use human antibiotics without veterinary approval.')
    this.knowledgeBase.set('pet pain medication', 'Pain medications help manage discomfort from injury, surgery, or chronic conditions. Use only veterinary-prescribed medications.')
    this.knowledgeBase.set('pet flea treatment', 'Flea treatments include topical, oral, and collar products. Apply according to package directions and consult vet for product selection.')
    this.knowledgeBase.set('pet tick prevention', 'Tick prevention products protect against tick-borne diseases. Regular application and tick checks important, especially in endemic areas.')
    this.knowledgeBase.set('pet heartworm prevention', 'Heartworm prevention is essential in endemic areas. Monthly medication prevents this serious and potentially fatal disease.')
    this.knowledgeBase.set('pet deworming', 'Regular deworming prevents intestinal parasites. Products target different types of worms. Consult vet for appropriate schedule and products.')
    
    // Pet First Aid and Home Care
    this.knowledgeBase.set('pet first aid kit', 'Pet first aid kit should include: gauze, adhesive tape, scissors, tweezers, antiseptic solution, saline solution, and emergency contact numbers.')
    this.knowledgeBase.set('pet wound cleaning', 'Clean minor wounds with saline solution or mild soap and water. Apply antibiotic ointment and bandage if needed. Deep wounds require veterinary care.')
    this.knowledgeBase.set('pet bandaging', 'Apply bandages to protect wounds and prevent licking. Change regularly and monitor for signs of infection or circulation problems.')
    this.knowledgeBase.set('pet temperature taking', 'Use rectal thermometer for accurate temperature. Normal: 100-102.5°F. Lubricate thermometer and insert gently. Contact vet for fever or hypothermia.')
    this.knowledgeBase.set('pet medication administration', 'Follow veterinary instructions exactly. Use pill pockets, liquid forms, or injection techniques as directed. Never skip doses or stop early.')
    this.knowledgeBase.set('pet home monitoring', 'Monitor pets for changes in behavior, appetite, energy level, or bathroom habits. Early detection of problems improves treatment success.')
    
    // Comprehensive Educational Knowledge - 1st to 12th Standard
    // Mathematics Knowledge
    this.knowledgeBase.set('mathematics', 'Mathematics is the study of numbers, quantities, shapes, and patterns. It includes arithmetic, algebra, geometry, calculus, and statistics.')
    this.knowledgeBase.set('arithmetic', 'Arithmetic is basic mathematics including addition, subtraction, multiplication, and division. Foundation for all advanced math concepts.')
    this.knowledgeBase.set('algebra', 'Algebra uses letters and symbols to represent numbers and quantities. Includes solving equations, functions, and mathematical relationships.')
    this.knowledgeBase.set('geometry', 'Geometry studies shapes, sizes, positions, and dimensions. Includes points, lines, angles, polygons, circles, and 3D shapes.')
    this.knowledgeBase.set('calculus', 'Calculus studies continuous change and rates of change. Includes differentiation, integration, limits, and applications in science and engineering.')
    this.knowledgeBase.set('statistics', 'Statistics involves collecting, analyzing, and interpreting data. Includes probability, data visualization, and making informed decisions.')
    
    // Mathematics by Grade Level
    this.knowledgeBase.set('1st grade math', '1st grade math includes: counting to 100, basic addition/subtraction, place value, shapes, measurement, time, and money concepts.')
    this.knowledgeBase.set('2nd grade math', '2nd grade math includes: addition/subtraction within 1000, multiplication concepts, fractions, measurement, geometry, and problem solving.')
    this.knowledgeBase.set('3rd grade math', '3rd grade math includes: multiplication/division facts, fractions, area/perimeter, time, money, and multi-step word problems.')
    this.knowledgeBase.set('4th grade math', '4th grade math includes: multi-digit multiplication/division, fractions/decimals, geometry, measurement, and data analysis.')
    this.knowledgeBase.set('5th grade math', '5th grade math includes: operations with fractions/decimals, volume, coordinate planes, and algebraic thinking.')
    this.knowledgeBase.set('6th grade math', '6th grade math includes: ratios/proportions, expressions/equations, geometry, statistics, and negative numbers.')
    this.knowledgeBase.set('7th grade math', '7th grade math includes: proportional relationships, expressions/equations, geometry, statistics, and probability.')
    this.knowledgeBase.set('8th grade math', '8th grade math includes: linear equations, functions, geometry, statistics, and introduction to algebra.')
    this.knowledgeBase.set('9th grade math', '9th grade math includes: algebra fundamentals, linear equations, quadratic functions, geometry, and statistics.')
    this.knowledgeBase.set('10th grade math', '10th grade math includes: advanced algebra, geometry proofs, trigonometry, and mathematical modeling.')
    this.knowledgeBase.set('11th grade math', '11th grade math includes: pre-calculus, trigonometry, advanced algebra, and preparation for calculus.')
    this.knowledgeBase.set('12th grade math', '12th grade math includes: calculus, advanced trigonometry, statistics, and college preparation mathematics.')
    
    // Science Knowledge
    this.knowledgeBase.set('science', 'Science is the systematic study of the natural world through observation, experimentation, and evidence-based reasoning.')
    this.knowledgeBase.set('physics', 'Physics studies matter, energy, motion, and forces. Includes mechanics, thermodynamics, electricity, magnetism, and modern physics.')
    this.knowledgeBase.set('chemistry', 'Chemistry studies matter, its properties, composition, and changes. Includes atomic structure, chemical reactions, and molecular interactions.')
    this.knowledgeBase.set('biology', 'Biology studies living organisms and life processes. Includes cells, genetics, evolution, ecology, and human anatomy.')
    this.knowledgeBase.set('earth science', 'Earth science studies Earth\'s systems including geology, meteorology, oceanography, and astronomy.')
    
    // Science by Grade Level
    this.knowledgeBase.set('1st grade science', '1st grade science includes: living vs non-living things, basic plant/animal needs, weather patterns, and simple experiments.')
    this.knowledgeBase.set('2nd grade science', '2nd grade science includes: life cycles, habitats, states of matter, and forces of motion.')
    this.knowledgeBase.set('3rd grade science', '3rd grade science includes: ecosystems, weather/climate, forces/motion, and plant growth.')
    this.knowledgeBase.set('4th grade science', '4th grade science includes: energy, waves, Earth\'s systems, and engineering design.')
    this.knowledgeBase.set('5th grade science', '5th grade science includes: matter, ecosystems, Earth\'s place in universe, and engineering solutions.')
    this.knowledgeBase.set('6th grade science', '6th grade science includes: cells, energy, Earth\'s systems, and engineering design.')
    this.knowledgeBase.set('7th grade science', '7th grade science includes: matter/energy, life processes, Earth\'s systems, and engineering design.')
    this.knowledgeBase.set('8th grade science', '8th grade science includes: forces/motion, energy, waves, and engineering design.')
    this.knowledgeBase.set('9th grade science', '9th grade science includes: biology fundamentals, chemistry basics, physics concepts, and scientific inquiry.')
    this.knowledgeBase.set('10th grade science', '10th grade science includes: advanced biology, chemistry principles, physics applications, and research methods.')
    this.knowledgeBase.set('11th grade science', '11th grade science includes: specialized science courses, advanced laboratory work, and scientific research.')
    this.knowledgeBase.set('12th grade science', '12th grade science includes: advanced science electives, research projects, and college preparation.')
    
    // History Knowledge
    this.knowledgeBase.set('history', 'History is the study of past events, people, and societies. It helps us understand how the present came to be.')
    this.knowledgeBase.set('ancient history', 'Ancient history covers early civilizations including Mesopotamia, Egypt, Greece, Rome, China, and India.')
    this.knowledgeBase.set('medieval history', 'Medieval history covers the Middle Ages, including feudalism, the Crusades, and the Renaissance.')
    this.knowledgeBase.set('modern history', 'Modern history covers the period from the 1500s to present, including revolutions, world wars, and globalization.')
    this.knowledgeBase.set('world history', 'World history examines global events, interactions between civilizations, and the development of human societies.')
    
    // History by Grade Level
    this.knowledgeBase.set('1st grade history', '1st grade history includes: family history, community helpers, holidays, and basic timeline concepts.')
    this.knowledgeBase.set('2nd grade history', '2nd grade history includes: local history, famous Americans, and basic historical events.')
    this.knowledgeBase.set('3rd grade history', '3rd grade history includes: community history, Native Americans, and early American settlers.')
    this.knowledgeBase.set('4th grade history', '4th grade history includes: state history, American Revolution, and westward expansion.')
    this.knowledgeBase.set('5th grade history', '5th grade history includes: American history, government, and geography.')
    this.knowledgeBase.set('6th grade history', '6th grade history includes: ancient civilizations, world geography, and early human societies.')
    this.knowledgeBase.set('7th grade history', '7th grade history includes: medieval history, world religions, and global trade routes.')
    this.knowledgeBase.set('8th grade history', '8th grade history includes: American history from colonization to Civil War, government, and citizenship.')
    this.knowledgeBase.set('9th grade history', '9th grade history includes: world history, ancient civilizations, and medieval periods.')
    this.knowledgeBase.set('10th grade history', '10th grade history includes: modern world history, revolutions, and global conflicts.')
    this.knowledgeBase.set('11th grade history', '11th grade history includes: American history, government, and contemporary issues.')
    this.knowledgeBase.set('12th grade history', '12th grade history includes: specialized history courses, research methods, and current events.')
    
    // English Language Arts
    this.knowledgeBase.set('english', 'English Language Arts includes reading, writing, speaking, listening, and language skills.')
    this.knowledgeBase.set('reading', 'Reading involves decoding text, comprehension, analysis, and interpretation of written materials.')
    this.knowledgeBase.set('writing', 'Writing includes composition, grammar, vocabulary, and communication through written language.')
    this.knowledgeBase.set('grammar', 'Grammar is the system of rules governing the structure of language, including syntax, morphology, and punctuation.')
    this.knowledgeBase.set('literature', 'Literature includes fiction, non-fiction, poetry, and drama from various cultures and time periods.')
    
    // English by Grade Level
    this.knowledgeBase.set('1st grade english', '1st grade English includes: phonics, sight words, basic reading, simple writing, and listening skills.')
    this.knowledgeBase.set('2nd grade english', '2nd grade English includes: reading fluency, comprehension, writing sentences, and basic grammar.')
    this.knowledgeBase.set('3rd grade english', '3rd grade English includes: reading comprehension, paragraph writing, grammar rules, and vocabulary.')
    this.knowledgeBase.set('4th grade english', '4th grade English includes: reading analysis, essay writing, advanced grammar, and research skills.')
    this.knowledgeBase.set('5th grade english', '5th grade English includes: literature analysis, creative writing, grammar mastery, and presentation skills.')
    this.knowledgeBase.set('6th grade english', '6th grade English includes: novel studies, essay writing, grammar review, and public speaking.')
    this.knowledgeBase.set('7th grade english', '7th grade English includes: literary analysis, research writing, grammar application, and debate skills.')
    this.knowledgeBase.set('8th grade english', '8th grade English includes: classic literature, persuasive writing, grammar mastery, and speech preparation.')
    this.knowledgeBase.set('9th grade english', '9th grade English includes: world literature, analytical writing, grammar review, and communication skills.')
    this.knowledgeBase.set('10th grade english', '10th grade English includes: British literature, research writing, grammar application, and presentation skills.')
    this.knowledgeBase.set('11th grade english', '11th grade English includes: American literature, college writing, grammar mastery, and public speaking.')
    this.knowledgeBase.set('12th grade english', '12th grade English includes: world literature, college preparation, advanced writing, and communication mastery.')
    
    // Social Studies
    this.knowledgeBase.set('social studies', 'Social studies integrates history, geography, civics, economics, and sociology to understand human society.')
    this.knowledgeBase.set('geography', 'Geography studies Earth\'s physical features, human populations, and the relationship between people and their environment.')
    this.knowledgeBase.set('civics', 'Civics studies citizenship, government, political systems, and civic responsibilities.')
    this.knowledgeBase.set('economics', 'Economics studies how societies allocate scarce resources, including production, distribution, and consumption.')
    this.knowledgeBase.set('sociology', 'Sociology studies human social behavior, relationships, and social institutions.')
    
    // Social Studies by Grade Level
    this.knowledgeBase.set('1st grade social studies', '1st grade social studies includes: family, community, maps, and basic citizenship concepts.')
    this.knowledgeBase.set('2nd grade social studies', '2nd grade social studies includes: communities, geography, and cultural diversity.')
    this.knowledgeBase.set('3rd grade social studies', '3rd grade social studies includes: geography, economics, and government basics.')
    this.knowledgeBase.set('4th grade social studies', '4th grade social studies includes: state history, geography, and government systems.')
    this.knowledgeBase.set('5th grade social studies', '5th grade social studies includes: American history, geography, and civics.')
    this.knowledgeBase.set('6th grade social studies', '6th grade social studies includes: world geography, ancient civilizations, and cultural studies.')
    this.knowledgeBase.set('7th grade social studies', '7th grade social studies includes: world history, geography, and cultural diversity.')
    this.knowledgeBase.set('8th grade social studies', '8th grade social studies includes: American history, government, and citizenship.')
    this.knowledgeBase.set('9th grade social studies', '9th grade social studies includes: world geography, history, and cultural studies.')
    this.knowledgeBase.set('10th grade social studies', '10th grade social studies includes: world history, geography, and contemporary issues.')
    this.knowledgeBase.set('11th grade social studies', '11th grade social studies includes: American history, government, and economics.')
    this.knowledgeBase.set('12th grade social studies', '12th grade social studies includes: specialized courses, current events, and research methods.')
    
    // Advanced Mathematics Topics
    this.knowledgeBase.set('linear algebra', 'Linear algebra studies vectors, matrices, linear transformations, and systems of linear equations. Essential for computer science and engineering.')
    this.knowledgeBase.set('differential equations', 'Differential equations describe rates of change and are used in physics, engineering, and biology to model real-world phenomena.')
    this.knowledgeBase.set('number theory', 'Number theory studies properties of integers, prime numbers, divisibility, and mathematical patterns. Foundation for cryptography and computer security.')
    this.knowledgeBase.set('topology', 'Topology studies geometric properties preserved under continuous deformations. Important in modern mathematics and physics.')
    this.knowledgeBase.set('abstract algebra', 'Abstract algebra studies algebraic structures like groups, rings, and fields. Fundamental to modern mathematics and theoretical physics.')
    
    // Advanced Science Topics
    this.knowledgeBase.set('quantum mechanics', 'Quantum mechanics describes behavior of matter and energy at atomic and subatomic scales. Fundamental to modern physics and technology.')
    this.knowledgeBase.set('molecular biology', 'Molecular biology studies biological processes at molecular level, including DNA, RNA, and protein synthesis.')
    this.knowledgeBase.set('organic chemistry', 'Organic chemistry studies carbon-based compounds, essential for understanding life processes and developing new materials.')
    this.knowledgeBase.set('astrophysics', 'Astrophysics applies physics principles to study celestial objects, cosmic phenomena, and the universe\'s evolution.')
    this.knowledgeBase.set('genetics', 'Genetics studies inheritance, variation, and heredity in living organisms. Foundation for understanding evolution and disease.')
    
    // Advanced History Topics
    this.knowledgeBase.set('military history', 'Military history examines warfare, strategy, tactics, and the impact of conflicts on societies and civilizations.')
    this.knowledgeBase.set('economic history', 'Economic history studies economic systems, trade, development, and their influence on human societies over time.')
    this.knowledgeBase.set('cultural history', 'Cultural history explores art, literature, music, religion, and social customs across different societies and time periods.')
    this.knowledgeBase.set('diplomatic history', 'Diplomatic history studies international relations, treaties, negotiations, and foreign policy between nations.')
    this.knowledgeBase.set('intellectual history', 'Intellectual history examines ideas, philosophies, and intellectual movements that shaped human thought and society.')
    
    // Cross-Subject Connections
    this.knowledgeBase.set('mathematics in science', 'Mathematics is essential in science for modeling, measurement, data analysis, and understanding natural phenomena.')
    this.knowledgeBase.set('history and geography', 'History and geography are interconnected - historical events occur in specific places and are influenced by geographic factors.')
    this.knowledgeBase.set('science and technology', 'Science drives technological innovation, while technology enables new scientific discoveries and research methods.')
    this.knowledgeBase.set('mathematics and art', 'Mathematics underlies art through geometry, symmetry, patterns, and the golden ratio, creating aesthetic beauty.')
    this.knowledgeBase.set('literature and history', 'Literature reflects historical contexts and provides insights into past societies, cultures, and human experiences.')
    
    // Study Skills and Learning Methods
    this.knowledgeBase.set('note taking', 'Effective note-taking includes active listening, organizing information, using abbreviations, and reviewing notes regularly.')
    this.knowledgeBase.set('test preparation', 'Test preparation involves understanding material, practicing problems, reviewing notes, and managing test anxiety.')
    this.knowledgeBase.set('research methods', 'Research methods include identifying sources, evaluating credibility, organizing information, and presenting findings clearly.')
    this.knowledgeBase.set('critical thinking', 'Critical thinking involves analyzing information, evaluating arguments, identifying biases, and forming reasoned conclusions.')
    this.knowledgeBase.set('problem solving', 'Problem solving includes understanding the problem, planning solutions, implementing strategies, and evaluating results.')
    
    // Educational Technology
    this.knowledgeBase.set('online learning', 'Online learning uses digital platforms for education, including video lectures, interactive exercises, and virtual classrooms.')
    this.knowledgeBase.set('educational apps', 'Educational apps provide interactive learning experiences, practice exercises, and personalized instruction in various subjects.')
    this.knowledgeBase.set('virtual reality education', 'Virtual reality creates immersive learning environments for exploring historical sites, scientific concepts, and complex systems.')
    this.knowledgeBase.set('artificial intelligence in education', 'AI in education provides personalized learning, automated grading, and adaptive instruction based on student needs.')
    this.knowledgeBase.set('gamification in learning', 'Gamification uses game elements like points, badges, and challenges to increase engagement and motivation in learning.')
    
    // College and Career Preparation
    this.knowledgeBase.set('college preparation', 'College preparation includes academic readiness, standardized testing, application processes, and financial planning.')
    this.knowledgeBase.set('career exploration', 'Career exploration involves researching occupations, understanding requirements, and planning educational pathways.')
    this.knowledgeBase.set('academic planning', 'Academic planning includes course selection, credit requirements, and long-term educational goals.')
    this.knowledgeBase.set('study skills', 'Study skills include time management, active reading, memory techniques, and effective learning strategies.')
    this.knowledgeBase.set('academic writing', 'Academic writing involves research, analysis, clear communication, and proper citation of sources.')
    
    // Cross-Questioning and Learning Enhancement
    this.knowledgeBase.set('cross questioning', 'Cross-questioning helps deepen understanding by exploring connections between different subjects and concepts. Ask "how does this relate to..." or "what connects this to..."')
    this.knowledgeBase.set('interdisciplinary learning', 'Interdisciplinary learning connects knowledge across subjects. For example, math helps understand physics, history connects to literature, and geography influences historical events.')
    this.knowledgeBase.set('critical analysis', 'Critical analysis involves examining information from multiple perspectives, questioning assumptions, and evaluating evidence to form reasoned conclusions.')
    this.knowledgeBase.set('synthesis', 'Synthesis combines information from multiple sources to create new understanding and insights. Essential for research and advanced learning.')
    this.knowledgeBase.set('application', 'Application involves using learned concepts to solve real-world problems. Practice applying knowledge in different contexts to deepen understanding.')
    
    // Subject-Specific Advanced Topics
    this.knowledgeBase.set('calculus applications', 'Calculus applications include physics (motion, forces), engineering (optimization), economics (marginal analysis), and biology (population growth).')
    this.knowledgeBase.set('chemistry in daily life', 'Chemistry in daily life includes cooking (chemical reactions), cleaning (surfactants), medicine (drug interactions), and environmental processes.')
    this.knowledgeBase.set('biology and medicine', 'Biology and medicine connect through understanding disease mechanisms, drug development, genetic engineering, and personalized medicine approaches.')
    this.knowledgeBase.set('physics and technology', 'Physics and technology connect through electronics (electricity/magnetism), telecommunications (waves), and modern devices (quantum mechanics).')
    this.knowledgeBase.set('history and current events', 'History and current events connect through understanding patterns, learning from past mistakes, and recognizing recurring themes in human behavior.')
    
    // Learning Strategies and Techniques
    this.knowledgeBase.set('active learning', 'Active learning involves engaging with material through discussion, practice, teaching others, and applying concepts rather than passive reading.')
    this.knowledgeBase.set('spaced repetition', 'Spaced repetition involves reviewing material at increasing intervals to improve long-term retention and understanding.')
    this.knowledgeBase.set('mind mapping', 'Mind mapping creates visual connections between concepts, helping organize information and identify relationships between ideas.')
    this.knowledgeBase.set('peer teaching', 'Peer teaching reinforces learning by explaining concepts to others, identifying knowledge gaps, and gaining new perspectives.')
    this.knowledgeBase.set('real-world connections', 'Real-world connections help understand abstract concepts by relating them to familiar situations and practical applications.')
    
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
          'What\'s a dog\'s favorite pizza? Pupperoni!',
          'Why did the cat go to the vet? Because it was feline under the weather! 😸',
          'What do you call a veterinarian who only treats cats? A purr-fessional!',
          'Why did the pet bring a suitcase to the vet? Because it was going on a pet-ernity leave! 🐾',
          'What do you call a dog that works at the vet clinic? A lab assistant!',
          'Why did the puppy go to the vet? Because it was having a ruff day! 🐶',
          'What do you call a vet who specializes in fish? A fin-isher! 🐠',
          'Why was the math book sad? Because it had too many problems! 📚',
          'What do you call a bear with no teeth? A gummy bear! 🐻',
          'Why did the scarecrow win an award? Because he was outstanding in his field! 🌾',
          'What do you call a fake noodle? An impasta! 🍝',
          'Why did the bicycle fall over? Because it was two-tired! 🚲',
          'What do you call a can opener that doesn\'t work? A can\'t opener! 🥫',
          'Why did the student eat his homework? Because the teacher said it was a piece of cake! 🍰',
          'What do you call a math teacher who likes to garden? A square root! 🌱',
          'Why did the history teacher go to the beach? To study the current events! 🌊',
          'What do you call a science teacher who loves music? A sound scientist! 🎵'
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
      // Pet Health Emergency patterns
      {
        patterns: ['pet emergency', 'emergency vet', 'pet sick', 'pet hurt', 'pet bleeding', 'pet seizure', 'pet choking'],
        responses: [
          'Pet emergencies require immediate veterinary attention! Signs include difficulty breathing, severe bleeding, seizures, collapse, or extreme lethargy. Contact emergency vet immediately!',
          'Woof! Pet emergencies are serious! If your pet shows signs of distress, bleeding, seizures, or breathing problems, seek emergency veterinary care right away!',
          'Arf! Pet emergencies need immediate help! Contact emergency vet for severe symptoms like bleeding, seizures, breathing problems, or collapse!',
          'Bark! Pet emergencies are urgent! Signs include severe pain, bleeding, seizures, or breathing problems. Don\'t wait - contact emergency vet immediately!'
        ],
        category: 'pet_emergency'
      },
      // Pet Symptoms patterns
      {
        patterns: ['pet vomiting', 'pet diarrhea', 'pet limping', 'pet coughing', 'pet sneezing', 'pet itching', 'pet not eating'],
        responses: [
          'Pet symptoms can indicate various health issues. Monitor your pet closely and contact your veterinarian if symptoms persist or worsen. Early detection improves treatment success!',
          'Woof! Pet symptoms need attention! While some issues resolve on their own, persistent symptoms require veterinary evaluation. Contact your vet for guidance!',
          'Arf! Pet symptoms can be concerning! Monitor changes in behavior, appetite, or bathroom habits. Consult your veterinarian for persistent or severe symptoms!',
          'Bark! Pet symptoms vary in severity. Some need immediate attention, others can be monitored. When in doubt, contact your veterinarian for professional advice!'
        ],
        category: 'pet_symptoms'
      },
      // Pet Care and Prevention patterns
      {
        patterns: ['pet care', 'pet prevention', 'pet vaccination', 'pet checkup', 'pet wellness', 'pet grooming', 'pet exercise'],
        responses: [
          'Preventive pet care includes regular check-ups, vaccinations, parasite prevention, dental care, and proper nutrition. Prevention is key to long-term pet health!',
          'Woof! Preventive care keeps pets healthy! Regular vet visits, vaccinations, and parasite prevention help avoid serious health problems later!',
          'Arf! Pet care is about prevention! Regular check-ups, vaccinations, and proper nutrition help maintain your pet\'s health and catch problems early!',
          'Bark! Preventive care is essential! Regular vet visits, vaccinations, and parasite prevention are investments in your pet\'s long-term health and happiness!'
        ],
        category: 'pet_care'
      },
      // Pet Nutrition patterns
      {
        patterns: ['pet food', 'pet nutrition', 'pet diet', 'pet feeding', 'pet treats', 'pet supplements'],
        responses: [
          'Pet nutrition is crucial for health! Choose age-appropriate, high-quality food, provide fresh water, and consult your vet for dietary recommendations specific to your pet!',
          'Woof! Pet nutrition matters! Proper diet supports health, energy, and longevity. Consult your veterinarian for personalized feeding recommendations!',
          'Arf! Pet food choices affect health! Look for balanced nutrition, appropriate for age and health status. Your vet can recommend the best diet for your pet!',
          'Bark! Pet nutrition is important! Quality food, proper portions, and fresh water support overall health. Ask your vet about dietary needs for your specific pet!'
        ],
        category: 'pet_nutrition'
      },
      // Pet Behavior patterns
      {
        patterns: ['pet behavior', 'pet training', 'pet anxiety', 'pet aggression', 'pet socialization', 'pet crate training'],
        responses: [
          'Pet behavior reflects health and training! Positive reinforcement training, proper socialization, and addressing anxiety early help prevent behavior problems!',
          'Woof! Pet behavior is important! Training, socialization, and addressing anxiety early help create well-behaved, happy pets. Professional help may be needed for serious issues!',
          'Arf! Pet behavior needs attention! Positive training methods, early socialization, and addressing anxiety help prevent problems. Consult professionals for complex behavior issues!',
          'Bark! Pet behavior affects everyone! Proper training, socialization, and early intervention for anxiety help create harmonious pet-human relationships!'
        ],
        category: 'pet_behavior'
      },
      // Pet Life Stages patterns
      {
        patterns: ['puppy care', 'kitten care', 'senior pet', 'aging pet', 'pet pregnancy', 'pet development'],
        responses: [
          'Pet care varies by life stage! Puppies/kittens need socialization and vaccinations, adults need maintenance, and seniors need special attention. Each stage has unique needs!',
          'Woof! Pet life stages matter! Young pets need training and socialization, adults need maintenance, and seniors need special care. Adapt care to your pet\'s age!',
          'Arf! Pet care changes with age! Young pets need guidance, adults need routine care, and seniors need monitoring. Consult your vet for age-appropriate care!',
          'Bark! Pet life stages are important! Each stage has specific needs for nutrition, exercise, and veterinary care. Your vet can guide you through each phase!'
        ],
        category: 'pet_life_stages'
      },
      // Veterinary Procedures patterns
      {
        patterns: ['pet surgery', 'pet anesthesia', 'pet xray', 'pet blood test', 'pet ultrasound', 'pet dental cleaning'],
        responses: [
          'Veterinary procedures help diagnose and treat pet health issues! Modern veterinary medicine uses advanced technology and techniques to provide the best care possible!',
          'Woof! Veterinary procedures are important! From routine check-ups to advanced diagnostics, modern vet care helps keep pets healthy and happy!',
          'Arf! Vet procedures save lives! Diagnostic tests, surgery, and treatments help pets recover from illness and injury. Trust your veterinarian\'s recommendations!',
          'Bark! Veterinary procedures are essential! Modern diagnostics and treatments help veterinarians provide the best possible care for your beloved pets!'
        ],
        category: 'veterinary_procedures'
      },
      // Mathematics Education patterns
      {
        patterns: ['math', 'mathematics', 'algebra', 'geometry', 'calculus', 'arithmetic', 'statistics'],
        responses: [
          'Mathematics is fundamental to understanding the world! From basic arithmetic to advanced calculus, math helps solve problems and model real-world phenomena!',
          'Woof! Math is everywhere! Whether you\'re learning basic arithmetic or advanced calculus, I can help explain concepts and solve problems!',
          'Arf! Mathematics connects everything! From counting to calculus, math provides tools for science, engineering, and everyday problem solving!',
          'Bark! Math is the language of science! From simple calculations to complex equations, mathematics helps us understand patterns and relationships!'
        ],
        category: 'mathematics_education'
      },
      // Science Education patterns
      {
        patterns: ['science', 'physics', 'chemistry', 'biology', 'earth science', 'experiment', 'scientific method'],
        responses: [
          'Science explores the natural world through observation and experimentation! From biology to physics, science helps us understand how everything works!',
          'Woof! Science is fascinating! Whether studying cells, chemical reactions, or forces of nature, I can help explain scientific concepts and principles!',
          'Arf! Science drives discovery! From understanding life processes to exploring the universe, scientific inquiry expands our knowledge!',
          'Bark! Science explains the world! From atoms to galaxies, scientific knowledge helps us understand natural phenomena and solve problems!'
        ],
        category: 'science_education'
      },
      // History Education patterns
      {
        patterns: ['history', 'ancient history', 'medieval history', 'modern history', 'world history', 'historical events'],
        responses: [
          'History helps us understand how the present came to be! From ancient civilizations to modern events, history provides context for today\'s world!',
          'Woof! History is our story! Studying past events, people, and societies helps us understand human behavior and cultural development!',
          'Arf! History connects us! From ancient empires to modern nations, historical knowledge helps us understand different cultures and perspectives!',
          'Bark! History teaches lessons! Understanding past events helps us make better decisions and appreciate the complexity of human societies!'
        ],
        category: 'history_education'
      },
      // English Language Arts patterns
      {
        patterns: ['english', 'reading', 'writing', 'grammar', 'literature', 'language arts', 'composition'],
        responses: [
          'English Language Arts develop communication skills! Reading, writing, speaking, and listening are essential for success in school and life!',
          'Woof! Language skills are powerful! Whether reading literature, writing essays, or analyzing texts, English helps us communicate effectively!',
          'Arf! Language connects people! Reading diverse literature and developing writing skills help us understand different perspectives and express ideas clearly!',
          'Bark! English builds communication! From basic grammar to advanced analysis, language arts develop critical thinking and expression skills!'
        ],
        category: 'english_education'
      },
      // Social Studies patterns
      {
        patterns: ['social studies', 'geography', 'civics', 'economics', 'sociology', 'government', 'culture'],
        responses: [
          'Social studies help us understand human society! Geography, history, government, and economics provide insights into how people live and interact!',
          'Woof! Social studies are important! Understanding geography, government, and cultures helps us become informed citizens and global thinkers!',
          'Arf! Society is complex! Social studies help us understand different cultures, economic systems, and political structures around the world!',
          'Bark! Social studies connect us! From local communities to global systems, understanding society helps us navigate an interconnected world!'
        ],
        category: 'social_studies_education'
      },
      // Grade Level Education patterns
      {
        patterns: ['1st grade', '2nd grade', '3rd grade', '4th grade', '5th grade', '6th grade', '7th grade', '8th grade', '9th grade', '10th grade', '11th grade', '12th grade'],
        responses: [
          'Each grade level builds important skills and knowledge! I can help explain concepts appropriate for your grade level and provide guidance for learning!',
          'Woof! Every grade is important! Each year builds on previous learning and prepares you for more advanced concepts. What specific subject or topic do you need help with?',
          'Arf! Grade levels matter! Each grade introduces new concepts and skills. I can help explain topics appropriate for your level and suggest ways to improve!',
          'Bark! Learning is progressive! Each grade level prepares you for the next. I can help with current topics and prepare you for future challenges!'
        ],
        category: 'grade_level_education'
      },
      // Study Skills patterns
      {
        patterns: ['study skills', 'note taking', 'test preparation', 'research methods', 'critical thinking', 'problem solving'],
        responses: [
          'Study skills are essential for academic success! Effective note-taking, test preparation, and critical thinking help you learn more effectively!',
          'Woof! Study skills matter! Good note-taking, time management, and test preparation strategies can significantly improve your academic performance!',
          'Arf! Learning how to learn is important! Study skills like critical thinking and problem solving help you succeed in school and beyond!',
          'Bark! Study skills are powerful tools! From note-taking to research methods, developing good study habits helps you achieve your academic goals!'
        ],
        category: 'study_skills'
      },
      // Cross-Subject Learning patterns
      {
        patterns: ['cross subject', 'interdisciplinary', 'connections', 'related topics', 'how subjects connect'],
        responses: [
          'Subjects are interconnected! Mathematics supports science, history connects to geography, and literature reflects historical contexts. Understanding these connections deepens learning!',
          'Woof! Subjects don\'t exist in isolation! Math helps in science, history connects to literature, and geography influences historical events. These connections make learning more meaningful!',
          'Arf! Learning is connected! Understanding how subjects relate to each other helps you see the bigger picture and apply knowledge across different areas!',
          'Bark! Interdisciplinary learning is powerful! Seeing connections between subjects helps you understand complex topics and develop critical thinking skills!'
        ],
        category: 'cross_subject_learning'
      },
      // Advanced Topics patterns
      {
        patterns: ['advanced math', 'advanced science', 'advanced history', 'college level', 'university topics'],
        responses: [
          'Advanced topics build on fundamental knowledge! Whether it\'s calculus, quantum physics, or advanced research methods, I can help explain complex concepts!',
          'Woof! Advanced topics are exciting! From linear algebra to molecular biology, advanced learning opens new possibilities and career opportunities!',
          'Arf! Advanced knowledge is valuable! Understanding complex topics helps you think critically and solve sophisticated problems in various fields!',
          'Bark! Advanced learning is rewarding! Mastering complex subjects prepares you for higher education and professional success!'
        ],
        category: 'advanced_topics'
      },
      // Homework Help patterns
      {
        patterns: ['homework help', 'assignment help', 'project help', 'problem solving', 'understanding concepts'],
        responses: [
          'I\'m here to help with homework and assignments! I can explain concepts, help solve problems, and guide you toward understanding rather than just giving answers!',
          'Woof! Homework help is my specialty! I can break down complex problems, explain difficult concepts, and help you develop problem-solving skills!',
          'Arf! Learning together is fun! I can help you understand homework problems, explain concepts clearly, and guide you toward independent problem solving!',
          'Bark! Homework help builds skills! I can assist with understanding concepts, solving problems, and developing the confidence to tackle similar challenges!'
        ],
        category: 'homework_help'
      },
      // Test Preparation patterns
      {
        patterns: ['test prep', 'exam preparation', 'study guide', 'practice questions', 'test anxiety'],
        responses: [
          'Test preparation is key to success! Understanding material, practicing problems, and managing test anxiety all contribute to better performance!',
          'Woof! Test prep reduces anxiety! Creating study guides, practicing problems, and developing test-taking strategies help you feel confident and prepared!',
          'Arf! Preparation builds confidence! Understanding concepts, practicing problems, and developing study strategies help you perform your best on tests!',
          'Bark! Test prep is systematic! Breaking down material, creating study guides, and practicing regularly help you master content and reduce anxiety!'
        ],
        category: 'test_preparation'
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