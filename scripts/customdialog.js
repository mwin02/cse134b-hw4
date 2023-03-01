// AlertDialog class with an alert html dialog and a button to prompt the alert
class AlertDialog extends HTMLElement {
  constructor() {
    super();
    //creates a dialog with "Alert Pressed" text displayed
    let dialog = document.createElement("dialog");
    dialog.innerHTML = `<p>Alert Pressed</p>`;

    //creates button to dismiss the Dialog
    let dismissBtn = document.createElement("button");
    dismissBtn.innerText = "Ok";
    dismissBtn.addEventListener("click", () => dialog.close());
    dialog.appendChild(dismissBtn);

    //create button to prompt the dialog
    let alertBtn = document.createElement("button");
    alertBtn.innerText = "Alert";
    alertBtn.addEventListener("click", () => dialog.showModal());

    //append the hidden dialog and the button to the custom element
    this.appendChild(dialog);
    this.appendChild(alertBtn);
  }
}

//ConfirmDialog class with a html dialog confirmation prompt and a button to trigger it
class ConfirmDialog extends HTMLElement {
  constructor() {
    super();
    //Creates a Dialog with "Do You Confirm This" text displayed
    let dialog = document.createElement("dialog");
    dialog.innerHTML = `<p>Do You Confirm This?</p>`;

    let result = false;
    //creates a cancel button that will set result to false and dismiss the dialog
    let cancelBtn = document.createElement("button");
    cancelBtn.innerText = "Cancel";
    cancelBtn.addEventListener("click", () => {
      result = false;
      dialog.close();
    });
    dialog.appendChild(cancelBtn);
    //creates a confirm button that will set result to true and dismiss the dialog
    let yesBtn = document.createElement("button");
    yesBtn.innerText = "Yes";
    yesBtn.addEventListener("click", () => {
      result = true;
      dialog.close();
    });
    dialog.appendChild(yesBtn);

    //with the output-id attribute, the dialog will determine where to display the output
    let output = this.hasAttribute("output-id")
      ? document.getElementById(this.getAttribute("output-id"))
      : null;

    //on dialog close, display the result at the specified output
    dialog.addEventListener("close", () => {
      if (output) {
        output.innerText = `The value returned by the confirm method is : ${result}`;
      }
    });

    //create button that will prompt the confirm dialog
    let confirmBtn = document.createElement("button");
    confirmBtn.innerText = "Confirm";
    confirmBtn.addEventListener("click", () => dialog.showModal());

    //append the hidden dialog and button to custom-dialog element
    this.appendChild(dialog);
    this.appendChild(confirmBtn);
  }
}

//ConfirmDialog class with a html dialog prompt and a button to trigger it
class PromptDialog extends HTMLElement {
  constructor() {
    super();
    //create a dialog with "What is your name?" text displayed
    let dialog = document.createElement("dialog");
    dialog.innerHTML = `<p>What is your name?</p>`;

    //create an input that is appended to the dialog
    let inputBox = document.createElement("input");
    inputBox.type = "text";
    dialog.appendChild(inputBox);
    let input = "";

    //create a cancel button that will set input to the empty string and dismiss the dialog
    let cancelBtn = document.createElement("button");
    cancelBtn.innerText = "Cancel";
    cancelBtn.addEventListener("click", () => {
      input = "";
      dialog.close();
    });
    //create a yes button that will set input to the value inside the input box and dismiss the dialog
    let yesBtn = document.createElement("button");
    yesBtn.innerText = "Yes";
    yesBtn.addEventListener("click", () => {
      input = inputBox.value;
      dialog.close();
    });
    dialog.appendChild(cancelBtn);
    dialog.appendChild(yesBtn);

    //with the output-id attribute, the dialog will determine where to display the output
    let output = this.hasAttribute("output-id")
      ? document.getElementById(this.getAttribute("output-id"))
      : null;

    //on dialog close, sanitize the input and display it at the specified output
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

    //create button that will prompt the prompt dialog
    let promptBtn = document.createElement("button");
    promptBtn.innerText = "Prompt";
    promptBtn.addEventListener("click", () => dialog.showModal());

    //append the hidden dialog and button to custom-prompt element
    this.appendChild(dialog);
    this.appendChild(promptBtn);
  }
}

export { AlertDialog, ConfirmDialog, PromptDialog };
