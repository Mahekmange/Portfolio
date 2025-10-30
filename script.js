// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => { target.setAttribute('tabindex', '-1'); target.focus(); }, 600);
      }
    });
  });
  
  // Mobile menu toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
      const spans = hamburger.querySelectorAll('span');
      if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(5px)';
        spans[2].style.transform = 'rotate(-45deg) translateY(-5px)';
        spans[1].style.opacity = '0';
      } else {
        spans[0].style.transform = '';
        spans[2].style.transform = '';
        spans[1].style.opacity = '';
      }
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.querySelectorAll('span').forEach(span => span.style.transform = '');
        hamburger.querySelectorAll('span')[1].style.opacity = '';
      });
    });
  }
  
  // Intersection Observer for scroll/reveal animations
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  sections.forEach(section => { observer.observe(section); });
  
  // Navbar background effect on scroll
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
      header.style.background = 'rgba(10, 14, 39, 0.98)';
      header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.18)';
    } else {
      header.style.background = 'rgba(10, 14, 39, 0.74)';
      header.style.boxShadow = 'none';
    }
  });
  
  // Highlights active nav links on scroll
  const navLinksAll = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    navLinksAll.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });
  
  // Typing animation effect in terminal
  const typingText = document.querySelector('.typing-effect');
  if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;
    setTimeout(() => {
      const typeWriter = () => {
        if (i < text.length) {
          typingText.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 47);
        }
      };
      typeWriter();
    }, 1300);
  }
  
  // Page fade-in on load
  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.5s cubic-bezier(0.49,0.22,0.5,0.99)';
      document.body.style.opacity = '1';
    }, 100);
  });
  
  // Keyboard accessibility for hamburger menu
  document.addEventListener('keydown', function(e) {
    if (hamburger && document.activeElement === hamburger && (e.key === "Enter" || e.key === " ")) {
      hamburger.click();
    }
  });
  
  // Article modal data
  const articles = {
    'etl': {
      title: "The ETL Process: A Deep Dive into Modern Data Integration",
      content: `
  <strong>Introduction</strong><br>
  In the modern digital era, organizations collect massive amounts of data from websites, mobile apps, sensors, social media, and databases. However, this raw data is often inconsistent, incomplete, and unorganized—making it difficult to use directly for analysis or business decisions.<br><br>
  To solve this, companies rely on a powerful process called ETL – Extract, Transform, and Load.<br>
  ETL is the backbone of Data Warehousing and Business Intelligence (BI) systems. It helps convert raw data into clean, structured, and reliable information that supports decision-making and analytics.<br><br>
  <strong>What is ETL?</strong><br>
  ETL stands for Extract, Transform, and Load, which are the three main steps involved in data integration and preparation.<br>
  <ul>
  <li><strong>Extract:</strong> Collect data from different sources such as databases, cloud platforms, APIs, or files.</li>
  <li><strong>Transform:</strong> Clean, standardize, and convert data into a uniform and meaningful format.</li>
  <li><strong>Load:</strong> Store the transformed data into a centralized repository known as a Data Warehouse.</li>
  </ul>
  This structured process ensures that business data remains consistent, accurate, and ready for analysis using tools like Power BI, Tableau, or SQL queries.<br><br>
  <strong>Step 1: Extract – Collecting Data</strong><br>
  The extract phase focuses on collecting relevant data from multiple input sources, such as databases, files, APIs, and cloud platforms. During extraction, care must be taken to handle missing values, duplicates, and data corruption.<br>
  <strong>Example:</strong> A retail company may extract sales data from its online store, customer data from its CRM, and campaign data from Google Ads to create a combined dataset.<br><br>
  <strong>Step 2: Transform – Cleaning and Preparing Data</strong><br>
  In this phase, the extracted data is cleaned and prepared.<br>
  <ul>
  <li><strong>Data Cleaning:</strong> Removing duplicates, correcting errors, and handling missing values.</li>
  <li><strong>Data Standardization:</strong> Ensuring all data follows a single format (e.g., dates, currencies).</li>
  <li><strong>Data Integration:</strong> Combining datasets from multiple sources.</li>
  <li><strong>Data Aggregation:</strong> Summarizing large datasets.</li>
  <li><strong>Data Validation:</strong> Checking data against business rules.</li>
  </ul>
  <strong>Example:</strong> If one dataset uses “M” and “F” while another uses “Male” and “Female,” transformation standardizes these to a consistent format.<br><br>
  <strong>Step 3: Load – Storing Data into the Warehouse</strong><br>
  The transformed data is loaded into a data warehouse. Loading can be performed as a full load (all data at once) or incremental load (only new or updated records). After loading, business analysts can visualize and analyze the data.<br><br>
  <strong>Importance of ETL in Business</strong><br>
  <ul>
  <li><strong>Data Quality:</strong> Detects and corrects data errors before analysis.</li>
  <li><strong>Integration:</strong> Combines multiple data sources.</li>
  <li><strong>Efficiency:</strong> Automates repetitive tasks.</li>
  <li><strong>Consistency:</strong> Standardizes data formats.</li>
  <li><strong>Decision-Making:</strong> Provides clean, accurate data for analytics.</li>
  </ul>
  <strong>Popular ETL Tools and Technologies</strong><br>
  <ul>
  <li>Informatica PowerCenter</li>
  <li>Microsoft SSIS</li>
  <li>Talend Open Studio</li>
  <li>Apache NiFi</li>
  <li>Pentaho Data Integration</li>
  <li>AWS Glue</li>
  </ul>
  <strong>Real-World Example</strong><br>
  A bank combines data from credit cards, ATMs, apps, and loans. ETL extracts, transforms, and loads all of it into a central warehouse for analysis, fraud detection, and reporting.<br><br>
  <strong>Challenges in ETL</strong><br>
  <ul>
  <li>Handling Big Data efficiently</li>
  <li>Data Security during transfer</li>
  <li>Real-Time updates requirements</li>
  <li>Error Handling</li>
  <li>Scalability</li>
  </ul>
  <strong>Future of ETL</strong><br>
  ETL is evolving with cloud-native, AI-driven, and real-time streaming technologies, making data movement faster and smarter.<br><br>
  <strong>Conclusion</strong><br>
  ETL is the key to transforming raw information into actionable insights, enabling efficient and reliable data-driven decision making.<br>
  `
    },
    'ai-cybercrime': {
      title: "Role of Artificial Intelligence in Cyber Crime Investigation",
      content: `
  <strong>Introduction</strong><br>
  In the modern digital era, cybercrimes have grown into one of the most critical global security concerns. Traditional methods can't keep up with complex attacks. Artificial Intelligence (AI) is now revolutionizing how digital evidence is collected, analyzed, and interpreted in cybercrime investigations and digital forensics.<br><br>
  <strong>Understanding Artificial Intelligence in Cyber Forensics</strong><br>
  AI refers to machines performing tasks that require human intelligence. In cyber forensics, AI automates evidence analysis, identifies hidden links between cyber incidents, and quickly processes large volumes of digital data.<br>
  AI uses machine learning and deep learning to learn from past cyber incidents.<br>
  <strong>Example:</strong> AI can scan thousands of logs, emails, or images in seconds—much faster than a human.<br><br>
  <strong>Need for AI in Cyber Crime Investigation</strong><br>
  <ul>
  <li>Huge Data Volumes: AI automates data sorting and analysis.</li>
  <li>Complex Attack Patterns: AI spots correlations people can't see.</li>
  <li>Real-Time Detection: AI can alert in real time to stop threats quickly.</li>
  <li>Speed and Accuracy: AI reduces errors and speeds up investigations.</li>
  </ul>
  <strong>Applications of AI in Cyber Crime Investigation</strong>
  <ol>
  <li><strong>Automated Log Analysis:</strong> Flags unusual access or activity.</li>
  <li><strong>Malware and Ransomware Detection:</strong> Finds new malware by analyzing code and behavior.</li>
  <li><strong>Digital Evidence Processing:</strong> Collects and sorts data from many devices automatically.</li>
  <li><strong>Image and Video Analysis:</strong> Uses facial/object recognition to link suspects to crimes.</li>
  <li><strong>Predictive Analysis:</strong> Predicts future threats and criminal behavior.</li>
  <li><strong>Social Media and Dark Web Monitoring:</strong> AI crawlers find illegal activities online.</li>
  <li><strong>Incident Correlation:</strong> Finds connections between separate incidents.</li>
  </ol>
  <strong>Real-Life Examples</strong><br>
  - IBM Watson, Darktrace for live attack analysis<br>
  - XRY, Magnet AXIOM for mobile forensics<br>
  - AI-powered facial recognition for law enforcement<br><br>
  <strong>Benefits</strong>
  <ul>
  <li>Speed and Efficiency</li>
  <li>Enhanced Accuracy</li>
  <li>Proactive Security</li>
  <li>Better Resource Utilization</li>
  <li>Comprehensive Analysis</li>
  </ul>
  <strong>Challenges</strong>
  <ul>
  <li>Data Privacy</li>
  <li>Adversarial Attacks</li>
  <li>High Cost/Complexity</li>
  <li>Legal & Ethical issues</li>
  <li>Dependence on Quality Data</li>
  </ul>
  <strong>Future of AI in Cybercrime Investigation</strong><br>
  Self-learning forensic systems, Blockchain for tamper-proof evidence, and Quantum computing for instant analysis are on the horizon.<br><br>
  <strong>Conclusion</strong><br>
  Artificial Intelligence is transforming cybercrime investigation and digital forensics—enabling faster detection, accurate analysis, and proactive cyber defense. The future is collaborative: human and artificial intelligence working together to fight cyber threats.
  `
    },
    'fa-text-search': {
      title: "Applications of Finite Automata in Text Search and Pattern Matching",
      content: `
  <strong>Introduction</strong><br>
  Efficient text searching and pattern matching are essential for search engines, spell checkers, DNA sequencing, and compiler design. Finite Automata (FA) are powerful mathematical models for representing and processing patterns in text.<br><br>
  <strong>Understanding Finite Automata</strong><br>
  FA is a mathematical model used to simulate sequential logic and recognize patterns.<br>
  Formally, M = (Q, Σ, δ, q₀, F) where:<br>
  Q = States, Σ = Input symbols, δ = transitions, q₀ = start, F = accepting states.<br>
  If input leads to an accepting state, the pattern matches.<br><br>
  <strong>Types</strong>
  <ul>
  <li><strong>DFA:</strong> One output per state and input. Deterministic.</li>
  <li><strong>NFA:</strong> Multiple outputs possible. Simpler to design, but equivalent to DFA in power.</li>
  </ul>
  <strong>Connection with Graph Theory</strong><br>
  States = nodes, transitions = edges. Graph algorithms help analyze automata.<br><br>
  <strong>Pattern Matching and Text Search</strong><br>
  FAs process text linearly, scanning one character at a time, matching efficiently.<br>
  <ul>
  <li>Used in Knuth–Morris–Pratt, Rabin–Karp, Aho–Corasick algorithms</li>
  </ul>
  <strong>Applications</strong>
  <ul>
  <li>Search engines (fast query matching)</li>
  <li>Spam and malware filtering</li>
  <li>DNA sequence analysis</li>
  <li>Compiler design (lexical analysis, token recognition)</li>
  <li>Regex in text editors</li>
  <li>Intrusion detection systems</li>
  </ul>
  <strong>Importance</strong>
  <ul>
  <li>Foundation for language processing & parsers</li>
  <li>Efficient algorithm inspiration (KMP, regex)</li>
  <li>Modeling and verification of systems (protocols, traffic lights)</li>
  <li>Abstract problem simplification</li>
  </ul>
  <strong>Conclusion</strong><br>
  Finite Automata facilitate efficient pattern matching for search, security, and more—bridging the gap between theory and practical text/data processing applications in CS.
  `
    },
    'ai-cybersecurity': {
      title: "Applications of Artificial Intelligence (AI) in Cyber Security",
      content: `
  <strong>Introduction</strong><br>
  Cyber threats are growing faster than ever. Traditional defense is not enough—AI is the game-changer for real-time detection, analyzing large data, and thwarting sophisticated attacks.<br><br>
  <strong>Understanding AI in Cybersecurity</strong><br>
  AI refers to computer systems performing tasks that normally require human intelligence, like learning or reasoning. In cybersecurity, AI systems analyze network traffic, system logs, and user behavior for anomalies.<br>
  <strong>Why AI?</strong>
  <ul>
  <li>Massive Data Volume</li>
  <li>Rapid attack speed (ransomware spreads in seconds)</li>
  <li>Evolving threats (malware changes daily)</li>
  <li>Human limitation: Not possible to review every event manually</li>
  </ul>
  <strong>Key Applications</strong>
  <ol>
  <li><strong>Threat Detection & Prevention:</strong> IDS powered by AI for real-time monitoring; compares activity against known attack patterns.</li>
  <li><strong>Malware & Phishing Detection:</strong> AI spots malware/phishing in code, email, or websites before humans notice.</li>
  <li><strong>Behavioral Analysis:</strong> User & entity analytics for abnormal activity detection.</li>
  <li><strong>Security Automation & Incident Response:</strong> AI automates repetitive security tasks, even isolating infected systems.</li>
  <li><strong>Predictive Threat Intelligence:</strong> Predicts attacks by analyzing global threat data and vulnerabilities.</li>
  <li><strong>Fraud Detection:</strong> ML models flag suspicious transactions in banking/e-commerce.</li>
  </ol>
  <strong>Real-World Examples</strong><br>
  <ul>
  <li>IBM Watson for Cybersecurity (analyzes threat data for attacks)</li>
  <li>Darktrace (self-learning, real-time threat response)</li>
  <li>Google & Microsoft (AI-powered filters for phishing, spam, account takeover)</li>
  </ul>
  <strong>Benefits</strong>
  <ul>
  <li>Faster detection and response</li>
  <li>Reduces human error</li>
  <li>Continuous learning and adaptation</li>
  <li>Cost-effective</li>
  <li>Greater accuracy (fewer false positives)</li>
  </ul>
  <strong>Challenges</strong>
  <ul>
  <li>High implementation cost</li>
  <li>Adversarial attacks (poisoning AI with false data)</li>
  <li>Data privacy challenges</li>
  <li>Lack of skilled experts</li>
  <li>Risks of overdependence on automation</li>
  </ul>
  <strong>Future</strong><br>
  AI will power adaptive, self-defending networks—detecting, analyzing, and responding to threats automatically, integrated with blockchain, quantum, and advanced NLP.<br><br>
  <strong>Conclusion</strong><br>
  AI is revolutionizing cybersecurity: smarter, faster, and more adaptive defenses. Best results come from combining AI power and human expertise!
  `
    },
    'ooad': {
      title: "Object-Oriented Analysis and Design (OOAD): A Modern Approach to Software Development",
      content: `
  <strong>Introduction</strong><br>
  Modern software systems need to be reliable and maintainable; procedural methods fall short as complexity grows. Object-Oriented Analysis and Design (OOAD) models software around real-world objects, making systems more modular and easier to manage.<br><br>
  <strong>What is OOAD?</strong><br>
  <ul>
  <li><strong>OOA</strong> (Object-Oriented Analysis): Identifies objects and responsibilities (What needs to be done)</li>
  <li><strong>OOD</strong> (Design): Defines software classes and their relationships (How to do it)</li>
  </ul>
  <strong>Key Concepts</strong>
  <ul>
  <li><strong>Class & object:</strong> Data + behavior in one unit</li>
  <li><strong>Encapsulation:</strong> Data protection by bundling</li>
  <li><strong>Inheritance:</strong> Reuse properties/methods</li>
  <li><strong>Polymorphism:</strong> Functions behave differently for different classes</li>
  <li><strong>Abstraction:</strong> Only essential details, hiding complexity</li>
  </ul>
  <strong>Process Steps</strong>
  <ol>
  <li>Requirements Gathering and Analysis</li>
  <li>Object Identification</li>
  <li>Class/Relationship Modeling (association, inheritance)</li>
  <li>Use Case Modeling</li>
  <li>Design Modeling using UML (Class, Use Case, Sequence diagrams)</li>
  <li>Implementation</li>
  <li>Testing and Maintenance</li>
  </ol>
  <strong>Real-World Applications</strong>
  <ul>
  <li>Banking systems</li>
  <li>E-commerce platforms</li>
  <li>Healthcare management</li>
  <li>Social media apps</li>
  <li>Game development</li>
  </ul>
  <strong>Importance in CS & IT</strong>
  <ul>
  <li>Improves software quality, collaboration, and maintainability</li>
  <li>Supports project management, cost/time reduction, Agile methods</li>
  </ul>
  <strong>Conclusion</strong><br>
  OOAD bridges requirements and technical design, enabling robust, scalable, and maintainable systems—essential for CS education and the modern IT industry.
  `
    },
    
   'vedic-maths': {
  title: "The Indian Origins of Trigonometry: From Jya and Kojya to Modern Sine and Cosine",
  content: `
  <strong>🧭 The Indian Origins of Trigonometry: From Jya and Kojya to Modern Sine and Cosine</strong><br><br>
  <strong>🌅 Introduction</strong><br>
  Trigonometry is the mathematical study of the relationships between the sides and angles of triangles. It forms the backbone of many modern applications such as navigation, architecture, astronomy, and engineering. However, few people realize that the roots of trigonometry stretch deep into ancient Indian civilization, long before Greek or European mathematics evolved.
  <br>
  Indian scholars like Aryabhata, Bhaskara, and Madhava laid the foundation of what we now call trigonometric ratios and functions, using ancient Sanskrit terms such as Jya (sine) and Kojya (cosine). The development of trigonometry in ancient India shows not only the mathematical brilliance of our ancestors but also their ability to connect science, spirituality, and daily life.
  <br><br>
  <strong>📜 Geometry and Trigonometry in Ancient Bharat</strong><br>
  The Sulbha Sutras (around 800 BCE), part of the Vedic texts, are among the earliest known records of geometry and trigonometry. These sutras were written by scholars like Baudhayana, Apastamba, and Katyayana.<br>
  They described how to construct Vedic altars (yajna vedis) of different shapes — square, circular, or rectangular — using precise geometric and trigonometric principles.<br>
  One remarkable discovery in the Sulbha Sutras is a statement equivalent to the Pythagoras theorem, written centuries before Pythagoras himself. It says:<br>
  <em>The diagonal of a rectangle produces both areas which the two sides produce separately.</em><br>
  This clearly represents the formula:<br>
  <span style="background:#181a2a;border-radius:4px;padding:2px 7px;display:inline-block;"><strong>a² + b² = c²</strong></span><br>
  Such geometric understanding later evolved into the early forms of trigonometric thinking.<br><br>
  <strong>📘 Evolution of Jya and Kojya</strong><br>
  Around 500 CE, the Indian mathematician and astronomer Aryabhata introduced the concepts of Jya (sine) and Kojya (cosine) in his text Aryabhatiya.<br>
  He used these to calculate distances and angles of celestial bodies. Jya (Sine): It represents the half-chord of a circle corresponding to a certain angle. Kojya (Cosine): It is the sine of the complementary angle (90° − θ).<br>
  Aryabhata prepared detailed sine tables for every 3.75° interval — a pioneering work in mathematical computation.<br>
  Later, mathematicians such as Bhaskara I (7th century) and Bhaskara II (12th century) refined these calculations and developed new relations between trigonometric functions.<br><br>
  <strong>🧮 Madhava and the Infinite Series</strong><br>
  Centuries later, Madhava of Sangamagrama (14th century) from the Kerala School of Mathematics made revolutionary discoveries.<br>
  He was the first mathematician in the world to define infinite series expansions for sine, cosine, and tangent functions — almost 250 years before Newton and Leibniz developed calculus.<br>
  Madhava’s series for sine is represented as:<br>
  <span style="background:#181a2a;border-radius:4px;padding:2px 7px;display:inline-block;">
    <strong>
      sin x = x - x³/3! + x⁵/5! - x⁷/7! + ...
    </strong>
  </span><br>
  This is the same formula taught in modern trigonometry today!<br>
  His school continued developing trigonometric tables with high accuracy for astronomical calculations.<br><br>
  <strong>🛕 Applications of Trigonometry in Ancient India</strong><br>
  Trigonometry was not a purely academic subject in ancient India — it was a practical science applied in various fields:
  <br>
  <strong>Astronomy:</strong> Indian astronomers used Jya and Kojya to predict solar and lunar eclipses, planetary positions, and the length of days. Works like Surya Siddhanta used these principles to compute celestial orbits.<br>
  <strong>Architecture and Temple Design:</strong> Geometric concepts were used to design temple towers, pillars, and domes.<br>
  <strong>Navigation and Calendar Making:</strong> Ancient navigators and timekeepers used trigonometric methods to measure distances, directions, and seasonal cycles.<br>
  These applications show how mathematics was deeply interwoven with Indian culture, religion, and science.<br><br>
  <strong>🌍 Journey of Indian Trigonometry to the World</strong><br>
  When Indian works like Aryabhatiya and Surya Siddhanta were translated into Arabic during the Islamic Golden Age, the Sanskrit word “Jya” was translated to “jiba”.<br>
  Later, this became “jaib”, which in Latin meant fold or curve — translated by European scholars as “sinus”, giving rise to the modern term “sine”.<br>
  Similarly, the complementary function Kojya became cosine.<br><br>
  <strong>🪔 Legacy and Importance</strong><br>
  The trigonometric work done by Indian scholars represents one of the earliest and most advanced mathematical traditions in the world. Their research laid the foundation for future developments in:
  <ul>
    <li>Astronomy and space science</li>
    <li>Navigation and mapping</li>
    <li>Architecture and engineering</li>
    <li>Modern trigonometric computation</li>
  </ul>
  Even today, the Indian approach to mathematics — blending logic, creativity, and spirituality — continues to inspire learners and researchers globally.<br><br>
  <strong>💡 Conclusion</strong><br>
  The journey from Jya and Kojya to Sine and Cosine is a story of intellectual brilliance and cultural pride.<br>
  It shows how Indian scholars centuries ago understood the patterns of nature through mathematical reasoning.<br>
  Their discoveries prove that India was not just a follower, but a pioneer of mathematical thought.<br>
  Recognizing their work helps us appreciate how ancient wisdom shaped modern science — and reminds us that the roots of trigonometry are truly Bharatiya (Indian).<br><br>
  <strong>✨ Summary</strong><br>
  <ul>
    <li>Trigonometry in India began with Sulbha Sutras for altar construction.</li>
    <li>Aryabhata introduced Jya (sine) and Kojya (cosine) for astronomy.</li>
    <li>Bhaskara and Madhava refined these concepts and created trigonometric series.</li>
    <li>These ideas later reached Europe through Arabic translations.</li>
    <li>Ancient Indian trigonometry influenced modern math, science, and architecture.</li>
  </ul>
  `
}

    
  };
  
  const modal = document.getElementById('article-modal');
  const modalTitle = modal.querySelector('#modal-title');
  const modalBody = modal.querySelector('.modal-body');
  const modalClose = modal.querySelector('.modal-close');
  
  // Function to open modal and display article
  function openModalArticle(aid) {
    if (articles[aid]) {
      modalTitle.textContent = articles[aid].title;
      modalBody.innerHTML = articles[aid].content;
      modal.style.display = 'flex';
      setTimeout(() => modal.classList.add('active'), 10);
      modal.focus();
    }
  }
  
  // Open modal when any read-more or card is clicked
  document.querySelectorAll('.read-more').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const aid = this.getAttribute('data-article');
      openModalArticle(aid);
    });
  });
  document.querySelectorAll('.article-card').forEach(card => {
    card.addEventListener('click', function(e) {
      if(e.target.classList.contains('read-more')) return;
      const aid = this.getAttribute('data-article');
      openModalArticle(aid);
    });
    card.addEventListener('keydown', function(e) {
      if(e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const aid = this.getAttribute('data-article');
        openModalArticle(aid);
      }
    });
  });
  
  // Close modal handlers
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e){
    if(e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function(e){
    if (modal.classList.contains('active') && e.key === "Escape") closeModal();
  });
  function closeModal() {
    modal.classList.remove('active');
    setTimeout(() => { modal.style.display = "none"; }, 330);
  }
  
