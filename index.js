"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

/**
 * @param {any} obj 
 * @param {Array<string|symbol>} props 
 */
function isObjectWith(obj, props) {
    let isObj = typeof obj === "object" && obj !== null;
    return isObj && props.every(p => p in obj);
}

function isArrayLike(obj) {
    return (isObjectWith(obj, ["length"])
        && typeof obj[Symbol.iterator] === "function")
        || (typeof obj === "string");
}

function isCollectionLike(obj, excludeWeakOnes = false) {
    return (isObjectWith(obj, ["size"])
        && typeof obj[Symbol.iterator] === "function")
        || (!excludeWeakOnes &&
            (obj instanceof WeakMap || obj instanceof WeakSet));
}

function isBufferLike(obj) {
    return isObjectWith(obj, ["byteLength"])
        && typeof obj.slice === "function";
}

function isErrorLike(obj) {
    return isObjectWith(obj, ["name", "message", "stack"]);
}

function isPromiseLike(obj) {
    return isObjectWith(obj, [])
        && typeof obj.then === "function";
}

exports.isArrayLike = isArrayLike;
exports.isCollectionLike = isCollectionLike;
exports.isBufferLike = isBufferLike;
exports.isErrorLike = isErrorLike;
exports.isPromiseLike = isPromiseLike;