export declare function isDictLike(value: any): value is { [x: string]: any };
export declare function isArrayLike(value: any, strict?: boolean): value is ArrayLike<any>;
export declare function isCollectionLike(value: any): boolean;
export declare function isCollectionLike(value: any, excludeWeakOnes: boolean): value is {
    size: number;
} & Iterable<any>;
export declare function isBufferLike(value: any): value is ArrayLike<number> & Pick<Buffer, "byteLength" | "slice">;
export declare function isErrorLike(value: any): value is Error;
export declare function isPromiseLike(value: any): value is PromiseLike<any>;