class Dropdown {
  constructor(itemPai) {
    this.dropdownMenu = document.querySelectorAll(itemPai);
    this.AddClass = this.AddClass.bind(this);
    this.active = "ativo";
    this.events = ["touchstart", "click"];
  }

  AddClass(event) {
    event.preventDefault();
    const html = document.documentElement;
    const element = event.currentTarget;
    element.classList.add(this.active);
    outsideClick(element, this.events, () => {
      element.classList.remove(this.active);
    });
  }

  dropdownEvent() {
    this.dropdownMenu.forEach((menu) => {
      this.events.forEach((userEventes) => {
        menu.addEventListener(userEventes, this.AddClass);
      });
    });
  }

  init() {
    this.dropdownEvent();
  }
}

function outsideClick(element, events, callback) {
  const html = document.documentElement;
  const outside = "data-outside";

  if (!element.hasAttribute(outside)) {
    events.forEach((userEventes) => {
      setTimeout(() => {
        html.addEventListener(userEventes, handleOutsideClick);
      });
    });
    element.setAttribute(outside, "");
  }

  function handleOutsideClick(event) {
    if (!element.contains(event.target)) {
      element.removeAttribute(outside);
      events.forEach((userEventes) => {
        html.removeEventListener(userEventes, handleOutsideClick);
      });
      callback();
      console.log(event.target);
    }
  }
}

const dropDown = new Dropdown("[data-dropdown-menu]");
dropDown.init();

class Modal {
  constructor(abrir, fechar, modal) {
    this.abrirModal = document.querySelector(abrir);
    this.fecharModal = document.querySelector(fechar);
    this.modal = document.querySelector(modal);
    this.AbrirModal = this.AbrirModal.bind(this);
    this.FecharModal = this.FecharModal.bind(this);
    this.cliqueForaModal = this.cliqueForaModal.bind(this);
  }

  AbrirModal(event) {
    this.modal.classList.add("ativo");
  }

  FecharModal() {
    this.modal.classList.remove("ativo");
  }

  eventToggle(event) {
    event.preventDefault();
    this.AbrirModal();
  }

  cliqueForaModal(event) {
    if (event.target === this.modal) {
      this.FecharModal();
    }
  }

  addEventsModal() {
    this.abrirModal.addEventListener("click", this.AbrirModal);
    this.fecharModal.addEventListener("click", this.FecharModal);
    this.modal.addEventListener("click", this.cliqueForaModal);
  }

  init() {
    this.addEventsModal();
  }
}

const modalLogin = new Modal(
  '[data-modal="abrir-login"]',
  '[data-modal="fechar"]',
  '[data-modal="login"]'
);
modalLogin.init();

const modalRegister = new Modal(
  '[data-modal="abrir-register"]',
  '[data-modal="Fechar"]',
  '[data-modal="register"]'
);

modalRegister.init();

class menuMobile {
  constructor(menuButton, menuList) {
    this.menuButton = document.querySelector(menuButton);
    this.menuList = document.querySelector(menuList);
    this.events = ["touchstart", "click"];
    this.openMenu = this.openMenu.bind(this);
  }
  openMenu(event) {
    this.menuList.classList.add("ativo");
    this.menuButton.classList.add("ativo");
    outsideClick(this.menuList, this.events, () => {
      this.menuList.classList.remove("ativo");
      this.menuButton.classList.remove("ativo");
    });
  }

  addEventMobile() {
    this.menuButton.addEventListener("click", this.openMenu);
  }

  init() {
    this.addEventMobile();
  }
}

const initMenuMobile = new menuMobile(
  '[data-menu="button"]',
  '[data-menu="list"]'
);
initMenuMobile.init();
