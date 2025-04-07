document.addEventListener('DOMContentLoaded', function() {
    // Кастомный курсор
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });
    
    // Эффект при наведении на ссылки и кнопки
    const hoverElements = document.querySelectorAll('a, button, .portfolio-item, .card');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });
    
    // Меню для мобильных устройств
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Плавный скролл для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Закрываем меню на мобильных
                if (navLinks.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // Анимация при скролле
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate__animated');
        
        elements.forEach((el, index) => {
            const elementPosition = el.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                el.classList.add(el.classList[1]);
                el.style.animationDelay = `${index * 0.1}s`;
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Запустить при загрузке
    
    // Эффект для шапки при скролле
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Многостраничная форма
    const formSteps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    
    nextButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const currentStep = button.closest('.form-step');
            const nextStepNum = button.getAttribute('data-next');
            const nextStep = document.querySelector(`.form-step[data-step="${nextStepNum}"]`);
            
            if (validateStep(currentStep)) {
                currentStep.classList.remove('active');
                nextStep.classList.add('active');
                window.scrollTo({
                    top: nextStep.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    prevButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const currentStep = button.closest('.form-step');
            const prevStepNum = button.getAttribute('data-prev');
            const prevStep = document.querySelector(`.form-step[data-step="${prevStepNum}"]`);
            
            currentStep.classList.remove('active');
            prevStep.classList.add('active');
            window.scrollTo({
                top: prevStep.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
    
    // Валидация шага формы
    function validateStep(step) {
        let isValid = true;
        const inputs = step.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#ff6b6b';
                isValid = false;
                
                // Убираем подсветку при исправлении
                input.addEventListener('input', () => {
                    if (input.value.trim()) {
                        input.style.borderColor = '';
                    }
                });
            }
        });
        
        if (!isValid) {
            alert('Пожалуйста, заполните все обязательные поля');
        }
        
        return isValid;
    }
    
    // Обработка формы
    const portfolioForm = document.getElementById('portfolio-form');
    
    portfolioForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Собираем данные
        const portfolioData = {
            name: document.getElementById('name').value,
            job: document.getElementById('job').value,
            about: document.getElementById('about').value,
            skills: document.getElementById('skills').value.split(',').map(skill => skill.trim()),
            projects: document.getElementById('projects').value.split(',').map(project => project.trim()),
            email: document.getElementById('email').value,
            theme: document.getElementById('theme').value
        };
        
        // Сохраняем данные
        localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
        
        // Перенаправляем на страницу портфолио
        window.location.href = 'portfolio.html';
    });
    
    // Предпросмотр тем при наведении на примеры
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const theme = item.getAttribute('data-theme');
            document.getElementById('theme').value = theme;
            
            // Прокрутка к форме
            document.querySelector('#start').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Создаем частицы для фона
    createParticles();
});

function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Случайные параметры
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        const color = `rgba(110, 142, 251, ${Math.random() * 0.4 + 0.1})`;
        
        // Применяем стили
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.background = color;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        particlesContainer.appendChild(particle);
    }
    
    // Добавляем стили для анимации частиц
    const style = document.createElement('style');
    style.textContent = `
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
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}