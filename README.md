
# No Code Portfolio

<img src="https://user-images.githubusercontent.com/89994089/224680870-aa4d75ba-5b5e-40c2-a392-e531d2e72dd4.png" alt="Portfolio Demo Image" style="width: 30rem;">

Portfolio build now made easy! Want to make a portfolio but don't how to code? This is for you! 

Whether you're an artist, writer or something else entirely, a strong portfolio is often a bare minimum requirement. And you can create something top notch without writing a line of code.



**Live [demo](https://superb-dragon-bbbf4e.netlify.app).**

<br>

## Features

- Easy setup
- Realtime database (making it easy to edit anytime anywhere)
- No coding skill required
- No installation required
- Screen responsive for multiple devices

<br>

## Tech Stack

**Client:** HTML, CSS, SCSS, JavaScript

**Server:** Firebase

<br>

## Libraries

Animate on scroll (AOS), Toastify.Js.

<br>

<h2>Setup guide</h2>

<a href="#gettingStarted">Getting started</a>

1. <a href="#beginnersGuide">Beginners guide</a>

    - <a href="#ProjectSetup">Project setup</a>
    - <a href="#firebase">Setting up your firebase account</a>
    - <a href="#hoisting">Hoisting</a>
    - <a href="#editing">Editing</a>

2. <a href="#advancedGuide">Advanced Guide</a>
    - <a href="#note">Note</a>

3. <a href="#features">Additional Firebase Features</a>

<br>

<h2 id="gettingStarted">Getting Started</h2>

*If you already have a github account you can directly jump to the <a href="beginnersGuide">Beginners guide</a>*

<br>

Sign up and create your github account.
 
<img src="https://user-images.githubusercontent.com/89994089/224506275-3f32fe67-bb5c-4491-bd9b-be8b0dd3b614.png" alt="Portfolio Demo Image" style="width: 25rem;">

Once you are signed in, folllow the <a href="beginnersGuide">Beginners guide</a>.

<br>

<h2 id="beginnersGuide">Beginners Guide</h2>

<h3 id="ProjectSetup">Project setup</h3>

Step 1 - Fork the project to your github account.

<img src="https://user-images.githubusercontent.com/89994089/224504308-4cb3dfd0-b13f-4127-a115-8d696c967f11.jpg" alt="Portfolio Demo Image" style="width: 25rem;">

<br>

Step 1.1 - Make sure to copy all the branches by ḍeselecting the option "Copy only main branch" (as shown in the below image) and create fork.

 <img src="https://user-images.githubusercontent.com/89994089/224504874-713fbfca-2c5a-4d66-a213-eb0bf7530bba.png" alt="Portfolio Demo Image" style="width: 25rem;">

 <br>

Step 1.2 - Download portfolio.json from the main branch.

<img src="https://user-images.githubusercontent.com/89994089/224507342-d3570511-11c4-497b-802a-f2a5a074b0f8.png" alt="Portfolio Demo Image" style="width: 25rem;">

<br>
<br>

<h3 id="firebase">Setting up your Firebase account</h3>

Step 2 - Go to google's  [Firebase](https://firebase.google.com) website and create your account or 
simply sign in if you already have one.

<img src="https://user-images.githubusercontent.com/89994089/224529672-d8d6922c-acfa-43da-86b5-39ae7ea1e374.png" alt="Portfolio Demo Image" style="width: 30rem;">
 
<br>

Step 2.1 - Now [Create](https://console.firebase.google.com/u/0/) a new project.
- Step 2.1.1 - Enter a name for your project.
- Step 2.1.2 - click on continue.

<img src="https://user-images.githubusercontent.com/89994089/224510125-e54f9aaf-49a9-4323-a0e7-f2fa97ad1b8b.png" alt="Portfolio Demo Image" style="width: 30rem;">

<br>

Step 2.2 - Disable google analytics and Create project.

<img src="https://user-images.githubusercontent.com/89994089/224528968-12e091e4-3ffe-431f-a44c-c7a993f48950.png" alt="Portfolio Demo Image" style="width: 30rem;">

<br>

Step 2.3 - Go to Build --> Realtime Database.

<img src="https://user-images.githubusercontent.com/89994089/224529135-e796ee0f-ed48-40f7-be8f-8868d610cb86.png" alt="Portfolio Demo Image" style="width: 30rem;">

<br>

Step 2.4 - Create Database.
- 2.4.2 - Select the Test mode.
- 2.4.3 - Click enable

<img src="https://user-images.githubusercontent.com/89994089/224529428-671c758e-76bf-4836-8983-e61fd3626b21.png" alt="Portfolio Demo Image" style="width: 30rem;">

<br>

Step 2.5 - Once your database is created, click on the three dots (as shown in below image), from the the menu select "import JSON" and import portfolio.json which we download from github.

<img src="https://user-images.githubusercontent.com/89994089/224530729-f53453ec-2e13-4fd3-9632-bf7e8a7ad656.png" alt="Portfolio Demo Image" style="width: 30rem;">

<br>

Step 2.6 - Now copy the database url
- 2.6.1 - Go to the project repository we forked in step 1.
- 2.6.2 - Switch branch to minified and open "firebaseInit.js" file.
- 2.6.3 - Edit the file and paste the database url we copied.
- 2.6.4 - Save by clicking on commit (at the bottom of the page).

<img src="https://user-images.githubusercontent.com/89994089/224533283-85b99687-c4ff-4e90-9876-47203f65fe64.png" alt="Portfolio Demo Image" style="width: 30rem;">

<br>
<br>

<h3 id="hoisting">Hoisiting (Netlify)</h3>

<video src="https://user-images.githubusercontent.com/89994089/224689250-2d3e2158-44ce-4f98-95dd-7ac3b07d92c2.mp4" style="width: 40rem;"></video>

<br>

<h3 id="editing">Editing</h3>

Step 3 - Go back to firebase where we left.

Step 3.1 - Add the deployed url in web url (firebase).

Step 3.2 - Edit all the fields accordingly
- 3.2.1 Once done editing, change the development mode to off/false and make sure to change write rules to false after done editing and viceversa.

<video src="https://user-images.githubusercontent.com/89994089/224718822-a884e840-f733-4b23-94ed-4c17441b6237.mp4" style="width: 40rem;"></video>

<br>
<br>

<h2 id="advancedGuide">Advanced Guide</h2>

Step 1 - Download the code in minified branch and unzip it.

Step 2 - Setup your firebase account with realtime database. 

(steps given in <a href="#firebase">Setting up your firebase account</a>).

Step 3 - Copy the database url and paste it in the firebaseInit.js file present in the unziped folder.

Step 4 - Deploy the folder on your prefered hoisiting platform.

<br>

<h3 id="note">Note</h3>

*There are multiple ways to run and deploy the project out of which I personally felt the above steps a bit more easier.*

<br>

<h2 id="features">Additional Firebase Features</h2>

- Wrap the text with "**" to make the input text bold.

<img src="https://user-images.githubusercontent.com/89994089/224739503-fa00a9ba-57bd-43b5-8f8f-05476ea49853.png" alt="Portfolio Demo Image" style="width: 30rem;  margin-left: 3rem;">

<br>

- Add "//" to go to a new line.

<img src="https://user-images.githubusercontent.com/89994089/224739484-17c2d57d-5421-43ab-8480-3294e8aaea48.png" alt="Portfolio Demo Image" style="width: 30rem; margin-left: 3rem;">

<br>

- Turning development mode to on/true would chnage data dynamically on change time providing meaningful feedbacks. While in off/false, the page needs to be refreshed to get updated data.

<br>

- Keep your deployed portfolio running parallelly which when you add a card in either education, projects or experience section, a dummy template will be genrated automatically for you.

<br>

- You can also add firebase analytics to check your portfolio's perfomace. [View Docs](https://support.google.com/firebase/answer/9519624?hl=en)

<br>
<br>

## License

[MIT](https://github.com/sushain-gupta/Portfolio-website/blob/main/LICENSE)

