"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

/**
 * @param {any} value 
 * @param {Array<[string|symbol, string]>} props 
 * @param {Array<string>} types
 */
function isObjectWith(value, ...props) {
    let isObj = typeof value === "object" && value !== null;
    return isObj && props.every(([p, t]) => p in value && typeof value[p] === t);
}

function isEmptyDict(obj) {
    try {
        let str = JSON.stringify(obj);
        return str === "{}" || str === "[]";
    } catch (e) {
        return false;
    }
}

function isDictLike(value) {
    return typeof value === "object" && value !== null
        && (value.constructor === Object || (
            !(value instanceof Date) &&
            !(value instanceof RegExp) &&
            !isArrayLike(value, true) &&
            !isEmptyDict(value) &&
            !isBufferLike(value) &&
            !isCollectionLike(value) &&
            !isPromiseLike(value)
        ));
}

function isArrayLike(value, strict = false) {
    if (Array.isArray(value)) {
        return true;
    } else if (!strict) {
        return isObjectWith(value, ["length", "number"])
            || (typeof value === "string");
    } else if (isObjectWith(value, ["length", "number"])) {
        let keys = Object.keys(value);
        let isNonEnumLength = !keys.includes("length");
        let indexes;

        if (value.length === 0 ||
            (indexes = keys.map(Number).filter(isFinite)).length === 0) {
            return isNonEnumLength;
        } else {
            let hasIterator = typeof value[Symbol.iterator] === "function";

            for (let i = value.length; i--;) {
                if (!indexes.includes(i) && !(isNonEnumLength || hasIterator)) {
                    return false;
                }
            }

            return true;
        }
    }

    return false;
}

function isCollectionLike(value, excludeWeakOnes = false) {
    return (isObjectWith(value, ["size", "number"], [Symbol.iterator, "function"]))
        || (!excludeWeakOnes &&
            (value instanceof WeakMap || value instanceof WeakSet));
}

function isBufferLike(value) {
    return isObjectWith(value, ["byteLength", "number"], ["slice", "function"]);
}

function isErrorLike(value) {
    return isObjectWith(value,
        ["name", "string"],
        ["message", "string"],
        ["stack", "string"]
    );
}

function isPromiseLike(value) {
    return isObjectWith(value, ["then", "function"]);
}

exports.isDictLike = isDictLike;
exports.isArrayLike = isArrayLike;
exports.isCollectionLike = isCollectionLike;
exports.isBufferLike = isBufferLike;
exports.isErrorLike = isErrorLike;
exports.isPromiseLike = isPromiseLike;