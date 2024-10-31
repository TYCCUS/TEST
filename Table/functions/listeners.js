export function resizeListener(Renderer) {
        let resizeTimeout = null;
        window.addEventListener("resize", () => {
                Renderer.showWaitScreen();
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                        Renderer.render();
                        Renderer.hideWaitScreen();
                },200);
        });
}