// Type definitions for Async trunk at Jan 1, 2014 , latest commit f01b3992fbe7aa2f4881152143608ad666aea1cc, updated from 0.1.23
// Project: https://github.com/caolan/async
// Definitions by: Boris Yankov <https://github.com/borisyankov/>
// Definitions by: Samuel Neff <https://github.com/samuelneff/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

interface AsyncMultipleResultsCallback<T> { (err: string, results: T[]): any; }
interface AsyncSingleResultCallback<T> { (err: string, result: T): void; }
interface AsyncTimesCallback<T> { (n: number, callback: AsyncMultipleResultsCallback<T>): void; }

interface AsyncIterator<T, R> { (item: T, callback: AsyncSingleResultCallback<R>): void; }
interface AsyncMemoIterator<T, R> { (memo: R, item: T, callback: AsyncSingleResultCallback<R>): void; }

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
    each<T, R>(arr: T[], iterator: AsyncIterator<T, R>, callback: AsyncMultipleResultsCallback<T>): void;
    eachSeries<T, R>(arr: T[], iterator: AsyncIterator<T, R>, callback: AsyncMultipleResultsCallback<T>): void;
    eachLimit<T, R>(arr: T[], limit: number, iterator: AsyncIterator<T, R>, callback: AsyncMultipleResultsCallback<T>): void;
    map<T, R>(arr: T[], iterator: AsyncIterator<T, R>, callback: AsyncMultipleResultsCallback<T>);
    mapSeries<T, R>(arr: T[], iterator: AsyncIterator<T, R>, callback: AsyncMultipleResultsCallback<T>);
    mapLimit<T, R>(arr: T[], limit: number, iterator: AsyncIterator<T, R>, callback: AsyncMultipleResultsCallback<T>);
    filter<T, R>(arr: T[], iterator: AsyncIterator<T, R>, callback: AsyncMultipleResultsCallback<T>);
    select<T, R>(arr: T[], iterator: AsyncIterator<T, R>, callback: AsyncMultipleResultsCallback<T>);
    filterSeries<T, R>(arr: T[], iterator: AsyncIterator<T, R>, callback: AsyncMultipleResultsCallback<T>);
    selectSeries<T, R>(arr: T[], iterator: AsyncIterator<T, R>, callback: AsyncMultipleResultsCallback<T>);
    reject<T, R>(arr: T[], iterator: AsyncIterator<T, R>, callback: AsyncMultipleResultsCallback<T>);
    rejectSeries<T, R>(arr: T[], iterator: AsyncIterator<T, R>, callback: AsyncMultipleResultsCallback<T>);
    reduce<T, R>(arr: T[], memo: T, iterator: AsyncMemoIterator<T, R>, callback: AsyncSingleResultCallback<T>);
    inject<T, R>(arr: T[], memo: T, iterator: AsyncMemoIterator<T, R>, callback: AsyncSingleResultCallback<T>);
    foldl<T, R>(arr: T[], memo: T, iterator: AsyncMemoIterator<T, R>, callback: AsyncSingleResultCallback<T>);
    reduceRight<T, R>(arr: T[], memo: T, iterator: AsyncMemoIterator<T, R>, callback: AsyncSingleResultCallback<T>);
    foldr<T, R>(arr: T[], memo: T, iterator: AsyncMemoIterator<T, R>, callback: AsyncSingleResultCallback<T>);
    detect<T, R>(arr: T[], iterator: AsyncIterator<T, R>, callback: AsyncMultipleResultsCallback<T>);
    detectSeries<T, R>(arr: T[], iterator: AsyncIterator<T, R>, callback: AsyncMultipleResultsCallback<T>);
    sortBy<T, R>(arr: T[], iterator: AsyncIterator<T, R>, callback: AsyncMultipleResultsCallback<T>);
    some<T, R>(arr: T[], iterator: AsyncIterator<T, R>, callback: AsyncMultipleResultsCallback<T>);
    any<T, R>(arr: T[], iterator: AsyncIterator<T, R>, callback: AsyncMultipleResultsCallback<T>);
    every<T, R>(arr: T[], iterator: AsyncIterator<T, R>, callback: (result: boolean) => any);
    all<T, R>(arr: T[], iterator: AsyncIterator<T, R>, callback: (result: boolean) => any);
    concat<T, R>(arr: T[], iterator: AsyncIterator<T, R>, callback: AsyncMultipleResultsCallback<T>);
    concatSeries<T, R>(arr: T[], iterator: AsyncIterator<T, R>, callback: AsyncMultipleResultsCallback<T>);
    forEach<T,R>(arr: T[], iterator: AsyncIterator<T, R>, callback: AsyncMultipleResultsCallback<R>): void;
    forEachSeries<T, R>(arr: T[], iterator: AsyncIterator<T, R>, callback: AsyncMultipleResultsCallback<R>): void;
    forEachLimit<T, R>(arr: T[], limit: number, iterator: AsyncIterator<T, R>, callback: AsyncMultipleResultsCallback<R>): void;
    map<T, R>(arr: T[], iterator: AsyncIterator<T, R>, callback: AsyncMultipleResultsCallback<R>);
    mapSeries<T, R>(arr: T[], iterator: AsyncIterator<T, R>, callback: AsyncMultipleResultsCallback<R>);
    filter<T>(arr: T[], iterator: AsyncIterator<T, boolean>, callback: AsyncMultipleResultsCallback<T>);
    select<T, R>(arr: T[], iterator: AsyncIterator<T, boolean>, callback: AsyncMultipleResultsCallback<T>);
    filterSeries<T, R>(arr: T[], iterator: AsyncIterator<T, boolean>, callback: AsyncMultipleResultsCallback<T>);
    selectSeries<T, R>(arr: T[], iterator: AsyncIterator<T, boolean>, callback: AsyncMultipleResultsCallback<T>);
    reject<T>(arr: T[], iterator: AsyncIterator<T, boolean>, callback: AsyncMultipleResultsCallback<T>);
    rejectSeries<T>(arr: T[], iterator: AsyncIterator<T, boolean>, callback: AsyncMultipleResultsCallback<T>);
    reduce<T, R>(arr: T[], memo: R, iterator: AsyncMemoIterator<T, R>, callback: AsyncSingleResultCallback<R>);
    inject<T, R>(arr: T[], memo: R, iterator: AsyncMemoIterator<T, R>, callback: AsyncSingleResultCallback<R>);
    foldl<T, R>(arr: T[], memo: R, iterator: AsyncMemoIterator<T, R>, callback: AsyncSingleResultCallback<R>);
    reduceRight<T, R>(arr: T[], memo: R, iterator: AsyncMemoIterator<T, R>, callback: AsyncSingleResultCallback<R>);
    foldr<T, R>(arr: T[], memo: R, iterator: AsyncMemoIterator<T, R>, callback: AsyncSingleResultCallback<R>);
    detect<T>(arr: T[], iterator: AsyncIterator<T, boolean>, callback: AsyncMultipleResultsCallback<T>);
    detectSeries<T>(arr: T[], iterator: AsyncIterator<T, boolean>, callback: AsyncMultipleResultsCallback<T>);
    some<T>(arr: T[], iterator: AsyncIterator<T, boolean>, callback: AsyncMultipleResultsCallback<T>);
    any<T>(arr: T[], iterator: AsyncIterator<T, boolean>, callback: AsyncMultipleResultsCallback<T>);
    every<T>(arr: T[], iterator: AsyncIterator<T, boolean>, callback: (result: boolean) => any);
    all<T>(arr: T[], iterator: AsyncIterator<T, boolean>, callback: (result: boolean) => any);
    concat<T, R>(arr: T[], iterator: AsyncIterator<T, R[]>, callback: AsyncMultipleResultsCallback<R>);
    concatSeries<T, R>(arr: T[], iterator: AsyncIterator<T, R[]>, callback: AsyncMultipleResultsCallback<R>);

    // not documented anymore, but exist for backwards compatibility */
    forEach<T, R>(arr: T[], iterator: AsyncIterator<T, R>, callback: AsyncMultipleResultsCallback<T>): void;
    forEachSeries<T, R>(arr: T[], iterator: AsyncIterator<T, R>, callback: AsyncMultipleResultsCallback<T>): void;
    forEachLimit<T, R>(arr: T[], limit: number, iterator: AsyncIterator<T, R>, callback: AsyncMultipleResultsCallback<T>): void;

    // Control Flow
    series<T>(tasks: T[], callback?: AsyncMultipleResultsCallback<T>): void;
    series<T>(tasks: T, callback?: AsyncMultipleResultsCallback<T>): void;
    parallel<T>(tasks: T[], callback?: AsyncMultipleResultsCallback<T>): void;
    parallel<T>(tasks: T, callback?: AsyncMultipleResultsCallback<T>): void;
    parallelLimit<T>(tasks: T[], limit: number, callback?: AsyncMultipleResultsCallback<T>): void;
    parallelLimit<T>(tasks: T, limit: number, callback?: AsyncMultipleResultsCallback<T>): void;
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
