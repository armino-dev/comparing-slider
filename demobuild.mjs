import fileSystem from 'fs';

const sha1Digest = async (text) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hash = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hash));

    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const getFileText = (path) => {
    return new Promise((resolve, reject) => {
        fileSystem.readFile(path, 'utf-8', (error, data) => {
            if (error) {
                reject(error);
            }
            resolve(data);
        });
    });
};

const writeFileText = (path, text) => {
    fileSystem.writeFile(path, text, (error) => {
        if (error) {
            console.error(error);
        }
    });
};

const makeCssHash = async () => {
    const cssText = await getFileText('dist/comparing-slider.min.css');
    const demoCss = await getFileText('demo/index.css');
    const demoHtml = await getFileText('demo/index.html');
    const hash = await sha1Digest(cssText);
    const demoHash = await sha1Digest(demoCss);
    
    let regex = /@import\s*"\.\.\/dist\/comparing-slider\.min\.css\?v=([^"]+)";/g;
    let replacement = '@import "../dist/comparing-slider.min.css?v=NEW_VALUE";';
    let newValue = hash;

    const newDemoCss = demoCss.replace(regex, replacement.replace('NEW_VALUE', newValue));
    writeFileText('demo/index.css', newDemoCss);

    regex = /\<link\s*rel\=\"stylesheet\"\s*href\=\"index.css\?v=([^"]+)"\>\<\/link\>/g;
    replacement = '<link rel="stylesheet" href="index.css?v=NEW_VALUE"></link>';
    newValue = demoHash;
    
    const newDemoHtml = demoHtml.replace(regex, replacement.replace('NEW_VALUE', newValue));
    writeFileText('demo/index.html', newDemoHtml);
};

const makeJsHash = async () => {
    const jsText = await getFileText('dist/comparing-slider.min.js');
    const demoHtml = await getFileText('demo/index.html');
    const hash = await sha1Digest(jsText);
    

    const regex = /\<script src\=\"\.\.\/dist\/comparing-slider\.min\.js\?v=([^"]+)"\>\<\/script\>/g;
    let replacement = '<script src="../dist/comparing-slider.min.js?v=NEW_VALUE"></script>';
    let newValue = hash;
    
    const newDemoHtml = demoHtml.replace(regex, replacement.replace('NEW_VALUE', newValue));
    writeFileText('demo/index.html', newDemoHtml);
};

const main = async () => {
    await makeCssHash();
    await makeJsHash();
};

console.time('Build time');
main();
console.timeEnd('Build time');
