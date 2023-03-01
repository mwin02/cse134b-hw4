class AlertDialog extends HTMLElement {
  constructor() {
    super();
    let dialog = document.createElement("dialog");
    dialog.innerHTML = `<p>Alert Pressed</p>`;
    let dismissBtn = document.createElement("button");
    dismissBtn.innerText = "Ok";
    dismissBtn.addEventListener("click", () => dialog.close());
    dialog.appendChild(dismissBtn);

    let alertBtn = document.createElement("button");
    alertBtn.innerText = "Alert";
    alertBtn.addEventListener("click", () => dialog.showModal());

    this.appendChild(dialog);
    this.appendChild(alertBtn);
  }
}

class ConfirmDialog extends HTMLElement {
  constructor() {
    super();
    let dialog = document.createElement("dialog");
    dialog.innerHTML = `<p>Do You Confirm This?</p>`;
    let cancelBtn = document.createElement("button");
    let result = false;

    cancelBtn.innerText = "Cancel";
    cancelBtn.addEventListener("click", () => {
      result = false;
      dialog.close();
    });
    dialog.appendChild(cancelBtn);
    let yesBtn = document.createElement("button");
    yesBtn.innerText = "Yes";
    yesBtn.addEventListener("click", () => {
      result = true;
      dialog.close();
    });
    dialog.appendChild(yesBtn);

    let output = this.hasAttribute("output-id")
      ? document.getElementById(this.getAttribute("output-id"))
      : null;

    dialog.addEventListener("close", () => {
      if (output) {
        output.innerText = `The value returned by the confirm method is : ${result}`;
      }
    });

    let confirmBtn = document.createElement("button");
    confirmBtn.innerText = "Confirm";
    confirmBtn.addEventListener("click", () => dialog.showModal());

    this.appendChild(dialog);
    this.appendChild(confirmBtn);
  }
}

class PromptDialog extends HTMLElement {
  constructor() {
    super();
    let dialog = document.createElement("dialog");
    dialog.innerHTML = `<p>What is your name?</p>`;

    let inputBox = document.createElement("input");
    inputBox.type = "text";
    dialog.appendChild(inputBox);

    let input = "";
    let cancelBtn = document.createElement("button");
    cancelBtn.innerText = "Cancel";
    cancelBtn.addEventListener("click", () => {
      input = "";
      dialog.close();
    });
    let yesBtn = document.createElement("button");
    yesBtn.innerText = "Yes";
    yesBtn.addEventListener("click", () => {
      input = inputBox.value;
      dialog.close();
    });
    dialog.appendChild(cancelBtn);
    dialog.appendChild(yesBtn);

    let output = this.hasAttribute("output-id")
      ? document.getElementById(this.getAttribute("output-id"))
      : null;

    dialog.addEventListener("close", () => {
      if (output) {
        let cleanPrompt = DOMPurify.sanitize(input, {
          USE_PROFILES: { html: false },
          KEEP_CONTENT: false,
        });
        if (!cleanPrompt || cleanPrompt === "") {
          output.innerHTML = "User didn’t enter anything";
        } else {
          output.innerHTML = `Prompt Result: ${cleanPrompt}`;
        }
      }
      inputBox.value = "";
    });

    let promptBtn = document.createElement("button");
    promptBtn.innerText = "Prompt";
    promptBtn.addEventListener("click", () => dialog.showModal());

    this.appendChild(dialog);
    this.appendChild(promptBtn);
  }
}

export { AlertDialog, ConfirmDialog, PromptDialog };
