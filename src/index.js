import page from '@page';
import { render } from '@lit';

import { addRender } from './mw/render.js';

import { showIntro } from './views/intro.js';
import { showWheel } from './views/wheel.js';

const root = document.body;

page(addRender(root, render));
page('/', showIntro);
page('/index.html', showIntro);
page('/wheel', showWheel);

page.start();