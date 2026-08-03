(function() {
    const headerContainer = document.getElementById('shared-header');
    if (!headerContainer) return;

    // Base path relative configuration (default to "./")
    const basePath = headerContainer.getAttribute('data-base-path') || './';
    const isHomepage = headerContainer.getAttribute('data-page') === 'home';

    // Global helper to apply contact configuration dynamically
    window.applyContactConfig = function(config) {
        if (!config) return;
        const rawPhone = config.phoneNumber || "6282299185425";
        const phone = rawPhone.replace(/^\+/, '').replace(/^0/, '62');
        const display = config.phoneDisplay || "0822-9918-5425";
        const email = config.email || "sales@hondabintaro.com";
        const salesName = config.salesName || "Rere";

        // 1. Update all WhatsApp links
        const waLinks = document.querySelectorAll('a[href*="wa.me"]');
        waLinks.forEach(link => {
            try {
                const hrefVal = link.getAttribute('href') || '';
                const textIndex = hrefVal.indexOf('?text=');
                let searchParams = '';
                if (textIndex !== -1) {
                    searchParams = hrefVal.substring(textIndex);
                }
                
                if (searchParams) {
                    searchParams = searchParams.replace(/Rere/g, salesName);
                }

                link.href = `https://wa.me/${phone}${searchParams}`;
                
                // Update text label if it contains contact number patterns
                if (link.innerText.includes('WhatsApp:')) {
                    link.innerText = `WhatsApp: +62 ${display.replace(/^0/, '')}`;
                } else if (link.innerText.includes('0822-9918-5425') || link.innerText.includes('082299185425')) {
                    link.innerText = link.innerText.replace(/0822-9918-5425/g, display).replace(/082299185425/g, display);
                } else if (link.innerText.includes('WhatsApp Rere') || link.innerText.includes('WhatsApp Sales') || link.innerText.includes('WhatsApp ')) {
                    link.innerText = `WhatsApp ${salesName}`;
                }
            } catch (e) {
                console.error("Error updating WA link:", e);
            }
        });

        // 2. Update all telephone links
        const telLinks = document.querySelectorAll('a[href^="tel:"]');
        telLinks.forEach(link => {
            link.href = `tel:${phone}`;
            if (link.innerText.includes('Telepon:')) {
                link.innerText = `Telepon: ${display}`;
            } else if (link.innerText.includes('0822-9918-5425') || link.innerText.includes('082299185425')) {
                link.innerText = link.innerText.replace(/0822-9918-5425/g, display).replace(/082299185425/g, display);
            }
        });

        // 3. Update all email links
        const mailLinks = document.querySelectorAll('a[href^="mailto:"]');
        mailLinks.forEach(link => {
            link.href = `mailto:${email}`;
            if (link.innerText.includes('Email:')) {
                link.innerText = `Email: ${email}`;
            }
        });

        // 4. Update plain text occurrences of name or number
        const contactButtons = document.querySelectorAll('a, button, span, p');
        contactButtons.forEach(el => {
            if (el.children.length === 0) {
                if (el.innerText.includes('Rere')) {
                    el.innerText = el.innerText.replace(/Rere/g, salesName);
                }
                if (el.innerText.includes('0822-9918-5425')) {
                    el.innerText = el.innerText.replace(/0822-9918-5425/g, display);
                }
            }
        });

        // 5. Update header and footer logos dynamically
        if (config.headerLogo) {
            const headerLogoEl = document.getElementById('header-logo-img');
            if (headerLogoEl) headerLogoEl.src = config.headerLogo;
        }
        if (config.footerLogo) {
            const footerLogoEl = document.getElementById('footer-logo-img');
            if (footerLogoEl) footerLogoEl.src = config.footerLogo;
        }
    };

    // ================= FETCH AND RENDER PRODUCTS (Mega Menu + Search) =================
    let productsList = {};

    async function fetchHeaderProducts() {
        try {
            const res = await fetch(`${basePath}data/products.json`);
            productsList = await res.json();
            
            const config = productsList._config || {};
            
            // Build and inject HTML with dynamic config
            initializeHeaderDOM(config);
            
            // Apply config dynamically
            window.applyContactConfig(config);
        } catch (err) {
            console.error("Gagal memuat produk di header:", err);
            // Render using empty config fallbacks
            initializeHeaderDOM({});
        }
    }

    function initializeHeaderDOM(config) {
        const rawPhone = config.phoneNumber || "6282299185425";
        const phone = rawPhone.replace(/^\+/, '').replace(/^0/, '62');
        const display = config.phoneDisplay || "0822-9918-5425";
        const email = config.email || "sales@hondabintaro.com";
        const salesName = config.salesName || "Rere";
        const headerLogo = config.headerLogo || "https://blogger.googleusercontent.com/img/a/AVvXsEgHjSO7vshbtitZnLrJtGp6Dvi8MJzNIbTYAvxF9y17xT240jA2AlIx2IwbH9TFKeqbHswe5_Mk8YmsrZN8C_BgabRyiR6oHs8fvx7wfPWRpLodhDZmCgfsC130Xwxd0vF88BYOeXwbHlEqKVJeQNmNZFW-KEa-OkCYNZSKThMck9ZZh9zR5e6iM5DZvKb6=s1600";

        headerContainer.className = "bg-white border-b border-gray-100 sticky top-0 z-50 transition-all duration-300";
        
        // Inject header HTML markup
        headerContainer.innerHTML = `
            <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16 sm:h-20 gap-2 sm:gap-4">
                    
                    <!-- Logo -->
                    <a href="${basePath}" class="flex-shrink-0 flex items-center">
                        <img id="header-logo-img" src="${headerLogo}" 
                             alt="Honda Logo" class="h-7 sm:h-9 md:h-12 w-auto object-contain select-none">
                    </a>

                    <!-- Model Mega Menu Trigger (Hidden on Mobile < 640px to prevent overflow) -->
                    <div class="relative hidden sm:block">
                        <button id="mega-menu-btn" class="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-full hover:border-honda hover:text-honda font-medium text-xs sm:text-sm transition">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                            <span>Model</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform duration-200" id="mega-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>

                    <!-- Search Input Bar with Algolia Autocomplete wrapper (Desktop and Tablet) -->
                    <div class="flex-1 max-w-xs md:max-w-lg hidden md:block">
                        <div class="relative" id="algolia-search-wrapper">
                            <input type="text" id="search-input" placeholder="Cari Produk..." 
                                   class="w-full bg-gray-100 border-none rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-honda/20 focus:bg-white transition-all pl-11">
                            <span class="absolute left-4 top-3.5 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            
                            <!-- Algolia Search Dropdown -->
                            <div id="algolia-dropdown" class="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 hidden max-h-[380px] overflow-y-auto">
                                <div class="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">Hasil Pencarian</div>
                                <div id="algolia-hits" class="space-y-2 divide-y divide-gray-50">
                                    <!-- Results rendered dynamically -->
                                </div>
                                <div class="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center text-[10px] text-gray-400 font-semibold">
                                    <span id="algolia-hits-count">0 mobil ditemukan</span>
                                    <span class="flex items-center gap-1 text-[9px] text-gray-400">
                                        Search powered by
                                        <span class="text-blue-500 font-extrabold tracking-tight">Algolia</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Action Buttons -->
                    <div class="flex items-center gap-2 sm:gap-4">
                        <!-- Notification Bell -->
                        <button id="notification-bell" class="relative p-1.5 sm:p-2 text-gray-500 hover:text-honda transition-colors rounded-full hover:bg-gray-50 focus:outline-none">
                            <span class="absolute top-1 right-1 flex h-2 w-2">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-honda opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-2 w-2 bg-honda"></span>
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>

                        <!-- Sidebar Toggle Button -->
                        <button id="sidebar-open-btn" class="flex items-center gap-1.5 p-1.5 px-3 hover:bg-gray-100 rounded-full transition focus:outline-none text-gray-700 font-semibold text-xs sm:text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                            <span class="hidden sm:inline">Menu</span>
                        </button>
                    </div>

                </div>
            </div>

            <!-- DYNAMIC MEGA MENU PANEL OVERLAY -->
            <div id="mega-menu-panel" class="absolute left-0 right-0 bg-white border-b border-gray-100 shadow-xl opacity-0 translate-y-[-10px] pointer-events-none mega-menu-transition z-40 max-h-[85vh] overflow-y-auto">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-xl font-bold font-outfit text-gray-800">Daftar Model Mobil Honda</h3>
                        <button id="mega-menu-close-btn" class="text-gray-400 hover:text-gray-600 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div id="mega-menu-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <!-- Populated dynamically -->
                    </div>
                </div>
            </div>
        `;

        // Append Sidebar and Modal HTML to body
        const elementsWrapper = document.createElement('div');
        elementsWrapper.innerHTML = `
            <!-- RIGHT SIDEBAR MENU OVERLAY -->
            <div id="sidebar-backdrop" class="fixed inset-0 bg-black/40 opacity-0 pointer-events-none transition-opacity duration-300 z-50"></div>
            <div id="sidebar-panel" class="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 transform translate-x-full sidebar-transition flex flex-col">
                <div class="p-5 border-b border-gray-100 flex justify-between items-center">
                    <span class="font-bold text-lg font-outfit text-gray-900">Navigasi</span>
                    <button id="sidebar-close-btn" class="text-gray-400 hover:text-gray-600 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div class="flex-1 overflow-y-auto py-2">
                    <!-- Mobile Search Box (Algolia) -->
                    <div class="px-4 py-3 md:hidden">
                        <div class="relative" id="algolia-search-wrapper-mobile">
                            <input type="text" id="search-input-mobile" placeholder="Cari tipe mobil..." 
                                   class="w-full bg-gray-100 border-none rounded-full px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-honda/20 focus:bg-white transition-all pl-9">
                            <span class="absolute left-3.5 top-2.5 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            
                            <!-- Mobile Search Dropdown -->
                            <div id="algolia-dropdown-mobile" class="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 p-3 z-50 hidden max-h-[300px] overflow-y-auto">
                                <div class="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-2">Hasil Pencarian</div>
                                <div id="algolia-hits-mobile" class="space-y-2 divide-y divide-gray-50"></div>
                                <div class="mt-3 pt-2 border-t border-gray-50 flex justify-between items-center text-[9px] text-gray-400">
                                    <span id="algolia-hits-count-mobile">0 mobil</span>
                                    <span class="flex items-center gap-0.5">
                                        Search by <span class="text-blue-500 font-extrabold tracking-tight">Algolia</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <nav class="px-4 space-y-1">
                        <a href="${basePath}" class="block px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">Halaman Utama</a>
                        <a href="https://wa.me/${phone}?text=Halo%20${salesName},%20saya%20ingin%20booking%20test%20drive%20mobil%20Honda." target="_blank" class="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">Booking Test Drive</a>
                        <a href="${basePath}#promo-section" class="sidebar-link block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">Promo Honda 2026</a>
                        
                        <!-- Collapsible Model Menu inside Sidebar -->
                        <div>
                            <button id="sidebar-model-toggle" class="flex justify-between items-center w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition focus:outline-none">
                                <span>Model Mobil</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform transition-transform duration-200" id="sidebar-model-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div id="sidebar-model-list" class="hidden pl-6 space-y-1 mt-1">
                                <a href="${basePath}index.html?cat=${encodeURIComponent('City Car & Hatchback')}#model-list-section" class="sidebar-cat-link block px-4 py-1.5 text-xs font-medium text-gray-500 hover:text-honda transition">City Car & Hatchback</a>
                                <a href="${basePath}index.html?cat=${encodeURIComponent('MPV')}#model-list-section" class="sidebar-cat-link block px-4 py-1.5 text-xs font-medium text-gray-500 hover:text-honda transition">MPV</a>
                                <a href="${basePath}index.html?cat=${encodeURIComponent('Sedan')}#model-list-section" class="sidebar-cat-link block px-4 py-1.5 text-xs font-medium text-gray-500 hover:text-honda transition">Sedan</a>
                                <a href="${basePath}index.html?cat=${encodeURIComponent('SUV')}#model-list-section" class="sidebar-cat-link block px-4 py-1.5 text-xs font-medium text-gray-500 hover:text-honda transition">SUV</a>
                            </div>
                        </div>

                        <a href="${basePath}#kredit-section" class="sidebar-link block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">Persyaratan Kredit</a>
                        <a href="${basePath}#faq-section" class="sidebar-link block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">FAQ</a>
                    </nav>
                </div>
                
                <div class="p-6 border-t border-gray-100 bg-gray-50 text-center">
                    <span class="text-xs text-gray-400 block mb-3 font-semibold">Sales Counter Resmi</span>
                    <a href="https://wa.me/${phone}" target="_blank" class="flex items-center justify-center gap-2 w-full bg-green-500 text-white py-2.5 rounded-full hover:bg-green-600 font-bold text-sm transition">
                        <span>WhatsApp ${salesName}</span>
                    </a>
                </div>
            </div>

            <!-- WARNING FRAUD MODAL -->
            <div id="fraud-modal" class="fixed inset-0 bg-black/60 opacity-0 pointer-events-none transition-opacity duration-300 z-50 flex items-center justify-center p-4">
                <div class="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl transform scale-95 transition-transform duration-300" id="fraud-modal-panel">
                    <div class="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <div class="flex items-center gap-2 text-honda">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span class="font-bold text-sm sm:text-base text-gray-900 font-outfit">Pemberitahuan</span>
                        </div>
                        <button id="fraud-modal-close" class="text-gray-400 hover:text-gray-600 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div class="p-4 bg-white max-h-[70vh] overflow-y-auto flex items-center justify-center">
                        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirhSQH2IYumXgPsAecW2g7mDOvCDGxBeVniHOAV3Gw5EWjKYbMGtlyin5PNaFVtXmNh7NWGTp-EFTIsB6V2tG_INT2G-xZXbtvB5urudV929fSDuBDJHOWfoHADZYhLPbxq1LV7S6nfgZztN0jb7picoLYnH_U4o2NluV-DQL1Wx7ZMHnt0vtLzxcgS6ek/s1600/WARNING-FRAUD-DEALER-(FEED).jpg" 
                             alt="Warning Fraud Dealer" class="max-w-full h-auto object-contain rounded-xl select-none" draggable="false">
                    </div>
                    <div class="p-4 bg-gray-50 border-t border-gray-100 text-center text-xs font-semibold text-gray-600">
                        Berhati-hati saat bertransaksi! Pastikan transfer to rekening resmi dealer.
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(elementsWrapper);

        // ================= EVENT LISTENING & ACCORDIONS =================
        const megaMenuBtn = document.getElementById('mega-menu-btn');
        const megaMenuPanel = document.getElementById('mega-menu-panel');
        const megaMenuArrow = document.getElementById('mega-arrow');
        const megaMenuCloseBtn = document.getElementById('mega-menu-close-btn');

        const sidebarOpenBtn = document.getElementById('sidebar-open-btn');
        const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
        const sidebarPanel = document.getElementById('sidebar-panel');
        const sidebarBackdrop = document.getElementById('sidebar-backdrop');
        const sidebarLinks = document.querySelectorAll('.sidebar-link, .sidebar-cat-link');

        const sidebarModelToggle = document.getElementById('sidebar-model-toggle');
        const sidebarModelList = document.getElementById('sidebar-model-list');
        const sidebarModelArrow = document.getElementById('sidebar-model-arrow');

        const notificationBtn = document.getElementById('notification-bell');
        const fraudModal = document.getElementById('fraud-modal');
        const fraudModalPanel = document.getElementById('fraud-modal-panel');
        const fraudModalClose = document.getElementById('fraud-modal-close');

        // Sidebar triggers
        function openSidebar() {
            sidebarPanel.classList.remove('translate-x-full');
            sidebarBackdrop.classList.add('opacity-100');
            sidebarBackdrop.classList.remove('opacity-0', 'pointer-events-none');
            document.body.classList.add('overflow-hidden');
        }

        function closeSidebar() {
            sidebarPanel.classList.add('translate-x-full');
            sidebarBackdrop.classList.remove('opacity-100');
            sidebarBackdrop.classList.add('opacity-0', 'pointer-events-none');
            document.body.classList.remove('overflow-hidden');
        }

        if (sidebarOpenBtn) sidebarOpenBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openSidebar();
            closeMegaMenu();
        });
        if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeSidebar);
        if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeSidebar);

        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeSidebar();
            });
        });

        if (sidebarModelToggle) {
            sidebarModelToggle.addEventListener('click', () => {
                sidebarModelList.classList.toggle('hidden');
                sidebarModelArrow.classList.toggle('rotate-180');
            });
        }

        // Mega menu triggers
        function openMegaMenu() {
            megaMenuPanel.classList.add('opacity-100', 'pointer-events-auto');
            megaMenuPanel.classList.remove('opacity-0', 'pointer-events-none');
            if (megaMenuArrow) megaMenuArrow.classList.add('rotate-180');
        }

        function closeMegaMenu() {
            if (!megaMenuPanel) return;
            megaMenuPanel.classList.remove('opacity-100', 'pointer-events-auto');
            megaMenuPanel.classList.add('opacity-0', 'pointer-events-none');
            if (megaMenuArrow) megaMenuArrow.classList.remove('rotate-180');
        }

        if (megaMenuBtn) {
            megaMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (megaMenuPanel.classList.contains('opacity-0')) {
                    openMegaMenu();
                    closeSidebar();
                } else {
                    closeMegaMenu();
                }
            });
        }
        if (megaMenuCloseBtn) megaMenuCloseBtn.addEventListener('click', closeMegaMenu);

        window.addEventListener('click', (e) => {
            if (megaMenuPanel && !megaMenuPanel.contains(e.target) && e.target !== megaMenuBtn && (!megaMenuBtn || !megaMenuBtn.contains(e.target))) {
                closeMegaMenu();
            }
        });

        // Warning fraud modal triggers
        function openFraudModal() {
            fraudModal.classList.remove('opacity-0', 'pointer-events-none');
            fraudModal.classList.add('opacity-100');
            fraudModalPanel.classList.remove('scale-95');
            fraudModalPanel.classList.add('scale-100');
            document.body.classList.add('overflow-hidden');
        }

        function closeFraudModal() {
            fraudModal.classList.add('opacity-0', 'pointer-events-none');
            fraudModal.classList.remove('opacity-100');
            fraudModalPanel.classList.add('scale-95');
            fraudModalPanel.classList.remove('scale-100');
            document.body.classList.remove('overflow-hidden');
        }

        if (notificationBtn) {
            notificationBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openFraudModal();
                closeMegaMenu();
                closeSidebar();
            });
        }
        if (fraudModalClose) fraudModalClose.addEventListener('click', closeFraudModal);
        window.addEventListener('click', (e) => {
            if (e.target === fraudModal) {
                closeFraudModal();
            }
        });

        populateMegaMenuGrid();
        initAlgoliaSearch();
    }

    function populateMegaMenuGrid() {
        const grid = document.getElementById('mega-menu-grid');
        if (!grid) return;
        grid.innerHTML = '';

        // Sort products dynamically based on configuration
        let carsArray = Object.entries(productsList).filter(([id]) => id !== '_config');
        const orderList = productsList._config?.productOrder || [];
        
        carsArray.sort((a, b) => {
            const [idA, carA] = a;
            const [idB, carB] = b;
            
            // 1. Sort by productOrder array in config
            if (orderList.length > 0) {
                const indexA = orderList.indexOf(idA);
                const indexB = orderList.indexOf(idB);
                if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                if (indexA !== -1) return -1;
                if (indexB !== -1) return 1;
            }
            
            // 2. Sort by 'order' property inside the product
            const orderA = carA.order !== undefined ? carA.order : 9999;
            const orderB = carB.order !== undefined ? carB.order : 9999;
            if (orderA !== orderB) return orderA - orderB;
            
            return 0; // fallback to original JSON order
        });

        for (const [id, car] of carsArray) {
            const isNew = car.new;
            const priceFormatted = car.price ? 'Rp ' + car.price.toLocaleString('id-ID') : 'Hubungi Dealer';
            const detailUrl = `${basePath}model/${id}/`;
            
            const rawThumb = car.images[0].thumb;
            const thumbUrl = (rawThumb.startsWith('http://') || rawThumb.startsWith('https://')) 
                ? rawThumb 
                : `${basePath}${rawThumb.replace(/^\.\//, '')}`;

            grid.innerHTML += `
                <a href="${detailUrl}" class="bg-gray-50 hover:bg-gray-100/70 border border-gray-100 rounded-xl p-4 flex flex-col items-center justify-between text-center relative hover:shadow-md transition duration-300 group">
                    ${isNew ? `
                        <span class="absolute top-2.5 right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-[9px] font-black text-white uppercase shadow-sm tracking-wider">
                            NEW
                        </span>` : ''}
                    
                    <div class="h-20 sm:h-24 w-full flex items-center justify-center my-2 sm:my-3 overflow-hidden">
                        <img src="${thumbUrl}" alt="${car.name}" 
                             class="max-h-full max-w-[90%] object-contain group-hover:scale-105 transition-transform duration-300 select-none" draggable="false">
                    </div>
                    
                    <div class="w-full mt-auto">
                        <h4 class="font-bold text-xs sm:text-sm text-gray-800 font-outfit mb-1.5 truncate">${car.name}</h4>
                        <span class="inline-block border border-gray-300 text-[9px] font-bold text-gray-500 px-3 py-1 rounded-full uppercase tracking-wider bg-white group-hover:border-honda group-hover:text-honda transition-colors truncate max-w-full">
                            Harga: ${priceFormatted}
                        </span>
                    </div>
                </a>
            `;
        }
    }

    // ================= ALGOLIA INSTANT SEARCH LOGIC =================
    function initAlgoliaSearch() {
        // Desktop Search
        const searchInput = document.getElementById('search-input');
        const dropdown = document.getElementById('algolia-dropdown');
        const hitsContainer = document.getElementById('algolia-hits');
        const hitsCount = document.getElementById('algolia-hits-count');

        // Mobile Search
        const searchInputMobile = document.getElementById('search-input-mobile');
        const dropdownMobile = document.getElementById('algolia-dropdown-mobile');
        const hitsContainerMobile = document.getElementById('algolia-hits-mobile');
        const hitsCountMobile = document.getElementById('algolia-hits-count-mobile');

        function handleSearch(query, hitsDiv, countSpan, dropdownPanel) {
            const cleanQuery = query.toLowerCase().trim();
            if (cleanQuery === '') {
                dropdownPanel.classList.add('hidden');
                return;
            }

            const matches = [];
            for (const [id, car] of Object.entries(productsList)) {
                if (id === '_config') continue;
                if (car.name.toLowerCase().includes(cleanQuery) || 
                    car.category.toLowerCase().includes(cleanQuery) || 
                    car.engine.toLowerCase().includes(cleanQuery)) {
                    matches.push({ id, ...car });
                }
            }

            hitsDiv.innerHTML = '';
            countSpan.innerText = `${matches.length} mobil ditemukan`;

            if (matches.length === 0) {
                hitsDiv.innerHTML = `
                    <div class="text-center py-6 text-xs text-gray-400">
                        Tidak ada model mobil yang cocok.
                    </div>
                `;
            } else {
                matches.forEach(car => {
                    const priceFormatted = car.price ? 'Rp ' + car.price.toLocaleString('id-ID') : 'Hubungi Dealer';
                    const detailUrl = `${basePath}model/${car.id}/`;
                    
                    const rawThumb = car.images[0].thumb;
                    const thumbUrl = (rawThumb.startsWith('http://') || rawThumb.startsWith('https://')) 
                        ? rawThumb 
                        : `${basePath}${rawThumb.replace(/^\.\//, '')}`;
                    
                    hitsDiv.innerHTML += `
                        <a href="${detailUrl}" class="flex items-center gap-3 py-2.5 hover:bg-gray-50/80 transition px-1 rounded-lg">
                            <div class="h-10 w-14 flex items-center justify-center overflow-hidden bg-gray-50 rounded border border-gray-100 flex-shrink-0">
                                <img src="${thumbUrl}" alt="${car.name}" class="max-h-full max-w-full object-contain select-none" draggable="false">
                            </div>
                            <div class="flex-1 min-w-0">
                                <h4 class="font-bold text-xs text-gray-900 truncate font-outfit">${car.name}</h4>
                                <p class="text-[9px] text-gray-400 font-semibold uppercase tracking-wider">${car.category}</p>
                            </div>
                            <div class="text-right flex-shrink-0">
                                <span class="text-xs font-bold text-honda block">${priceFormatted}</span>
                                <span class="text-[9px] text-gray-400 font-semibold block">${car.seats} &bull; ${car.engine}</span>
                            </div>
                        </a>
                    `;
                });
            }

            dropdownPanel.classList.remove('hidden');
        }

        // Bind desktop listeners
        if (searchInput && dropdown) {
            searchInput.addEventListener('input', () => {
                handleSearch(searchInput.value, hitsContainer, hitsCount, dropdown);
            });
            searchInput.addEventListener('focus', () => {
                if (searchInput.value.trim() !== '') {
                    dropdown.classList.remove('hidden');
                }
            });
            window.addEventListener('click', (e) => {
                if (!document.getElementById('algolia-search-wrapper').contains(e.target)) {
                    dropdown.classList.add('hidden');
                }
            });
        }

        // Bind mobile listeners
        if (searchInputMobile && dropdownMobile) {
            searchInputMobile.addEventListener('input', () => {
                handleSearch(searchInputMobile.value, hitsContainerMobile, hitsCountMobile, dropdownMobile);
            });
            searchInputMobile.addEventListener('focus', () => {
                if (searchInputMobile.value.trim() !== '') {
                    dropdownMobile.classList.remove('hidden');
                }
            });
            window.addEventListener('click', (e) => {
                const wrapper = document.getElementById('algolia-search-wrapper-mobile');
                if (wrapper && !wrapper.contains(e.target)) {
                    dropdownMobile.classList.add('hidden');
                }
            });
        }
    }

    // Load menu products on start
    fetchHeaderProducts();
})();
