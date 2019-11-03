document.addEventListener('floorplan-ready', (event) => {
    const floorplan = event.detail;
    const btn = document.querySelector('.outside-button');

    btn.onclick = () => {
        const msg = document.querySelector('.outside-input').value;
        if (msg) {
            const msgs = floorplan.messages.slice();
            msgs.push(msg);
            floorplan.messages = msgs;
        }
    }
}, false);