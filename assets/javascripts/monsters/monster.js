export class Monster {
	constructor(type, life, power) {
		this._type = type;
		this._life = life;
		this._power = power;
	}

	get type() {
		return this._type;
	}

	set type(newType) {
		this._type = newType;
	}

	get life() {
		return this._life;
	}

	set life(newLife) {
		this._life = newLife;
	}

	get power() {
		return this._power;
	}

	set power(newPower) {
		this._power = newPower;
	}

	attack(character) {
		character.life = character.life - this._power;
	}
}
