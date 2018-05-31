export default class SelectLetter {
    constructor (scene, checkForInputDelaySeconds = 2) {
        if (scene instanceof Phaser.Scene) {
            this.scene = scene; // store our scene

            this.checkForInputDelaySeconds = checkForInputDelaySeconds; // seconds between keypress checking

            this.listenForKeyPress = true; // state flag on when to check for keypresses

            this.events = new Phaser.EventEmitter(); // so we can emit a keypress event

            this.timerEvent; // for tracking our delay timer

            this.keyboardListener; // so we can track when we add a keyboard event listener

            // once a scene is updating start our listenting
            this.scene.events.once('update', () => {
                this.startListening();
            });
        } else {
            throw 'scene is required';
        }
    }

    // setup our keyboard listener
    startListening () {
        if (!this.keyboardListener) {
            this.keyboardListener = this.scene.input.keyboard.on('keydown', (keyEvent) => {
                const key = keyEvent.key.toString().toLowerCase();

                if (key.match(/^[a-z]$/)) {
                    this.handleKeyPress(key);
                }
            });
        }
    }

    // pause listening
    disableListening () {
        if (this.timerEvent && this.timerEvent.remove) {
            this.timerEvent.remove(false);
        }

        this.listenForKeyPress = false;
    }

    // startup keypress listening again
    enableListening () {
        this.listenForKeyPress = true;
    }

    // emit keypress events when we are listening for them
    handleKeyPress (key) {
        if (this.listenForKeyPress) {
            const MILLISECONDS = 1000;

            this.events.emit('keypress', key);

            this.disableListening();

            this.timerEvent = this.scene.time.delayedCall(this.checkForInputDelaySeconds * MILLISECONDS, () => {
                this.enableListening();
            });
        }
    }
}