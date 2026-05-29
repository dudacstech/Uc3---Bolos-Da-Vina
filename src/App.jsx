import React, { useState, useEffect } from 'react'

export default function App() {
  // Mobile menu state
  const [menuOpen, setMenuOpen] = useState(false)
  
  // Accessibility states
  const [highContrast, setHighContrast] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [accessMenuOpen, setAccessMenuOpen] = useState(false)

  // Lightbox gallery state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Track scroll position to mark active section
  const [activeSection, setActiveSection] = useState('inicio')

  // Theme effect for high contrast
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast')
    } else {
      document.body.classList.remove('high-contrast')
    }
  }, [highContrast])

  // Effect for font size
  useEffect(() => {
    document.documentElement.style.setProperty('--base-font-size', `${fontSize}px`)
  }, [fontSize])

  // Handle active navigation highlighting on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'produtos', 'cardapio', 'sabores', 'galeria', 'contato']
      const scrollPos = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const top = element.offsetTop
          const height = element.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Accessibility handlers
  const increaseFont = () => {
    if (fontSize < 22) setFontSize(prev => prev + 2)
  }

  const decreaseFont = () => {
    if (fontSize > 14) setFontSize(prev => prev - 2)
  }

  const resetAccessibility = () => {
    setFontSize(16)
    setHighContrast(false)
  }

  // Smooth scroll handler
  const handleNavClick = (e, sectionId) => {
    e.preventDefault()
    setMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Products Data
  const products = [
    {
      id: 1,
      title: 'Bolos Recheados',
      description: 'Bolos decorados e recheados para comemorações especiais, feitos com massa fofinha e muito recheio.',
      img: '/images/product_bolos.png'
    },
    {
      id: 2,
      title: 'Docinhos Festivos',
      description: 'Docinhos enrolados um a um, com ingredientes selecionados para adoçar suas festas.',
      img: '/images/product_docinhos.png'
    },
    {
      id: 3,
      title: 'Balas de Coco',
      description: 'Receita tradicional caseira que derrete na boca, preparadas com coco natural.',
      img: '/images/product_balas.png'
    },
    {
      id: 4,
      title: 'Maçã do Amor',
      description: 'Clássicas maçãs do amor caramelizadas, crocantes e brilhantes, perfeitas para todas as ocasiões.',
      img: '/images/product_maca.png'
    }
  ]

  // Pricing Data
  const pricingList = [
    {
      id: 1,
      title: 'Bolos Recheados',
      description: 'Massas fofinhas recheadas sob medida.',
      price: '90,00',
      unit: 'o kg',
      badge: "Topper's grátis acima de 1kg!",
      img: '/images/product_bolos.png'
    },
    {
      id: 2,
      title: 'Docinhos para Festa',
      description: 'Sabores clássicos enrolados com carinho.',
      price: '90,00',
      unit: 'o cento',
      badge: 'Feitos com muito amor',
      img: '/images/product_docinhos.png'
    },
    {
      id: 3,
      title: 'Balas de Coco',
      description: 'Sabores variados que derretem na boca.',
      price: '60,00',
      unit: 'o kg',
      badge: 'Pedido mínimo: 500g',
      img: '/images/product_balas.png'
    },
    {
      id: 4,
      title: 'Maçã do Amor',
      description: 'Maçã fresca com calda caramelizada vermelha.',
      price: '6,00',
      unit: 'cada',
      badge: 'Caramelização clássica',
      img: '/images/product_maca.png'
    }
  ]

  // Flavors Data
  const flavors = {
    bolos: [
      'Abacaxi', 
      'Pêssego', 
      'Ameixa', 
      'Coco', 
      'Sensação', 
      'Leite Ninho (com frutas adicionais)', 
      'Mousse de Maracujá', 
      'Prestígio', 
      'Brigadeiro', 
      'Dannete'
    ],
    balas: [
      'Coco Natural', 'Morango', 'Chocolate', 
      'Leite Condensado', 'Amendoim', 'Nozes'
    ],
    docinhos: [
      'Brigadeiro', 'Beijinho', 'Bicho de Pé', 
      'Olho de Sogra', 'Cajuzinho', 'Mescladinho'
    ]
  }

  // Gallery Images Data
  const galleryImages = [
    { src: '/images/hero_cake.png', caption: 'Bolo de Brigadeiro Tradicional' },
    { src: '/images/product_bolos.png', caption: 'Bolo Clássico com Creme e Morangos' },
    { src: '/images/product_docinhos.png', caption: 'Variedade de Docinhos Finos para Festa' },
    { src: '/images/product_balas.png', caption: 'Nossas Balas de Coco Caseiras e Macias' },
    { src: '/images/product_maca.png', caption: 'Tradicionais Maçãs do Amor Caramelizadas' },
    { src: '/images/gallery_pote.png', caption: 'Bolo no Pote com Camadas Cremosas' }
  ]

  // Open Lightbox
  const openLightbox = (index) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  // Next / Prev Lightbox
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  // Links setup
  const whatsappUrl = "https://wa.me/5511998448968?text=Olá!%20Gostaria%20de%20fazer%20um%20orçamento."
  const mapsUrl = "https://www.google.com/maps/dir/?api=1&destination=Osasco+-+São+Paulo"

  return (
    <>
      {/* Header / Navigation */}
      <header>
        <div className="container header-container">
          <a href="#inicio" onClick={(e) => handleNavClick(e, 'inicio')} className="logo" aria-label="Voltar ao topo da página">
            <svg className="logo-icon" viewBox="0 0 24 24" style={{width: '32px', height: '32px', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round'}} alt="Ícone de Bolo">
              <path d="M18 20H6a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2z"></path>
              <path d="M12 11V7"></path>
              <path d="M8 11V8"></path>
              <path d="M16 11V8"></path>
              <path d="M12 4v1"></path>
              <path d="M8 5v1"></path>
              <path d="M16 5v1"></path>
              <path d="M4 14h16"></path>
            </svg>
            <span className="cursive">Bolos Da Vina</span>
          </a>

          {/* Hamburger Icon */}
          <button 
            className="mobile-toggle" 
            onClick={() => setMenuOpen(!menuOpen)} 
            aria-label="Abrir menu de navegação" 
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>

          {/* Navigation Links */}
          <nav>
            <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
              <li>
                <a 
                  href="#inicio" 
                  onClick={(e) => handleNavClick(e, 'inicio')}
                  className={activeSection === 'inicio' ? 'active' : ''}
                >
                  Início
                </a>
              </li>
              <li>
                <a 
                  href="#produtos" 
                  onClick={(e) => handleNavClick(e, 'produtos')}
                  className={activeSection === 'produtos' ? 'active' : ''}
                >
                  Produtos
                </a>
              </li>
              <li>
                <a 
                  href="#cardapio" 
                  onClick={(e) => handleNavClick(e, 'cardapio')}
                  className={activeSection === 'cardapio' ? 'active' : ''}
                >
                  Tabela de Preços
                </a>
              </li>
              <li>
                <a 
                  href="#sabores" 
                  onClick={(e) => handleNavClick(e, 'sabores')}
                  className={activeSection === 'sabores' ? 'active' : ''}
                >
                  Sabores
                </a>
              </li>
              <li>
                <a 
                  href="#galeria" 
                  onClick={(e) => handleNavClick(e, 'galeria')}
                  className={activeSection === 'galeria' ? 'active' : ''}
                >
                  Galeria
                </a>
              </li>
              <li>
                <a 
                  href="#contato" 
                  onClick={(e) => handleNavClick(e, 'contato')}
                  className={activeSection === 'contato' ? 'active' : ''}
                >
                  Contato
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Vintage Scallop Edge Divider */}
        <svg className="scallop-divider" viewBox="0 0 1440 20" preserveAspectRatio="none">
          <path d="M0,10 C15,10 30,0 45,0 C60,0 75,10 90,10 C105,10 120,0 135,0 C150,0 165,10 180,10 C195,10 210,0 225,0 C240,0 255,10 270,10 C285,10 300,0 315,0 C330,0 345,10 360,10 C375,10 390,0 405,0 C420,0 435,10 450,10 C465,10 480,0 495,0 C510,0 525,10 540,10 C555,10 570,0 585,0 C600,0 615,10 630,10 C645,10 660,0 675,0 C690,0 705,10 720,10 C735,10 750,0 765,0 C780,0 795,10 810,10 C825,10 840,0 855,0 C870,0 885,10 900,10 C915,10 930,0 945,0 C960,0 975,10 990,10 C1005,10 1020,0 1035,0 C1050,0 1065,10 1080,10 C1095,10 1110,0 1125,0 C1140,0 1155,10 1170,10 C1185,10 1200,0 1215,0 C1230,0 1245,10 1260,10 C1275,10 1290,0 1305,0 C1320,0 1335,10 1350,10 C1365,10 1380,0 1395,0 C1410,0 1425,10 1440,10 L1440,20 L0,20 Z" />
        </svg>
      </header>

      <main id="main-content">
        {/* Hero Section */}
        <section id="inicio" className="hero">
          <div className="container hero-grid">
            <div className="hero-text">
              <h1>
                Doces caseiros com
                <span className="cursive">Gostinho de Infância</span>
              </h1>
              <p>
                Produzidos com muito carinho e seguindo receitas tradicionais. 
                Sabores irresistíveis que trazem memórias especiais e tornam os momentos da sua família ainda mais doces!
              </p>
              <a 
                href="#produtos" 
                onClick={(e) => handleNavClick(e, 'produtos')} 
                className="btn btn-primary"
                aria-label="Ver produtos e cardápio"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                Ver Cardápio
              </a>
            </div>
            <div className="hero-img-container">
              <div className="hero-img-backdrop"></div>
              <img 
                src="/images/hero_cake.png" 
                alt="Bolo tradicional decorado com chocolate granulado e brigadeiros ao lado" 
                className="hero-img" 
              />
            </div>
          </div>
        </section>

        {/* Nossos Produtos Section */}
        <section id="produtos" className="products-section">
          <div className="container">
            <div className="section-header">
              <h2>Nossos Produtos</h2>
              <span className="section-header-heart">♡</span>
            </div>

            <div className="products-grid">
              {products.map((p) => (
                <article key={p.id} className="product-card">
                  <img src={p.img} alt={p.title} className="product-card-img" />
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Tabela de Preços Section */}
        <section id="cardapio" className="pricing-section">
          <div className="container">
            <div className="section-header">
              <h2>Tabela de Preços</h2>
              <span className="section-header-heart">♡</span>
            </div>

            <div className="pricing-grid">
              {pricingList.map((item) => (
                <article key={item.id} className="pricing-card">
                  <img src={item.img} alt={item.title} className="pricing-card-img" />
                  <h3>{item.title}</h3>
                  <p className="pricing-card-desc">{item.description}</p>
                  
                  <div className="pricing-card-price-container">
                    <span className="price-prefix">A partir de</span>
                    <span className="price-value">R$ {item.price}</span>
                    <span className="price-unit">{item.unit}</span>
                    <span className="price-badge">{item.badge}</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="pricing-action-container">
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
                aria-label="Fazer um orçamento e pedido pelo WhatsApp"
              >
                Solicitar Orçamento
              </a>
            </div>
          </div>
        </section>

        {/* Nossos Sabores Section */}
        <section id="sabores" className="flavors-section">
          <div className="container">
            <div className="section-header">
              <h2>Nossos Sabores</h2>
              <span className="section-header-heart">♡</span>
            </div>

            {/* Bolos Flavors */}
            <div className="flavors-group">
              <h3 className="flavors-group-title">Bolos Recheados (Massa branca ou chocolate)</h3>
              <div className="flavors-tags">
                {flavors.bolos.map((flavor, idx) => (
                  <span key={idx} className="flavor-tag">{flavor}</span>
                ))}
              </div>
            </div>

            {/* Balas de Coco Flavors */}
            <div className="flavors-group">
              <h3 className="flavors-group-title">Balas de Coco</h3>
              <div className="flavors-tags">
                {flavors.balas.map((flavor, idx) => (
                  <span key={idx} className="flavor-tag">{flavor}</span>
                ))}
              </div>
            </div>

            {/* Docinhos Flavors */}
            <div className="flavors-group">
              <h3 className="flavors-group-title">Docinhos Tradicionais</h3>
              <div className="flavors-tags">
                {flavors.docinhos.map((flavor, idx) => (
                  <span key={idx} className="flavor-tag">{flavor}</span>
                ))}
              </div>
            </div>

            {/* Promo Bar Card Removed */}
          </div>
        </section>

        {/* Galeria Section */}
        <section id="galeria" className="gallery-section">
          <div className="container">
            <div className="section-header">
              <h2>Galeria de Delícias</h2>
              <span className="section-header-heart">♡</span>
            </div>

            <div className="gallery-grid">
              {galleryImages.map((img, idx) => (
                <div 
                  key={idx} 
                  className="gallery-item" 
                  onClick={() => openLightbox(idx)}
                  role="button"
                  tabIndex="0"
                  aria-label={`Visualizar imagem ampliada: ${img.caption}`}
                  onKeyDown={(e) => { if (e.key === 'Enter') openLightbox(idx); }}
                >
                  <img src={img.src} alt={img.caption} />
                  <span className="gallery-item-icon">🔍</span>
                </div>
              ))}
            </div>

            <div className="gallery-action">
              <a 
                href="https://www.instagram.com/davinasilverio/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline"
                aria-label="Siga no Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                Ver mais fotos no Instagram
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal Component */}
      {lightboxOpen && (
        <div 
          className="lightbox-modal" 
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Visualizador de Imagem Ampliada"
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="lightbox-btn lightbox-btn-close" 
              onClick={() => setLightboxOpen(false)}
              aria-label="Fechar visualizador"
            >
              ✕
            </button>
            <button 
              className="lightbox-btn lightbox-btn-prev" 
              onClick={prevImage}
              aria-label="Imagem anterior"
              style={{left: '-60px'}}
            >
              ◀
            </button>
            <img 
              src={galleryImages[currentImageIndex].src} 
              alt={galleryImages[currentImageIndex].caption} 
              className="lightbox-img" 
            />
            <button 
              className="lightbox-btn lightbox-btn-next" 
              onClick={nextImage}
              aria-label="Próxima imagem"
              style={{right: '-60px'}}
            >
              ▶
            </button>
            <div className="lightbox-caption">{galleryImages[currentImageIndex].caption}</div>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <footer id="contato">
        {/* Vintage Top Curvature */}
        <svg className="footer-curve" viewBox="0 0 1440 20" preserveAspectRatio="none">
          <path d="M0,20 C15,20 30,10 45,10 C60,10 75,20 90,20 C105,20 120,10 135,10 C150,10 165,20 180,20 C195,20 210,10 225,10 C240,10 255,20 270,20 C285,20 300,10 315,10 C330,10 345,20 360,20 C375,20 390,10 405,10 C420,10 435,20 450,20 C465,20 480,10 495,10 C510,10 525,20 540,20 C555,20 570,10 585,10 C600,10 615,20 630,20 C645,20 660,10 675,10 C690,10 705,20 720,20 C735,20 750,10 765,10 C780,10 795,20 810,20 C825,20 840,10 855,10 C870,10 885,20 900,20 C915,20 930,10 945,10 C960,10 975,20 990,20 C1005,20 1020,10 1035,10 C1050,10 1065,20 1080,20 C1095,20 1110,10 1125,10 C1140,10 1155,20 1170,20 C1185,20 1200,10 1215,10 C1230,10 1245,20 1260,20 C1275,20 1290,10 1305,10 C1320,10 1335,20 1350,20 C1365,20 1380,10 1395,10 C1410,10 1425,20 1440,20 L1440,0 L0,0 Z" />
        </svg>

        <div className="container">
          {/* Large Footer Call To Action */}
          <div className="footer-cta">
            <h2>Faça seu pedido! Fale comigo pelo WhatsApp e garanta seus doces momentos!</h2>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="footer-phone-btn" aria-label="Ligue ou mande mensagem no WhatsApp">
              <svg className="footer-phone-icon" viewBox="0 0 24 24">
                <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
              </svg>
              (11) 99844-8968
            </a>
          </div>

          <div className="footer-grid">
            {/* Column 1: Brand Logo */}
            <div className="footer-col">
              <div className="footer-logo">
                <svg className="logo-icon" viewBox="0 0 24 24" style={{width: '28px', height: '28px', fill: 'none', stroke: '#ffffff', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round'}}>
                  <path d="M18 20H6a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2z"></path>
                  <path d="M12 11V7"></path>
                  <path d="M8 11V8"></path>
                  <path d="M16 11V8"></path>
                  <path d="M12 4v1"></path>
                  <path d="M8 5v1"></path>
                  <path d="M16 5v1"></path>
                  <path d="M4 14h16"></path>
                </svg>
                <span className="cursive" style={{fontSize: '1.8rem'}}>Da Vina</span>
              </div>
              <p className="footer-logo-sub">Tradicionais doces caseiros preparados com muito amor com gostinho de infância em Osasco, SP.</p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="footer-col">
              <h3>Links rápidos</h3>
              <ul className="footer-links">
                <li><a href="#inicio" onClick={(e) => handleNavClick(e, 'inicio')}>Início</a></li>
                <li><a href="#produtos" onClick={(e) => handleNavClick(e, 'produtos')}>Produtos</a></li>
                <li><a href="#cardapio" onClick={(e) => handleNavClick(e, 'cardapio')}>Preços</a></li>
                <li><a href="#sabores" onClick={(e) => handleNavClick(e, 'sabores')}>Sabores</a></li>
                <li><a href="#galeria" onClick={(e) => handleNavClick(e, 'galeria')}>Galeria</a></li>
              </ul>
            </div>

            {/* Column 3: Hours & Location */}
            <div className="footer-col">
              <h3>Atendimento</h3>
              <div className="footer-hours">
                <p><strong>Segunda a Sábado:</strong><br />08h às 19h</p>
                <p><strong>Domingos e Feriados:</strong><br />08h às 14h</p>
                <p>
                  <a 
                    href={mapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{color: '#ffffff', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '4px'}}
                    aria-label="Abrir localização Osasco - São Paulo no Google Maps"
                  >
                    📍 Osasco - SP
                  </a>
                </p>
              </div>
            </div>

            {/* Column 4: Mini Instagram Grid */}
            <div className="footer-col">
              <h3>Instagram</h3>
              <div className="footer-instagram-grid">
                <img src="/images/hero_cake.png" alt="Foto Instagram 1" className="footer-instagram-img" />
                <img src="/images/product_bolos.png" alt="Foto Instagram 2" className="footer-instagram-img" />
                <img src="/images/product_docinhos.png" alt="Foto Instagram 3" className="footer-instagram-img" />
                <img src="/images/product_balas.png" alt="Foto Instagram 4" className="footer-instagram-img" />
                <img src="/images/product_maca.png" alt="Foto Instagram 5" className="footer-instagram-img" />
                <img src="/images/gallery_pote.png" alt="Foto Instagram 6" className="footer-instagram-img" />
              </div>
            </div>
          </div>

          <div className="footer-copyright">
            <p>© 2026 Bolos Da Vina. Todos os direitos reservados. ♡</p>
          </div>
        </div>
      </footer>

      {/* Floating Accessibility Control Toolbar */}
      <div className="accessibility-bar">
        <button 
          className="accessibility-toggle-btn" 
          onClick={() => setAccessMenuOpen(!accessMenuOpen)}
          aria-label="Abrir menu de recursos de acessibilidade"
          aria-expanded={accessMenuOpen}
        >
          ♿
        </button>
        {accessMenuOpen && (
          <div className="accessibility-menu" role="region" aria-label="Opções de Acessibilidade">
            <button onClick={increaseFont} aria-label="Aumentar tamanho do texto">
              ➕ Aumentar Texto
            </button>
            <button onClick={decreaseFont} aria-label="Diminuir tamanho do texto">
              ➖ Diminuir Texto
            </button>
            <button onClick={() => setHighContrast(!highContrast)} aria-label="Alternar modo de alto contraste para leitura">
              🌓 {highContrast ? 'Modo Normal' : 'Alto Contraste'}
            </button>
            <button onClick={resetAccessibility} aria-label="Resetar todas as opções de acessibilidade">
              🔄 Resetar Tudo
            </button>
          </div>
        )}
      </div>

      {/* Floating WhatsApp Button */}
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-float"
        aria-label="Enviar mensagem direta pelo WhatsApp"
      >
        <svg className="whatsapp-icon" viewBox="0 0 448 512">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L32 503l138.2-36.2c32.7 17.8 69.3 27.2 106.8 27.2 122.4 0 222-99.6 222-222 0-59.3-23.2-115-65.1-156.9zM223.9 459c-33.1 0-65.5-8.9-93.7-25.7l-6.7-4-82 21.5 21.9-79.9-4.4-7c-18.4-29.4-28.1-63.3-28.1-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.7-186.6 184.7zm101.8-138.9c-5.6-2.8-33.1-16.3-38.3-18.2-5.2-1.9-9-2.8-12.8 2.8-3.8 5.6-14.7 18.2-18 22-3.3 3.8-6.6 4.3-12.2 1.4-5.6-2.8-23.8-8.8-45.3-28-16.8-15-28.1-33.5-31.4-39-3.3-5.6-.4-8.6 2.5-11.4 2.5-2.5 5.6-6.6 8.5-9.9 2.8-3.3 3.8-5.6 5.6-9.4 1.9-3.8.9-7.1-.5-9.9-1.4-2.8-12.8-30.8-17.5-42.2-4.6-11.2-9.3-9.7-12.8-9.9-3.3-.2-7.1-.2-10.9-.2s-9.9 1.4-15.1 7.1c-5.2 5.6-20 19.5-20 47.6 0 28.1 20.4 55.2 23.3 59 2.8 3.8 40.2 61.4 97.4 86.2 13.6 5.9 24.2 9.4 32.5 12 13.7 4.4 26.2 3.8 36.1 2.3 11-1.6 33.1-13.5 37.8-26.6 4.7-13.1 4.7-24.3 3.3-26.6-1.5-2.3-5.2-3.8-10.8-6.6z" />
        </svg>
      </a>
    </>
  )
}
