class Section {
    constructor({ items, renderer }, containerSelector) {
        this._initialArray = items;
        this._renderer = renderer;

        this._container = document.querySelector(containerSelector);
    }
    addItem() { }// Этот метод принимает DOM-элемент и добавляет его в контейнер
}