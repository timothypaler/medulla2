import {build} from 'vite';
import {readFile,writeFile,readdir,unlink,cp} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const root=fileURLToPath(new URL('../',import.meta.url));
await build();
const dist=path.join(root,'dist');
const files=await readdir(dist);
const scripts=files.filter(name=>name.endsWith('.js'));
const styles=files.filter(name=>name.endsWith('.css'));
if(scripts.length!==1||styles.length!==1)throw new Error('The standalone build must contain one script and one stylesheet.');
const [template,js,css,favicon,licenses]=await Promise.all([
 readFile(path.join(root,'src/index.html'),'utf8'),
 readFile(path.join(dist,scripts[0]),'utf8'),
 readFile(path.join(dist,styles[0]),'utf8'),
 readFile(path.join(root,'public/favicon.svg'),'utf8'),
 readFile(path.join(root,'public/THIRD-PARTY-NOTICES.txt'),'utf8')
]);
const inlineScript=js.replace(/<\/script/gi,'<\\/script');
const inlineStyle=css.replace(/<\/style/gi,'<\\/style');
const icon='data:image/svg+xml;base64,'+Buffer.from(favicon).toString('base64');
let html=template.replace('href="/favicon.svg"',`href="${icon}"`)
 .replace('</head>',`<style>${inlineStyle}</style>\n</head>`)
 .replace(/<script\s+type="module"\s+src="\/main\.tsx"><\/script>/,()=>`<script>${inlineScript}</script>`);
if(html===template||/<script[^>]+(?:type="module"|src=)/i.test(html))throw new Error('An external script remained in the standalone HTML.');
html=html.replace('</body>',`<!-- Third-party software licenses\n${licenses.replace(/-->/g,'-- >')}\n-->\n</body>`);
await Promise.all([
 writeFile(path.join(dist,'index.html'),html),
 writeFile(path.join(root,'index.html'),html)
]);
// Inline classic JavaScript and CSS preserve direct-file compatibility.
// Detailed source artwork stays adjacent, keeping every Pages file below 25 MiB.
await Promise.all([...scripts,...styles].map(name=>unlink(path.join(dist,name))));
for(const file of ['anatomy-credits.md','anatomy-objectives.csv'])await writeFile(path.join(root,file),await readFile(path.join(dist,file)));
await cp(path.join(dist,'anatomy'),path.join(root,'anatomy'),{recursive:true});
await cp(path.join(dist,'body-selector-v3.webp'),path.join(root,'body-selector-v3.webp'));
console.log(`Created direct-open index.html with adjacent artwork (${Buffer.byteLength(html).toLocaleString()} bytes) for direct opening and Cloudflare Pages.`);
