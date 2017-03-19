import setGameStage from 'shared/phaser/methods/set_game_stage/0.1';
import addPlayer from 'shared/phaser/methods/add_player/0.1';

export default function () {
    var playerImage;

    this.controller = {};

    setGameStage.call(this, {
        width: 30000,
        height: 540,
        top: 0,
    });

    this.helpers.makeBackground.call(this);

    playerImage = this.opts.level === 1 ? 'fire-drone' :
                  this.opts.level === 2 ? 'delivery-drone' : 'farm-drone';

    addPlayer.call(this, {
        left: 300,
        top: 200,
        image: playerImage,
        bounceY: 0,
        gravityY: 0,
        body: this.opts.playerBody,
        rightFrames: [0, 1, 2, 3],
        scale: this.opts.playerScale,
        onWorldBounds: this.helpers.onWorldCollide.bind(this),
    });

    this.helpers.makeItems.call(this);

    this.data = _.defaults({
        levels: {
            [this.opts.level]: {
                start: true,
                score: 0,
                hits: 0,
            }
        }
    }, this.data);

    this.audio = _.reduce(this.audio, (a, v, k) => {
        a[k] = this.game.add.audio(k);
        return a;
    }, {});

    this.helpers.emitData.call(this);
}
