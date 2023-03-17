// defining WebUrl (Live url to portfolio)
ref.child("(WebUrl)").on("value", (url) => {
  WebUrl = url.val() ?? "";
});

/*-------------------------------------------
              ABOUT USER
---------------------------------------------*/

// This event is triggered once and then again every time any change is done to the specified path.
ref.child("About").on("value", (snapshot) => {
  const About = Object(snapshot.val());

  firstName = About.Name.FirstName ?? "";
  lastName = About.Name.LastName ?? "";

  aboutShort = About.AboutShort ?? "";
  aboutLong = About.AboutLong ?? "";

  // While a text contains "//" or "**" replace every "//" with <br> (for new line) and "**" with <b> and </b> alternatively (bold text).
  // "array" is the Array from which text is to be taken by providing the name of the key
  // keyName is the key in array with the text as its value.
  testDesc = (array, keyName) => {
    var val = array[`${keyName}`];
    while (val.includes("//") || val.includes("**")) {
      val = val.replace("**", "<b class='boldElem'>");

      val.includes("**")
        ? (val = val.replace("**", "</b>"))
        : !val.includes("//") && (val += "</b>");

      val = val.replace("//", "<br>");

      array[`${keyName}`] = val;
    }
  };

  testDesc(About, "AboutShort");
  testDesc(About, "AboutLong");

  // set new about description with tags respectively.
  aboutShort = About["AboutShort"];
  aboutLong = About["AboutLong"];

  // If profile url found in database, set as url. If url not found, check for gender and set image as per gender. If gender was also not found, set a default image as profile image.
  ProfileImage = About.ProfileImage
    ? About.ProfileImage
    : About.Gender == "male"
    ? "./assets/male.png"
    : About.Gender == "female"
    ? "./assets/female.png"
    : "./assets/project.png";

  professions = About.Profession.split(",") ?? "";
  resumeUrl = About.ResumeUrl;
  emailId = About.EmailId;

  //---Social media values---
  socialMenu = About.SocialMedia;
  linkedin = socialMenu.Linkedin;
  twitter = socialMenu.Twitter;
  instagram = socialMenu.Instagram;
  github = socialMenu.Github;
});

/*-------------------------------------------
       FUNCTION TO SET SOCIALS OF USER
---------------------------------------------*/

const SetSocialMenu = (section) => {
  // defining variables.
  const socialMenuElem = section.querySelector(".social-menu");
  const linkedinBtn = socialMenuElem.querySelector(".linkedin");
  const githubBtn = socialMenuElem.querySelector(".github");
  const instagramBtn = socialMenuElem.querySelector(".instagram");
  const twitterBtn = socialMenuElem.querySelector(".twitter");
  const socialList = socialMenuElem.querySelectorAll('li')

  // Social media icons are added and sets href value as per the values added in DB.
  Object.entries(socialMenu).forEach((social) => {
    const mediaName = social[0].toLowerCase();
    const mediaLink = social[1];
    const socialElem = socialMenuElem.querySelector(`.${mediaName}`);
    const socialLink = mediaLink ? mediaLink : `https://www.${mediaName}.com`;

    socialElem
      ? (socialElem.href = socialLink)
      : (socialMenuElem.innerHTML += `
        <li>
          <a href="${socialLink}" target="_blank" class="${mediaName}" tabindex="16">
            <i class="fa-brands fa-${mediaName}"></i>
          </a>
        </li>
      `);
  });

  // There are 4 default social icons set in html. If value of the social is not found in DB, remove element from html.
linkedin ? (linkedinBtn.href = linkedin) : socialMenuElem.querySelector('#linkedin') && socialMenuElem.querySelector('#linkedin').remove();

  github ? (githubBtn.href = github) : socialMenuElem.querySelector('#github') &&  socialMenuElem.querySelector('#github').remove();
  
  instagram ? (instagramBtn.href = instagram) : socialMenuElem.querySelector('#instagram') && socialMenuElem.querySelector('#instagram').remove();

  twitter ? (twitterBtn.href = twitter) : socialMenuElem.querySelector('#twitter') && socialMenuElem.querySelector('#twitter').remove();
};

