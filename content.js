(() => {
  const replaceTextWithResponse = async () => {
    // Target Reddit comments
    const elements = document.querySelectorAll("div[id^='comment-tree'], div[id^='comment-tree'] *");
    for (let element of elements) {
      if (
        element.childNodes.length === 1 &&
        element.childNodes[0].nodeType === Node.TEXT_NODE
      ) {
        const originalText = element.textContent.trim();

        if (originalText) {
          try {
            // Send the text to ModelBit API
            const response = await fetch("https://mohammedanaskazi.us-east-1.aws.modelbit.com/v1/predict_cyberbullying/latest", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ data: originalText }),
            });
          
            const data = await response.json();
            // Check prediction probability (second element in the data array)
            // If probability > 0.5, consider it as cyberbullying
            if (data.data && data.data[1] > 0.5) {
              // Replace harmful content with asterisks
              element.textContent = "*".repeat(originalText.length);
            }
          } catch (error) {
            console.error("Error communicating with ModelBit API:", error);
          }
        }
      }
    }
  };

  // Set up a MutationObserver to watch for dynamically added comments
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      // If new nodes are added, process them
      if (mutation.addedNodes.length > 0) {
        replaceTextWithResponse();
      }
    });
  });

  // Start observing the entire body for changes (including new comments being loaded)
  observer.observe(document.body, { childList: true, subtree: true });

  // Initial scan of comments
  replaceTextWithResponse();
})();
