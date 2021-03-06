import { Sprite } from 'pixi.js';
import { Vec2 } from 'planck-js';
import { Soldier } from './common';
class ClientSoldier extends Soldier {
    constructor(game, props) {
        super(game, props)
        const { x, y, angle } = props

        this.sprite = new Sprite(this.game.resources.soldier.texture);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.rotation = angle;

        this.game.viewport.addChild(this.sprite);
    }
    reconcile(serverSnapshot) {
        const { x, y, angle } = serverSnapshot
        this.body.setPosition(Vec2(x, y))
        this.body.setAngle(angle)
        this.render()
    }
    render() {
        const { x, y } = this.body.getPosition()
        const angle = this.body.getAngle()
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.rotation = angle;
    }
    kill() {
        super.kill()
        // this.sprite.parent.removeChild(this.sprite);
    }
}

export default ClientSoldier