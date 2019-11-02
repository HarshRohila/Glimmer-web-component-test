import { ComponentManager, setPropertyDidChange } from '@glimmer/component';
import App from './main';

const app = new App();
const containerElement = document.querySelector('floor-plan');
containerElement.attachShadow({mode: 'open'});

class FloorPlan extends HTMLElement {
    myApp: HTMLElement;

    set messages(messages: string[]) {
      if (!this.myApp) {
        this.myApp = this.shadowRoot.querySelector('.my-app');
      }
      this.myApp.dispatchEvent(new CustomEvent('got-messages', {
        detail: messages
      }));
    }

    connectedCallback() {
        fetch(`./app.css`)
          .then(res => res.text())
          .then(data => {
            const style = document.createElement('style');
            style.innerHTML = data;
            this.shadowRoot.appendChild(style);
          });
    }
}

customElements.define('floor-plan', FloorPlan);

setPropertyDidChange(() => {
  app.scheduleRerender();
});

app.registerInitializer({
  initialize(registry) {
    registry.register(`component-manager:/${app.rootName}/component-managers/main`, ComponentManager);
  }
});

app.renderComponent('MyApp', containerElement.shadowRoot, null);

app.boot();
