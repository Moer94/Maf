class Takavar {
    constructor(players) {
        this._mafia = {};
        this._shahr = {};
        init();
    }
}

const game = {takavar: new Takavar()};
window.game = game;

export default Takavar;
