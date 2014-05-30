// Type definitions for pluralize
// Project: https://github.com/blakeembrey/pluralize
// Definitions by: Samuel Neff <https://github.com/samuelneff>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

interface Pluralize
{
    (word:string, count?:number, includeCount?:boolean);
    plural(word:string, count?:number);
    singular(word:string);
    addPluralRule(rule:RegExp, replacement:string);
    addSingularRule(rule:RegExp, replacement:string);
    addUncountableRule(word:string);
    addIrregularRule(singular:string, plural:string);
}
declare var pluralize:Pluralize;




