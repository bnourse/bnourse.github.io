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

Looking at our proposed usage, it quickly becomes clear that the main thing our program needs to know to determine what to do next is the command being passed in from the command line.

Let's look at what getting that information and making a decision looks like in Ruby:

{% highlight ruby linenos %}
#!/usr/bin/env ruby

command = ARGV[0]

case command
when nil
  # Display the list of questions
when "add"
  # Add a new question
when "rm"
  # Remove question number ?
else
  # Display the usage information
end
{% endhighlight %}

Line 3 assigns the first argument from the command line to a variable with a more descriptive name. It will help make the code more readable. 

There are a couple of different structures we could choose to handle this decision, but a [case statement](http://www.skorks.com/2009/08/how-a-ruby-case-statement-works-and-what-you-can-do-with-it/) is perfect for this situation.

In some languages if there were nothing on the command line then `ARGV[0]` would not exist and there would be an error when the program runs. In Ruby, referring to an Array index that doesn't exist returns `nil`. Line 6 handles this condition. When the command line is empty, we know we need to show the list. For now we just throw an comment in there.

Lines 8 through 11 are pretty self-explanatory. Line 12 handles the case where the user types something other than one of our expected commands.

From here we just need to change each of those comments into actual code. That may seem daunting, but breaking it down into the bullet points provided by our comments will help to make the problem more approachable.

## Methods

What did I mean just now by breaking it down? Of course I meant conceptually breaking it down into smaller chunks that are more easy to grasp and explain, but it's best to extend that idea into the code itself by turning each task into its own method. 

Methods in ruby look like this:
{% highlight ruby linenos %}
def method_name(argument)
  # Do something
end
{% endhighlight %}

You can have a function handle as many arguments as you'd like, but if you get too many it's a good indication that you are trying to do too much in one spot.

Methods: 
* Make code more readable—if we name our display function `display_list` then it reads _almost_ as clearly as the placeholder comment we left earlier.
* Make code reusable—if there is a task that you know you will have to repeat, it's more useful to write a function name than to re-type or cut and paste it over and over.
* Make code easier to fix—if you have re-used code and copy/pasted it all over what happens if you need to change how it works? Worse, what if there's a bug?

## Showing the List

Let's take it from the top and tackle displaying the list on the terminal. We have already seen the `puts` command so the actual display part should be easy, but how do we read the list from our file storage? 

{% highlight ruby linenos %}
$question_list = File.readlines("/Users/your_username/questions.txt")

def display_list
  $question_list.each_with_index do |question, index|
    questionNumber = index + 1
    puts "#{questionNumber}. #{$question_list[index]}"
  end
end
{% endhighlight %}

`File.readlines` in line 1 takes the file path that it is given and turns the contents of that file into an Array where each line is its own item in the list. 

If we try to run that line when the file doesn't exist, Ruby will give an error, so let's go ahead and create it with `touch /Users/your_username/questions.txt`. Make sure you substitute your own username for where it says `your_username` in both the touch command and the program listing.

Next we'll do the actual work of showing the list on screen. We define a function called display_list with no arguments. Next we need to step through every item in `$question_list and` write it to the screen with a corresponding question number.

Line 4 can be summarized as: For every item in `$question_list` make a temporary variable called `question` that contains the item and a temporary variable called `index` that contains its position in the list, then do the following steps. 

Remember, internally the list starts at zero and counts up from there, but that's not how most (non-programmer) users are going to think about it, so in line 5 we add 1 to `index` to get a human-friendly number.

Line 6 is mostly familiar, but it uses something called String interpolation to show the variables on screen. [Here's a good introduction to the concept.](http://ruby-for-beginners.rubymonstas.org/bonus/string_interpolation.html).

## Adding a New Question

Next lets look at adding a new question to the list. 

{% highlight ruby linenos %}
def add_question
  newQuestion = ARGV[1] 
  $questionList.push(newQuestion)
  write_to_file
end
{% endhighlight %}

First, get the question from the command line in much the same way we got the chosen command. This intermediate step isn't really necessary, but it makes the purpose of line 3 even more clear. The only new thing to understand is that `.push` tacks a new item onto the list Array.

Now we have the modified list, but it only exists in memory. It will disappear as soon as our program finishes. We need to write it to disk. We _could_ just throw a comment here and take care of it later, but we'll need to write to our file when we write the delete functionality next _anyway_ so let's just get to it. 

{% highlight ruby linenos %}
def write_to_file
  open("/Users/bnourse/questions.txt", 'w') do |file|
    $question_list.each do |question|
      question = question.chomp
      file.puts question
    end
  end
end 
{% endhighlight %}

It may not surprise you that `open` opens a file. The `'w'` says to open in write mode and then creates a variable called file that we can use to perform operations. A **warning**: Write mode overwrites a file from scratch, anything that's already there will be gone. That doesn't matter for us right now because we have the whole list in memory already, but you could (and maybe should) rewrite this later to use 'a' for append to just add a new line to the existing file when adding a question.

The loop in line 3 should look familiar. In this case we don't have any use for the index, so we go with the shorter `.each` and likewise don't have to include a name for a variable to temporarily hold each index.

Since the @question_list was created with lines from the file, right now each item in the list has a newline at the end of it. Our input from the command line might not, however. We need them to be consistent, so we take the approach of stripping all of them (if they exist) with `.chomp`.

We already know what `puts` does, it writes lines to the terminal with a newline. Calling `file.puts` does the same, it just writes to the file instead.

## Removing a Question

{% highlight ruby linenos %}
def remove_question
  questionNumber = ARGV[1]
  questionIndex = questionNumber.to_i - 1
  $questionList.delete_at(questionIndex)
  write_to_file
end
{% endhighlight %}

Our display function converts a question's index into a more friendly format for display, the input from the command line is going to correspond to that number, but to make it equal the index that Ruby understands we subtract 1 from the input in line 3. There is one extra step that you might not have seen before. To us the number 3, the word "three" and the character that we use to represent the number are easily interchangeable. Ruby needs us to be explicit. It can subtract 1 from a number, it can't subtract 1 from a word. The `to_i`, which is short for "to integer" makes sure Ruby treats 3 as a number and not a word.

Once that step is taken care of, removing a question from the list is as simple as using `delete_at(index)` to remove a specific item.

Since we've already written `write_to_file` this part becomes a perfect example of writing functions to make re-usable code.

## Displaying Program Usage

It doesn't get much more straightforward than this. We already know how to display lines in the terminal, and we know exactly what we need to show. 

{% highlight ruby linenos %}
def show_usage
  puts "questions - Display a numbered list of the existing questions"
  puts "questions add 'A new question' - Add 'A new question' to the list of questions"
  puts "questions rm 1 - Remove question number 1"
  puts "questions anythingelse - Display usage instructions"
end
{% endhighlight %}

And with that, we're done! Let's look at the whole thing put together.

## Full Listing

{% highlight ruby linenos %}
#!/usr/bin/env ruby

$question_list = File.readlines("/Users/your_username/questions.txt")
command = ARGV[0]

def display_list
  for i in 0..$question_list.length-1
    questionNumber = i + 1
    puts "#{questionNumber}. #{$question_list[i]}"
  end
end

def add_question
  newQuestion = ARGV[1] 
  $question_list.push(newQuestion)
  write_to_file
end

def remove_question
  questionNumber = ARGV[1]
  questionIndex = questionNumber.to_i - 1
  $question_list.delete_at(questionIndex)
  write_to_file
end

def write_to_file
  open(QUESTIONFILE, 'w') do |f|
    for question in $question_list
      question = question.chomp
      f.puts question
    end
  end
end 

def show_usage
  puts "questions - Display a numbered list of the existing questions"
  puts "questions add 'A new question' - Add 'A new question' to the list of questions"
  puts "questions rm 1 - Remove question number 1"
  puts "questions anythingelse - Display usage instructions"
end

case command
when nil
  display_list
when "add"
  add_question
when "rm"
  remove_question
else
  show_usage
end
{% endhighlight %}

## Next Steps

Combining the basic ideas presented here:

1. Taking input from the command line
2. Doing something with that input
3. Using a text file to store data between program executions

There are all sorts of small, but potentially useful utilities you could create.

You could also take the opportunity to make this code more robust. Remember how we had to create `questions.txt` ourselves? Can you make it smart enough to avoid the error and/or handle the file creation itself?

Beyond that, this program can act as a springboard to more advanced techniques in Ruby and coding in general. 

