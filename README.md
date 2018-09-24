# Character composer

[POC] Compose a character from any RPG system (D&amp;D5E, 3.5, Pathfinder, etc)

This is a __Work in progress__.

The final idea is to be able to include any RPG system just by adding json files without writing any code

## How to use

Install all the dependencies `npm install`

Run `node merge.js` to get a calculated JSON file with all the player data

To test the script, try to change the `player.json` ability scores for instance or the elf dexterity bonus in `elf.json`
You can edit all the json files as you like and even add classes, races, etc

## Conditions

This program can handle conditions
@todo Add example

## Alteration and override

We have to handle 2 behaviors:

### Alteration

Data that adds up

__Example:__ A dexterity bonus given by a race (+2 dex)

### Override

Data that should override existing data or calculation rule

__Example:__ Monk's unarmored defense (AC has a new calculation rule)

## Calculation formulas

We're using the library "Javascript expression evaluator" to evaluate formula.

Here is the doc: https://silentmatt.com/javascript-expression-evaluator/

## Calculation VS Translations

We separate the calculations and translations.
For instance, for the elf race, we'll have a `elf.json` file for calculation and `elf_fr.json` + `elf_en.json` files for translated texts

## Miscellaneous

### Speed

We'll manage the units according to the current language later

__Example:__ 9m = 30 feet

### Skills

We choose to ignore too specific rules (like "Fey ancestry" passive ability) in calculations.
Those abilities will be only visible in translated data to be displayed as simple text.

A skill can have parameters. Each param value is used to replace placeholders in the skill translated description

__Example:__ "Darkvision" range
