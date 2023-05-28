# Project Report
## Deployment and URL
To deploy our application to the web, we’re using the platform Cloudflare Pages. As this project is a collaboration, we first sync our local files via git to ensure we have up-to-date files. Node.js and npm must be installed for us to begin using Cloudflare Pages via a command prompt. To minimise potential technical issues caused by version differences while redeploying from various devices, we use the latest stable releases of npm and node.js.

First, we navigate to where the project is stored locally and open a command prompt in the folder. In order to interact with Cloudflare pages, we install the `wrangler` tool to serve as a command line interface which manages it. This is done through executing the command: 
```shell
npm install wrangler
```
After successfully installing `wrangler`, in order to publish our application, we need to log in / sign up to Cloudflare Pages. The command line below will open up a new browser window, prompting login details:
```shell
npx wrangler login
```
After successfully logging in, we must create a project in our Cloudflare Pages account through the command line:
```shell
npx wrangler pages project create comp2110-group62
```
Our project name was set as `comp2110-group62` to make it distinguishable from other groups in the cohort, as it would become a part of the URL where our application would be accessed through.

To upload our application files and allow others to use it, we need to publish the project, done through the command line: 
```shell
npx wrangler pages deploy .
```
The `.` in the command line tells Cloudflare Pages to deploy the files in the current location, as we are already within the target directory. `deploy` is used here instead of the depreciated `publish` which is recommended for uploading the project files to Cloudflare Pages.
Upon deploying the website, our app files were uploaded to the platform and assigned a generated URL: `https://comp2110-group62.pages.dev/`.

We used this process to successfully deploy our project through the Cloudflare Pages platform, allowing anyone with the URL to access the application over the web. 

When making any local changes to the application, we need to redeploy our files. We had a bit of issues figuring out how to do this on different devices due to our inexperience with wrangler commands. However, we figured it out, in order to redeploy on any other device with the project files, we need to repeat some of the steps above; navigating to the project directory and opening a command prompt in it, installing `wrangler` through npm and logging in through the same command line as before. From here, we simply repeat the command line:
```shell
npx wrangler pages deploy .
```
From which a prompt will appear, to create a new project or to use an existing one;

