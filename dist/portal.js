import {
  ModalController
} from "./chunk-37HP3PVJ.js";
import "./chunk-S65R2BUY.js";

// src/portal.ts
import { Directive, directive } from "lit/directive.js";
var PortalDirective = class extends Directive {
  getTemplate(templateOrSupplier) {
    if (templateOrSupplier instanceof Function) {
      return templateOrSupplier();
    } else {
      return templateOrSupplier;
    }
  }
  render(showModal, template, closeCallback) {
    if (showModal instanceof Function) {
      showModal = showModal();
    }
    if (this.modalRegistry) {
      if (showModal) {
        this.modalRegistry.replace(this.getTemplate(template), closeCallback);
      } else {
        this.modalRegistry.remove();
        this.modalRegistry = void 0;
      }
    } else if (showModal) {
      this.modalRegistry = ModalController.getInstance().push(this.getTemplate(template), closeCallback);
    }
  }
};
var portal = directive(PortalDirective);
export {
  portal
};
