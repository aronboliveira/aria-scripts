import DOMValidator from "../validators/DOMValidator";

export default class AccessibilityHandler {
  static trackAriaState(el, def = false) {
    if (el.dataset.trackingaria !== "true") {
      el.dataset.trackingaria = "true";
      if (DOMValidator.isCustomDisableable(el)) {
        this.handleStaticAttrs(el);
        if (DOMValidator.isCustomCheckable(el)) {
          el.dataset.checked = def.toString();
          this.handleCheckState(el);
        } else if (DOMValidator.isCustomPressable(el)) {
          el.dataset.pressed = def.toString();
          this.handlePressState(el);
        } else if (
          ["listbox", "menubox", "combobox", "tab", "switch"].some(
            r => r === el.role
          )
        ) {
          el.querySelectorAll("*").forEach(c => {
            if (!(c instanceof HTMLElement) || c instanceof HTMLOptionElement)
              return;
            c.dataset.selected === "true"
              ? (c.ariaSelected = "true")
              : (c.ariaSelected = "false");
          });
          this.handleSelect(el);
        }
      }
    }
  }

  static handleSelect(el) {
    if (
      !["listbox", "menubox", "combobox", "tab", "switch"].some(
        r => r === el.role
      )
    )
      return;

    const handleMouseUp = (ev) => {
        if (!(ev.currentTarget instanceof Element)) return;
        const t = ev.currentTarget;
        setTimeout(() => {
          t?.querySelectorAll("*").forEach(c => {
            if (!(c instanceof HTMLElement) || c instanceof HTMLOptionElement)
              return;
            c.dataset.selected === "true"
              ? (c.ariaSelected = "true")
              : (c.ariaSelected = "false");
          });
        }, 200);
      };

    const handleClick = (ev) => {
      if (!(ev.currentTarget instanceof Element)) return;
      ev.currentTarget.ariaExpanded === "false"
        ? (ev.currentTarget.ariaExpanded = "true")
        : (ev.currentTarget.ariaExpanded = "false");
    };

    el.addEventListener("mouseup", handleMouseUp);
    el.role === "combobox" && el.addEventListener("click", handleClick);
  }

  static handleCheckState(el) {
    el.addEventListener("mouseup", ev => {
      if (
        ev.currentTarget instanceof HTMLElement &&
        DOMValidator.isCustomCheckable(ev.currentTarget) &&
        ev.currentTarget.dataset.checked
      )
        ev.currentTarget.dataset.checked === "true"
          ? ev.currentTarget.setAttribute("aria-checked", "true")
          : ev.currentTarget.setAttribute("aria-checked", "false");
    });
  }

  static handlePressState(el) {
    const checkClick = (ev) =>
      ev instanceof MouseEvent &&
      ev.currentTarget &&
      DOMValidator.isCustomPressable(ev.currentTarget) &&
      ev.button === 0;

    el.addEventListener("mousedown", ev => {
      const t = ev.currentTarget;
      if (checkClick(ev)) {
        el.setAttribute("aria-pressed", "true");
        if (
          t instanceof HTMLElement &&
          (t.ariaExpanded || t.classList.contains("expands"))
        ) {
          t.ariaExpanded === "true"
            ? t.setAttribute("aria-expanded", "false")
            : t.setAttribute("aria-expanded", "false");
        }
      }
    });

    el.addEventListener("mouseup", ev => {
      if (checkClick(ev)) {
        el.setAttribute("aria-pressed", "false");
      }
    });
  }

  static handleStaticAttrs(el) {
    if (!DOMValidator.isCustomEntry(el)) return;
    const id = el.id;
    const updateAria = () => {
      const el = document.getElementById(id);
      if (!(el && DOMValidator.isCustomEntry(el))) return;
      el.dataset.required === "true"
        ? el.setAttribute("aria-required", "true")
        : el.setAttribute("aria-required", "false");
      el.dataset.disabled === "true"
        ? el.setAttribute("aria-disabled", "true")
        : el.setAttribute("aria-disabled", "false");
    };
    updateAria();
    setInterval(updateAria, 2000);
  }
}
