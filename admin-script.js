// Dados do site (simulando um banco de dados local)
let siteData = {
    profile: {
        brandName: 'Belle de Jour',
        bio: '✨ Vista-se para impressionar! Looks femininos e masculinos com estilo e conforto para qualquer ocasião. As tendências mais quentes direto para Shopee, Amazon e Mercado Livre. Descontos exclusivos e moda acessível que combina com você! ✨',
        profileImage: 'img/logo.jpg'
    },
    products: {
        promocoes: [
            {
                id: 1,
                name: 'Vestido Elegância Premium',
                price: '149,90',
                image: 'img/441401-2.jpeg',
                link: 'https://shopee.com.br/Vestido-Jeans-Feminino-Com-Elastano-Vestido-De-festa-Cor-Escura-jeans-Azul-Escuro-Vestido-Com-Z%C3%ADper-i.816055584.19198279961'
            },
            {
                id: 2,
                name: 'Jaqueta Jeans Street',
                price: '179,90',
                image: 'img/SKU - 3223.jpeg',
                link: 'https://shopee.com.br/Kit-3-Shorts-Feminino-Jeans-Short-Curto-Jeans-Rasgado-Feminino-Promo%C3%A7%C3%A3o-Cintura-Alta-i.816055584.23198817718'
            }
        ],
        queridinhos: [
            {
                id: 3,
                name: 'Conjunto Fitness Power',
                price: '119,90',
                image: 'img/SKU-342010(7).jpeg',
                link: 'https://shopee.com.br/Conjunto-de-Alfaiataria-Preto-Cropped-com-Bot%C3%A3o-e-Cal%C3%A7a-Belle-de-Jour-i.816055584.23394309194'
            },
            {
                id: 4,
                name: 'Camisa Slim Elegance',
                price: '99,90',
                image: 'img/441401-2.jpeg',
                link: 'https://shopee.com.br/Bermuda-Masculina-Jeans-Cor-Branca-Belle-de-Jour-i.816055584.23893697286'
            }
        ]
    },
    links: {
        shopee: 'https://shopee.com.br/bellle.de.jour',
        amazon: '',
        mercadolivre: '',
        whatsappNumber: '5581994854368',
        whatsappMessage: 'Oi! Quero fazer parte do Clube VIP e receber desconto exclusivo!'
    },
    social: {
        instagram: '',
        tiktok: '',
        telegram: ''
    },
    settings: {
        primaryColor: '#ff6b6b',
        secondaryColor: '#4ecdc4'
    }
};

// Variáveis globais
let currentEditingProduct = null;
let currentEditingCategory = null;
let nextProductId = 5;

// Inicialização
document.addEventListener('DOMContentLoaded', function () {
    loadDataFromLocalStorage();
    loadFormData();
    loadProducts();
    showTab('profile');
});