/*-------------------------------------------
            SET HEADER SECTION
---------------------------------------------*/

const Header = (snapshot) => {
  if (snapshot.val().Logo) {
    // defining variables.
    var Logo = Object(snapshot.val().Logo);
    const headerElem = document.querySelector(".header");
    const logoElem = headerElem.querySelectorAll(".logo");
    const logoInitialsElem = headerElem.querySelector(".logo.initials");
    const logoImgDiv = headerElem.querySelector(".logo.img");
    const logoImgElem = logoImgDiv.querySelector("img");
    const navBar = headerElem.querySelector(".navbar-list");

    const logoUrl = Logo.url;
    const logoInitials = Logo.initials;

    // Set logo as image if url found in database and set display as none. If url not found, set logo as initials and set display as none for logoImage element.
    logoUrl
      ? ((logoImgElem.src = logoUrl),
        (logoImgDiv.style.display = "flex"),
        (logoInitialsElem.style.display = "none"))
      : logoInitials
      ? ((logoInitialsElem.innerHTML = logoInitials),
        (logoInitialsElem.style.display = "flex"),
        (logoImgDiv.style.display = "none"))
      : ((logoImgElem.src =
          "https://res.cloudinary.com/dkezwrb3a/image/upload/v1678016307/Portfolio/Untitled_design_2_-PhotoRoom.png-PhotoRoom_atrult.png"),
        (logoInitialsElem.style.display = "none"));

    logoElem.forEach((elem) => {
      elem.addEventListener("click", () => (window.location = `${WebUrl}`));
    });
    if (!window.location.pathname == "/projects") {
      snapshot.val().Projects ??
        (navBar.querySelector("a[name=projects]") &&
          navBar.querySelector("a[name=projects]").remove());
      snapshot.val().Education ??
        (navBar.querySelector("a[name=education]") &&
          navBar.querySelector("a[name=education]").remove());
      snapshot.val().Experience ??
        (navBar.querySelector("a[name=experience]") &&
          navBar.querySelector("a[name=experience]").remove());
    } else {
      navBar.querySelector("a[name=home]").href = WebUrl;
    }
  }
};

/*-------------------------------------------
            SET HOME SECTION
---------------------------------------------*/

const Home = () => {
  const homeSection = document.querySelector(".home-section");

  // set home section empty (usefull when portfolio is under development mode).
  homeSection.innerHTML = ``;

  // Set's home section as per the data fetched from the DB.
  homeSection.innerHTML = `
    <div>
      <h1>Hey, I'm <span class="name">${firstName}</span>
      </h1>
      <p class="aboutShort">${aboutShort}</p>
      <button class="about-me-btn button" name="about" onclick="scrollToSection(this)" tabindex="2">About Me
        <ion-icon name="chevron-forward-outline"></ion-icon></button>
    </div>
    <div class="imgDiv skeleton-box">
      <img src="${ProfileImage}" class="profile-image" alt="Profile Image">
    </div>
    `;
};

/*-------------------------------------------
            SET ABOUT SECTION
---------------------------------------------*/

const About = (snapshot) => {
  if (snapshot.val().About) {
    // defining variables.
    const aboutSection = document.querySelector(".about-section");
    const nameElem = aboutSection.querySelector(".name");
    const professionContainer = aboutSection.querySelector(
      ".professionContainer"
    );
    const aboutLongElem = aboutSection.querySelector(".aboutLong");
    const resumeBtn = aboutSection.querySelector(".button");

    nameElem.innerHTML = `${firstName} ${lastName}`;

    // set profession container empty (usefull when portfolio is under development mode).
    professionContainer.innerHTML = ``;

    // Add profession's in the profession container as per the DB.
    professions.forEach((profession) => {
      professionContainer.innerHTML += `
    <p class="profession">${profession}</p>
    `;
    });

    // Set html value of aboutLong element as the value of aboutLong declared in the User Info (at top)
    aboutLongElem.innerHTML = aboutLong;

    // Set href value of resume button as the value of resumeUrl declared in the User Info (at top)
    resumeBtn &&
      (resumeUrl ? (resumeBtn.href = resumeUrl) : resumeBtn.remove());

    // Calling SetSocialMenu function to set values of social icons present in about secttion (defined after User Info (at top))
    SetSocialMenu(aboutSection);
  } else {
    console.error("Error! About not found in the database.");
  }
};

