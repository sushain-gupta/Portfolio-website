ref.child("(WebUrl)").on("value", (url) => {
  WebUrl = url.val() ?? "";
});
ref.child("About").on("value", (snapshot) => {
  const About = Object(snapshot.val());
  firstName = About.Name.FirstName ?? "";
  lastName = About.Name.LastName ?? "";
  aboutShort = About.AboutShort ?? "";
  aboutLong = About.AboutLong ?? "";
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
  aboutShort = About["AboutShort"];
  aboutLong = About["AboutLong"];
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
  socialMenu = About.SocialMedia;
  linkedin = socialMenu.Linkedin;
  twitter = socialMenu.Twitter;
  instagram = socialMenu.Instagram;
  github = socialMenu.Github;
});
const SetSocialMenu = (section) => {
  const socialMenuElem = section.querySelector(".social-menu");
  const linkedinBtn = socialMenuElem.querySelector(".linkedin");
  const githubBtn = socialMenuElem.querySelector(".github");
  const instagramBtn = socialMenuElem.querySelector(".instagram");
  const twitterBtn = socialMenuElem.querySelector(".twitter");
  Object.entries(socialMenu).forEach((social) => {
    const mediaName = social[0].toLowerCase();
    const mediaLink = social[1];
    const socialElem = socialMenuElem.querySelector(`.${mediaName}`);
    const socialLink = mediaLink ? mediaLink : `https://www.${mediaName}.com`;
    socialElem
      ? (socialElem.href = socialLink)
      : (socialMenuElem.innerHTML += `\n        <li>\n          <a href="${socialLink}" target="_blank" class="${mediaName}" tabindex="16">\n            <i class="fa-brands fa-${mediaName}"></i>\n          </a>\n        </li>\n      `);
  });
  linkedin ? (linkedinBtn.href = linkedin) : linkedinBtn.remove();
  github ? (githubBtn.href = github) : githubBtn.remove();
  instagram ? (instagramBtn.href = instagram) : instagramBtn.remove();
  twitter ? (twitter.href = twitter) : twitterBtn.remove();
};
const Header = (snapshot) => {
  if (snapshot.val().Logo) {
    var Logo = Object(snapshot.val().Logo);
    const headerElem = document.querySelector(".header");
    const logoElem = headerElem.querySelectorAll(".logo");
    const logoInitialsElem = headerElem.querySelector(".logo.initials");
    const logoImgDiv = headerElem.querySelector(".logo.img");
    const logoImgElem = logoImgDiv.querySelector("img");
    const navBar = headerElem.querySelector(".navbar-list");
    const logoUrl = Logo.url;
    const logoInitials = Logo.initials;
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
    if (!window.location.pathname.includes("projects")) {
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
const Home = () => {
  const homeSection = document.querySelector(".home-section");
  homeSection.innerHTML = ``;
  homeSection.innerHTML = `\n      <div>\n      <h1>Hey, I'm <span class="name">${firstName}</span>\n      </h1>\n      <p class="aboutShort">${aboutShort}</p>\n      <button class="about-me-btn button" name="about" onclick="scrollToSection(this)" tabindex="2">About Me\n        <ion-icon name="chevron-forward-outline"></ion-icon></button>\n    </div>\n    <div class="imgDiv skeleton-box">\n      <img src="${ProfileImage}" class="profile-image" alt="Profile Image">\n    </div>\n    `;
};
const About = (snapshot) => {
  if (snapshot.val().About) {
    const aboutSection = document.querySelector(".about-section");
    const nameElem = aboutSection.querySelector(".name");
    const professionContainer = aboutSection.querySelector(
      ".professionContainer"
    );
    const aboutLongElem = aboutSection.querySelector(".aboutLong");
    const resumeBtn = aboutSection.querySelector(".button");
    nameElem.innerHTML = `${firstName} ${lastName}`;
    professionContainer.innerHTML = ``;
    professions.forEach((profession) => {
      professionContainer.innerHTML += `\n    <p class="profession">${profession}</p>\n    `;
    });
    aboutLongElem.innerHTML = aboutLong;
    resumeUrl || resumeBtn ? (resumeBtn.href = resumeUrl) : resumeBtn.remove();
    SetSocialMenu(aboutSection);
  } else {
    console.error("Error! About not found in the database.");
  }
};
const Skills = (snapshot) => {
  if (snapshot.val().Skills) {
    const snapVal = Object.values(snapshot.val().Skills);
    const skillsContainer = document.querySelector(
      ".skill-section .skill-container"
    );
    skillsContainer.innerHTML = ``;
    snapVal.forEach((skill) => {
      const skillArray = skill.split(",");
      var skillName = skillArray[0] != "" ? skillArray[0] : "Skill name";
      var skillScale = skillArray[1]
        ? skillArray[1].replaceAll(" ", "")
        : "minor";
      var skillImgUrl =
        skillArray[2] && skillArray[2].includes("http")
          ? skillArray[2]
          : "./assets/skill.png";
      skillScale == "M" || skillScale == "major" || skillScale == "Major"
        ? (skillScale = "major")
        : skillScale == "m" || skillScale == "minor" || skillScale == "Minor"
        ? (skillScale = "minor")
        : (skillScale = "minor");
      skillsContainer.innerHTML += `\n        <div class="${skillScale}" data-aos="zoom-in" data-aos-duration="700" data-aos-once="true">\n          <img src="${skillImgUrl}" alt="${skillName} image">\n          <p>${skillName}</p>\n        </div>\n      `;
    });
  } else {
    console.error("Error! Skills not found in the database.");
  }
};
const Project = (snapshot) => {
  if (snapshot.val().Projects) {
    const Projects = Object.values(snapshot.val().Projects);
    const projectSection = document.querySelector(`.project-section`);
    const projContainer = projectSection.querySelector(".card-container");
    const path = window.location.pathname;
    if (path == "/") {
      const projSectionDesc = projectSection.querySelector(".sectionDesc");
      projSectionDesc.innerHTML =
        Projects.length <= 3
          ? `Here are a few past projects I've worked on. Want to see more?<a\n        href="mailto:${emailId}" tabindex="22"> Email me ></a>`
          : `Here are a few past projects I've worked on. Want to see more?<a\n        href="projects" tabindex="22"> View\n        More ></a>`;
    } else {
      var homeSection = document.querySelector(".home-section");
      var errorSection = document.querySelector(".errorSection");
      var navBar = document.querySelector("header .navbar-list");
    }
    projContainer.innerHTML = ``;
    const addProjects = () => {
      Projects.reverse().every((project, index) => {
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
        const projectScale = /M|Major|major/.test(project.ProjectScale)
          ? "major"
          : "minor";
        projContainer.innerHTML += `\n        <div class="project card ${projectScale} ${projectClass}" tabindex="${tabindex}">\n        <div class="imgDiv skeleton-box">\n          <img src="${imageUrl}" alt="${ProjectTitle} image">\n        </div>\n        <br>\n        <h6>${ProjectTitle}</h6>\n        <p class="techstack"><span> Techstack </span> - ${projectTechstack} </p>\n        <p class="library"><span> Libraries </span> - ${projectLibrary} </p>\n\n        <div class="options">\n          <a class="viewElem" href="${projectLink}" target="_blank"><ion-icon name="open-outline"></ion-icon></a>\n          <a class="githubElem" href="${projectCode}" target="_blank"><ion-icon name="logo-github"></ion-icon></a>\n          <button class="share"><ion-icon name="link-outline">${projectLink}</ion-icon></button>\n        </div>\n      </div>\n      `;
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
        projectTechstack == undefined && techstackElem.remove();
        projectLibrary == undefined && libraryElem.remove();
        !projectLink && (viewElem.remove(), shareElem.remove());
        !projectCode && githubElem.remove();
        !projectLink &&
          !projectCode &&
          projContainer.querySelector(`.${projectClass} .options`).remove();
        return path == "/" ? (index < 2 ? true : false) : true;
      });
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
            gravity: "top",
            position: "left",
            stopOnFocus: true,
            style: { background: "radial-gradient(#0BAB64, #3BB78F)" },
          }).showToast();
        });
      });
    };
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
const Education = (snapshot) => {
  if (snapshot.val().Education) {
    const Education = Object.values(snapshot.val().Education);
    const educationContainer = document.querySelector(
      ".education-section .card-container"
    );
    educationContainer.innerHTML = ``;
    Education.reverse().forEach((edu, index) => {
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
      const status = edu.Completed == "true" ? "Completed" : "Pursuing";
      educationContainer.innerHTML += `\n      <div class="card ${cardClass}">\n      <div class="imgDiv skeleton-box">\n        <img src="${imgUrl}" alt="Institute image">\n      </div><br>\n\n        <h6 class="courseName">${courseName}</h6>\n        <p class="instituteName">${instituteName}</p>\n\n        <p class="instituteDesc">${instituteDesc}</p><br>\n        <p class="status ${status}">${status} ${courseDuration}</p>\n      </div>\n    `;
      const eduCard = educationContainer.querySelector(`.card.${cardClass}`);
      !instituteDesc && eduCard.querySelector(`.instituteDesc`).remove();
    });
  } else {
    document.querySelector(".education-section") &&
      document.querySelector(".education-section").remove();
  }
};
const Experience = (snapshot) => {
  if (snapshot.val().Experience) {
    const Experience = Object.values(snapshot.val().Experience);
    const expSection = document.querySelector(".experience-section");
    const expListContainer = expSection.querySelector(".listOfExp");
    const expDescContainer = expSection.querySelector(".expDesc");
    expListContainer.innerHTML = ``;
    Experience.reverse().forEach((experience, index) => {
      const companyName = experience.CompanyName
        ? experience.CompanyName
        : "Company Name";
      const classVal = companyName.replaceAll(" ", "");
      const tabindex = 25 + index;
      expListContainer.innerHTML += `\n        <li class="${classVal}" tabindex="${tabindex}">${companyName}</li>\n      `;
    });
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
      expDescContainer.innerHTML = `\n        <h4 class="expTitle">${jobTitle}</h4>\n        <p class="period">${workingPeriod}</p><br>\n        <p class="desc">${jobDescription}</p>\n        `;
    };
    const experienceList = expListContainer.querySelectorAll("li");
    experienceList.forEach((expElem, index) => {
      index == 0 &&
        (expElem.classList.add("active"), setExpDescCont(expElem, index));
      expElem.addEventListener("click", () => {
        setExpDescCont(expElem, index);
        experienceList.forEach((expElem) => {
          expElem.classList.contains("active") &&
            expElem.classList.remove("active");
        });
        expElem.classList.add("active");
      });
    });
    const expListContainerH = expListContainer.offsetHeight;
    const expDescContainerH = expDescContainer.offsetHeight;
    expListContainerH > expDescContainerH &&
      (expDescContainer.style.height = `${expListContainerH}px`);
  } else {
    document.querySelector(".experience-section") &&
      document.querySelector(".experience-section").remove();
  }
};
const Contact = (snapshot) => {
  if (snapshot.val().EmailJs) {
    const EmailJs = snapshot.val().EmailJs;
    const contactBtn = document.querySelector(".contactBtn");
    formDiv = document.querySelector(".formDiv");
    const closeIcon = formDiv.querySelector(".mobile-nav-icon");
    const contactForm = formDiv.querySelector("form");
    publicKey = EmailJs.publicKey;
    serviceID = EmailJs.serviceID;
    templateID = EmailJs.templateID;
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
const Footer = () => {
  const footer = document.querySelector("footer");
  const getInTouchBtn = document.querySelector(".getInTouchBtn");
  const profileInfo = document.querySelector(".profInfo");
  getInTouchBtn.href = `mailto:${emailId}`;
  profileInfo.innerHTML = `\n    <div class="imgDiv skeleton-box">\n      <img src="${ProfileImage}" alt="Profile Image">\n    </div>\n\n    <p>${firstName} ${lastName}<br>Mail me at <a href="mailto:${emailId}" tabindex="37">${emailId}</a>\n    </p>`;
  SetSocialMenu(footer);
};
ref.child("Projects").on("child_added", (snap) => {
  Array(snap).forEach((snapVal) => {
    !snapVal.val() &&
      firebase
        .database()
        .ref("Projects/" + snapVal.key)
        .set({
          Title: "New Project Title",
          ImageUrl: "",
          Library: "",
          Techstack: "",
          ProjectLink: "",
          Github: "",
          ProjectScale: "",
        });
  });
});
ref.child("Education").on("child_added", (snap) => {
  Array(snap).forEach((snapVal) => {
    !snapVal.val() &&
      firebase
        .database()
        .ref("Education/" + snapVal.key)
        .set({
          Completed: "true/false",
          CourseName: "",
          CourseDuration: "",
          Description: "",
          InstituteName: "",
          ImageUrl: "",
        });
  });
});
ref.child("Experience").on("child_added", (snap) => {
  Array(snap).forEach((snapVal) => {
    !snapVal.val() &&
      firebase
        .database()
        .ref("Experience/" + snapVal.key)
        .set({
          JobTitle: "",
          JobDescription: "",
          WorkingPeriod: "From (Month) - to (Month) Year",
          CompanyName: "",
        });
  });
});
