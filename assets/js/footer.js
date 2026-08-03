(async function() {
    const footerContainer = document.getElementById('shared-footer');
    if (!footerContainer) return;

    // Get the base path parameter (default to current directory)
    const basePath = footerContainer.getAttribute('data-base-path') || './';

    footerContainer.className = "bg-gray-900 text-gray-400 border-t border-gray-800 pt-16 pb-8 text-sm mt-auto scroll-mt-20";
    footerContainer.id = "privacy-section";

    let siteConfig = {};
    try {
        const res = await fetch(`${basePath}data/site_config.json`);
        siteConfig = await res.json();
    } catch (err) {
        console.error("Gagal memuat konfigurasi footer dari JSON:", err);
    }

    const contact = siteConfig.contact || {};
    const footer = siteConfig.footer || {};

    const rawPhone = contact.phoneNumber || "6282299185425";
    const phone = rawPhone.replace(/^\+/, '').replace(/^0/, '62');
    const displayPhone = contact.phoneDisplay || "0822-9918-5425";
    const email = contact.email || "sales@hondabintaro.com";
    const salesName = contact.salesName || "Rere";
    const footerLogo = contact.footerLogo || "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiGGwKoZTHNAiyQl2GdhLVz8Ij_x3QgqEfXWi2DXS0R9TvzEZh8aH9aNQEOoyQORyRrbzTr_HP9MJDWdzKafn1341u6lM0uZZCB3Mcdz-OcTcYylVgBca3d4CeOzXrdrxX3h1VLtqznGnLkXOxL8Gfe6UM-VnPwx4XIAPfKUWcMmrWr4Tfkv-hhBjvqmCo/s1600/logo-honda-how-we-move-you.png";

    const aboutText = footer.aboutText || "Sales resmi Honda Bintaro Jabodetabek terpercaya. Dapatkan promo harga OTR terbaik, cicilan ringan, uang muka rendah serta bonus aksesoris melimpah.";
    const hours = footer.hours || "Senin - Sabtu: 08:30 - 17:00 WIB";
    const addressText = footer.address || "CBD 03 dan 05, Blok A2, Kota Taman Bintaro Jaya Sektor VII, Pondok Aren, Kec. Pondok Aren, Kota Tangerang Selatan, Banten 15224.";
    const mapLink = footer.mapLink || "https://maps.google.com/?q=Honda+Bintaro+Sektor+7";
    const paymentDesc = footer.paymentDesc || "Pembayaran aman dengan nomor virtual account resmi bank mandiri, BCA, maupun BRI yang didaftarkan khusus atas nama <b>Honda Bintaro</b>.";
    
    const banks = footer.paymentBanks || ["BCA", "MANDIRI", "BRI"];
    let banksHtml = '';
    banks.forEach(bank => {
        banksHtml += `<span class="bg-white text-gray-900 text-[10px] font-black px-2 py-0.5 rounded leading-none uppercase">${bank}</span>`;
    });

    const copyrightText = footer.copyright || `&copy; 2026 Honda Bintaro. All rights reserved. Developed for ${salesName}.`;

    footerContainer.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                
                <!-- Col 1: About & Logo -->
                <div class="space-y-4">
                    <img id="footer-logo-img" src="${footerLogo}" 
                         alt="Honda Logo" class="h-10 w-auto brightness-0 invert object-contain select-none">
                    <p class="text-xs leading-relaxed text-gray-500">${aboutText}</p>
                    <div class="pt-2 text-xs text-gray-500">
                        <span class="font-semibold block text-gray-400">Jam Operasional:</span>
                        ${hours}
                    </div>
                </div>

                <!-- Col 2: Dealer Address -->
                <div class="space-y-3">
                    <h5 class="text-white font-bold font-outfit uppercase tracking-wider text-xs">Honda Bintaro</h5>
                    <p class="text-xs leading-relaxed text-gray-500">${addressText}</p>
                    <a href="${mapLink}" target="_blank" class="inline-flex items-center gap-1.5 text-xs text-honda font-semibold hover:text-white transition">
                        <span>Lihat di Google Maps</span>
                        <span>&rarr;</span>
                    </a>
                </div>

                <!-- Col 3: Pembayaran Aman -->
                <div class="space-y-3">
                    <h5 class="text-white font-bold font-outfit uppercase tracking-wider text-xs">Pembayaran Aman</h5>
                    <p class="text-xs leading-relaxed text-gray-500">${paymentDesc}</p>
                    <div class="flex gap-2 items-center opacity-40 pt-1">
                        ${banksHtml}
                    </div>
                </div>

                <!-- Col 4: Hubungi Kami -->
                <div class="space-y-4">
                    <h5 class="text-white font-bold font-outfit uppercase tracking-wider text-xs">Hubungi Kami</h5>
                    <div class="space-y-2">
                        <a href="tel:${phone}" class="flex items-center gap-2 p-2 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-white transition">
                            <span>📞</span>
                            <span>Telepon: ${displayPhone}</span>
                        </a>
                        <a href="https://wa.me/${phone}" target="_blank" class="flex items-center gap-2 p-2 px-4 rounded-lg bg-green-950/40 border border-green-800/30 hover:bg-green-900/30 text-xs font-semibold text-green-400 transition">
                            <span>💬</span>
                            <span>WhatsApp: +62 ${displayPhone.replace(/^0/, '')}</span>
                        </a>
                        <a href="mailto:${email}" class="flex items-center gap-2 p-2 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-white transition">
                            <span>✉</span>
                            <span>Email: ${email}</span>
                        </a>
                    </div>
                </div>

            </div>

            <!-- Social & Copyright -->
            <div class="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
                <p>${copyrightText}</p>
                <div class="flex gap-4">
                    <a href="${basePath}#privacy-section" class="hover:text-white transition">Kebijakan Privasi</a>
                    <a href="${basePath}#privacy-section" class="hover:text-white transition">Syarat & Ketentuan</a>
                </div>
            </div>
        </div>
    `;

    // Dynamic Back to Top Button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top-btn';
    backToTopBtn.className = 'fixed bottom-6 right-6 p-3 rounded-full bg-[#cc0000] text-white shadow-xl opacity-0 pointer-events-none transition-all duration-300 z-40 hover:bg-[#990000] hover:scale-105 focus:outline-none cursor-pointer';
    backToTopBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
    `;
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            backToTopBtn.classList.add('opacity-100');
        } else {
            backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
            backToTopBtn.classList.remove('opacity-100');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();
