const buttons_container = document.querySelector(".buttons");

const buttons = [
  ["Switch", Switch],
  ["AND", AND],
  ["Bulb", Bulb],
  ["OR", OR],
  ["NOT", NOT],
  ["NOR", NOR],
  ["XOR", XOR],
  ["NAND", NAND]
];

(function () {
  for (let i = 0; i < buttons.length; ++i) {
    let button = document.createElement("button");
    button.innerText = buttons[i][0];
    button.addEventListener("click", function () {
      gates.push(new buttons[i][1](30, 30));
    });
    buttons_container.appendChild(button);
  }
})();
