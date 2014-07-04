// Type definitions for bcrypt
// Project: https://github.com/ncb000gt/node.bcrypt.js
// Definitions by: Samuel Neff <https://github.com/samuelneff>
// Definitions: https://github.com/samuelneff/DefinitelyTyped

declare module "bcrypt" {

    interface ISalt {}

    export function genSalt(callback:(err:Error, salt:ISalt) => void):void;
    export function genSalt(rounds:number, callback:(err:Error, salt:ISalt) => void):void;
    export function genSaltSync(rounds?:number):ISalt;

    export function hash(data:string, salt:ISalt, callback:(err:Error, encrypted:string) => void):void;
    export function hash(data:string, rounds:number, callback:(err:Error, encrypted:string) => void):void;
    export function hashSync(data:string, salt:ISalt):string;
    export function hashSync(data:string, rounds:number):string;

    export function compare(data:string, encrypted:string, callback:(err, same:boolean) => void):void;
    export function compareSync(data:string, encrypted:string):boolean;

    export function getRounds(encrypted:string):number;
}