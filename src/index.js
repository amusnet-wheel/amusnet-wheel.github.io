import page from '@page';
import { render } from '@lit';

import { addRender } from './mw/render.js';

import { showIntro } from './views/intro.js';
import { showWheel } from './views/wheel.js';

const root = document.querySelector('main');
const overlay = document.getElementById('overlay');
page(addRender(root, overlay, render));
page('/', showIntro);
page('/index.html', showIntro);
page('/wheel', showWheel);

page.start();
