export function addRender(root, render) {
    return function(ctx, next) {
        ctx.render = (view) => {
            render(view, root);
        };

        next();
    };
}