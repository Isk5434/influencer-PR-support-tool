// Sample post data for carousel
const posts = [
    {
        text: `今日のリップは @brandname の新作💄✨

つけた瞬間、唇がふっくら見える気がして嬉しい🥰
発色も綺麗で、1日中色持ちが良かったです！

気になる方はぜひチェックしてみてね💕

#PR #コスメ好きさんと繋がりたい #今日のメイク`
    },
    {
        text: `@brandname のセラムを使い始めました🌿

テクスチャーがとても軽くて、肌にすっと馴染みます。
使用感が心地よく、毎日のスキンケアが楽しみになりました✨

詳しくはプロフィールのリンクからご覧ください。

#PR #スキンケア #美容好きな人と繋がりたい`
    },
    {
        text: `@brandname の新作パレット使ってみた👀💫

色の組み合わせが可愛すぎて、毎日違うメイクを楽しんでる！
粉質も柔らかくて使いやすいよ〜🎨

気になったらストーリーズもチェックしてね！

#PR #アイメイク #コスメレビュー`
    }
];

let currentSlide = 0;
let carouselInterval;

// Initialize carousel
function initCarousel() {
    const carousel = document.getElementById('postCarousel');
    
    // Create slides
    posts.forEach((post, index) => {
        const slide = document.createElement('div');
        slide.className = 'post-slide';
        if (index === 0) slide.classList.add('active');
        slide.textContent = post.text;
        carousel.appendChild(slide);
    });
    
    // Start auto-rotation
    startCarousel();
}

// Start carousel auto-rotation
function startCarousel() {
    carouselInterval = setInterval(() => {
        nextSlide();
    }, 4000); // Change slide every 4 seconds
}

// Stop carousel
function stopCarousel() {
    clearInterval(carouselInterval);
}

// Next slide
function nextSlide() {
    const slides = document.querySelectorAll('.post-slide');
    slides[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + 1) % posts.length;
    slides[currentSlide].classList.add('active');
}

// Copy to clipboard functionality
function setupCopyButton() {
    const copyBtn = document.getElementById('copyBtn');
    
    copyBtn.addEventListener('click', () => {
        const activeSlide = document.querySelector('.post-slide.active');
        const textToCopy = activeSlide.textContent;
        
        // Copy to clipboard
        navigator.clipboard.writeText(textToCopy).then(() => {
            showToast();
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    });
}

// Show toast notification
function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// Generate button functionality
function setupGenerateButton() {
    const generateBtn = document.getElementById('generateBtn');
    
    generateBtn.addEventListener('click', () => {
        // Add loading state
        generateBtn.classList.add('loading');
        
        // Simulate AI generation (2 seconds)
        setTimeout(() => {
            generateBtn.classList.remove('loading');
            
            // Move to next slide to show "new" generated content
            nextSlide();
            
            // Restart carousel timer
            stopCarousel();
            startCarousel();
        }, 2000);
    });
}

// Intersection Observer for scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe example cards
    const cards = document.querySelectorAll('.example-card');
    cards.forEach(card => observer.observe(card));
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    setupCopyButton();
    setupGenerateButton();
    setupScrollAnimations();
});

// Pause carousel when user hovers over phone mockup
const phoneMockup = document.querySelector('.phone-mockup');
if (phoneMockup) {
    phoneMockup.addEventListener('mouseenter', stopCarousel);
    phoneMockup.addEventListener('mouseleave', startCarousel);
}
