/**
 * Resume Builder Logic - Live Update
 */

// Initialize UI
document.addEventListener('DOMContentLoaded', () => {
    // Add default items
    addDefaultItem('experience');
    addDefaultItem('education');
    addDefaultItem('skills');
    
    // Initial render
    updatePreview();

    // Listeners for live update
    document.getElementById('resume-form').addEventListener('input', updatePreview);
});

// Avoid modifying event param directly in inline calls, use a wrapper
function addItem(event, sectionType) {
    if(event) {
        event.stopPropagation();
        event.preventDefault();
    }
    
    const container = document.getElementById(`${sectionType}-items`);
    const itemCount = container.children.length + 1;
    let html = '';

    switch (sectionType) {
        case 'education':
            html = `
                <div class="item-card ripple-item">
                    <div class="item-header">
                        <span>Edu #${itemCount}</span>
                        <button type="button" class="btn-delete" onclick="removeItem(this)"><i class="fas fa-trash"></i></button>
                    </div>
                    <div class="grid-form">
                        <div class="form-group">
                            <label>School</label>
                            <input type="text" class="input-school" placeholder="Harvard">
                        </div>
                        <div class="form-group">
                            <label>Degree</label>
                            <input type="text" class="input-degree" placeholder="BSc CS">
                        </div>
                        <div class="form-group">
                            <label>Dates</label>
                            <input type="text" class="input-dates" placeholder="2020 - 2024">
                        </div>
                    </div>
                </div>`;
            break;
        case 'skills':
            html = `
                <div class="item-card">
                    <div class="item-header">
                        <span>Skills Group #${itemCount}</span>
                        <button type="button" class="btn-delete" onclick="removeItem(this)"><i class="fas fa-trash"></i></button>
                    </div>
                    <div class="form-group">
                        <label>Category</label>
                        <input type="text" class="input-skill-cat" placeholder="Languages">
                        <label>Skills (comma separated)</label>
                        <input type="text" class="input-skills" placeholder="JS, Python, C++">
                    </div>
                </div>`;
            break;
        case 'experience':
            html = `
                <div class="item-card">
                    <div class="item-header">
                        <span>Job #${itemCount}</span>
                        <button type="button" class="btn-delete" onclick="removeItem(this)"><i class="fas fa-trash"></i></button>
                    </div>
                    <div class="grid-form">
                        <div class="form-group full-width">
                            <label>Company</label>
                            <input type="text" class="input-company" placeholder="Google">
                        </div>
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" class="input-job" placeholder="Engineer">
                        </div>
                        <div class="form-group">
                            <label>Dates</label>
                            <input type="text" class="input-dates" placeholder="2022 - Present">
                        </div>
                        <div class="form-group full-width">
                            <label style="display: flex; justify-content: space-between; align-items: center;">
                                Description 
                                <button type="button" class="btn-ai" onclick="generateAiDescription(this)" style="font-size: 0.75em; padding: 4px 8px; background: #6366f1; color: white; border: none; border-radius: 4px; cursor: pointer;">
                                    <i class="fas fa-robot"></i> AI Generate
                                </button>
                            </label>
                            <textarea class="input-desc" placeholder="Responsibilities"></textarea>
                        </div>
                    </div>
                </div>`;
            break;
        case 'projects':
            html = `
                <div class="item-card">
                    <div class="item-header">
                        <span>Project #${itemCount}</span>
                        <button type="button" class="btn-delete" onclick="removeItem(this)"><i class="fas fa-trash"></i></button>
                    </div>
                    <div class="grid-form">
                        <div class="form-group">
                            <label>Project Name</label>
                            <input type="text" class="input-project-title" placeholder="App">
                        </div>
                        <div class="form-group">
                            <label>Link</label>
                            <input type="text" class="input-project-link" placeholder="github.com">
                        </div>
                        <div class="form-group full-width">
                            <label>Details</label>
                            <textarea class="input-project-desc" placeholder="Desc"></textarea>
                        </div>
                    </div>
                </div>`;
            break;
        case 'certifications':
            html = `
                <div class="item-card">
                    <div class="item-header">
                        <span>Cert #${itemCount}</span>
                        <button type="button" class="btn-delete" onclick="removeItem(this)"><i class="fas fa-trash"></i></button>
                    </div>
                    <div class="grid-form">
                        <div class="form-group">
                            <label>Certification Name</label>
                            <input type="text" class="input-cert-title" placeholder="AWS Solutions Architect">
                        </div>
                        <div class="form-group">
                            <label>Issuer</label>
                            <input type="text" class="input-cert-issuer" placeholder="Amazon Web Services">
                        </div>
                        <div class="form-group">
                            <label>Date</label>
                            <input type="text" class="input-cert-date" placeholder="2023">
                        </div>
                    </div>
                </div>`;
            break;
        case 'achievements':
            html = `
                <div class="item-card">
                    <div class="item-header">
                        <span>Achieve #${itemCount}</span>
                        <button type="button" class="btn-delete" onclick="removeItem(this)"><i class="fas fa-trash"></i></button>
                    </div>
                    <div class="grid-form">
                        <div class="form-group full-width">
                            <label>Achievement</label>
                            <input type="text" class="input-achieve-title" placeholder="1st Place Hackathon">
                        </div>
                        <div class="form-group full-width">
                            <label>Details</label>
                            <textarea class="input-achieve-desc" placeholder="Brief details..."></textarea>
                        </div>
                    </div>
                </div>`;
            break;
        case 'internships':
            html = `
                <div class="item-card">
                    <div class="item-header">
                        <span>Internship #${itemCount}</span>
                        <button type="button" class="btn-delete" onclick="removeItem(this)"><i class="fas fa-trash"></i></button>
                    </div>
                    <div class="grid-form">
                        <div class="form-group">
                            <label>Company</label>
                            <input type="text" class="input-intern-company" placeholder="Microsoft">
                        </div>
                        <div class="form-group">
                            <label>Role</label>
                            <input type="text" class="input-intern-role" placeholder="SWE Intern">
                        </div>
                        <div class="form-group">
                            <label>Duration</label>
                            <input type="text" class="input-intern-duration" placeholder="Summner 2023">
                        </div>
                        <div class="form-group full-width">
                            <label>Description</label>
                            <textarea class="input-intern-desc" placeholder="Responsibilities..."></textarea>
                        </div>
                        <div class="form-group full-width">
                            <label>Technologies Used</label>
                            <input type="text" class="input-intern-tech" placeholder="React, Node.js">
                        </div>
                    </div>
                </div>`;
            break;
        case 'awards':
            html = `
                <div class="item-card">
                    <div class="item-header">
                        <span>Award #${itemCount}</span>
                        <button type="button" class="btn-delete" onclick="removeItem(this)"><i class="fas fa-trash"></i></button>
                    </div>
                    <div class="grid-form">
                        <div class="form-group">
                            <label>Award Title</label>
                            <input type="text" class="input-award-title" placeholder="Dean's List">
                        </div>
                        <div class="form-group">
                            <label>Organization</label>
                            <input type="text" class="input-award-org" placeholder="University">
                        </div>
                        <div class="form-group">
                            <label>Year</label>
                            <input type="text" class="input-award-year" placeholder="2023">
                        </div>
                        <div class="form-group full-width">
                            <label>Description</label>
                            <textarea class="input-award-desc" placeholder="Details..."></textarea>
                        </div>
                    </div>
                </div>`;
            break;
        case 'publications':
            html = `
                <div class="item-card">
                    <div class="item-header">
                        <span>Pub #${itemCount}</span>
                        <button type="button" class="btn-delete" onclick="removeItem(this)"><i class="fas fa-trash"></i></button>
                    </div>
                    <div class="grid-form">
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" class="input-pub-title" placeholder="AI in Healthcare">
                        </div>
                        <div class="form-group">
                            <label>Publisher</label>
                            <input type="text" class="input-pub-publisher" placeholder="IEEE">
                        </div>
                        <div class="form-group">
                            <label>Year</label>
                            <input type="text" class="input-pub-year" placeholder="2024">
                        </div>
                        <div class="form-group full-width">
                            <label>Link</label>
                            <input type="text" class="input-pub-link" placeholder="doi.org/...">
                        </div>
                    </div>
                </div>`;
            break;
        case 'languages':
            html = `
                <div class="item-card">
                    <div class="item-header">
                        <span>Lang #${itemCount}</span>
                        <button type="button" class="btn-delete" onclick="removeItem(this)"><i class="fas fa-trash"></i></button>
                    </div>
                    <div class="grid-form">
                        <div class="form-group">
                            <label>Language</label>
                            <input type="text" class="input-lang-name" placeholder="English">
                        </div>
                        <div class="form-group">
                            <label>Proficiency</label>
                            <select class="input-lang-level form-select">
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option selected>Fluent</option>
                                <option>Native</option>
                            </select>
                        </div>
                    </div>
                </div>`;
            break;
        case 'interests':
            html = `
                <div class="item-card">
                    <div class="item-header">
                        <span>Interest #${itemCount}</span>
                        <button type="button" class="btn-delete" onclick="removeItem(this)"><i class="fas fa-trash"></i></button>
                    </div>
                    <div class="form-group">
                        <label>Hobbies / Interests</label>
                        <input type="text" class="input-interest-name" placeholder="Chess, Hiking, AI">
                    </div>
                </div>`;
            break;
        case 'references':
            html = `
                <div class="item-card">
                    <div class="item-header">
                        <span>Ref #${itemCount}</span>
                        <button type="button" class="btn-delete" onclick="removeItem(this)"><i class="fas fa-trash"></i></button>
                    </div>
                    <div class="grid-form">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="input-ref-name" placeholder="Sarah Connor">
                        </div>
                        <div class="form-group">
                            <label>Position</label>
                            <input type="text" class="input-ref-pos" placeholder="Manager">
                        </div>
                        <div class="form-group">
                            <label>Organization</label>
                            <input type="text" class="input-ref-org" placeholder="Skynet">
                        </div>
                        <div class="form-group full-width">
                            <label>Email</label>
                            <input type="email" class="input-ref-email" placeholder="sarah@example.com">
                        </div>
                    </div>
                </div>`;
            break;
    }

    const div = document.createElement('div');
    div.innerHTML = html.trim();
    container.appendChild(div.firstChild);
    updatePreview();
}

