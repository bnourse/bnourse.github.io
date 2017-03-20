---
title: Writing Your First Ruby CLI Utility—Part 2
excerpt: Create a command line application that lets you manage a list of questions that you don't want to forget to ask. The application will let you display your list, and add and remove items. Then, since it wouldn't be much of a memory aid if the list disappeared every time the program stopped running, we'll save the list to a text file so we  can modify it whenever. In Part 2, we implement the program's features. 
---


## Continuing to Question
In [Part 1]({{ site.baseurl }}{% post_url 2017-01-30-Writing-Your-First-Ruby-CLI-Utility-1 %}) we set up a new Ruby program and made it easily executable from anywhere on our system. Now lets make it do something useful.


## Defining How It Works

Before we start making things work, we need to define exactly how they _should_ work. Lets go ahead and write out how our program should be used:

* `questions` - Display a numbered list of the existing questions
* `questions add "A new question"` - Add "A new question" to the list of questions
* `questions rm 1` - Remove question number 1
* `questions anythingelse` - Display usage instructions


## Arguments

Looking at the usage that we've defined, it's clear that we're going to need to take input from the user on the command line.

When you run a command from the command line, often it takes the form of `command thing1 thing2`. For instance `mv ./this_file /to/here/`. The term for the "things" in this example is a command line "argument". If a command is usually a verb, the arguments are usually the nouns we want the command to act on.

Ruby gives us a way to access these user-supplied values by placing them in a special variable called `ARGV`. `ARGV` is an Array. In the simplest terms, an Array is a list. An item's position in the list is called its "index". In Ruby, as in most programming languages, the first item in an Array is at index 0. You can access an item from an Array with: `arrayname[index]`. If you'd like to learn more about Arrays in ruby check out this [article at SitePoint](https://www.sitepoint.com/guide-ruby-collections-part-arrays/).

To put this into terms of our program, that means when a user runs `questions`, the first argument, `ARGV[0]` will either be empty or contain the command they would like to run. The second argument `ARGV[1]` will, likewise, either be empty or contain the target of the command.

With this bit of preface, we can finally start to implement a framework.

## Controlling the Flow

Looking at our proposed usage, it seems like the first thing the program needs to know to determine before it can decide further steps to take the selected command.

``` ruby  
#!/usr/bin/env ruby

command = ARGV[0]

case command
when nil
  # Show the list of questions
when "add"
  # Add a new question
when "rm"
  # Remove question number ?
else
  # Display the usage information
end
```