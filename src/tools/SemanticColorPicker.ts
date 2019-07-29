import {SemanticCOLORS} from "semantic-ui-react";

export default class SemanticColorPicker {

    private static colors: SemanticCOLORS[] = [
        "red",
        "orange",
        "yellow",
        "olive",
        "green",
        "teal",
        "blue",
        "violet",
        "purple",
        "pink",
        "brown",
        "grey",
        "black"
    ];

    private usedColors: SemanticCOLORS[] = [];

    private map = new Map<string, SemanticCOLORS>();

    public get(key: string): SemanticCOLORS {
        let color = this.map.get(key);
        if (color === undefined) {
            color = this.getUnusedColor();
            this.map.set(key, color);
        }
        return color;
    }

    private getUnusedColor(): SemanticCOLORS {
        const availableColors = SemanticColorPicker.colors.filter(c => !this.usedColors.includes(c));
        const color = availableColors[Math.floor(Math.random() * availableColors.length)];
        this.usedColors.push(color);
        return color;
    }

}