// Gerenciamento de Tabs
function showTab(tabName) {
    // Remove active class de todas as tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Adiciona active class na tab selecionada
    document.querySelector(`[onclick="showTab('${tabName}')"]`).classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Carregar dados nos formulários
function loadFormData() {
    // Profile
    document.getElementById('brand-name').value = siteData.profile.brandName;
    document.getElementById('bio-text').value = siteData.profile.bio;
    document.getElementById('current-profile-img').src = siteData.profile.profileImage;

    // Sincronizar galeria de imagens
    const galleryImg = document.getElementById('current-profile-img-gallery');
    if (galleryImg) {
        galleryImg.src = siteData.profile.profileImage;
    }

    // Links
    document.getElementById('shopee-link').value = siteData.links.shopee;
    document.getElementById('amazon-link').value = siteData.links.amazon;
    document.getElementById('mercadolivre-link').value = siteData.links.mercadolivre;
    document.getElementById('whatsapp-number').value = siteData.links.whatsappNumber;
    document.getElementById('whatsapp-message').value = siteData.links.whatsappMessage;

    // Social
    document.getElementById('instagram-link').value = siteData.social.instagram;
    document.getElementById('tiktok-link').value = siteData.social.tiktok;
    document.getElementById('telegram-link').value = siteData.social.telegram;

    // Settings
    document.getElementById('primary-color').value = siteData.settings.primaryColor;
    document.getElementById('secondary-color').value = siteData.settings.secondaryColor;
}

// Carregar produtos
function loadProducts() {
    loadProductsInCategory('promocoes');
    loadProductsInCategory('queridinhos');
}

function loadProductsInCategory(category) {
    const container = document.getElementById(`${category}-products`);
    container.innerHTML = '';

    siteData.products[category].forEach(product => {
        const productElement = createProductElement(product, category);
        container.appendChild(productElement);
    });
}

function createProductElement(product, category) {
    const div = document.createElement('div');
    div.className = 'product-item';
    div.innerHTML = `
        <div class="product-preview">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik0yMCAyMEg0MFY0MEgyMFYyMFoiIGZpbGw9IiNERUUyRTYiLz4KPC9zdmc+'">
            <div class="product-info">
                <h4>${product.name}</h4>
                <div class="price">R$ ${product.price}</div>
            </div>
        </div>
        <div class="product-actions">
            <button class="btn btn-edit btn-small" onclick="editProduct(${product.id}, '${category}')">
                <i class="fas fa-edit"></i> Editar
            </button>
            <button class="btn btn-delete btn-small" onclick="deleteProduct(${product.id}, '${category}')">
                <i class="fas fa-trash"></i> Excluir
            </button>
        </div>
    `;
    return div;
}

// Gerenciamento de produtos
function addProduct(category) {
    currentEditingProduct = null;
    currentEditingCategory = category;

    // Limpar formulário
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-link').value = '';
    document.getElementById('product-image-url').value = '';
    document.getElementById('product-image-file').value = '';

    // Limpar preview da imagem
    const preview = document.getElementById('product-preview');
    preview.src = '';
    preview.style.display = 'none';

    // Limpar área de preview
    const imagePreview = document.getElementById('image-preview');
    if (imagePreview) {
        imagePreview.innerHTML = '';
    }

    // Mostrar modal
    document.getElementById('product-modal').classList.add('active');
}

function editProduct(productId, category) {
    const product = siteData.products[category].find(p => p.id === productId);
    if (!product) return;

    currentEditingProduct = product;
    currentEditingCategory = category;

    // Preencher formulário
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-link').value = product.link || '';
    document.getElementById('product-image-url').value = product.image;

    // Mostrar preview da imagem
    const preview = document.getElementById('product-preview');
    preview.src = product.image;
    preview.style.display = 'block';

    // Mostrar modal
    document.getElementById('product-modal').classList.add('active');
}

function deleteProduct(productId, category) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        siteData.products[category] = siteData.products[category].filter(p => p.id !== productId);
        loadProductsInCategory(category);
        showMessage('Produto excluído com sucesso!', 'success');
    }
}

