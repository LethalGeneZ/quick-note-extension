// Load the saved note when the popup opens
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['myNote'], (result) => {
    if (result.myNote) {
      document.getElementById('noteField').value = result.myNote;
    }
  });
});

// Save the note to local storage AND download as a file
document.getElementById('saveBtn').addEventListener('click', () => {
  const noteContent = document.getElementById('noteField').value;

  // 1. Save to browser memory (so it stays in the text box)
  chrome.storage.local.set({ myNote: noteContent });

  // 2. Create a "Blob" (the file data)
  const blob = new Blob([noteContent], { type: 'text/plain' });
  
  // 3. Create a temporary URL for the file
  const url = URL.createObjectURL(blob);

  // 4. Trigger the download popup
  chrome.downloads.download({
    url: url,
    filename: 'my-quick-note.txt',
    saveAs: true // This forces the "Save As" popup to appear
  }, () => {
    // Cleanup the temporary URL
    URL.revokeObjectURL(url);
  });
});