"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

/**
 * @param {any} obj 
 * @param {Array<[string|symbol, string]>} props 
 * @param {Array<string>} types
 */
function isObjectWith(obj, ...props) {
    let isObj = typeof obj === "object" && obj !== null;
    return isObj && props.every(([p, t]) => p in obj && typeof obj[p] === t);
}

function isArrayLike(obj, strict = false) {
    if (Array.isArray(obj)) {
        return true;
    } else if (!strict) {
        return isObjectWith(obj, ["length", "number"])
            || (typeof obj === "string");
    } else if (isObjectWith(obj, ["length", "number"])) {
        let keys = Object.keys(obj);
        let isNonEnumLength = !keys.includes("length");
        let indexes;

        if (obj.length === 0 ||
            (indexes = keys.map(Number).filter(isFinite)).length === 0) {
            return isNonEnumLength;
        } else {
            let hasIterator = typeof obj[Symbol.iterator] === "function";

            for (let i = obj.length; i--;) {
                if (!indexes.includes(i) && !(isNonEnumLength || hasIterator)) {
                    return false;
                }
            }

            return true;
        }
    }

    return false;
}

function isCollectionLike(obj, excludeWeakOnes = false) {
    return (isObjectWith(obj, ["size", "number"], [Symbol.iterator, "function"]))
        || (!excludeWeakOnes &&
            (obj instanceof WeakMap || obj instanceof WeakSet));
}

function isBufferLike(obj) {
    return isObjectWith(obj, ["byteLength", "number"], ["slice", "function"]);
}

function isErrorLike(obj) {
    return isObjectWith(obj,
        ["name", "string"],
        ["message", "string"],
        ["stack", "string"]
    );
}

function isPromiseLike(obj) {
    return isObjectWith(obj, ["then", "function"]);
}

exports.isArrayLike = isArrayLike;
exports.isCollectionLike = isCollectionLike;
exports.isBufferLike = isBufferLike;
exports.isErrorLike = isErrorLike;
exports.isPromiseLike = isPromiseLike;