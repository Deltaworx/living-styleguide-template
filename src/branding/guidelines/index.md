---
title: Guidelines
layout: main.hbs

---

Guidelines ...


```js
var debug = require('debug')('metalsmith-metallic');
var extname = require('path').extname;
var hljs = require('highlight.js');
var entities = require('entities');

/**
 * Check if a `file` is markdown.
 *
 * @param {String} file
 * @return {Boolean}
 */

function markdown(file) {
  return (/\.md|\.markdown/).test(extname(file));
}
```


## Table

### of

### contents

#### demo
