const submitBtn = document.querySelector("#form-control");
const wishBox = document.querySelector("#wish-box")
const navBar = document.querySelector(".header__nav--bar i");
let imageTag = document.querySelector(".slide");

submitBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputData = document.getElementById("fullName").value;
  let textareaData = document.getElementById("textarea").value;
  let objectData = {
    Name: inputData,
    Describe: textareaData,
  };

  if (!(inputData && textareaData) ) {
    Swal.fire({
      icon: "error",
      title: "Thật tiếc!!!",
      text: "Vui lòng Nhập đầy đủ thông tin (^_^)"
    });
  }
  else {
    const fetchApi = async () => {
      try {
        const response = await fetch("https://sheet.best/api/sheets/ca66a9b6-5c7f-4f97-83e6-75d0efb7c380", {
          method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objectData),
        });
        const result = await response.json();
        if (result) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Đã Gửi thành công (^_^)",
            showConfirmButton: false,
            timer: 1500
          });
           setTimeout(() => {
            location.reload()
            }, 500);
        }
      } catch (error) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Gửi không thành công (^_^)",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
    fetchApi()
  }
  
});

const fetchData = async () => {
  const response = await fetch(
    "https://sheet.best/api/sheets/ca66a9b6-5c7f-4f97-83e6-75d0efb7c380",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const result = await response.json();
  let data = result.reverse()
  const dataFinal = data.map(item => (

  `<div class="wish-box-item">
      <strong class="name">${item.Name}</strong>
      <p class="happy">${item.Describe}</p>
    </div>`
  ))
  wishBox.innerHTML = dataFinal.join("")
};
fetchData();

//nav
navBar.addEventListener("click", () => {
  document.querySelector(".open-menu").classList.toggle("fa-bars");
  document.querySelector(".open-menu").classList.toggle("fa-xmark");
  document.querySelector(".header__nav--menu").classList.toggle("open-nav");
});
//end nav

//runsile background
var i = 0;
var imgArr = [
  "./assets/images/2.jpg",
  "./assets/images/3.jpg",
  "./assets/images/4.jpg",
];

function slideShow_auto() {
  imageTag.setAttribute("src", imgArr[i]);
  imageTag.style.animation =
    "5s linear 0s infinite alternate backwards running kenburns-top";
  imageTag.style.transition = "all 0.5s";
  i++;
  if (i === imgArr.length) {
    i = 0;
  }
}
setInterval(slideShow_auto, 5000);
//runsile background

// khỏi tạo thư viện
new WOW().init();
// //khỏi tao funcy box

Fancybox.bind("[data-fancybox]", {
  Infinity: false,
  keyboard: {
    Escape: "close",
    Delete: "close",
    Backspace: "close",
    PageUp: "next",
    PageDown: "prev",
    ArrowUp: "prev",
    ArrowDown: "next",
    ArrowRight: "next",
    ArrowLeft: "prev",
  },
  l10: {
    CLOSE: "đóng",
  },
  Carousel: {
    transition: "slide",
  },
  showClass: "f-fadeIn",
  Thumbs: {
    showOnStart: false,
  },
  Toolbar: {
    display: {
      right: ["close"],
    },
  },
});
Fancybox.defaults.showClass = "f-scaleIn";

//audio
const control = document.querySelectorAll(".volume")
const audio = document.getElementById("audio");

control.forEach(element => {
  element.addEventListener("click", ()=> {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    } 
    control.forEach(control => {
      control.classList.remove("active")
    });
    element.classList.add("active")
  })
});
//end audio