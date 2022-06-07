import {
  ModalController
} from "./chunk-37HP3PVJ.js";
import {
  __decorateClass
} from "./chunk-S65R2BUY.js";

// src/modal-portal.ts
import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { ref, createRef } from "lit/directives/ref.js";
import { List, is } from "immutable";
var ModalPortal = class extends LitElement {
  constructor() {
    super();
    this.modalC = ModalController.getInstance();
    this.modalStack = List();
    this.portalRef = createRef();
    this.removeModal = (e) => {
      e.stopImmediatePropagation();
      e.preventDefault();
      const eventPath = e.composedPath();
      const portalEventPathIndex = eventPath.findIndex((el) => el === this.portalRef.value);
      if (portalEventPathIndex < 1) {
        console.warn("Could not locate modal portal at appropriate depth in the @removeModal event path");
      } else {
        const modalNode = eventPath[portalEventPathIndex - 1];
        this.modalC.removeByNode(modalNode);
      }
    };
    this.modalC.attach(this);
  }
  get modalNodes() {
    var _a;
    return (_a = this.portalRef.value) == null ? void 0 : _a.children;
  }
  offerState(newState) {
    if (!is(this.modalStack, newState.get("modalStack"))) {
      this.modalStack = newState.get("modalStack");
      if (this.modalStack.size > 0) {
        document.querySelector("body").classList.add("modal-portal-active");
      } else {
        document.querySelector("body").classList.remove("modal-portal-active");
      }
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("removeModal", this.removeModal);
  }
  render() {
    var _a;
    return html`
      <div id="portal" ${ref(this.portalRef)}>
        ${repeat((_a = this.modalStack) == null ? void 0 : _a.values(), (modal) => modal.key, (modal) => html`<div class="modal-node">${modal}</div>`)}
      </div>
    `;
  }
};
ModalPortal.styles = css`
    #portal {
      isolation: isolate;
    }
  `;
__decorateClass([
  state()
], ModalPortal.prototype, "modalStack", 2);
ModalPortal = __decorateClass([
  customElement("modal-portal")
], ModalPortal);
export {
  ModalPortal as default
};
