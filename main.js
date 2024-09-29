// ! ---------------- time out --------------------

const countdown = document.querySelector(".countdown");
const targetDate = new Date("2024-10-25T17:00:00");

function updateCountdown() {
  const now = new Date();
  const remainingTime = targetDate - now;

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days.toString().padStart(2, "0");
  document.getElementById("hours").innerText = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").innerText = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").innerText = seconds
    .toString()
    .padStart(2, "0");
}

// Обновляем счетчик каждую секунду
setInterval(updateCountdown, 1000);

// ! -------------------------   ---------------------------

let kglang = document.querySelector("#kg-link");
let form = document.querySelector("form");
let btnSubmit = document.querySelector("button[type='submit']");
let newGuest = document.querySelector("#check_guest");
let loader1 = document.querySelector(".loader1");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Предотвращаем стандартное поведение формы
  btnSubmit.style.display = "none";
  loader1.style.display = "block";

  fetch(
    "https://script.google.com/macros/s/AKfycbysVFJuw0ArB1FdP1PWkA1JWwo47sy2h3ZxEiSJsRhm7rT91ZGwF1ofH7NdjemsCtns/exec",
    {
      method: "POST",
      body: new FormData(form),
    }
  )
    .then((response) => {
      response.text();
    })
    .then((text) => {
      console.log(text);
      loader1.style.display = "none";
      newGuest.style.display = "flex";
      newGuest.innerText =
        kglang.innerText === "кыргызча"
          ? "Сиздин жообуңуз ийгиликтүү жөнөтүлдү!"
          : "Ваши данные успешно отправлены!";
    })
    .catch((error) => {
      console.error("Error:", error);
      loader1.style.display = "none";
      newGuest.style.display = "flex";
      newGuest.innerText =
        kglang.innerText === "кыргызча"
          ? "Ката кетти! Баракты кайра жүктөп, кайра аракет кылыңыз!"
          : "Произошла ошибка! Перезагрузите страницу и попробуйте снова!";
    });
});
