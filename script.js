function navHighlighter(){const sections=document.querySelectorAll("section");let scrollY=window.pageYOffset;sections.forEach((current=>{const sectionHeight=current.offsetHeight,sectionTop=current.offsetTop-180,sectionId=current.getAttribute("id");scrollY>sectionTop&&scrollY<=sectionTop+sectionHeight?document.querySelector(".navbar .navbar-link[name*="+sectionId+"]").classList.add("active"):document.querySelector(".navbar .navbar-link[name*="+sectionId+"]").classList.remove("active")}))}window.addEventListener("scroll",(()=>{headerAnim(),navHighlighter()}));const scrollToSection=e=>{document.querySelector(`#${e.getAttribute("name")}`).scrollIntoView()};console.log("[36mHey developer, there are no logs here. sheesh!"),console.log("[36mRepo available at https://github.com/sushain-gupta/Portfolio"),ref.child("(Development Mode)").on("value",(mode=>{toString(mode.val()),DevMode=/true|T|True|t|on|On/.test(mode.val())?"on":"once","on"==DevMode?ref.on("value",(snapshot=>{Header(snapshot),Home(snapshot),About(snapshot),Skills(snapshot),Project(snapshot),Education(snapshot),Experience(snapshot),Contact(snapshot),Footer(snapshot),setSkeleton(),navHighlighter()})):ref.once("value",(snapshot=>{Header(snapshot),Home(snapshot),About(snapshot),Skills(snapshot),Project(snapshot),Education(snapshot),Experience(snapshot),Contact(snapshot),Footer(snapshot),setSkeleton(),navHighlighter()}))}));