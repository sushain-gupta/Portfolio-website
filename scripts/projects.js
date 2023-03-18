ProjectSearch = () => {
  const projects = document.querySelectorAll(".card");
  const searchInput = document.querySelector(".searchInput");
  let search;

  searchInput.addEventListener("keyup", () => {
    clearTimeout(search);

    search = setTimeout(() => {
      const inputValue = searchInput.value.trim();
      projects.forEach((project) => {
        projectTitle = project.querySelector("h6").innerHTML;

        `${projectTitle.toLowerCase()}`.startsWith(`${inputValue}`) ||
        inputValue == ""
          ? project.classList.contains("filtered-out") &&
            setDisplay("flex", 0, "enabled", 1)
          : setDisplay("none", 500, "disabled", 0);

        function setDisplay(display, delay1, classVal, delay2) {
          setTimeout(() => {
            project.style.display = `${display}`;
          }, delay1);

          setTimeout(() => {
            classVal == "enabled"
              ? project.classList.remove("filtered-out")
              : project.classList.add("filtered-out");
          }, delay2);
        }
      });
    }, 500);
  });
};

/*-------------------------------------------
                FIREBASE
---------------------------------------------*/

//----------DEVELOPMENT MODE SETUP-------------
ref.child("(Development Mode)").on("value", (mode) => {
  DevMode = /true|T|True|t|on|On/.test(mode.val());
});

ref.on("value", (snapshot) => {
  DevMode == true && Header(snapshot);
  Project(snapshot);
  ProjectSearch();
  Contact(snapshot);
  Footer(snapshot);
  setSkeleton();
});
ref.once("value", (snapshot) => {
  DevMode == false && Header(snapshot);
  Project(snapshot);
  ProjectSearch();
  Contact(snapshot);
  Footer(snapshot);
  setSkeleton();
});