/*-------------------------------------------
            SET SKILL SECTION
---------------------------------------------*/

const Skills = (snapshot) => {
  if (snapshot.val().Skills) {
    // defining variables.
    const snapVal = Object.values(snapshot.val().Skills);
    const skillsContainer = document.querySelector(
      ".skill-section .skill-container"
    );

    // set skills container empty (usefull when portfolio is under development mode).
    skillsContainer.innerHTML = ``;

    snapVal.forEach((skill) => {
      // For each skill split value at ",".
      const skillArray = skill.split(",");

      //  -Important terms-
      // 1st value --> array[0]
      // 2nd value --> array[1]
      // 3rd value --> array[2]

      //  Set skillName to the 1st value of array. If 1st value is empty set as default value "Skill name".
      var skillName = skillArray[0] != "" ? skillArray[0] : "Skill name";

      // If 2nd value of the array was found, remove all spaces and set skillScale as 2nd value of the array (update: spaces have been removed) which could be "M","m", "Major", "major", "Minor", "minor" or could be the url (i.e array could have two values, name and link).
      var skillScale = skillArray[1]
        ? skillArray[1].replaceAll(" ", "")
        : "minor";

      // Set skillImgUrl to the 3rd value of array. If 3d value of array is not found (undefined), set as default value (./ assets / skill.png).
      var skillImgUrl =
        skillArray[2] && skillArray[2].includes("http")
          ? skillArray[2]
          : "./assets/skill.png";

      // If skillScale is any of "M","Major" or "major" set value of skillScale as "major", else if skillScale is any of value "m","Minor" or "minor", set value of skillScale as "minor". If any of the conditions does not satisfy (i.e skillScale not equal to any of "M", "m","Major", "major","Minor" or "minor"), the value must be a url and hence set skillImgUrl as the value of skillScale and now set skillScale as "minor" (by default).
      skillScale == "M" || skillScale == "major" || skillScale == "Major"
        ? (skillScale = "major")
        : skillScale == "m" || skillScale == "minor" || skillScale == "Minor"
        ? (skillScale = "minor")
        : ((skillImgUrl = skillScale), (skillScale = "minor"));

      // Add skills in the skills container as per the DB.
      skillsContainer.innerHTML += `
        <div class="${skillScale}" data-aos="zoom-in" data-aos-duration="700" data-aos-once="true">
          <img src="${skillImgUrl}" alt="${skillName} image">
          <p>${skillName}</p>
        </div>
      `;
    });
  } else {
    console.error("Error! Skills not found in the database.");
  }
};

/*-------------------------------------------
            SET PROJECT SECTION
---------------------------------------------*/

