import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { PersonalInfo } from '@/lib/models/PersonalInfo';
import { Award } from '@/lib/models/Award';
import { Publication } from '@/lib/models/Publication';
import { ResearchProject, PhDStudent, Patent } from '@/lib/models/Research';
import { StudentProject, StudentAchievement, CompetitionMentorship } from '@/lib/models/Student';
import {
  Qualification,
  Experience,
  ProfessionalMembership,
  PresentAffiliation,
  Grant,
} from '@/lib/models/Leadership';
import { HeroSlide } from '@/lib/models/HeroSlide';
import { GalleryImage } from '@/lib/models/GalleryImage';
import { GalleryVideo } from '@/lib/models/GalleryVideo';

// ─── Seed data (migrated from /data/*.ts) ────────────────────────────────────

const GALLERY_IMAGES_DATA = [
  { url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80', title: 'Robotics Lab', description: 'Research in progress at the robotics laboratory', category: 'lab', active: true, order: 0 },
  { url: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80', title: 'AI Research', description: 'Exploring artificial intelligence and automation', category: 'research', active: true, order: 1 },
  { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80', title: 'Circuit Design', description: 'Electronic systems and circuit board design', category: 'lab', active: true, order: 2 },
  { url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80', title: 'COEP Campus', description: 'COEP Technological University, Pune', category: 'campus', active: true, order: 3 },
  { url: 'https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?w=800&q=80', title: 'Engineering Workshop', description: 'Hands-on engineering training', category: 'lab', active: true, order: 4 },
  { url: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80', title: 'Conference', description: 'Presenting research at international conferences', category: 'conference', active: true, order: 5 },
];

const GALLERY_VIDEOS_DATA: Array<{ url: string; title: string; description: string; active: boolean; order: number }> = [];

const HERO_SLIDES_DATA = [
  { url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920&q=80', type: 'image', alt: 'Robotics research', active: true, order: 0 },
  { url: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1920&q=80', type: 'image', alt: 'Technology and AI', active: true, order: 1 },
  { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80', type: 'image', alt: 'Engineering circuits', active: true, order: 2 },
  { url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1920&q=80', type: 'image', alt: 'University campus', active: true, order: 3 },
];

const PERSONAL_INFO = {
  name: 'Dr. Shantipal Suresh Ohol',
  designation: 'Associate Professor in Mechanical Engineering Department',
  institution: 'COEP Technological University, Pune',
  email: ['sso.mech@coep.ac.in', 'shantipalso@gmail.com'],
  qualification: 'B.E. (Mech), M.E. (Manuf & Auto), Ph.D. (Mech)',
  summary:
    'Senior academic professional with 29+ years of teaching experience, 17 years of research experience, and extensive expertise in Robotics, Automation, and Mechanical Engineering. Passionate about innovation in education and cutting-edge research in robotics technology.',
  profileImage:
    'https://0.academia-photos.com/31412733/84850451/73489486/s200_ss.ohol.jpeg',
  professionalPhilosophy:
    'Extreme will-power to work hard with strong determination and focused attitude, having a good aptitude for learning. Good team-worker, adaptable, flexible, and well natured. Having good decision-making and improvisations skills, even under pressure. Self-motivated, committed and with a firm sense of responsibility. Organized, with good spoken and written communication skills. Willingness to work to the fullest capacity in a healthy environment, expand my knowledge and work for the progress of the Organization.',
  stats: {
    academicExperience: '29+',
    industrialExperience: '1.7',
    researchExperience: '17',
    administrativeExperience: '15',
    internationalJournals: 29,
    nationalJournals: 3,
    internationalConferences: 61,
    nationalConferences: 5,
    bookChapters: 3,
    books: 2,
    patentsAwarded: 4,
    patentsFiled: 0,
    phdCompleted: 3,
    phdOngoing: 5,
    mtechProjects: 58,
    btechProjects: '60+',
    internationalAwards: 5,
    nationalAwards: 4,
    instituteAwards: 14,
    grantsReceived: '₹3+ Crores',
  },
  currentPortfolios: [
    'Nodal Center Coordinator, COEP Tech for Maharashtra Drone Mission',
    'Head, Center of Excellence in Robotics & AI, COEP Tech Pune',
    'Chairman, Scholarship Committee, COEP Tech Pune',
    'Member – Academic Council, COEP Tech Pune',
    'Faculty Adviser – Robot Study Circle (RSC), COEP Tech Pune',
    'UG Course Coordinator – BTech (Robotics & AI) at COEP Tech Pune',
    'PG Course Coordinator – MTech (Robotics & AI) at COEP Tech Pune',
    'Advisor – Student Chapter of The Robotics Society, India, COEP Tech',
    'Lab. In-charge – Centralized Robotics & Automation Lab, COEP',
  ],
  industryCoalitions: [
    'Project review committee member for different projects at various DRDO laboratories',
    'Executive Committee member of Robolab Technologies Pvt Ltd, Pune (Sept 2016)',
    'Technical Advisor to Combat Robotics India Pvt Ltd., Pune (Dec 2017)',
    'Technical Advisor on the Board of iTech Robotics & Automation Pvt. Ltd., Pune',
    'Consulting Director at AIRo Technologies, Pune (March 2021)',
    'Member of Advisory Board of InfinityX Stem Foundation, Pune (Feb 2023)',
  ],
  researchInterests: [
    'Robotics',
    'Automation',
    'Mechatronics',
    'AI in Robotics',
    'Industrial Robotics',
    'Humanoid Robotics',
    'Exoskeletons',
    'Machine Design',
    'Control Systems',
  ],
};

const QUALIFICATIONS = [
  { degree: 'B.E. (Mechanical)', institution: 'Govt. College of Engineering, Pune (COEP)', university: 'Pune University', year: '1994', specialization: 'I.C. Engine & Automobile Engineering', class: 'First', order: 0 },
  { degree: 'M.E. (Production)', institution: 'Govt. College of Engineering, Pune (COEP)', university: 'Pune University (SPPU)', year: '1998', specialization: 'Manufacturing Automation', class: 'First', order: 1 },
  { degree: 'Ph.D. (Mechanical)', institution: 'Govt. College of Engineering, Pune (COEP)', university: 'Pune University (SPPU)', year: 'May 2010', specialization: 'Mechanical Engineering', thesis: 'Improvement in the Grasping Modality of Robotic Gripper', order: 2 },
];

const EXPERIENCE = [
  { type: 'industrial', organization: 'Suyaan Transmissions Pvt. Ltd., Pune', designation: 'Quality Control Engineer', period: 'July 1994 - November 1995', duration: '1.7 years', responsibilities: 'Quality Control & Local Area Management Responsibilities', reason: 'For better Prospects', order: 0 },
  { type: 'teaching', organization: "A.I.S.S.M.S's College of Engineering, Pune", designation: 'Lecturer in Mechanical Engineering Department', period: 'August 1996 - March 2003', duration: '~7 years', order: 0 },
  { type: 'teaching', organization: "Maeers' Maharashtra Academy of Naval Education & Training (MANET), Pune", designation: 'Assistant Professor in Mechanical Engineering Department', period: 'March 2003 - October 2003', duration: '~8 months', order: 1 },
  { type: 'teaching', organization: "PIET's College of Engineering, Pune", designation: 'Lecturer in Mechanical Engineering Department', period: 'November 2003 - November 2005', duration: '2 years', order: 2 },
  { type: 'teaching', organization: "PIET's College of Engineering, Pune", designation: 'Assistant Professor in Mechanical Engineering Department', period: 'December 2005 - November 2008', duration: '3 years', order: 3 },
  { type: 'teaching', organization: 'College of Engineering Pune (COEP)', designation: 'Associate Professor in Mechanical Engineering Department', period: 'December 2008 - June 2023', duration: '~15 years', order: 4 },
  { type: 'teaching', organization: 'COEP Technological University, Pune', designation: 'Associate Professor in Mechanical Engineering Department', period: 'June 2023 - Present', duration: 'Present', order: 5 },
];

const MEMBERSHIPS = [
  { name: 'ISSE', type: 'Life Membership', organization: 'Indian Society of Systems for Science & Engineering', year: '2024', order: 0 },
  { name: 'SMIEEE', type: 'Senior Member', organization: 'IEEE & IEEE Robotics and Automation Society', year: '2022', order: 1 },
  { name: 'MSAE', type: 'Member', organization: 'Society of Automotive Engineers', year: '2022', order: 2 },
  { name: 'MTRS', type: 'Life Member', organization: 'The Robotics Society, India', year: '2012', order: 3 },
  { name: 'FIE', type: 'Fellow', organization: 'The Institution of Engineers (India)', year: '2010', order: 4 },
  { name: 'MISOI', type: 'Member', organization: 'Instrument Society India', year: '2010', order: 5 },
  { name: 'MIE', type: 'Member', organization: 'The Institution of Engineers (India)', year: '2008', order: 6 },
  { name: 'Chartered Engineer', type: 'Chartered', organization: 'The Institution of Engineers (India)', year: '2003', order: 7 },
  { name: 'MIIPE', type: 'Member', organization: 'The Indian Institute of Production Engineers', year: '1998', order: 8 },
  { name: 'MISTE', type: 'Life Member', organization: 'Indian Society for Technical Education', year: '1997', order: 9 },
];

const AFFILIATIONS = [
  { role: 'Juror – Mechatronics', organization: 'CII National Selections for World Skills International Competition 2013, NSDC & World Skill India', order: 0 },
  { role: 'Judge', organization: 'First Lego League (FLL) India National Competition, FLL India & India STEM Foundation, Feb 2014', order: 1 },
  { role: 'Expert / Interview Board Member', organization: 'DRTC, Central Assessment Board, 2015, 2016, 2022, Ministry of Defence, DRDO', order: 2 },
  { role: 'Reviewer', organization: '17th International Conference on Advanced Robotics (ICAR 2015), Istanbul, Turkey', order: 3 },
  { role: 'Reviewer', organization: "Advances in Robotics (AIR 2015), The Robotics Society of India, Goa", order: 4 },
  { role: 'Member – Armament Design, Mechanism & Ballistics (ADMB) Panel', organization: 'Armament Research Board ARMREB, DRDO, India, Aug 2014 – Oct 2019', order: 5 },
  { role: 'Member – Panel of Judges at ROBOCON', organization: 'National Robotics Competition by Doordarshan, India for ABU International – MIT Pune (2015–2018) & IIT Delhi (2019–2023)', order: 6 },
  { role: 'Students Coordinator – Governing Council', organization: 'The Robotics Society, India, July 2017', order: 7 },
  { role: 'Member – PGD-18 Committee', organization: 'Bureau of Indian Standards (BIS), India (Production & General Engineering / Industrial Automation & Robotics), 9th Aug 2018', order: 8 },
  { role: 'Member – Vidyalaya Management Committee', organization: 'Kendriya Vidyalaya, CME, Dapodi, Pune 2018', order: 9 },
  { role: 'Advisor – Centre for Robotics & Automation', organization: 'Institute of Technology, NIRMA University, Ahmedabad, April 2019', order: 10 },
  { role: 'Zonal Editor', organization: 'Newsletter of Association for Machines & Mechanisms (AMM), Indian affiliate of IFToMM, from Aug 2019', order: 11 },
  { role: 'Chief Judge & Organiser', organization: 'Regional ROBOTEX Competition, COEP, 21st July 2019 for International ROBOTEX Tallinn, Estonia', order: 12 },
  { role: 'Judge', organization: 'Nirma Robocup contest, Nirma University, Ahmedabad, October 2019', order: 13 },
  { role: 'Chief Judge', organization: 'Robotic Competition CME Milbotics 2019-20, College of Military Engineering Pune, 16th Jan 2020', order: 14 },
  { role: 'Curriculum Committee Member', organization: 'AICTE Minor Degree course in Robotics, Delhi, Oct 2020', order: 15 },
  { role: 'Session Chairman – Modelling & Simulation of Mechanism', organization: 'ARMS 2021, 12th National Conference on Aerospace & Defence Related Mechanisms, ARDE, Pune, 02–04 Dec 2021', order: 16 },
  { role: 'Track Chairman – Robotics, Control, Instrumentation & Automation', organization: 'ICIT 2021–2025, 6th–10th International Conference on Intelligent Technologies (ASRES & SCMR), Singapore', order: 17 },
  { role: 'Curriculum Committee Member', organization: 'AICTE Model Curriculum for UG Degree in Robotics & Artificial Intelligence, Dec 2021', order: 18 },
  { role: 'Chair – IEEE Pune Joint Chapter', organization: 'Robotics & Automation and Control Systems (JCRA&CS), inaugurated at COEP on 18th May 2022', order: 19 },
  { role: 'Track Chairman', organization: 'ICAME 2022 – 2nd International Conference on Advances in Mechanical Engineering, College of Engineering Pune, June 23–25, 2022', order: 20 },
  { role: 'Co-Convenor', organization: '3rd International Virtual Conference on Intelligent Robotics, Mechatronics & Automation Systems (IRMAS 2023), VIT Chennai, May 04–05, 2023', order: 21 },
  { role: 'Judge & Co-Organiser', organization: 'FTC (FIRST TECH CHALLENGE) India Championship 2022-23, InfinityX, Balewadi Sports Complex, Pune, 10–12 March 2023', order: 22 },
  { role: 'Organising Committee Member', organization: 'National Workshop on Advanced Legged Robotics (NWALR-2025), ISSE Pune Chapter, R&DE(E) & COEP Tech, 08–10 May 2025', order: 23 },
  { role: 'Organising Committee Member', organization: 'ROSCon India 2025, COEP Technological University, 18–20 Dec 2025 with Acceleration Robotics & Rigbetel Labs, Pune', order: 24 },
  { role: 'Board of Studies Member (BOS)', organization: 'Various Institutes and Universities: SPPU, DIAT, KJ Somaiya, Bharati Vidyapeeth, KIT Kolhapur, JSPM, DYPatil, Zeal COE, AIT, KKWIEER Nashik', order: 25 },
  { role: 'Expert – Central Assessment Board', organization: 'Ministry of Defence, DRDO', order: 26 },
];

const GRANTS = [
  { source: 'ARMREB, DRDO, Ministry of Defence, Govt of India', amount: 'Rs 99.60 Lakhs', year: '2024', purpose: 'Research project under Grant-in Aid scheme', order: 0 },
  { source: 'WIPRO - PARI Ltd, Pune', amount: 'Rs 2,50,00,000/-', year: '2022', purpose: 'Naming MANGESH KALE Robotics & Automation Lab, COEP and WIPRO-PARI Advanced Technology Center', order: 1 },
  { source: 'CARSE, DRDO – Research Projects', amount: '@ Rs 30 Lakhs', year: '2013-2017', purpose: '3 research projects', order: 2 },
  { source: 'TEQIP (I, II & III) & Institute', amount: '@ Rs. 1,06,32,680/- (Rs 1.06 Cr)', year: 'Multiple years', purpose: 'Equipment purchases and lab development', order: 3 },
  { source: 'Siemens Industry Software (India) Pvt. Ltd', amount: '@Rs 25,50,000/-', year: '2017-19', purpose: 'ROBOCON sponsorship', order: 4 },
  { source: 'VOLKSWAGEN India Pvt. Ltd., Pune', amount: 'Rs 3,50,000/-', year: '2017', purpose: 'International ROBOCON 2017 competition at Tokyo, Japan', order: 5 },
];

const AWARDS = [
  // International (5)
  { category: 'international', title: 'Outstanding Paper of the International Conference – ICMEE 09', year: '2009', organization: 'ICMEE 2009, Chennai & ICMLC 2009, Perth, Australia', description: 'For outstanding research paper presentation on Multifingered Robotic Gripper', order: 0 },
  { category: 'international', title: 'Excellent Paper Award', year: '2014', organization: 'International Conference on Robotics, Mechanics and Mechatronics (ICRMM 2014), Bali, Indonesia', description: 'Performance Improvisation of SCORBOT-ER 4u Robot Arm by Simulation', order: 1 },
  { category: 'international', title: '6th Rank, Prof Nagasse Award and Most Lovely Robot Award', year: '2017', organization: 'International ROBOCON 2017, Tokyo, Japan', description: 'Team COEP competed against 18 country teams', order: 2 },
  { category: 'international', title: 'Second Prize in Short Paper Presentations & Posters', year: '2017', organization: 'International Conference on Advances in Robotics AIR 2017, IIT Delhi', description: 'Development of Actively Steerable In-Pipe Inspection Robot for various pipe sizes', order: 3 },
  { category: 'international', title: 'Best Paper Award', year: '2020', organization: 'RIACT – 2020 International Conference, VIT Vellore, Chennai', description: 'Robotics, Intelligent Automation and Control Technologies', order: 4 },
  // National (4)
  { category: 'national', title: "National Champion Team's Faculty Adviser", year: '2017', organization: 'National Robotics Contest ROBOCON 17', description: 'Robot Study Circle, College of Engineering Pune', order: 0 },
  { category: 'national', title: 'Second Runner Up Award', year: '2018', organization: 'DRUSE 2018 – DRDO Robotics and Unmanned System Exposition', description: 'Compressed air powered Human Exoskeleton Suit for Material Handling and Disaster Management', order: 1 },
  { category: 'national', title: 'Best Paper Award (Second Prize)', year: '2018', organization: 'National Conference on Advances in Armament Technology (NCAAT 2018), ARDE, DRDO', description: 'Oral presentation category', order: 2 },
  { category: 'national', title: 'Excellent Paper Award', year: '2014', organization: 'Annual International Conference of IRAJ, Pune', description: 'Development of Autonomous Hydro Quad-Rotor Robot', order: 3 },
  // Institute (14)
  { category: 'institute', title: 'Forbes Marshall Award – Best Final Year Project', year: '2007', organization: 'College of Engineering Pune', description: 'Design & Development of Industrial Robot (BTech Mechanical Engineering)', order: 0 },
  { category: 'institute', title: 'Forbes Marshall Award – Best Final Year Project', year: '2010', organization: 'College of Engineering Pune', description: 'Quadrotor – Flying robot for Surveillance (BTech Mechanical Engineering)', order: 1 },
  { category: 'institute', title: 'Best Working Project Award', year: '2011', organization: 'Alumni Association of COEP', description: 'Two Wheel self balancing coaxial personal transportation system', order: 2 },
  { category: 'institute', title: 'Runner Up – Best Working Project Award', year: '2011', organization: 'Alumni Association of COEP', description: "Image Processing based Robot control for Optimizing Rubik Cube's solution", order: 3 },
  { category: 'institute', title: 'Second Runner Up – Best Working Project Award', year: '2011', organization: 'Alumni Association of COEP', description: 'Quadrotor system Unmanned Aerial Vehicle (UAV)', order: 4 },
  { category: 'institute', title: 'Best Working Project Award', year: '2014', organization: 'Alumni Association of COEP', description: 'Robot with Passive Multi Terrain Compliance System', order: 5 },
  { category: 'institute', title: 'Forbes Marshall Award – Best Final Year Project', year: '2015', organization: 'College of Engineering Pune', description: 'Amphibious Robot (BTech Mechanical Engineering)', order: 6 },
  { category: 'institute', title: 'Forbes Marshall Award – Best Final Year Project', year: '2016', organization: 'College of Engineering Pune', description: 'Railway track surveillance Robot (BTech Mechanical Engineering)', order: 7 },
  { category: 'institute', title: 'Second Prize Silver Award (₹2.5 Lakhs)', year: '2017', organization: 'KPIT Sparkle 2017 – All India Science & Engineering Students Contest', description: 'Wall Climbing Robot – Prabhakar Naik, Arpit Savarkar & Mohit Jahagirdar', order: 8 },
  { category: 'institute', title: 'Innovative Project Award – Anand Kanhere Prize', year: '2022', organization: 'Alumni Association, College of Engineering Pune', description: 'Development of Underwater ROV for Marine Surveillance', order: 9 },
  { category: 'institute', title: 'Innovative Project Award – 2nd Prize', year: '2024', organization: 'Alumni Association, COEP', description: 'Automation of fractured Femur Bone Alignment using Parallel Robot – Shalini Agrawal & Mandar Dahe', order: 10 },
  { category: 'institute', title: 'Second Runner Up – Innovation and Excellence UG Project Competition', year: '2024', organization: "COEP Tech University Pune – 2nd Foundation Day", description: 'Design & Development of Manpackable Robot – Jiten Topiwala, Hriday Kutty & Bhagyashree Kakade', order: 11 },
  { category: 'institute', title: 'Special Recognition Award for Leadership in Sponsored Research Projects', year: '2025', organization: 'COEP Tech University Pune – Foundation Day', description: 'Recognition for leadership in DRDO-sponsored research projects', order: 12 },
  { category: 'institute', title: 'Academic Excellence Award for Teaching Faculty', year: '2025', organization: 'IEI Navi Mumbai Local Centre (NMLC) & Fr. C. Rodrigues Institute of Technology (FCRIT)', description: 'Presented on 16th September 2025', order: 13 },
];

const PUBLICATIONS = [
  // Books
  { type: 'book', title: 'Engineering Graphics', authors: 'Dr. M. B. Shah, B. C. Rana, Dr. S. S. Ohol', publisher: 'Technova Publications, Pune', edition: '1st Edition', year: '1997', order: 0 },
  { type: 'book', title: 'Engineering Materials and Components', authors: 'Prof. S. G. Patgawkar, Prof. R. G. Kaduskar, Dr. S. S. Ohol', publisher: 'Technova Publications, Pune', edition: '1st Edition', year: '1997', order: 1 },
  // Book Chapters
  { type: 'bookChapter', title: 'Research Methodology for Augmenting a Gait Cycle of Lower-Body Exoskeleton', authors: 'K. D. Kalantri, Y. M. Pirjade, A. U. Kotkar, N. M. Patwardhan, D. R. Londhe, T. P. Shelke, Dr. S. S. Ohol', publisher: 'Springer – Handbook of Smart Materials, Technologies, and Devices', year: '2022', chapter: 'Chapter 165-1', order: 0 },
  { type: 'bookChapter', title: 'Modeling, Kinematic Analysis, Gait, and Trajectory Generation for Quadruped Robot', authors: 'A.B. Dighe, Dr S S Ohol', publisher: 'Springer LNME – Recent Advances in Mechanical Engineering, ICMech-REC 2023', year: '2024', doi: '10.1007/978-981-97-0918-2_41', order: 1 },
  { type: 'bookChapter', title: 'Improvisation in Human–Robot Interaction Using Optimized Multimodal Operational Techniques', authors: 'Dr S S Ohol, Pratiksha Prakash Jawale', publisher: 'Springer – Innovations in Electrical and Electronic Engineering', year: '2024', pages: 'pp. 403–413', order: 2 },
  // International Journals
  { type: 'internationalJournal', title: 'Performance analysis of biomimetic grasping by multifingered robotic gripper (MRG) for identification and sorting of object', authors: 'Dr S R Kajale, Dr S S Ohol', journal: 'Journal of Computer Science, Science Publications, NewYork, USA', year: '2010', order: 0 },
  { type: 'internationalJournal', title: 'Optimization of Four-fingered Hand using FEA Techniques', authors: 'Dr S R Kajale, Sachin Karade, Dr S S Ohol', journal: 'The International Journal of Technology, Knowledge and Society, University of Illinois, USA', volume: 'Volume 6, Issue 6', pages: 'pp.187-202', year: '2010', order: 1 },
  { type: 'internationalJournal', title: 'Design and Development of Modular Humanoid Arm based on RC servo motor', authors: 'Kapse S. S., Dr S S Ohol', journal: 'International Journal of Advanced Research in Engineering & Technology (IJARET)', volume: 'Volume 4, Issue 7', pages: 'pp. 156-160', year: '2013', order: 2 },
  { type: 'internationalJournal', title: 'Kinematic analysis to generate trajectory for six degree of freedom Humanoid Arm', authors: 'Kapse S. S., Dr S S Ohol', journal: 'International Journal of Innovative Technology Research (IJITR)', volume: 'Volume 2, Issue 1', pages: 'pp. 722-725', year: '2014', order: 3 },
  { type: 'internationalJournal', title: 'Development of Autonomous Hydro Quad Rotor Vehicle', authors: 'Subodh Bhosale, Lalit Palve, Hrushikesh Joshi, Dr S S Ohol', journal: 'International Journal of Mechanical and Production Engineering (IJMPE) of IRAJ', volume: 'Volume-2, Issue-2', pages: 'pp 17-23', year: '2014', order: 4 },
  { type: 'internationalJournal', title: 'Proposed methodology to allow bottom pour in a less than 400 kg ladle with steel thermal masses in Investment Shell Casting Process', authors: 'N. P. Vanikar, T. R. Anjikar, Dr S S Ohol', journal: 'International Journal of Scientific & Engineering Research (IJSER)', volume: 'Volume 6, Issue 12', year: '2015', order: 5 },
  { type: 'internationalJournal', title: 'Stopper Rod Mechanism in a smaller ladle for bottom pour with low thermal masses in Investment Casting process', authors: 'N. P. Vanikar, T. R. Anjikar, Dr S S Ohol', journal: 'International Journal of Advances in Engineering Science and Technology (IJAEST)', year: '2015', order: 6 },
  { type: 'internationalJournal', title: 'Need of Automation in Investment casting Industry due to major defects caused by manual operations', authors: 'N. P. Vanikar, T. R. Anjikar, Dr S S Ohol', journal: 'International Journal for Scientific Research & Development (IJSRD)', volume: 'Volume 3, Issue 9', year: '2015', order: 7 },
  { type: 'internationalJournal', title: 'Development of In-pipe Inspection Robot', authors: 'Atul A. Gargade, Dr. Shantipal S. Ohol', journal: 'IOSR Journal of Mechanical and Civil Engineering (IOSR-JMCE)', volume: 'Volume 13, Issue 4 Ver. VII', pages: 'PP 64-72', year: '2016', order: 8 },
  { type: 'internationalJournal', title: 'Methodology for optimization of pouring variables using bottom pour for low masses of SS304 (<300 kg) in investment casting process', authors: 'Nilesh Vanikar, Saeede Goldar, Dr S S Ohol', journal: 'International Journal of Cast Metals Research (IJCMR), UK', volume: 'Volume 31, 2018 - Issue 4', pages: 'pp. 249-259', year: '2018', order: 9 },
  { type: 'internationalJournal', title: 'Human Assistive Lower Limb Exoskeleton', authors: 'N.M. Patwardhan, Y.M. Pirjade, A.U.Kotkar, D.R. Londhe, T.P. Shelke, Dr S S Ohol', journal: 'Asian Journal of Convergence in Technology (AJCT)', volume: 'vol. 5, no. 2', issn: 'ISSN No. : 2350-1146, I.F-5.11', year: '2019', order: 10 },
  { type: 'internationalJournal', title: 'Design and Simulation of a Service Robot for Covid-19 Isolation Wards with Autonomous Navigation', authors: 'Lalit Duseja, Yash Deshmukh, Shantanu Karmuse, Dr S S Ohol', journal: 'International Journal of Engineering Sciences', volume: '2021 14(3)', pages: 'pp 90-97', year: '2021', order: 11 },
  { type: 'internationalJournal', title: 'Inverse kinematic analysis of a fixture for fine alignment of central axis of top and bottom frame using simulation', authors: 'P.S. Aglawe, Dr S S Ohol', journal: 'IOP Conference Series: Materials Science and Engineering', volume: '1012 (2021) 012014', doi: '10.1088/1757-899X/1012/1/012014', year: '2021', order: 12 },
  { type: 'internationalJournal', title: 'Autonomous Snake Robot with Serpentine type Navigation', authors: 'Mrinmayee Bangar, Shruti Ghodake, Hrishikesh Nirgude, Dr S S Ohol', journal: 'IOP Conference Series: Materials Science and Engineering', volume: '1012 (2021) 012027', doi: '10.1088/1757-899X/1012/1/012027', year: '2021', order: 13 },
  { type: 'internationalJournal', title: 'Industrial robot performance analysis using low cost set-up', authors: 'Kirti Chachane, Dr S S Ohol', journal: 'IOP Conf. Series: Materials Science and Engineering', volume: '1012 (2021) 012010', doi: '10.1088/1757-899X/1012/1/012010', year: '2021', order: 14 },
  { type: 'internationalJournal', title: 'Comparative Need Analysis of Industrial Robot Calibration Methodologies', authors: 'S. N. Chiwande, Dr S S Ohol', journal: 'IOP Conf. Series: Materials Science and Engineering', volume: '1012 (2021) 012009', doi: '10.1088/1757-899X/1012/1/012009', year: '2021', order: 15 },
  { type: 'internationalJournal', title: 'Design and Development of In-pipe Inspection Robot for Various Pipe Sizes', authors: 'P.S. Aglawe, Dr S S Ohol', journal: 'IOP Conf. Series: Materials Science and Engineering', volume: '1012 (2021) 012001', doi: '10.1088/1757-899X/1012/1/012001', year: '2021', order: 16 },
  { type: 'internationalJournal', title: 'Development of lower body exoskeleton, mathematical modeling and video analysis of its prototype for obtaining customized joint actuation', authors: 'Kaushal Kalantri, Dr S S Ohol', journal: 'IOP Conf. Series: Materials Science and Engineering', volume: '1012 (2021) 012013', doi: '10.1088/1757-899X/1012/1/012013', year: '2021', order: 17 },
  { type: 'internationalJournal', title: 'Semi-Autonomous Parking system for Automatic Transmission vehicles', authors: 'Sameer Kaware, Dr S S Ohol', journal: 'IOP Conf. Series: Materials Science and Engineering', volume: '1012 (2021) 012051', doi: '10.1088/1757-899X/1012/1/012051', year: '2021', order: 18 },
  { type: 'internationalJournal', title: 'Design, development and analysis of human exoskeleton for enhancing human capabilities', authors: 'Rasika Vibhute, Samiksha Yeole, Shivani Waghmare, Tejas Tonde, Dr S S Ohol', journal: 'IOP Conf. Series: Materials Science and Engineering', volume: '1012 (2021) 012015', doi: '10.1088/1757-899X/1012/1/012015', year: '2021', order: 19 },
  { type: 'internationalJournal', title: 'Modelling & simulation of adaptive cruise control & overtake assist system', authors: 'Sajal Anand, Dr S S Ohol', journal: 'Materials Today Proceedings', doi: 'https://doi.org/10.1016/j.matpr.2022.09.330', year: '2022', order: 20 },
  { type: 'internationalJournal', title: 'Investigation of PolyMethyl Methacrylate for Speedometer Application', authors: 'Sajal Anand, Subhajit Basu, Dr S S Ohol', journal: 'International Research Journal of Engineering and Technology (IRJET)', year: '2022', order: 21 },
  { type: 'internationalJournal', title: 'Shape Optimization of an Asymmetric Airfoil for Low Wind Speed Region having Adjoint Based Optimization Technique', authors: 'Pranoti Shinde, V. K. Tripathi, Dr S S Ohol', journal: 'Journal of Applied Fluid Mechanics', volume: 'Vol. 16, No. 2', pages: 'pp. 299-310', year: '2023', doi: '10.47176/jafm.16.02.1426', indexing: 'SCI', order: 22 },
  { type: 'internationalJournal', title: 'Feasibility Analysis and Experimental Study of Dynamic Object Tracking Control System', authors: 'Chirag Tawade, Karan Tekam, Shubham Bhagat, Dr S S Ohol', journal: 'Gradiva Review Journal', volume: '9(5)', pages: 'pp 1502-1508', year: '2023', order: 23 },
  { type: 'internationalJournal', title: 'Design and Development of Swerve Drive', authors: 'Chirag Tawade, Rushikesh Pabalkar, Shubham Bhagat, Dr S S Ohol', journal: 'Gradiva Review Journal', volume: '9(6)', pages: 'pp 258-262', year: '2023', order: 24 },
  { type: 'internationalJournal', title: 'Speech-Driven Control for Collaborative Robots to Enhance Human Robot Collaboration in Industrial Environment', authors: 'Pratiksha P. Jawale, Dr S S Ohol', journal: 'International Journal of Engineering Sciences', volume: '2024, 16(1)', pages: '8-14', doi: 'https://doi.org/10.36224/ijes.160102', year: '2024', order: 25 },
  { type: 'internationalJournal', title: 'Numerical and Dynamic Analysis of Dual-Arm Robotic Manipulation Using Newton-Euler Formulation', authors: 'Niraj Torane, Dr S S Ohol', journal: 'International Journal of Engineering Sciences', volume: '2024, 16(1)', pages: '41-53', doi: 'https://doi.org/10.36224/ijes.160105', year: '2024', order: 26 },
  { type: 'internationalJournal', title: 'Optimizing Llama 3.2 1b Using Quantization Techniques Using Bitsandbytes For Efficient AI Deployment', authors: 'Neeraj Maddel, Anish Khobragade, Dr S S Ohol', journal: 'International Journal of Advanced Research (IJAR)', volume: '2025, 13(03)', pages: '78-88', doi: 'http://dx.doi.org/10.21474/IJAR01/20538', year: '2025', order: 27 },
  // National Journals
  { type: 'nationalJournal', title: 'Comparative Quality & Performance Analysis of Machine Tap', authors: 'Dr. B. B. Ahuja, Dr S S Ohol', journal: 'Journal of Institution of Engineers (India), Production Engineering Division', volume: 'Vol. 81', pages: 'Page No. 23 – 28', year: '2000', order: 0 },
  { type: 'nationalJournal', title: 'Automated pick and place system using Dexterous Multifinger Robotic Gripper (MRG)', authors: 'S. K. Patil, Dr. S. R. Kajale, C. Y. Patil, Dr S S Ohol', journal: 'Journal of Instrumentation Society of India Bangalore', volume: 'Vol. 40 No. 2', pages: 'Page No. 87 – 91', year: '2010', order: 1 },
  { type: 'nationalJournal', title: 'Kinematic Synthesis and Experimental Validation of Legged Wheel Hybrid Robot (LWR)', authors: 'D. A. Bagde, Dr S S Ohol', journal: 'Journal of Basic and Applied Engineering Research', volume: 'Vol. 1, No. 4', pages: 'Page No. 33 – 37', year: '2014', order: 2 },
  // International Conferences (61)
  { type: 'internationalConference', title: 'Sensitivity Analysis of Soft Piezoelectric – Electroactive Material for Developing a Tactile Sensor', authors: 'Dr. S. R. Kajale, S. M. Deo, Dr S. K. Mahajan, Dr. B. B. Ahuja, Dr S S Ohol', conference: 'ICAMDIA 07 – International Conference on Advances in Machine Design and Industrial Automation', location: 'College of Engineering, Pune', date: '10-12 January 2007', year: '2007', order: 0 },
  { type: 'internationalConference', title: 'Simulation of Multifinger robotic gripper for dynamic analysis of Dexterous grasping', authors: 'Dr. S. R. Kajale, Dr S S Ohol', conference: 'World Congress on Engineering and Computer Sciences (WCECS 08), IAENGG', location: 'University of California, Berkeley, San Francisco, USA', date: '22-24 October 2008', year: '2008', order: 1 },
  { type: 'internationalConference', title: 'Effective Dexterous Grasping with Biomimetic Approach for Design of Multifingered Robotic Gripper', authors: 'Dr. S. R. Kajale, Dr S S Ohol', conference: 'ICMEE 2009, Chennai & ICMLC 2009, Perth, Australia', date: '27-29 June 2009 & 10-12 July 2009', year: '2009', award: 'Outstanding Presenter/Paper Award', order: 2 },
  { type: 'internationalConference', title: 'Automated pick and place system using Dexterous Multifinger Robotic Gripper (MRG)', authors: 'S. K. Patil, Dr. S. R. Kajale, C. Y. Patil, Dr S S Ohol', conference: 'International Conference on Instrumentation ICI 09', location: 'Cummins College of Engineering, Pune', date: '21-23 January 2010', year: '2010', order: 3 },
  { type: 'internationalConference', title: 'Performance analysis of biomimetic grasping by multifingered robotic gripper (MRG) for identification and sorting of object', authors: 'Dr S R Kajale, Dr S S Ohol', conference: 'International Symposium on Robotics and Intelligent Sensors (IRIS 2010)', location: 'Nagoya University, Japan', date: '8-11 March 2010', year: '2010', order: 4 },
  { type: 'internationalConference', title: 'Biomimetic Approach for Design of Multifingered Robotic Gripper (MRG) & Its Analysis for Effective Dexterous Grasping', authors: 'Dr S R Kajale, Dr S S Ohol', conference: 'International Conference on Machine Learning and Computing IPCSIT-2011, IACSIT Press', location: 'Singapore', year: '2011', order: 5 },
  { type: 'internationalConference', title: 'Stable Grasping by Multifinger Robotic Gripper', authors: 'Dr S. R. Kajale, Dr. B. B. Ahuja, Dr S S Ohol', conference: 'COPEN-7 2011 – International Conference on Precision, Meso, and Nano Engineering', location: 'College of Engineering, Pune', date: '10-11 December 2011', year: '2011', order: 6 },
  { type: 'internationalConference', title: 'Development of Autonomous Hydro Quad Rotor Vehicle (Excellent Paper Award)', authors: 'Subodh Bhosale, Lalit Palve, Hrushikesh Joshi, Dr S S Ohol', conference: 'Annual International Conference of Institute of Research and Journals (IRAJ)', location: 'Pune', date: '19 January 2014', year: '2014', award: 'Excellent Paper Award', order: 7 },
  { type: 'internationalConference', title: 'Design Modelling and experimental validation of multifingered Robotic Gripper', authors: 'Ajit Pawar, Tejas Patil, Ajinkya Pawar, Sagar Jadhav, Dr S S Ohol', conference: 'International Conference on Mechanical and Production Engineering (IRAJ)', location: 'Pune', date: '19 January 2014', year: '2014', order: 8 },
  { type: 'internationalConference', title: 'Performance Improvisation of SCORBOT-ER 4u Robot Arm by Simulation', authors: 'Prof Prasad Patil, Dr S S Ohol', conference: 'International Conference on Robotics, Mechanics and Mechatronics (ICRMM 2014)', location: 'Bali, Indonesia', date: '22-23 March 2014', year: '2014', award: 'Excellent Paper Award', order: 9 },
  { type: 'internationalConference', title: 'Design and development of dynamically stable bipedal walking system', authors: 'K. Masurkar, Harshad Kamble, V. Joshi, Dr S S Ohol', conference: 'IEEE International Conference on Advances in Engineering & Technology Research (ICAETR 2014)', location: 'Unnao, India', date: '01-02 August 2014', year: '2014', order: 10 },
  { type: 'internationalConference', title: 'Kinematic Synthesis and Experimental Validation of Legged Wheel Hybrid Robot (LWR)', authors: 'D. A. Bagde, Dr S S Ohol', conference: '5th International Conference on Innovative Trends in Mechanical, Material, Manufacturing, Automobile, Aeronautical Engineering (ITMAEAP 2014)', location: 'Jawaharlal Nehru University, New Delhi', date: '23-24 August 2014', year: '2014', order: 11 },
  { type: 'internationalConference', title: 'Improvisations in Investment Casting Process using Economical Automation', authors: 'N. P. Vanikar, R. Anjikar, Dr S S Ohol', conference: 'International Conference on Emerging Trends in Engineering and Technology (ICETET 2015)', location: 'Pune', date: '07 June 2015', year: '2015', order: 12 },
  { type: 'internationalConference', title: 'Stopper Rod Mechanism in a smaller ladle for bottom pour with low thermal masses in Investment Casting process', authors: 'N. P. Vanikar, R. Anjikar, Dr S S Ohol', conference: 'International Conference on Advances in Engineering Science and Management (ICAESM 2015)', location: 'Delhi', date: '08 November 2015', year: '2015', order: 13 },
  { type: 'internationalConference', title: 'Investment Casting Bottom Pour Ladle Development Trials', authors: 'N. P. Vanikar, Dr. R. C. Voigt, T. R. Anjikar, Dr S S Ohol', conference: 'International Conference of Investment Casting Institute (ICIAI 2016)', location: 'Columbus, Ohio, USA', date: 'October 2016', year: '2016', order: 14 },
  { type: 'internationalConference', title: 'Development of Actively Steerable In-pipe Inspection Robot for Various Sizes', authors: 'Atul Gargade, Dr S S Ohol', conference: 'International Conference on Advances in Robotics (AIR) 2017', location: 'IIT Delhi, India', date: 'June-July 2017', year: '2017', award: 'Best Paper Presentation Award – Poster Category', order: 15 },
  { type: 'internationalConference', title: 'Pneumatic Artificial Muscle Powered Exoskeleton', authors: 'Bhushan Darekar, Prabhakar Naik, Jayant Unde, Dr S S Ohol', conference: 'International Conference on Advances in Robotics (AIR) 2019', location: 'IIT Madras, India', date: '5 July 2019', year: '2019', order: 16 },
  { type: 'internationalConference', title: 'Design and Fabrication of a Low-cost Human Body Lower Limb Exoskeleton', authors: 'Y. M. Pirjade, D. R. Londhe, A. U. Kotkar, T. P. Shelke, Dr S S Ohol', conference: '6th International Conference on Mechatronics and Robotics Engineering (ICMRE-2020)', location: 'Barcelona, Spain', date: '12-15 February 2020', year: '2020', order: 17 },
  { type: 'internationalConference', title: 'Deformity correction methods for fracture bone alignment – an overview', authors: 'Pankaj Aglawe, Dr S S Ohol', conference: 'International Conference on Mechanical Engineering for Sustainable Development (ICMESD-2020)', location: "AISSMS's COE, Pune", date: '17-18 February 2020', year: '2020', order: 18 },
  { type: 'internationalConference', title: 'Inverse Kinematic Analysis Of A Fixture For Automatic Bone Alignment Using SimMechanics Of Matlab', authors: 'P.S. Aglawe, Dr S S Ohol', conference: 'RIACT 2020 – International Conference on Robotics, Intelligent Automation & Control Technologies', location: 'VIT, Vellore, Chennai', date: '2-3 October 2020', year: '2020', award: 'Best Paper Award', order: 19 },
  { type: 'internationalConference', title: 'Comparative Need Analysis Of Industrial Robot Calibration Methodologies', authors: 'S. N. Chiwande, Dr S S Ohol', conference: 'RIACT 2020 – International Conference on Robotics, Intelligent Automation & Control Technologies', location: 'VIT, Vellore, Chennai', date: '2-3 October 2020', year: '2020', order: 20 },
  { type: 'internationalConference', title: 'Design And Development Of In-Pipe Inspection Robot For Various Pipe Sizes', authors: 'Atul Gargade, Dr S S Ohol', conference: 'RIACT 2020 – International Conference on Robotics, Intelligent Automation & Control Technologies', location: 'VIT, Vellore, Chennai', date: '2-3 October 2020', year: '2020', order: 21 },
  { type: 'internationalConference', title: 'Semi-Autonomous Parking System For Automatic Transmission Vehicles', authors: 'Sameer Kaware, Dr S S Ohol', conference: 'RIACT 2020 – International Conference on Robotics, Intelligent Automation & Control Technologies', location: 'VIT, Vellore, Chennai', date: '2-3 October 2020', year: '2020', order: 22 },
  { type: 'internationalConference', title: 'Industrial Robot Performance Analysis Using Low Cost Set-Up', authors: 'Kirti Chachane, Dr S S Ohol', conference: 'RIACT 2020 – International Conference on Robotics, Intelligent Automation & Control Technologies', location: 'VIT, Vellore, Chennai', date: '2-3 October 2020', year: '2020', order: 23 },
  { type: 'internationalConference', title: 'Design And Validation Of A Matlab Simulation To Obtain Customized Gait Cycle For Exoskeleton', authors: 'Kaushal Kalantri, Dr S S Ohol', conference: 'RIACT 2020 – International Conference on Robotics, Intelligent Automation & Control Technologies', location: 'VIT, Vellore, Chennai', date: '2-3 October 2020', year: '2020', award: 'Selected for Best Paper Award', order: 24 },
  { type: 'internationalConference', title: 'Design, Development And Analysis of Human Exoskeleton For Enhancing Human Capabilities', authors: 'Rasika Vibhute, Samiksha Yeole, Shivani Waghmare, Tejas Tonde, Dr S S Ohol', conference: 'RIACT 2020 – International Conference on Robotics, Intelligent Automation & Control Technologies', location: 'VIT, Vellore, Chennai', date: '2-3 October 2020', year: '2020', order: 25 },
  { type: 'internationalConference', title: 'Autonomous Snake Robot With Serpentine Type Navigation', authors: 'Mrinmayee Bangar, Shruti Ghodake, Hrishikesh Nirgude, Dr S S Ohol', conference: 'RIACT 2020 – International Conference on Robotics, Intelligent Automation & Control Technologies', location: 'VIT, Vellore, Chennai', date: '2-3 October 2020', year: '2020', order: 26 },
  { type: 'internationalConference', title: 'Production Design Analysis for Airfoil Shape Optimization', authors: 'Pranoti Shinde, Dr. V. K. Tripathi, Dr S S Ohol', conference: 'RARES 2021 – International Conference on Recent Advances in Renewable Energy Sources', date: '26-27 February 2021', year: '2021', order: 27 },
  { type: 'internationalConference', title: 'The Performance Parameter Analysis and Calibration Methodology for the Industrial Robot', authors: 'Ravindra Shinde, Dr S S Ohol', conference: 'ICIT 2021 – 6th International Conference on Intelligent Technologies (ASRES & SCMR)', location: 'Singapore', date: '17-19 December 2021', year: '2021', order: 28 },
  { type: 'internationalConference', title: 'Development of Low-cost Adaptive Cruise Control System for Automatic Transmission vehicle for Low-speed Operations', authors: 'Aniruddha Sonawane, Dr S S Ohol', conference: 'ICIT 2021 – 6th International Conference on Intelligent Technologies', location: 'Singapore', date: '17-19 December 2021', year: '2021', order: 29 },
  { type: 'internationalConference', title: 'Two Legs Balancing with Appropriate Gait Cycle and Its Simulation for Combined Motion Analysis', authors: 'Shantanu Bharad, Dr S S Ohol', conference: 'ICIT 2021 – 6th International Conference on Intelligent Technologies', location: 'Singapore', date: '17-19 December 2021', year: '2021', order: 30 },
  { type: 'internationalConference', title: 'In-pipe Inspection Robot for Varying Pipe Sizes', authors: 'Atul Gargade, Dr S S Ohol', conference: 'ICIT 2021 – 6th International Conference on Intelligent Technologies', location: 'Singapore', date: '17-19 December 2021', year: '2021', order: 31 },
  { type: 'internationalConference', title: 'Impact on industrial robot calibration due to techno-commercial aspects in conventional industrial robot calibration methods', authors: 'Sumedh N Chiwande, Dr S S Ohol', conference: 'ICIT 2021 – 6th International Conference on Intelligent Technologies', location: 'Singapore', date: '17-19 December 2021', year: '2021', order: 32 },
  { type: 'internationalConference', title: 'Autonomous RFID Controlled Assisting Robot for Isolation Wards', authors: 'Lalit Duseja, Yash Deshmukh, Shantanu Karmuse, Dr S S Ohol', conference: 'ICIT 2021 – 6th International Conference on Intelligent Technologies', location: 'Singapore', date: '17-19 December 2021', year: '2021', order: 33 },
  { type: 'internationalConference', title: 'Design & Development of a Multi-finger Prosthetic Robotic hand', authors: 'Arya Arasan, Samarth Chaudhari, Poorval Wanere, Rushikesh Pabalkar, Chetan Pathrabe, Dr S S Ohol', conference: 'ICIT 2021 – 6th International Conference on Intelligent Technologies', location: 'Singapore', date: '17-19 December 2021', year: '2021', order: 34 },
  { type: 'internationalConference', title: 'ROS based Compact Mobile Robot for Area Mapping, Autonomous Navigation and Path Planning', authors: 'Aniruddha Gaikwad, Mihir Kulkarni, Anuja Agnihotri, Samruddhi Purohit, Dr S S Ohol', conference: 'ICIT 2021 – 6th International Conference on Intelligent Technologies', location: 'Singapore', date: '17-19 December 2021', year: '2021', order: 35 },
  { type: 'internationalConference', title: 'Design, development, analytical study and performance analysis of a prototype of ornithopter', authors: 'Vaishnavi Chakradeo, Riyaa Jadhav, Kalyani Deshmukh, Madhura Mitkari, Dr S S Ohol', conference: 'ICIT 2021 – 6th International Conference on Intelligent Technologies', location: 'Singapore', date: '17-19 December 2021', year: '2021', order: 36 },
  { type: 'internationalConference', title: 'Finite Element Analysis of a Novel Robotic Gripper: Grabo', authors: 'Aniket H Bhelsaikar, Pratik Chothe, Viinod Atpadkar, Dr S S Ohol, Debanik Roy', conference: 'ICIT 2021 – 6th International Conference on Intelligent Technologies', location: 'Singapore', date: '17-19 December 2021', year: '2021', order: 37 },
  { type: 'internationalConference', title: 'Qualitative flexural modulus analysis for establishing appropriateness of pig femur bone for biomedical experimentation about automatic alignment of fractured femur bone', authors: 'Pankaj S. Aglawe, Dr S S Ohol', conference: 'ICIT 2021 – 6th International Conference on Intelligent Technologies', location: 'Singapore', date: '17-19 December 2021', year: '2021', order: 38 },
  { type: 'internationalConference', title: 'A low latency self-balancing algorithm for real-time quadrupedal robots, suitable for navigating unstable, rapidly deforming environments', authors: 'Mudit Singal, Dr S S Ohol', conference: 'ICIT 2021 – 6th International Conference on Intelligent Technologies', location: 'Singapore', date: '17-19 December 2021', year: '2021', order: 39 },
  { type: 'internationalConference', title: 'Study of aerodynamic behavior of a symmetrical airfoil in a low wind speed region', authors: 'Pranoti Shinde, Dr S S Ohol', conference: 'ICIT 2021 – 6th International Conference on Intelligent Technologies', location: 'Singapore', date: '17-19 December 2021', year: '2021', order: 40 },
  { type: 'internationalConference', title: 'Modelling and Simulation of Adaptive Cruise Control and Overtake Assist System', authors: 'Sajal Anand, Dr S S Ohol', conference: 'ICAME 2022 – International Conference & Exposition on Advances in Mechanical Engineering', location: 'College of Engineering Pune', date: 'June 23-25, 2022', year: '2022', order: 41 },
  { type: 'internationalConference', title: 'Central Axis Alignment of Parallel Robot using Structural Analysis and Motion Analysis for 6 DOF Set-up', authors: 'Shrikant Pashawar, Dr S S Ohol', conference: 'SESBT 2022 – 3rd International Conference on Sustainable Energy Solutions for a Better Tomorrow', location: 'VIT Chennai, India', date: 'July 23-24, 2022', year: '2022', order: 42 },
  { type: 'internationalConference', title: 'Design of Smart Vertical Lift for Disabled Person', authors: 'Moreshwar Bhalerao, Dr S S Ohol', conference: '2nd Indian International Conference on Industrial Engineering and Operations Management (IEOM)', location: 'Warangal, Telangana, India', date: 'August 16-18, 2022', year: '2022', order: 43 },
  { type: 'internationalConference', title: 'Ground Traversability Estimation for Quadruped Robot with Modified DWA Algorithm', authors: 'Dhiraj Dhande, Dr S S Ohol', conference: '2nd International Conference on Signal and Information Processing-2022', location: 'College of Engineering Pune', date: '25-27 August 2022', year: '2022', order: 44 },
  { type: 'internationalConference', title: 'AI based route planning and Optimization for effective collection of A-frames from customer', authors: 'Shahbaz Hussain, Vidya More, Dr S S Ohol', conference: 'IRMAS 2023 – 3rd International Conference on Intelligent Robotics, Mechatronics, and Automation Systems', location: 'College of Engineering Pune', date: '04-05 May 2023', year: '2023', order: 45 },
  { type: 'internationalConference', title: 'Thermal Analysis and Development of single cell using PCM at different C rates', authors: 'Aishwarya Balkhande, Dr S S Ohol', conference: 'IRMAS 2023 – 3rd International Conference on Intelligent Robotics, Mechatronics, & Automation System', location: 'College of Engineering Pune', date: '04-05 May 2023', year: '2023', order: 46 },
  { type: 'internationalConference', title: 'The Experimental Study and Viability Analysis of Vision based Flying Object Tracking System', authors: 'Aditya Kulkarni, Dr S S Ohol', conference: 'IRMAS 2023 – 3rd International Conference on Intelligent Robotics, Mechatronics, and Automation Systems', location: 'College of Engineering Pune', date: '04-05 May 2023', year: '2023', order: 47 },
  { type: 'internationalConference', title: 'Modelling, Kinematic Analysis, Gait & Trajectory Generation for Quadraped Robot', authors: 'Ashu Dighe, Dr S S Ohol', conference: '1st International Conference on Mechanical Engineering: Researches and Evolutionary Challenges', location: 'NIT Warangal', date: '23-25 June 2023', year: '2023', order: 48 },
  { type: 'internationalConference', title: 'Parallel Robotic System for Automated Fracture Reduction and Alignment in Femoral Shaft Fracture Treatment', authors: 'Shalini Agrawal, Mandar Dahe, Maurya Gurram, Pankaj Aglawe, Dr S S Ohol', conference: 'ICIT-2024 – 9th International Conference on Intelligent Technologies', location: 'Centro Escolar University, Manila', date: '4-6 October 2024', year: '2024', order: 49 },
  { type: 'internationalConference', title: 'Turret Mechanism Performance Confirmation Using FEA & Simulation for Efficient Dynamic Tracking', authors: 'Prasad Kumavat, Dr S S Ohol', conference: 'ICIT-2024 – 9th International Conference on Intelligent Technologies', location: 'Centro Escolar University, Manila', date: '4-6 October 2024', year: '2024', order: 50 },
  { type: 'internationalConference', title: 'Forward Kinematics for the state estimation of quadraped robot', authors: 'Sneha Mahajan, Dr S S Ohol', conference: 'ICIT-2024 – 9th International Conference on Intelligent Technologies', location: 'Centro Escolar University, Manila', date: '4-6 October 2024', year: '2024', order: 51 },
  { type: 'internationalConference', title: 'Dynamic Modeling of 14 DOF Humanoid Dual Arm', authors: 'Niraj Torane, Dr S S Ohol', conference: 'ICIT-2024 – 9th International Conference on Intelligent Technologies', location: 'Centro Escolar University, Manila', date: '4-6 October 2024', year: '2024', order: 52 },
  { type: 'internationalConference', title: 'Improvisation in Human Robot Interaction for real time operation using Speech for Collaborative Robot', authors: 'Pratiksha Jawale, Dr S S Ohol', conference: 'ICIT-2024 – 9th International Conference on Intelligent Technologies', location: 'Centro Escolar University, Manila', date: '4-6 October 2024', year: '2024', order: 53 },
  { type: 'internationalConference', title: 'Deep Extract: Neural Networks Based Image Key points Extraction for Indirect SLAM Algorithms', authors: 'M Gurram, PK Uttam, Dr S S Ohol', conference: 'IEEE International Conference on Artificial Intelligence in Engineering and Technology (IICAIET)', location: 'Malaysia', year: '2024', order: 54 },
  { type: 'internationalConference', title: 'Reinforcement Learning for Quadrupedal Locomotion: Current Advancements and Future Perspectives', authors: 'M Gurram, PK Uttam, Dr S S Ohol', conference: '9th International Conference on Mechanical Engineering and Robotics Research (ICMERR)', location: 'Spain, Barcelona', year: '2025', order: 55 },
  { type: 'internationalConference', title: 'Discomfort Index Prediction For Driver In Vehicle Ergonomics', authors: 'Omkar Khole, Dr S S Ohol', conference: 'ICIT-2025 – 10th International Conference on Intelligent Technologies (ASRES)', date: '16-18 August 2025', year: '2025', order: 56 },
  { type: 'internationalConference', title: 'Design and Development of Arial Object Tracking Turret Mechanism', authors: 'Rohan Kharat, Dr S S Ohol', conference: 'ICIT-2025 – 10th International Conference on Intelligent Technologies (ASRES)', date: '16-18 August 2025', year: '2025', order: 57 },
  { type: 'internationalConference', title: 'Comparative Analysis of Damping Materials for Vibration Control in Military Vehicle-Mounted Electronic Warfare Systems', authors: 'Suhas Kokate, Dr. K. P. Wani, Dr S S Ohol', conference: 'ICIT-2025 – 10th International Conference on Intelligent Technologies (ASRES)', date: '16-18 August 2025', year: '2025', order: 58 },
  { type: 'internationalConference', title: 'Advanced Phase-Lead Augmented PI Control for High-Precision 2-DOF Turret Positioning', authors: 'G.V. Lakhekar, Dhiraj S. Pawar, Vivek V. Lingade, Sarthak V. Shukla, Dr S S Ohol, et al.', conference: '2025 IEEE 4th International Conference on Smart Technologies for Power, Energy and Control (STPEC 2025)', location: 'NIT Goa', date: '10-13 December 2025', year: '2025', order: 59 },
  { type: 'internationalConference', title: 'Evaluation of Multimodal Interaction system for Collaborative Robot Control', authors: 'Pratiksha Jawale, Dr S S Ohol', conference: '16th International Conference on Computing, Communication and Networking Technologies (ICCCNT 2025)', location: 'IIT Indore', date: '6-11 July 2025', year: '2025', order: 60 },
  // National Conferences
  { type: 'nationalConference', title: 'Improvements in the Grasping Modality of Gripper', authors: 'Dr. B. B. Ahuja, Dr. S. R. Kajale, Dr S S Ohol', conference: 'AMTEG 05 – National Conference on Advances in Manufacturing Technology in the Era of Globalization', location: "Production Engineering Department, P.I.E.T., Pune", date: '21-22 January 2005', year: '2005', order: 0 },
  { type: 'nationalConference', title: 'Major defects in Investment Casting Industry Due to Manual Operations', authors: 'Nilesh Vanikar, Rajendra Anjikar, Dr S S Ohol', conference: "ICME 2015 – National Conference on Innovations In Mechanical Engineering, MIT Academy of Engineering, Alandi", date: '6-8 April 2015', year: '2015', order: 1 },
  { type: 'nationalConference', title: 'Functional and Life Assessment of Mechanism Employed in Corner Shot Weapon System by Automatic Dry Functioning Test', authors: 'Dr S S Ohol et al.', conference: 'NCAAT 2018 – 2nd National Conference On Advances In Armament Technology', location: 'ARDE, DRDO Lab, Pune', date: '8-9 June 2018', year: '2018', award: 'Second Prize – Oral Presentation Category', order: 2 },
  { type: 'nationalConference', title: 'Development of Robotic Arm Manipulator mounted on Self Balancing Two Wheeled Mobile Robot', authors: 'Pranay Junare, Shaunak Mahajan, Prithvish Taukari, Anirudh Nallawar, Dr S S Ohol', conference: 'ARMS 2021 – 12th National Conference & Exhibition on Aerospace & Defence Related Mechanisms', location: 'ARDE, Pune', date: '2-4 December 2021', year: '2021', order: 3 },
  { type: 'nationalConference', title: 'Design and Performance Analysis of Robotic Jellyfish for Underwater Surveillance Manufactured as a Soft Robot', authors: 'Rushikesh Pachghare, Mihir Deshmukh, Dr S S Ohol', conference: 'ARMS 2021 – 12th National Conference & Exhibition on Aerospace & Defence Related Mechanisms', location: 'ARDE, Pune', date: '2-4 December 2021', year: '2021', order: 4 },
];

const RESEARCH_PROJECTS = [
  { title: 'Simulation & Development of Robotics Gripper', fundingAgency: 'R & DE (E), Dighi, Pune - DRDO Laboratory', amount: 'Rs 10 Lakhs', startDate: 'January 2013', endDate: 'December 2013', status: 'Completed', order: 0 },
  { title: 'Dynamic Simulation of unwinding metallic strips & optimization of timing', fundingAgency: 'Armament Research & Development Establishment (ARDE), DRDO', amount: 'Rs 10 Lakhs', startDate: 'May 2015', endDate: 'May 2016', status: 'Completed', order: 1 },
  { title: 'Feasibility Study of Automatic Dry Function Test (ADF) Test set-up for Corner Shot Weapon System', fundingAgency: 'Armament Research and Development Establishment (ARDE), DRDO', amount: 'Rs 10 Lakhs', startDate: 'September 2016', endDate: 'December 2017', status: 'Completed', order: 2 },
  { title: 'Feasibility Analysis and Experimental Study of Turret Gun Control System', fundingAgency: 'Army Research Board (ARMREB), DRDO, Ministry of Defence', amount: 'Rs 99.60 Lakhs', startDate: 'February 2024', status: 'Ongoing', location: 'Armament Research & Development Establishment (ARDE), Pashan, Pune', order: 3 },
];

const PHD_STUDENTS = [
  { title: 'Optimization of Work Cycle Parameters in Casting Industries by Inculcating Automation Techniques', scholar: 'Mr. Nilesh P. Vanikar', university: 'Savitribai Phule Pune University', awardDate: '16th August 2017', status: 'Completed', order: 0 },
  { title: 'Design & Development of In-Pipe Inspection Robot to alleviate various Task', scholar: 'Mr. Atul Gargade', university: 'Savitribai Phule Pune University', awardDate: '29th March 2022', status: 'Completed', order: 1 },
  { title: 'Multi-Objective Design Optimization of Composite Laminate Wind Turbine Blade', scholar: 'Ms. Pranoti Prakash Shinde', university: 'COEP Tech University, Pune', awardDate: '23rd February 2024', fellowship: 'National Doctoral Fellowship Scholar', status: 'Completed', order: 2 },
  { title: 'Cost Effective Calibration Methodologies for Industrial Robot System', scholar: 'Mr. Sumedh Chivande', university: 'COEP Tech University / SPPU, Pune', status: 'In Progress', order: 3 },
  { title: 'Automation for bone alignment in post surgery monitoring & control for biomedical instrumentation', scholar: 'Mr. Pankaj Aglave', university: 'COEP Tech University / SPPU, Pune', status: 'In Progress', order: 4 },
  { title: 'Multimodal Robot Operations for Establishing user friendly Robot Programming towards Improving Human Robot Interaction for Collaborative Robot', scholar: 'Ms. Pratiksha Jawale', university: 'COEP Tech University / SPPU, Pune', status: 'In Progress', order: 5 },
  { title: 'Development of a lower limb exoskeleton providing real time assistance to dynamic performance parameters for adopting user\'s dynamics', scholar: 'Ms. Nikita Gawai', university: 'COEP Tech University / SPPU, Pune', status: 'In Progress', order: 6 },
  { title: 'Reinforcement Learning and Deep Learning Methods for Autonomous Quadrupedal Locomotion', scholar: 'Mr. Maurya Gurram', university: 'COEP Tech University / SPPU, Pune', status: 'In Progress', order: 7 },
];

const PATENTS = [
  { number: '362205', applicationNumber: '2212/MUM/2014', applicationDate: '07.07.2014', title: 'AN ARRANGEMENT TO MAINTAIN STABILITY OF A BODY MOUNTED ON A ROCKER-BOGIE MECHANISM', letterNumber: 'Sl. No. 022112492', grantDate: '19th March 2021', status: 'Awarded', order: 0 },
  { number: '511178', applicationNumber: '202121012080', applicationDate: '22.03.2021', title: 'NON-CONVENTIONAL CALIBRATION SYSTEM FOR INDUSTRIAL ROBOTS', letterNumber: 'SL No 02213874', grantDate: '15th February 2024', status: 'Awarded', order: 1 },
  { number: '566978', applicationNumber: '202121031359', applicationDate: '13.07.2021', title: 'AN AUTONOMOUS IN-PIPE INSPECTION ROBOTIC SYSTEM', letterNumber: 'SL No 022150964', grantDate: '30th May 2025', status: 'Awarded', order: 2 },
  { number: '572489', applicationNumber: '202121047545', applicationDate: '20.10.2021', title: 'AN AUTOMATIC BONE ALIGNMENT SYSTEM', status: 'Awarded', order: 3 },
];

const STUDENT_PROJECTS = [
  { student: 'D. M. Kanade', year: '2005', degree: 'ME Design', title: 'Stress and fatigue analysis of Turbo Generator Impeller using ANSYS', institute: 'ARDE, Pune', order: 0 },
  { student: 'J. N. Mahurkar', year: '2006', degree: 'MTech Design', title: 'Design of MR Fluid Damper and Simulation using Matlab, Simulink', institute: 'DIAT Pune', order: 1 },
  { student: 'P. R. Zagade', year: '2006', degree: 'MTech Design', title: 'Study of CDM of sheet metal forming process for high strength steel using Modified Gurson Tvergaard Needleman Plasticity Model', institute: 'Tata RDDC Pune', order: 2 },
  { student: 'S. M. Narayankar', year: '2007', degree: 'MTech Design', title: 'Brake Pedal Feel Study using Driving Simulator for Passenger Car', institute: 'TATA ERC Pune', order: 3 },
  { student: 'Sanjay S. Jadhav', year: '2007', degree: 'MTech Design', title: 'Vibration Analysis of 500 frame Induction Motor for different Load conditions and Frequencies using FFT Analyser', institute: 'GE India Technology centre, Bangalore', order: 4 },
  { student: 'Praveen R. Kulkarni', year: '2008', degree: 'MTech Design', title: 'Rollover Study and Analysis for Light Commercial Vehicle using Multibody Dynamics', institute: 'TATA ERC Pune', order: 5 },
  { student: 'Sandip S. Rakhe', year: '2008', degree: 'MTech Design', title: 'Analytical Study of Automobile Driveline', institute: 'Spicer India Ltd, Pune', order: 6 },
  { student: 'S. Kulhade', year: '2008', degree: 'MTech Design', title: 'FEA of Flexible element disc coupling assembly to determine stress and fatigue life using ANSYS', institute: 'Emerson, Pune', order: 7 },
  { student: 'Rahul Jajoo', year: '2009', degree: 'MTech Design', title: 'Occupant packaging study for a 3/4 passenger car using Mathematical model and RAMSIS model', institute: 'TATA Pune', order: 8 },
  { student: 'Sunil K. Patil', year: '2009', degree: 'MTech Instrumentation', title: 'Design and Development of Control System for Robotic Gripper using PLC', institute: 'COEP Pune', order: 9 },
  { student: 'Sachin Karade', year: '2010', degree: 'MTech Design', title: 'Crack Propagation study using FEM in Whirlpool washing machine housing', institute: 'Whirlpool Pune', order: 10 },
  { student: 'Lalitkumar G. Yadav', year: '2011', degree: 'MTech Design', title: 'Optimisation of Shifter Fork using Topology Optimization and validating by FEA', institute: 'TATA Motors Pune', order: 11 },
  { student: 'Sagar K. Tapkir', year: '2012', degree: 'MTech Design', title: 'Analysis and Simulation of Multifingered Robotic Gripper to study the kinematics and dynamics', institute: 'COEP Pune', order: 12 },
  { student: 'Nischay Y. Pahade', year: '2012', degree: 'MTech Mechatronics', title: 'Performance Improvisation of YASAKAWA MOTOMAN Robot by redesigning controller and path programming', institute: 'COEP Pune', order: 13 },
  { student: 'Prasad V. Patil', year: '2012', degree: 'MTech Mechatronics', title: 'Design and Development of 5 DOF Robot Arm', institute: 'COEP Pune', order: 14 },
  { student: 'Amar P. Nerune', year: '2012', degree: 'MTech Mechatronics', title: 'Design and Development of Multifingered Robotic Gripper for Feedback Gripping', institute: 'COEP Pune', order: 15 },
  { student: 'Amey V. Sutar', year: '2012', degree: 'MTech Mechatronics', title: 'Analysis of Robot Arm Kinematics and Dynamics for different Trajectories', institute: 'COEP Pune', order: 16 },
  { student: 'Sunil Ramteke', year: '2012', degree: 'MTech Mechatronics', title: 'Industrial Robot Retrofitting for Automation', institute: 'COEP Pune', order: 17 },
  { student: 'Abhishek G. Chavan', year: '2012', degree: 'MTech Automotive', title: 'Formula SAE Race Car Design and Performance Study', institute: 'ARAI Pune', order: 18 },
  { student: 'Harshal Bhagatkar', year: '2013', degree: 'MTech Mechatronics', title: 'Design and Development of Multifingered Robotic Gripper for ATMUV', institute: 'R&DE Engineers Dighi, DRDO', order: 19 },
  { student: 'Vipul Ahir', year: '2013', degree: 'MTech Automotive', title: 'Electric Power Steering Study and Analysis', institute: 'ARAI Pune', order: 20 },
  { student: 'Kaustubh Masurkar', year: '2014', degree: 'MTech Mechatronics', title: 'Design and Development of Bipedal Walking Robot', institute: 'COEP Pune', order: 21 },
  { student: 'Swapnil Kapse', year: '2014', degree: 'MTech Mechatronics', title: 'Design and Fabrication of Humanoid Robot Arm', institute: 'COEP Pune', order: 22 },
  { student: 'Leena Choudhari', year: '2014', degree: 'MTech Mechatronics', title: 'Design and Development of Biomimetic Fish Robot', institute: 'COEP Pune', order: 23 },
  { student: 'Kuldeep Gund', year: '2014', degree: 'MTech Design', title: 'Load Reconstruction for Gear Shift Fork Assembly', institute: 'John Deere Technology Centre Pune', order: 24 },
  { student: 'Dyanprakash Bagde', year: '2014', degree: 'MTech Design', title: 'Design & Development of Legged Wheel Hybrid Robot', institute: 'COEP Pune', order: 25 },
  { student: 'Rupesh Gosavi', year: '2015', degree: 'MTech Automotive', title: 'Adaptive Cruise Control Algorithm Development and Simulation', institute: 'COEP Pune', order: 26 },
  { student: 'Pratik Gangurde', year: '2016', degree: 'MTech Mechatronics', title: 'Design and Development of Riot Surveillance Vehicle', institute: 'COEP Pune', order: 27 },
  { student: 'Swapnil Shete', year: '2016', degree: 'MTech Design', title: 'Study and Analysis of Elastic Steel Strip Constrained Motion', institute: 'COEP Pune', order: 28 },
  { student: 'Amit Pulsule', year: '2016', degree: 'MTech Automotive', title: 'Study of Stresses in Leaf Springs during Unwinding / Flattening Operation', institute: 'COEP Pune', order: 29 },
  { student: 'Akshay Mastood', year: '2016', degree: 'MTech Automotive', title: 'EFI Dual Injection System Study and Performance Simulation', institute: 'COEP Pune', order: 30 },
  { student: 'Sachin Waghela', year: '2016', degree: 'MTech Automotive', title: 'Development of Anti-Lock CAM Drum Brake System', institute: 'COEP Pune', order: 31 },
  { student: 'Raj Kulsange', year: '2017', degree: 'MTech Design', title: 'Around-Corner Visibility Improvement System for Automobiles', institute: 'COEP Pune', order: 32 },
  { student: 'Rupa Bhagwat', year: '2017', degree: 'MTech Mechatronics', title: 'Automation of Bag Filter Shaker System in Paint Industry', institute: 'COEP Pune', order: 33 },
  { student: 'Amit Lonkar', year: '2018', degree: 'MTech Design', title: 'Crashworthiness Study and Design Optimization of Bumper Beam', institute: 'TATA Technologies Pune', order: 34 },
  { student: 'Bhushan Darekar', year: '2018', degree: 'MTech Mechatronics', title: 'Design and Development of Soft Humanoid Robot', institute: 'COEP Pune', order: 35 },
  { student: 'Subodh Gade', year: '2018', degree: 'MTech Mech & Material (DoT, SPPU)', title: 'Design and Control of Stewart Platform for Bone Deformity Correction', institute: 'COEP Pune', order: 36 },
  { student: 'Rahul Sable', year: '2019', degree: 'MTech Design', title: 'Design & Development of Multifunctional Multi-Finger Robotic Gripper', institute: 'COEP Pune', order: 37 },
  { student: 'Kaushal Dole', year: '2019', degree: 'MTech Automotive', title: 'Vehicle Kinematics & Compliance and Handling Simulation', institute: 'COEP Pune', order: 38 },
  { student: 'Kaushal Kalantri', year: '2020', degree: 'MTech Design', title: 'Design and Validation of Matlab Simulation for Biped Exoskeleton Joint Actuation', institute: 'COEP Pune', order: 39 },
  { student: 'Kirti Chachane', year: '2020', degree: 'MTech Mechatronics', title: 'Industrial Robot Calibration using Low Cost Testing Equipment', institute: 'COEP Pune', order: 40 },
  { student: 'Sameer Kaware', year: '2020', degree: 'MTech Automotive', title: 'Semi-Autonomous Parking System for Automatic Transmission Vehicles', institute: 'COEP Pune', order: 41 },
  { student: 'Shantanu Bharad', year: '2021', degree: 'MTech Design', title: 'Simulation of Two Legs Balancing Gait for a Biped Robot', institute: 'COEP Pune', order: 42 },
  { student: 'Ravindra Shinde', year: '2021', degree: 'MTech Mechatronics', title: 'Industrial Robot Performance Analysis and Benchmarking', institute: 'COEP Pune', order: 43 },
  { student: 'Anirudha Sonawane', year: '2021', degree: 'MTech Automotive', title: 'Low-cost Adaptive Cruise Control System Development', institute: 'COEP Pune', order: 44 },
  { student: 'Shrikant Pashawar', year: '2022', degree: 'MTech Design', title: 'Parallel Robot for Centre Line Alignment in Manufacturing', institute: 'COEP Pune', order: 45 },
  { student: 'Moreshwar Bhalerao', year: '2022', degree: 'MTech Mechatronics', title: 'Smart Vertical Lift System for Physically Disabled Persons', institute: 'COEP Pune', order: 46 },
  { student: 'Sajal Anand', year: '2022', degree: 'MTech Automotive', title: 'Alternative Material Study for Speedometer and Dashboard Components', institute: 'COEP Pune', order: 47 },
  { student: 'Dhiraj Dhande', year: '2022', degree: 'MTech AI & Robotics', title: 'Ground Traversability Estimation for Quadruped Robot with Modified DWA Algorithm', institute: 'COEP Pune', order: 48 },
  { student: 'Ashu Dighe', year: '2023', degree: 'MTech Robotics & AI', title: 'Modelling, Kinematic Analysis, Gait and Trajectory Generation for Quadruped Robot', institute: 'COEP Pune', order: 49 },
  { student: 'Aditya Kulkarni', year: '2023', degree: 'MTech Design', title: 'Feasibility Analysis and Experimental Study of Turret Gun Control System', institute: 'COEP Pune', order: 50 },
  { student: 'Prasad Kumavat', year: '2024', degree: 'MTech Design', title: 'Design and Development of Aerial Object Tracking Turret', institute: 'COEP Pune', order: 51 },
  { student: 'Sneha Mahajan', year: '2024', degree: 'MTech R&AI', title: 'State Estimation of Quadruped Robot', institute: 'COEP Pune', order: 52 },
  { student: 'Niraj Torane', year: '2024', degree: 'MTech R&AI', title: 'Humanoid Dual Arm Cooperative Manipulation Dynamic Model Development', institute: 'COEP Pune', order: 53 },
  { student: 'Suhas Kokate', year: '2025', degree: 'MTech Automotive', title: 'Vibration Damping System for Military Vehicle Applications', institute: 'COEP Pune', order: 54 },
  { student: 'Omkar Khole', year: '2025', degree: 'MTech Robotics & AI', title: 'Discomfort Index Measurement for Driver Ergonomics', institute: 'COEP Pune', order: 55 },
  { student: 'Niraj Maddel', year: '2025', degree: 'MTech Robotics & AI', title: 'LLM Quantization Techniques for Efficient AI Deployment on Edge Devices', institute: 'COEP Pune', order: 56 },
  { student: 'Rohan Kharat', year: '2025', degree: 'MTech Design', title: 'Design of Aerial Object Tracking Turret', institute: 'COEP Pune', order: 57 },
];

const STUDENT_ACHIEVEMENTS = [
  { achievement: 'National Champion at ROBOCON 2017', students: 'Robot Study Circle Team, COEP', year: '2017', prize: 'National Championship Title', order: 0 },
  { achievement: '6th Rank at International ROBOCON 2017, Tokyo, Japan', students: 'Robot Study Circle Team, COEP', year: '2017', prize: 'Prof Nagasse Award & Most Lovely Robot Award', order: 1 },
  { achievement: 'Silver Award at KPIT Sparkle 2017', students: 'Prabhakar Naik, Arpit Savarkar, Mohit Jahagirdar', year: '2017', prize: 'INR 2.5 Lakhs for Wall Climbing Robot', order: 2 },
  { achievement: 'Second Runner Up at DRUSE 2018', students: 'Student Team', year: '2018', prize: 'Compressed air powered Human Exoskeleton Suit', order: 3 },
  { achievement: 'Innovative Project Award', students: 'Samarth Chaudhari, Arya Arasan, Rushikesh Pachghare, Prithvish Taukari', year: '2022', prize: 'Development of Underwater ROV for Marine Surveillance', order: 4 },
];

const COMPETITIONS = [
  { competition: 'ABU ROBOCON', years: '2015-2023', role: 'Faculty Adviser, Robot Study Circle', achievements: ['National Champion 2017', '6th Rank at International ROBOCON 2017, Tokyo, Japan', 'Multiple National Level Participations'], order: 0 },
  { competition: 'FIRST Tech Challenge (FTC)', years: '2022-2023', role: 'Judge & Co-organiser', location: 'Pune', order: 1 },
  { competition: 'ROBOTEX International', years: '2019, 2023', role: 'Chief Judge & Organizer', achievements: ['Regional Competition at COEP', 'International Participation at Estonia'], order: 2 },
  { competition: 'KPIT Sparkle', years: '2017', role: 'Mentor', achievements: ['Silver Award (Rs 2.5 Lakhs) for Wall Climbing Robot'], order: 3 },
  { competition: 'DRUSE (DRDO Robotics & Unmanned System Exposition)', years: '2018', role: 'Mentor', achievements: ['Second Runner Up - Human Exoskeleton Suit'], order: 4 },
];

// ─── Seed handler ─────────────────────────────────────────────────────────────

export async function POST() {
  try {
    await connectDB();

    // Clear existing data
    await Promise.all([
      PersonalInfo.deleteMany({}),
      Award.deleteMany({}),
      Publication.deleteMany({}),
      ResearchProject.deleteMany({}),
      PhDStudent.deleteMany({}),
      Patent.deleteMany({}),
      StudentProject.deleteMany({}),
      StudentAchievement.deleteMany({}),
      CompetitionMentorship.deleteMany({}),
      Qualification.deleteMany({}),
      Experience.deleteMany({}),
      ProfessionalMembership.deleteMany({}),
      PresentAffiliation.deleteMany({}),
      Grant.deleteMany({}),
      HeroSlide.deleteMany({}),
      GalleryImage.deleteMany({}),
      GalleryVideo.deleteMany({}),
    ]);

    // Insert all data
    await Promise.all([
      PersonalInfo.create(PERSONAL_INFO),
      Award.insertMany(AWARDS),
      Publication.insertMany(PUBLICATIONS),
      ResearchProject.insertMany(RESEARCH_PROJECTS),
      PhDStudent.insertMany(PHD_STUDENTS),
      Patent.insertMany(PATENTS),
      StudentProject.insertMany(STUDENT_PROJECTS),
      StudentAchievement.insertMany(STUDENT_ACHIEVEMENTS),
      CompetitionMentorship.insertMany(COMPETITIONS),
      Qualification.insertMany(QUALIFICATIONS),
      Experience.insertMany(EXPERIENCE),
      ProfessionalMembership.insertMany(MEMBERSHIPS),
      PresentAffiliation.insertMany(AFFILIATIONS),
      Grant.insertMany(GRANTS),
      HeroSlide.insertMany(HERO_SLIDES_DATA),
      GalleryImage.insertMany(GALLERY_IMAGES_DATA),
      ...(GALLERY_VIDEOS_DATA.length ? [GalleryVideo.insertMany(GALLERY_VIDEOS_DATA)] : []),
    ]);

    return NextResponse.json({
      message: 'Database seeded successfully',
      counts: {
        awards: AWARDS.length,
        publications: PUBLICATIONS.length,
        researchProjects: RESEARCH_PROJECTS.length,
        phdStudents: PHD_STUDENTS.length,
        patents: PATENTS.length,
        studentProjects: STUDENT_PROJECTS.length,
        studentAchievements: STUDENT_ACHIEVEMENTS.length,
        competitions: COMPETITIONS.length,
        qualifications: QUALIFICATIONS.length,
        experience: EXPERIENCE.length,
        memberships: MEMBERSHIPS.length,
        affiliations: AFFILIATIONS.length,
        grants: GRANTS.length,
        heroSlides: HERO_SLIDES_DATA.length,
        galleryImages: GALLERY_IMAGES_DATA.length,
        galleryVideos: GALLERY_VIDEOS_DATA.length,
      },
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Seeding failed', details: String(error) }, { status: 500 });
  }
}
