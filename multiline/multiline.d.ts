// Type definitions for multiline
// Project: https://github.com/sindresorhus/multiline
// Project: https://www.npmjs.org/package/multiline
// Definitions by: Samuel Neff <https://github.com/samuelneff/>
// Definitions: https://github.com/samuelneff/DefinitelyTyped

interface Multiline
{
    (funcWithComment:() => void):string;
    stripIndent(funcWithComment:() => void):string;
}
declare var multiline:Multiline;