We select the latter and select our previously named project, and the redeployment will automatically progress. We struggled with this step as we did not know how to select a project or if a normal deploy would just add files on top of the already deployed project or overwrite it. After some research, we found a thread on GitHub (https://github.com/cloudflare/workers-sdk/issues/821) addressing this, helping us figure out how to redeploy using `wrangler` commands. 

## Implementations
### CSS
In order for our project to have a consistent theme, all styles were matched up, slightly adjusted according to what each widget or section required. Originally the blog post width adjusted dynamically however, if the blog was overloaded with an extremely large amount of text, the text would overflow, pushing the right widgets out of the window. To fix this, as the blog block is called in comp2110-portal, we can use literals inside the js file to dynamically adjust it through setting width to;
```js
css `
    blog-block {
        width: ${window.innerWidth * 0.68}px;
    }
`
```

This sets the width of the blog to a fixed amount, however if the window size changes, the javascript will automatically adjust the width, fixing this issue. Originally we fixed the widgets in place on the window but it clustered the interface, so we reverted back to a static position.

### Login Process
Our group has implemented a few additional features to the provided login-widget.js the original login-widget only performed basic functionality such as logging in, however it had no error check. So to improve the functionality of the login-widget our group added a error screen which notifies the user that the login was incorrect and provides a pop up informing the user they have entered the incorrect information, additionally in connection with the blog-post implementation if the user is logged in successfully the blog post section at the bottom of the website is available.

### Blog Posts
In addition to the already provided code our group implemented the feature of posting blog posts, this was implemented through a POST request which required authentication to be received by the portal. Furthermore as mentioned in the Login Process a box was provided to show the user where to navigate to for posting blogs to the portal.

### Widgets
The widgets implemented were the currency widget, fun fact widget, weather widget, and public holiday widget all widgets allowing for the user to interact with. The currency widget allowed the user to change between 4 different currencies for accurate conversion, the fun fact widget provides different fun facts about the current date the web portal was being used on, the weather widget allowed the user to obtain the weather in the location the website was opened at using geolocation, and the public holiday widget provided all upcoming holiday from the current date to the end of the year, with an array of countries to pick from acquired through a API which provides the list of countries that can be used, which are then chosen by the user and sent to the holiday API to return the appropriate information.

## Challenges
Our group ran into various challenges in both the front-end and back-end of the project, the front-end challenged our creative side, requiring creative and new methods for a clean design. However we were able to remedy this challenge by collaborating and incorporating designs from part 1, and new features different members wanted to include creating the design that's currently seen. During the development of the application, due to others in the cohort testing the limits of the blog, large posts would break the website as it was unable to handle the amount  of characters while being dynamically resized. In order to work around this we used javascripts literals to make a static value, dynamic, where if the viewport changes size, instead of the css adjusting the width of the element, the javascript would resize the “static” blog post. Additionally the backend had its own challenges for example the POST request for submitting blog posts was especially challenging as the portal client wouldn’t recognise the login users authentication token, this was solved upon figuring out that in the header posted in the POST request the addition of 'Authorization': `Basic ${getUser().token}` forwarding the user token as required allowing for the completion of the POST request to the portal. 

## What was rewarding
The most rewarding part by far was probably seeing the result of the hard work that we put into the website finally come to fruition. This includes all the different parts of the project from the individual javascript elements to the CSS and the final deployment of the website. It was also very satisfying to see our API requests actually go through and return with information for the website. The communication in the team was also a rewarding experience in the sense that we were able to work as a well oiled machine and get the project done cohesively and efficiently, relative to us and our expectations.




## Individual Reflections
### Aleksandr Govorukhin
I initially chose to write the weather widget but then changed my mind and did the fact of the day instead. I didn't feel like doing something that has been done before many times, in the sense of how every website probably has a weather widget but not a fun fact widget. The fact that the “fun fact widget” would be easier to implement also played a role in my decision. It however wasn’t as easy as I had hoped. It had its own challenges such as getting the request url correct, as it had multiple parts or rather was longer than other url requests. As for the project as a whole, the most difficult part for me was the front end part of the widgets and the individual css part. Getting the widget to look exactly like I wanted it to proved to be more difficult than I predicted. It took me a while to come to the look which is now present in the website. I was also quite happy when my team members seemed to approve of my design and used it in their own widgets, or at least that’s how it seemed to me.As a result of this project I have gained a certain level of proficiency in Javascript and HTML which will allow me to pursue further education in this field if I choose to do so.

### Liam Webb
The widgets I chose to create were the currency widget, and the public holiday widget, both widgets presented their own challenges allowing me to develop my javascript, and HTML knowledge. I chose the currency widget as due to planning a upcoming holiday with friend later in the year I've been working with exchange rates to figure out necessary finances for the trip through this I thought it would be interesting to make my own currency converter so I can have some insight into how the converters i've been using work. Additionally the holiday widget was chosen because after completing the currency widget I wanted to challenge myself and create another, while also creating a widget that was interesting. The holiday widget was the hardest to make although I made it second which meant I had already developed the necessary skills to request from an API and present the data appropriately from the creation of the currency converting widget. The widget was challenged because I decided to challenge myself and pull from 2 API’s in the holiday widget so all available countries are shown in the select country section of the widget, meaning that the original API can display from all countries it possibly can. Overall for both widgets the most challenging part of this project was figuring out how to display the accurate data as a result of the API for example in the currency widget if the user inputs a negative values or a 0 a error message will be present while if they input a number above 0 it will display the converted value, this was tricky to figure out however upon figuring out that I can use 
const resultElement = this.shadowRoot.queryselector pulling a element from the shadow DOM allowing for the HTML to print the outcome depending on what the variable is assigned to e.g. resultElement.innerHTML = 'Error converting to ' + this.toCurrency; which printed a error.

### Mohammad Hassouneh
I chose to develop a weather widget which adjusts its information according to the location of the user (after asking for permission) so I could test my skills by attempting to integrate two separate APIs and making sure they work seamlessly together. I also wanted to produce somethind as unique and aesthetically pleasing as possible, challenging my CSS skills and my understanding of DOM’s. For example, once I completed the base weather app, I wanted to change specific parts of it after rendering the app but discovered that I could not access any classes or IDs through usual means. I had to learn how to monitor conditions AFTER the app's shadow DOM rendered through the updated() lifecycle method, and gained a massive amount of understanding on how a ShadowDOM interacts with the RealDOM. After many attempts to alter shadowDOM components through a `selectElementbyID`, I discovered that in order to target the shadowDOM, I had to use `this.shadowRoot.querySelector()`. After discovering that more issues appeared, such as when adding an `eventListener()` to the shadowDOM, it must be in the correct place unlike RealDOM `eventListener()`’s which are fairly flexible and lenient on placement. The CSS design for my widget was mostly transferred over from part 1 of this assignment, my web portal design, providing an aesthetic appearance. I attempted to incorporate a button to switch temperature units between fahrenheit and celsius to increase user friendliness, however it proved too taxing and would have required more time than it was worth to implement.
