export function addRender(root, overlay, render) {
    return function (ctx, next) {
        ctx.render = (view) => {
            render(view, root);
        };

        ctx.overlay = (view) => {
            render(view, overlay);
        };

        next();
    };
}
