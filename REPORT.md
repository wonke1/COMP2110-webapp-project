Details of your deployment and where your application can be accessed (URL).



What you achieved: a short (few paragraphs) description of what your group has implemented; highlight any extensions or additional work you did.



What did you find challenging: tell us what was hard about completing the project. This might be technical (understanding the API) or organisational (communication within the group). 



What was rewarding: one or two things that you were able to do that you feel contributed to your understanding of the content of this unit.



Individual reflection: each team member should write one paragraph on their personal experience (include your name):
        which widget did you choose and why?

        what was the most challenging part of the project for you?

        Aleksandr Govorukhin
            I initially chose to write the weather widget but then changed my mind and did the fact of the day instead. I didn't feel like doing something that has been done be# Project Report
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


### Login Process

### Blog Posts


### Widgets


## Challenges


## What we learnt

## Individual Reflections
### Aleksandr Govorukhin
I initially chose to write the weather widget but then changed my mind and did the fact of the day instead. I didn't feel like doing something that has been done before many times, in the sense of how every website probably has a weather widget but not a fun fact widget. The fact that the fun fact widget would be easier to implement also played a role in my decision. As for the project, the most difficult part for me was

### Liam Webb

### Mohammad Hassouneh
I chose to develop a weather widget which adjusts its information according to the location of the user (after asking for permission) so I could test my skills by attempting to integrate two separate APIs and making sure they work seamlessly together. I also wanted to produce something as unique and aesthetically pleasing as possible, challenging my CSS skills and my understanding of DOM’s. For example, once I completed the base weather app, I wanted to change specific parts of it after rendering the app but discovered that I could not access any classes or IDs through usual means. I had to learn how to monitor conditions AFTER the app's shadow DOM rendered through the updated() lifecycle method, and gained a massive amount of understanding on how a ShadowDOM interacts with the RealDOM. After many attempts to alter shadowDOM components through a `selectElementbyID`, I discovered that in order to target the shadowDOM, I had to use `this.shadowRoot.querySelector()`. After discovering that more issues appeared, such as when adding an `eventListener()` to the shadowDOM, it must be in the correct place unlike RealDOM `eventListener()`’s which are fairly flexible and lenient on placement. The CSS design for my widget was mostly transferred over from part 1 of this assignment, my web portal design, providing an aesthetic appearance.
fore many times, 
            in the sense of how every website probably has a weather widget but not a fun fact widget. The fact that the fun fact widget would be easier to implement also played a role in my decision. As for the project, the most difficult part for me was
