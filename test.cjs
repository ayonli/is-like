const assert = require("assert");
const {
    isDictLike,
    isArrayLike,
    isCollectionLike,
    isTypedArrayLike,
    isErrorLike,
    isPromiseLike,
    isObjectIdLike
} = require(".");

describe("isDictLike", () => {
    it("should check an plain object", () => {
        assert(isDictLike({}));
        assert(isDictLike({ foo: "bar" }));
    });

    it("should check an instance of a user-defined class", () => {
        class Test {
            constructor(name) {
                this.name = name;
            }
        }
        assert(isDictLike(new Test("Test")));
        assert(!isDictLike(new Test()));
    });

    it("should check for non-dict objects", () => {
        assert(!isDictLike(new Date()));
        assert(!isDictLike(/[a-z]/));
        assert(!isDictLike(["hello", "world"]));
        assert(!isDictLike(new Map([["foo", "Hello"], ["bar", "World"]])));
        assert(!isDictLike(new Error("something went wrong")));
        assert(!isDictLike(Buffer.from("Hello, World!")));
        assert(!isDictLike(Promise.resolve("Hello, World!")));
    });
});

describe("isArrayLike", () => {
    it("should check an Array", () => {
        assert(isArrayLike([1, 2, 3]));
    });

    it("should check TypedArrays", () => {
        assert(isArrayLike(Int8Array.from([1, 2, 3])));
        assert(isArrayLike(Uint8Array.from([1, 2, 3])));
        assert(isArrayLike(Int16Array.from([1, 2, 3])));
        assert(isArrayLike(Uint16Array.from([1, 2, 3])));
        assert(isArrayLike(Int32Array.from([1, 2, 3])));
        assert(isArrayLike(Uint32Array.from([1, 2, 3])));
        assert(isArrayLike(Float32Array.from([1, 2, 3])));
        assert(isArrayLike(Float64Array.from([1, 2, 3])));

        if (typeof BigInt64Array === "function") {
            assert(isArrayLike(BigInt64Array.from([BigInt(1), BigInt(2)])));
            assert(isArrayLike(BigUint64Array.from([BigInt(1), BigInt(2)])));
        }
    });

    it("should check Buffer", () => {
        assert(isArrayLike(Buffer.from([1, 2, 3])));
    });

    it("should check the arguments", () => {
        let args = null;
        (function () { args = arguments; })("Hello, World!");
        assert(isArrayLike(args));
    });

    it("should check string and String", () => {
        assert(isArrayLike("Hello, World!"));
        assert(isArrayLike(new String("Hello, World!")));
    });

    it("should check an Array derivative", () => {
        class MyArray extends Array { }
        assert(isArrayLike(new MyArray(8)));
    });

    it("should check an array-like object", () => {
        class ArrayLike {
            get length() {
                return 0;
            }
            [Symbol.iterator]() { }
        }
        assert(isArrayLike(new ArrayLike()));
    });

    it("should check an array-like object strictly", () => {
        assert(!isArrayLike({ length: 0 }, true));
        assert(isArrayLike({ 0: "hello", 1: "world", length: 2 }, true));
        assert(!isArrayLike({ 0: "hello", length: 2 }, true));

        let arrLike = {};
        Object.defineProperty(arrLike, "length", {
            value: 0
        });
        assert(isArrayLike(arrLike, true));

        let args;
        (function (a, b) { args = arguments })(1, 2);
        assert.strictEqual(isArrayLike(args, true), true);

        args.length = 10;
        assert.strictEqual(isArrayLike(args, true), true);
    });

    it("should check non-array-like objects", () => {
        assert(!isArrayLike(123));
        assert(!isArrayLike(true));
        assert(!isArrayLike(false));
        assert(!isArrayLike(null));
        assert(!isArrayLike(void 0));
        assert(!isArrayLike({}));
        assert(!isArrayLike(new Set));
        assert(!isArrayLike(new Map));
        assert(!isArrayLike(new WeakMap));
        assert(!isArrayLike(new WeakSet));
        assert(!isArrayLike(new Error("something went wrong")));
        assert(!isArrayLike(() => { }));
        if (typeof BigInt === "function")
            assert(!isArrayLike(BigInt(123)));
    });
});

