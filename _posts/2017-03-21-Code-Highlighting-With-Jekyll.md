---
title: Code Syntax Highlighting With Jekyll
summaryimg: jekyll.png
---

When you use Jekyll to host a site with code-heavy content, it is nice to take advantage of its built-in syntax highlighting. Getting it working isn't particularly difficult, but there are a few aspects that can lead to frustration and I hope to smooth that over here.

## Finding Style Themes

Jekyll's documentation mentions that it uses [Rogue](https://github.com/jwarby/jekyll-pygments-themes) for syntax highlighting. Rouge recognizes code keywords and constructs and wraps them in `<span>` tags with classes that correspond to each keyword or construct type. 

The documentation does give a link to one stylesheet, but Google searches for "rouge themes", "rouge css", etc. don't give much help. Jekyll documentation mentions that you can install [Pygments](http://pygments.org/), but that requires installing Python and getting Pygments working. 

The missing link that didn't seem obvious from the documentation: **The CSS classes that Rogue creates are compatible with Pygment's CSS stylesheets.** 

Once you understand that it's a quick Google search to find Pygments css themes, but I'll save you some time. [Here is a set of CSS stylesheets that correspond to the default themes available in Pygments](http://jwarby.github.io/jekyll-pygments-themes/languages/javascript.html). There's a gallery there that shows some examples of the colors used as well.

## Markdown Styling Code Blocks

That handles the actual code highlighting, but you still need to style the `<pre>` blocks that are being generated to fit with your page's overall styling. Particularly, Jekyll docs nonchalantly mention that you can have Rouge add line numbers and that you might want to style the `.lineno` class. In practice I found it a little more involved than that.

There are a couple of ways to trigger syntax highlighting in Jekyll's markdown and they each render as slightly different html. I'll go ahead and give an example of each so you can use your browser's dev console to check it out.

### Wrap with <code>``` css</code> and <code>```</code>
``` css
pre, code {
  font-family: 'Roboto Mono', monospace;
  background-color: #fcfcff;
}
```
### Wrap with `{% raw %}{% highlight css %}{% endraw %}` and `{% raw %}{% endhighlight %}{% endraw %}`
{% highlight css %}
pre, code {
  font-family: 'Roboto Mono', monospace;
  background-color: #fcfcff;
}
{% endhighlight %}

### Wrap with `{% raw %}{% highlight css linenos %}{% endraw %}` and `{% raw %}{% endhighlight %}{% endraw %}`
{% highlight css linenos %}
pre, code {
  font-family: 'Roboto Mono', monospace;
  background-color: #fcfcff;
}
{% endhighlight %}

While it would be _nice_ to have all three methods working equally, the peculiarities of the generated classes made it seem difficult. After a few different approaches that seemed unnecessarily complex and broke other styling, I settled on having two methods styled correctly, the one with numbers and the <code>```</code> method. 

## The CSS

### The Relevant Bits

Cancel out the browser stylesheets for `.figure` that Rouge uses in the `{% raw %}{% highlight %}{% endraw %}` formats:

``` css
figure {
  margin: 0;
  padding: 0;
}
```

Add some top and bottom margin for the <code>```</code> format, and improve the whitespace:

``` css
.highlight {
  margin: 1em 0;
}

pre.highlight {
  padding: 1em;
}
```

Style the line numbers. Give them some room:

``` css
.lineno {
  padding: .5em;
}
```

And color their background. Color the `.gutter` area too or you'll get a 1px gap:

``` css
.gutter, .lineno {
  background-color: #CAEBF2;
}
```

Lastly, add a little whitespace to the code area in the `{% raw %}{% highlight %}{% endraw %}` formats:

``` css
td.code {
  padding: 1em .5em;
}
```

###  Here's all the code/pre related styles for my site in one block:
{% highlight css linenos %}
pre, code {
  font-family: 'Roboto Mono', monospace;
  background-color: #fcfcff;
  margin: 0;
}

pre {
  overflow-y: scroll;
  word-wrap: normal;
}

figure {
  margin: 0;
  padding: 0;
}

.highlight {
  margin: 1em 0;
}

pre.highlight {
  padding: 1em;
}

.lineno {
  padding: .5em;
}

.gutter, .lineno {
  background-color: #CAEBF2;
}

td.code {
  padding: 1em .5em;
}
{% endhighlight %}

I'm using the [Tango](https://raw.githubusercontent.com/jwarby/jekyll-pygments-themes/master/tango.css) theme.