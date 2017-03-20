---
title: Writing Your First Ruby CLI Utility
excerpt: In this tutorial we'll cover— Creating a Ruby program and running it in Terminal, Making that program run in Terminal no matter what directory you're in, and Reading from and writing to files in Ruby
---


<h2>Introduction</h2>

<p>Congratulations on taking your first steps toward learning ruby!
In this tutorial we'll cover: </p>

<ul>
	<li>Creating a Ruby program and running it in Terminal</li>
	<li>Making that program run in Terminal no matter what directory you're in</li>
	<li>Reading from and writing to files in Ruby</li>
</ul>

<p>We'll do this by creating a command line application that lets you manage a list of questions that you might have and don't want to forget. The application will let you display the list, and add and remove items. It wouldn't be much of a memory aid if the list disappeared every time the program stopped running, so we'll also make it save your list to a text file so it can access it whenever.</p>

<h2>Getting Started</h2>

<h3>Hello World</h3>

<p>First we'll cover the basics of creating and running a program in Ruby.
 One popular way of showing basic program structure for someone learning a
 new language is to show them a Hello World program.
 Hello World is a program that outputs the line of text "Hello World" to
 the console.
 Sounds simple, doesnt it? It is! </p>

 <p>In Ruby, "Hello World" looks something like this: </p>

 <pre>
 puts "Hello World"
 </pre>

 <p>Pretty straightforward, right? Here <code>puts</code> is a Ruby command
 that tells your program to write the statement that follows to the Terminal
 window.</p>

 <p>Go ahead and type or cut-and-paste that line of code into your text editor and
 save it.
 Call it <code>hw.rb</code></p>

 <h3>Running your first Ruby program</h3>

 <p>Now that you have written your first program, let's learn how to run it and see
 what happens.
 In the terminal type <code>ruby hw.rb</code> and press enter. You should see the
 words "Hello World" appear on the next line of the terminal. </p>

 <p>Congratulations! You just wrote and ran your first Ruby program</p>

 <h2>Make a program run anywhere</h2>

 <p>If our questions app is going to be useful, it should be easy to run. <code>ruby hw.rb</code> isn't too bad to type, but our program is eventually going to use command line options to add and remove questions. That could wind up looking something like: <code>ruby questions.rb add "Why do I have to keep typing all this out every time?"</code></p> Wouldn't it be better if we could just type: <code>questions add "This is nice, isn't it?"</code>

 <p>The command to execute our new program was only one line, but there are a couple of things happening behind the scenes when you hit enter.</p>

 <h3>Tell your shell what to use to run your program</h3>

 <p>Right now we're typing <code>ruby</code> each time we run our program. That explicity tells our shell that we want to use the ruby interpreter to run our code. The ruby interpreter sees the <code>.rb</code> part of the file name and knows that this is a file it can run. If we're going to get the shell to figure things out on its own it's going to need a hint.</p>

 <p>We can give the shell the hint it needs by adding the following to the beginning of our code: </p>

 <pre>
 	#!/usr/bin/env ruby
 </pre>

 <p>This line tells your shell to use ruby to run the code in this file, and where to find the ruby interpreter. That will let us skip typing <code>ruby</code> every time, and we can now rename our file to remove the <code>.rb</code> as well.</p>

 <h3>Tell your filesystem that it's okay to run the program</h3>

 <p>With that done you might think you're all set, but our file will need permission from the file system in order to run. New files in a unix-like file system don't have this permission, so we'll have to set it like this: </p>

 <pre>
 chmod u+x questions
 </pre>

 <p>This line tells your shell to modify the permissions for questions. The <code>u+x</code> part says to "+" add the e"x"ecute permision for "u"sers.

 <h3>Tell your shell where to find your program</h3>

 <p>Whenever you try to execute a command in the shell it looks through a list of locations for the program name you entered.</p>