const Project = (snapshot) => {
  if (snapshot.val().Projects) {
    // defining variables.
    const Projects = Object.values(snapshot.val().Projects);
    const projectSection = document.querySelector(`.project-section`);
    const projContainer = projectSection.querySelector(".card-container");
    const path = window.location.pathname;

    // Path can be "/" or "/projects"
    if (path == "/" || path == "/index.html") {
      const projSectionDesc = projectSection.querySelector(".sectionDesc");

      projSectionDesc.innerHTML =
        Projects.length <= 3
          ? `Here are a few past projects I've worked on. Want to see more?<a
        href="mailto:${emailId}" tabindex="22"> Email me ></a>`
          : `Here are a few past projects I've worked on. Want to see more?<a
        href="projects" tabindex="22"> View
        More ></a>`;
    } else {
      // defining variables.
      var homeSection = document.querySelector(".home-section");
      var errorSection = document.querySelector(".errorSection");
      var navBar = document.querySelector("header .navbar-list");
    }

    // set project container empty (usefull when portfolio is under development mode).
    projContainer.innerHTML = ``;

    // function to add projects.
    const addProjects = () => {
      Projects.reverse().every((project, index) => {
        // defining variables.
        const projectTechstack = project.Techstack;
        const projectLibrary = project.Library;
        const projectLink = project.ProjectLink;
        const projectCode = project.Github;
        const ProjectTitle = project.Title
          ? project.Title
          : "New Project Title";
        const imageUrl = project.ImageUrl
          ? project.ImageUrl
          : "./assets/project.png";
        const projectClass = ProjectTitle.replaceAll(" ", "") + index;
        const tabindex = 19 + index;

        // If projectScale is equal to "M", "major" or "Major", set value of projectScale as "major" else "minor".
        const projectScale = /M|Major|major/.test(project.ProjectScale)
          ? "major"
          : "minor";

        // Add project card in the project container as per the DB.
        projContainer.innerHTML += `
        <div class="project card ${projectScale} ${projectClass}" tabindex="${tabindex}">
        <div class="imgDiv skeleton-box">
          <img src="${imageUrl}" alt="${ProjectTitle} image">
        </div>
        <br>
        <h6>${ProjectTitle}</h6>
        <p class="techstack"><span> Techstack </span> - ${projectTechstack} </p>
        <p class="library"><span> Libraries </span> - ${projectLibrary} </p>

        <div class="options">
          <a class="viewElem" href="${projectLink}" target="_blank"><ion-icon name="open-outline"></ion-icon></a>
          <a class="githubElem" href="${projectCode}" target="_blank"><ion-icon name="logo-github"></ion-icon></a>
          <button class="share"><ion-icon name="link-outline">${projectLink}</ion-icon></button>
        </div>
      </div>
      `;

        // defining variables.
        const githubElem = projContainer.querySelector(
          `.${projectClass} .githubElem`
        );
        const viewElem = projContainer.querySelector(
          `.${projectClass} .viewElem`
        );
        const shareElem = projContainer.querySelector(
          `.${projectClass} .share`
        );

        const libraryElem = projContainer.querySelector(
          `.${projectClass} .library`
        );
        const techstackElem = projContainer.querySelector(
          `.${projectClass} .techstack`
        );

        // If _____ value not found (undefined), remove element.
        projectTechstack == undefined && techstackElem.remove();
        projectLibrary == undefined && libraryElem.remove();

        !projectLink && (viewElem.remove(), shareElem.remove());
        !projectCode && githubElem.remove();

        !projectLink &&
          !projectCode &&
          projContainer.querySelector(`.${projectClass} .options`).remove();

        return path == "/" || path == "/index.html"
          ? index < 2
            ? true
            : false
          : true;
      });

      // Set share icon to copy text for each project.
      const shareElems = projContainer.querySelectorAll(`.share`);
      shareElems.forEach((elem) => {
        elem.addEventListener("click", (elem) => {
          const inputElem = document.body.appendChild(
            document.createElement("input")
          );

          inputElem.value = elem.target.innerHTML;
          inputElem.select();
          inputElem.setSelectionRange(0, 99999);
          document.execCommand("copy");
          inputElem.parentNode.removeChild(inputElem);

          Toastify({
            text: "Link copied to clipboard!",
            duration: 2500,
            newWindow: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true,
            style: {
              background: "radial-gradient(#0BAB64, #3BB78F)",
            },
          }).showToast();
        });
      });
    };

    // If path includes "/project" and length of project array is greater than 3, call addProject() and set display to flex for all sections except error section (default display: none)
    // If length is less than 3, error section display sets to flex.
    // If path does not include "/projects" i.e path is equal to "/", call addProjects.
    path.includes("/projects")
      ? Projects.length > 3
        ? (addProjects(),
          (homeSection.style.display = "flex"),
          (projectSection.style.display = "flex"),
          (navBar.style.display = "flex"),
          (errorSection.style.display = "none"))
        : ((homeSection.style.display = "none"),
          (projectSection.style.display = "none"),
          (navBar.style.display = "none"),
          (errorSection.style.display = "flex"))
      : addProjects();
  } else {
    document.querySelector(".project-section") &&
      document.querySelector(".project-section").remove();
  }
};