function addDefaultItem(type) {
    addItem(null, type);
    // Fill in some default info so preview looks good immediately
    setTimeout(() => {
        if(type === 'experience') {
            document.querySelector('.input-company').value = "Tech Corp";
            document.querySelector('.input-job').value = "Frontend Engineer";
            document.querySelector('.input-dates').value = "2021 - Present";
            document.querySelector('.input-desc').value = "Developed and maintained user-facing features using modern web technologies.";
        }
        if(type === 'education') {
            document.querySelector('.input-school').value = "State University";
            document.querySelector('.input-degree').value = "B.S. Computer Science";
            document.querySelector('.input-dates').value = "2017 - 2021";
        }
        if(type === 'skills') {
            document.querySelector('.input-skill-cat').value = "Frontend";
            document.querySelector('.input-skills').value = "HTML, CSS, JavaScript, React";
        }
        if(type === 'certifications') {
            document.querySelector('.input-cert-title').value = "AWS Solutions Architect";
            document.querySelector('.input-cert-issuer').value = "Amazon Web Services";
            document.querySelector('.input-cert-date').value = "2023";
        }
        if(type === 'achievements') {
            document.querySelector('.input-achieve-title').value = "Employee of the Year";
            document.querySelector('.input-achieve-desc').value = "Recognized for outstanding contribution to the company's growth.";
        }
        if(type === 'internships') {
            document.querySelector('.input-intern-company').value = "Google";
            document.querySelector('.input-intern-role').value = "SWE Intern";
            document.querySelector('.input-intern-duration').value = "Summer 2023";
            document.querySelector('.input-intern-desc').value = "Collaborated on core search algorithms.";
            document.querySelector('.input-intern-tech').value = "C++, Java";
        }
        if(type === 'awards') {
            document.querySelector('.input-award-title').value = "Best Student Award";
            document.querySelector('.input-award-org').value = "City College";
            document.querySelector('.input-award-year').value = "2022";
        }
        if(type === 'publications') {
            document.querySelector('.input-pub-title').value = "Future of Web Apps";
            document.querySelector('.input-pub-publisher').value = "Tech Journal";
            document.querySelector('.input-pub-year').value = "2024";
        }
        if(type === 'languages') {
            document.querySelector('.input-lang-name').value = "English";
        }
        if(type === 'interests') {
            document.querySelector('.input-interest-name').value = "Gaming, Photography";
        }
        if(type === 'references') {
            document.querySelector('.input-ref-name').value = "Jane Smith";
            document.querySelector('.input-ref-pos').value = "Professor";
            document.querySelector('.input-ref-org').value = "MIT";
        }
        updatePreview();
    }, 50);
}

