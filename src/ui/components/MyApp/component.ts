import Component, { tracked } from '@glimmer/component';

export default class MyApp extends Component {
    @tracked messages = [];

    didInsertElement() {
        this.element.addEventListener('got-messages', this.gotMessages.bind(this), false);
    }
    
    gotMessages(event: CustomEvent) {
        this.messages = event.detail;
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
