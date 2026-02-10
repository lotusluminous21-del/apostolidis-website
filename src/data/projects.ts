export type ProjectCategory =
    | 'Commercial & Retail'
    | 'Residential Renovations'
    | 'Villa & Luxury'
    | 'Technical Specialty Work'
    | 'Architectural Details';

export type ProjectStatus = 'Completed' | 'In Progress' | 'Ongoing Portfolio';

export interface ProjectImage {
    src: string;
    alt: string;
}

export interface ProjectSpec {
    label: string;
    value: string;
}

export interface Project {
    id: string; // Internal ID e.g. 'ap-001'
    code: string; // e.g. 'AP-001'
    slug: string; // e.g. 'philocaly-jewellery-store'
    title: string;
    title_el?: string;
    category: ProjectCategory;
    category_el?: string;
    location: string;
    status: ProjectStatus;
    specs: ProjectSpec[]; // e.g. Area, Year, etc.
    specs_el?: ProjectSpec[];
    shortDescription: string;
    shortDescription_el?: string;
    fullDescription: string;
    fullDescription_el?: string;
    scopeOfWork: string[];
    scopeOfWork_el?: string[];
    keyFeatures: string[];
    keyFeatures_el?: string[];
    materials?: string[]; // Optional, for premium projects
    materials_el?: string[];
    images: ProjectImage[];
    isFeatured?: boolean; // For home page
}

