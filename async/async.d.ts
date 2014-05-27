// Type definitions for Async trunk at Jan 1, 2014 , latest commit f01b3992fbe7aa2f4881152143608ad666aea1cc, updated from 0.1.23
// Project: https://github.com/caolan/async
// Definitions by: Boris Yankov <https://github.com/borisyankov/>
// Definitions by: Samuel Neff <https://github.com/samuelneff/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

interface AsyncMultipleResultsCallback<T> { (err: string, results: T[]): any; }
interface AsyncSingleResultCallback<T> { (err: string, result: T): any; }
interface AsyncTimesCallback<T> { (n: number, callback: AsyncMultipleResultsCallback<T>): void; }
interface AsyncIterator<T> { (item: T, callback: AsyncMultipleResultsCallback<T>): void; }
interface AsyncMemoIterator<T> { (memo: T, item: T, callback: AsyncSingleResultCallback<T>): void; }
interface AsyncWorker<T> { (task: T, callback: Function): void; }
interface AsyncMultipleWorker<T> { (task: T[], callback: Function): void; }
interface AsyncCargo<T> {
    length():number;
    payload:number;
    push<T>(task:T, callback?: Function):void;
    saturated: () => void;
    empty: () => void;
    drain: () => void;
}

interface AsyncQueue<T> {
    length(): number;
    concurrency: number;
    push(task: T, callback?: AsyncMultipleResultsCallback<T>): void;
    saturated: AsyncMultipleResultsCallback<T>;
    empty: AsyncMultipleResultsCallback<T>;
    drain: AsyncMultipleResultsCallback<T>;
}

interface Async {

    // Collections
    each<T>(arr: T[], iterator: AsyncIterator<T>, callback: AsyncMultipleResultsCallback<T>): void;
    eachSeries<T>(arr: T[], iterator: AsyncIterator<T>, callback: AsyncMultipleResultsCallback<T>): void;
    eachLimit<T>(arr: T[], limit: number, iterator: AsyncIterator<T>, callback: AsyncMultipleResultsCallback<T>): void;
    map<T>(arr: T[], iterator: AsyncIterator<T>, callback: AsyncMultipleResultsCallback<T>);
    mapSeries<T>(arr: T[], iterator: AsyncIterator<T>, callback: AsyncMultipleResultsCallback<T>);
    mapLimit<T>(arr: T[], limit: number, iterator: AsyncIterator<T>, callback: AsyncMultipleResultsCallback<T>);
    filter<T>(arr: T[], iterator: AsyncIterator<T>, callback: AsyncMultipleResultsCallback<T>);
    select<T>(arr: T[], iterator: AsyncIterator<T>, callback: AsyncMultipleResultsCallback<T>);
    filterSeries<T>(arr: T[], iterator: AsyncIterator<T>, callback: AsyncMultipleResultsCallback<T>);
    selectSeries<T>(arr: T[], iterator: AsyncIterator<T>, callback: AsyncMultipleResultsCallback<T>);
    reject<T>(arr: T[], iterator: AsyncIterator<T>, callback: AsyncMultipleResultsCallback<T>);
    rejectSeries<T>(arr: T[], iterator: AsyncIterator<T>, callback: AsyncMultipleResultsCallback<T>);
    reduce<T>(arr: T[], memo: T, iterator: AsyncMemoIterator<T>, callback: AsyncSingleResultCallback<T>);
    inject<T>(arr: T[], memo: T, iterator: AsyncMemoIterator<T>, callback: AsyncSingleResultCallback<T>);
    foldl<T>(arr: T[], memo: T, iterator: AsyncMemoIterator<T>, callback: AsyncSingleResultCallback<T>);
    reduceRight<T>(arr: T[], memo: T, iterator: AsyncMemoIterator<T>, callback: AsyncSingleResultCallback<T>);
    foldr<T, U>(arr: T[], memo: T, iterator: AsyncMemoIterator<T>, callback: AsyncSingleResultCallback<T>);
    detect<T>(arr: T[], iterator: AsyncIterator<T>, callback: AsyncMultipleResultsCallback<T>);
    detectSeries<T>(arr: T[], iterator: AsyncIterator<T>, callback: AsyncMultipleResultsCallback<T>);
    sortBy<T>(arr: T[], iterator: AsyncIterator<T>, callback: AsyncMultipleResultsCallback<T>);
    some<T>(arr: T[], iterator: AsyncIterator<T>, callback: AsyncMultipleResultsCallback<T>);
    any<T>(arr: T[], iterator: AsyncIterator<T>, callback: AsyncMultipleResultsCallback<T>);
    every<T>(arr: T[], iterator: AsyncIterator<T>, callback: (result: boolean) => any);
    all<T>(arr: T[], iterator: AsyncIterator<T>, callback: (result: boolean) => any);
    concat<T>(arr: T[], iterator: AsyncIterator<T>, callback: AsyncMultipleResultsCallback<T>);
    concatSeries<T>(arr: T[], iterator: AsyncIterator<T>, callback: AsyncMultipleResultsCallback<T>);

