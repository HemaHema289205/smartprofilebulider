/**
 * Portfolio Builder Logic
 */

let portfolioData = {
    name: "Hema Kota Nagu",
    intro: "AI & Data Science Enthusiast",
    bio: "I'm passionate about applying Artificial Intelligence and Data Science to create practical, user-friendly solutions that address real-world challenges. Currently pursuing my Bachelor's degree in Computer Science Engineering with specialization in AI & Data Science.",
    skills: "Python, C, HTML, CSS, JavaScript, PHP, Pandas, Scikit-learn, Matplotlib, Seaborn, VS Code, PyCharm, Jupyter, Power BI, Google Colab, Streamlit, Flask",
    github: "https://github.com/HemaHema289205",
    linkedin: "https://www.linkedin.com/in/hema-302172316",
    email: "gudimetlahemakotanagu@gmail.com",
    phone: "7569351282",
    education: [
        { school: "Ramachandra College of Engineering, Vatluru", degree: "Bachelor of Technology", date: "Expected 2027", details: "Computer Science and Engineering - AI & Data Science" },
        { school: "Hunar Intern (AICTE Certified)", degree: "Data Science Intern", date: "May 2025 - June 2025", details: "Completed comprehensive data science internship with hands-on projects and industry exposure." },
        { school: "Ch.S.D.St. Theresa's College, Eluru", degree: "Intermediate (12th Grade)", date: "2021 - 2023", details: "" },
        { school: "St. Theresa's Girls High School, Eluru", degree: "SSC (10th Grade)", date: "2020 - 2021", details: "" }
    ],
    certifications: [
        { title: "Oracle Cloud Infrastructure", desc: "AI Foundations Associate", icon: "fas fa-award" },
        { title: "Coursera", desc: "C for Everyone: Programming Fundamentals", icon: "fas fa-graduation-cap" },
        { title: "Python Certifications", desc: "CodeNow (ELITE+SILVER), Tutedude, HackerRank", icon: "fab fa-python" },
        { title: "Technical Workshops", desc: "Power BI (5 days), Full Stack Development, AI Tools & ChatGPT", icon: "fas fa-tools" },
        { title: "GenAI & Data Science", desc: "Innomatics Platform", icon: "fas fa-robot" }
    ],
    projects: [
        { title: "Pipeline Vendor Management Portal", duration: "1 Month", desc: "A comprehensive web application designed to track daily work and bills for a ₹13 crore pipeline project. The platform enables contractors to efficiently manage vendor details, pipe records, and payments through an intuitive, interactive interface.", tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"], link: "#" },
        { title: "Heart Disease Prediction", duration: "3 Weeks", desc: "An advanced machine learning model that predicts heart disease risk using comprehensive patient health data. The system provides accurate risk assessment to aid in early detection and prevention strategies.", tags: ["Python", "Pandas", "Scikit-learn", "Matplotlib", "Seaborn"], link: "#" },
        { title: "Hangman Game", duration: "2 Weeks", desc: "An interactive command-line word guessing game featuring engaging prompts and intelligent game logic. The application demonstrates solid programming fundamentals and user experience design.", tags: ["Python", "Streamlit"], link: "#" }
    ],
    profileImg: null,
    model: 'modern-gradient',
    theme: { c1: '#6366f1', c2: '#a855f7' }
};

let currentStep = 1;

// Handle initial upload
function handleMainUpload(input) {
    if (input.files && input.files[0]) {
        // Mocking extraction transition
        const btn = input.parentElement.querySelector('button');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Extracting Data...';

        setTimeout(() => {
            // Fill form with mock data
            document.getElementById('p-intro').value = portfolioData.intro;
            document.getElementById('p-bio').value = portfolioData.bio;
            document.getElementById('p-skills').value = portfolioData.skills;
            document.getElementById('p-github').value = portfolioData.github;
            document.getElementById('p-linkedin').value = portfolioData.linkedin;
            document.getElementById('p-email').value = portfolioData.email;
            document.getElementById('p-phone').value = portfolioData.phone;

            renderEducation();
            renderCertifications();
            renderProjects();

            // Switch view
            document.getElementById('initial-upload-step').style.display = 'none';
            document.getElementById('builder-dashboard').style.display = 'block';
            document.getElementById('final-preview-btn').style.display = 'block';

            // Initialize clickable steps
            document.querySelectorAll('.step').forEach(step => {
                step.style.cursor = 'pointer';
                const targetStep = parseInt(step.dataset.step);
                step.onclick = () => goToStep(targetStep);
            });
        }, 1500);
    }
}

function renderEducation() {
    const container = document.getElementById('p-edu-container');
    container.innerHTML = portfolioData.education.map((edu, index) => `
        <div class="item-card">
            <div class="item-header">
                <span>Education #${index + 1}</span>
                <button class="btn-delete" onclick="removeEdu(${index})"><i class="fas fa-trash"></i></button>
            </div>
            <div class="grid-form">
                <div class="form-group"><label>School</label><input type="text" value="${edu.school}" onchange="updateEdu(${index}, 'school', this.value)"></div>
                <div class="form-group"><label>Degree</label><input type="text" value="${edu.degree}" onchange="updateEdu(${index}, 'degree', this.value)"></div>
            </div>
        </div>
    `).join('');
}

function renderCertifications() {
    const container = document.getElementById('p-cert-container');
    container.innerHTML = portfolioData.certifications.map((cert, index) => `
        <div class="item-card">
            <div class="item-header">
                <span>Certification #${index + 1}</span>
                <button class="btn-delete" onclick="removeCert(${index})"><i class="fas fa-trash"></i></button>
            </div>
            <div class="grid-form">
                <div class="form-group"><label>Title</label><input type="text" value="${cert.title}" onchange="updateCert(${index}, 'title', this.value)"></div>
                <div class="form-group"><label>Details</label><input type="text" value="${cert.desc}" onchange="updateCert(${index}, 'desc', this.value)"></div>
            </div>
        </div>
    `).join('');
}

function renderProjects() {
    const container = document.getElementById('p-projects-container');
    container.innerHTML = portfolioData.projects.map((proj, index) => `
        <div class="item-card">
            <div class="item-header">
                <span>Project #${index + 1}</span>
                <button class="btn-delete" onclick="removeProj(${index})"><i class="fas fa-trash"></i></button>
            </div>
            <div class="grid-form">
                <div class="form-group"><label>Title</label><input type="text" class="input-p-title" value="${proj.title}"></div>
                <div class="form-group"><label>Duration</label><input type="text" class="input-p-duration" value="${proj.duration || '2 Weeks'}"></div>
                <div class="form-group"><label>Link</label><input type="text" class="input-p-link" value="${proj.link}"></div>
                <div class="form-group full-width"><label>Description</label><textarea class="input-p-desc">${proj.desc}</textarea></div>
            </div>
        </div>
    `).join('');
}

function addEdu() {
    portfolioData.education.push({ school: "", degree: "", date: "", details: "" });
    renderEducation();
}

function removeEdu(index) {
    portfolioData.education.splice(index, 1);
    renderEducation();
}

function addCert() {
    portfolioData.certifications.push({ title: "", desc: "", icon: "fas fa-award" });
    renderCertifications();
}

function removeCert(index) {
    portfolioData.certifications.splice(index, 1);
    renderCertifications();
}

function addProject() {
    portfolioData.projects.push({ title: "", duration: "", desc: "", tags: [], link: "" });
    renderProjects();
}

function removeProj(index) {
    portfolioData.projects.splice(index, 1);
    renderProjects();
}

function previewImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            portfolioData.profileImg = e.target.result;
            document.getElementById('photo-preview-box').innerHTML = `<img src="${e.target.result}">`;
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function goToStep(step) {
    currentStep = step;
    document.querySelectorAll('.step-content-area').forEach(el => el.classList.remove('active'));
    document.getElementById(`step-${step}-content`).classList.add('active');

    document.querySelectorAll('.step').forEach(el => {
        el.classList.remove('active');
        if (parseInt(el.dataset.step) <= step) el.classList.add('active');
    });

    // Update navbar back button visibility
    const backBtn = document.getElementById('nav-back-btn');
    if (backBtn) {
        backBtn.style.display = step > 1 ? 'flex' : 'none';
    }

    if (step === 1) {
        setTimeout(initScrollSpy, 100);
    }

    window.scrollTo(0, 0);
}

function initScrollSpy() {
    const sections = document.querySelectorAll('.editor-area .form-section');
    const navLinks = document.querySelectorAll('.section-nav a');

    window.onscroll = () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };
}

