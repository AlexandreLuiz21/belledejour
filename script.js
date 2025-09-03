// Animações e interatividade do biosite
document.addEventListener('DOMContentLoaded', function() {
    // Carregar dados salvos do admin
    loadSavedData();
    
    // Função para carregar dados do localStorage
    function loadSavedData() {
        const savedData = localStorage.getItem('belleDeJourData');
        if (savedData) {
            try {
                const siteData = JSON.parse(savedData);
                console.log('📊 Carregando dados salvos:', siteData);
                
                // Atualizar imagem de perfil - FORÇAR LOGO CORRETA
                const profileImg = document.querySelector('.profile-image img');
                if (profileImg) {
                    // Sempre usar a logo correta, ignorando dados salvos
                    profileImg.src = 'img/logo.jpg';
                    profileImg.alt = siteData.profile?.brandName || 'Belle de Jour - Seu Estilo Oficial';
                    console.log('🖼️ Logo correta forçada: img/logo.jpg');
                }
                
                // Atualizar nome da marca
                const brandName = document.querySelector('.brand-name');
                if (brandName && siteData.profile?.brandName) {
                    brandName.textContent = siteData.profile.brandName;
                    console.log('📝 Nome da marca atualizado');
                }
                
                // Atualizar biografia
                const bio = document.querySelector('.bio');
                if (bio && siteData.profile?.bio) {
                    bio.textContent = siteData.profile.bio;
                    console.log('📄 Biografia atualizada');
                }
                
                // Atualizar título da página
                if (siteData.profile?.brandName) {
                    document.title = `${siteData.profile.brandName} - Biosite Oficial`;
                }
                
                console.log('✅ Dados carregados e aplicados com sucesso!');
            } catch (error) {
                console.error('❌ Erro ao carregar dados salvos:', error);
            }
        } else {
            console.log('ℹ️ Nenhum dado salvo encontrado, usando dados padrão');
        }
    }
    // Animação de entrada suave para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animação a todas as seções
    const sections = document.querySelectorAll('.products-section, .marketplaces-section, .vip-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    // Efeito de hover nos cards de produtos
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efeito de clique nos botões
    const buttons = document.querySelectorAll('.marketplace-btn, .whatsapp-btn, .vip-social');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Efeito de ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Animação de rotação contínua para o ícone de coroa
    const crownIcon = document.querySelector('.vip-section .fa-crown');
    if (crownIcon) {
        setInterval(() => {
            crownIcon.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                crownIcon.style.transform = 'rotate(0deg)';
            }, 1000);
        }, 5000);
    }

    // Efeito de brilho nos ícones sociais
    const socialIcons = document.querySelectorAll('.social-icon, .vip-social');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.6)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });

    // Smooth scroll para links internos (se houver)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efeito de loading para imagens
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Se a imagem já estiver carregada
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
    });

    // Adicionar efeito de partículas douradas (opcional)
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #d4af37;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            opacity: 0.7;
            animation: float 3s ease-out forwards;
        `;
        
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 3000);
    }

    // Criar partículas ocasionalmente
    setInterval(createParticle, 2000);

    // Adicionar CSS para animação das partículas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.7;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .fa-crown {
            transition: transform 1s ease-in-out;
        }
    `;
    document.head.appendChild(style);

    // Console log estilizado
    console.log('%c🌟 Seu Estilo Oficial - Biosite carregado com sucesso! 🌟', 
        'color: #d4af37; font-size: 16px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
});

// Função para compartilhar (pode ser expandida)
function shareProfile() {
    if (navigator.share) {
        navigator.share({
            title: 'Seu Estilo Oficial',
            text: 'Confira os looks mais incríveis da Seu Estilo Oficial!',
            url: window.location.href
        });
    } else {
        // Fallback para copiar URL
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Link copiado para a área de transferência!');
        });
    }
}

// Função para analytics simples (pode ser integrada com Google Analytics)
function trackClick(element, action) {
    console.log(`Clique registrado: ${action} em ${element}`);
    // Aqui você pode integrar com Google Analytics ou outra ferramenta
    // gtag('event', 'click', { 'event_category': 'engagement', 'event_label': action });
}