/*-------------------------------------------
              EDUCATION SECTION
---------------------------------------------*/
const Education = (snapshot) => {
  if (snapshot.val().Education) {
    // defining variables.
    const Education = Object.values(snapshot.val().Education);
    const educationContainer = document.querySelector(
      ".education-section .card-container"
    );

    // Set education container empty (usefull when portfolio is under development mode).
    educationContainer.innerHTML = ``;

    Education.reverse().forEach((edu, index) => {
      // defining variables.
      const imgUrl =
        edu.ImageUrl && edu.ImageUrl.includes("http")
          ? edu.ImageUrl
          : "./assets/edu.png";
      const courseName = edu.CourseName ? edu.CourseName : "Course name";
      const instituteDesc = edu.Description;
      const instituteName = edu.InstituteName
        ? edu.InstituteName
        : "Institute name";
      const courseDuration = edu.CourseDuration ?? "";
      const cardClass = courseName.replace(/[^a-zA-Z0-9]/g, "") + index;

      toString(edu.Completed);
      // If value of Completed in DB is true, set statusVal to "Completed" else set as "Pursuing".
      const status = edu.Completed == "true" ? "Completed" : "Pursuing";

      // Add card in the education container as per the DB.
      educationContainer.innerHTML += `
      <div class="card ${cardClass}">
      <div class="imgDiv skeleton-box">
        <img src="${imgUrl}" alt="Institute image">
      </div><br>

        <h6 class="courseName">${courseName}</h6>
        <p class="instituteName">${instituteName}</p>

        <p class="instituteDesc">${instituteDesc}</p><br>
        <p class="status ${status}">${status} ${courseDuration}</p>
      </div>
    `;

      const eduCard = educationContainer.querySelector(`.card.${cardClass}`);

      // If instituteDesc not found (undefined), remove element.
      !instituteDesc && eduCard.querySelector(`.instituteDesc`).remove();
    });
  } else {
    document.querySelector(".education-section") &&
      document.querySelector(".education-section").remove();
  }
};

/*-------------------------------------------
          SET EXPRIENCE SECTION
---------------------------------------------*/

const Experience = (snapshot) => {
  if (snapshot.val().Experience) {
    // defining variables.
    const Experience = Object.values(snapshot.val().Experience);
    const expSection = document.querySelector(".experience-section");
    const expListContainer = expSection.querySelector(".listOfExp");
    const expDescContainer = expSection.querySelector(".expDesc");

    // Set experience list container empty (usefull when portfolio is under development mode).
    expListContainer.innerHTML = ``;

    Experience.reverse().forEach((experience, index) => {
      // defining variables.
      const companyName = experience.CompanyName
        ? experience.CompanyName
        : "Company Name";
      const classVal = companyName.replaceAll(" ", "");
      const tabindex = 25 + index;

      // Add company name in the experience list container as per the DB.
      expListContainer.innerHTML += `
        <li class="${classVal}" tabindex="${tabindex}">${companyName}</li>
      `;
    });

    // Function to set experience description container.
    const setExpDescCont = (expElem, index) => {
      const jobTitle =
        Experience[index].JobTitle && Experience[index].JobTitle != undefined
          ? Experience[index].JobTitle
          : expElem.innerHTML;

      const workingPeriod =
        Experience[index].WorkingPeriod &&
        Experience[index].WorkingPeriod != undefined
          ? Experience[index].WorkingPeriod
          : "From (Month) - to (Month) Year";

      var ArrayOfCompanyDesc = Object.entries(
        snapshot.val().Experience
      ).reverse();

      var jobDescription = Experience[index].JobDescription;
      testDesc(ArrayOfCompanyDesc[index][1], "JobDescription");
      var jobDescription = ArrayOfCompanyDesc[index][1]["JobDescription"]
        ? ArrayOfCompanyDesc[index][1]["JobDescription"]
        : "About Job";

      // set experience description container accordingly
      expDescContainer.innerHTML = `
        <h4 class="expTitle">${jobTitle}</h4>
        <p class="period">${workingPeriod}</p><br>
        <p class="desc">${jobDescription}</p>
        `;
    };

    const experienceList = expListContainer.querySelectorAll("li");

    experienceList.forEach((expElem, index) => {
      // Add active to classlist of very first element in the list and call setExpDesc() to set experience description.
      index == 0 &&
        (expElem.classList.add("active"), setExpDescCont(expElem, index));

      // On clicking any element from the experience list, set its description by calling setExpDesc().
      // On click, remove active from all the element of the experience list and add active to the element which was clicked.
      expElem.addEventListener("click", () => {
        setExpDescCont(expElem, index);

        experienceList.forEach((expElem) => {
          expElem.classList.contains("active") &&
            expElem.classList.remove("active");
        });
        expElem.classList.add("active");
      });
    });

    // defining variables.
    const expListContainerH = expListContainer.offsetHeight;
    const expDescContainerH = expDescContainer.offsetHeight;

    // If the height of the experience list container gets more than the height of experience description container, set height of experience description container same as experience list container.
    expListContainerH > expDescContainerH &&
      (expDescContainer.style.height = `${expListContainerH}px`);
  } else {
    document.querySelector(".experience-section") &&
      document.querySelector(".experience-section").remove();
  }
};

