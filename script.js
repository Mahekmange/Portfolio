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
        hamburger.classList.contains('active') ?
            hamburger.querySelectorAll('span')[0].style.transform = 'rotate(45deg) translateY(5px)' :
            hamburger.querySelectorAll('span')[0].style.transform = '';
        hamburger.classList.contains('active') ?
            hamburger.querySelectorAll('span')[2].style.transform = 'rotate(-45deg) translateY(-5px)' :
            hamburger.querySelectorAll('span')[2].style.transform = '';
        hamburger.classList.contains('active') ?
            hamburger.querySelectorAll('span')[1].style.opacity = '0' :
            hamburger.querySelectorAll('span')[1].style.opacity = '';
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
// Navbar background glass morphism
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
// Active section highlight
const navLinksAll = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
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
// Typing effect for terminal
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
// Fade in page for smooth load
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

// ------------ ARTICLE MODAL LOGIC ---------------
const articles = {
  'etl': {
    title: "The ETL Process: A Deep Dive into Modern Data Integration",
    content: `
    <p><strong>Introduction</strong><br>
    In the modern digital era, organizations collect massive amounts of data from websites, mobile apps, sensors, social media, and databases. However, this raw data is often inconsistent, incomplete, and unorganized — making it difficult to use directly for analysis or business decisions.
    <br><br>
    To solve this, companies rely on a powerful process called <strong>ETL – Extract, Transform, and Load</strong>. ETL is the backbone of Data Warehousing and Business Intelligence (BI) systems. It helps convert raw data into clean, structured, and reliable information that supports decision-making and analytics.<br><br>
    <strong>What is ETL?</strong><br>
    Extract: Collect data from different sources such as databases, cloud platforms, APIs, or files.<br>
    Transform: Clean, standardize, and convert data into a uniform and meaningful format.<br>
    Load: Store the transformed data into a centralized repository known as a Data Warehouse.<br>
    This structured process ensures business data remains consistent, accurate, and ready for analysis using tools like Power BI, Tableau, or SQL queries.<br><br>
    <strong>Step 1: Extract – Collecting Data</strong><br>
    Sources include relational databases like MySQL, PostgreSQL, or Oracle; spreadsheets and CSV/JSON files; APIs and web services; cloud applications like Salesforce, AWS, or Google Analytics.<br>
    Example: A retail company may extract sales data from its online store, customer data from its CRM, and campaign performance data from Google Ads to create a combined dataset.<br><br>
    <strong>Step 2: Transform – Cleaning and Preparing Data</strong><br>
    Typical operations: Data Cleaning, Standardization, Integration, Aggregation, Validation.<br>
    Example: If one dataset stores “M” and “F” for gender while another uses “Male” and “Female,” transformation standardizes both into one consistent representation.<br><br>
    <strong>Step 3: Load – Storing Data into the Warehouse</strong><br>
    Loading options: Full Load (all records at once), Incremental Load (only new/updated records).<br>
    After loading, analysts can use visualization tools or queries to generate dashboards and insights.<br><br>
    <strong>Importance of ETL in Business</strong><br>
    - Data Quality: Detects and corrects data errors before analysis.<br>
    - Integration: Combines multiple sources into a unified dataset.<br>
    - Efficiency: Automates repetitive tasks.<br>
    - Consistency: Standardizes formats.<br>
    - Decision-Making: Enables confident, data-driven decisions.<br><br>
    <strong>Popular ETL Tools:</strong><br>
    Informatica PowerCenter, Microsoft SSIS, Talend Open Studio, Apache NiFi, Pentaho DI, AWS Glue.<br><br>
    <strong>Real-World Example</strong><br>
    A bank gathers data from multiple systems in different formats. ETL extracts, transforms, and loads all of it into a centralized warehouse for fraud detection, reports, and analytics.<br><br>
    <strong>Challenges in ETL</strong><br>
    - Handling Big Data<br>
    - Data Security and Privacy<br>
    - Real-Time Needs<br>
    - Error Handling<br>
    - Scalability<br>
    Latest solutions leverage cloud-native and AI-driven ETL, as well as ELT pipelines.<br><br>
    <strong>Future of ETL</strong><br>
    Modern cloud, AI, and streaming technologies are enabling smarter, scalable, and real-time ETL. Serverless and automated ETL platforms are driving data integration trends.<br><br>
    <strong>Conclusion</strong><br>
    ETL is the foundation of Business Intelligence and data-driven organizations. By converting raw data into actionable insights, it ensures efficiency, consistency, and competitive advantage.<br><br>
    <strong>References / Tools:</strong> Microsoft SSIS, Talend, Informatica, Power BI/Tableau, Apache NiFi, AWS Glue.
    `
  }
};

const modal = document.getElementById('article-modal');
const modalTitle = modal.querySelector('#modal-title');
const modalBody = modal.querySelector('.modal-body');
const modalClose = modal.querySelector('.modal-close');

// Open modal when any read-more or card is clicked
document.querySelectorAll('.read-more').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const aid = link.getAttribute('data-article');
    if (articles[aid]) {
      modalTitle.textContent = articles[aid].title;
      modalBody.innerHTML = articles[aid].content;
      modal.style.display = 'flex';
      setTimeout(()=>modal.classList.add('active'), 10);
      modal.focus();
    }
  });
});
document.querySelectorAll('.article-card').forEach(card => {
  card.addEventListener('click', function(e) {
    if(e.target.classList.contains('read-more')) return;
    const aid = card.getAttribute('data-article');
    if (articles[aid]) {
      modalTitle.textContent = articles[aid].title;
      modalBody.innerHTML = articles[aid].content;
      modal.style.display = 'flex';
      setTimeout(()=>modal.classList.add('active'), 10);
      modal.focus();
    }
  });
  card.addEventListener('keydown', function(e) {
    if(e.key==="Enter"||e.key===" "){
      e.preventDefault();
      const aid = card.getAttribute('data-article');
      if (articles[aid]) {
        modalTitle.textContent = articles[aid].title;
        modalBody.innerHTML = articles[aid].content;
        modal.style.display = 'flex';
        setTimeout(()=>modal.classList.add('active'), 10);
        modal.focus();
      }
    }
  });
});
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', function(e){
  if(e.target===modal) closeModal();
});
document.addEventListener('keydown', function(e){
  if (modal.classList.contains('active') && (e.key==="Escape")) closeModal();
});
function closeModal(){
  modal.classList.remove('active');
  setTimeout(()=>modal.style.display="none",330);
}
