// Script para atualizar automaticamente o index.html com base nas configurações do admin

class SiteUpdater {
    constructor() {
        this.fs = null; // Em um ambiente real, seria usado Node.js fs
    }

    // Atualizar o arquivo index.html com os novos dados
    async updateIndexHTML(siteData) {
        try {
            // Gerar o novo HTML
            const newHTML = this.generateHTML(siteData);
            
            // Em um ambiente real, isso salvaria o arquivo
            // await this.fs.writeFile('index.html', newHTML);
            
            // Por enquanto, vamos simular salvando no localStorage
            localStorage.setItem('updatedIndexHTML', newHTML);
            
            console.log('Index.html atualizado com sucesso!');
            return true;
        } catch (error) {
            console.error('Erro ao atualizar index.html:', error);
            return false;
        }
    }

    generateHTML(data) {
        return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.profile.brandName} - Biosite Oficial</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <!-- Header Section -->
        <header class="profile-section">
            <div class="profile-image">
                <img src="${data.profile.profileImage}" alt="${data.profile.brandName}">
            </div>
            <h1 class="brand-name">${data.profile.brandName}</h1>
            <p class="bio">
                ${data.profile.bio}
            </p>
            
            <!-- Social Media Icons -->
            <div class="social-icons">
                ${this.generateSocialLink(data.social.instagram, 'instagram', 'fab fa-instagram')}
                ${this.generateSocialLink(data.social.tiktok, 'tiktok', 'fab fa-tiktok')}
                <a href="https://wa.me/${data.links.whatsappNumber}" target="_blank" class="social-icon whatsapp">
                    <i class="fab fa-whatsapp"></i>
                </a>
            </div>
        </header>

        ${this.generateProductsSection(data.products.promocoes, 'Promoções imperdíveis', 'fire')}
        ${this.generateProductsSection(data.products.queridinhos, 'Queridinhos da galera', 'heart')}

        <!-- Marketplaces -->
        <section class="marketplaces-section">
            <h2 class="section-title">
                <i class="fas fa-shopping-bag"></i> Compre agora nos marketplaces
            </h2>
            <div class="marketplace-links">
                ${this.generateMarketplaceLink(data.links.shopee, 'shopee', 'fas fa-store', 'Shopee')}
                ${this.generateMarketplaceLink(data.links.amazon, 'amazon', 'fab fa-amazon', 'Amazon')}
                ${this.generateMarketplaceLink(data.links.mercadolivre, 'mercadolivre', 'fas fa-shopping-cart', 'Mercado Livre')}
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
                    <a href="https://wa.me/${data.links.whatsappNumber}?text=${encodeURIComponent(data.links.whatsappMessage)}" target="_blank" class="vip-btn whatsapp-btn">
                        <i class="fab fa-whatsapp"></i>
                        QUERO DESCONTO EXCLUSIVO
                    </a>
                    <div class="social-vip">
                        ${this.generateVipSocialLink(data.social.instagram, 'instagram', 'fab fa-instagram')}
                        ${this.generateVipSocialLink(data.social.telegram, 'telegram', 'fab fa-telegram')}
                    </div>
                </div>
            </div>
        </section>
    </div>

    <!-- Link para Admin (oculto) -->
    <div style="position: fixed; bottom: 10px; right: 10px; z-index: 1000;">
        <a href="admin.html" style="background: rgba(0,0,0,0.7); color: white; padding: 8px 12px; border-radius: 20px; text-decoration: none; font-size: 12px; opacity: 0.3; transition: opacity 0.3s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.3'">
            <i class="fas fa-cog"></i> Admin
        </a>
    </div>

