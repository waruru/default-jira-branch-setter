document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('settings-form');
  const repoInput = document.getElementById('repoName');
  const branchInput = document.getElementById('branchName');
  const currentRepoDisplay = document.getElementById('currentRepoName');
  const currentBranchDisplay = document.getElementById('currentBranchName');

  // Load settings and display current values
  chrome.storage.sync.get(['repoName', 'branchName'], (data) => {
    const currentRepo = data.repoName || 'Not set';
    const currentBranch = data.branchName || 'Not set';
    currentRepoDisplay.textContent = `Current: ${currentRepo}`;
    currentBranchDisplay.textContent = `Current: ${currentBranch}`;
    
    // Also set as placeholder or field values
    repoInput.value = currentRepo;
    branchInput.value = currentBranch;
  });

  // Save settings and update current display
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const newRepoName = repoInput.value;
    const newBranchName = branchInput.value;

    chrome.storage.sync.set({
      repoName: newRepoName,
      branchName: newBranchName,
    }, () => {
      currentRepoDisplay.textContent = `Current: ${newRepoName}`;
      currentBranchDisplay.textContent = `Current: ${newBranchName}`;
      console.log('Settings saved');
    });
  });
});