# sample-size [![](https://img.shields.io/npm/v/sample-size.svg)](https://www.npmjs.com/package/sample-size) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/sample-size)

## 🎲 random pass/fail by sample size
Accepts one decimal fraction

```js
const sample = require('sample-size');

filter(0) // always false

filter(1) // always true

filter(.2) // about 20% true
```

### Usage examples
Report only about 5% of events
```js
sample(.05) && reportEvent();
```

Sample about half of a list
```js
array.filter(() => sample(.5));
```
