This blog was created using Jekyll, which is a static site generator built in Ruby.

# Installation

First, install Bundler: `gem install bundler`

Then, from this repo's root folder, run `bundle install`. This will install all of the gems listed in the **Gemfile**.

That should be all of the installation needed!

# Running the Server

From this project's root folder, run `bundle exec jekyll serve`. This will run a local server with the site Jekyll builds at <http://localhost:4000>.

You should be able to run that command right now and visit <http://localhost:4000>.

# Understanding and Using Jekyll

## Directory Structure

### _includes

This folder contains HTML snippets that are meant to be re-used across your website. It's a nice place for putting chunks of code that you don't edit very often, since it keeps them out of the way in files that you _do_ edit often.

### _layouts

A layout _wraps_ each page's content. Have you found that every HTML page in your website begins and ends with the same code--that only the stuff in the middle changes? Layouts solve that repetition.

Puts the _begins-with_ and _ends-with_ code in the layout, and use `{{ content }}` to indicate where each page's content should be injected. Problem solved.

### _posts

Posts are **chronologically relevant** content. This is in contrast to, for example, your 'About' page. It is _not_ chronologically relevant--it doesn't matter on what date you made the 'About' page.

Posts are chronologically relevant, because it _does_ matter when you wrote each post. Your collection of posts (tutorials, essays, etc) is essentially a journal, where the date you wrote each entry is useful information.

#### Format

Posts are meant to be written in Markdown--hence the `.md` file extension. You _can_ write them as HTML, but it's faster to write them as Markdown (and Jekyll will convert them to HTML for you). Get in the habit of writing Markdown, as it's widely used for technical writing. Here is [a good reference for Markdown](http://commonmark.org/help/).

Note: You can also mix Markdown and HTML inside the same file, but make sure the file extension is `.md`. If you give the file a `.html` extension, mixing won't work.

#### Front Matter

Regardless of whether you write them in HTML or Markdown, **you must include "front matter" at the top of the file.**

This is what front matter looks like:

```
---
title:  "Lorem Ipsum"
---
```

Front matter defines information about the post. For now, `title` is the only information you need to define, but later on you can use front matter to store other information.

#### Filename

Regardless of whether you use the `.html` or `.md` file extension, the file _name_ must match this pattern exactly:

`yyyy-mm-dd-title-separated-by-dashes`

Some examples:

Good                                  | Bad
------------------------------------- | ---------------------------------------
2016-11-23-my-birthday.md<br>2017-02-24-snow-day-party.md<br>2013-12-31-learning-java-on-nye.md<br>2013-12-31-learning-java-on-nye.html | 2016-11-23-mybirthday.md<br>2017-2-24-snow-day-party.md<br>13-12-31-learning-java-on-nye.md<br>2013 12 31 learning java on nye.html

If you have a kind-of long post title, you can shorten it in the filename. E.g. if your post title is "Learning Java on New Years Eve", the filename could be `2013-12-31-learning-java.md` or `2013-12-31-java-nye.md` or something like that. You have some flexibility there.

### index.html, about.html, articles.html

These are your website's pages. They are automatically wrapped with the layout defined in **_layouts/default.html**. Besides that, they're pretty standard HTML pages.

Pages are _not_ chronologically relevant. That's why there's no indication of a date in their filename.

Even thought pages don't have a date, they _do_ have front matter. All content in a Jekyll site needs front matter so that Jekyll knows how to generate the actual HTML files.

### assets

Place your CSS, JavaScript, fonts, images, and other assets in this folder. You can access them in your HTML code directly--e.g. `<img src="/assets/myPhoto.jpg" />`.

### Other Files/Folders

Ignore **_site**, **.gitignore**, **Gemfile**, and any other files/folders that have not been explained.