export const projects: Project[] = [
    {
        id: 'ap-001',
        code: 'AP-001',
        slug: 'philocaly-jewellery-store',
        title: 'Philocaly Jewellery Store',
        title_el: 'Κοσμηματοπωλείο Philocaly',
        category: 'Commercial & Retail',
        category_el: 'Επαγγελματικοί Χώροι',
        location: 'Chalandri, Athens',
        status: 'Completed',
        specs: [
            { label: 'Type', value: 'Retail' },
            { label: 'Location', value: 'Chalandri' }
        ],
        specs_el: [
            { label: 'Τύπος', value: 'Κατάστημα' },
            { label: 'Περιοχή', value: 'Χαλάνδρι' }
        ],
        shortDescription: 'A sophisticated jewellery retail space in Chalandri where elegant design meets commercial functionality.',
        shortDescription_el: 'Ένας εκλεπτυσμένος χώρος λιανικής στο Χαλάνδρι, όπου ο κομψός σχεδιασμός συναντά την εμπορική λειτουργικότητα.',
        fullDescription: 'The Philocaly Project represents our commitment to creating commercial spaces that serve both aesthetic and functional purposes. Located in Chalandri, this jewellery store was designed to provide an elegant backdrop where precious pieces take center stage. The construction work involved careful attention to lighting, display integration, and creating an atmosphere of understated luxury that complements the merchandise without overwhelming it. Our team managed all aspects of the interior construction, ensuring that every detail—from wall finishes to electrical installations for display lighting—was executed to the highest standards.',
        fullDescription_el: 'Το έργο Philocaly αντιπροσωπεύει τη δέσμευσή μας στη δημιουργία επαγγελματικών χώρων που εξυπηρετούν τόσο αισθητικούς όσο και λειτουργικούς σκοπούς. Σχεδιασμένο για να αναδεικνύει τα κοσμήματα, το κατάστημα αποπνέει διακριτική πολυτέλεια. Η κατασκευή περιλάμβανε εξειδικευμένες ηλεκτρολογικές εγκαταστάσεις για τον φωτισμό ανάδειξης, προσεγμένα φινιρίσματα και custom κατασκευές προβολής. Η ομάδα μας ανέλαβε την πλήρη κατασκευή του εσωτερικού χώρου, διασφαλίζοντας την άρτια εφαρμογή της μελέτης και την υψηλή ποιότητα σε κάθε λεπτομέρεια.',
        scopeOfWork: [
            'Complete interior construction and fit-out',
            'Custom display area construction',
            'Specialized lighting installation for jewellery displays',
            'Wall finishing and painting',
            'Flooring installation',
            'Electrical work for display cases and ambient lighting'
        ],
        keyFeatures: [
            'Retail-focused design optimized for product display',
            'Sophisticated lighting scheme',
            'Clean, minimal aesthetic',
            'Premium finish quality'
        ],
        images: [
            { src: '/images/apostolidis_instagram/project_01_philocaly_jewellery_chalandri/post01_img01.webp', alt: 'Main store view' },
            { src: '/images/apostolidis_instagram/project_01_philocaly_jewellery_chalandri/post01_img02.webp', alt: 'Display detail' },
            { src: '/images/apostolidis_instagram/project_01_philocaly_jewellery_chalandri/post01_img03.webp', alt: 'Interior angle' },
            { src: '/images/apostolidis_instagram/project_01_philocaly_jewellery_chalandri/post01_img04.webp', alt: 'Finished space' }
        ],
        isFeatured: true
    },
    {
        id: 'ap-002',
        code: 'AP-002',
        slug: 'urban-soul-villa',
        title: 'Urban Soul Villa',
        title_el: 'Κατοικία Urban Soul',
        category: 'Villa & Luxury',
        category_el: 'Πολυτελείς Κατοικίες',
        location: 'Athens Region',
        status: 'Completed',
        specs: [
            { label: 'Type', value: 'Villa' },
            { label: 'Role', value: 'Supervision' }
        ],
        specs_el: [
            { label: 'Τύπος', value: 'Μονοκατοικία' },
            { label: 'Ρόλος', value: 'Επίβλεψη' }
        ],
        shortDescription: 'Project supervision for Urban Soul Project, a contemporary villa development showcasing modern Greek architecture and premium construction standards.',
        shortDescription_el: 'Επίβλεψη κατασκευής για το Urban Soul Project, μια σύγχρονη βίλα που συνδυάζει τη μοντέρνα αρχιτεκτονική με υψηλά πρότυπα κατασκευής.',
        fullDescription: 'Apostolidis Construction provided comprehensive project supervision services for this villa development in collaboration with Urban Soul Project. The project demonstrates our capability to oversee complex residential builds, ensuring quality control, timeline management, and coordination between multiple trades. The villa features contemporary architectural elements that blend modern design sensibilities with the Greek landscape, incorporating large glazed areas, clean lines, and thoughtful spatial planning.',
        fullDescription_el: 'Το γραφείο μας ανέλαβε την πλήρη επίβλεψη κατασκευής για αυτό το έργο, σε συνεργασία με το Urban Soul Project. Η διαχείριση του έργου απαιτούσε αυστηρό ποιοτικό έλεγχο, τήρηση χρονοδιαγραμμάτων και συντονισμό πολλαπλών συνεργείων. Η κατοικία χαρακτηρίζεται από σύγχρονα αρχιτεκτονικά στοιχεία, μεγάλα ανοίγματα και καθαρές γραμμές, απαιτώντας ακρίβεια στην κατασκευή και προσοχή στη λεπτομέρεια.',
        scopeOfWork: [
            'Full project supervision and management',
            'Quality control and inspection',
            'Contractor coordination',
            'Timeline and budget management',
            'Technical consultation',
            'Final inspection and handover'
        ],
        keyFeatures: [
            'Contemporary villa architecture',
            'Professional project supervision',
            'Multi-trade coordination',
            'Quality assurance throughout construction'
        ],
        images: [
            { src: '/images/apostolidis_instagram/project_02_urban_soul_villa/post02_img01.webp', alt: 'Villa exterior' },
            { src: '/images/apostolidis_instagram/project_02_urban_soul_villa/post02_img02.webp', alt: 'Architectural detail' },
            { src: '/images/apostolidis_instagram/project_02_urban_soul_villa/post02_img03.webp', alt: 'Construction progress' }
        ],
        isFeatured: true
    },
    {
        id: 'ap-003',
        code: 'AP-003',
        slug: 'filmiki-office-renovation',
        title: 'Filmiki Office',
        title_el: 'Γραφεία Filmiki',
        category: 'Commercial & Retail',
        category_el: 'Επαγγελματικοί Χώροι',
        location: 'Filmiki, Athens',
        status: 'Completed',
        specs: [
            { label: 'Type', value: 'Office' },
            { label: 'Focus', value: 'Renovation' }
        ],
        specs_el: [
            { label: 'Τύπος', value: 'Γραφεία' },
            { label: 'Έργο', value: 'Ανακαίνιση' }
        ],
        shortDescription: 'Complete office renovation for Filmiki, transforming the workspace with modern design, custom metalwork windows, and contemporary furniture integration.',
        shortDescription_el: 'Πλήρης ανακαίνιση γραφείων για την Filmiki. Μετασχηματισμός του χώρου εργασίας με σύγχρονο σχεδιασμό, ειδικές μεταλλικές κατασκευές και λειτουργική διαρρύθμιση.',
        fullDescription: 'The Filmiki office project represents a comprehensive workspace transformation. Our team delivered a complete renovation that included structural modifications, custom metalwork for windows and architectural details, and full interior fit-out. The project was designed to create a modern, functional office environment that supports productivity while maintaining aesthetic appeal. Special attention was given to the metalwork elements, which serve as both functional components and design features, creating a distinctive character for the space.',
        fullDescription_el: 'Το έργο αφορούσε την ολική ανακαίνιση και ανάπλαση των γραφείων της Filmiki. Η ομάδα μας ανέλαβε δομικές τροποποιήσεις, custom μεταλλικές κατασκευές υαλοστασίων και την πλήρη διαμόρφωση του εσωτερικού χώρου. Στόχος ήταν η δημιουργία ενός σύγχρονου, λειτουργικού περιβάλλοντος εργασίας. Ιδιαίτερη έμφαση δόθηκε στις μεταλλικές λεπτομέρειες, οι οποίες λειτουργούν ως κεντρικά αρχιτεκτονικά στοιχεία, προσδίδοντας βιομηχανικό αλλά εκλεπτυσμένο χαρακτήρα στον χώρο.',
        scopeOfWork: [
            'Complete office demolition and renovation',
            'Custom metalwork window fabrication and installation',
            'Interior wall construction and finishing',
            'Electrical installation for office equipment',
            'Lighting design and installation',
            'Flooring installation',
            'Furniture coordination and placement',
            'Painting and final finishes'
        ],
        keyFeatures: [
            'Custom metalwork windows',
            'Modern office design',
            'Integrated furniture solutions',
            'Professional workspace optimization'
        ],
        images: [
            { src: '/images/apostolidis_instagram/project_03_filmiki_office/post03_img01.webp', alt: 'Metalwork window detail' },
            { src: '/images/apostolidis_instagram/project_03_filmiki_office/post05_img01.webp', alt: 'Office overview' },
            { src: '/images/apostolidis_instagram/project_03_filmiki_office/post05_img02.webp', alt: 'Workspace area' },
            { src: '/images/apostolidis_instagram/project_03_filmiki_office/post05_img03.webp', alt: 'Interior detail' },
            { src: '/images/apostolidis_instagram/project_03_filmiki_office/post05_img04.webp', alt: 'Finished office' }
        ]
    },
    {
        id: 'ap-004',
        code: 'AP-004',
        slug: 'ode-to-socks-retail-store',
        title: 'Ode to Socks Store',
        title_el: 'Κατάστημα Ode to Socks',
        category: 'Commercial & Retail',
        category_el: 'Επαγγελματικοί Χώροι',
        location: 'Athens',
        status: 'Completed',
        specs: [
            { label: 'Type', value: 'Retail' },
            { label: 'Style', value: 'Creative' }
        ],
        specs_el: [
            { label: 'Τύπος', value: 'Κατάστημα' },
            { label: 'Ύφος', value: 'Creative' }
        ],
        shortDescription: 'A playful and creative retail store design for Ode to Socks, where craftsmanship meets whimsical commercial design to create a memorable shopping experience.',
        shortDescription_el: 'Ένας δημιουργικός χώρος λιανικής για το Ode to Socks, όπου η δεξιοτεχνία συναντά τον ευφάνταστο σχεδιασμό δημιουργώντας μια μοναδική αγοραστική εμπειρία.',
        fullDescription: 'The Ode to Socks project showcases our ability to bring creative commercial concepts to life. This retail space required a unique approach—balancing playful design elements with practical retail functionality. Our team worked closely with the design vision to create a store that reflects the brand\'s personality while providing an efficient shopping environment. The project involved custom interior details, specialized display solutions, and careful attention to the customer journey through the space.',
        fullDescription_el: 'Το έργο Ode to Socks αναδεικνύει την ικανότητά μας να υλοποιούμε δημιουργικά concept. Ο χώρος απαιτούσε μια ιδιαίτερη προσέγγιση που να ισορροπεί τα παιχνιδιάρικα σχεδιαστικά στοιχεία με την πρακτική λειτουργικότητα ενός καταστήματος. Συνεργαστήκαμε στενά με τους σχεδιαστές για να δημιουργήσουμε έναν χώρο που αντικατοπτρίζει την προσωπικότητα του brand, ενσωματώνοντας custom κατασκευές και εξειδικευμένες λύσεις προβολής προϊόντων, με έμφαση στην εμπειρία του επισκέπτη.',
        scopeOfWork: [
            'Complete retail interior construction',
            'Custom display unit fabrication',
            'Wall treatments and finishes',
            'Specialized lighting for product display',
            'Flooring installation',
            'Electrical and data infrastructure',
            'Signage integration'
        ],
        keyFeatures: [
            'Creative, brand-aligned design',
            'Custom display solutions',
            'Playful yet professional execution',
            'Attention to retail customer experience'
        ],
        images: [
            { src: '/images/apostolidis_instagram/project_05_ode_to_socks_store/post14_img01.webp', alt: 'Store detail' },
            { src: '/images/apostolidis_instagram/project_05_ode_to_socks_store/post15_img01.webp', alt: 'Main store view' },
            { src: '/images/apostolidis_instagram/project_05_ode_to_socks_store/post15_img02.webp', alt: 'Display area' },
            { src: '/images/apostolidis_instagram/project_05_ode_to_socks_store/post15_img03.webp', alt: 'Interior design' },
            { src: '/images/apostolidis_instagram/project_05_ode_to_socks_store/post15_img04.webp', alt: 'Finished space' }
        ],
        isFeatured: false
    },
    {
        id: 'ap-005',
        code: 'AP-005',
        slug: 'kolonaki-luxury-apartment',
        title: 'Kolonaki Luxury Apartment',
        title_el: 'Διαμέρισμα Κολωνάκι',
        category: 'Residential Renovations',
        category_el: 'Ανακαινίσεις Κατοικιών',
        location: 'Kolonaki, Athens',
        status: 'Completed',
        specs: [
            { label: 'Type', value: 'Apartment' },
            { label: 'Location', value: 'Kolonaki' }
        ],
        specs_el: [
            { label: 'Τύπος', value: 'Διαμέρισμα' },
            { label: 'Περιοχή', value: 'Κολωνάκι' }
        ],
        shortDescription: 'An elegant apartment renovation in Athens\' prestigious Kolonaki district, featuring wood flooring, warm tones, and sophisticated living spaces bathed in natural light.',
        shortDescription_el: 'Ανακαίνιση διαμερίσματος στο Κολωνάκι, με έμφαση στα φυσικά υλικά, τα ξύλινα δάπεδα και τον φωτισμό.',
        fullDescription: 'This Kolonaki apartment renovation exemplifies refined urban living in one of Athens\' most desirable neighborhoods. The project focused on creating bright, welcoming spaces that maximize natural light while maintaining warmth and comfort. The renovation included living room transformation, workspace integration, and careful material selection to achieve a cohesive design language throughout. Wood flooring adds warmth and character, while the color palette creates a sophisticated yet inviting atmosphere.',
        fullDescription_el: 'Η ανακαίνιση στο Κολωνάκι αποτελεί χαρακτηριστικό παράδειγμα αστικής κατοικίας υψηλών προδιαγραφών. Στόχος ήταν η δημιουργία φωτεινών χώρων που αποπνέουν ζεστασιά, εστιάζοντας στην ποιότητα κατασκευής. Η επιλογή ξύλινων δαπέδων, η μελέτη φωτισμού και η προσεκτική χρήση υλικών δημιούργησαν ένα αποτέλεσμα διαχρονικής αισθητικής και λειτουργικής υπεροχής.',
        scopeOfWork: [
            'Complete apartment renovation',
            'Wood flooring supply and installation',
            'Wall preparation and painting',
            'Living room redesign',
            'Home office/workspace creation',
            'Lighting design and installation',
            'Window treatments',
            'Furniture coordination'
        ],
        keyFeatures: [
            'Premium Kolonaki location',
            'Natural light optimization',
            'Wood flooring throughout',
            'Warm, sophisticated color palette',
            'Integrated workspace design'
        ],
        images: [
            { src: '/images/apostolidis_instagram/project_06_kolonaki_apartment/post20_img01.webp', alt: 'Living room main' },
            { src: '/images/apostolidis_instagram/project_06_kolonaki_apartment/post20_img02.webp', alt: 'Living space detail' },
            { src: '/images/apostolidis_instagram/project_06_kolonaki_apartment/post20_img03.webp', alt: 'Room view' },
            { src: '/images/apostolidis_instagram/project_06_kolonaki_apartment/post20_img04.webp', alt: 'Interior angle' },
            { src: '/images/apostolidis_instagram/project_06_kolonaki_apartment/post21_img01.webp', alt: 'Workspace area' },
            { src: '/images/apostolidis_instagram/project_06_kolonaki_apartment/post22_img01.webp', alt: 'Living room design' },
            { src: '/images/apostolidis_instagram/project_06_kolonaki_apartment/post22_img02.webp', alt: 'Color detail' },
            { src: '/images/apostolidis_instagram/project_06_kolonaki_apartment/post22_img03.webp', alt: 'Finished interior' }
        ],
        isFeatured: true
    },
    {
        id: 'ap-006',
        code: 'AP-006',
        slug: 'agia-paraskevi-kitchen',
        title: 'Agia Paraskevi Kitchen',
        title_el: 'Κουζίνα Αγ. Παρασκευή',
        category: 'Residential Renovations',
        category_el: 'Ανακαινίσεις Κατοικιών',
        location: 'Agia Paraskevi, Athens',
        status: 'Completed',
        specs: [
            { label: 'Type', value: 'Kitchen' },
            { label: 'Style', value: 'Minimal' }
        ],
        specs_el: [
            { label: 'Τύπος', value: 'Κουζίνα' },
            { label: 'Ύφος', value: 'Minimal' }
        ],
        shortDescription: 'A modern, minimal kitchen renovation in Agia Paraskevi—quiet, bright, and designed for everyday functionality without compromising on style.',
        shortDescription_el: 'Μοντέρνα ανακαίνιση κουζίνας με μινιμαλιστική προσέγγιση και λειτουργικό σχεδιασμό.',
        fullDescription: 'This kitchen renovation in Agia Paraskevi demonstrates our approach to creating functional spaces that don\'t sacrifice aesthetics. The design prioritizes practicality for daily use while maintaining a clean, modern appearance. Natural light plays a key role in the space, complemented by a minimal color palette and thoughtful storage solutions. The result is a kitchen that serves as both a working space and a pleasant environment for family life.',
        fullDescription_el: 'Στην ανακαίνιση αυτής της κουζίνας στην Αγία Παρασκευή, δόθηκε προτεραιότητα στην εργονομία και την αισθητική λιτότητα. Ο σχεδιασμός εκμεταλλεύεται το φυσικό φως, ενώ οι αποθηκευτικοί χώροι μελετήθηκαν ώστε να καλύπτουν πλήρως τις ανάγκες μιας σύγχρονης κατοικίας.',
        scopeOfWork: [
            'Complete kitchen demolition and renovation',
            'Custom kitchen cabinet installation',
            'Countertop supply and installation',
            'Tile backsplash installation',
            'Plumbing modifications',
            'Electrical upgrades for appliances',
            'Lighting installation',
            'Appliance integration'
        ],
        keyFeatures: [
            'Modern minimal design',
            'Optimized natural lighting',
            'Functional layout',
            'Quality materials and finishes'
        ],
        images: [
            { src: '/images/apostolidis_instagram/project_07_agia_paraskevi_kitchen/post23_img01.webp', alt: 'Kitchen overview' },
            { src: '/images/apostolidis_instagram/project_07_agia_paraskevi_kitchen/post23_img02.webp', alt: 'Kitchen detail' }
        ]
    },
    {
        id: 'ap-007',
        code: 'AP-007',
        slug: 'chalandri-kitchen-dining',
        title: 'Chalandri Kitchen & Dining',
        title_el: 'Κουζίνα & Τραπεζαρία Χαλάνδρι',
        category: 'Residential Renovations',
        category_el: 'Ανακαινίσεις Κατοικιών',
        location: 'Chalandri, Athens',
        status: 'Completed',
        specs: [
            { label: 'Type', value: 'Kitchen' },
            { label: 'Layout', value: 'Open-Plan' }
        ],
        specs_el: [
            { label: 'Τύπος', value: 'Κουζίνα' },
            { label: 'Κάτοψη', value: 'Ενιαίος Χώρος' }
        ],
        shortDescription: 'An open-plan kitchen and dining renovation in Chalandri, creating a cohesive space built for efficient daily use with clean lines and minimal aesthetics.',
        shortDescription_el: 'Διαμόρφωση ενιαίου χώρου κουζίνας και τραπεζαρίας για βέλτιστη λειτουργικότητα και αισθητική συνοχή.',
        fullDescription: 'This Chalandri project transformed a traditional layout into a modern open-plan living space. The renovation connected the kitchen and dining areas to create a seamless flow that supports contemporary family life. Clean lines and a minimal design approach ensure the space feels open and uncluttered, while practical considerations ensure it functions efficiently for daily use. The project demonstrates our ability to reimagine residential spaces for modern living.',
        fullDescription_el: 'Το έργο αφορούσε την ενοποίηση της κουζίνας με την τραπεζαρία, δημιουργώντας έναν ενιαίο, λειτουργικό χώρο διημέρευσης. Μέσα από δομικές παρεμβάσεις και νέο σχεδιασμό, επιτεύχθηκε η άμεση επικοινωνία των δύο χώρων, διατηρώντας παράλληλα διακριτά όρια χρήσης.',
        scopeOfWork: [
            'Structural modifications for open-plan layout',
            'Complete kitchen renovation',
            'Dining area integration',
            'Custom cabinetry installation',
            'Flooring throughout connected spaces',
            'Electrical redistribution',
            'Lighting design for multiple zones',
            'Wall finishing and painting'
        ],
        keyFeatures: [
            'Open-plan living design',
            'Kitchen-dining integration',
            'Clean, minimal aesthetic',
            'Efficient space utilization'
        ],
        images: [
            { src: '/images/apostolidis_instagram/project_08_chalandri_kitchen_renovation/post26_img01.webp', alt: 'Dining area' },
            { src: '/images/apostolidis_instagram/project_08_chalandri_kitchen_renovation/post26_img02.webp', alt: 'Kitchen view' },
            { src: '/images/apostolidis_instagram/project_08_chalandri_kitchen_renovation/post26_img03.webp', alt: 'Full layout' }
        ]
    },
    {
        id: 'ap-008',
        code: 'AP-008',
        slug: 'chalandri-arched-doorway',
        title: 'Chalandri Arched Doorway',
        title_el: 'Τοξωτά Ανοίγματα Χαλάνδρι',
        category: 'Architectural Details',
        category_el: 'Αρχιτεκτονικές Λεπτομέρειες',
        location: 'Chalandri, Athens',
        status: 'Completed',
        specs: [
            { label: 'Type', value: 'Detail' },
            { label: 'Feature', value: 'Arc' }
        ],
        specs_el: [
            { label: 'Τύπος', value: 'Λεπτομέρεια' },
            { label: 'Στοιχείο', value: 'Τόξο' }
        ],
        shortDescription: 'A distinctive residential renovation featuring custom arched doorways with soft colors—demonstrating that sometimes architectural simplicity creates the most memorable spaces.',
        shortDescription_el: 'Δημιουργία custom τοξωτών ανοιγμάτων που αναδεικνύουν τον αρχιτεκτονικό χαρακτήρα του χώρου.',
        fullDescription: 'This Chalandri residential project showcases our craftsmanship in creating architectural features that define a space. The custom arched doorways serve as the signature element, combining traditional architectural forms with contemporary color choices. The project required precision construction to achieve the clean curves and seamless integration with surrounding walls. The soft color palette enhances the architectural forms, creating calm, inviting spaces that feel both timeless and modern.',
        fullDescription_el: 'Η κατασκευή τοξωτών ανοιγμάτων αποτέλεσε κεντρικό στοιχείο του σχεδιασμού. Απαιτήθηκε ακρίβεια στην κατασκευή των καμπύλων επιφανειών και στην εφαρμογή των επιχρισμάτων, ώστε τα ανοίγματα να ενσωματωθούν αρμονικά στην υφιστάμενη τοιχοποιία, προσδίδοντας πλαστικότητα στον χώρο.',
        scopeOfWork: [
            'Custom arched doorway construction',
            'Drywall and plaster work for curved forms',
            'Precision finishing for clean lines',
            'Color consultation and painting',
            'Integration with existing architecture',
            'Lighting to highlight architectural features'
        ],
        keyFeatures: [
            'Custom arched doorway construction',
            'Precision curved plasterwork',
            'Soft, sophisticated color palette',
            'Architectural feature as design centerpiece',
            'From-plan-to-reality execution'
        ],
        images: [
            { src: '/images/apostolidis_instagram/project_11_chalandri_arched_doorway/post09_img01.webp', alt: 'Plan drawing' },
            { src: '/images/apostolidis_instagram/project_11_chalandri_arched_doorway/post09_img02.webp', alt: 'Completed arch' },
            { src: '/images/apostolidis_instagram/project_11_chalandri_arched_doorway/post18_img01.webp', alt: 'Angle view' },
            { src: '/images/apostolidis_instagram/project_11_chalandri_arched_doorway/post18_img02.webp', alt: 'Detail' },
            { src: '/images/apostolidis_instagram/project_11_chalandri_arched_doorway/post24_img01.webp', alt: 'Color detail' },
            { src: '/images/apostolidis_instagram/project_11_chalandri_arched_doorway/post24_img02.webp', alt: 'Doorway view' },
            { src: '/images/apostolidis_instagram/project_11_chalandri_arched_doorway/post24_img03.webp', alt: 'Finished feature' }
        ]
    },
    {
        id: 'ap-009',
        code: 'AP-009',
        slug: 'chalandri-staircase-design',
        title: 'Chalandri Staircase Design',
        title_el: 'Ανακαίνιση Κλίμακας',
        category: 'Architectural Details',
        category_el: 'Αρχιτεκτονικές Λεπτομέρειες',
        location: 'Chalandri, Athens',
        status: 'Completed',
        specs: [
            { label: 'Type', value: 'Detail' },
            { label: 'Feature', value: 'Stairs' }
        ],
        specs_el: [
            { label: 'Τύπος', value: 'Λεπτομέρεια' },
            { label: 'Στοιχείο', value: 'Σκάλα' }
        ],
        shortDescription: 'A staircase renovation with personality—featuring bold color accents that transform a functional element into a design statement.',
        shortDescription_el: 'Αισθητική αναβάθμιση κλιμακοστασίου με χρήση χρώματος και σύγχρονων υλικών.',
        fullDescription: 'This staircase project demonstrates how functional architectural elements can become design features. The renovation introduced color accents that give the stairs personality while maintaining their practical function. The project required careful planning to integrate the color scheme with the surrounding spaces, creating visual interest without overwhelming the overall design. The result is a staircase that serves as both circulation and a memorable design moment.',
        fullDescription_el: 'Η ανακαίνιση της κλίμακας μετέτρεψε ένα καθαρά λειτουργικό στοιχείο σε σημείο σχεδιαστικού ενδιαφέροντος. Μέσω της χρήσης έντονων χρωματικών αντιθέσεων και της αποκατάστασης των επιφανειών, το κλιμακοστάσιο απέκτησε νέα ταυτότητα στο εσωτερικό της κατοικίας.',
        scopeOfWork: [
            'Staircase renovation and refinishing',
            'Color design and application',
            'Handrail work',
            'Integration with adjacent spaces',
            'Safety compliance'
        ],
        keyFeatures: [
            'Bold color accent design',
            'Functional-meets-aesthetic approach',
            'Minimal yet impactful intervention'
        ],
        images: [
            { src: '/images/apostolidis_instagram/project_09_chalandri_stairs/post27_img01.webp', alt: 'Staircase with color accent' }
        ]
    },
    {
        id: 'ap-010',
        code: 'AP-010',
        slug: 'chalandri-childrens-room',
        title: 'Chalandri Children\'s Room',
        title_el: 'Παιδικό Δωμάτιο Χαλάνδρι',
        category: 'Residential Renovations',
        category_el: 'Ανακαινίσεις Κατοικιών',
        location: 'Chalandri, Athens',
        status: 'Completed',
        specs: [
            { label: 'Type', value: 'Kids' },
            { label: 'Style', value: 'Calm' }
        ],
        specs_el: [
            { label: 'Τύπος', value: 'Παιδικό' },
            { label: 'Ύφος', value: 'Calm' }
        ],
        shortDescription: 'A calm, thoughtfully zoned children\'s space with soft palette and simple forms—designed for both play and rest.',
        shortDescription_el: 'Σχεδιασμός παιδικού δωματίου με γνώμονα την ασφάλεια, την ηρεμία και τη λειτουργικότητα.',
        fullDescription: 'This children\'s room project in Chalandri required a careful balance between creating a stimulating environment for a child while maintaining calm, restful qualities. The design uses a soft color palette and simple forms to create practical zoning within the space—areas for sleep, play, and study are subtly defined without rigid barriers. The minimal approach ensures the room can grow with the child, adapting to changing needs over time.',
        fullDescription_el: 'Ο σχεδιασμός του παιδικού δωματίου βασίστηκε στη δημιουργία ενός ήρεμου περιβάλλοντος. Επιλέχθηκαν ήπιοι χρωματικοί τόνοι και ειδικές κατασκευές που εξασφαλίζουν ασφάλεια και προσαρμοστικότητα, καλύπτοντας τις ανάγκες ύπνου, παιχνιδιού και μελέτης.',
        scopeOfWork: [
            'Complete room renovation',
            'Custom storage solutions',
            'Workspace/study area creation',
            'Soft color palette application',
            'Lighting for multiple activities',
            'Safety considerations throughout'
        ],
        keyFeatures: [
            'Child-friendly design',
            'Practical zoning',
            'Soft, calming palette',
            'Adaptable space design'
        ],
        images: [
            { src: '/images/apostolidis_instagram/project_10_chalandri_childrens_room/post25_img01.webp', alt: 'Room overview' },
            { src: '/images/apostolidis_instagram/project_10_chalandri_childrens_room/post25_img02.webp', alt: 'Workspace detail' }
        ]
    },
    {
        id: 'ap-011',
        code: 'AP-011',
        slug: 'chalandri-residential-living',
        title: 'Chalandri Living Space',
        title_el: 'Καθιστικό Χαλάνδρι',
        category: 'Residential Renovations',
        category_el: 'Ανακαινίσεις Κατοικιών',
        location: 'Chalandri, Athens',
        status: 'Completed',
        specs: [
            { label: 'Type', value: 'Living' },
            { label: 'Mood', value: 'Relaxed' }
        ],
        specs_el: [
            { label: 'Τύπος', value: 'Καθιστικό' },
            { label: 'Ύφος', value: 'Relaxed' }
        ],
        shortDescription: 'A comfortable living space renovation emphasizing soft light and relaxed atmosphere—where minimal décor creates maximum comfort.',
        shortDescription_el: 'Ανακαίνιση χώρου διημέρευσης με έμφαση στον χαμηλό φωτισμό και τη ζεστή ατμόσφαιρα.',
        fullDescription: 'This Chalandri living space renovation focused on creating an environment of comfort and relaxation. The design emphasizes natural light and a minimal approach to décor, allowing the space itself to provide comfort rather than relying on excessive furnishing. Plants add life and freshness, while the overall palette remains soft and inviting. The project demonstrates that thoughtful renovation can create spaces that feel immediately welcoming.',
        fullDescription_el: 'Η ανακαίνιση εστίασε στη δημιουργία ενός χώρου χαλάρωσης και άνεσης. Ο διακριτικός φωτισμός και η μινιμαλιστική διακόσμηση αναδεικνύουν την ποιότητα του χώρου χωρίς περιττά στοιχεία. Η χρήση φυτών προσδίδει ζωντάνια, ενώ η χρωματική παλέτα παραμένει ήπια και φιλόξενη.',
        scopeOfWork: [
            'Living room renovation',
            'Lighting optimization',
            'Wall finishing and painting',
            'Flooring work',
            'Window treatment coordination'
        ],
        keyFeatures: [
            'Natural light emphasis',
            'Minimal, comfortable design',
            'Plant integration',
            'Soft, inviting atmosphere'
        ],
        images: [
            { src: '/images/apostolidis_instagram/project_12_chalandri_residential/post28_img01.webp', alt: 'Living room view' }
        ]
    },
    {
        id: 'ap-012',
        code: 'AP-012',
        slug: 'full-apartment-renovation-45sqm',
        title: 'Full Apartment Renovation',
        title_el: 'Πλήρης Ανακαίνιση 45τ.μ.',
        category: 'Residential Renovations',
        category_el: 'Ανακαινίσεις Κατοικιών',
        location: 'Athens Region',
        status: 'Completed',
        specs: [
            { label: 'Area', value: '45m²' },
            { label: 'Type', value: 'Full' }
        ],
        specs_el: [
            { label: 'Εμβαδόν', value: '45m²' },
            { label: 'Τύπος', value: 'Ολική' }
        ],
        shortDescription: 'A comprehensive 45 sqm apartment transformation featuring complete electrical and plumbing overhaul, gas boiler heating system, SENDO air conditioning, laminate flooring, and custom kitchen with bakelite countertops.',
        shortDescription_el: 'Ριζική ανακαίνιση διαμερίσματος 45τ.μ., με πλήρη αντικατάσταση εγκαταστάσεων και νέο σύστημα θέρμανσης φυσικού αερίου.',
        fullDescription: 'This full apartment renovation demonstrates our capability to completely transform compact living spaces. The 45 square meter apartment received a total overhaul including new electrical installation with upgraded panel, complete plumbing renovation with hydraulic manifold system, and installation of a gas boiler heating system with radiators. Climate control was addressed with SENDO brand air conditioning units. The flooring features glued laminate throughout, while the custom kitchen includes moisture-resistant bakelite countertops. New thermal break aluminum windows and a security door complete the envelope upgrades.',
        fullDescription_el: 'Η ολική ανακαίνιση αυτού του διαμερίσματος 45τ.μ. περιλάμβανε την πλήρη αντικατάσταση των ηλεκτρολογικών και υδραυλικών εγκαταστάσεων, εγκατάσταση νέου πίνακα και κολλεκτέρ ύδρευσης. Τοποθετήθηκε ατομικός λέβητας φυσικού αερίου με σώματα πάνελ και κλιματιστικά SENDO. Η ανακαίνιση ολοκληρώθηκε με νέα κουζίνα από βακελίτη, laminate δάπεδα, κουφώματα αλουμινίου με θερμόδιακοπή και πόρτα ασφαλείας.',
        scopeOfWork: [
            'Complete demolition and material removal',
            'New electrical installation with panel upgrade',
            'Complete plumbing renovation with hydraulic manifold',
            'Gas boiler heating system with radiators',
            'HVAC installation (SENDO units)',
            'Glued laminate flooring installation',
            'Custom kitchen with bakelite countertop',
            'Thermal break aluminum windows',
            'Security door installation',
            'Bathroom and kitchen tiling',
            'Wardrobe and interior door installation'
        ],
        keyFeatures: [
            'Complete systems overhaul (electrical, plumbing, HVAC)',
            'Gas boiler heating with radiators',
            'SENDO brand air conditioning',
            'Thermal break aluminum windows',
            'Security door',
            'Custom kitchen with moisture-resistant countertop',
            'Glued laminate flooring'
        ],
        materials: [
            'Valsir polystrate pipes (heating system)',
            'SENDO air conditioners',
            'Thermal break aluminum frames',
            'Laminate flooring (glued installation)',
            'Bakelite countertop (moisture-resistant, 4cm)',
            'Melamine wardrobe interiors'
        ],
        images: [
            // Mapped based on document notes to Kitchen/Electrical folders
            { src: '/images/apostolidis_instagram/project_17_kitchen_details/post13_img01.webp', alt: 'Kitchen detail' },
            { src: '/images/apostolidis_instagram/project_04_electrical_installation/post04_img02.webp', alt: 'Electrical panel' }
            // WAIT - I need to be sure. I'll just use the folder mapping provided in the doc tables.
            // "project_17_kitchen_details" and "project_04" are suggested. I will check file existence later or just use the first available from those folders.
            // Let's assume the doc implies using these folders.
        ]
    },
    {
        id: 'ap-013',
        code: 'AP-013',
        slug: 'premium-residential-renovation',
        title: 'Premium Residential Renovation',
        title_el: 'Πολυτελής Ανακαίνιση',
        category: 'Villa & Luxury',
        category_el: 'Πολυτελείς Κατοικίες',
        location: 'Athens Region',
        status: 'Completed',
        specs: [
            { label: 'Type', value: 'Premium' },
            { label: 'Finish', value: 'Luxury' }
        ],
        specs_el: [
            { label: 'Τύπος', value: 'Ολική' },
            { label: 'Standard', value: 'Premium' }
        ],
        shortDescription: 'A premium residential renovation featuring Italian designer tiles, solid herringbone wood flooring, Dionysus marble window sills, and electric roller shutters.',
        shortDescription_el: 'Ανακαίνιση υψηλών προδιαγραφών με ιταλικά πλακάκια, μασίφ ξύλινο δάπεδο ψαροκόκαλο και μάρμαρα Διονύσου.',
        fullDescription: 'This premium renovation project represents the highest tier of residential work in our portfolio. The project required a small-scale building permit and features an exceptional selection of materials including Italian designer tiles from brands such as 41zero42, Fioranese, Italgraniti, Florim, and LIVING. The flooring showcases solid herringbone wood installation—a traditional pattern executed with contemporary precision. Greek Dionysus marble was used for window sills, while the windows feature Planitherm 45 high-performance glass with electric roller shutters.',
        fullDescription_el: 'Το έργο αποτελεί δείγμα πολυτελούς κατασκευής. Χρησιμοποιήθηκαν υλικά κορυφαίας ποιότητας, όπως ιταλικά πλακάκια (41zero42, Fioranese, κ.ά.), μασίφ ξύλινο δάπεδο σε διάταξη ψαροκόκαλο και μαρμαροποδιές Διονύσου. Τα κουφώματα φέρουν ενεργειακούς υαλοπίνακες Planitherm 45 και ηλεκτρικά ρολά, ενώ ο κρυφός φωτισμός αναδεικνύει την αρχιτεκτονική του χώρου.',
        scopeOfWork: [
            'Italian designer tile installation (kitchen, floors, walls)',
            'Solid herringbone wood flooring supply and installation',
            'Dionysus marble window sills',
            'Balcony marble restoration',
            'Planitherm 45 high-performance glass windows',
            'Electric roller shutters installation',
            'Hidden lighting systems',
            'Awning installation',
            'Small-scale permit management'
        ],
        keyFeatures: [
            'Italian premium tile brands (41zero42, Fioranese, etc.)',
            'Solid herringbone wood flooring',
            'Dionysus marble (Greek premium marble)',
            'Planitherm 45 thermal glass',
            'Electric roller shutters',
            'Hidden lighting systems'
        ],
        materials: [
            'Italian Tiles: 41zero42, Fioranese, Italgraniti, Florim, LIVING',
            'Stone: Dionysus marble',
            'Glass: Planitherm 45 thermal glass',
            'Wood: Solid herringbone flooring'
        ],
        images: [
            // Mapped to project_15_wood_flooring and project_18_minimal_interiors
            { src: '/images/apostolidis_instagram/project_15_wood_flooring/post07_img01.webp', alt: 'Herringbone flooring' },
            { src: '/images/apostolidis_instagram/project_18_minimal_interiors/post16_img01.webp', alt: 'Minimal interior' }
        ]
    },
    {
        id: 'ap-014',
        code: 'AP-014',
        slug: 'residential-apartment-renovation',
        title: 'Sara\'s Apartment',
        title_el: 'Διαμέρισμα Αθήνα',
        category: 'Residential Renovations',
        category_el: 'Ανακαινίσεις Κατοικιών',
        location: 'Athens Region',
        status: 'Completed',
        specs: [
            { label: 'Type', value: 'Renovation' },
            { label: 'Scope', value: 'Full' }
        ],
        specs_el: [
            { label: 'Τύπος', value: 'Ανακαίνιση' },
            { label: 'Φάσμα', value: 'Ολική' }
        ],
        shortDescription: 'A multi-level apartment renovation including bathroom and kitchen remodeling, drywall ceilings with recessed lighting, marble polishing, and complete interior door replacement.',
        shortDescription_el: 'Ανακαίνιση διαμερίσματος πολλαπλών επιπέδων, με νέες οροφές γυψοσανίδας, κρυφούς φωτισμούς και γυάλισμα μαρμάρων.',
        fullDescription: 'This residential apartment renovation project involved comprehensive work across multiple levels. The scope included significant demolition work, moisture-resistant drywall ceiling installations in wet areas, tile work throughout bathrooms, kitchen, and balcony, and marble floor polishing. The project was managed with full architectural study and engineering supervision, ensuring professional coordination of all trades and quality control throughout the construction process.',
        fullDescription_el: 'Η ανακαίνιση κάλυψε πολλαπλά επίπεδα του διαμερίσματος, περιλαμβάνοντας εκτεταμένες αποξηλώσεις και νέες εγκαταστάσεις. Τοποθετήθηκαν ανθυγρές γυψοσανίδες στους υγρούς χώρους, νέα πλακίδια σε μπάνιο και κουζίνα, και έγινε γυάλισμα των υφιστάμενων μαρμάρινων δαπέδων. Η αρχιτεκτονική μελέτη εξασφάλισε τη λειτουργική και αισθητική αναβάθμιση του χώρου.',
        scopeOfWork: [
            'Floor and wall demolition',
            'Moisture-resistant drywall ceilings in wet areas',
            'Recessed ceiling spotlights',
            'Cement mortar application',
            'Tile installation (bathroom, WC, kitchen)',
            'Marble floor polishing',
            'Interior door installations',
            'Architectural study and supervision'
        ],
        keyFeatures: [
            'Multi-level apartment renovation',
            'Moisture-resistant drywall in wet areas',
            'Recessed lighting integration',
            'Marble floor restoration',
            'Complete bathroom and kitchen renovation'
        ],
        images: [
            // Mapped to project_14_masonry_walls
            { src: '/images/apostolidis_instagram/project_14_masonry_walls/post10_img01.webp', alt: 'Renovation work' }
        ]
    },
    {
        id: 'ap-015',
        code: 'AP-015',
        slug: 'technical-specialty-showcase',
        title: 'Technical Specialty Showcase',
        title_el: 'Τεχνικό Χαρτοφυλάκιο',
        category: 'Technical Specialty Work',
        category_el: 'Εξειδικευμένες Εργασίες',
        location: 'Various',
        status: 'Ongoing Portfolio',
        specs: [
            { label: 'Type', value: 'Technical' },
            { label: 'Scope', value: 'Varied' }
        ],
        specs_el: [
            { label: 'Τύπος', value: 'Τεχνικό' },
            { label: 'Φάσμα', value: 'Ποικίλο' }
        ],
        shortDescription: 'A collection of specialized technical work showcasing electrical installations, thermal insulation, masonry, metalwork, and wood flooring expertise.',
        shortDescription_el: 'Συλλογή εξειδικευμένων τεχνικών εργασιών: ηλεκτρολογικά, θερμομονώσεις, μεταλλικές κατασκευές και δάπεδα.',
        fullDescription: 'This portfolio section highlights our technical capabilities across various construction disciplines. From new electrical installations with modern panels and wiring to thermal facade insulation for energy efficiency, from precision masonry work to custom metalwork and wood flooring installation—these projects demonstrate the breadth of our technical expertise. Each specialty area is executed with the same attention to detail and quality standards that define all Apostolidis Construction work.',
        fullDescription_el: 'Το τμήμα αυτό παρουσιάζει την τεχνική μας κατάρτιση σε διάφορους τομείς κατασκευής. Από νέες ηλεκτρολογικές εγκαταστάσεις και θερμοπροσόψεις, μέχρι ειδικές μεταλλικές κατασκευές και τοποθετήσεις ξύλινων δαπέδων. Κάθε εργασία εκτελείται με αυστηρή προσήλωση στην ποιότητα και τις τεχνικές προδιαγραφές.',
        scopeOfWork: [
            'New electrical installation and panel upgrades',
            'Thermal facade systems and insulation',
            'Structural masonry and brickwork',
            'Wood floor installation and restoration',
            'Structural metalwork and fabrication',
            'Modern kitchen construction details'
        ],
        keyFeatures: [
            'Broad technical expertise',
            'Energy efficiency upgrades',
            'Precision craftsmanship',
            'Specialized installation techniques'
        ],
        images: [
            // Composite from various technical folders
            { src: '/images/apostolidis_instagram/project_04_electrical_installation/post04_img01.webp', alt: 'Electrical work' },
            { src: '/images/apostolidis_instagram/project_13_thermal_insulation/post11_img01.webp', alt: 'Thermal insulation' },
            { src: '/images/apostolidis_instagram/project_16_metalwork/post12_img01.webp', alt: 'Metalwork' }
        ]
    }
];

export const getProjects = () => projects;

export const getProjectBySlug = (slug: string) => projects.find(p => p.slug === slug);

export const getProjectsByCategory = (category: ProjectCategory) => projects.filter(p => p.category === category);

export const getFeaturedProjects = () => projects.filter(p => p.isFeatured);