=>

 <h2>Next steps in Ruby</h2>

 <h3>Variables</h3>

 <p>In much the same way you learned in Algebra class how to use letters like "x" and "y" as placeholders for numbers in mathematical operations, Ruby lets us define variables to use as placeholders in our <em>code</em>. The biggest difference is that, with Ruby, variables can hold amost <em>any kind</em> of information.</p>

 <p>You can create a new variable, or change the value of an existing one by writing <code>some_variable = "some_value"</code>. In this case we created/assigned a variable named some_value and assigned it a String (most items in Ruby with quotation marks around them are Strings).

 <h3>Data Types and Operations</h3>

 <p>What is a, "kind of information?" Take a second to think about it. It might help to ask yourself: </p>

 <ul>
	 <li>What do all words have in common?</li>
	 <li>All numbers?</li>
	 <li>What is the difference between a number and a word?</li>
 </ul>

 <p>Don't worry. These are things we grow up having an innate sense for, so it can be hard to quickly come up with an explanation. There is probably more to it, but the important takeaways for <em>our</em> purposes are: </p>

<ol>
	<li>Every kind of information or, "Data Type" in programmer-speak has a value</li>
	<li>A Data Type has a set of actions or, "Operations" help us do things we normally need to do to manipulate that value</li>
</ol>

<p>It's probably starting to make some sense now, but an easy way to solidify things might be to take a look at some common Data Types and the Operations that Ruby (and most other languages) give us to use the information they store productively.</p>

<table>
	<tr>
		<th>Data Type</th>
	    <th>Stores</th>
	    <th>Common Operations</th>
	</tr>
	<tr>
	    <td>String</td>
	    <td>Words and characters</td>
	    <td>make uppercase/lowercase</td>
	</tr>
	<tr>
	    <td>Integer</td>
	    <td>Whole numbers</td>
	    <td>Mathematical operations like +,-,*,/</td>
	</tr>
	<tr>
	    <td>Float</td>
	    <td>Numbers with decimal points</td>
		<td>+, -, *, /, round</td>
	</tr>
	<tr>
	    <td>Array</td>
	    <td>A list of things</td>
		<td>add/remove items</td>
	</tr>

</table>

<p>An individual example of a Data Type is called an, "Instance." In other words, the whole number <code>123</code> is an instance of the Integer type.

<h3>Functions</h3>

<p>When we try to solve most tasks we can usually identify certain sets of steps that
get repeated. Maybe we're unloading the dishwasher. For every item you unload you might pick it up, wipe any moisture off of it, and place it in the appropriate cupboard or cabinet. If you were writing a program to unload a dishwasher that holds 50 items you could type those three steps 50 times, or you could call the process something like, "unload an item" and cut your typing by 2/3rds.</p>

<p>That shortening process is like a programmer writing a function, and we can save ourselves a lot of work that way. Here's an example of a Ruby function: </p>

<pre>
def add(newQuestion)
  @questionList.push(newQuestion)
  write_to_file
end
</pre>

<p>Don't worry if that looks confusing for now. We'll break it down line-by-line in a bit.</p>

<h3>Loops</h3>
<p>Functions are nice, but we want to be extra lazy. Loops let us do the equivalent of saying, "unload an item 50 times," most of the time Ruby can do even better and let us say something closer to, "unload an item until there aren't any left."<p>

<p>Here's what that second type of loop might look like in Ruby: </p>

<pre>
for question in @questionList
  question = question.chomp
  f.puts question
end
</pre>

<p>Again, don't sweat it if you don't get it.</p>

<h3>Conditionals</h3>

<p>There's one more thing we might might need if we're going to unload the dishwasher efficiently <em>and</em> correctly. We have to be able to decide where to put each item, right? When we do it we might think to ourselves, "If I grab a bowl I'll put it in the bowl cupboard." Programmers do this with something called, "Conditionals."</p>

<p>Probably the most common conditional in Ruby and most other languages is the If statement. Here's an example: </p>

<pre>
if name == "Frank"
  puts "Frank's not here"
end
</pre>

<p>One thing to notice is the "==". That's not a typo. When we assign values to a variable we use "=" but if we want to check if two things are equal we use "==".</p>

<p>You might have guessed from the name that <code>@questionList</code> is an Array. In this case an array of Strings. That's right, the items that make up an Array's list are instances of various Data Types.</p>
