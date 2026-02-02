// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Google Translate Init
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'ar,en,es,fr,de,it,pt,ru,zh-CN,ja,ko,hi,tr,nl,pl,sv,no,da,fi,cs,el,he,id,th,vi,uk,ro,hu,bg,hr,sk,sl,lt,lv,et,ms,fil',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element');
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    }
});

// Active Navigation
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');

// Update active nav on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Smooth scroll and close mobile menu
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            
            // Close mobile menu
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        }
    });
});

// Search Functionality
const searchInput = document.getElementById('searchInput');
let searchTimeout;

searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // Reset all sections
            sections.forEach(section => {
                section.style.display = 'block';
                const elements = section.querySelectorAll('h2, h3, p, li');
                elements.forEach(el => {
                    el.style.background = 'none';
                });
            });
            return;
        }

        // Search and highlight
        sections.forEach(section => {
            const content = section.textContent.toLowerCase();
            const elements = section.querySelectorAll('h2, h3, p, li');
            let hasMatch = false;

            elements.forEach(el => {
                const text = el.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    hasMatch = true;
                    el.style.background = 'rgba(59, 130, 246, 0.1)';
                    el.style.borderRadius = '4px';
                    el.style.padding = '0.25rem';
                } else {
                    el.style.background = 'none';
                }
            });

            section.style.display = hasMatch ? 'block' : 'none';
        });
    }, 300);
});

// Copy Code Function
function copyCode(button) {
    const codeBlock = button.nextElementSibling;
    const code = codeBlock.textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.background = '#22c55e';
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = 'rgba(255, 255, 255, 0.1)';
        }, 2000);
    });
}

// Tab Switching
function switchTab(event, tabId) {
    const tabButtons = event.target.parentElement.querySelectorAll('.tab-btn');
    const tabContents = event.target.closest('.tabs').querySelectorAll('.tab-content');
    
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// Accordion Toggle
function toggleAccordion(button) {
    const item = button.parentElement;
    const allItems = document.querySelectorAll('.accordion-item');
    
    // Close all other items
    allItems.forEach(otherItem => {
        if (otherItem !== item) {
            otherItem.classList.remove('active');
        }
    });
    
    // Toggle current item
    item.classList.toggle('active');
}

// Scroll to Top Button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    left: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
    z-index: 1000;
    box-shadow: 0 4px 12px var(--shadow);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'translateY(-5px)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'translateY(0)';
});

// Print Functionality
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        window.print();
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // Alt + S for search
    if (e.altKey && e.key === 's') {
        e.preventDefault();
        searchInput.focus();
    }
    
    // Alt + T for theme toggle
    if (e.altKey && e.key === 't') {
        e.preventDefault();
        themeToggle.click();
    }
});

// Add tooltips to buttons
const buttons = document.querySelectorAll('button');
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// Add reading progress bar
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: var(--primary);
    width: 0%;
    z-index: 9999;
    transition: width 0.1s;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// Console Easter Egg
console.log('%c🚀 NutroCloud Documentation', 'color: #3b82f6; font-size: 24px; font-weight: bold;');
console.log('%cمرحباً بك في وثائق NutroCloud!', 'color: #22c55e; font-size: 16px;');
console.log('%cإذا كنت تبحث عن شيء معين، استخدم البحث أعلى الصفحة', 'color: #94a3b8; font-size: 14px;');

// Add keyboard shortcuts info
console.log('%cاختصارات لوحة المفاتيح:', 'color: #f59e0b; font-size: 14px; font-weight: bold;');
console.log('Alt + S: التركيز على البحث');
console.log('Alt + T: تبديل الوضع الليلي/النهاري');
console.log('Ctrl/Cmd + P: طباعة الصفحة');

// Update current year in footer
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Toggle collapsible section
function toggleSection(contentId) {
    const section = document.getElementById(contentId).closest('.collapsible-section');
    section.classList.toggle('open');
}