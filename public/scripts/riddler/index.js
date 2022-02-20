const start_game = document.querySelector("#start_game");
const hangingTN = document.getElementById("hangingTN");
const rulebook = document.querySelector("#rulebook");
const start = document.querySelector("#start_one");
if (start) {
  start.addEventListener("click", () => {
    rulebook.style.display = "flex";
  });
}

if (start_game) {
  start_game.addEventListener("click", async () => {
    try {
      const res = await fetch("/api/riddler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      console.log(res.json());
      rulebook.style.display = "none";
      hangingTN.style.animation = "pop-up 2.3s ease-out";
      setTimeout(() => {
        hangingTN.style.display = "none";
        document.location.reload();
      }, 2000);
    } catch (err) {
      console.log("Error Occured" + err);
    }
  });
}

const hints = document.querySelectorAll(".hint");
const question = document.querySelector(".question");
const answer = document.querySelector("#answer");
let question_number = 0;
if (question) {
  question_number = question.getAttribute("question_number");
  const loadProgress = async () => {
    try {
      const data = {
        question_number: parseInt(question_number),
        hint: {
          number: 1,
          status: true,
        },
      };
      const res = await fetch("/api/saveProgress", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error(err);
    }
  };
  loadProgress();
}
const status_emoji = document.querySelector("#status_emoji");
if (question) {
  question.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const data = {
        question_number: parseInt(question.getAttribute("question_number")),
        answer: answer.value,
      };
      console.log(JSON.stringify(data));
      const res = await fetch("/api/responseSubmit", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const data1 = await res.json();

      if (!data1.status) {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        setTimeout(() => {
          document.location.reload();
        }, 700);
      } else {
        if (status_emoji) {
          status_emoji.src = "/Assets/svgs/sad_emoji.svg";
          document.body.scrollTop = 0; // For Safari
          status_emoji.style.animation = "shake 1s ease-out";
          document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
          setTimeout(() => {
            status_emoji.style.animation = "none";
          }, 1000);
        }
      }
    } catch (err) {
      const res = await fetch("/api/decrementProgress", {
        method: "PUT",
      });
      const data = await res.json();
      if (data) {
        document.location.reload();
      }
    }
  });
}

hints.forEach((hint) => {
  hint.addEventListener("click", async () => {
    const hint_number = hint.getAttribute("hint_number");
    const hint_status = hint.getAttribute("hint_status");
    if (!hint_status) {
      try {
        const data = {
          question_number: parseInt(question_number),
          hint: {
            number: parseInt(hint_number),
            status: true,
          },
        };
        const res = await fetch("/api/saveProgress", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        hint.classList.remove("hidden");
        hint.setAttribute("hint_status", "true");
        hint.innerHTML = `<img src="/Assets/riddler/Riddler-${question_number}-hint-${hint_number}.png" alt="">`;
      } catch (err) {
        console.error(err);
      }
    }
  });
});
