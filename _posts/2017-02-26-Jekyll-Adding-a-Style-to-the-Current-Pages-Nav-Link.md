---
title: Jekyll—Adding a Style to the Current Page's Navigation Link
summaryimg: jekyll.png
---

We can use Jekyll's [Liquid templating language](https://shopify.github.io/liquid/) to help us generate a the list items for our site navigation. We'll look at how, then expand our solution to add a CSS class with custom styling for the page we're currently on.

Jekyll conceptually separates a site's content into two categories. Posts—blog entries or articles with an associated date, and Pages—content that isn't date-based, like a homepage or article index.

For the purposes of navigation, it's common to include links to our Pages (or at least a subset of them), and leave navigating to individual blog posts to other methods (like the aforementioned article index). Let's look at an approach to programmatically generating a navigation list:

{% highlight html linenos %}
{% raw %}
<ul class="nav-list">
  {% for the_page in site.pages %}
    {% if the_page.title %}
      <li><a href="{{ the_page.url }}">{{ the_page.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>
{% endraw %}
{% endhighlight %}

{% highlight html linenos %}
{% raw %}
<ul class="nav-list">
{% for the_page in site.pages %}
  {% if the_page.title %}
    {% assign current = nil %}
    {% if page.title %}
      {% if page.title == the_page.title %}
        {% assign current = 'current' %}
      {% endif %}
    {% endif %}
    <li><a class="{{current}}" href="{{ the_page.url }}">{{ the_page.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>
{% endraw %}
{% endhighlight %}


`asfdsfas`


asdfasdf