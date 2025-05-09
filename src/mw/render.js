export function addRender(root, render) {
    return function (ctx, next) {
        ctx.render = (view) => {
            render(view, root);
        };

        ctx.overlay = (view) => {
            let element = document.getElementById('overlay');

            if (element) {
                element.remove();
            }

            element = document.createElement('section');
            // element.onclick = () => element.remove();
            element.id = 'overlay';
            document.body.appendChild(element);

            render(view, element);
        };

        next();
    };
}
