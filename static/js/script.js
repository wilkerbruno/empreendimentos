// Dados dos empreendimentos (simulando uma base de dados)
const empreendimentos = [
    {
        id: 1,
        nome: "UPTOWN",
        bairro: "savassi",
        status: "lancamento",
        tipologia: "3-suites",
        suites: "3 suítes",
        area: "120,54 m²",
        vagas: "2 vagas",
        preco: "R$ 850.000",
        porcentagemObra: 100,
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=250&fit=crop"
    },
    {
        id: 2,
        nome: "DOWNTOWN",
        bairro: "lourdes",
        status: "em-construcao",
        tipologia: "2-suites",
        suites: "2 suítes",
        area: "67,84 a 128,26 m²",
        vagas: "2 vagas",
        preco: "R$ 650.000",
        porcentagemObra: 25,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=250&fit=crop"
    },
    {
        id: 3,
        nome: "PARADISO LOURDES",
        bairro: "lourdes",
        status: "pronto",
        tipologia: "2-suites",
        suites: "2 e 3 suítes",
        area: "75,90 a 128,94 m²",
        vagas: "2 vagas",
        preco: "R$ 720.000",
        porcentagemObra: 35,
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=250&fit=crop"
    },
    {
        id: 4,
        nome: "ELITE CENTER",
        bairro: "centro",
        status: "financiado",
        tipologia: "1-suite",
        suites: "1 suíte",
        area: "45,30 m²",
        vagas: "1 vaga",
        preco: "R$ 380.000",
        porcentagemObra: 45,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=250&fit=crop"
    },
    {
        id: 5,
        nome: "BELVEDERE RESIDENCE",
        bairro: "belvedere",
        status: "lancamento",
        tipologia: "4-suites",
        suites: "4 suítes",
        area: "180,75 m²",
        vagas: "3 vagas",
        preco: "R$ 1.200.000",
        porcentagemObra: 50,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=250&fit=crop"
    },
    {
        id: 6,
        nome: "FUNCIONÁRIOS TOWER",
        bairro: "funcionarios",
        status: "em-construcao",
        tipologia: "2-suites",
        suites: "2 suítes",
        area: "85,40 m²",
        vagas: "2 vagas",
        preco: "R$ 580.000",
        porcentagemObra: 60,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=250&fit=crop"
    }
];

// Estado atual dos filtros
let currentFilters = {
    bairro: '',
    status: '',
    tipologia: ''
};

// Inicialização da página
document.addEventListener('DOMContentLoaded', function() {
    loadEmpreendimentos();
    initializeEventListeners();
    initializeAnimations();
});