    <script src="script.js"></script>
</body>
</html>`;
    }

    generateSocialLink(url, className, iconClass) {
        if (url && url.trim()) {
            return `<a href="${url}" target="_blank" class="social-icon ${className}"><i class="${iconClass}"></i></a>`;
        }
        return `<a href="#" class="social-icon ${className}"><i class="${iconClass}"></i></a>`;
    }

    generateVipSocialLink(url, className, iconClass) {
        if (url && url.trim()) {
            return `<a href="${url}" target="_blank" class="vip-social ${className}"><i class="${iconClass}"></i></a>`;
        }
        return `<a href="#" class="vip-social ${className}"><i class="${iconClass}"></i></a>`;
    }

    generateMarketplaceLink(url, className, iconClass, text) {
        const href = url && url.trim() ? url : '#';
        const target = url && url.trim() ? 'target="_blank"' : '';
        
        return `<a href="${href}" ${target} class="marketplace-btn ${className}">
                    <i class="${iconClass}"></i>
                    <span>${text}</span>
                </a>`;
    }

    generateProductsSection(products, title, icon) {
        if (!products || products.length === 0) {
            return '';
        }

        const productsHTML = products.map(product => `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="price">${product.price}</p>
                    </div>
                </div>`).join('');

        return `
        <!-- ${title} -->
        <section class="products-section">
            <h2 class="section-title">
                <i class="fas fa-${icon}"></i> ${title}
            </h2>
            <div class="products-grid">
                ${productsHTML}
            </div>
        </section>`;
    }

    // Método para aplicar cores personalizadas
    updateCustomColors(primaryColor, secondaryColor) {
        const style = document.createElement('style');
        style.innerHTML = `
            :root {
                --primary-color: ${primaryColor};
                --secondary-color: ${secondaryColor};
            }
            
            .marketplace-btn.shopee {
                background: linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%);
            }
            
            .vip-btn {
                background: linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%);
            }
            
            .social-icon:hover {
                background: ${primaryColor};
            }
        `;
        
        // Remove estilo anterior se existir
        const existingStyle = document.getElementById('custom-colors');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        style.id = 'custom-colors';
        document.head.appendChild(style);
    }

    // Método para validar dados antes da atualização
    validateData(data) {
        const errors = [];

        // Validar perfil
        if (!data.profile.brandName || data.profile.brandName.trim() === '') {
            errors.push('Nome da marca é obrigatório');
        }

        if (!data.profile.bio || data.profile.bio.trim() === '') {
            errors.push('Biografia é obrigatória');
        }

        // Validar WhatsApp
        if (!data.links.whatsappNumber || data.links.whatsappNumber.trim() === '') {
            errors.push('Número do WhatsApp é obrigatório');
        }

        // Validar formato do WhatsApp
        const whatsappRegex = /^\d{10,15}$/;
        if (data.links.whatsappNumber && !whatsappRegex.test(data.links.whatsappNumber.replace(/\D/g, ''))) {
            errors.push('Formato do número do WhatsApp inválido');
        }

        // Validar URLs
        const urlFields = [
            { field: data.links.shopee, name: 'Link da Shopee' },
            { field: data.links.amazon, name: 'Link da Amazon' },
            { field: data.links.mercadolivre, name: 'Link do Mercado Livre' },
            { field: data.social.instagram, name: 'Link do Instagram' },
            { field: data.social.tiktok, name: 'Link do TikTok' },
            { field: data.social.telegram, name: 'Link do Telegram' }
        ];

        urlFields.forEach(({ field, name }) => {
            if (field && field.trim() && !this.isValidURL(field)) {
                errors.push(`${name} deve ser uma URL válida`);
            }
        });

        return errors;
    }

    isValidURL(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    // Método para fazer backup automático
    createBackup(data) {
        const timestamp = new Date().toISOString();
        const backup = {
            timestamp,
            data: JSON.parse(JSON.stringify(data)) // Deep clone
        };
        
        // Salvar backup no localStorage
        const backups = JSON.parse(localStorage.getItem('belleDeJourBackups') || '[]');
        backups.push(backup);
        
        // Manter apenas os últimos 10 backups
        if (backups.length > 10) {
            backups.splice(0, backups.length - 10);
        }
        
        localStorage.setItem('belleDeJourBackups', JSON.stringify(backups));
        
        return backup;
    }

    // Método para restaurar backup
    restoreBackup(timestamp) {
        const backups = JSON.parse(localStorage.getItem('belleDeJourBackups') || '[]');
        const backup = backups.find(b => b.timestamp === timestamp);
        
        if (backup) {
            return backup.data;
        }
        
        return null;
    }

    // Método para listar backups disponíveis
    listBackups() {
        const backups = JSON.parse(localStorage.getItem('belleDeJourBackups') || '[]');
        return backups.map(backup => ({
            timestamp: backup.timestamp,
            date: new Date(backup.timestamp).toLocaleString('pt-BR')
        }));
    }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.SiteUpdater = SiteUpdater;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SiteUpdater;
}