function removeItem(btn) {
    const card = btn.closest('.item-card');
    card.remove();
    updatePreview();
}

async function generateAiDescription(btn) {
    const card = btn.closest('.item-card');
    const company = card.querySelector('.input-company').value;
    const role = card.querySelector('.input-job').value;
    const textarea = card.querySelector('.input-desc');

    if (!role) {
        alert("Please enter a Title first so I can generate advice.");
        return;
    }

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    btn.disabled = true;

    // Simulated AI Response with professional suggestions based on role
    setTimeout(() => {
        let advice = "";
        const lowerRole = role.toLowerCase();
        
        if (lowerRole.includes("engineer") || lowerRole.includes("developer")) {
            advice = `• Developed and maintained scalable web applications using modern frameworks.\n• Optimized application performance, reducing load times by 20%.\n• Collaborated with cross-functional teams to define, design, and ship new features.\n• Implemented unit tests and engaged in code reviews to ensure high code quality.`;
        } else if (lowerRole.includes("designer") || lowerRole.includes("ui") || lowerRole.includes("ux")) {
            advice = `• Created intuitive UI/UX designs and high-fidelity wireframes.\n• Conducted user research and usability testing to iterate on product designs.\n• Established design systems and style guides for consistent branding.\n• Collaborated with developers to ensure design feasibility and pixel-perfect implementation.`;
        } else if (lowerRole.includes("manager") || lowerRole.includes("lead")) {
            advice = `• Led a team of 5+ professionals, ensuring project delivery within deadlines.\n• Developed project roadmaps and aligned team goals with company objectives.\n• Managed stakeholder expectations and conducted regular status meetings.\n• Optimized internal processes, increasing team efficiency by 15%.`;
        } else if (lowerRole.includes("analyst") || lowerRole.includes("data")) {
            advice = `• Analyzed complex datasets to provide actionable business insights.\n• Developed automated dashboards and reports using SQL and visualization tools.\n• Performed statistical analysis to identify trends and patterns.\n• Collaborated with business units to define key performance indicators (KPIs).`;
        } else if (lowerRole.includes("intern")) {
            advice = `• Assisted in the development and testing of core product features.\n• Conducted research and supported the team in daily operational tasks.\n• Learned and applied industry best practices in a professional environment.\n• Successfully completed assigned projects and presented results to stakeholders.`;
        } else {
            advice = `• Spearheaded key initiatives at ${company || 'the company'} to drive growth and efficiency.\n• Delivered high-quality results in a fast-paced and challenging environment.\n• Leveraged specialized skills to solve complex problems and improve workflows.\n• Contributed to a positive team culture and cross-functional collaboration.`;
        }

        textarea.value = advice;
        btn.innerHTML = '<i class="fas fa-robot"></i> AI Generate';
        btn.disabled = false;
        updatePreview();
    }, 1200);
}