function builderBack() {
    if (currentStep > 1) {
        goToStep(currentStep - 1);
    }
}

// Design Card Selection removed as requested

// Theme Card Selection
document.querySelectorAll('.theme-card').forEach(card => {
    card.addEventListener('click', function () {
        document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        const themeStyles = window.getComputedStyle(this).getPropertyValue('--theme-col');
        // Extract colors from linear-gradient(135deg, color1, color2)
        const colors = themeStyles.match(/#(?:[0-9a-fA-F]{3,6})/g);
        if (colors && colors.length >= 2) {
            portfolioData.theme.c1 = colors[0];
            portfolioData.theme.c2 = colors[1];
        }
    });
});

// Design Tab Switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = function () {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.design-grid').forEach(g => g.classList.remove('active'));
        this.classList.add('active');
        document.getElementById(`${this.dataset.tab}-grid`).classList.add('active');
    }
});

function openLivePreview() {
    const modal = document.getElementById('live-portfolio-modal');
    const iframe = document.getElementById('portfolio-frame');
    const html = generateFullPortfolioHTML();
    iframe.srcdoc = html;
    modal.style.display = 'flex';
}

function generateFullPortfolioHTML() {
    // Helper to ensure links are absolute
    const fixUrl = (u) => {
        if (!u) return '#';
        if (u.startsWith('http') || u.startsWith('mailto:') || u.startsWith('tel:')) return u;
        return 'https://' + u;
    };

    const data = {
        name: portfolioData.name,
        intro: document.getElementById('p-intro').value,
        bio: document.getElementById('p-bio').value,
        skills: document.getElementById('p-skills').value.split(',').map(s => s.trim()),
        github: fixUrl(document.getElementById('p-github').value),
        linkedin: fixUrl(document.getElementById('p-linkedin').value),
        email: document.getElementById('p-email').value,
        phone: document.getElementById('p-phone').value,
        img: portfolioData.profileImg,
        c1: portfolioData.theme.c1,
        c2: portfolioData.theme.c2
    };

    const eduItems = portfolioData.education;
    const projectCards = document.querySelectorAll('#p-projects-container .item-card');
    const projects = Array.from(projectCards).map(card => ({
        title: card.querySelector('.input-p-title').value,
        duration: card.querySelector('.input-p-duration').value,
        link: fixUrl(card.querySelector('.input-p-link').value),
        desc: card.querySelector('.input-p-desc').value
    }));

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>${data.name} | Portfolio</title>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <style>
            :root { --p1: ${data.c1}; --p2: ${data.c2}; }
            * { box-sizing: border-box; }
            body { margin: 0; font-family: 'Outfit', sans-serif; background: #fdfdff; color: #333; overflow-x: hidden; scroll-behavior: smooth; }
            
            header { background: linear-gradient(135deg, var(--p1), var(--p2)); padding: 1.2rem 8%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 1000; }
            .logo { color: #fff; font-size: 1.6rem; font-weight: 700; }
            nav a { color: rgba(255,255,255,0.9); text-decoration: none; margin-left: 25px; font-weight: 500; font-size: 0.95rem; transition: 0.3s; }
            nav a:hover { color: #fff; }
            
            .hero { height: 90vh; background: linear-gradient(135deg, var(--p1), var(--p2)); display: flex; flex-direction: column; justify-content: center; align-items: center; color: white; text-align: center; position: relative; }
            .hero h1 { font-size: 4.5rem; font-weight: 700; margin: 0; letter-spacing: -1px; }
            .hero p { font-size: 1.6rem; opacity: 0.9; margin: 15px 0 35px; }
            .hero .btn { background: white; color: var(--p1); padding: 15px 40px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 1.1rem; box-shadow: 0 10px 20px rgba(0,0,0,0.1); transition: 0.3s; }
            .hero .btn:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(0,0,0,0.2); background: #f8f9ff; }

            section { padding: 6rem 8%; }
            .section-title { text-align: center; font-size: 2.8rem; font-weight: 700; margin-bottom: 4rem; position: relative; }
            .section-title::after { content: ""; display: block; width: 50px; height: 4px; background: linear-gradient(90deg, var(--p1), var(--p2)); margin: 12px auto; border-radius: 10px; }

            /* About Section */
            .about-grid { display: grid; grid-template-columns: 380px 1fr; gap: 5rem; align-items: flex-start; }
            .profile-card { background: white; border-radius: 30px; padding: 3rem 2rem; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.08); text-align: center; position: relative; }
            .avatar-box { width: 160px; height: 160px; border-radius: 100px; margin: 0 auto 2rem; background: linear-gradient(135deg, var(--p1), var(--p2)); overflow: hidden; display: flex; align-items: center; justify-content: center; color: white; font-size: 3.5rem; font-weight: 700; border: 4px solid white; box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
            .avatar-box img { width: 100%; height: 100%; object-fit: cover; }
            .p-name { font-size: 1.5rem; font-weight: 700; color: #1a202c; margin-bottom: 0.5rem; }
            .p-role { color: #4a5568; font-size: 0.95rem; margin-bottom: 1.5rem; }
            .contact-info { text-align: left; max-width: 250px; margin: 0 auto; }
            .contact-item { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; font-size: 0.9rem; color: #4a5568; }
            .contact-item i { color: var(--p1); width: 20px; text-align: center; }
            .social-links { display: flex; justify-content: center; gap: 15px; margin-top: 2rem; }
            .social-btn { width: 45px; height: 45px; border-radius: 50px; background: #eee; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; transition: 0.3s; }
            .social-btn.li { background: var(--p1); }
            .social-btn.gh { background: var(--p2); }
            .social-btn:hover { transform: translateY(-3px); filter: brightness(1.1); }
            .bio-text { line-height: 1.8; color: #4a5568; font-size: 1.15rem; }

            /* Skills Section */
            .skills-sections { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; }
            .skill-card { background: white; border-radius: 20px; padding: 2.5rem; box-shadow: 0 15px 30px rgba(0,0,0,0.05); position: relative; overflow: hidden; transition: 0.3s; }
            .skill-card::before { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 5px; background: linear-gradient(90deg, var(--p1), var(--p2)); }
            .skill-card h3 { font-size: 1.2rem; margin-bottom: 2rem; color: #1a202c; }
            .skill-list { display: flex; flex-wrap: wrap; gap: 0.8rem; }
            .skill-badge { background: #f0f4ff; color: var(--p1); padding: 8px 18px; border-radius: 20px; font-size: 0.85rem; font-weight: 600; border: 1px solid rgba(0,0,0,0.03); }

            /* Projects Section */
            .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2.5rem; }
            .project-card { background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.07); transition: 0.3s; display: flex; flex-direction: column; }
            .project-card:hover { transform: translateY(-10px); }
            .p-thumb { height: 150px; background: linear-gradient(135deg, var(--p1), var(--p2)); padding: 2rem; color: white; }
            .p-thumb h3 { font-size: 1.3rem; margin: 0; }
            .p-duration { font-size: 0.85rem; opacity: 0.9; margin-top: 5px; display: block; }
            .p-content { padding: 2.5rem; flex: 1; display: flex; flex-direction: column; }
            .p-desc { line-height: 1.6; color: #4a5568; font-size: 0.95rem; margin-bottom: 2rem; }
            .p-tags { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 2.5rem; }
            .p-tag { background: #f0f4ff; color: var(--p1); padding: 4px 12px; border-radius: 15px; font-size: 0.75rem; font-weight: 600; }
            .p-btn { background: var(--p1); color: white; padding: 12px 25px; border-radius: 50px; text-decoration: none; font-weight: 600; align-self: flex-start; transition: 0.3s; }
            .p-btn:hover { background: var(--p2); transform: translateX(5px); }

            /* Education Section */
            .edu-timeline { max-width: 900px; margin: 0 auto; position: relative; padding-left: 45px; border-left: 3px solid #e2e8f0; }
            .timeline-item { position: relative; margin-bottom: 2.5rem; background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #f8fafc; }
            .timeline-item::before { content: ""; position: absolute; left: -54px; top: 30px; width: 15px; height: 15px; border-radius: 10px; background: var(--p1); border: 3px solid white; box-shadow: 0 0 0 3px rgba(0,0,0,0.03); }
            .t-date { color: var(--p1); font-weight: 600; font-size: 0.9rem; margin-bottom: 10px; display: block; }
            .t-title { font-size: 1.25rem; font-weight: 700; margin: 0 0 8px; color: #1e293b; }
            .t-inst { font-style: italic; color: #64748b; margin-bottom: 4px; display: block; font-size: 0.95rem; }
            .t-det { color: #475569; font-size: 0.95rem; line-height: 1.6; }

            /* Contact Grid */
            .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; text-align: left; }
            .contact-cards { display: flex; flex-direction: column; gap: 1.5rem; }
            .c-card { background: white; border-radius: 15px; padding: 1.2rem; display: flex; align-items: center; gap: 20px; box-shadow: 0 5px 20px rgba(0,0,0,0.03); border: 1px solid #f0f0f0; text-decoration: none; color: inherit; transition: 0.3s; }
            .c-card:hover { transform: translateX(10px); box-shadow: 0 10px 25px rgba(0,0,0,0.06); }
            .c-icon { width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0; background: var(--p1); }
            .c-label { font-weight: 700; font-size: 1rem; color: #1a202c; display: block; }
            .c-value { font-size: 0.9rem; color: var(--p1); }
            
            .cert-box { background: white; border-radius: 20px; padding: 3rem; box-shadow: 0 15px 40px rgba(0,0,0,0.05); }
            .cert-item { display: flex; gap: 15px; margin-bottom: 2rem; }
            .cert-item .icon { font-size: 1.4rem; flex-shrink: 0; }
            .cert-info b { display: block; font-size: 1rem; margin-bottom: 4px; color: #1a202c; }
            .cert-info span { font-size: 0.9rem; color: #718096; line-height: 1.4; }

            footer { background: #2d3748; color: white; padding: 3rem; text-align: center; font-size: 0.95rem; }
        </style>
    </head>
    <body>
        <header>
            <div class="logo">${data.name}</div>
            <nav>
                <a href="javascript:void(0)" onclick="document.getElementById('home').scrollIntoView({behavior: 'smooth'})">Home</a>
                <a href="javascript:void(0)" onclick="document.getElementById('about').scrollIntoView({behavior: 'smooth'})">About</a>
                <a href="javascript:void(0)" onclick="document.getElementById('skills').scrollIntoView({behavior: 'smooth'})">Skills</a>
                <a href="javascript:void(0)" onclick="document.getElementById('projects').scrollIntoView({behavior: 'smooth'})">Projects</a>
                <a href="javascript:void(0)" onclick="document.getElementById('edu').scrollIntoView({behavior: 'smooth'})">Education</a>
                <a href="javascript:void(0)" onclick="document.getElementById('contact').scrollIntoView({behavior: 'smooth'})">Contact</a>
            </nav>
        </header>
        
        <div id="home" class="hero">
            <h1>${data.name}</h1>
            <p>${data.intro}</p>
            <a href="javascript:void(0)" onclick="document.getElementById('about').scrollIntoView({behavior: 'smooth'})" class="btn">Explore My Work</a>
        </div>

        <section id="about">
            <h2 class="section-title">About Me</h2>
            <div class="about-grid">
                <div class="profile-card">
                    <div class="avatar-box">
                        ${data.img ? `<img src="${data.img}">` : data.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div class="p-name">${data.name}</div>
                    <div class="p-role">B.Tech CSE - AI & Data Science</div>
                    <div class="contact-info">
                        <div class="contact-item"><i class="fas fa-phone"></i> ${data.phone}</div>
                        <div class="contact-item"><i class="fas fa-envelope"></i> ${data.email}</div>
                    </div>
                    <div class="social-links">
                        <a href="${data.linkedin}" target="_blank" class="social-btn li"><i class="fab fa-linkedin-in"></i></a>
                        <a href="${data.github}" target="_blank" class="social-btn gh"><i class="fab fa-github"></i></a>
                    </div>
                </div>
                <div class="bio-text">
                    <p>${data.bio}</p>
                </div>
            </div>
        </section>

        <section id="skills" style="background: #fdfdff;">
            <h2 class="section-title">Technical Skills</h2>
            <div class="skill-card" style="max-width: 900px; margin: 0 auto;">
                <div class="skill-list" style="justify-content: center; gap: 1rem;">
                    ${data.skills.map(s => s ? `<div class="skill-badge" style="font-size: 1rem; padding: 10px 25px;">${s}</div>` : '').join('')}
                </div>
            </div>
        </section>

        <section id="projects">
            <h2 class="section-title">Featured Projects</h2>
            <div class="projects-grid">
                ${projects.map(p => `
                <div class="project-card">
                    <div class="p-thumb">
                        <h3>${p.title}</h3>
                        <span class="p-duration">Duration: ${p.duration}</span>
                    </div>
                    <div class="p-content">
                        <p class="p-desc">${p.desc}</p>
                        <div class="p-tags"><div class="p-tag">AI</div><div class="p-tag">Data Science</div></div>
                        <a href="${p.link}" target="_blank" class="p-btn">View Live Demo</a>
                    </div>
                </div>
                `).join('')}
            </div>
        </section>

        <section id="edu">
            <h2 class="section-title">Education & Experience</h2>
            <div class="edu-timeline">
                ${eduItems.map(edu => `
                <div class="timeline-item">
                    <span class="t-date">${edu.date}</span>
                    <h3 class="t-title">${edu.degree}</h3>
                    <span class="t-inst">${edu.details}</span>
                    <span class="t-inst">${edu.school}</span>
                </div>
                `).join('')}
            </div>
        </section>

        <section id="contact" style="background: #fdfdff;">
            <h2 class="section-title">Get In Touch</h2>
            <div class="contact-grid">
                <div>
                    <h3 style="font-size: 1.8rem; margin-bottom: 1.5rem;">Let's Connect!</h3>
                    <p style="color: #64748b; margin-bottom: 2.5rem; line-height: 1.6;">I'm always excited to discuss new opportunities, collaborate on innovative projects, or simply connect with fellow tech enthusiasts. Feel free to reach out!</p>
                    
                    <div class="contact-cards">
                        <div class="c-card">
                            <div class="c-icon"><i class="fas fa-phone"></i></div>
                            <div><span class="c-label">Phone</span><span class="c-value">${data.phone}</span></div>
                        </div>
                        <a href="mailto:${data.email}" target="_blank" class="c-card">
                            <div class="c-icon"><i class="fas fa-envelope"></i></div>
                            <div><span class="c-label">Email</span><span class="c-value">${data.email}</span></div>
                        </a>
                        <a href="${data.linkedin}" target="_blank" class="c-card">
                            <div class="c-icon"><i class="fab fa-linkedin-in"></i></div>
                            <div><span class="c-label">LinkedIn</span><span class="c-value">Connect with me</span></div>
                        </a>
                        <a href="${data.github}" target="_blank" class="c-card">
                            <div class="c-icon"><i class="fab fa-github"></i></div>
                            <div><span class="c-label">GitHub</span><span class="c-value">View my repositories</span></div>
                        </a>
                    </div>
                </div>

                <div>
                    <h3 style="font-size: 1.8rem; margin-bottom: 2rem;">Certifications & Workshops</h3>
                    <div class="cert-box">
                        ${portfolioData.certifications.map(c => `
                            <div class="cert-item">
                                <div class="icon"><i class="${c.icon}"></i></div>
                                <div class="cert-info">
                                    <b>${c.title}</b>
                                    <span>${c.desc}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </section>

        <footer>
            <p>© 2025 ${data.name}. Crafted with passion for AI & Data Science.</p>
        </footer>
    </body>
    </html>
    `;

    iframe.srcdoc = html;
    modal.style.display = 'flex';
}

function closeLivePreview() {
    document.getElementById('live-portfolio-modal').style.display = 'none';
}

function changeTheme(c1, c2) {
    portfolioData.theme = { c1, c2 };
    openLivePreview();
}

function copyPortfolioLink() {
    const safeName = portfolioData.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const link = `https://smartresume.app/${safeName}`;
    navigator.clipboard.writeText(link).then(() => {
        alert('Simulated link copied: ' + link + '\n\nNote: To get a real link, download the file and upload to Netlify as shown below.');
    });
}

function downloadPortfolioHTML() {
    try {
        const html = generateFullPortfolioHTML();
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const fileName = (portfolioData.name || 'portfolio').toLowerCase().replace(/\s+/g, '-') + '.html';

        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (err) {
        console.error('Download failed:', err);
        alert('Download failed. Please try again.');
    }
}
