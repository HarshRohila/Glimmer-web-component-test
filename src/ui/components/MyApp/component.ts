import Component, { tracked } from '@glimmer/component';

export default class MyApp extends Component {
    @tracked messages = [];

    didInsertElement() {
        this.element.dispatchEvent(new CustomEvent('floorplan-ready', { bubbles: true, detail: this }));
    }
    
    addMessage() {
        const message = this.element.querySelector('input').value;
        if (message) {
            const messagesCopy = this.messages.slice();
            messagesCopy.push(message);
            this.messages = messagesCopy;
        }
    }        
}
