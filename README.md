![GitHub forks](https://img.shields.io/github/forks/sushain-gupta/Portfolio-website?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/sushain-gupta/Portfolio-website?color=%23dc2626)

# No Code Portfolio

<img src="https://user-images.githubusercontent.com/89994089/224680870-aa4d75ba-5b5e-40c2-a392-e531d2e72dd4.png" alt="Portfolio Demo Image" style="width: 30rem;">

Portfolio build now made easy! Want to make a portfolio but don't know how to code? This is for you! 

Whether you're an artist, writer, or something else entirely, a strong portfolio is often a bare minimum requirement. And you can create something top notch without writing a line of code!

<br>


**Live [demo](https://dummy-portfolioo.netlify.app/).**

[![Netlify Status](https://api.netlify.com/api/v1/badges/1815e05c-5fe8-44df-a9b4-7bd920019214/deploy-status)](https://app.netlify.com/sites/dummy-portfolioo/deploys)

<br>

## Features

- Easy setup
- Real-time database (making it easy to edit anytime, anywhere).
- No coding skill is required.
- No installation is required.
- Screen responsiveness for multiple devices.

<br>

## Tech Stack

**Client:** HTML, CSS, SCSS, JavaScript

**Server:** Firebase

<br>

## Libraries

Email JS, Animate on scroll (AOS), Toastify JS.

<br>

<h2>Setup guide</h2>

<a href="#gettingStarted">Getting started</a>

1. <a href="#beginnersGuide">Beginners guide</a>
    - <a href="#ProjectSetup">Project setup</a>
    - <a href="#firebase">Setting up your Firebase account</a>
    - <a href="#hoisting">Hoisting</a>
    - <a href="#editing">Editing</a>

2. <a href="#advancedGuide">Advanced Guide</a>
    - <a href="#note">Note</a>

3. <a href="#features">Additional Features</a>

<br>

<h2 id="gettingStarted">Getting Started</h2>

*If you already have a github account you can directly jump to the <a href="#beginnersGuide">Beginners guide</a>*

<br>

Sign up and create your GitHub account.

<img src="https://user-images.githubusercontent.com/89994089/224506275-3f32fe67-bb5c-4491-bd9b-be8b0dd3b614.png" alt="Portfolio Demo Image" style="width: 25rem;">

Once signed in, proceed to the <a href="#beginnersGuide">Beginners guide </a>.

<br>

<h2 id="beginnersGuide">Beginners Guide</h2>

<h3 id="ProjectSetup">Project setup</h3>

Step 1 - Click on the template button and create a new repository.

<img src="https://user-images.githubusercontent.com/89994089/224977560-a728eb7d-08a1-4d45-bfd1-dd76e2bf64f0.png" alt="Portfolio Demo Image" style="width: 25rem;">

<br>

Step 1.1 - Add a name to your repository --> select the option for private --> check the "Include all branches" box (as shown in the below image) and click on "Create repository".

 <img src="https://user-images.githubusercontent.com/89994089/224977247-90217c22-d671-424e-9579-688f6add364c.png" alt="Portfolio Demo Image" style="width: 25rem;">

 <br>

Step 1.2 - Download portfolio.json from the main branch.

<img src="https://user-images.githubusercontent.com/89994089/224507342-d3570511-11c4-497b-802a-f2a5a074b0f8.png" alt="Portfolio Demo Image" style="width: 25rem;">

<br>
<br>

<h3 id="firebase">Setting up your Firebase account</h3>

Step 2 - Go to Google's  [Firebase](https://firebase.google.com) website and create your account or 
Simply sign in if you already have one.

<img src="https://user-images.githubusercontent.com/89994089/224529672-d8d6922c-acfa-43da-86b5-39ae7ea1e374.png" alt="Portfolio Demo Image" style="width: 30rem;">
 
<br>

Step 2.1 - Now [Create](https://console.firebase.google.com/u/0/) a new project.
- Step 2.1.1 - Enter a name for your project.
- Step 2.1.2 - Click on "Continue".

<img src="https://user-images.githubusercontent.com/89994089/224510125-e54f9aaf-49a9-4323-a0e7-f2fa97ad1b8b.png" alt="Portfolio Demo Image" style="width: 30rem;">

<br>

Step 2.2 - Disable Google Analytics and Create a Project

<img src="https://user-images.githubusercontent.com/89994089/224528968-12e091e4-3ffe-431f-a44c-c7a993f48950.png" alt="Portfolio Demo Image" style="width: 30rem;">

<br>

Step 2.3 - Go to Build --> Realtime Database.

<img src="https://user-images.githubusercontent.com/89994089/224529135-e796ee0f-ed48-40f7-be8f-8868d610cb86.png" alt="Portfolio Demo Image" style="width: 30rem;">

<br>

Step 2.4 - Create a Database.
- 2.4.2 - Select the test mode.
- 2.4.3 - Click enable

<img src="https://user-images.githubusercontent.com/89994089/224529428-671c758e-76bf-4836-8983-e61fd3626b21.png" alt="Portfolio Demo Image" style="width: 30rem;">

<br>

Step 2.5 - Once your database is created, click on the three dots (as shown in below image), and from the menu select "import JSON" and import portfolio.json which we downloaded from github.

<img src="https://user-images.githubusercontent.com/89994089/224530729-f53453ec-2e13-4fd3-9632-bf7e8a7ad656.png" alt="Portfolio Demo Image" style="width: 30rem;">

<br>

Step 2.6 - Now copy the database URL.
- 2.6.1 - Go to the project repository we created in step 1.
- 2.6.2 - Switch the branch to minified and open the "firebaseInit.js" file.
- 2.6.3 - Edit the file and paste the database URL we copied.
- 2.6.4 - Save by clicking on "Commit" (at the bottom of the page).

<img src="https://user-images.githubusercontent.com/89994089/224533283-85b99687-c4ff-4e90-9876-47203f65fe64.png" alt="Portfolio Demo Image" style="width: 30rem;">

<br>
<br>

<h3 id="hoisting">Hoisiting (Netlify)</h3>

<video src="https://user-images.githubusercontent.com/89994089/224689250-2d3e2158-44ce-4f98-95dd-7ac3b07d92c2.mp4" style="width: 40rem;"></video>

<br>

*<p>Tip - You can also set your custom domain.</p>*

<video src="https://user-images.githubusercontent.com/89994089/224803574-4f6e000e-291e-4a15-9fec-1de20fd548d0.mp4" style="width: 40rem;"></video>

<br>

<h3 id="editing">Editing</h3>

Step 3 - Go back to Firebase, where we left.

Step 3.1 - Add the deployed url to the web url blank (firebase).

Step 3.2 - Edit all the fields accordingly.
- 3.2.1 Once you've finished editing, change the development mode to off/false, make sure to change the write rules to false and true once you want to edit again.

<video src="https://user-images.githubusercontent.com/89994089/224718822-a884e840-f733-4b23-94ed-4c17441b6237.mp4" style="width: 40rem;"></video>

<br>
<br>

<h2 id="advancedGuide">Advanced Guide</h2>

Step 1 - Download the code in the minified branch and unzip it.

Step 2 - Setup your Firebase account with a real-time database. 

(See <a href="#firebase">Setting up your firebase account</a> for details).

Step 3 - Copy the database URL and paste it in the firebaseInit.js file present in the unzipped folder.

Step 4 - Deploy the folder on your preferred hosting platform.

<br>

<h3 id="note">Note</h3>

- *There are multiple ways to run and deploy the project, but I personally felt the above steps were a bit easier to understand.*
- *For storing your images you can use [Cloudinary](https://cloudinary.com) or [Firebase storage](https://firebase.google.com/docs/storage/web/start).*

<br>

<h2 id="features">Additional Features</h2>

- Wrap the text with "**" to make the input text bold.

<img src="https://user-images.githubusercontent.com/89994089/224739503-fa00a9ba-57bd-43b5-8f8f-05476ea49853.png" alt="Portfolio Demo Image" style="width: 30rem;">

<br>

- Add "//" to go to a new line.

<img src="https://user-images.githubusercontent.com/89994089/224739484-17c2d57d-5421-43ab-8480-3294e8aaea48.png" alt="Portfolio Demo Image" style="width: 30rem;">

<br>

- Turning development mode on/true would change data dynamically, providing meaningful feedback. While in off/false, the page needs to be refreshed to get updated data.

<br>

- Keep your deployed portfolio running in parallel, so that when you add a card in either the education, projects, or experience section, a dummy template will be generated automatically for you.

<br>

- You can also add Firebase Analytics to check your portfolio's performance. [View Docs](https://support.google.com/firebase/answer/9519624?hl=en)

<br>

- For mailing services, you have to get your key and other credentionals by signing onto [EmailJS](https://www.emailjs.com). For setup guide refer [Docs](https://www.emailjs.com/docs/).

    - Once done, make sure to copy [this](https://res.cloudinary.com/dkezwrb3a/raw/upload/v1678882667/Portfolio/email-temp.txt) and paste it in your EmailJS template.

<br>
<br>

## License

[MIT](https://github.com/sushain-gupta/Portfolio-website/blob/main/LICENSE)
