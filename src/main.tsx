import {createRoot} from 'react-dom/client';
import Page from '../app/page';
import '../app/globals.css';
import '../app/nitro.css';
import '../app/focus-study.css';
import '../app/hero.css';
import '../app/advanced.css';

const root=document.getElementById('root');
if(!root)throw new Error('Medulla mount point is missing.');
createRoot(root).render(<Page/>);
