document.addEventListener('DOMContentLoaded', function() {
    // Получаем сохраненные данные
    const portfolioData = JSON.parse(localStorage.getItem('portfolioData'));
    
    if (!portfolioData) {
        alert('Данные не найдены. Пожалуйста, заполните форму сначала.');
        window.location.href = 'index.html';
        return;
    }
    
    // Применяем выбранную тему
    applyTheme(portfolioData.theme);
    document.getElementById('theme-selector').value = portfolioData.theme;
    
    // Заполняем данные
    document.getElementById('portfolio-name').textContent = portfolioData.name;
    document.getElementById('portfolio-job').textContent = portfolioData.job;
    document.getElementById('about-text').textContent = portfolioData.about;
    document.getElementById('contact-email').textContent = portfolioData.email;
    document.getElementById('contact-email').href = `mailto:${portfolioData.email}`;
    
    // Заполняем навыки
    const skillsList = document.getElementById('skills-list');
    portfolioData.skills.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'skill';
        skillElement.textContent = skill;
        skillsList.appendChild(skillElement);
    });
    
    // Заполняем проекты
    const projectsGrid = document.getElementById('projects-grid');
    portfolioData.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <h3>${project}</h3>
            <p>Описание проекта может быть здесь. Расскажите подробнее о том, что вы делали в этом проекте, какие технологии использовали и каких результатов достигли.</p>
        `;
        projectsGrid.appendChild(projectCard);
    });
    
    // Обработчик изменения темы
    document.getElementById('theme-selector').addEventListener('change', function() {
        applyTheme(this.value);
    });
    
    // Применение темы
    function applyTheme(theme) {
        const portfolioTheme = document.getElementById('portfolio-theme');
        
        // Удаляем все классы тем
        portfolioTheme.classList.remove(
            'theme-minimal',
            'theme-creative',
            'theme-tech',
            'theme-elegant'
        );
        
        // Добавляем выбранную тему
        portfolioTheme.classList.add(`theme-${theme}`);
    }
    
    // Анимация появления секций при скролле
    const animateSections = () => {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionPosition = section.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (sectionPosition < screenPosition) {
                section.classList.add('visible');
            }
        });
    };
    
    window.addEventListener('scroll', animateSections);
    animateSections(); // Запустить при загрузке
    
    // Плавный переход между темами
    const themeSelector = document.getElementById('theme-selector');
    themeSelector.addEventListener('change', function() {
        document.getElementById('portfolio-theme').style.opacity = '0.5';
        
        setTimeout(() => {
            applyTheme(this.value);
            document.getElementById('portfolio-theme').style.opacity = '1';
        }, 300);
    });
    
    // Добавляем частицы для фона
    createParticles();
});

function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-background';
    document.getElementById('portfolio-theme').appendChild(particlesContainer);
    
    const particleCount = window.innerWidth < 768 ? 20 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Случайные параметры
        const size = Math.random() * 5 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        const opacity = Math.random() * 0.6 + 0.2;
        
        // Применяем стили
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.background = 'currentColor';
        particle.style.opacity = opacity;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        particlesContainer.appendChild(particle);
    }
    
    // Добавляем стили для анимации частиц
    const style = document.createElement('style');
    style.textContent = `
        .particles-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: -1;
        }
        
        .particle {
            position: absolute;
            border-radius: 50%;
            opacity: 0;
            animation: float linear infinite;
        }
        
        @keyframes float {
            0% {
                transform: translate(0, 0) scale(1);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}