describe("isCollectionLike", () => {
    it("should check a Map", () => {
        assert(isCollectionLike(new Map));
    });

    it("should check a Set", () => {
        assert(isCollectionLike(new Set));
    });

    it("should check a WeakMap", () => {
        assert(isCollectionLike(new WeakMap));
        assert(!isCollectionLike(new WeakMap, true));
    });

    it("should check a WeakSet", () => {
        assert(isCollectionLike(new WeakSet));
        assert(!isCollectionLike(new WeakSet, true));
    });

    it("should check a Map derivative", () => {
        class MyMap extends Map { }
        assert(isCollectionLike(new MyMap));
    });

    it("should check a Set derivative", () => {
        class MySet extends Set { }
        assert(isCollectionLike(new MySet));
    });

    it("should check a collection-like object", () => {
        class CollectionLike {
            get size() {
                return 0;
            }
            [Symbol.iterator]() { }
        }
        assert(isCollectionLike(new CollectionLike));
    });
});

describe("isTypedArrayLike", () => {
    it("should check a Buffer", () => {
        assert(isTypedArrayLike(Buffer.from([1, 2, 3])));
    });

    it("should check a ArrayBuffer", () => {
        assert(isTypedArrayLike(new ArrayBuffer(8)));
    });

    it("should check TypedArrays", () => {
        assert(isArrayLike(Int8Array.from([1, 2, 3])));
        assert(isArrayLike(Uint8Array.from([1, 2, 3])));
        assert(isArrayLike(Int16Array.from([1, 2, 3])));
        assert(isArrayLike(Uint16Array.from([1, 2, 3])));
        assert(isArrayLike(Int32Array.from([1, 2, 3])));
        assert(isArrayLike(Uint32Array.from([1, 2, 3])));
        assert(isArrayLike(Float32Array.from([1, 2, 3])));
        assert(isArrayLike(Float64Array.from([1, 2, 3])));

        if (typeof BigInt64Array === "function") {
            assert(isArrayLike(BigInt64Array.from([BigInt("1"), BigInt("2")])));
            assert(isArrayLike(BigUint64Array.from([BigInt("1"), BigInt("2")])));
        }
    });
});

describe("isErrorLike", () => {
    it("should check internal Errors", () => {
        assert(isErrorLike(new Error("something went wrong")));
        assert(isErrorLike(new EvalError("something went wrong")));
        assert(isErrorLike(new RangeError("something went wrong")));
        assert(isErrorLike(new RangeError("something went wrong")));
        assert(isErrorLike(new ReferenceError("something went wrong")));
        assert(isErrorLike(new SyntaxError("something went wrong")));
        assert(isErrorLike(new TypeError("something went wrong")));
        assert(isErrorLike(new URIError("something went wrong")));
        assert(isErrorLike(new assert.AssertionError({ message: "something went wrong" })));
    });

    it("should check an Error derivative", () => {
        class MyError extends Error { }
        assert(isErrorLike(new MyError("something went wrong")));
    });

    it("should check an error-like object", () => {
        let err = { name: "CustomError", message: "something went wrong" };
        Error.captureStackTrace(err);
        assert(isErrorLike(err));
    });
});

describe("isPromiseLike", () => {
    it("should check a Promise", () => {
        assert(isPromiseLike(Promise.resolve(123)));
    });

    it("should check promise-like objects", () => {
        assert(isPromiseLike({ then() { } }));
        assert(isPromiseLike({ then: () => { } }));
        assert(!isPromiseLike({ then: 123 }));
    });
});

describe("isObjectIdLike", () => {
    class ObjectId { }
    class ObjectID {}

    it("should check ObjectID-like objects", () => {
        assert(isObjectIdLike(new ObjectId()));
        assert(isObjectIdLike(new ObjectID()));
    })
});
