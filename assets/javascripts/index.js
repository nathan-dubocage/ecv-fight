import { Archer } from "./characters/archer.js";
import { Warrior } from "./characters/warrior.js";
import { Spider } from "./monsters/spider.js";
import { Dragon } from "./monsters/dragon.js";
import { Troll } from "./monsters/troll.js";

const choicesContainer = document.querySelector(".choices-container");
const choices = document.querySelectorAll("[data-character]");
const fightZone = document.querySelector(".fight-zone");
const lose = document.querySelector(".lose");
const win = document.querySelector(".win");

const type = document.querySelector(".type");
const level = document.querySelector(".level");
const kill = document.querySelector(".kill");
const manaContainer = document.querySelector(".mana-container");
const mana = document.querySelector(".mana");
const monsterType = document.querySelector(".monster-type");
const moneyContainer = document.querySelector(".money-container");
const money = document.querySelector(".money");

const progressLifeCharacter = document.querySelector(".progress-life-character");
const progressExperienceCharacter = document.querySelector(".progress-experience");
const progressLifeMonster = document.querySelector(".progress-life-monster");

const attack = document.querySelector(".attack");
const heal = document.querySelector(".heal");
const superAttack = document.querySelector(".super-attack");

const dragonKill = document.querySelector(".dragon-kill");
const trollKill = document.querySelector(".troll-kill");
const spiderKill = document.querySelector(".spider-kill");

let selectedCharacter = 0;

choices.forEach((choice) => {
	choice.addEventListener("click", function () {
		selectedCharacter = this.dataset.character;
		choicesContainer.classList.add("hidden");
		playGame(selectedCharacter);
	});
});

function playGame(selectedCharacter) {
	const randomMonster = Math.floor(Math.random() * 3) + 1;

	let character = null;
	let monster = null;

	switch (selectedCharacter) {
		case "1":
			character = new Archer();
			break;
		case "2":
			character = new Warrior();
			break;
	}

	switch (randomMonster) {
		case 1:
			monster = new Dragon();
			break;

		case 2:
			monster = new Spider();
			break;

		case 3:
			monster = new Troll();
			break;
	}

	displayFightZone(character, monster);
}

function displayFightZone(character, monster) {
	const manaValue = character.mana ?? null;

	if (manaValue !== null) {
		manaContainer.classList.remove("hidden");
		mana.textContent = manaValue;
		superAttack.classList.remove("hidden");
	}

	fightZone.classList.remove("hidden");
	fightZone.classList.add("flex");

	type.textContent = character.type;
	monsterType.textContent = monster.type;

	progressLifeCharacter.max = character.life;
	progressLifeCharacter.value = character.life;

	progressExperienceCharacter.value = character.experience;
	progressExperienceCharacter.max = character.nextStep;

	progressLifeMonster.max = monster.life;
	progressLifeMonster.value = monster.life;

	level.textContent = character.level;
	kill.textContent = character.kill;

	let currentTurn = 0;
	checkActionCharacter(character, monster, currentTurn);
}

function checkActionCharacter(character, monster, currentTurn) {
	if (character.money > 100 && character.power < 100) {
		if (confirm("Vous avez la possibilité d'améliorer votre arme contre 100€, souhaitez-vous le faire ?")) {
			character.power *= 3;
			character.money -= 100;
			money.textContent = character.money;
		}
	}

	attack.addEventListener(
		"click",
		() => {
			if (currentTurn === 0) {
				character.attack(monster);
				progressLifeMonster.value = monster.life;

				if (character.mana !== null || character.mana !== undefined) {
					if (character.mana < 250) {
						character.mana += 50;
						mana.textContent = character.mana;
					}

					if (character.mana === 250) {
						superAttack.disabled = false;
					}
				}

				if (monster.life < 1) {
					kill.textContent = character.kill;
					money.textContent = character.money;

					if (progressExperienceCharacter.value == 40) {
						progressExperienceCharacter.value = 0;
					} else {
						progressExperienceCharacter.value = progressExperienceCharacter.value + 10;
					}

					if (character.level == 5) {
						fightZone.classList.add("hidden");
						win.classList.remove("hidden");
					}

					level.textContent = character.level;
					progressLifeCharacter.value = character.life;

					let randomMonster = Math.floor(Math.random() * 3) + 1;

					switch (randomMonster) {
						case 1:
							monster = new Dragon();
							break;

						case 2:
							monster = new Spider();
							break;

						case 3:
							monster = new Troll();
							break;
					}

					monsterType.textContent = monster.type;
					progressLifeMonster.max = monster.life;
					progressLifeMonster.value = monster.life;
				}
				currentTurn = 1;
				checkActionMonster(character, monster, currentTurn);
			}
		},
		{
			once: true,
		}
	);

	heal.addEventListener(
		"click",
		() => {
			if (currentTurn === 0) {
				character.heal();
				progressLifeCharacter.value = character.life;
				currentTurn = 1;
				checkActionMonster(character, monster, currentTurn);
			}
		},
		{ once: true }
	);

	if (character.mana === 250) {
		superAttack.addEventListener(
			"click",
			() => {
				if (currentTurn === 0) {
					character.attack(monster, 2);
					progressLifeMonster.value = monster.life;
					character.mana = 0;
					mana.textContent = character.mana;
					superAttack.disabled = true;

					if (monster.life < 1) {
						kill.textContent = character.kill;

						money.textContent = character.money;

						if (progressExperienceCharacter.value == 40) {
							progressExperienceCharacter.value = 0;
						} else {
							progressExperienceCharacter.value = progressExperienceCharacter.value + 10;
						}

						if (character.level == 5) {
							fightZone.classList.add("hidden");
							win.classList.remove("hidden");
						}

						progressLifeCharacter.value = character.life;
						level.textContent = character.level;

						let randomMonster = Math.floor(Math.random() * 3) + 1;

						switch (randomMonster) {
							case 1:
								monster = new Dragon();
								break;

							case 2:
								monster = new Spider();
								break;

							case 3:
								monster = new Troll();
								break;
						}

						monsterType.textContent = monster.type;
						progressLifeMonster.max = monster.life;
						progressLifeMonster.value = monster.life;
					}

					currentTurn = 1;
					checkActionMonster(character, monster, currentTurn);
				}
			},
			{ once: true }
		);
	}
}

function checkActionMonster(character, monster, currentTurn) {
	setTimeout(() => {
		monster.attack(character);
		progressLifeCharacter.value = character.life;

		if (character.life < 1) {
			fightZone.classList.add("hidden");
			lose.classList.remove("hidden");

			const history = character.historyKill;

			let spider = 0;
			let dragon = 0;
			let troll = 0;

			history.forEach((monster) => {
				if (monster === "Araignée") {
					spider++;
				} else if (monster === "Troll") {
					troll++;
				} else {
					dragon++;
				}
			});

			spiderKill.textContent = spider;
			dragonKill.textContent = dragon;
			trollKill.textContent = troll;
		}

		currentTurn = 0;
		checkActionCharacter(character, monster, currentTurn);
	}, 500);
}
