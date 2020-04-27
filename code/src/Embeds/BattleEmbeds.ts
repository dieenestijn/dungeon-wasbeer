import SettingsConstants from '../Constants/SettingsConstants';
import Battle from '../Objects/Battle';
import { MessageEmbed } from 'discord.js';
import Character from '../Objects/Character';

export default class BattleEmbeds {

    public static GetBattleEmbed(battle:Battle, character:Character, roll1?:number, roll2?:number, roll3?:number, roll4?:number, playerWon?:boolean, damage?:number, crit?:boolean) {
        const monster = battle.GetMonster();

        const characterName = character.GetName();
        const characterAttack = character.GetAttackRoll();
        const characterStrength = character.GetAttackStrength();
        const monsterName = monster.GetName();
        const monsterAttack = monster.GetAttackRoll();
        const monsterStrength = monster.GetAttackStrength();

        const embed = new MessageEmbed()
            .setColor(SettingsConstants.COLORS.DEFAULT)
            .setAuthor('Aanval')
            .setThumbnail(monster.GetImageUrl())
            .setTitle(`${characterName} VS ${monsterName}`)
            .setDescription('-- Statistieken --')
            .addField(`${characterName}`, `Health: ${character.GetCurrentHealth()}/${character.GetMaxHealth()}\n${character.GetAttackName()}: ${characterStrength}\nAttack: ${characterAttack}`, true)
            .addField(`${monsterName}`, `Health: ${battle.GetCurrentMonsterHealth()}/${battle.GetMaxMonsterHealth()}\nStrength: ${monsterStrength}\nAttack: ${monsterAttack}`, true)
            .addField('--------------------------------', '-- Rolls --');

        if (roll1 && roll2) {
            embed.addField(`${characterName}`, `D20 = ${roll1}\nD${characterAttack} = ${roll2}\nTotaal = ${roll1 + roll2}`, true);
            if (roll3 && roll4) {
                embed.addField(`${monsterName}`, `D20 = ${roll3}\nD${monsterAttack} = ${roll4}\nTotaal = ${roll3 + roll4}`, true);
            } else if (roll3) {
                embed.addField(`${monsterName}`, `D20 = ${roll3}\nRolt de D${monsterAttack}...`, true);
            } else {
                embed.addField(`${monsterName}`, 'Rolt de D20...', true);
            }
        } else if (roll1) {
            embed.addField(`${characterName}`, `D20 = ${roll1}\nRolt de D${characterAttack}...`, true);
        } else {
            embed.addField(`${characterName}`, 'Rolt de D20...', true);
        }

        if (playerWon != null) {
            embed.addField('--------------------------------', '-- Resultaat --');
            if (playerWon) {
                embed.addField(`${characterName} wint${crit ? ' met een crit' : ''}!`, `Je doet een driedubbele salto en slaat de ${monsterName} recht in zijn bek.\nJe doet ${damage} damage.`);
                embed.setColor(SettingsConstants.COLORS.GOOD)
            } else {
                embed.addField(`De ${monsterName} wint${crit ? ' met een crit' : ''}!`, `Hij haalt uit met zijn knuppel en raakt je recht in je gezicht.\nHij doet ${damage} damage.`);
                embed.setColor(SettingsConstants.COLORS.BAD)
            }
        }

        return embed;
    }
}