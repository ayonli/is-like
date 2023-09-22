# is-like

**Functions to check if a value is something alike.**

## Install

### Node.js

```sh
npm i is-like
```

### Deno

```ts
import { isDictLike, isArrayLike, /* ... */ } from "https://deno.land/x/is_like/index.js";
```

## API

Currently, this module includes the following functions.

#### `isDictLike(value: any): boolean`

*Checks if the input value is a dict `object`, which includes key-value pairs.*

```js
console.assert(isDictLike({}));
console.assert(isDictLike({ foo: "bar" }));

class Test {
    constructor(name) {
        this.name = name;
    }
}
console.assert(isDictLike(new Test("Test")));
console.assert(!isDictLike(new Test())); // an empty custom object will fail

console.assert(!isDictLike(new Date()));
console.assert(!isDictLike(/[a-z]/));
console.assert(!isDictLike(["hello", "world"]));
console.assert(!isDictLike(new Map([["foo", "Hello"], ["bar", "World"]])));
console.assert(!isDictLike(new Error("something went wrong")));
console.assert(!isDictLike(Promise.resolve("Hello, World!")));
```

#### `isArrayLike(value: any): boolean`

*Checks if the input value is an `object` with `length` property or a string.*

```js
console.assert(isArrayLike([1, 2, 3]));
console.assert(isArrayLike(Int8Array.from([1, 2, 3])));
console.assert(isArrayLike(Uint8Array.from([1, 2, 3])));
console.assert(isArrayLike(Int16Array.from([1, 2, 3])));
console.assert(isArrayLike(Uint16Array.from([1, 2, 3])));
console.assert(isArrayLike(Int32Array.from([1, 2, 3])));
console.assert(isArrayLike(Uint32Array.from([1, 2, 3])));
console.assert(isArrayLike(Float32Array.from([1, 2, 3])));
console.assert(isArrayLike(Float64Array.from([1, 2, 3])));
console.assert(isArrayLike(Buffer.from([1, 2, 3])));

let args = null;
(function () { args = arguments; })("Hello, World!");
console.assert(isArrayLike(args));

console.assert(isArrayLike("Hello, World!"));
console.assert(isArrayLike(new String("Hello, World!")));

class MyArray extends Array { }
console.assert(isArrayLike(new MyArray(8)));

class ArrayLike {
    get length() {
        return 0;
    }
    [Symbol.iterator]() { }
}
console.assert(isArrayLike(new ArrayLike()));
```

#### `isCollectionLike(value: any, excludeWeakOnes?: boolean): boolean`

*Checks if the input value is an `object` with `size` property and*
*`[Symbol.iterator]()` method, or is an instance of **WeakMap** or*
***WeakSet** if `excludeWeakOnes` is not set.*

```js
console.assert(isCollectionLike(new Map));
console.assert(isCollectionLike(new Set));
console.assert(isCollectionLike(new WeakMap));
console.assert(!isCollectionLike(new WeakMap, true));
console.assert(isCollectionLike(new WeakSet));
console.assert(!isCollectionLike(new WeakSet, true));

class MyMap extends Map { }
console.assert(isCollectionLike(new MyMap));

class MySet extends Set { }
console.assert(isCollectionLike(new MySet));

class CollectionLike {
    get size() {
        return 0;
    }
    [Symbol.iterator]() { }
}
console.assert(isCollectionLike(new CollectionLike));
```

#### `isTypedArrayLike(value: any): boolean`

*Checks if the input value is an `object` with `byteLength` property*
*and `slice()` method.*

Alias: `isBufferLike`, deprecated.

```js
console.assert(isTypedArrayLike(Buffer.from([1, 2, 3])));
console.assert(isTypedArrayLike(new ArrayBuffer(8)));
console.assert(isTypedArrayLike(Int8Array.from([1, 2, 3])));
console.assert(isTypedArrayLike(Uint8Array.from([1, 2, 3])));
console.assert(isTypedArrayLike(Int16Array.from([1, 2, 3])));
console.assert(isTypedArrayLike(Uint16Array.from([1, 2, 3])));
console.assert(isTypedArrayLike(Int32Array.from([1, 2, 3])));
console.assert(isTypedArrayLike(Uint32Array.from([1, 2, 3])));
console.assert(isTypedArrayLike(Float32Array.from([1, 2, 3])));
console.assert(isTypedArrayLike(Float64Array.from([1, 2, 3])));
```

#### `isErrorLike(value: any): boolean`

*Checks if the input value is an `object` with `name`, `message` and `stack`*
*properties.*

```js
console.assert(isErrorLike(new Error("something went wrong")));
console.assert(isErrorLike(new EvalError("something went wrong")));
console.assert(isErrorLike(new RangeError("something went wrong")));
console.assert(isErrorLike(new RangeError("something went wrong")));
console.assert(isErrorLike(new ReferenceError("something went wrong")));
console.assert(isErrorLike(new SyntaxError("something went wrong")));
console.assert(isErrorLike(new TypeError("something went wrong")));
console.assert(isErrorLike(new URIError("something went wrong")));
console.assert(isErrorLike(new assert.AssertionError({ message: "something went wrong" })));

class MyError extends Error { }
console.assert(isErrorLike(new MyError("something went wrong")));

let err = { name: "CustomError", message: "something went wrong" };
Error.captureStackTrace(err);
console.assert(isErrorLike(err));
```

#### `isPromiseLike(value: any): boolean`

*Checks if the input is an `object` with `then()` method.*

```js
console.assert(isPromiseLike(Promise.resolve(123)));
console.assert(isPromiseLike({ then() { } }));
console.assert(isPromiseLike({ then: () => { } }));
console.assert(!isPromiseLike({ then: 123 }));
```
