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
