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

    const rawFooterLinks = footer.footerLinks || [
        { label: 'Kebijakan Privasi', link: '{basePath}#privacy-section' },
        { label: 'Syarat & Ketentuan', link: '{basePath}#privacy-section' }
    ];

    let footerLinksHtml = '';
    rawFooterLinks.forEach(fl => {
        if (!fl.label) return;
        let resolvedLink = (fl.link || '#').replace(/{basePath}/g, basePath);
        footerLinksHtml += `<a href="${resolvedLink}" class="hover:text-white transition">${fl.label}</a>`;
    });

    // Dynamic Columns Configuration (3 Grid vs 4 Grid & Variable Columns)
    const gridColumns = parseInt(footer.gridColumns || 4, 10);
    const rawColumns = footer.columns && Array.isArray(footer.columns) && footer.columns.length > 0
        ? footer.columns.slice(0, gridColumns)
        : [
            {
                id: "col-1",
                title: "",
                blocks: [{ type: "logo_about", logoUrl: footerLogo, text: aboutText }]
            },
            {
                id: "col-2",
                title: "LOKASI DEALER RESMI",
                blocks: [{ type: "google_maps", address: addressText, mapUrl: mapLink, btnText: "Buka Google Maps" }]
            },
            {
                id: "col-3",
                title: "JAM OPERASIONAL",
                blocks: [
                    { type: "hours", text: hours },
                    { type: "whatsapp_contact", label: "Layanan Sales Consult:", phoneDisplay: displayPhone, phoneNumber: phone, email: email }
                ]
            },
            {
                id: "col-4",
                title: "METODE PEMBAYARAN",
                blocks: [{ type: "bank_payment", text: paymentDesc, banks: banks }]
            }
        ];

    let gridClass = "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
    if (gridColumns === 3) {
        gridClass = "grid-cols-1 md:grid-cols-3";
    } else if (rawColumns.length === 1) {
        gridClass = "grid-cols-1";
    } else if (rawColumns.length === 2) {
        gridClass = "grid-cols-1 md:grid-cols-2";
    } else if (rawColumns.length === 3) {
        gridClass = "grid-cols-1 md:grid-cols-3";
    }

    let columnsHtml = '';
    rawColumns.forEach(col => {
        const titleHtml = col.title ? `<h4 class="font-bold text-white font-outfit text-sm uppercase tracking-wider mb-3">${col.title}</h4>` : '';
        let blocksHtml = '';

        const blocks = col.blocks && Array.isArray(col.blocks) ? col.blocks : [];
        blocks.forEach(b => {
            if (b.type === 'logo_about') {
                const logo = b.logoUrl || footerLogo;
                blocksHtml += `
                    <div class="space-y-3">
                        <img src="${logo}" alt="Honda" class="h-8 w-auto object-contain brightness-0 invert opacity-90 select-none">
                        <p class="text-xs text-gray-400 leading-relaxed">${b.text || ''}</p>
                    </div>
                `;
            } else if (b.type === 'google_maps') {
                const addr = b.address || addressText;
                const mUrl = b.mapUrl || mapLink;
                const bText = b.btnText || 'Buka Google Maps';
                blocksHtml += `
                    <div class="space-y-2">
                        <p class="text-xs leading-relaxed text-gray-400">${addr}</p>
                        ${mUrl ? `<a href="${mUrl}" target="_blank" class="inline-flex items-center gap-1 text-xs text-honda hover:underline font-semibold pt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            ${bText}
                        </a>` : ''}
                    </div>
                `;
            } else if (b.type === 'hours') {
                blocksHtml += `<p class="text-xs text-gray-400">${b.text || ''}</p>`;
            } else if (b.type === 'whatsapp_contact') {
                const label = b.label || 'Layanan Sales Consult:';
                const pDisp = b.phoneDisplay || displayPhone;
                const pNum = (b.phoneNumber || phone).replace(/^\+/, '').replace(/^0/, '62');
                const em = b.email || email;
                const waMsg = encodeURIComponent(`Halo ${salesName}, saya ingin berkonsultasi mengenai unit mobil Honda.`);

                blocksHtml += `
                    <div class="pt-1 space-y-1.5 text-xs">
                        <p class="text-gray-300 font-medium">${label}</p>
                        <a href="https://wa.me/${pNum}?text=${waMsg}" target="_blank" class="text-honda font-bold text-sm hover:underline inline-flex items-center gap-1.5 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                            +62 ${pDisp.replace(/^0/, '')}
                        </a>
                        ${em ? `<p class="text-[11px]"><a href="mailto:${em}" class="text-gray-400 hover:text-white transition">${em}</a></p>` : ''}
                    </div>
                `;
            } else if (b.type === 'bank_payment') {
                const txt = b.text || paymentDesc;
                const bList = b.banks || banks;
                let bHtml = '';
                bList.forEach(bank => {
                    bHtml += `<span class="bg-white text-gray-900 text-[10px] font-black px-2 py-0.5 rounded leading-none uppercase">${bank}</span>`;
                });
                blocksHtml += `
                    <div class="space-y-2">
                        <p class="text-xs text-gray-400 leading-relaxed">${txt}</p>
                        <div class="flex flex-wrap gap-1.5 pt-1">
                            ${bHtml}
                        </div>
                    </div>
                `;
            } else if (b.type === 'custom_link') {
                const txt = b.text || '';
                const bText = b.btnText || '';
                const lUrl = (b.linkUrl || '#').replace(/{basePath}/g, basePath);
                blocksHtml += `
                    <div class="space-y-2">
                        ${txt ? `<p class="text-xs text-gray-400 leading-relaxed">${txt}</p>` : ''}
                        ${bText ? `<a href="${lUrl}" class="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-honda text-white font-semibold text-xs transition hover:bg-honda-dark">${bText}</a>` : ''}
                    </div>
                `;
            } else {
                blocksHtml += `<p class="text-xs text-gray-400 leading-relaxed">${b.text || ''}</p>`;
            }
        });

        columnsHtml += `
            <div class="space-y-4">
                ${titleHtml}
                <div class="space-y-4">
                    ${blocksHtml}
                </div>
            </div>
        `;
    });

    footerContainer.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid ${gridClass} gap-10 mb-12">
                ${columnsHtml}
            </div>

            <!-- Bottom Socket Bar -->
            <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs gap-4">
                <p class="text-gray-500">${copyrightText}</p>
                <div class="flex items-center space-x-6 text-gray-500">
                    ${footerLinksHtml}
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
