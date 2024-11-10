(function() {
  console.log("Script executed on the target site.");

  // Example: Change the background color of the site
  document.body.style.backgroundColor = 'lightblue';

  chrome.storage.sync.get(['repoName', 'branchName'], (data) => {
    const repoName = data.repoName || 'default/Repo';  // Default value
    const branchName = data.branchName || 'defaultBranch';     // Default value

    function updateInputValueAndDisplay(parentId, displayClassName, inputId, inputValueAndDisplayText) {
      const parentElement = document.getElementById(parentId);

      if (parentElement) {
        const displayElement = parentElement.querySelector(`.${displayClassName}`);

        if (displayElement) {
          const inputElement = document.querySelector(`#${inputId}`);

          if (inputElement) {
            inputElement.value = inputValueAndDisplayText;
            displayElement.textContent = inputValueAndDisplayText;
            console.log(`Extension: Set ${inputId} to ${inputValueAndDisplayText}`);
          } else {
            console.log(`#${inputId} is not found.`);
          }
        } else {
          console.log(`.${displayClassName} is not found in #${parentId}.`);
        }
      } else {
        console.log(`#${parentId} is not found.`);
      }
    }

    updateInputValueAndDisplay("s2id_ghRepo", "select2-chosen", "ghRepo", repoName);
    updateInputValueAndDisplay("s2id_ghParentBranch", "select2-chosen", "ghParentBranch", branchName);
  });
  function focusOnInput(inputId) {
    const inputElement = document.getElementById(inputId);

    if (inputElement) {
      inputElement.focus();  // Set focus to the input element
      console.log(`Set focus to input with ID "${inputId}".`);
      inputElement.setAttribute('tabindex', 1);
      inputElement.value = `feature/${inputElement.value}`;
      window.setTimeout(() => inputElement.focus(), 0);
    } else {
        console.log(`Input with ID "${inputId}" not found.`);
    }
  }
  focusOnInput("branchNameText")
})();