// Event Listeners
function initializeEventListeners() {
    // Menu mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scroll para links internos
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

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// Carregar empreendimentos
function loadEmpreendimentos(filteredData = null) {
    const grid = document.getElementById('empreendimentos-grid');
    const loading = document.getElementById('loading');
    const noResults = document.getElementById('no-results');
    
    // Mostrar loading
    loading.style.display = 'block';
    grid.innerHTML = '';
    noResults.style.display = 'none';
    
    // Simular delay de carregamento
    setTimeout(() => {
        const data = filteredData || empreendimentos;
        
        loading.style.display = 'none';
        
        if (data.length === 0) {
            noResults.style.display = 'block';
            return;
        }
        
        data.forEach((empreendimento, index) => {
            const card = createEmpreendimentoCard(empreendimento);
            grid.appendChild(card);
            
            // Animação de entrada escalonada
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 800);
}

// Criar card de empreendimento
function createEmpreendimentoCard(empreendimento) {
    const card = document.createElement('div');
    card.className = 'empreendimento-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    
    const statusLabels = {
        'lancamento': 'ÚLTIMAS UNIDADES',
        'em-construcao': 'EM CONSTRUÇÃO',
        'pronto': 'PRONTO PARA MORAR',
        'financiado': 'FINANCIADO'
    };

    card.innerHTML = `
        <div class="card-image" style="background-image: url('${empreendimento.image}')">
            <div class="card-badge">${statusLabels[empreendimento.status]}</div>
            
            <!-- Overlay com efeito hover -->
            <div class="card-overlay">
                <div class="overlay-content">
                    <div class="overlay-badge">${statusLabels[empreendimento.status]}</div>
                    <h3 class="overlay-title">${empreendimento.nome}</h3>
                    
                    <div class="overlay-info">
                        <div class="info-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${empreendimento.bairro.toUpperCase()}</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-bed"></i>
                            <span>${empreendimento.suites}</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-ruler-combined"></i>
                            <span>${empreendimento.area}</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-car"></i>
                            <span>${empreendimento.vagas}</span>
                        </div>
                    </div>
                    
                    <div class="overlay-progress">
                        <div class="progress-text">
                            <span>Progresso da Obra</span>
                            <span class="progress-percentage">${empreendimento.porcentagemObra}%</span>
                        </div>
                        <div class="progress-container">
                            <div class="progress-bar" style="width: ${empreendimento.porcentagemObra}%"></div>
                        </div>
                    </div>
                </div>
                
                <button class="overlay-button" onclick="verDetalhes(${empreendimento.id}); event.stopPropagation();">
                    CONHEÇA <i class="fas fa-arrow-right" style="margin-left: 8px;"></i>
                </button>
            </div>
        </div>
        
        <div class="card-content">
            <h3 class="card-title">${empreendimento.nome}</h3>
            <div class="card-info">
                <div class="info-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${empreendimento.bairro.toUpperCase()}</span>
                </div>
                <div class="info-item">
                    <i class="fas fa-bed"></i>
                    <span>${empreendimento.suites}</span>
                </div>
                <div class="info-item">
                    <i class="fas fa-ruler-combined"></i>
                    <span>${empreendimento.area}</span>
                </div>
                <div class="info-item">
                    <i class="fas fa-car"></i>
                    <span>${empreendimento.vagas}</span>
                </div>
            </div>
            
            <div class="progress-text">
                <span>Progresso da Obra</span>
                <span class="progress-percentage">${empreendimento.porcentagemObra}%</span>
            </div>
            <div class="progress-container">
                <div class="progress-bar" style="width: ${empreendimento.porcentagemObra}%"></div>
            </div>
            
            <div class="card-price">
                <strong style="color: #f39c12; font-size: 1.2rem;">${empreendimento.preco}</strong>
            </div>
            <button class="card-button" onclick="verDetalhes(${empreendimento.id})">
                VER DETALHES
            </button>
        </div>
    `;
    
    // Adicionar event listeners para efeitos especiais
    card.addEventListener('mouseenter', function() {
        const overlay = card.querySelector('.card-overlay');
        overlay.classList.add('active');
    });
    
    card.addEventListener('mouseleave', function() {
        const overlay = card.querySelector('.card-overlay');
        overlay.classList.remove('active');
    });
    
    return card;
}

// Função adicional para efeitos de hover mais avançados
function initAdvancedHoverEffects() {
    document.addEventListener('mouseover', function(e) {
        if (e.target.closest('.empreendimento-card')) {
            const card = e.target.closest('.empreendimento-card');
            const overlay = card.querySelector('.card-overlay');
            
            // Adicionar efeito de paralaxe sutil
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });
        }
    });
}

// Chamar a função de efeitos avançados após carregar a página
document.addEventListener('DOMContentLoaded', function() {
    loadEmpreendimentos();
    initializeEventListeners();
    initializeAnimations();
    initAdvancedHoverEffects(); // Adicionar esta linha
});




// Buscar empreendimentos
function searchEmpreendimentos() {
    const bairro = document.getElementById('bairro-filter').value;
    const status = document.getElementById('status-filter').value;
    const tipologia = document.getElementById('tipologia-filter').value;
    
    currentFilters = { bairro, status, tipologia };
    
    const filtered = empreendimentos.filter(emp => {
        return (!bairro || emp.bairro === bairro) &&
               (!status || emp.status === status) &&
               (!tipologia || emp.tipologia === tipologia);
    });
    
    loadEmpreendimentos(filtered);
    
    // Analytics (simulated)
    if (window.gtag) {
        gtag('event', 'search', {
            'search_term': `${bairro}-${status}-${tipologia}`,
            'results_count': filtered.length
        });
    }
}

// Limpar filtros
function clearFilters() {
    document.getElementById('bairro-filter').value = '';
    document.getElementById('status-filter').value = '';
    document.getElementById('tipologia-filter').value = '';
    
    currentFilters = { bairro: '', status: '', tipologia: '' };
    loadEmpreendimentos();
}

// Ver detalhes do empreendimento
function verDetalhes(id) {
    const empreendimento = empreendimentos.find(emp => emp.id === id);
    if (empreendimento) {
        // Simular envio para WhatsApp
        const message = `Olá! Tenho interesse no empreendimento ${empreendimento.nome} em ${empreendimento.bairro.toUpperCase()}. Gostaria de mais informações.`;
        const whatsappUrl = `https://wa.me/5531999999999?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        // Analytics
        if (window.gtag) {
            gtag('event', 'click', {
                'event_category': 'Empreendimento',
                'event_label': empreendimento.nome
            });
        }
    }
}

// Inicializar animações
function initializeAnimations() {
    // Intersection Observer para animações ao scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos que devem ser animados
    document.querySelectorAll('.empreendimento-card').forEach(card => {
        observer.observe(card);
    });
}

// Utilitários
function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
}

function formatArea(area) {
    return `${area} m²`;
}

// Form de contato (caso seja adicionado)
function submitContact(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Simular envio
    console.log('Dados do contato:', data);
    
    // Mostrar mensagem de sucesso
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    event.target.reset();
}

// Inicialização de componentes externos
function initExternalComponents() {
    // Google Analytics (substitua pelo seu ID)
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID');
    }
    
    // Facebook Pixel (se necessário)
    // fbq('init', 'YOUR_PIXEL_ID');
    // fbq('track', 'PageView');
}

// Chamar inicialização de componentes externos
document.addEventListener('DOMContentLoaded', initExternalComponents);

// Service Worker para PWA (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Error handling global
window.addEventListener('error', (event) => {
    console.error('Erro global capturado:', event.error);
    // Enviar erro para serviço de monitoramento
});

// Performance monitoring
window.addEventListener('load', () => {
    setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Tempo de carregamento:', perfData.loadEventEnd - perfData.loadEventStart);
    }, 0);
});