function saveProduct() {
    const name = document.getElementById('product-name').value.trim();
    const price = document.getElementById('product-price').value.trim();
    const link = document.getElementById('product-link').value.trim();
    const imageUrl = document.getElementById('product-image-url').value.trim();
    const previewImg = document.getElementById('product-preview');

    if (!name || !price) {
        showMessage('Por favor, preencha o nome e preço do produto.', 'error');
        return;
    }

    // Capturar imagem: priorizar upload de arquivo, depois URL, depois imagem padrão
    let finalImage;
    if (previewImg && previewImg.src && previewImg.style.display !== 'none' && !previewImg.src.includes('data:image/svg+xml')) {
        // Se há uma imagem de preview carregada (upload de arquivo)
        finalImage = previewImg.src;
        console.log('📸 Usando imagem de upload:', finalImage.substring(0, 50) + '...');
    } else if (imageUrl) {
        // Se há uma URL fornecida
        finalImage = imageUrl;
        console.log('🔗 Usando URL da imagem:', finalImage);
    } else {
        // Imagem padrão
        finalImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik0xNTAgMTUwSDI1MFYzNTBIMTUwVjE1MFoiIGZpbGw9IiNERUUyRTYiLz4KPHRleHQgeD0iMjAwIiB5PSIyNzAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZDNzU3RCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW1hZ2VtPC90ZXh0Pgo8L3N2Zz4=';
        console.log('🖼️ Usando imagem padrão');
    }

    const productData = {
        name: name,
        price: price,
        image: finalImage,
        link: link
    };

    if (currentEditingProduct) {
        // Editar produto existente
        Object.assign(currentEditingProduct, productData);
        showMessage('Produto atualizado com sucesso!', 'success');
    } else {
        // Adicionar novo produto
        productData.id = nextProductId++;
        siteData.products[currentEditingCategory].push(productData);
        showMessage('Produto adicionado com sucesso!', 'success');
    }

    loadProductsInCategory(currentEditingCategory);
    closeProductModal();
}

function closeProductModal() {
    document.getElementById('product-modal').classList.remove('active');

    // Limpar formulário
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-link').value = '';
    document.getElementById('product-image-url').value = '';
    document.getElementById('product-image-file').value = '';

    // Limpar preview da imagem
    const preview = document.getElementById('product-preview');
    preview.src = '';
    preview.style.display = 'none';

    // Limpar área de preview
    const imagePreview = document.getElementById('image-preview');
    if (imagePreview) {
        imagePreview.innerHTML = '';
    }

    currentEditingProduct = null;
    currentEditingCategory = null;
}

// Preview de imagens
function compressImage(file, maxWidth = 800, quality = 0.8) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = function () {
            // Calcular novas dimensões mantendo proporção
            let { width, height } = img;
            if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
            }

            canvas.width = width;
            canvas.height = height;

            // Desenhar imagem redimensionada
            ctx.drawImage(img, 0, 0, width, height);

            // Converter para base64 com compressão
            const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
            resolve(compressedDataUrl);
        };

        const reader = new FileReader();
        reader.onload = (e) => img.src = e.target.result;
        reader.readAsDataURL(file);
    });
}

function previewImage(input, targetId) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        console.log('📸 Upload de imagem iniciado:', file.name, file.size + ' bytes');

        // Verificar tamanho do arquivo (máx 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showMessage('⚠️ Arquivo muito grande! Máximo 5MB permitido.', 'error');
            return;
        }

        // Comprimir imagem antes de exibir
        compressImage(file, 800, 0.8).then(compressedDataUrl => {
            document.getElementById(targetId).src = compressedDataUrl;

            // Sincronizar com a galeria se for a logo principal
            if (targetId === 'current-profile-img') {
                const galleryImg = document.getElementById('current-profile-img-gallery');
                if (galleryImg) {
                    galleryImg.src = compressedDataUrl;
                }
            }

            const originalSize = (file.size / 1024).toFixed(1);
            const compressedSize = (compressedDataUrl.length / 1024).toFixed(1);

            console.log(`✅ Imagem comprimida: ${originalSize}KB → ${compressedSize}KB`);
            showMessage('📸 Imagem carregada e otimizada! Clique em "Salvar Alterações" para confirmar.', 'success');
        }).catch(error => {
            console.error('❌ Erro ao comprimir imagem:', error);
            showMessage('❌ Erro ao processar imagem. Tente novamente.', 'error');
        });
    }
}

