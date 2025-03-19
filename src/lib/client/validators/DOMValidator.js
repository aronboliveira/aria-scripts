export default class DOMValidator {
  static hasAnyClass(el, compared) {
    return compared.some(cls => el.classList.contains(cls));
  }

  static isGeneric(el) {
    return (
      el instanceof HTMLDivElement ||
      el instanceof HTMLSpanElement
    );
  }

  static isCustomTextbox(el) {
    return (
      el instanceof HTMLElement &&
      el.contentEditable === "true" &&
      el.classList.contains("textbox")
    );
  }

  static isTextbox(el) {
    return (
      this.isDefaultTextbox(el) || this.isCustomTextbox(el)
    );
  }

  static isDefaultTextbox(el) {
    return (
      (el instanceof HTMLInputElement &&
        el.type === "text") ||
      el instanceof HTMLTextAreaElement
    );
  }

  static isCustomCheckbox(el) {
    return (
      el instanceof HTMLElement &&
      (el.role === "checkbox" ||
        el.classList.contains("checkbox"))
    );
  }

  static isDefaultCheckbox(el) {
    return (
      el instanceof HTMLInputElement &&
      el.type === "checkbox"
    );
  }

  static isCheckbox(el) {
    return (
      this.isDefaultCheckbox(el) ||
      this.isCustomCheckbox(el)
    );
  }

  static isCustomRadio(el) {
    return (
      el instanceof HTMLElement &&
      (el.role === "radio" ||
        el.classList.contains("radio"))
    );
  }

  static isDefaultRadio(el) {
    return (
      el instanceof HTMLInputElement && el.type === "radio"
    );
  }

  static isRadio(el) {
    return (
      this.isDefaultRadio(el) || this.isCustomRadio(el)
    );
  }

  static isCustomButton(el) {
    return (
      el instanceof HTMLElement &&
      (el.role === "button" ||
        el.classList.contains("button") ||
        el.classList.contains("btn"))
    );
  }

  static isButton(el) {
    return (
      this.isDefaultPressable(el) || this.isCustomButton(el)
    );
  }

  static isCustomImage(el) {
    return (
      el instanceof HTMLElement &&
      (el.role === "img" ||
        el.classList.contains("img") ||
        el.classList.contains("image"))
    );
  }

  static isDefaultImage(el) {
    return (
      el instanceof HTMLImageElement ||
      (el instanceof HTMLInputElement &&
        el.type === "image")
    );
  }

  static isImage(el) {
    return (
      this.isDefaultImage(el) || this.isCustomImage(el)
    );
  }

  static isTable(el) {
    return (
      el instanceof HTMLTableElement ||
      (el instanceof HTMLElement &&
        el.classList.contains("table"))
    );
  }

  static isCustomPressable(el) {
    return (
      this.isCustomButton(el) ||
      (el instanceof HTMLElement &&
        el.classList.contains("pressable"))
    );
  }

  static isDefaultPressable(el) {
    return (
      el instanceof HTMLButtonElement ||
      (el instanceof HTMLInputElement &&
        (el.type === "button" ||
          el.type === "submit" ||
          el.type === "reset"))
    );
  }

  static isPressable(el) {
    return (
      this.isDefaultPressable(el) ||
      this.isCustomPressable(el)
    );
  }

  static isCustomCheckable(el) {
    return (
      this.isCustomCheckbox(el) ||
      this.isCustomRadio(el) ||
      (el instanceof HTMLElement &&
        el.classList.contains("checkable"))
    );
  }

  static isDefaultCheckable(el) {
    return (
      el instanceof HTMLInputElement &&
      (el.type === "checkbox" || el.type === "radio")
    );
  }

  static isCheckable(el) {
    return (
      this.isDefaultCheckable(el) ||
      this.isCustomCheckable(el)
    );
  }

  static isDefaultRequireableInput(el) {
    return (
      el instanceof HTMLInputElement &&
      !(
        el.type === "hidden" ||
        el.type === "button" ||
        el.type === "reset" ||
        el.type === "submit" ||
        el.type === "image"
      )
    );
  }

  static isDefaultWritableInput(el) {
    return (
      el instanceof HTMLInputElement &&
      [
        "text",
        "number",
        "email",
        "password",
        "tel",
        "url",
        "search",
        "date",
        "datetime-local",
        "month",
        "week",
        "time",
      ].some(t => t === el.type)
    );
  }

  static isCustomSelector(el) {
    return (
      el.role === "listbox" ||
      el.role === "menubox" ||
      el.role === "combobox"
    );
  }

  static isCustomEntry(el) {
    return (
      this.isCustomCheckable(el) ||
      this.isCustomTextbox(el) ||
      this.isCustomSelector(el)
    );
  }

  static isDefaultEntry(el) {
    return (
      this.isDefaultRequireableInput(el) ||
      el instanceof HTMLTextAreaElement ||
      el instanceof HTMLSelectElement
    );
  }

  static isEntry(el) {
    return (
      this.isDefaultEntry(el) || this.isCustomEntry(el)
    );
  }

  static isCustomDisableable(el) {
    return (
      this.isCustomPressable(el) || this.isCustomEntry(el)
    );
  }

  static isDefaultDisableable(el) {
    return (
      this.isDefaultPressable(el) || this.isDefaultEntry(el)
    );
  }

  static isDisableable(el) {
    return (
      this.isDefaultDisableable(el) ||
      this.isCustomDisableable(el)
    );
  }

  static isDefaultList(el) {
    return (
      el instanceof HTMLUListElement ||
      el instanceof HTMLOListElement ||
      el instanceof HTMLDataListElement ||
      el instanceof HTMLMenuElement
    );
  }

  static isHourInput(el) {
    return (
      el instanceof HTMLInputElement &&
      (el.type === "datetime-local" || el.type === "time")
    );
  }

  static isDayInput(el) {
    return (
      el instanceof HTMLInputElement &&
      (el.type === "date" || el.type === "datetime-local")
    );
  }

  static isMonthInput(el) {
    return (
      el instanceof HTMLInputElement &&
      (el.type === "date" ||
        el.type === "datetime-local" ||
        el.type === "month")
    );
  }

  static isYearInput(el) {
    return (
      el instanceof HTMLInputElement &&
      (el.type === "date" ||
        el.type === "datetime-local" ||
        el.type === "month" ||
        el.type === "week")
    );
  }
}
