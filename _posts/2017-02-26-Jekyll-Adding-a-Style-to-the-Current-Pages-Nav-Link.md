---
title: Jekyll—Adding a Style to the Current Page's Navigation Link
---

Intro paragraph

{% highlight html linenos %}
{% raw %}
<ul class = "nav-list">
{% for the_page in site.pages %}
  {% if the_page.title %}
    {% assign current = nil %}
    {% if page.title %}
      {% if page.title == the_page.title %}
        {% assign current = 'current' %}
      {% endif %}
    {% endif %}
    <li><a class = "{{current}}" href="{{ the_page.url }}">{{ the_page.title }}</a></li>
  {% endif %}
{% endfor %}
</ul>
{% endraw %}
{% endhighlight %}


`asfdsfas`


asdfasdf