    // not documented anymore, but exist for backwards compatibility */
    forEach<T>(arr: T[], iterator: AsyncIterator<T>, callback: AsyncMultipleResultsCallback<T>): void;
    forEachSeries<T>(arr: T[], iterator: AsyncIterator<T>, callback: AsyncMultipleResultsCallback<T>): void;
    forEachLimit<T>(arr: T[], limit: number, iterator: AsyncIterator<T>, callback: AsyncMultipleResultsCallback<T>): void;

    // Control Flow
    series<T>(tasks: T[], callback?: AsyncMultipleResultsCallback<T>): void;
    series<T>(tasks: T, callback?: AsyncMultipleResultsCallback<T>): void;
    parallel<T>(tasks: T[], callback?: AsyncMultipleResultsCallback<T>): void;
    parallel<T>(tasks: T, callback?: AsyncMultipleResultsCallback<T>): void;
    parallelLimit<T>(tasks: T[], limit:number, callback?: AsyncMultipleResultsCallback<T>): void;
    parallelLimit<T>(tasks: T, limit:number, callback?: AsyncMultipleResultsCallback<T>): void;
    whilst(test: Function, fn: Function, callback: Function): void;
    doWhilst(fn: Function, test: Function, callback: Function): void;
    until(test: Function, fn: Function, callback: Function): void;
    doUntil(fn: Function, test: Function, callback: Function): void;
    forever(fn: Function, callback: Function): void;
    waterfall<T>(tasks: T[], callback?: AsyncMultipleResultsCallback<T>): void;
    waterfall<T>(tasks: T, callback?: AsyncMultipleResultsCallback<T>): void;
    compose(...fns:Function[]):Function;
    applyEach(fns:Function[], ...argsThenCallback:any[]):void;
    applyEachSeries(fns:Function[], ...argsThenCallback:any[]):void;
    queue<T>(worker: AsyncWorker<T>, concurrency: number): AsyncQueue<T>;
    cargo<T>(worker: AsyncMultipleWorker<T>, payload?: number):AsyncCargo<T>;

    // auto(tasks: any[], callback?: AsyncMultipleResultsCallback<T>): void;
    auto(tasks: any, callback?: AsyncMultipleResultsCallback<any>): void;
    iterator(tasks: Function[]): Function;
    apply(fn: Function, ...arguments: any[]): void;
    nextTick<T>(callback: Function): void;

    times<T> (n: number, callback: AsyncTimesCallback<T>): void;
    timesSeries<T> (n: number, callback: AsyncTimesCallback<T>): void;

    // Utils
    memoize(fn: Function, hasher?: Function): Function;
    unmemoize(fn: Function): Function;
    log(fn: Function, ...arguments: any[]): void;
    dir(fn: Function, ...arguments: any[]): void;
    noConflict(): Async;
}

declare var async: Async;

declare module "async" {
	export = async;
}
