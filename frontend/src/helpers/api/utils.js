import axios from "axios";

const Utils = {
  signaler: function (vuem, post) {
    let modal_bg = document.createElement("div");
    modal_bg.style.width = "100vw";
    modal_bg.style.height = "100vh";
    modal_bg.style.top = "0";
    modal_bg.style.left = "0";
    modal_bg.style.backgroundColor = "#444444a0";
    modal_bg.style.position = "fixed";
    modal_bg.style.display = "flex";
    modal_bg.style.justifyContent = "center";
    modal_bg.style.alignItems = "center";
    modal_bg.style.zIndex = "10000";
    let modal = document.createElement("div");
    modal.classList.add("alert");
    modal.classList.add("alert-warning");
    modal.style.width = "40%";
    let p = document.createElement("p");
    p.innerHTML = `Vous avez signaler la publication de <strong>${post.userPseudo}</strong>, nous examinerons cette publication et prendrons une décision. Merci :)`;
    let button = document.createElement("button");
    button.classList = "btn btn-danger";
    button.innerHTML = "fermer";
    modal.appendChild(p);
    modal.appendChild(button);
    modal_bg.appendChild(modal);
    document.querySelector("body").appendChild(modal_bg);
    modal_bg.addEventListener("click", function () {
      document.querySelector("body").removeChild(this);
    });
  },
  delete: function (vuem) {
    let id = vuem.getPost.id;
    axios
      .delete(`http://localhost:8000/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        vuem.$router.push({name: "Home"});
      })
      .catch((err) => console.log(err));

  },

  postLength: function (vuem) {
    return vuem.getPost.likeList.length
  }
}

export default Utils;
