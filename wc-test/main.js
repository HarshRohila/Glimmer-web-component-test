const wc = document.querySelector('floor-plan');
wc.messages = ['sdfa', 'asdfasdf'];
const btn = document.querySelector('button');

btn.onclick = () => {
    const msg = document.querySelector('input').value;
    if (msg) {
        const msgs = wc.messages.slice();
        msgs.push(msg);
        wc.messages = msgs;
    }
}