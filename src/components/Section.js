export default class Section {
    constructor({ renderer, container }) {
        this._renderer = renderer;
        this._container = container;
    }

    addItem(element) {
        this._container.prepend(element);
    }// принимает DOM-элемент и добавляет его в контейнер

    renderItems(items) {
        items.forEach(item => {
            this._renderer(item);
        });
    }
}