// ===== AOS初期化 =====
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// ===== パーティクル設定 =====
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ['#00d9ff', '#ff00ff', '#00ff88']
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00d9ff',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 200,
                line_linked: {
                    opacity: 0.5
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// ===== ヘッダースクロール効果 =====
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== カウントアップアニメーション =====
const animateCounter = (element) => {
    const target = parseFloat(element.dataset.count);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target % 1 === 0 ? target.toLocaleString() : target.toFixed(1);
        }
    };
    
    updateCounter();
};

// IntersectionObserverで統計カウンター開始
const statNumbers = document.querySelectorAll('.stat-number');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            animateCounter(entry.target);
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

statNumbers.forEach(stat => statObserver.observe(stat));

// ===== スムーズスクロール =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== コマンド検索機能 =====
const commandSearch = document.getElementById('commandSearch');
const commandCards = document.querySelectorAll('.command-card');

if (commandSearch) {
    commandSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        commandCards.forEach(card => {
            const commandName = card.querySelector('.command-name').textContent.toLowerCase();
            const commandDesc = card.querySelector('.command-desc').textContent.toLowerCase();
            
            if (commandName.includes(searchTerm) || commandDesc.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// ===== カテゴリーフィルター =====
const tabButtons = document.querySelectorAll('.tab-btn');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // アクティブ状態を更新
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const category = button.dataset.category;
        
        commandCards.forEach(card => {
            const cardCategory = card.dataset.category;
            
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        });
        
        // 検索フィールドをクリア
        if (commandSearch) {
            commandSearch.value = '';
        }
    });
});

// ===== トップに戻るボタン =====
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== モバイルメニュー =====
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

// ===== フェードインアニメーション用CSS追加 =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===== カーソル追従エフェクト（オプション）=====
const createCursorTrail = () => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);
    
    document.addEventListener('mousemove', (e) => {
        const newTrail = trail.cloneNode();
        newTrail.style.left = e.clientX + 'px';
        newTrail.style.top = e.clientY + 'px';
        document.body.appendChild(newTrail);
        
        setTimeout(() => {
            newTrail.remove();
        }, 1000);
    });
};

// カーソルエフェクトのスタイル
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .cursor-trail {
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 217, 255, 0.3), transparent);
        pointer-events: none;
        z-index: 9999;
        animation: trailFade 1s ease-out forwards;
    }
    
    @keyframes trailFade {
        to {
            opacity: 0;
            transform: scale(2);
        }
    }
`;
document.head.appendChild(cursorStyle);

// デスクトップのみでカーソルエフェクトを有効化
if (window.innerWidth > 768) {
    createCursorTrail();
}

// ===== ページ読み込み完了時 =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // プリローダーがあれば削除
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 500);
    }
});

// ===== コンソールメッセージ =====
console.log('%c🛡️ 荒らし対策庁', 'font-size: 32px; font-weight: bold; background: linear-gradient(135deg, #00d9ff, #ff00ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%c荒らしを今すぐ削除する超最強Discord Bot', 'font-size: 14px; color: #00d9ff;');
console.log('%cDiscord: https://discord.gg/hWcJrw5DUc', 'font-size: 12px; color: #b0b0c0;');
console.log('%cGitHub: https://github.com/kurokamiboykunn2000-ops', 'font-size: 12px; color: #b0b0c0;');