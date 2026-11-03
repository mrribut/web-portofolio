(() => {
    const body = document.body;
    const themeToggles = ['theme-toggle', 'theme-toggle-mobile', 'theme-toggle-menu'].map(id => document.getElementById(id)).filter(Boolean);
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

    function applyTheme(theme) {
        const dark = theme === 'dark';
        body.classList.toggle('dark-mode', dark);
        themeToggles.forEach(button => {
            const icon = button.querySelector('i');
            if (icon) icon.className = `fas ${dark ? 'fa-sun' : 'fa-moon'}`;
            button.setAttribute('aria-pressed', String(dark));
            button.setAttribute('aria-label', dark ? 'Aktifkan tema terang' : 'Aktifkan tema gelap');
            button.title = dark ? 'Aktifkan tema terang' : 'Aktifkan tema gelap';
        });
    }

    let savedTheme = null;
    try { savedTheme = localStorage.getItem('theme'); } catch (_) { /* localStorage may be unavailable */ }
    applyTheme(savedTheme === 'dark-mode' || savedTheme === 'dark' ? 'dark' : savedTheme === 'light-mode' || savedTheme === 'light' ? 'light' : systemTheme.matches ? 'dark' : 'light');
    themeToggles.forEach(themeToggle => themeToggle.addEventListener('click', () => {
        const next = body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(next);
        try { localStorage.setItem('theme', next); } catch (_) { /* keep the current page usable */ }
    }));
    systemTheme.addEventListener?.('change', event => {
        let preference = null;
        try { preference = localStorage.getItem('theme'); } catch (_) { /* ignore */ }
        if (!preference) applyTheme(event.matches ? 'dark' : 'light');
    });

    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    menuButton?.addEventListener('click', () => {
        const open = mobileMenu.classList.toggle('hidden') === false;
        menuButton.setAttribute('aria-expanded', String(open));
    });
    const siteNav = document.getElementById('site-nav');
    let previousScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const mobileMenuOpen = mobileMenu && !mobileMenu.classList.contains('hidden');
        if (siteNav) {
            if (currentScrollY < 100 || mobileMenuOpen || currentScrollY < previousScrollY - 5) {
                siteNav.classList.remove('nav-hidden');
            } else if (currentScrollY > previousScrollY + 5) {
                siteNav.classList.add('nav-hidden');
            }
        }
        previousScrollY = currentScrollY;
    }, { passive: true });
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', event => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
            mobileMenu?.classList.add('hidden');
            menuButton?.setAttribute('aria-expanded', 'false');
        });
    });

    // Tambahkan sertifikat di sini; image dan fullImage dapat menunjuk file gambar lokal.
    const certificates = [
        { title: 'EPT', issuer: 'Sertifikasi Bahasa Inggris', year: '2026', image: './assets/img/sertif1.jpg', fullImage: './assets/img/sertif1.jpg', alt: 'Thumbnail contoh sertifikat 1. Ganti dengan gambar sertifikat Anda.' },
        { title: 'AI Ignition Training', issuer: 'Kumpul', year: '2025', image: './assets/img/sertif2.jpg', fullImage: './assets/img/sertif2.jpg', alt: 'Thumbnail contoh sertifikat 2. Ganti dengan gambar sertifikat Anda.' },
        { title: 'Analisis Sentiment', issuer: 'UDB', year: '2023', image: './assets/img/sertif3.jpg', fullImage: './assets/img/sertif3.jpg', alt: 'Thumbnail contoh sertifikat 3. Ganti dengan gambar sertifikat Anda.' },
        { title: 'Enterprise Digital', issuer: 'UDB', year: '2026', image: './assets/img/sertif4.jpg', fullImage: './assets/img/sertif4.jpg', alt: 'Thumbnail contoh sertifikat 4. Ganti dengan gambar sertifikat Anda.' },
        { title: 'AI For Web Programming', issuer: 'UDB', year: '2023', image: './assets/img/sertif5.jpg', fullImage: './assets/img/sertif5.jpg', alt: 'Thumbnail contoh sertifikat 5. Ganti dengan gambar sertifikat Anda.' },
        { title: 'The Effect of Computer Science', issuer: 'UDB', year: '2025', image: './assets/img/sertif6.jpg', fullImage: './assets/img/certificate-example.svg', alt: 'Thumbnail contoh sertifikat 6. Ganti dengan gambar sertifikat Anda.' }
    ];
    const certificateGrid = document.getElementById('certificate-grid');
    const dialog = document.getElementById('certificate-dialog');
    const dialogImage = document.getElementById('certificate-dialog-image');
    const dialogTitle = document.getElementById('certificate-dialog-title');
    if (certificateGrid) {
        certificateGrid.innerHTML = certificates.map((certificate, index) => `
            <article class="glass-effect card-hover rounded-xl p-5 certificate-card" style="--card-order: ${index}">
                <a class="certificate-link" href="${certificate.fullImage}" data-certificate-index="${index}" aria-label="Perbesar gambar ${certificate.title}">
                    <img class="certificate-image w-full rounded-lg" src="${certificate.image}" alt="${certificate.alt}" loading="lazy">
                </a>
                <h3 class="text-xl font-semibold mt-4 mb-1">${certificate.title}</h3>
                <p class="text-gray-600">${certificate.issuer}</p>
                <p class="text-sm text-gray-500 mt-1">${certificate.year}</p>
            </article>`).join('');
        if ('IntersectionObserver' in window) {
            const certificateObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    entry.target.classList.toggle('is-visible', entry.isIntersecting);
                });
            }, { threshold: 0.15 });
            certificateGrid.querySelectorAll('.certificate-card').forEach(card => certificateObserver.observe(card));
        } else {
            certificateGrid.querySelectorAll('.certificate-card').forEach(card => card.classList.add('is-visible'));
        }
        certificateGrid.addEventListener('click', event => {
            const link = event.target.closest('[data-certificate-index]');
            if (!link) return;
            const certificate = certificates[Number(link.dataset.certificateIndex)];
            if (!dialog || typeof dialog.showModal !== 'function') return;
            event.preventDefault();
            dialogImage.src = certificate.fullImage;
            dialogImage.alt = certificate.alt;
            dialogTitle.textContent = certificate.title;
            dialog.showModal();
        });
    }
    document.getElementById('certificate-dialog-close')?.addEventListener('click', () => dialog?.close());
    dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

    const scrollTop = document.getElementById('scroll-to-top-btn');
    const updateScrollButton = () => scrollTop?.classList.toggle('show', window.scrollY > 300);
    window.addEventListener('scroll', updateScrollButton, { passive: true });
    updateScrollButton();
    scrollTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();
