/* ==========================================================
   ASSIGNMENT TOYWORLD MULTI-PAGES JAVASCRIPT
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* 1. SLIDESHOW (Chỉ chạy trên trang nào có hero banner) */
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');

    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        function showSlide(index) {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            if (dots[currentSlide]) dots[currentSlide].classList.add('active');
        }

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => { showSlide(currentSlide + 1); resetTimer(); });
            prevBtn.addEventListener('click', () => { showSlide(currentSlide - 1); resetTimer(); });
        }

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                showSlide(parseInt(e.target.dataset.index));
                resetTimer();
            });
        });

        function resetTimer() {
            clearInterval(slideInterval);
            slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
        }
        slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
    }

    /* 2. LIGHTBOX PHÓNG TO ẢNH */
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    document.querySelectorAll('.lightbox-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            const src = btn.getAttribute('data-src') || btn.getAttribute('src');
            const title = btn.getAttribute('data-title') || btn.getAttribute('alt');
            if (lightboxImage && lightboxModal) {
                lightboxImage.src = src;
                lightboxCaption.textContent = title;
                lightboxModal.classList.add('active');
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => lightboxModal.classList.remove('active'));
    }
    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) lightboxModal.classList.remove('active');
        });
    }

    /* 3. MENU TOGGLE TRÊN ĐIỆN THOẠI */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navbar = document.getElementById('navbar');
    if (mobileToggle && navbar) {
        mobileToggle.addEventListener('click', () => navbar.classList.toggle('active'));
    }

    /* 4. CHATBOX WIDGET */
    const chatToggleBtn = document.getElementById('chatToggleBtn');
    const chatCloseBtn = document.getElementById('chatCloseBtn');
    const chatWindow = document.getElementById('chatWindow');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatBody = document.getElementById('chatBody');

    if (chatToggleBtn && chatWindow) {
        chatToggleBtn.addEventListener('click', () => chatWindow.classList.toggle('active'));
        chatCloseBtn.addEventListener('click', () => chatWindow.classList.remove('active'));

        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (!text) return;

            const uMsg = document.createElement('div');
            uMsg.className = 'chat-msg user';
            uMsg.textContent = text;
            chatBody.appendChild(uMsg);
            chatInput.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;

            setTimeout(() => {
                const bMsg = document.createElement('div');
                bMsg.className = 'chat-msg bot';
                bMsg.textContent = 'ToyWorld đã tiếp nhận câu hỏi của ba mẹ! Chuyên viên sẽ gọi điện tư vấn ngay ạ ❤️';
                chatBody.appendChild(bMsg);
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 700);
        });
    }

    /* 5. BACK TO TOP & FORM LIÊN HỆ */
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (backToTop) {
            if (window.scrollY > 400) backToTop.classList.add('show');
            else backToTop.classList.remove('show');
        }
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Cảm ơn quý khách! ToyWorld đã nhận được thông tin liên hệ và sẽ phản hồi sớm nhất.');
            contactForm.reset();
        });
    }
});