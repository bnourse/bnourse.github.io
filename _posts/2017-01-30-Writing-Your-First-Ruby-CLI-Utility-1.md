---
title: Writing Your First Ruby CLI Utility—Part 1
excerpt: Create a command line application that lets you manage a list of questions that you don't want to forget to ask. The application will let you display your list, and add and remove items. Then, since it wouldn't be much of a memory aid if the list disappeared every time the program stopped running, we'll save the list to a text file so we  can modify it whenever. In Part 1, we create a simple Ruby program and go through the steps to make it runnable from any directory on your system. 
---

## Introduction

This tutorial assumes you have Ruby installed and working in OS X (though these instructions would most likely work in Linux, and if you're really lucky maybe even Windows 10's Linux subsystem). If you're not quite there yet, try these things first: 

* [Go Rails setup Instructions](https://gorails.com/setup/). We don't need Rails itself installed for what we're doing here, so following up to and including "Configuring Git" will be enough. That said, it won't hurt anything to go ahead and install Rails if you intend to use it later.
* Get a developer friendly text editor like [Sublime Text](https://www.sublimetext.com/3) or [Atom](https://atom.io/).

In this tutorial we'll cover:

* Creating a Ruby program and running it in Terminal
* Making that program run in Terminal no matter what directory you're in
* Reading from and writing to files in Ruby

We'll do this by creating a command line application that lets you manage a list of questions that you don't want to forget. The application will let you display your list, and add and remove items. Then, since it wouldn't be much of a memory aid if the list disappeared every time the program stopped running, we'll save the list to a text file so we can read and modify it whenever.

## Getting Started

### Hello World

In Ruby, "Hello World" looks something like this: 

``` ruby
puts "Hello World"
```

Pretty straightforward, right? Here `puts` is a Ruby command that writes the statement that follows to the Terminal window.

Go ahead and type or cut-and-paste that line of code into your text editor and save it. Call it `questions.rb`.

### Running Your First Ruby Program

Now that you have written your first program, let's learn how to run it and see what happens. In the terminal from the directory holding your file type `ruby questions.rb` and press enter. You should see the words "Hello World" appear on the next line of the terminal. 

Congratulations! You just wrote and ran your first Ruby program.

## Make It Run Anywhere

Right now we're just saying hello, but if your questions utility is going to be useful, it should be easy to run. While `ruby questions.rb` isn't too bad to type, we are eventually going to use command line options to add and remove questions. That could wind up looking something like: `ruby questions.rb add "Why do I have to keep typing all this out every time?"`

Wouldn't it be better if we could just type: `questions add "This is nice, isn't it?"` from any directory and have things just work?

While the command to execute your new program was only one line, there are a couple of things happening behind the scenes when you hit enter:

* Our plain-text Ruby file isn't something the computer can understand directly, it needs a way to interpret what we wrote and it knows how to do that because we told it to by starting our command with `ruby`. Since we don't _want_ to type out `ruby` every time we'll have to figure out a different way to pass on this information.
* `ruby` is set up as an executable file. Our new program doesn't start out with those privileges so we'll need to set them so the file system knows it's okay to run. 
* The computer has to find `ruby`. The setup to do that was already taken care of for us, but since we're writing our _own_ program to call in its place, we'll have to do the setup ourselves this time.

### Tell the Computer How to Interpret the Program

Right now we're typing `ruby` each time we run the program. That explicitly tells the operating system that we want to use the ruby interpreter to run our code. The ruby interpreter sees the `.rb` part of the file name and knows that this is a file it can run. If we're going to get the OS to figure these things out on its own it's going to need some help.

We can give it the hint it needs by adding `#!/usr/bin/env ruby` to the beginning of the code so it looks something like:

``` ruby
#!/usr/bin/env ruby

puts "Hello World"

```
 
This line tells your computer to use ruby to run the code in this file, and where to find the ruby interpreter. That will let us skip typing `ruby` every time. We can now rename our file to remove the `.rb` as well, since that was mostly necessary to assure the ruby command line that we were passing it something it could use. You can do so by typing `mv questions.rb questions`. That is: move the file questions.rb to a file called questions.

If you want to learn more about exactly what's going on, check out the [Wikipedia entry on #!](https://en.wikipedia.org/wiki/Shebang_(Unix))

### Tell Your Computer Where to Find the Program 

Whenever you try to execute a command at the command line, your computer searches through a list of locations for the command you entered.

In Unix-like systems this list is stored in something called an [environment variable](https://en.wikipedia.org/wiki/Environment_variable). Environment variables store information that help programs be aware of properties of the operating and file systems that they may need to execute. The variable that stores the locations of executable programs is called `PATH`. If we want to be able to call the questions app without specifying its exact location every time (which would wind up looking something like `~/code/questions/questions`) we need to either add its location to the `PATH`, or move it somewhere that is already in the `PATH`.

In reality, neither of those options are very attractive. Having to add a new entry to the `PATH` every time we write a new utility seems like a lot of work, and our shell's tab-completion function relies on the `PATH` too. Add enough clutter and eventually it may slow things down enough to be noticeable. Eventually we'd also like to use git to manage our projects, and doing that when they're located in a system directory would be a nightmare. Instead we'll leave our project where it is and add a link to it somewhere the `PATH` will find it. 

Run the following in your terminal while you're in the directory that contains the program:
``` bash
ln -s $PWD/questions /usr/local/bin/
```
Here, `ln -s` creates a [link](https://en.wikipedia.org/wiki/Symbolic_link#POSIX_and_Unix-like_operating_systems). `$PWD` expands to the full path of the current directory. `/usr/local/bin` is the most appropriate folder that is in most default `PATH`s to put our own stuff.

Two more things that may now make sense now, that we glossed over or ignored before:

1. By now you've probably used `~` at the command line to refer to your home directory. The tilde character is a shortcut for an environment variable called `HOME`. You can see this by typing `echo $HOME` at the command line.
2. In the line `#!/usr/bin/env ruby`, we're actually calling the program `env` with the argument `ruby`. `env` searches `PATH` for the first occurrence of ruby. We could have hard coded a location for the ruby executable, but this helps make our program more portable.

### Tell the Filesystem It's Okay to Run the Program

With that done you might think you're all set, but our file will need permission from the file system in order to run. New files in a unix-like file system don't have this permission by default, so we'll have to set it like this:

``` bash
chmod u+x questions
```

This line tells your shell to modify the permissions for questions. The `u+x` part says to "+" add the e"x"ecute permision for "u"sers.

### Try It Out!

First, try typing `questions` in terminal and see what happens. You should get our old friend "Hello World". If that worked, move someplace different and try again. If it worked then congrats! You have made your first command line utility, though "utility" is probably being generous at this stage.

## Make It Do Something Interesting

To keep building on our foundation and make something that might actually be useful and live up to the name, "utility", check out [Part 2]({{ site.baseurl }}{% post_url 2017-01-31-Writing-Your-First-Ruby-CLI-Utility-2 %}).

