---
title: Using Javascript and the DOM to Change Page Contents and Interactions
excerpt: An Introduction to the DOM and Javascript events.
---

<h2>What is the DOM?</h2>

<p>There is an easy answer: DOM stands for Document Object Model. That's great, but what does it <em>mean</em>?</p>

<p>The DOM is a way of processing (or modeling) an HTML document to make its content accessible so a programmer can use code to make changes to a page's appearance and behavior.</p>

<h3>DOM Nodes</h3>
<p>In the DOM, every bit of text in the HTML source is represented as a node. Mostly that means every HTML tag is its own node, but even the blocks of whitespace between tags are represented.</p>

<p>Each node is a data structure that contains information about the HTML it represents. That includes what type of node it is (the html tag associated with the node), its contents (everything from the &lt; of its opening tag to the &gt; of its closing tag), and a list of its <em>children.</em></p>

<h3>What Children?</h3>
<p>Think about the structure of an HTML document. With a few exceptions everything on the page is wrapped inside a tag. Many tags have other tags nested within them. The DOM uses this nesting to create a tree structure where a node can have one <strong>parent</strong>, and many <strong>children</strong>. A node's parent is the node for the tag that it's nested within. Its children are all the nodes immediately nested within it. Those nodes can have children of their own nested within. Nodes at the same level of nesting that share a parent are called <strong>siblings</strong>. Siblings appear in the DOM in the same order they appear in the document.</p>

<p>Even a tag that looks like it is on the top level of a document (like the html tag) has a parent. The DOM calls this parent node <code>document</code> and it can be used as a starting point to access the entire structure.</p>

<h2>Using the DOM in Web Programming</h2>

<h3>Navigating the DOM</h3>
<p>Now that we understand how the DOM is structured, we can talk about how we use that structure to move around and locate nodes nodes within the document. Javascript gives us a host of functions to achieve this, most fall into one of two categories that I'll call stepping functions or searching functions.</p>

<h4>Stepping Functions</h4>
<p>These functions use the tree structure to move node to node one step at a time. We can use functions to step up and down the tree&mdash;for instance, calling <code>.firstChild()</code> on a node will return the child node that appears first in the document&mdash;or sideways&mdash;using <code>.nextSibling()</code> or <code>.previousSibling()</code>.

<h4>Searching Functions</h4>
<p>Navigating a large document one step at a time can be frustrating and confusing. Luckily, Javascript gives us functions that let us search for a node in various ways. For example: calling <code>document.getElementsByTag("a")</code> will return an array of every <code>&lt;a&gt;</code> node in the document. Similarly, there are functions to search for and return nodes based on their CSS id or class properties. 

<p>These function names all tend to start with <code>.get</code>, and they don't have to be called on the <code>document</code> node. Calling a search function on a node within the document performs a search just within the contents of the node  on which it was called.</p>

<p>By combining search functions and stepping functions in varying orders we can access the nodes we need in relatively few steps, even within a large, complex document</p>

<h3>Accessing and Modifying Information from a Node</h3>
<p>Once we've located a node, Javascript gives us ways to access its properties and the information it contains and make changes to them.</p>

<p>Accessing a property of a node goes something like <code>nodename.propertyName</code>. For instance, to get the text from inside the node and its children, we can call <code>.textContent</code>. We can alter it in much the same way. Imagine we have a list of employees and we've just fired Bob and replaced him with Charlie. We can change the content Bob's list item node by assigning it a new value like this <code>liNode.textContent = "Charlie"</code>. Sorry Bob.</p>

<p>When a property can have multiple values they are managed as an array. For instance a node can have many CSS classes that it belongs to. Calling <code>.classList()</code> will return an array. That list can be modified using <code>node.classList.add("my-css-class")</code>. Removing an item works the same way.</p>