/*-------------------------------------------
            SET CONTACT SECTION
---------------------------------------------*/

const Contact = (snapshot) => {
  if (snapshot.val().EmailJs) {
    // defining variables.
    const EmailJs = snapshot.val().EmailJs;
    const contactBtn = document.querySelector(".contactBtn");
    formDiv = document.querySelector(".formDiv");
    const closeIcon = formDiv.querySelector(".mobile-nav-icon");
    const contactForm = formDiv.querySelector("form");

    publicKey = EmailJs.publicKey;
    serviceID = EmailJs.serviceID;
    templateID = EmailJs.templateID;

    // If publicKey, serviceID & templateID was found in the DB, contact button on click will display the form. Else if any of the one was not found, contact button will have a mailto functionality.
    if (publicKey && serviceID && templateID) {
      contactBtn.hasAttribute("href") && contactBtn.removeAttribute("href");
      contactBtn.hasAttribute("target") && contactBtn.removeAttribute("target");

      contactBtn.addEventListener("click", () => {
        formDiv.classList.add("open");
      });

      closeIcon.addEventListener("click", () => {
        formDiv.classList.remove("open");
      });

      contactForm.addEventListener("submit", submitForm);
    } else {
      formDiv.remove();
      contactBtn.href = `mailto:${emailId}`;
      contactBtn.target = "_blank";
    }
  } else {
    formDiv.remove();
  }
};

/*-------------------------------------------
          SET FOOTER SECTION
---------------------------------------------*/

const Footer = () => {
  // defining variables.
  const footer = document.querySelector("footer");
  const getInTouchBtn = document.querySelector(".getInTouchBtn");
  const profileInfo = document.querySelector(".profInfo");

  getInTouchBtn.href = `mailto:${emailId}`;

  // Set profile info as per the values fetched from DB.
  profileInfo.innerHTML = `
    <div class="imgDiv skeleton-box">
      <img src="${ProfileImage}" alt="Profile Image">
    </div>

    <p>${firstName} ${lastName}<br>Mail me at <a href="mailto:${emailId}" tabindex="37">${emailId}</a>
    </p>`;

  // Calling SetSocialMenu() to set social menu of user from the DB.
  SetSocialMenu(footer);
};

//-------------------------------------------------------
//              FIREBASE WRITE FUNCTIONS
//-------------------------------------------------------

