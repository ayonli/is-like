# is-like

**Functions to check if a value is something alike.**

## Install

```sh
npm i is-like
```

## API

Currently, this module includes the following functions.

#### `isDictLike(value: any): boolean`

*Checks if the input value is a dict `object`, which includes key-value pairs.*

```js
assert(isDictLike({}));
assert(isDictLike({ foo: "bar" }));

class Test {
    constructor(name) {
        this.name = name;
    }
}
assert(isDictLike(new Test("Test")));
assert(!isDictLike(new Test())); // an empty custom object will fail

assert(!isDictLike(new Date()));
assert(!isDictLike(/[a-z]/));
assert(!isDictLike(["hello", "world"]));
assert(!isDictLike(new Map([["foo", "Hello"], ["bar", "World"]])));
assert(!isDictLike(new Error("something went wrong")));
assert(!isDictLike(Buffer.from("Hello, World!")));
assert(!isDictLike(Promise.resolve("Hello, World!")));
```

#### `isArrayLike(value: any): boolean`

*Checks if the input value is an `object` with `length` property*
*or a string.*

```js
assert(isArrayLike([1, 2, 3]));
assert(isArrayLike(Int8Array.from([1, 2, 3])));
assert(isArrayLike(Uint8Array.from([1, 2, 3])));
assert(isArrayLike(Int16Array.from([1, 2, 3])));
assert(isArrayLike(Uint16Array.from([1, 2, 3])));
assert(isArrayLike(Int32Array.from([1, 2, 3])));
assert(isArrayLike(Uint32Array.from([1, 2, 3])));
assert(isArrayLike(Float32Array.from([1, 2, 3])));
assert(isArrayLike(Float64Array.from([1, 2, 3])));
assert(isArrayLike(Buffer.from([1, 2, 3])));

let args = null;
(function () { args = arguments; })("Hello, World!");
assert(isArrayLike(args));

assert(isArrayLike("Hello, World!"));
assert(isArrayLike(new String("Hello, World!")));

class MyArray extends Array { }
assert(isArrayLike(new MyArray(8)));

class ArrayLike {
    get length() {
        return 0;
    }
    [Symbol.iterator]() { }
}
assert(isArrayLike(new ArrayLike()));
```

#### `isCollectionLike(value: any, excludeWeakOnes?: boolean): boolean`

*Checks if the input value is an `object` with `size` property*
*and `[Symbol.iterator]()` method, or is an instance of **WeakMap** or*
***WeakSet** if `excludeWeakOnes` is not set.*

```js
assert(isCollectionLike(new Map));
assert(isCollectionLike(new Set));
assert(isCollectionLike(new WeakMap));
assert(!isCollectionLike(new WeakMap, true));
assert(isCollectionLike(new WeakSet));
assert(!isCollectionLike(new WeakSet, true));

class MyMap extends Map { }
assert(isCollectionLike(new MyMap));

class MySet extends Set { }
assert(isCollectionLike(new MySet));

class CollectionLike {
    get size() {
        return 0;
    }
    [Symbol.iterator]() { }
}
assert(isCollectionLike(new CollectionLike));
```

#### `isBufferLike(value: any): boolean`

*Checks if the input value is an `object` with `byteLength` property*
*and `slice()` method.*

```js
assert(isBufferLike(Buffer.from([1, 2, 3])));
assert(isBufferLike(new ArrayBuffer(8)));
assert(isArrayLike(Int8Array.from([1, 2, 3])));
assert(isArrayLike(Uint8Array.from([1, 2, 3])));
assert(isArrayLike(Int16Array.from([1, 2, 3])));
assert(isArrayLike(Uint16Array.from([1, 2, 3])));
assert(isArrayLike(Int32Array.from([1, 2, 3])));
assert(isArrayLike(Uint32Array.from([1, 2, 3])));
assert(isArrayLike(Float32Array.from([1, 2, 3])));
assert(isArrayLike(Float64Array.from([1, 2, 3])));
```

#### `isErrorLike(value: any): boolean`

*Checks if the input value is an `object` with `name`, `message` and `stack`*
*properties.*

```js
assert(isErrorLike(new Error("something went wrong")));
assert(isErrorLike(new EvalError("something went wrong")));
assert(isErrorLike(new RangeError("something went wrong")));
assert(isErrorLike(new RangeError("something went wrong")));
assert(isErrorLike(new ReferenceError("something went wrong")));
assert(isErrorLike(new SyntaxError("something went wrong")));
assert(isErrorLike(new TypeError("something went wrong")));
assert(isErrorLike(new URIError("something went wrong")));
assert(isErrorLike(new assert.AssertionError({ message: "something went wrong" })));

class MyError extends Error { }
assert(isErrorLike(new MyError("something went wrong")));

let err = { name: "CustomError", message: "something went wrong" };
Error.captureStackTrace(err);
assert(isErrorLike(err));
```

#### `isPromiseLike(value: any): boolean`

*Checks if the input is an `object` with `then()` method.*

```js
assert(isPromiseLike(Promise.resolve(123)));
assert(isPromiseLike({ then() { } }));
assert(isPromiseLike({ then: () => { } }));
assert(!isPromiseLike({ then: 123 }));
```