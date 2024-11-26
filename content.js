(() => {
  const replaceTextWithResponse = async () => {
    // const elements = document.querySelectorAll("div[id^='comment-tree'], div[id^='comment-tree'] *");
    const elements = document.querySelectorAll("body, body *");
    for (let element of elements) {
      if (
        element.childNodes.length === 1 &&
        element.childNodes[0].nodeType === Node.TEXT_NODE
      ) {
        const originalText = element.textContent.trim();

        if (originalText) {
          try {
            // Send the text to the Flask app
            const response = await fetch("http://127.0.0.1:5000/process", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ text: originalText }),
            });
          
            const data = await response.json();
            if (data.processed_text) {
                element.textContent = data.processed_text; // Replace with processed text
              }
            } catch (error) {
                console.error("Error communicating with Flask app:", error);
            }
          // element.textContent = "*".repeat(originalText.length);
        }
      }
    }
  };

  // // Set up a MutationObserver to watch for dynamically added comments
  // const observer = new MutationObserver((mutations) => {
  //   mutations.forEach((mutation) => {
  //     // If new nodes are added, process them
  //     if (mutation.addedNodes.length > 0) {
  //       replaceTextWithResponse();
  //     }
  //   });
  // });

  // // Start observing the entire body for changes (including new comments being loaded)
  // observer.observe(document.body, { childList: true, subtree: true });

  replaceTextWithResponse();
})();