//----------DEVELOPMENT MODE SETUP-------------
ref.child("(Development Mode)").on("value", (mode) => {
  DevMode = /true|T|True|t|on|On/.test(mode.val());
});
// Whenever a child is added to the Projects, set an object in the child which tends to be empty.
ref.child("Projects").on("child_added", (snap) => {
  Array(snap).forEach((snapVal) => {
    !snapVal.val() &&
      firebase
        .database()
        .ref("Projects/" + snapVal.key)
        .set(
          {
            Title: "New Project Title",
            ImageUrl: "",
            Library: "",
            Techstack: "",
            ProjectLink: "",
            Github: "",
            ProjectScale: "",
          } &&
            DevMode == true &&
            Toastify({
              text: `New project has been added to your project section!`,
              duration: 3000,
              gravity: "top", // `top` or `bottom`
              position: "left", // `left`, `center` or `right`
              stopOnFocus: true,
              offset: {
                y: 70, // vertical axis - can be a number or a string indicating unity. eg: '2em'
              },
              style: {
                background: "#16a34a",
              },

              onClick: function () {},
            }).showToast()
        );
  });
});

ref.child("Projects").on("child_removed", (data) => {
  DevMode == true &&
    Toastify({
      text: `"${data.val().Title}" has been removed from your project section!`,
      duration: 4500,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true,
      offset: {
        y: 70, // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
      style: {
        background: "#dc2626",
      },

      onClick: function () {},
    }).showToast();
});

// Whenever a child is added to the Education, set an object in the child which tends to be empty.
ref.child("Education").on("child_added", (snap) => {
  Array(snap).forEach((snapVal) => {
    !snapVal.val() &&
      firebase
        .database()
        .ref("Education/" + snapVal.key)
        .set(
          {
            Completed: "true/false",
            CourseName: "",
            CourseDuration: "",
            Description: "",
            InstituteName: "",
            ImageUrl: "",
          } &&
            DevMode == true &&
            Toastify({
              text: "New course card has been added to your education section!",
              duration: 3000,
              gravity: "top", // `top` or `bottom`
              position: "left", // `left`, `center` or `right`
              stopOnFocus: true,
              offset: {
                y: 70, // vertical axis - can be a number or a string indicating unity. eg: '2em'
              },
              style: {
                background: "#16a34a",
              },

              onClick: function () {},
            }).showToast()
        );
  });
});

ref.child("Education").on("child_removed", (data) => {
  DevMode == true &&
    Toastify({
      text: `Course details of "${
        data.val().InstituteName
      }" has been removed from your education section!`,
      duration: 4500,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true,
      offset: {
        y: 70, // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
      style: {
        background: "#dc2626",
      },

      onClick: function () {},
    }).showToast();
});

// Whenever a child is added to the Experience, set an object in the child which tends to be empty.
ref.child("Experience").on("child_added", (snap) => {
  Array(snap).forEach((snapVal) => {
    !snapVal.val() &&
      firebase
        .database()
        .ref("Experience/" + snapVal.key)
        .set(
          {
            JobTitle: "",
            JobDescription: "",
            WorkingPeriod: "From (Month) - to (Month) Year",
            CompanyName: "",
          } &&
            DevMode == true &&
            Toastify({
              text: "New job experience has been added to your experience section!",
              duration: 3000,
              gravity: "top", // `top` or `bottom`
              position: "left", // `left`, `center` or `right`
              stopOnFocus: true,
              offset: {
                y: 70, // vertical axis - can be a number or a string indicating unity. eg: '2em'
              },
              style: {
                background: "#16a34a",
              },

              onClick: function () {},
            }).showToast()
        );
  });
});

ref.child("Experience").on("child_removed", (data) => {
  DevMode == true &&
    Toastify({
      text: `Job details of "${
        data.val().CompanyName
      }" has been removed from your experience section!`,
      duration: 4500,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true,
      offset: {
        y: 70, // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
      style: {
        background: "#dc2626",
      },

      onClick: function () {},
    }).showToast();
});

ref.child("Skills").on("child_removed", (data) => {
  DevMode == true &&
    Toastify({
      text: `"${
        data.val().split(",")[0]
      }" has been removed from your skills section!`,
      duration: 4500,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true,
      offset: {
        y: 70, // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
      style: {
        background: "#dc2626",
      },

      onClick: function () {},
    }).showToast();
});
