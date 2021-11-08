import { Graphics } from 'pixi.js';
import { BoardConfig } from '../config';
import { Ball } from './ball';

export class Cell extends Graphics {
    row: number;
    column: number;
    i: number;
    j: number;
    ball: Ball;

    constructor(row: number, column: number) {
        super();
        this.row = row;
        this.column = column;
        this.interactive = true;

        this.on('pointerdown', this._onClick, this);
    }

    build(lineStyle, cellWidth) {
        const { cell_radius } = BoardConfig;
        this.lineStyle(lineStyle, 0x000000);
        this.beginFill(0xffffff);
        this.drawRoundedRect(lineStyle, lineStyle, cellWidth - lineStyle, cellWidth - lineStyle, cell_radius);
        this.endFill();

        this.pivot.x = this.width / 2;
        this.pivot.y = this.height / 2;
    }

    setBall(cell, ball) {
        const { cell_width } = BoardConfig;
        ball.position.set(cell_width / 2, cell_width / 2);

        cell.addChild(ball);
    }

    _onClick() {
        this.emit('onClick', this);
    }
}