function previewProductImage(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        console.log('📸 Upload de imagem de produto iniciado:', file.name, file.size + ' bytes');

        // Verificar tamanho do arquivo (máx 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showMessage('⚠️ Arquivo muito grande! Máximo 5MB permitido.', 'error');
            return;
        }

        // Comprimir imagem antes de exibir
        compressImage(file, 800, 0.8).then(compressedDataUrl => {
            const preview = document.getElementById('product-preview');
            preview.src = compressedDataUrl;
            preview.style.display = 'block';

            // Limpar URL se arquivo foi selecionado
            document.getElementById('product-image-url').value = '';

            const originalSize = (file.size / 1024).toFixed(1);
            const compressedSize = (compressedDataUrl.length / 1024).toFixed(1);

            console.log(`✅ Imagem de produto comprimida: ${originalSize}KB → ${compressedSize}KB`);
            showMessage('📸 Imagem carregada e otimizada! Clique em "Salvar Produto" para confirmar.', 'success');
        }).catch(error => {
            console.error('❌ Erro ao comprimir imagem do produto:', error);
            showMessage('❌ Erro ao processar imagem. Tente novamente.', 'error');
        });
    }
}

// Salvar todas as alterações
function saveAllChanges() {
    console.log('=== INICIANDO SALVAMENTO ===');

    // Coletar dados dos formulários
    siteData.profile.brandName = document.getElementById('brand-name').value;
    siteData.profile.bio = document.getElementById('bio-text').value;

    // Capturar imagem de perfil (se foi alterada)
    const currentProfileImg = document.getElementById('current-profile-img');
    if (currentProfileImg && currentProfileImg.src) {
        console.log('Salvando imagem de perfil:', currentProfileImg.src.substring(0, 50) + '...');
        siteData.profile.profileImage = currentProfileImg.src;
    }

    siteData.links.shopee = document.getElementById('shopee-link').value;
    siteData.links.amazon = document.getElementById('amazon-link').value;
    siteData.links.mercadolivre = document.getElementById('mercadolivre-link').value;
    siteData.links.whatsappNumber = document.getElementById('whatsapp-number').value;
    siteData.links.whatsappMessage = document.getElementById('whatsapp-message').value;

    siteData.social.instagram = document.getElementById('instagram-link').value;
    siteData.social.tiktok = document.getElementById('tiktok-link').value;
    siteData.social.telegram = document.getElementById('telegram-link').value;

    siteData.settings.primaryColor = document.getElementById('primary-color').value;
    siteData.settings.secondaryColor = document.getElementById('secondary-color').value;

    console.log('Dados coletados:', {
        brandName: siteData.profile.brandName,
        bio: siteData.profile.bio.substring(0, 50) + '...',
        profileImageLength: siteData.profile.profileImage ? siteData.profile.profileImage.length : 0
    });

    // Salvar no localStorage
    const saveSuccess = saveDataToLocalStorage();

    if (saveSuccess) {
        console.log('✅ Dados salvos no localStorage com sucesso');

        // Gerar novo index.html
        generateIndexHTML();
        console.log('HTML gerado');

        // Atualizar o arquivo index.html real
        updateRealIndexHTML();

        showMessage('✅ Alterações salvas com sucesso! Dados persistidos no navegador.', 'success');
    } else {
        console.error('❌ Falha ao salvar dados');
        // Não gerar HTML se o salvamento falhou
    }
}

