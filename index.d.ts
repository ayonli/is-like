/**
 * Checks if the input value is a dict `object`, which includes key-value pairs.
 */
export declare function isDictLike(value: any): value is { [x: string]: any; };

/**
 * Checks if the input value is an `object` with `length` property or a string.
 */
export declare function isArrayLike(
    value: any,
    strict?: boolean
): value is ArrayLike<any>;

/**
 * Checks if the input value is an `object` with `size` property and
 * `[Symbol.iterator]()` method, or is an instance of **WeakMap** or
 * **WeakSet** if `excludeWeakOnes` is not set.
 */
export declare function isCollectionLike(value: any): boolean;
export declare function isCollectionLike(
    value: any,
    excludeWeakOnes: boolean
): value is { size: number; } & Iterable<any>;

/**
 * Checks if the input value is an `object` with `byteLength` property and
 * `slice()` method.
 */
export declare function isTypedArrayLike(
    value: any
): value is ArrayLike<number> & Pick<Uint8Array, "byteLength" | "slice">;
/** An alias of `isTypedArrayLike`. */
export declare const isBufferLike: typeof isTypedArrayLike;

/**
 * Checks if the input value is an `object` with `name`, `message` and `stack`
 * properties.
 */
export declare function isErrorLike(value: any): value is Error;

/** Checks if the input is an `object` with `then()` method. */
export declare function isPromiseLike(value: any): value is PromiseLike<any>;
