function CopyLink() {
    // Get the link
    var copyText = window.location.href;
  
     // Copy the link
    navigator.clipboard.writeText(copyText);
  
    // Alert the copied link
    alert("Copied the text: " + copyText);
  }
  