const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const configPath = path.join(projectRoot, 'data/site_config.json');
const productsPath = path.join(projectRoot, 'data/products.json');

const targets = [
    { filePath: 'index.html', key: 'home', basePath: './' },
    { filePath: 'pricelist/index.html', key: 'pricelist', basePath: '../' },
    { filePath: 'brochure/index.html', key: 'brochure', basePath: '../' },
    { filePath: 'promo/index.html', key: 'promo', basePath: '../' },
    { filePath: 'thank-you/index.html', key: 'thank-you', basePath: '../' }
];

// Scan model directory to dynamically add all generated model page targets
const modelDir = path.join(projectRoot, 'model');
if (fs.existsSync(modelDir)) {
    const folders = fs.readdirSync(modelDir);
    folders.forEach(folder => {
        const folderPath = path.join(modelDir, folder);
        if (fs.statSync(folderPath).isDirectory()) {
            const indexFilePath = path.join(folder, 'index.html');
            const fullIndexFilePath = path.join(modelDir, indexFilePath);
            if (fs.existsSync(fullIndexFilePath)) {
                targets.push({
                    filePath: path.join('model', indexFilePath),
                    key: 'model',
                    modelId: folder,
                    basePath: '../../'
                });
            }
        }
    });
}

try {
    console.log('Starting static SEO & Favicon synchronization...');
    
    // 1. Read configuration JSON
    const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    if (!configData.seo) {
        throw new Error('Property "seo" not found in site_config.json');
    }
    
    // 2. Read products database for automatic OG image mapping
    let productsData = {};
    if (fs.existsSync(productsPath)) {
        productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
    }
    
    const seoConfig = configData.seo;
    const faviconUrl = configData.site?.favicon || "https://asset.honda-indonesia.com/2023/07/26/favicon.ico";
    
    // 3. Process each target HTML page
    targets.forEach(target => {
        const fullPath = path.join(projectRoot, target.filePath);
        if (!fs.existsSync(fullPath)) {
            console.warn(`File not found, skipping: ${target.filePath}`);
            return;
        }
        
        let html = fs.readFileSync(fullPath, 'utf8');
        
        // Retrieve SEO data for this target
        let seoData = null;
        if (target.key === 'model' && target.modelId) {
            seoData = seoConfig.models ? seoConfig.models[target.modelId] : null;
        } else {
            seoData = seoConfig[target.key];
        }
        
        if (!seoData) {
            seoData = seoConfig.default || {};
            console.warn(`SEO configuration not found for target [${target.filePath}]. Using default SEO configuration.`);
        }
        
        // Determine OpenGraph image path (Auto fallback to product full/thumb image if model page)
        let relativeImg = seoData.image;
        if (!relativeImg && target.key === 'model' && target.modelId && productsData[target.modelId]) {
            const carData = productsData[target.modelId];
            relativeImg = carData.images?.[0]?.full || carData.images?.[0]?.thumb;
        }
        if (!relativeImg) {
            relativeImg = seoConfig.default?.image || 'assets/images/logo.png';
        }
        
        const pageImg = relativeImg.startsWith('http') ? relativeImg : `${target.basePath}${relativeImg}`;
        
        // Format year values statically
        const currentYear = new Date().getFullYear().toString();
        const replaceYear = (str) => str ? str.replace(/{year}/g, currentYear) : '';
        
        const pageTitle = replaceYear(seoData.title);
        const pageDesc = replaceYear(seoData.description);
        const pageKeywords = replaceYear(seoData.keywords);

        // Prepare replacement meta & link block
        const seoMetaBlock = `
    <!-- Primary SEO Metadata -->
    <title>${pageTitle}</title>
    <meta name="description" content="${pageDesc}">
    <meta name="keywords" content="${pageKeywords}">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="${pageTitle}">
    <meta property="og:description" content="${pageDesc}">
    <meta property="og:image" content="${pageImg}">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${pageTitle}">
    <meta name="twitter:description" content="${pageDesc}">
    <meta name="twitter:image" content="${pageImg}">

    <!-- Favicon -->
    <link rel="icon" href="${faviconUrl}" type="image/x-icon">`;

        // Parse HTML to clean existing metadata and inject new meta block
        // Find positions of <head> and first elements inside <head>
        const headStartMatch = /<head[^>]*>/i.exec(html);
        if (!headStartMatch) {
            console.error(`Could not find <head> block in ${target.filePath}`);
            return;
        }
        
        const headStartIndex = headStartMatch.index + headStartMatch[0].length;
        
        // Let's remove any existing titles/metas/favicons in the head
        let headContent = html.substring(headStartIndex, html.indexOf('</head>', headStartIndex));
        
        // Strip previous SEO & favicon blocks if they exist (clean cleanup)
        headContent = headContent.replace(/<title>[\s\S]*?<\/title>/gi, '');
        headContent = headContent.replace(/<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/gi, '');
        headContent = headContent.replace(/<meta\s+name="keywords"\s+content="[\s\S]*?"\s*\/?>/gi, '');
        headContent = headContent.replace(/<meta\s+property="og:[\s\S]*?"\s+content="[\s\S]*?"\s*\/?>/gi, '');
        headContent = headContent.replace(/<meta\s+name="twitter:[\s\S]*?"\s+content="[\s\S]*?"\s*\/?>/gi, '');
        headContent = headContent.replace(/<link\s+rel="[^"]*icon"\s+href="[^"]*"\s*\/?>/gi, '');
        headContent = headContent.replace(/<link\s+rel="shortcut\s+icon"\s+href="[^"]*"\s*\/?>/gi, '');
        
        // Also strip any custom-placed SEO metadata block comment to keep it clean
        headContent = headContent.replace(/<!-- Primary SEO Metadata -->[\s\S]*?<link rel="icon"[^>]*>\s*/gi, '');
        
        // Reassemble HTML: inject new SEO block right at the top of <head>, preserving original indentation of everything else
        const preHead = html.substring(0, headStartIndex);
        const postHead = html.substring(html.indexOf('</head>', headStartIndex));
        
        // Clean multiple newlines in headContent to keep it tidy
        let cleanedHeadContent = headContent.replace(/\n\s*\n/g, '\n');
        
        let newHtml = `${preHead}${seoMetaBlock}${cleanedHeadContent}${postHead}`;
        
        // Enforce shared-header data attributes for absolute client-side dynamic safety
        const headerMatch = /<div\s+id="shared-header"\s+([^>]*)\/?>/i.exec(newHtml);
        if (headerMatch) {
            const rawAttributes = headerMatch[1];
            let newAttributes = rawAttributes;
            
            // Set data-page
            if (newAttributes.includes('data-page=')) {
                newAttributes = newAttributes.replace(/data-page="[^"]*"/g, `data-page="${target.key}"`);
            } else {
                newAttributes += ` data-page="${target.key}"`;
            }
            
            // Set data-model-id
            if (target.key === 'model' && target.modelId) {
                if (newAttributes.includes('data-model-id=')) {
                    newAttributes = newAttributes.replace(/data-model-id="[^"]*"/g, `data-model-id="${target.modelId}"`);
                } else {
                    newAttributes += ` data-model-id="${target.modelId}"`;
                }
            } else {
                newAttributes = newAttributes.replace(/\s*data-model-id="[^"]*"/g, '');
            }
            
            newHtml = newHtml.replace(headerMatch[0], `<div id="shared-header" ${newAttributes.trim()}>`);
        }
        
        fs.writeFileSync(fullPath, newHtml, 'utf8');
        console.log(`Static SEO & Favicon synchronized successfully: ${target.filePath}`);
    });
    
    console.log('Static SEO & Favicon synchronization completed successfully!');
} catch (err) {
    console.error('Error during static SEO & Favicon synchronization:', err);
    process.exit(1);
}
