document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        hamburger.innerHTML = nav.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            nav.classList.remove('active');
            if (hamburger.querySelector('i')) {
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Cursor Neón Personalizado
    const neonCursor = document.createElement('div');
    neonCursor.id = 'neon-cursor';
    document.body.appendChild(neonCursor);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    document.addEventListener('mousedown', () => {
        neonCursor.classList.add('clicking');
    });
    
    document.addEventListener('mouseup', () => {
        neonCursor.classList.remove('clicking');
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        
        neonCursor.style.left = cursorX - 12 + 'px';
        neonCursor.style.top = cursorY - 12 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();

    // Scroll Reveal Animations
    const scrollRevealElements = document.querySelectorAll('.service-card, .about-image, .section-title, .skills-list');
    
    scrollRevealElements.forEach(el => {
        el.classList.add('scroll-reveal');
    });
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            } else {
                entry.target.classList.remove('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px 50px 0px'
    });
    
    scrollRevealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    
    // Toggle al hacer click
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Tech Tips Generator
    const techTips = [
        "Haz copias de seguridad regularmente. La regla 3-2-1: 3 copias, 2 medios diferentes, 1 fuera de casa.",
        "Actualiza tus contraseñas cada 3-6 meses y usa un gestor de contraseñas como Bitwarden o 1Password.",
        "Reinicia tu router cada mes para mejorar el rendimiento y la seguridad de tu red doméstica.",
        "Limpia el polvo de tu PC cada 6 meses para evitar sobrecalentamiento y mejorar el rendimiento.",
        "Usa autenticación de dos factores (2FA) en todas tus cuentas importantes para mayor seguridad.",
        "No hagas click en enlaces sospechosos. Verifica siempre la URL antes de introducir credenciales.",
        "Mantén tu sistema operativo actualizado. Las actualizaciones incluyen parches de seguridad críticos.",
        "Desconecta dispositivos que no uses de la red para reducir puntos de vulnerabilidad.",
        "Usa una VPN en redes WiFi públicas para proteger tu información personal y navegación.",
        "Revisa los permisos de las apps móviles. Muchas piden acceso innecesario a tus datos.",
        "Haz una limpieza de archivos temporales cada mes para liberar espacio en disco.",
        "Desactiva el Bluetooth y WiFi cuando no los uses para ahorrar batería y mejorar seguridad.",
        "Instala un buen antivirus y mantenlo actualizado. Windows Defender es suficiente para la mayoría.",
        "Organiza tus cables con bridas o clips para evitar enredos y mejorar el flujo de aire.",
        "Aprende atajos de teclado. Ctrl+C, Ctrl+V, Ctrl+Z pueden ahorrarte mucho tiempo."
    ];
    
    let currentTipIndex = 0;
    const tipText = document.getElementById('tip-text');
    const nextTipButton = document.getElementById('next-tip');
    
    function showRandomTip() {
        currentTipIndex = Math.floor(Math.random() * techTips.length);
        tipText.textContent = techTips[currentTipIndex];
        nextTipButton.querySelector('i').style.transform = 'rotate(360deg)';
        setTimeout(() => {
            nextTipButton.querySelector('i').style.transform = 'rotate(0deg)';
        }, 500);
    }
    
    // Mostrar tip inicial
    showRandomTip();
    
    // Cambiar tip al hacer click
    nextTipButton.addEventListener('click', showRandomTip);
    
    // Auto-rotar cada 10 segundos
    setInterval(showRandomTip, 10000);

    // Quiz Interactivo
    const quizQuestions = [
        {
            question: '¿Cuál es tu principal problema tecnológico?',
            options: [
                { text: 'Mi ordenador va muy lento', service: 'mantenimiento' },
                { text: 'Necesito montar una red en casa/oficina', service: 'redes' },
                { text: 'Quiero crear una página web', service: 'web' },
                { text: 'No sé qué ordenador comprar', service: 'asesoria' }
            ]
        },
        {
            question: '¿Con qué frecuencia usas el ordenador?',
            options: [
                { text: 'Todo el día, es mi herramienta de trabajo', service: 'mantenimiento' },
                { text: 'Unas horas al día para temas personales', service: 'asesoria' },
                { text: 'Solo para navegar y redes sociales', service: 'redes' },
                { text: 'Principalmente para mi negocio online', service: 'web' }
            ]
        },
        {
            question: '¿Qué te preocupa más?',
            options: [
                { text: 'Que mi equipo falle y perder datos', service: 'mantenimiento' },
                { text: 'No tener buena conexión a internet', service: 'redes' },
                { text: 'No tener presencia online profesional', service: 'web' },
                { text: 'Gastar dinero en algo que no me sirva', service: 'asesoria' }
            ]
        },
        {
            question: '¿Qué tipo de usuario eres?',
            options: [
                { text: 'Básico - Solo uso lo esencial', service: 'asesoria' },
                { text: 'Intermedio - Me defiendo bien', service: 'mantenimiento' },
                { text: 'Avanzado - Pero necesito ayuda específica', service: 'redes' },
                { text: 'Emprendedor - Necesito herramientas profesionales', service: 'web' }
            ]
        },
        {
            question: '¿Cuál es tu presupuesto aproximado?',
            options: [
                { text: 'Menos de 50€', service: 'mantenimiento' },
                { text: 'Entre 50€ y 150€', service: 'redes' },
                { text: 'Entre 150€ y 500€', service: 'web' },
                { text: 'Primero quiero saber qué necesito', service: 'asesoria' }
            ]
        }
    ];

    const serviceResults = {
        mantenimiento: {
            name: ' Mantenimiento y Reparación',
            description: 'Tu equipo necesita una puesta a punto. Puedo optimizarlo, limpiarlo y dejarlo como nuevo.'
        },
        redes: {
            name: ' Configuración de Redes',
            description: 'Te ayudo a montar y configurar tu red para que tengas la mejor conexión posible.'
        },
        web: {
            name: ' Desarrollo Web',
            description: 'Creo tu página web profesional para que tu negocio destaque online.'
        },
        asesoria: {
            name: ' Asesoría Tecnológica',
            description: 'Te aconsejo sobre qué comprar y cómo sacar el máximo partido a tu tecnología.'
        }
    };

    let currentQuestion = 0;
    let answers = [];

    function initQuiz() {
        currentQuestion = 0;
        answers = [];
        document.getElementById('quiz-result').style.display = 'none';
        document.getElementById('quiz-question').style.display = 'block';
        showQuestion();
    }

    function showQuestion() {
        const q = quizQuestions[currentQuestion];
        document.getElementById('question-text').textContent = q.question;
        document.getElementById('current-q').textContent = currentQuestion + 1;
        document.getElementById('total-q').textContent = quizQuestions.length;
        document.getElementById('quiz-progress').style.width = ((currentQuestion + 1) / quizQuestions.length * 100) + '%';
        
        const optionsContainer = document.getElementById('quiz-options');
        optionsContainer.innerHTML = '';
        
        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.textContent = opt.text;
            btn.onclick = () => selectAnswer(opt.service);
            optionsContainer.appendChild(btn);
        });
    }

    function selectAnswer(service) {
        answers.push(service);
        
        if (currentQuestion < quizQuestions.length - 1) {
            currentQuestion++;
            showQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        const counts = {};
        answers.forEach(a => counts[a] = (counts[a] || 0) + 1);
        const winner = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
        
        document.getElementById('quiz-question').style.display = 'none';
        document.getElementById('quiz-result').style.display = 'block';
        document.getElementById('result-service').textContent = serviceResults[winner].name;
        document.getElementById('result-description').textContent = serviceResults[winner].description;
    }

    function restartQuiz() {
        initQuiz();
    }

    // Iniciar quiz cuando el DOM esté listo
    if (document.getElementById('quiz-options')) {
        initQuiz();
    }
    // Event listener para botón de reinicio
    const restartBtn = document.getElementById('restart-quiz');
    if (restartBtn) {
        restartBtn.addEventListener('click', initQuiz);
    }
});







