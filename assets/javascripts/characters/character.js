export class Character {
	constructor(type, life, power) {
		this._type = type;
		this._life = life;
		this._maxLife = life;
		this._power = power;

		this._level = 1;
		this._kill = 0;
		this._money = 0;
		this._experience = 0;
		this._nextStep = 50;
		this._requiredExperiences = {
			1: 50,
			2: 100,
			3: 150,
			4: 200,
			5: 250,
		};

		this._historyKill = [];
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

	get level() {
		return this._level;
	}

	set level(newLevel) {
		this._level = newLevel;
	}

	get kill() {
		return this._kill;
	}

	set kill(newKill) {
		this._kill = newKill;
	}

	get experience() {
		return this._experience;
	}

	set experience(newExperience) {
		this._experience = newExperience;
	}

	get nextStep() {
		return this._nextStep;
	}

	set nextStep(newStep) {
		this._nextStep = newStep;
	}

	get money() {
		return this._money;
	}

	set money(newMoney) {
		this._money = newMoney;
	}

	get historyKill() {
		return this._historyKill;
	}

	set historyKill(newHistoryKill) {
		this._historyKill = newHistoryKill;
	}

	heal() {
		const newLife = this._life + 80;

		if (newLife >= this._maxLife) {
			this._life = this._maxLife;
		} else {
			this._life += 80;
		}
	}

	attack(monster, multiplicator = 1) {
		monster.life = monster.life - this._power * multiplicator;

		if (monster.life < 1) {
			this._experience += 10;
			this._kill++;
			this.checkEarnMoney(monster);
			this.checkExperience();
			this._historyKill.push(monster.type);
		}
	}

	checkEarnMoney(monster) {
		switch (monster.type) {
			case "Dragon":
				this._money += 35;
				break;

			case "Troll":
				this._money += 50;
				break;

			case "Araignée":
				this._money += 20;
				break;
		}
	}

	checkExperience() {
		if (this._experience >= this._nextStep) {
			this._level++;
			this._life = this._maxLife;

			if (this.level === 5) return;

			for (const index in this._requiredExperiences) {
				if (this._level == index) {
					this._nextStep = this._requiredExperiences[index];
				}
			}
		}
	}
}
