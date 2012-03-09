// For an introduction to the Grid template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=232446
(function () {
    "use strict";

    var app = WinJS.Application;

    app.onactivated = function (eventObject) {
        if (eventObject.detail.kind === Windows.ApplicationModel.Activation.ActivationKind.launch) {
            if (eventObject.detail.previousExecutionState !== Windows.ApplicationModel.Activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. 
                // Initialize your application here.
            } else {
                // TODO: This application has been reactivated from suspension. 
                // Restore application state here.
            }
            WinJS.UI.processAll();
        }
        else if (eventObject.detail.kind == Windows.ApplicationModel.Activation.ActivationKind.shareTarget) {
            var shareOperation = eventObject.detail.shareOperation;
            id("title").innerText = shareOperation.data.properties.title;
            id("description").innerText = shareOperation.data.properties.description;

            // Display a thumbnail if available
            if (shareOperation.data.properties.thumbnail) {
                shareOperation.data.properties.thumbnail.openReadAsync().then(function (thumbnailStream) {
                    var thumbnailBlob = MSApp.createBlobFromRandomAccessStream(thumbnailStream.contentType, thumbnailStream);
                    var thumbnailUrl = URL.createObjectURL(thumbnailBlob, false);
                    id("thumbnailImage").src = thumbnailUrl;
                    id("thumbnailArea").className = "unhidden";
                });
            }
        }
    };

    app.oncheckpoint = function (eventObject) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the 
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // eventObject.setPromise(). 
    };

    function id(elementId) {
        return document.getElementById(elementId);
    }

    app.start();
})();
