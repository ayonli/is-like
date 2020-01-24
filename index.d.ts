export declare function isArrayLike(obj: any): obj is ArrayLike<any>;
export declare function isCollectionLike(obj: any): boolean;
export declare function isCollectionLike(obj: any, excludeWeakOnes: boolean): obj is {
    size: number;
} & Iterable<any>;
export declare function isBufferLike(obj: any): obj is Pick<Buffer, "byteLength" | "slice">;
export declare function isErrorLike(obj: any): obj is Error;
export declare function isPromiseLike(obj: any): obj is PromiseLike<any>;