// Live Preview Logic
function updatePreview() {
    const previewContainer = document.getElementById('resume-preview');
    let currentTemplate = 'template-azurill';
    if (previewContainer.className.match(/template-\w+/)) {
        currentTemplate = previewContainer.className.match(/template-\w+/)[0];
    }

    const name = document.getElementById('full-name').value || 'Your Name';
    const headline = document.getElementById('headline').value || '';
    const email = document.getElementById('email').value || '';
    const phone = document.getElementById('phone').value || '';
    const loc = document.getElementById('location').value || '';
    const git = document.getElementById('github').value || '';
    const lin = document.getElementById('linkedin').value || '';
    const port = document.getElementById('portfolio')?.value || '';
    const summary = document.getElementById('summary') ? document.getElementById('summary').value : '';

    let contactItemsHtml = ``;
    if(email) contactItemsHtml += `<span><i class="fas fa-envelope"></i> <a href="mailto:${email}" style="text-decoration:none; color:inherit;">${email}</a></span>`;
    if(phone) contactItemsHtml += `<span><i class="fas fa-phone"></i> <a href="tel:${phone}" style="text-decoration:none; color:inherit;">${phone}</a></span>`;
    if(loc) contactItemsHtml += `<span><i class="fas fa-map-marker-alt"></i> ${loc}</span>`;
    if(git) contactItemsHtml += `<span><i class="fab fa-github"></i> <a href="${git.startsWith('http') ? git : 'https://' + git}" target="_blank" style="text-decoration:none; color:inherit;">${git}</a></span>`;
    if(lin) contactItemsHtml += `<span><i class="fab fa-linkedin"></i> <a href="${lin.startsWith('http') ? lin : 'https://' + lin}" target="_blank" style="text-decoration:none; color:inherit;">${lin}</a></span>`;
    if(port) contactItemsHtml += `<span><i class="fas fa-globe"></i> <a href="${port.startsWith('http') ? port : 'https://' + port}" target="_blank" style="text-decoration:none; color:inherit;">${port}</a></span>`;

    let contactHtml = contactItemsHtml ? `<div class="cv-contact">${contactItemsHtml}</div>` : '';

    let headerHtml = `
        <div class="cv-header">
            <div class="cv-name-container">
                <div class="cv-name">${name}</div>
                ${headline ? `<div class="cv-headline">${headline}</div>` : ''}
            </div>
            ${['template-bronzor', 'template-kakuna', 'template-leafish', 'template-ditto'].includes(currentTemplate) ? contactHtml : ''}
        </div>
    `;

    let summaryHtml = summary ? wrapSection('Profile', `<div class="cv-summary">${summary.replace(/\n/g, '<br>')}</div>`) : '';

    let expHtml = '';
    const expItems = document.querySelectorAll('#experience-items .item-card');
    if (expItems.length > 0) {
        let itemsHtml = '';
        expItems.forEach(item => {
            const comp = item.querySelector('.input-company').value || '';
            const role = item.querySelector('.input-job').value || '';
            const dates = item.querySelector('.input-dates').value || '';
            const desc = item.querySelector('.input-desc').value || '';
            if(comp || role || dates || desc) {
                itemsHtml += `
                    <div class="cv-item">
                        <div class="cv-item-header">
                            <span class="cv-item-title">${role}</span>
                            <span class="cv-item-date">${dates}</span>
                        </div>
                        <div class="cv-item-subtitle">${comp}</div>
                        ${desc ? `<div class="cv-item-desc">${desc.replace(/\n/g, '<br>')}</div>` : ''}
                    </div>
                `;
            }
        });
        if(itemsHtml) expHtml = wrapSection('Experience', itemsHtml);
    }

    let eduHtml = '';
    const eduItems = document.querySelectorAll('#education-items .item-card');
    if (eduItems.length > 0) {
        let itemsHtml = '';
        eduItems.forEach(item => {
            const school = item.querySelector('.input-school').value || '';
            const degree = item.querySelector('.input-degree').value || '';
            const dates = item.querySelector('.input-dates')?.value || '';
            if(school || degree || dates) {
                itemsHtml += `
                    <div class="cv-item">
                        <div class="cv-item-header">
                            <span class="cv-item-title">${degree}</span>
                            <span class="cv-item-date">${dates}</span>
                        </div>
                        <div class="cv-item-subtitle">${school}</div>
                    </div>
                `;
            }
        });
        if(itemsHtml) eduHtml = wrapSection('Education', itemsHtml);
    }

    let skillHtml = '';
    const skillItems = document.querySelectorAll('#skills-items .item-card');
    if (skillItems.length > 0) {
        let itemsHtml = `<div class="cv-skills">`;
        let hasSkills = false;
        skillItems.forEach(item => {
            const cat = item.querySelector('.input-skill-cat').value;
            const skillsStr = item.querySelector('.input-skills').value;
            if(skillsStr) {
                hasSkills = true;
                const skillsArr = skillsStr.split(',').map(s => s.trim()).filter(s => s);
                if(cat) itemsHtml += `<div class="cv-skill-category"><strong>${cat}:</strong> `;
                skillsArr.forEach(s => {
                    itemsHtml += `<span class="cv-skill-pill">${s}</span>`;
                });
                if(cat) itemsHtml += `</div>`;
            }
        });
        itemsHtml += `</div>`;
        if(hasSkills) skillHtml = wrapSection('Skills', itemsHtml);
    }

    let projHtml = '';
    const projItems = document.querySelectorAll('#projects-items .item-card');
    if (projItems.length > 0) {
        let itemsHtml = '';
        projItems.forEach(item => {
            const title = item.querySelector('.input-project-title').value || '';
            const link = item.querySelector('.input-project-link').value;
            const desc = item.querySelector('.input-project-desc').value || '';
            if(title || desc) {
                itemsHtml += `
                    <div class="cv-item">
                        <div class="cv-item-header">
                            <span class="cv-item-title">${title} ${link ? `<a href="${link}" style="font-size:0.8em; font-weight:normal; text-decoration:none;">[Link]</a>` : ''}</span>
                        </div>
                        ${desc ? `<div class="cv-item-desc">${desc.replace(/\n/g, '<br>')}</div>` : ''}
                    </div>
                `;
            }
        });
        if(itemsHtml) projHtml = wrapSection('Projects', itemsHtml);
    }

    let certHtml = '';
    const certItems = document.querySelectorAll('#certifications-items .item-card');
    if (certItems.length > 0) {
        let itemsHtml = '';
        certItems.forEach(item => {
            const title = item.querySelector('.input-cert-title').value || '';
            const issuer = item.querySelector('.input-cert-issuer').value || '';
            const date = item.querySelector('.input-cert-date').value || '';
            if(title || issuer) {
                itemsHtml += `
                    <div class="cv-item">
                        <div class="cv-item-header">
                            <span class="cv-item-title">${title}</span>
                            <span class="cv-item-date">${date}</span>
                        </div>
                        <div class="cv-item-subtitle">${issuer}</div>
                    </div>
                `;
            }
        });
        if(itemsHtml) certHtml = wrapSection('Certifications', itemsHtml);
    }

    let achieveHtml = '';
    const achieveItems = document.querySelectorAll('#achievements-items .item-card');
    if (achieveItems.length > 0) {
        let itemsHtml = '';
        achieveItems.forEach(item => {
            const title = item.querySelector('.input-achieve-title').value || '';
            const desc = item.querySelector('.input-achieve-desc').value || '';
            if(title || desc) {
                itemsHtml += `
                    <div class="cv-item">
                        <div class="cv-item-header">
                            <span class="cv-item-title">${title}</span>
                        </div>
                        ${desc ? `<div class="cv-item-desc">${desc.replace(/\n/g, '<br>')}</div>` : ''}
                    </div>
                `;
            }
        });
        if(itemsHtml) achieveHtml = wrapSection('Achievements', itemsHtml);
    }

    let internHtml = '';
    const internItems = document.querySelectorAll('#internships-items .item-card');
    if (internItems.length > 0) {
        let itemsHtml = '';
        internItems.forEach(item => {
            const comp = item.querySelector('.input-intern-company').value || '';
            const role = item.querySelector('.input-intern-role').value || '';
            const dates = item.querySelector('.input-intern-duration').value || '';
            const desc = item.querySelector('.input-intern-desc').value || '';
            const tech = item.querySelector('.input-intern-tech').value || '';
            if(comp || role || dates) {
                itemsHtml += `
                    <div class="cv-item">
                        <div class="cv-item-header">
                            <span class="cv-item-title">${role}</span>
                            <span class="cv-item-date">${dates}</span>
                        </div>
                        <div class="cv-item-subtitle">${comp}</div>
                        ${desc ? `<div class="cv-item-desc">${desc.replace(/\n/g, '<br>')}</div>` : ''}
                        ${tech ? `<div class="cv-item-tech" style="font-size: 0.8em; margin-top: 4px;"><strong>Tech:</strong> ${tech}</div>` : ''}
                    </div>
                `;
            }
        });
        if(itemsHtml) internHtml = wrapSection('Internships', itemsHtml);
    }

    let awardHtml = '';
    const awardItems = document.querySelectorAll('#awards-items .item-card');
    if (awardItems.length > 0) {
        let itemsHtml = '';
        awardItems.forEach(item => {
            const title = item.querySelector('.input-award-title').value || '';
            const org = item.querySelector('.input-award-org').value || '';
            const year = item.querySelector('.input-award-year').value || '';
            const desc = item.querySelector('.input-award-desc').value || '';
            if(title || org) {
                itemsHtml += `
                    <div class="cv-item">
                        <div class="cv-item-header">
                            <span class="cv-item-title">${title}</span>
                            <span class="cv-item-date">${year}</span>
                        </div>
                        <div class="cv-item-subtitle">${org}</div>
                        ${desc ? `<div class="cv-item-desc">${desc.replace(/\n/g, '<br>')}</div>` : ''}
                    </div>
                `;
            }
        });
        if(itemsHtml) awardHtml = wrapSection('Awards & Honors', itemsHtml);
    }

    let pubHtml = '';
    const pubItems = document.querySelectorAll('#publications-items .item-card');
    if (pubItems.length > 0) {
        let itemsHtml = '';
        pubItems.forEach(item => {
            const title = item.querySelector('.input-pub-title').value || '';
            const pub = item.querySelector('.input-pub-publisher').value || '';
            const year = item.querySelector('.input-pub-year').value || '';
            const link = item.querySelector('.input-pub-link').value || '';
            if(title || pub) {
                itemsHtml += `
                    <div class="cv-item">
                        <div class="cv-item-header">
                            <span class="cv-item-title">${title}</span>
                            <span class="cv-item-date">${year}</span>
                        </div>
                        <div class="cv-item-subtitle">${pub} ${link ? `<a href="${link}" style="font-size:0.8em; text-decoration:none;"> [Link]</a>` : ''}</div>
                    </div>
                `;
            }
        });
        if(itemsHtml) pubHtml = wrapSection('Publications & Research', itemsHtml);
    }

    let langHtml = '';
    const langItems = document.querySelectorAll('#languages-items .item-card');
    if (langItems.length > 0) {
        let itemsHtml = '<div class="cv-languages" style="display:flex; flex-wrap:wrap; gap:10px;">';
        let hasLang = false;
        langItems.forEach(item => {
            const name = item.querySelector('.input-lang-name').value;
            const level = item.querySelector('.input-lang-level').value;
            if(name) {
                hasLang = true;
                itemsHtml += `<span class="cv-lang-pill" style="background:#f1f5f9; padding:4px 10px; border-radius:4px; font-size:0.9em;"><strong>${name}:</strong> ${level}</span>`;
            }
        });
        itemsHtml += '</div>';
        if(hasLang) langHtml = wrapSection('Languages', itemsHtml);
    }

    let interestHtml = '';
    const interestItems = document.querySelectorAll('#interests-items .item-card');
    if (interestItems.length > 0) {
        let itemsHtml = '';
        interestItems.forEach(item => {
            const name = item.querySelector('.input-interest-name').value;
            if(name) {
                itemsHtml += `<div class="cv-interest-list">${name}</div>`;
            }
        });
        if(itemsHtml) interestHtml = wrapSection('Interests & Hobbies', itemsHtml);
    }

    let refHtml = '';
    const refItems = document.querySelectorAll('#references-items .item-card');
    if (refItems.length > 0) {
        let itemsHtml = '';
        refItems.forEach(item => {
            const name = item.querySelector('.input-ref-name').value || '';
            const pos = item.querySelector('.input-ref-pos').value || '';
            const org = item.querySelector('.input-ref-org').value || '';
            const email = item.querySelector('.input-ref-email').value || '';
            if(name || pos || org) {
                itemsHtml += `
                    <div class="cv-item">
                        <div class="cv-item-header" style="margin-bottom:0;">
                            <span class="cv-item-title">${name}</span>
                        </div>
                        <div class="cv-item-subtitle" style="margin-bottom:2px;">${pos}, ${org}</div>
                        ${email ? `<div class="cv-item-desc" style="font-size:0.85em;"><i class="fas fa-envelope"></i> ${email}</div>` : ''}
                    </div>
                `;
            }
        });
        if(itemsHtml) refHtml = wrapSection('References', itemsHtml);
    }

    const chunks = {
        experience: expHtml,
        internships: internHtml,
        education: eduHtml,
        projects: projHtml,
        certifications: certHtml,
        achievements: achieveHtml,
        awards: awardHtml,
        publications: pubHtml,
        languages: langHtml,
        interests: interestHtml,
        references: refHtml,
        summary: summaryHtml,
        contact: ['template-bronzor', 'template-kakuna', 'template-leafish', 'template-ditto'].includes(currentTemplate) ? '' : (contactHtml ? wrapSection('Contact', contactHtml) : ''),
        skills: skillHtml
    };
    
    let genMainHtml = '';
    document.querySelectorAll('#layout-main-list .sortable-item').forEach(el => {
        genMainHtml += chunks[el.dataset.id] || '';
    });
    
    let genSideHtml = '';
    document.querySelectorAll('#layout-sidebar-list .sortable-item').forEach(el => {
        genSideHtml += chunks[el.dataset.id] || '';
    });

    let html = '';
    
    // Assembling layout based on template type
    if (['template-azurill'].includes(currentTemplate)) {
        html = `
            <div class="cv-layout-2col">
                <div class="cv-sidebar">
                    ${genSideHtml}
                </div>
                <div class="cv-main">
                    ${headerHtml}
                    ${genMainHtml}
                </div>
            </div>
        `;
    } else if (['template-glalie', 'template-gengar'].includes(currentTemplate)) {
        html = `
            <div class="cv-layout-2col">
                <div class="cv-sidebar">
                    ${headerHtml}
                    ${genSideHtml}
                </div>
                <div class="cv-main">
                    ${genMainHtml}
                </div>
            </div>
        `;
    } else if (['template-chikorita'].includes(currentTemplate)) {
        html = `
            <div class="cv-layout-2col">
                <div class="cv-main">
                    ${headerHtml}
                    ${genMainHtml}
                </div>
                <div class="cv-sidebar">
                    ${genSideHtml}
                </div>
            </div>
        `;
    } else if (currentTemplate === 'template-ditto') {
        html = `
            ${headerHtml}
            <div class="cv-layout-2col">
                <div class="cv-sidebar">
                    ${genSideHtml}
                </div>
                <div class="cv-main">
                    ${genMainHtml}
                </div>
            </div>
        `;
    } else {
        html = `
            ${headerHtml}
            <div class="cv-layout-1col" style="display:flex; flex-direction:column; gap:0;">
                <div class="cv-main">
                    ${genMainHtml}
                    ${genSideHtml}
                </div>
            </div>
        `;
    }

    previewContainer.innerHTML = html;
}

