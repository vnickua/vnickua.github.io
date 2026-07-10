document.addEventListener('DOMContentLoaded', function () {
    // Логіка для акордеону проектів (завантаження з projects.json з резервним локальним копіюванням для CORS)
    const accordionContainer = document.getElementById('projects-accordion');

    if (accordionContainer) {
        // Резервні локальні дані на випадок CORS обмежень при локальному відкритті через file://
        const fallbackData = [
            {
                "id": 0,
                "title": "CreaTone",
                "url": "https://apps.apple.com/us/app/creatone-vibe-maker/id6782141531",
                "iphoneUrl": "https://apps.apple.com/us/app/creatone-vibe-maker/id6782141531",
                "androidUrl": "#",
                "subtitle": "прокидайся під улюблене",
                "logo": "img/creatone.png",
                "gradient": "linear-gradient(135deg, #a855f7, #ec4899)"
            },
            {
                "id": 1,
                "title": "AziVector",
                "url": "https://apps.apple.com/us/app/azivector-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D1%96-%D0%B7%D0%B0%D1%81%D1%96%D1%87%D0%BA%D0%B8/id6770594692",
                "iphoneUrl": "https://apps.apple.com/us/app/azivector-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D1%96-%D0%B7%D0%B0%D1%81%D1%96%D1%87%D0%BA%D0%B8/id6770594692",
                "androidUrl": "https://play.google.com/store/apps/details?id=com.azivector.navigation",
                "subtitle": "навігація всюди",
                "logo": "img/azivector.png",
                "gradient": "linear-gradient(135deg, #16a34a, #0d9488)"
            },
            {
                "id": 2,
                "title": "MapsON: карти завжди поруч!",
                "url": "https://apps.apple.com/ua/app/mapson-%D0%BA%D0%B0%D1%80%D1%82%D0%B8-%D0%B7%D0%B0%D0%B2%D0%B6%D0%B4%D0%B8-%D0%BF%D0%BE%D1%80%D1%83%D1%87/id6744530019?l=uk",
                "iphoneUrl": "https://apps.apple.com/ua/app/mapson-%D0%BA%D0%B0%D1%80%D1%82%D0%B8-%D0%B7%D0%B0%D0%B2%D0%B6%D0%B4%D0%B8-%D0%BF%D0%BE%D1%80%D1%83%D1%87/id6744530019?l=uk",
                "androidUrl": "#",
                "subtitle": "додатковий опис програми",
                "logo": "img/mapson.png",
                "gradient": "linear-gradient(135deg, #10b981, #334155)"
            },
            {
                "id": 3,
                "title": "WoodLog",
                "url": "https://apps.apple.com/ua/app/woodmaster-%D0%BB%D1%96%D1%81%D0%BE%D0%B2%D0%B8%D0%B9-%D0%BF%D0%BE%D0%BC%D1%96%D1%87%D0%BD%D0%B8%D0%BA/id6746112569",
                "iphoneUrl": "https://apps.apple.com/ua/app/woodmaster-%D0%BB%D1%96%D1%81%D0%BE%D0%B2%D0%B8%D0%B9-%D0%BF%D0%BE%D0%BC%D1%96%D1%87%D0%BD%D0%B8%D0%BA/id6746112569",
                "androidUrl": "https://play.google.com/store/apps/details?id=com.woodmaster.woodlog",
                "subtitle": "облік деревини",
                "logo": "img/woodlog.png",
                "gradient": "linear-gradient(135deg, #b45309, #78350f)"
            },
            {
                "id": 4,
                "title": "WoodMaster",
                "url": "https://apps.apple.com/ua/app/woodmaster-%D0%BB%D1%96%D1%81%D0%BE%D0%B2%D0%B8%D0%B9-%D0%BF%D0%BE%D0%BC%D1%96%D1%87%D0%BD%D0%B8%D0%BA/id6746112569",
                "iphoneUrl": "https://apps.apple.com/ua/app/woodmaster-%D0%BB%D1%96%D1%81%D0%BE%D0%B2%D0%B8%D0%B9-%D0%BF%D0%BE%D0%BC%D1%96%D1%87%D0%BD%D0%B8%D0%BA/id6746112569",
                "androidUrl": "https://play.google.com/store/apps/details?id=com.woodmaster.assistant",
                "subtitle": "майстер столярства",
                "logo": "img/woodmaster.png",
                "gradient": "linear-gradient(135deg, #ea580c, #9a3412)"
            }
        ];

        const renderAccordion = (data) => {
            accordionContainer.innerHTML = '';

            data.forEach((project, index) => {
                const item = document.createElement('div');
                item.className = `accordion-item${index === 2 ? ' active' : ''}`;
                item.dataset.index = index;
                item.style.setProperty('--bg-gradient', project.gradient);

                const initialZIndex = index <= 2 ? (10 + index) : (10 - index);
                item.style.zIndex = initialZIndex;

                const isIphoneDisabled = (!project.iphoneUrl && !project.url) || project.iphoneUrl === '#' || project.url === '#';
                const isAndroidDisabled = !project.androidUrl || project.androidUrl === '#';

                item.innerHTML = `
                    <div class="accordion-icon logo-icon">
                        <img src="${project.logo}" alt="${project.title}" class="app-logo-img">
                    </div>
                    <div class="accordion-content">
                        <h4 class="accordion-title">${project.title}</h4>
                        <p class="accordion-subtitle">${project.subtitle}</p>
                        <div class="accordion-links">
                            <a href="${isIphoneDisabled ? '#' : (project.iphoneUrl || project.url)}" target="_blank" class="accordion-link iphone-link${isIphoneDisabled ? ' disabled' : ''}">
                                <i class="fab fa-apple"></i> iPhone
                            </a>
                            <a href="${isAndroidDisabled ? '#' : project.androidUrl}" target="_blank" class="accordion-link android-link${isAndroidDisabled ? ' disabled' : ''}">
                                <i class="fab fa-android"></i> Android
                            </a>
                        </div>
                    </div>
                `;

                accordionContainer.appendChild(item);
            });

            const accordionItems = accordionContainer.querySelectorAll('.accordion-item');

            const updateAccordion = (activeIndex) => {
                accordionItems.forEach((item, index) => {
                    if (index === activeIndex) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                    const zIndex = index <= activeIndex ? (10 + index) : (10 - index);
                    item.style.zIndex = zIndex;
                });
            };

            accordionItems.forEach((item, index) => {
                item.addEventListener('click', () => {
                    updateAccordion(index);
                });
            });
        };

        // Завантажуємо JSON
        fetch('projects.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Помилка мережі');
                }
                return response.json();
            })
            .then(data => {
                renderAccordion(data);
            })
            .catch(error => {
                console.warn('Не вдалося завантажити projects.json (можливо CORS обмеження на file://), завантажуємо локальний резерв:', error);
                renderAccordion(fallbackData);
            });
    }
});
