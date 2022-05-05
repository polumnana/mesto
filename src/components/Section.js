class Section {
    constructor({ items, renderer }, containerSelector) {
        this._initialArray = items;
        this._renderer = renderer;

        this._container = document.querySelector(containerSelector);
    }

    addItem(element) {
        this._container.prepend(element);
    }// принимает DOM-элемент и добавляет его в контейнер

    renderItems() {
        this.clear();

        this._renderedItems.forEach(item => {
            this._renderer(item);
        });
    }

}