<h3>Creating and Placing New Nodes</h3>
<p>If we need to generate new content, we can do that either with <code>document.createElement()</code> or <code>document.createTextNode()</code>. After using the methods mentioned above to modify the contents of this new node, we can place it in the DOM using functions like <code>.appendChild()</code> called on the parent node of the location we'd like the new node to appear. This will add the new node after the last existing child node. If we need to be more specific in placing the new node, we can call <code>.insertBefore()</code> or <code>.insertAfter()</code>.</p>

<p>Sometimes creating new HTML structure node by node can be tedious. Javascript gives us a few alternatives. If the structure already exists within our document we can clone it by calling <code>.cloneNode</code>, alter it, and then insert it using the above methods. Alternatively, you can use the function <code>.insertAdjacentHTML()</code> to parse a text string containing HTML into the appropriate nodes and choose where to insert them all in one step.</p>

<h2>Client-Side vs. Server-Side</h2>
<p>It's important to remember to use the right tools for the job. Client-side tools can be great for interactions with the user&mdash;they tend to excel at presenting and receiving information&mdash;but they have their limitations.</p>

<h3>The DOM</h3>
<p>Javascript manipulation of the DOM all occurs client-side. That means that whatever the server has given us is what we have to work with. We can present it in  different ways, hiding and unhiding information as it becomes relevant. If we need information from the <em>user</em>, we can present them with a form process their response. If we want an answer from somewhere <em>else</em> we need other tools to  ask for it.</p>

<h3>The Server</h3>
<p>It's the job of the server and server-side tools to hand the client the information it needs, to process or store input that is passed its way, and to respond to requests for further information. The server-side can take many forms. Program logic can be handled by Ruby, PHP, even Javascript accessing and serving up data from a database or other storage format.</p>

<h2>Events, Event Handlers, and <code>window.event</code></h2>
<p>We've described how to access, modify, and add to the content of a document. Now we'll look at how to modify its behaviors.</p>

<h3>Events</h3>
<p>Events are pretty straightforward. Every time we do something on a page, it's an event. Clicking a link, scrolling the page, submitting a form, all of these things are events that have a default behavior within the browser.</p>

<h3>Event Listeners</h3>
<p>With Javascript we have the ability to listen for events that happen on the page, and run code to make something happen as a result of that event. We do this by adding event listeners to the nodes that we want to monitor. It looks like this: <code>node.addEventListener("click", someFunction)</code>. Here we're adding a listener that waits until node is clicked on, then calls our function "someFunction". We can use this ability to add functionality where it doesn't exist&mdash;like making a paragraph clickable&mdash;or to alter existing functionality.</p>

<h3><code>window.event</code></h3>
<p>While <code>document</code> represents the highest level node in an HTML document, the document has to be displayed somewhere. In the context of the DOM that is a browser window, and it can be referred to via <code>window</code>. Using <code>window</code> a developer can access information about how the page is currently being displayed on screen and, to some extent, the state of the browser displaying it.<p>

<p>One property of <code>window</code>, <code>window.event</code> is important to our use of event listeners. This is where the browser tracks real time information about a user's activities. When the mouse pointer moves across the screen, <code>windows.event</code> updates several times per second to track it. When a link is clicked, <code>windows.event</code> momentarily represents that click, at least until the mouse is moved again. When we register event listeners with <code>.addEventListener()</code>, it's <code>windows.event</code> they listen to.</p>

<p>When an event listener "hears" its event, it fires its associated function. Many times when that function goes to do its job, it's useful to know the exact circumstances that triggered the listener. It could check <code>window.event</code>, but it's unlikely the information there would still be relevant. Most likely the user will have done <em>something</em> else by the time we get around to checking. For that reason, when an event listener triggers its function, it passes a snapshot of <code>windows.event</code> taken at the moment it fired. That event snapshot can be accessed inside our function by adding a parameter to the function definition like so: <code>function somethingWasClicked(event) {}</code>.</p>

<p>Now we can use the <code>event</code> object to access the properties of the event that triggered our function call. One of the most useful consequences of this is that we can now access the node that was clicked via <code>event.target</code> and perform operations from that context.</p>
