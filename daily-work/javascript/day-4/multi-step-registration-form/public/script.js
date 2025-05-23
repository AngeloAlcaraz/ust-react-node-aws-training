initMultiStepForm();

function initMultiStepForm() {
  const progressNumber = document.querySelectorAll(".step").length;
  const slidePage = document.querySelector(".slide-page");
  const submitBtn = document.querySelector(".submit");
  const progressText = document.querySelectorAll(".step p");
  const progressCheck = document.querySelectorAll(".step .check");
  const bullet = document.querySelectorAll(".step .bullet");
  const pages = document.querySelectorAll(".page");
  const nextButtons = document.querySelectorAll(".next");
  const prevButtons = document.querySelectorAll(".prev");
  const stepsNumber = pages.length;

  if (progressNumber !== stepsNumber) {
    console.warn(
      "Error, number of steps in progress bar do not match number of pages"
    );
  }

  document.documentElement.style.setProperty("--stepNumber", stepsNumber);

  let current = 1;

  for (let i = 0; i < nextButtons.length; i++) {
    nextButtons[i].addEventListener("click", function (event) {
      event.preventDefault();

      inputsValid = validateInputs(this);
      // inputsValid = true;

      if (inputsValid) {
        slidePage.style.marginLeft = `-${(100 / stepsNumber) * current}%`;
        bullet[current - 1].classList.add("active");
        progressCheck[current - 1].classList.add("active");
        progressText[current - 1].classList.add("active");
        current += 1;
      }
    });
  }

  for (let i = 0; i < prevButtons.length; i++) {
    prevButtons[i].addEventListener("click", function (event) {
      event.preventDefault();
      slidePage.style.marginLeft = `-${(100 / stepsNumber) * (current - 2)}%`;
      bullet[current - 2].classList.remove("active");
      progressCheck[current - 2].classList.remove("active");
      progressText[current - 2].classList.remove("active");
      current -= 1;
    });
  }
  submitBtn.addEventListener("click", function () {
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;
    setTimeout(function () {
      alert("Your Form Successfully Signed up");
      location.reload();
    }, 800);
  });

  function validateInputs(ths) {
    let inputsValid = true;

    const inputs = ths.parentElement.parentElement.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
      const valid = inputs[i].checkValidity();
      if (!valid) {
        inputsValid = false;
        inputs[i].classList.add("invalid-input");
      } else {
        inputs[i].classList.remove("invalid-input");
      }
    }
    return inputsValid;
  }

  // Guarda todos los valores de inputs y selects de la página actual en localStorage
  function saveCurrentPageData(clickedButton) {
    const currentPage = clickedButton.closest(".page");
    if (!currentPage) return;

    const inputs = currentPage.querySelectorAll("input, select");
    inputs.forEach((input) => {
      if (input.name) {
        localStorage.setItem(input.name, input.value); // Guardar en localStorage
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    const nextButtons = document.querySelectorAll(".next");
    const submitButton = document.querySelector(".submit");

    nextButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        saveCurrentPageData(e.target);
      });
    });

    if (submitButton) {
      submitButton.addEventListener("click", function (e) {
        saveCurrentPageData(e.target);       

        // Enviar datos al servidor
        const formData = {};
        const inputs = document.querySelectorAll("input, select");
        inputs.forEach((input) => {
          formData[input.name] = input.value;
        });

        // Enviar los datos al servidor (API)
        fetch("/api/data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Enviar los datos en formato JSON
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.message);
            alert(data.message); // Mostrar mensaje de éxito
          })
          .catch((error) => {
            console.error("Error:", error); // Manejar errores
          });
      });
    }
  });
}