// Gerar HTML do site
function generateIndexHTML() {
    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${siteData.profile.brandName} - Biosite Oficial</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <!-- Header Section -->
        <header class="profile-section">
            <div class="profile-image">
                <img src="${siteData.profile.profileImage}" alt="${siteData.profile.brandName}">
            </div>
            <h1 class="brand-name">${siteData.profile.brandName}</h1>
            <p class="bio">
                ${siteData.profile.bio}
            </p>
            
            <!-- Social Media Icons -->
            <div class="social-icons">
                ${siteData.social.instagram ? `<a href="${siteData.social.instagram}" target="_blank" class="social-icon instagram"><i class="fab fa-instagram"></i></a>` : '<a href="#" class="social-icon instagram"><i class="fab fa-instagram"></i></a>'}
                ${siteData.social.tiktok ? `<a href="${siteData.social.tiktok}" target="_blank" class="social-icon tiktok"><i class="fab fa-tiktok"></i></a>` : '<a href="#" class="social-icon tiktok"><i class="fab fa-tiktok"></i></a>'}
                <a href="https://wa.me/${siteData.links.whatsappNumber}" target="_blank" class="social-icon whatsapp">
                    <i class="fab fa-whatsapp"></i>
                </a>
            </div>
        </header>

        ${generateProductsSection('promocoes', 'Promoções imperdíveis', 'fire')}
        ${generateProductsSection('queridinhos', 'Queridinhos da galera', 'heart')}

        <!-- Marketplaces -->
        <section class="marketplaces-section">
            <h2 class="section-title">
                <i class="fas fa-shopping-bag"></i> Compre agora nos marketplaces
            </h2>
            <div class="marketplace-links">
                <a href="${siteData.links.shopee || '#'}" target="_blank" class="marketplace-btn shopee">
                    <i class="fas fa-store"></i>
                    <span>Shopee</span>
                </a>
                <a href="${siteData.links.amazon || '#'}" target="_blank" class="marketplace-btn amazon">
                    <i class="fab fa-amazon"></i>
                    <span>Amazon</span>
                </a>
                <a href="${siteData.links.mercadolivre || '#'}" target="_blank" class="marketplace-btn mercadolivre">
                    <i class="fas fa-shopping-cart"></i>
                    <span>Mercado Livre</span>
                </a>
            </div>
        </section>

        <!-- CTA VIP -->
        <section class="vip-section">
            <h2 class="section-title">
                <i class="fas fa-crown"></i> Entre para o Clube VIP da Moda
            </h2>
            <div class="vip-content">
                <div class="vip-benefits">
                    <ul>
                        <li><i class="fas fa-check"></i> Descontos extras</li>
                        <li><i class="fas fa-check"></i> Pré-venda de novas coleções</li>
                        <li><i class="fas fa-check"></i> Dicas de moda exclusivas</li>
                    </ul>
                </div>
                <div class="vip-buttons">
                    <a href="https://wa.me/${siteData.links.whatsappNumber}?text=${encodeURIComponent(siteData.links.whatsappMessage)}" target="_blank" class="vip-btn whatsapp-btn">
                        <i class="fab fa-whatsapp"></i>
                        QUERO DESCONTO EXCLUSIVO
                    </a>
                    <div class="social-vip">
                        ${siteData.social.instagram ? `<a href="${siteData.social.instagram}" target="_blank" class="vip-social instagram"><i class="fab fa-instagram"></i></a>` : '<a href="#" class="vip-social instagram"><i class="fab fa-instagram"></i></a>'}
                        ${siteData.social.telegram ? `<a href="${siteData.social.telegram}" target="_blank" class="vip-social telegram"><i class="fab fa-telegram"></i></a>` : '<a href="#" class="vip-social telegram"><i class="fab fa-telegram"></i></a>'}
                    </div>
                </div>
            </div>
        </section>
    </div>

    <script src="script.js"></script>
</body>
</html>`;

    // Salvar o HTML gerado (simulação - em um ambiente real, isso seria enviado para o servidor)
    localStorage.setItem('generatedHTML', html);
}

// Atualizar o arquivo index.html real
function updateRealIndexHTML() {
    const html = localStorage.getItem('generatedHTML');
    if (html) {
        console.log('HTML gerado e salvo no localStorage');
        // O script.js do index.html já carrega os dados automaticamente
        // Não é necessário fazer download automático
    }
}

// Função separada para download manual do HTML
function downloadHTML() {
    const html = localStorage.getItem('generatedHTML');
    if (html) {
        console.log('Baixando index.html...');

        // Criar um blob com o HTML
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        // Criar um link temporário para download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'index.html';
        a.style.display = 'none';

        // Adicionar ao DOM, clicar e remover
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Limpar o URL do blob
        URL.revokeObjectURL(url);

        console.log('✅ Arquivo index.html baixado com sucesso!');
        showMessage('📥 Arquivo index.html baixado! Use apenas se necessário.', 'info');
    } else {
        showMessage('❌ Nenhum HTML gerado para baixar. Salve as alterações primeiro.', 'error');
    }
}

function generateProductsSection(category, title, icon) {
    if (siteData.products[category].length === 0) return '';

    return `
        <!-- ${title} -->
        <section class="products-section">
            <h2 class="section-title">
                <i class="fas fa-${icon}"></i> ${title}
            </h2>
            <div class="products-grid">
                ${siteData.products[category].map(product => `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="price">${product.price}</p>
                    </div>
                </div>`).join('')}
            </div>
        </section>`;
}

// Visualizar site
function previewSite() {
    // Salvar alterações primeiro
    saveAllChanges();

    // Abrir o site principal em nova aba
    window.open('index.html', '_blank');
}

// Debug HTML
function debugHTML() {
    console.log('=== DEBUG INFO COMPLETO ===');

    // Dados atuais na memória
    console.log('1. siteData atual:', siteData);

    // Elemento de imagem
    const profileImg = document.getElementById('current-profile-img');
    console.log('2. Profile Image Element:', profileImg);
    console.log('   - Src:', profileImg ? profileImg.src : 'Elemento não encontrado');
    console.log('   - Src length:', profileImg ? profileImg.src.length : 0);

    // LocalStorage
    const savedData = localStorage.getItem('belleDeJourData');
    console.log('3. LocalStorage belleDeJourData:', savedData ? 'Existe' : 'Não existe');
    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            console.log('   - Dados salvos:', parsed);
            console.log('   - Imagem salva:', parsed.profile?.profileImage?.substring(0, 50) + '...');
        } catch (e) {
            console.error('   - Erro ao fazer parse:', e);
        }
    }

    // HTML gerado
    generateIndexHTML();
    const html = localStorage.getItem('generatedHTML');
    console.log('4. Generated HTML:', html ? 'Gerado com sucesso' : 'Não gerado');
    if (html) {
        console.log('   - HTML length:', html.length);
    }

    // Formulários
    console.log('5. Valores dos formulários:');
    console.log('   - Brand Name:', document.getElementById('brand-name')?.value);
    console.log('   - Bio:', document.getElementById('bio-text')?.value?.substring(0, 50) + '...');

    showMessage('🔧 Debug completo enviado para o console. Pressione F12 para ver todos os detalhes.', 'info');
}

// Reset dados
function resetData() {
    if (confirm('⚠️ Tem certeza que deseja resetar todos os dados? Esta ação não pode ser desfeita.')) {
        // Limpar localStorage
        localStorage.removeItem('belleDeJourData');
        localStorage.removeItem('generatedHTML');

        // Resetar siteData para valores padrão
        siteData = {
            profile: {
                brandName: 'Belle de Jour',
                bio: '✨ Vista-se para impressionar! Looks femininos e masculinos com estilo e conforto para qualquer ocasião. As tendências mais quentes direto para Shopee, Amazon e Mercado Livre. Descontos exclusivos e moda acessível que combina com você! ✨',
                profileImage: 'img/logo.jpg'
            },
            products: {
                promocoes: [
                    {
                        id: 1,
                        name: 'Vestido Elegância Premium',
                        price: '149,90',
                        image: 'img/441401-2.jpeg'
                    },
                    {
                        id: 2,
                        name: 'Jaqueta Jeans Street',
                        price: '179,90',
                        image: 'img/SKU - 3223.jpeg'
                    }
                ],
                queridinhos: [
                    {
                        id: 3,
                        name: 'Conjunto Fitness Power',
                        price: '119,90',
                        image: 'img/SKU-342010(7).jpeg'
                    },
                    {
                        id: 4,
                        name: 'Camisa Slim Elegance',
                        price: '99,90',
                        image: 'img/441401-2.jpeg'
                    }
                ]
            },
            links: {
                shopee: 'https://shopee.com.br/bellle.de.jour',
                amazon: '',
                mercadolivre: '',
                whatsappNumber: '5581994854368',
                whatsappMessage: 'Oi! Quero fazer parte do Clube VIP e receber desconto exclusivo!'
            },
            social: {
                instagram: '',
                tiktok: '',
                telegram: ''
            },
            settings: {
                primaryColor: '#ff6b6b',
                secondaryColor: '#4ecdc4'
            }
        };

        // Recarregar formulários e produtos
        loadFormData();
        loadProducts();

        console.log('✅ Dados resetados para valores padrão');
        showMessage('🔄 Dados resetados com sucesso! Todos os valores voltaram ao padrão.', 'success');
    }
}

// Backup e exportação
function exportData() {
    const dataStr = JSON.stringify(siteData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `belle-de-jour-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    showMessage('Backup exportado com sucesso!', 'success');
}

