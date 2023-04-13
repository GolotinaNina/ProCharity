export default class CustomSelect {
  /**
   *
   * @param selector - слектор элемента select, который необходимо кастомизировать
   * @param options - объект параметров
   *    wrapClass                       - класс обертки (контейнера) кастомизированного поля
   *    fieldClass                      - класс поля выбора
   *    fieldTextClass                  - класс текстобого блока, вложенного в поле выбора
   *    fieldArrowClass                 - класс блока иконки выпадающего списка
   *    optionsListContainerClass       - класс контейнера выпадающего списка
   *    optionsOpenedListContainerClass - класс (модификатор) открытого контейнера
   *    optionsListClass                - класс сипка элементов выбора
   *    optionClass                     - класс элемента выбора
   *    optionSelectedClass             - класс выбранного элемента списка
   *    firstOptionIsTitle              - если установлено в true - первый элемент списка будет
   *                                    использоваться в качестве подписи поля и не будет выводиться
   *                                    в кастомизированном списке
   */
  constructor(selector, options = {
    wrapClass: 'custom-select__wrap',
    fieldClass: 'custom-select__field',
    fieldTextClass: 'custom-select__field-text',
    fieldArrowClass: 'custom-select__arrow',
    optionsListContainerClass: 'custom-select__list-container',
    optionsOpenedListContainerClass: 'custom-select__list-container__opened',
    optionsListClass: 'custom-select__list',
    optionClass: 'custom-select__item',
    optionSelectedClass: 'custom-select__item_selected',
    firstOptionIsTitle: true
  }) {
    this._selectElement = document.querySelector(selector);
    this._options = options;
  }


  _changeOption(option) {
    // Изменение выбранного значения в исходном select
    // (пригодится для реализации обычной передачи значений на сервер -
    // значение будет передоваться из обычного select)
    this._selectElement.value = option.dataset.val;
  }


  _createWrap() {
    // Создание обертки для кастомного селекта
    // Обертка позхволит позиционировать раскрывающийся список относительно поля выбора
    const element = document.createElement('div');
    element.classList.add(this._options.wrapClass);

    return element;
  }


  _createField() {
    // Создание поля кастомного селекта
    const element = document.createElement('div');
    element.classList.add(this._options.fieldClass);

    return element;
  }


  //Select
  _createFieldText() {
    const element = document.createElement('div');
    element.classList.add(this._options.fieldTextClass);

    return element;
  }


  _createArrow() {
    const element = document.createElement('div');
    element.classList.add(this._options.fieldArrowClass);

    return element;
  }


  _createListContainer() {
    const element = document.createElement('div');
    element.classList.add(this._options.optionsListContainerClass);

    return element;
  }


  _createList() {
    const element = document.createElement('ul');
    element.classList.add(this._options.optionsListClass);

    return element;
  }


  //Select
  _createDropdownBlock() {
    // Создание обертки для кастомного селекта
    this._customSelectElement = this._createWrap();

    // Создание поля кастомного селекта
    this._fieldElement = this._createField();

    // Создание текстового элемента поля
    this._fieldTextElement = this._createFieldText(); //Select

    // Создание иконки раскрывающегося списка
    this._fieldArrowElement = this._createArrow();

    // Добавление текстового элемента и иконки к полю
    this._fieldElement.append(this._fieldTextElement, this._fieldArrowElement); //Select

    // Добавление поля в контейнер
    this._customSelectElement.append(this._fieldElement);

    // Создание контейнера для вариантов выбора
    this._optionsListContainerElement = this._createListContainer();

    // Создание элемента списка вариантов выбора
    this._optionsListElement = this._createList();


    // Добавление элемента списка в контейнер списка
    this._optionsListContainerElement.append(this._optionsListElement);

    // Добавление контейнера списка в контейнер поля
    this._customSelectElement.append(this._optionsListContainerElement);
  }


  _getOptions() {
    const optgroups = this._selectElement.querySelectorAll('optgroup');
    const options = this._selectElement.querySelectorAll('option');

    if (optgroups && optgroups.length > 0) {
      return optgroups
    }

    return options;
  }


  _getSelectedOption() {
    return this._optionsListElement
      .querySelector(`.${this._options.optionSelectedClass}`);
  }


  //Select
  _handleItemClick(evt) {
    this._resetSelectedOption();

    this._setSelectedOption(evt.target);
    this._setFieldText(); //Select

    this._changeOption(evt.target);
  }


  _resetSelectedOption() {
    const selectedOption = this._getSelectedOption();

    if (selectedOption) {
      selectedOption.classList.remove(this._options.optionSelectedClass);
    }
  }


  //Select
  _setFieldText() {
      const selectedOption = this._getSelectedOption();

      if(selectedOption) {
        this._fieldTextElement.textContent = selectedOption.textContent;
      }
  }


  _setItems() {
    this._getOptions().forEach((item, index) => {
      const option = document.createElement('li');

      if (this._options.firstOptionIsTitle && index === 0) {
        this._customSelectElement.querySelector(`.${this._options.fieldTextClass}`)
          .textContent = item.textContent;

      } else {
        option.classList.add(this._options.optionClass);
        option.setAttribute('data-val', item.value);
        option.textContent = item.textContent;

        if (item.hasAttribute('selected')) {
          option.classList.add(this._options.optionSelectedClass);
        }

        this._customSelectElement.querySelector(`.${this._options.optionsListClass}`)
          .append(option);
      }
    })
  }


  _setSelectedOption(option) {
    // Стилизация выбранного элемента списка
    option.classList.add(this._options.optionSelectedClass);
  }


  //Select
  generate() {
    // Создание каркаса кастомного селекта
    this._createDropdownBlock();
    this._selectElement.after(this._customSelectElement);


    // Заполнение каркаса элементами списка
    this._setItems();

    // Сработает при инициализации, если параметр options.firstOptionIsTitle = true
    // первый option из списка будет являться подписью кастомного списка
    this._setFieldText(); //Select

    //Установка обработчиков событий
    this.setEventListeners();
  }


  closeDropdown() {
    this._optionsListContainerElement.classList
      .remove(this._options.optionsOpenedListContainerClass);
  }


  openDropdown() {
    this._optionsListContainerElement.classList
      .add(this._options.optionsOpenedListContainerClass);
  }


  setEventListeners() {
    document.addEventListener('mousedown', (evt) => {
      // Если клик был совершен за пределами контейнера
      if (!evt.target.closest(`.${this._options.wrapClass}`)) {
        // Закрытие выпадающего списка
        this.closeDropdown();

      // Если клик был произведен по элементу списка
      } else if (evt.target.classList.contains(this._options.optionClass)) {
        // Обработка клика по элементу
        this._handleItemClick(evt);
        // Закрытие выпадающего списка
        this.closeDropdown();

      // В остальных случаях
      } else {
        // Если  контейнер выпадающего списка открыт
        if (this._optionsListContainerElement.classList
          .contains(this._options.optionsOpenedListContainerClass)) {
          // Закрытие выпадающего списка
          this.closeDropdown();

        } else {
          // или открываем
          this.openDropdown();
        }
      }
    });
  }
  

}