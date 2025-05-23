import { IUnit, portretBigData } from "store/slices/sliceGame";
import store from "store/store";
import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";
import Text from "utils/gameLib/Text";

type TLabelRows = {
    label: string;
    key: keyof IUnit | (keyof IUnit)[];
}

const labelRows: TLabelRows[] = [
    {
        label: 'Level',
        key: 'level'
    },
    {
        label: 'XP',
        key: ['experience', 'needExperience']
    },
    {
        label: 'HP',
        key: ['hitPoints', 'defaultHp']
    },
    {
        label: 'Armor',
        key: 'armor'
    },
    {
        label: 'Immunities',
        key: 'immunities'
    },
    {
        label: 'Wards',
        key: 'wards'
    },
    {
        label: 'Attack',
        key: 'damageName'
    },
    {
        label: 'Chances to hit',
        key: 'chancesHit'
    },
    {
        label: 'Damage',
        key: 'damage'
    }
];

export default class MenuUnitInfo {
    private fon: Sprite;
    private portrait: Sprite;
    private labelName: Text;
    private labels: Text[] = [];
    private isOpen = false;
    constructor(private scene: Scene) {

    }

    create() {
        const { selectUnit: unit, unitsStatsModifier } = store.getState().multiArena;
        //const unit = units.find(u => u.uid === infoUnitUid);
        const statsModifier = unitsStatsModifier.find(el => el.uid === unit.uid) || {
            uid: unit.uid,
            level: unit.level,
            hitPoints: 0,
            regenerate: 0,
            chancesHit: 0,
	        damage: 0,
	        damageName: unit.damageName,
	        sourceDamage: unit.sourceDamage,
            // chancesHit: [],
            // damage: [],
            // damageName: [],
            // sourceDamage: [],
            heal: 0,
            initiative: 0,
            movePoints: 0,
            immunities: [],
            wards: [],
            useWards: [],
            armor: 0
        };
        this.fon = this.scene.add.sprite('window-info', this.scene.halfWidth, this.scene.halfHeight);
        this.portrait = this.scene.add.sprite('units-big-portrait', 282, 128);
        this.portrait.setFrame(portretBigData[unit.icon]);

        this.labelName = this.scene.add.text(unit.defaultName);
        this.labelName.fontSize = 14;
        this.labelName.x = this.fon.x - this.fon.halfWidth + this.fon.halfWidth / 2 - this.labelName.halfWidth;
        this.labelName.y = this.portrait.y + this.portrait.halfHeight + 40;
        this.isOpen = true;
        const xLabel = this.fon.x - 44;
        const xValue = this.fon.x + 38;
        let y = 64;
        const stepY = 26;
        let label: Text;
        let labelValue: Text;
        for (let i = 0; i < labelRows.length; i++) {
            const labelRowData = labelRows[i];
            label = this.scene.add.text(labelRowData.label);
            label.x = xLabel;
            label.y = y;
            switch (labelRowData.label) {
                case 'XP':

                    labelValue = this.scene.add.text(`${unit[labelRowData.key[0] as keyof IUnit]} / ${unit[labelRowData.key[1] as keyof IUnit]}`);
                    labelValue.x = xValue;
                    labelValue.y = y;

                    this.labels.push(labelValue);
                    break;
                case 'HP':
                    // label = this.scene.add.text(labelRowData.label);
                    // label.x = xLabel;
                    // label.y = y;
                    labelValue = this.scene.add.text(`${unit[labelRowData.key[0] as keyof IUnit]}`);
                    labelValue.x = xValue;
                    let hpX = xValue + labelValue.width
                    labelValue.y = y;

                    const hpLabel2 = this.scene.add.text(` / ${Number(unit[labelRowData.key[1] as keyof IUnit]) - statsModifier.hitPoints}`);
                    hpLabel2.x = hpX;
                    hpLabel2.y = y;
                    hpX += hpLabel2.width;
                    this.labels.push(hpLabel2);
                    if (statsModifier.hitPoints > 0) {
                        const hpLabel3 = this.scene.add.text(` +${statsModifier.hitPoints}`);
                        hpLabel3.color = 'green';
                        hpLabel3.x = hpX;
                        hpLabel3.y = y;
                        hpX += hpLabel3.width;
                        this.labels.push(hpLabel3);
                    }

                    // labelValue = this.scene.add.text(`${unit[labelRowData.key[0] as keyof IUnit]} / ${unit[labelRowData.key[1] as keyof IUnit]}`);
                    // labelValue.x = xValue;
                    // labelValue.y = y;
                    //this.labels.push(label, labelValue);
                    this.labels.push(labelValue);
                    break;
                case 'Immunities':
                    let xImmun = xValue;
                    let yImmun = y;
                    let summW = 0;
                    for (let i = 0; i < unit.immunities.length; i++) {
                        let zapyatay = '';
                        if (i < unit.immunities.length - 1) {
                            zapyatay = ',';
                        }
                        const value = unit.immunities[i];
                        const immun = `${value.charAt(0).toUpperCase() + value.slice(1) + zapyatay}`;

                        const labelVal = this.scene.add.text(immun);

                        summW += labelVal.width;
                        if (summW > 180) {
                            xImmun = xValue;
                            summW = 0;
                            yImmun += labelVal.height + 2;
                        }
                        labelVal.x = xImmun;
                        labelVal.y = yImmun;
                        xImmun += labelVal.width;
                        this.labels.push(labelVal);
                    }
                    let prefix = '';
                    if (unit.immunities.length > 0) {
                        prefix = ',';
                    }
                    for (let i = 0; i < statsModifier.immunities.length; i++) {
                        let zapyatay = '';
                        if (i < statsModifier.immunities.length - 1) {
                            zapyatay = ',';
                        }
                        const value = statsModifier.immunities[i];
                        const immun = `${prefix + value.charAt(0).toUpperCase() + value.slice(1) + zapyatay}`;

                        const labelVal = this.scene.add.text(immun);
                        labelVal.color = 'green';
                        summW += labelVal.width;
                        if (summW > 180) {
                            xImmun = xValue;
                            summW = 0;
                            yImmun += labelVal.height + 2;
                        }
                        labelVal.x = xImmun;
                        labelVal.y = yImmun;
                        xImmun += labelVal.width;
                        prefix = '';
                        this.labels.push(labelVal);
                    }
                    break;
                case 'Wards':
                    let xWards = xValue;
                    let yWards = y;
                    let summWardsW = 0;
                    for (let i = 0; i < unit.wards.length; i++) {
                        let zapyatay = '';
                        if (i < unit.wards.length - 1) {
                            zapyatay = ',';
                        }
                        const value = unit.wards[i];
                        const ward = `${value.charAt(0).toUpperCase() + value.slice(1) + zapyatay}`;

                        const labelVal = this.scene.add.text(ward);
                        if (statsModifier.useWards.find(el => el === value)) {
                            labelVal.color = 'red';
                        }
                        summWardsW += labelVal.width;
                        if (summWardsW > 180) {
                            xWards = xValue;
                            summWardsW = 0;
                            yWards += labelVal.height + 2;
                        }
                        labelVal.x = xWards;
                        labelVal.y = yWards;
                        xWards += labelVal.width;
                        this.labels.push(labelVal);
                    }
                    let prefixWards = '';
                    if (unit.wards.length > 0) {
                        prefixWards = ',';
                    }
                    for (let i = 0; i < statsModifier.wards.length; i++) {
                        let zapyatay = '';
                        if (i < statsModifier.wards.length - 1) {
                            zapyatay = ',';
                        }
                        const value = statsModifier.wards[i];
                        const ward = `${prefixWards + value.charAt(0).toUpperCase() + value.slice(1) + zapyatay}`;

                        const labelVal = this.scene.add.text(ward);
                        if (statsModifier.useWards.find(el => el === value)) {
                            labelVal.color = 'red';
                        } else {
                            labelVal.color = 'green';
                        }

                        summWardsW += labelVal.width;
                        if (summWardsW > 180) {
                            xWards = xValue;
                            summWardsW = 0;
                            yWards += labelVal.height + 2;
                        }
                        labelVal.x = xWards;
                        labelVal.y = yWards;
                        xWards += labelVal.width;
                        prefixWards = '';
                        this.labels.push(labelVal);
                    }
                    break;
                case 'Chances to hit':

                    let xChans = xValue;
                    let yChans = y;
                    let summChansW = 0;
                    
                    for (let i = 0; i < unit.chancesHit.length; i++) {
                        //let zapyatay = '';
                        const splitLabel = this.scene.add.text('');
                        if (i>0) {
                            console.log('add Split!!!!!!!!!!!!!!')
                            splitLabel.text = ' / ';

                        }
                        const value = Math.trunc(unit.chancesHit[i] - statsModifier.chancesHit[i]);
                        if (value !== 0) {
                            let upVal = '';
                            if (statsModifier.chancesHit[i] > 0) {
                                upVal = ' +' + String(statsModifier.chancesHit[i]);
                            }
                            //const attack = `${value.charAt(0).toUpperCase() + value.slice(1) + zapyatay}`;

                            const labelVal = this.scene.add.text(value.toString());
                            const labelUpVal = this.scene.add.text(upVal);
                            labelUpVal.color = 'green';
                            summChansW += splitLabel.width + labelVal.width + labelUpVal.width;
                            if (summChansW > 180) {
                                xChans = xValue;
                                summChansW = 0;
                                yChans += labelVal.height + 2;
                            }
                            splitLabel.x = xChans;
                            labelVal.x = splitLabel.x + splitLabel.width;
                            labelUpVal.x = labelVal.x + labelVal.width;
                            splitLabel.y = yChans;
                            labelVal.y = yChans;
                            labelUpVal.y = yChans;
                            xChans += splitLabel.width + labelVal.width + labelUpVal.width;
                            this.labels.push(splitLabel, labelVal, labelUpVal);
                        }

                    }
                    //let prefixChans = '';
                    // if (unit.chancesHit.length > 0) {
                    //     prefixChans = ' / ';
                    // }
                    //const newChanc = statsModifier.chancesHit.slice(unit.chancesHit.length);
                    if(statsModifier.chancesHit.length>unit.chancesHit.length){
                        const splitLabel = this.scene.add.text(' / ');
                        this.labels.push(splitLabel);
                        summChansW += splitLabel.width;
                    }
                    for (let i = 0; i < statsModifier.chancesHit.length; i++) {
                        const newChance = statsModifier.chancesHit[i];
                        console.log('newChance = ', newChance);
                        if (unit.chancesHit[i] <= newChance) {
                            console.log('render newChance = ', newChance);
                            //let zapyatay = '';
                            const splitLabel = this.scene.add.text(' / ');
                            if (i>0) {
                                splitLabel.text = ' / ';
                            }
                            const value = newChance;
                            const ward = value.toString();

                            const labelVal = this.scene.add.text(ward);
                            labelVal.color = 'green';

                            summChansW += splitLabel.width + labelVal.width;
                            if (summChansW > 180) {
                                xChans = xValue;
                                summChansW = 0;
                                yChans += labelVal.height + 2;
                            }
                            splitLabel.x = xChans;
                            labelVal.x = splitLabel.x+splitLabel.width;
                            splitLabel.y = yChans;
                            labelVal.y = yChans;
                            xChans += splitLabel.width + labelVal.width;
                            this.labels.push(splitLabel, labelVal);
                        }
                    }
                    break;
                case 'Attack':
                    let xAttack = xValue;
                    let yAttack = y;
                    let summAttackW = 0;
                    for (let i = 0; i < unit.damageName.length; i++) {
                        // let zapyatay = '';
                        // if (i < unit.damageName.length - 1) {
                        //     zapyatay = ' / ';
                        // }
                        const splitLabel = this.scene.add.text('');
                        if (i>0) {
                            console.log('add Split Attack!!!!!!!!!!!!!!')
                            splitLabel.text = ' / ';

                        }
                        const value = unit.damageName[i];
                        //const attack = `${value.charAt(0).toUpperCase() + value.slice(1) + zapyatay}`;

                        const labelVal = this.scene.add.text(value);
                        summAttackW += splitLabel.width + labelVal.width;
                        if (summAttackW > 400) {
                            xAttack = xValue;
                            summAttackW = 0;
                            yAttack += labelVal.height + 2;
                        }
                        splitLabel.x = xAttack;
                        splitLabel.y = yAttack;
                        labelVal.x = splitLabel.x + splitLabel.width;
                        labelVal.y = yAttack;
                        xAttack += splitLabel.width + labelVal.width;
                        this.labels.push(splitLabel, labelVal);
                    }
                    // let prefixAttack = '';
                    // if (unit.damageName.length > 0) {
                    //     prefixAttack = ' / ';
                    // }
                    if(statsModifier.damageName.length>0){
                        const splitLabel = this.scene.add.text(' / ');
                        splitLabel.x = xAttack;
                        splitLabel.y = yAttack;
                        xAttack+=splitLabel.width;
                        summAttackW += splitLabel.width;
                        this.labels.push(splitLabel);
                        //summChansW += splitLabel.width;
                    }
                    const newAttacks = statsModifier.damageName.slice(unit.damageName.length);
                    for (let i = 0; i < newAttacks.length; i++) {
                        // let zapyatay = '';
                        // if (i < newAttacks.length - 1) {
                        //     zapyatay = ' / ';
                        // }
                        const splitLabel = this.scene.add.text('');
                        if (i>0) {
                            console.log('add Split Attack!!!!!!!!!!!!!!')
                            splitLabel.text = ' / ';

                        }

                        const value = newAttacks[i];
                        const attack = value.toString();

                        const labelVal = this.scene.add.text(attack);
                        labelVal.color = 'green';

                        summAttackW += splitLabel.width + labelVal.width;
                        if (summAttackW > 400) {
                            xAttack = xValue;
                            summAttackW = 0;
                            yAttack += labelVal.height + 2;
                        }
                        splitLabel.x =xAttack;
                        splitLabel.y = yAttack;
                        labelVal.x = splitLabel.x + splitLabel.width;
                        labelVal.y = yAttack;
                        xAttack += splitLabel.width + labelVal.width;
                        prefixWards = '';
                        this.labels.push(splitLabel, labelVal);
                    }
                    break;
                case 'Damage':
                    //let dmgStr = '';
                    let xDamage = xValue;
                    let yDamage = y;
                    let summDamageW = 0;
                    for (let i = 0; i < unit.damage.length; i++) {
                        const val = unit.damage[i];
                        if (val > statsModifier.damage[i]) {
                            let textLabelValue = '';
                            let separChar = '';
                            if (i < unit.damage.length - 1) {
                                separChar = ' / ';
                            }
                            if (unit.damageName[i] !== 'Critical Hit') {
                                textLabelValue = String(Math.trunc(val - statsModifier.damage[i]));
                            } else {
                                textLabelValue = String(Math.trunc(unit.damage[0] * Number(`0.${val - statsModifier.damage[i]}`)));
                            }
                            let upVal = '';
                            if (statsModifier.damage[i] > 0) {
                                if (unit.damageName[i] !== 'Critical Hit') {
                                    upVal = ' +' + String(statsModifier.damage[i]) + separChar;
                                } else {
                                    upVal = ' +' + String(Math.trunc(statsModifier.damage[i] * unit.damage[0] / 100)) + separChar;
                                }

                            }
                            const labelVal = this.scene.add.text(textLabelValue + (upVal !== '' ? '' : separChar));
                            const labelUpVal = this.scene.add.text(upVal);
                            labelUpVal.color = 'green';
                            summDamageW += labelVal.width + labelUpVal.width;
                            if (summDamageW > 180) {
                                xDamage = xValue;
                                summDamageW = 0;
                                yDamage += labelVal.height + 2;
                            }
                            labelVal.x = xDamage;
                            labelUpVal.x = labelVal.x + labelVal.width;
                            labelVal.y = yDamage;
                            labelUpVal.y = yDamage;
                            xDamage += labelVal.width + labelUpVal.width;
                            this.labels.push(labelVal, labelUpVal);
                        }

                    }

                    for (let i = 0; i < statsModifier.damage.length; i++) {
                        const val = statsModifier.damage[i];

                        if (i === 0 || val === 0) {
                            continue;
                        }
                        console.log('statsModifier.damage = ', val);
                        let textLabelVal = '';
                        let separChar = '';
                        if (i < statsModifier.damage.length - 1) {
                            separChar = ' / ';
                        }
                        if (statsModifier.damageName[i] !== 'Critical Hit') {
                            textLabelVal = String(statsModifier.damage[i]);
                        } else {
                            textLabelVal = String(Math.trunc(statsModifier.damage[i] * unit.damage[0] / 100));
                        }
                        const labelVal = this.scene.add.text(textLabelVal + separChar);
                        labelVal.color = 'green';
                        summDamageW += labelVal.width;
                        if (summDamageW > 180) {
                            xDamage = xValue;
                            summDamageW = 0;
                            yDamage += labelVal.height + 2;
                        }
                        labelVal.x = xDamage;
                        labelVal.y = yDamage;
                        xDamage += labelVal.width;
                        this.labels.push(labelVal);
                    }
                    // const arrDmg = unit.damage.map((d, i) => {
                    //     console.log('Damage = ', d);
                    //     if (unit.damageName[i] !== 'Critical Hit') {
                    //         const upDmg = statsModifier.damage[i] > 0 ? `+${statsModifier.damage[i]}` : '';
                    //         return `${d - statsModifier.damage[i]}${upDmg}`;
                    //     } else {
                    //         return String(Math.trunc(unit.damage[0] * Number(`0.${d}`)));
                    //     }
                    // });

                    // const dmgStr = arrDmg.join(' / ');
                    // const newDmg = statsModifier.damage
                    //     .slice(unit.damage.length)
                    //     .map((d, i) => {
                    //         if (statsModifier.damageName[i] !== 'Critical Hit') {
                    //             return String(d);
                    //         } else {
                    //             return String(Math.trunc(unit.damage[0] * Number(`0.${d}`)));
                    //         }
                    //     })
                    //     .join(' / ');
                    // labelValue = this.scene.add.text(dmgStr + `${newDmg.length > 0 ? ' / ' : ''}` + newDmg);
                    // labelValue.x = xValue;
                    // labelValue.y = y;
                    // this.labels.push(labelValue);
                    break;
                default:
                    // label = this.scene.add.text(labelRowData.label);
                    // label.x = xLabel;
                    // label.y = y;
                    labelValue = this.scene.add.text(String(unit[labelRowData.key as keyof IUnit]));
                    labelValue.x = xValue;
                    labelValue.y = y;
                    //this.labels.push(label);
                    this.labels.push(labelValue);
                    break;
            }
            this.labels.push(label);
            y += stepY;
        }
    }

    destroy() {
        if (!this.isOpen) {
            return;
        }

        this.scene.add.remove([
            this.fon,
            this.portrait,
            this.labelName,
            ...this.labels
        ]);

        this.isOpen = false;
    }
}