function wrapSection(title, content) {
    if (!content) return '';
    return `
    <div class="cv-section section-${title.toLowerCase()}">
        <h3><span>${title}</span></h3>
        <div class="cv-section-content">
            ${content}
        </div>
    </div>`;
}

// Download PDF
document.getElementById('save-btn').addEventListener('click', () => {
    // Generate PDF from the preview container
    const element = document.getElementById('resume-preview');
    
    // html2pdf can have issue scaling elements with transforms. Remove scale temporarily or wrap.
    element.parentElement.style.transform = 'scale(1)';
    setTimeout(() => {
        const worker = html2pdf();
        const opt = {
            margin: 0,
            filename: `${document.getElementById('full-name').value || 'Resume'}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        worker.set(opt).from(element).save().then(() => {
            element.parentElement.style.transform = 'scale(0.85)';
        });
    }, 100);
});

// Settings & Templates
document.querySelectorAll('.template-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.template-option').forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
        const templateName = this.getAttribute('data-template');
        const preview = document.getElementById('resume-preview');
        preview.className = `resume-paper ${templateName}`;
        updatePreview(); // Re-render to adapt structure if needed
    });
});

function updateGoogleFont() {
    const familyRaw = document.getElementById('font-family')?.value || "'Outfit', sans-serif";
    const family = familyRaw.split(',')[0].replace(/['"]/g, '').trim();
    if(family === 'Arial' || family === 'Times New Roman') {
        document.documentElement.style.setProperty('--doc-font', familyRaw);
        return; // System fonts
    }

    const subset = 'latin';
    const variantsCombo = '400,400i,700';
    
    // Parse Google Font API format
    const hasItalic = variantsCombo.includes('i');
    let weights = variantsCombo.split(',').map(v => v.replace('i', '')).filter((v, i, a) => a.indexOf(v) === i && v);

    let url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}`;
    
    if (hasItalic) {
        let weightPairs = [];
        weights.forEach(w => {
            weightPairs.push(`0,${w}`); 
            if(w !== '300') weightPairs.push(`1,${w}`); // Adds italic counterpart
        });
        url += `:ital,wght@${weightPairs.join(';')}`;
    } else {
        url += `:wght@${weights.join(';')}`;
    }
    
    url += `&display=swap&subset=${subset}`;

    // Inject/Update
    let link = document.getElementById('dynamic-google-font');
    if (!link) {
        link = document.createElement('link');
        link.id = 'dynamic-google-font';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }
    link.href = url;
    document.documentElement.style.setProperty('--doc-font', familyRaw);
}

document.getElementById('font-family')?.addEventListener('change', updateGoogleFont);

document.getElementById('font-size')?.addEventListener('input', function(e) {
    document.documentElement.style.setProperty('--doc-font-size', e.target.value);
    document.getElementById('font-size-val').textContent = e.target.value;
});

document.getElementById('line-height')?.addEventListener('input', function(e) {
    document.documentElement.style.setProperty('--doc-line-height', e.target.value);
    document.getElementById('line-height-val').textContent = e.target.value;
});

document.getElementById('page-format')?.addEventListener('change', function(e) {
    const preview = document.getElementById('resume-preview');
    if (e.target.value === 'a4') {
        preview.style.width = '210mm';
        preview.style.minHeight = '297mm';
    } else if (e.target.value === 'letter') {
        preview.style.width = '8.5in';
        preview.style.minHeight = '11in';
    } else if (e.target.value === 'legal') {
        preview.style.width = '8.5in';
        preview.style.minHeight = '14in';
    }
});

document.getElementById('page-margin')?.addEventListener('input', function(e) {
    const val = e.target.value;
    document.getElementById('resume-preview').style.padding = `${val}mm ${val}mm`;
    document.getElementById('margin-val').textContent = val;
});

document.getElementById('hide-icons')?.addEventListener('change', function(e) {
    const wrapper = document.getElementById('resume-preview');
    if(e.target.checked) wrapper.classList.add('hide-icons');
    else wrapper.classList.remove('hide-icons');
});

document.getElementById('theme-color-picker')?.addEventListener('input', function(e) {
    document.documentElement.style.setProperty('--theme-color', e.target.value);
});

// Sortable JS Initialization
window.addEventListener('load', () => {
    if(typeof Sortable !== 'undefined') {
        const listMain = document.getElementById('layout-main-list');
        const listSide = document.getElementById('layout-sidebar-list');
        if (listMain && listSide) {
            const sortOpts = {
                group: 'shared',
                animation: 150,
                ghostClass: 'sortable-ghost',
                onEnd: updatePreview
            };
            new Sortable(listMain, sortOpts);
            new Sortable(listSide, sortOpts);

            document.getElementById('reset-layout')?.addEventListener('click', function() {
                listMain.innerHTML = `
                    <div class="sortable-item" data-id="experience" style="background:#1a202c; color:#fff; padding:8px 12px; border-radius:6px; font-size:0.8em; font-weight:500; cursor:grab;"><i class="fas fa-grip-vertical" style="color:#64748b; margin-right:6px;"></i> Experience</div>
                    <div class="sortable-item" data-id="internships" style="background: #1a202c; color: #fff; padding: 8px 12px; border-radius: 6px; font-size: 0.8em; font-weight: 500; cursor: grab;"><i class="fas fa-grip-vertical" style="color: #64748b; margin-right: 6px;"></i> Internships</div>
                    <div class="sortable-item" data-id="education" style="background:#1a202c; color:#fff; padding:8px 12px; border-radius:6px; font-size:0.8em; font-weight:500; cursor:grab;"><i class="fas fa-grip-vertical" style="color:#64748b; margin-right:6px;"></i> Education</div>
                    <div class="sortable-item" data-id="projects" style="background:#1a202c; color:#fff; padding:8px 12px; border-radius:6px; font-size:0.8em; font-weight:500; cursor:grab;"><i class="fas fa-grip-vertical" style="color:#64748b; margin-right:6px;"></i> Projects</div>
                    <div class="sortable-item" data-id="certifications" style="background:#1a202c; color:#fff; padding:8px 12px; border-radius:6px; font-size:0.8em; font-weight:500; cursor:grab;"><i class="fas fa-grip-vertical" style="color:#64748b; margin-right:6px;"></i> Certifications</div>
                    <div class="sortable-item" data-id="achievements" style="background:#1a202c; color:#fff; padding:8px 12px; border-radius:6px; font-size:0.8em; font-weight:500; cursor:grab;"><i class="fas fa-grip-vertical" style="color:#64748b; margin-right:6px;"></i> Achievements</div>
                    <div class="sortable-item" data-id="awards" style="background: #1a202c; color: #fff; padding: 8px 12px; border-radius: 6px; font-size: 0.8em; font-weight: 500; cursor: grab;"><i class="fas fa-grip-vertical" style="color: #64748b; margin-right: 6px;"></i> Awards</div>
                    <div class="sortable-item" data-id="publications" style="background: #1a202c; color: #fff; padding: 8px 12px; border-radius: 6px; font-size: 0.8em; font-weight: 500; cursor: grab;"><i class="fas fa-grip-vertical" style="color: #64748b; margin-right: 6px;"></i> Publications</div>
                `;
                listSide.innerHTML = `
                    <div class="sortable-item" data-id="contact" style="background:#1a202c; color:#fff; padding:8px 12px; border-radius:6px; font-size:0.8em; font-weight:500; cursor:grab;"><i class="fas fa-grip-vertical" style="color:#64748b; margin-right:6px;"></i> Contact</div>
                    <div class="sortable-item" data-id="skills" style="background:#1a202c; color:#fff; padding:8px 12px; border-radius:6px; font-size:0.8em; font-weight:500; cursor:grab;"><i class="fas fa-grip-vertical" style="color:#64748b; margin-right:6px;"></i> Skills</div>
                    <div class="sortable-item" data-id="summary" style="background:#1a202c; color:#fff; padding:8px 12px; border-radius:6px; font-size:0.8em; font-weight:500; cursor:grab;"><i class="fas fa-grip-vertical" style="color:#64748b; margin-right:6px;"></i> Summary</div>
                    <div class="sortable-item" data-id="languages" style="background: #1a202c; color: #fff; padding: 8px 12px; border-radius: 6px; font-size: 0.8em; font-weight: 500; cursor: grab;"><i class="fas fa-grip-vertical" style="color: #64748b; margin-right: 6px;"></i> Languages</div>
                    <div class="sortable-item" data-id="interests" style="background: #1a202c; color: #fff; padding: 8px 12px; border-radius: 6px; font-size: 0.8em; font-weight: 500; cursor: grab;"><i class="fas fa-grip-vertical" style="color: #64748b; margin-right: 6px;"></i> Interests</div>
                    <div class="sortable-item" data-id="references" style="background: #1a202c; color: #fff; padding: 8px 12px; border-radius: 6px; font-size: 0.8em; font-weight: 500; cursor: grab;"><i class="fas fa-grip-vertical" style="color: #64748b; margin-right: 6px;"></i> References</div>
                `;
                updatePreview();
            });
        }
    }
});