function importData() {
    document.getElementById('import-file').click();
}

function handleImport(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const importedData = JSON.parse(e.target.result);

                if (confirm('Tem certeza que deseja importar estes dados? Isso substituirá todas as configurações atuais.')) {
                    siteData = importedData;
                    loadFormData();
                    loadProducts();
                    saveDataToLocalStorage();
                    showMessage('Dados importados com sucesso!', 'success');
                }
            } catch (error) {
                showMessage('Erro ao importar dados. Verifique se o arquivo está correto.', 'error');
            }
        };
        reader.readAsText(input.files[0]);
    }
}

// LocalStorage
function saveDataToLocalStorage() {
    try {
        const dataString = JSON.stringify(siteData);
        const sizeInMB = (dataString.length / 1024 / 1024).toFixed(2);

        console.log(`💾 Tentando salvar dados (${sizeInMB}MB)...`);

        // Verificar se o tamanho está dentro do limite do localStorage (geralmente 5-10MB)
        if (dataString.length > 5 * 1024 * 1024) {
            console.warn('⚠️ Dados muito grandes para localStorage:', sizeInMB + 'MB');
            showMessage('⚠️ Imagem muito grande! Tente uma imagem menor.', 'error');
            return false;
        }

        localStorage.setItem('belleDeJourData', dataString);
        console.log('✅ Dados salvos com sucesso no localStorage');
        return true;

    } catch (error) {
        console.error('❌ Erro ao salvar no localStorage:', error);

        if (error.name === 'QuotaExceededError') {
            showMessage('❌ Espaço insuficiente! Imagem muito grande para salvar.', 'error');
        } else {
            showMessage('❌ Erro ao salvar dados: ' + error.message, 'error');
        }
        return false;
    }
}

function loadDataFromLocalStorage() {
    const saved = localStorage.getItem('belleDeJourData');
    if (saved) {
        try {
            siteData = JSON.parse(saved);
        } catch (error) {
            console.error('Erro ao carregar dados salvos:', error);
        }
    }
}

// Mensagens
function showMessage(text, type = 'info') {
    // Remove mensagens existentes
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());

    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        ${text}
    `;

    // Inserir no topo do main
    const main = document.querySelector('.admin-main');
    main.insertBefore(message, main.firstChild);

    // Remover após 5 segundos
    setTimeout(() => {
        message.remove();
    }, 5000);
}

// Event Listeners
document.addEventListener('click', function (e) {
    // Fechar modal clicando fora
    if (e.target.classList.contains('modal')) {
        closeProductModal();
    }
});

// Atalhos de teclado
document.addEventListener('keydown', function (e) {
    // Ctrl+S para salvar
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        saveAllChanges();
    }

    // Escape para fechar modal
    if (e.key === 'Escape') {
        closeProductModal();
    }
});

// Auto-save a cada 30 segundos
setInterval(() => {
    saveDataToLocalStorage();
}, 30000);