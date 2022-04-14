import { Character } from "./character.js";

export class Warrior extends Character {
	constructor() {
		super("Guerrier", 200, 80);
		this._mana = 0;
	}

	get mana() {
		return this._mana;
	}

	set mana(newMana) {
		this._mana = newMana;
	}
}
