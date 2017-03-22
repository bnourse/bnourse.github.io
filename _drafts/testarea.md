---
title: "Hello World"
---

{:.callout}
This is a paragraph

{:.footnotes}
1. Application-level dependencies that are conditionally loaded are still deterministic within an app's module dependency graph. Polyfills, on the other hand, are dependent on both whether the module is ever loaded as well as whether the browser supports the API natively. This means mechanisms like Webpack's code splitting feature (via require.ensure) are not themselves sufficient to conditionally load polyfills: an additional wrapper module is still necessary to run the feature detect (see previous attempts to accomplish this).
1. Internet Explorer versions before 9 do not support the onload method. If you need to support these old browsers, you also have to add an onreadystate handler.
1. Autoprefixer does this via browserlist and its custom usage data option.