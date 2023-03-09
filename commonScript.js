//-----------------------------------------------
//          HEADER TOGGLE FUNCTION
//-----------------------------------------------

const header = document.querySelector(".header");

function toggleNav() {
  const sections = document.querySelectorAll("section, footer");

  header.classList.toggle("active");

  header.classList.contains("active")
    ? sections.forEach((section) => {
        section.addEventListener("click", toggleNav);
      })
    : sections.forEach((section) => {
        section.removeEventListener("click", toggleNav);
      });
}

//---------------------------------------------------
//          HEADER ANIMATION FUNCTION
//---------------------------------------------------

const anchors = header.querySelectorAll("a");

const headerAnim = () => {
  const offsetY = window.scrollY;

  header.classList.contains("header-scroll-style")
    ? offsetY < 50 && header.classList.remove("header-scroll-style")
    : offsetY > 200 && header.classList.add("header-scroll-style");
};

headerAnim();
window.addEventListener("scroll", headerAnim);

//-----------------------------------------------
//          FORM FUNCTION
//-----------------------------------------------

const submitForm = (e) => {
  e.preventDefault();
  var nameVal = document.getElementById("name").value.trim();
  var messageVal = document.getElementById("message").value.trim();

  /*--------------------------
          MAIL FUNCTION
    ---------------------------*/
  // Mail & snackbar functionality is executed if and only if all the fields are filled by the user.
  if (nameVal && messageVal != "") {
    e.preventDefault();

    var templateParams = {
      from_name: document.getElementById("name").value,
      email_id: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    Toastify({
      text: "Sending message..",
      duration: 4500,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true,
      offset: {
        y: 70, // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
      style: {
        background: "#eab308",
      },

      onClick: function () {},
    }).showToast();

    emailjs.init(`${publicKey}`);
    emailjs.send(`${serviceID}`, `${templateID}`, templateParams).then(
      function (response) {
        Toastify({
          text: "Your message has been sent successfully!",
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
        }).showToast();

        formDiv.classList.remove("open");
        document.getElementById("myform").reset();
      },
      // Error function
      function (error) {
        if (window.navigator.onLine) {
          Toastify({
            text: "Server limit reached",
            duration: 3000,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true,
            offset: {
              y: 70, // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
            style: {
              background: "#ef4444",
            },

            onClick: function () {},
          }).showToast();

          setTimeout(() => {
            Toastify({
              text: "Mail me at sushain.work@gmail.com",
              duration: 5000,
              gravity: "top", // `top` or `bottom`
              position: "left", // `left`, `center` or `right`
              stopOnFocus: true,
              offset: {
                y: 70, // vertical axis - can be a number or a string indicating unity. eg: '2em'
              },
              style: {
                background: "#0284c7",
              },

              onClick: function () {},
            }).showToast();
          }, 1000);
        } else {
          Toastify({
            text: "Error! Please check your internet connection and try again.",
            duration: 3000,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true,
            offset: {
              y: 70, // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
            style: {
              background: "#dc2626",
            },

            onClick: function () {}, // Callback after click
          }).showToast();
        }
      }
    );
  } else {
    Toastify({
      text: "Field's can not remain empty.",
      duration: 3000,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true,
      offset: {
        y: 70, // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
      style: {
        background: "#dc2626",
      },

      onClick: function () {}, // Callback after click
    }).showToast();
  }
};

//-----------------------------------------------
//          LOADER FUNCTION
//-----------------------------------------------

slowInternet = setTimeout(() => {
  document.querySelector(".loaderDiv p").innerHTML = "Slow internet :(";
}, 3000);

almostReady = setTimeout(() => {
  document.querySelector(".loaderDiv p").innerHTML = "Page is almost ready...";
}, 7000);

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    // document ready
    clearTimeout(slowInternet);
    clearTimeout(almostReady);

    document.querySelector(".loaderDiv p").innerHTML = "Page is almost ready!";

    setTimeout(() => {
      document.querySelector(".loaderDiv p").innerHTML = "Page is ready!";
    }, 1000);
    setTimeout(() => {
      document.querySelector(".loaderDiv").classList.add("removeLoader");
      document.querySelector("body").style.overflowY = "scroll";
    }, 2500);

    window.scrollTo(0, 0);
  }
  window.scrollTo(0, 0);
};

//-----------SKELETON LOADER--------------//

const setSkeleton = () => {
  const ImgDiv = document.querySelectorAll(`.imgDiv`);

  ImgDiv.forEach((div) => {
    var image = div.querySelector(`img`);

    if (!image.src.includes("/assets/")) {
      image.style.scale = 0;
      image.style.transition = "all 0.2s";

      image.onload = (img) => {
        img.target.style.scale = "1";
        div.classList.remove("skeleton-box");
      };
    } else {
      div.classList.remove("skeleton-box");
    }
  });
};
