(function() {
    const footerContainer = document.getElementById('shared-footer');
    if (!footerContainer) return;

    // Get the base path parameter (default to current directory)
    const basePath = footerContainer.getAttribute('data-base-path') || './';

    footerContainer.className = "bg-gray-900 text-gray-400 border-t border-gray-800 pt-16 pb-8 text-sm mt-auto scroll-mt-20";
    footerContainer.id = "privacy-section";

    footerContainer.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                
                <!-- Col 1: About & Logo -->
                <div class="space-y-4">
                    <img src="https://blogger.googleusercontent.com/img/a/AVvXsEgHjSO7vshbtitZnLrJtGp6Dvi8MJzNIbTYAvxF9y17xT240jA2AlIx2IwbH9TFKeqbHswe5_Mk8YmsrZN8C_BgabRyiR6oHs8fvx7wfPWRpLodhDZmCgfsC130Xwxd0vF88BYOeXwbHlEqKVJeQNmNZFW-KEa-OkCYNZSKThMck9ZZh9zR5e6iM5DZvKb6=s1600" 
                         alt="Honda White Logo" class="h-10 w-auto brightness-0 invert object-contain select-none">
                    <p class="text-xs leading-relaxed text-gray-500">Sales resmi Honda Bintaro Jabodetabek terpercaya. Dapatkan promo harga OTR terbaik, cicilan ringan, uang muka rendah serta bonus aksesoris melimpah.</p>
                    <div class="pt-2 text-xs text-gray-500">
                        <span class="font-semibold block text-gray-400">Jam Operasional:</span>
                        Senin - Sabtu: 08:30 - 17:00 WIB
                    </div>
                </div>

                <!-- Col 2: Dealer Address -->
                <div class="space-y-3">
                    <h5 class="text-white font-bold font-outfit uppercase tracking-wider text-xs">Honda Bintaro</h5>
                    <p class="text-xs leading-relaxed text-gray-500">CBD 03 dan 05, Blok A2, Kota Taman Bintaro Jaya Sektor VII, Pondok Aren, Kec. Pondok Aren, Kota Tangerang Selatan, Banten 15224.</p>
                    <a href="https://maps.google.com/?q=Honda+Bintaro+Sektor+7" target="_blank" class="inline-flex items-center gap-1.5 text-xs text-honda font-semibold hover:text-white transition">
                        <span>Lihat di Google Maps</span>
                        <span>&rarr;</span>
                    </a>
                </div>

                <!-- Col 3: Pembayaran Aman -->
                <div class="space-y-3">
                    <h5 class="text-white font-bold font-outfit uppercase tracking-wider text-xs">Pembayaran Aman</h5>
                    <p class="text-xs leading-relaxed text-gray-500">Pembayaran aman dengan nomor virtual account resmi bank mandiri, BCA, maupun BRI yang didaftarkan khusus atas nama <b>Honda Bintaro</b>.</p>
                    <div class="flex gap-2 items-center opacity-40 pt-1">
                        <span class="bg-white text-gray-900 text-[10px] font-black px-2 py-0.5 rounded leading-none">BCA</span>
                        <span class="bg-white text-gray-900 text-[10px] font-black px-2 py-0.5 rounded leading-none">MANDIRI</span>
                        <span class="bg-white text-gray-900 text-[10px] font-black px-2 py-0.5 rounded leading-none">BRI</span>
                    </div>
                </div>

                <!-- Col 4: Hubungi Kami -->
                <div class="space-y-4">
                    <h5 class="text-white font-bold font-outfit uppercase tracking-wider text-xs">Hubungi Kami</h5>
                    <div class="space-y-2">
                        <a href="tel:6282299185425" class="flex items-center gap-2 p-2 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-white transition">
                            <span>📞</span>
                            <span>Telepon: 0822-9918-5425</span>
                        </a>
                        <a href="https://wa.me/6282299185425" target="_blank" class="flex items-center gap-2 p-2 px-4 rounded-lg bg-green-950/40 border border-green-800/30 hover:bg-green-900/30 text-xs font-semibold text-green-400 transition">
                            <span>💬</span>
                            <span>WhatsApp: +62 822-9918-5425</span>
                        </a>
                        <a href="mailto:gusti.ardias@hondabintaro.com" class="flex items-center gap-2 p-2 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-white transition">
                            <span>✉</span>
                            <span>Email: sales@hondabintaro.com</span>
                        </a>
                    </div>
                </div>

            </div>

            <!-- Social & Copyright -->
            <div class="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
                <p>&copy; 2026 Honda Bintaro. All rights reserved. Developed for Gusti.</p>
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
