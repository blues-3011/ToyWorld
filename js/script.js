/* ==========================================================
   ASSIGNMENT XÂY DỰNG TRANG WEB - TOYWORLD JAVASCRIPT
   Y4: SLIDESHOW, LIGHTBOX, CHATBOX, RESPONSIVE MENU
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ------------------------------------------------------
       1. SLIDESHOW TỰ ĐỘNG CHUYỂN BANNER (Y4)
       ------------------------------------------------------ */
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetSlideTimer();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetSlideTimer();
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            showSlide(index);
            resetSlideTimer();
        });
    });

    function startSlideTimer() {
        slideInterval = setInterval(nextSlide, 5000); // 5s đổi slide
    }

    function resetSlideTimer() {
        clearInterval(slideInterval);
        startSlideTimer();
    }

    startSlideTimer();


    /* ------------------------------------------------------
       2. LIGHTBOX PHÓNG TO ẢNH SẢN PHẨM (Y4)
       ------------------------------------------------------ */
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const triggerButtons = document.querySelectorAll('.lightbox-trigger');

    triggerButtons.forEach(button => {
        button.addEventListener('click', () => {
            const imgSrc = button.getAttribute('data-src') || button.getAttribute('src');
            const title = button.getAttribute('data-title') || button.getAttribute('alt');
            
            lightboxImage.src = imgSrc;
            lightboxCaption.textContent = title;
            lightboxModal.classList.add('active');
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightboxModal.classList.remove('active');
        });
    }

    // Đóng khi click ngoài ảnh hoặc bấm ESC
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            lightboxModal.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
            lightboxModal.classList.remove('active');
        }
    });


    /* ------------------------------------------------------
       3. MENU TOGGLE TRÊN THIẾT BỊ DI ĐỘNG (Y4 - Responsive)
       ------------------------------------------------------ */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
        });
    });


    /* ------------------------------------------------------
       4. TIỆN ÍCH LIVE CHATBOX TƯƠNG TÁC (Y4)
       ------------------------------------------------------ */
    const chatToggleBtn = document.getElementById('chatToggleBtn');
    const chatCloseBtn = document.getElementById('chatCloseBtn');
    const chatWindow = document.getElementById('chatWindow');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatBody = document.getElementById('chatBody');

    if (chatToggleBtn && chatWindow) {
        chatToggleBtn.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
        });

        chatCloseBtn.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });

        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = chatInput.value.trim();
            if (!message) return;

            // Thêm tin nhắn của User
            const userMsg = document.createElement('div');
            userMsg.className = 'chat-msg user';
            userMsg.textContent = message;
            chatBody.appendChild(userMsg);
            chatInput.value = '';

            // Tự động cuộn xuống cuối
            chatBody.scrollTop = chatBody.scrollHeight;

            // Bot trả lời tự động mô phỏng sau 800ms
            setTimeout(() => {
                const botMsg = document.createElement('div');
                botMsg.className = 'chat-msg bot';
                botMsg.textContent = 'Dạ ToyWorld đã nhận được tin nhắn! Chuyên viên sẽ gọi điện tư vấn chi tiết cho ba mẹ ngay ạ ❤️';
                chatBody.appendChild(botMsg);
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 800);
        });
    }


    /* ------------------------------------------------------
       5. NÚT BACK TO TOP & FORM LIÊN HỆ (Y1)
       ------------------------------------------------------ */
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('fullName').value;
            alert(`Cảm ơn bạn ${name}! ToyWorld đã tiếp nhận thông tin và sẽ liên hệ lại sớm nhất.`);
            contactForm.reset();
        });
    }
});