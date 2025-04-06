import Phaser from 'phaser';
class GameScene extends Phaser.Scene {
    preload() {
        this.load.image('image0', 'assets/0.png');
        this.load.image('image1', 'assets/1.png');
        this.load.image('image2', 'assets/0.png');
        this.load.image('image3', 'assets/2.png');
    }
    create() {
        this.timeText = this.add.text(400, 40, '', { color: 'white', font: '40px monospace' }).setOrigin(0.5, 0.5);
        this.scoreText = this.add.text(400, 100, '', { color: 'white', font: '40px monospace' }).setOrigin(0.5, 0.5);
        this.image = this.add.image(400, 300, 'image0');
        this.resetGame();
        this.image.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
            if (this.countStartTime == 0) {
                this.countStartTime = this.time.now;
            }
            if (this.resetText?.active) {
                return;
            }
            this.scoreText.setText(++this.count);
            if (this.image.texture.key == 'image0') {
                this.image.setTexture('image1');
            } else if (this.image.texture.key == 'image1') {
                this.image.setTexture('image2');
            } else if (this.image.texture.key == 'image2') {
                this.image.setTexture('image3');
            } else if (this.image.texture.key == 'image3') {
                this.image.setTexture('image0');
            }
        });
    }
    update() {
        if (!this.resetText?.active && this.countStartTime > 0) {
            this.timeText.setText(1000 - parseInt(this.time.now - this.countStartTime));
            if (parseInt(this.time.now - this.countStartTime) > 1000) {
                this.timeText.setText('0');
                this.resetText = this.add.text(400, 560, 'RESET', { color: 'white', font: '40px monospace' }).setOrigin(0.5, 0.5);
                this.resetText.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.resetGame());
            }
        }
    }
    resetGame() {
        this.count = 0;
        this.countStartTime = 0;
        this.scoreText.setText(0);
        this.timeText.setText(1000);
        this.image.setTexture('image0');
        this.resetText?.destroy();
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: GameScene
};

const game = new Phaser.Game(config);

