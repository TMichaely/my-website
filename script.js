document.getElementById('addNotificationButton').addEventListener('click', function() {
    const newNotification = prompt("Enter new notification:");
    if(newNotification) {
        const notificationList = document.getElementById('notificationList');
        const newListItem = document.createElement('li');
        newListItem.textContent = newNotification;
        notificationList.appendChild(newListItem);
    }
});

// Toggle visibility of the notification panel
document.getElementById('notificationBell').addEventListener('click', function() {
    const notificationPanel = document.getElementById('notificationPanel');
    if(notificationPanel.style.display === 'none') {
        notificationPanel.style.display = 'block';
    } else {
        notificationPanel.style.display = 'none';
    }
});

// Change the bell color after 25 minutes (1500000 milliseconds)
setTimeout(function() {
    document.getElementById('notificationBell').style.color = 'red';
}, 1200000); // 25 * 60 * 1000 ms


let languageFromParentWindow = "English"; // Default Language

// Handle language change from the dropdown
document.getElementById("languageSelect").addEventListener("change", function() {
    languageFromParentWindow = this.value;
    console.log(`Language switched to: ${languageFromParentWindow}`);
    setLanguageForEmbeddedService(languageFromParentWindow);
});

//Salesforce Embedded Service Deployment JS Code begins
function initEmbeddedMessaging() {
    try {
        embeddedservice_bootstrap.settings.language = 'en_US';
        embeddedservice_bootstrap.settings.enableUserInputForConversationWithBot = false;
        //embeddedservice_bootstrap.settings.hideChatButtonOnLoad = true;
        embeddedservice_bootstrap.init(
            '00DHs00000Clx3e',
            'SDO_Messaging_Innovation_Day_Glitch_Blue_Horizon',
            'https://storm-afedf835096def.my.site.com/ESWSDOMessagingInnovati1730124818682', {
                scrt2URL: 'https://storm-afedf835096def.my.salesforce-scrt.com'
            }
        );
    } catch (err) {
        console.error('Error loading Embedded Messaging: ', err);
    }
}

window.addEventListener("onEmbeddedMessagingReady", () => {
    console.log("The Salesforce Org id is: " + embeddedservice_bootstrap.settings.orgId);
    console.log("The language set is: " + languageFromParentWindow);
    embeddedservice_bootstrap.prechatAPI.setVisiblePrechatFields({
        "_firstName": {
            "value": "Lauren",
            "isEditableByEndUser": false
        },
        "_lastName": {
            "value": "Bailey",
            "isEditableByEndUser": false
        },
        "_email": {
            "value": "rshekhar@salesforce.com",
            "isEditableByEndUser": false
        },
        "_subject": {
            "value": "Need to checkin for my trip",
            "isEditableByEndUser": true
        }
    });
    embeddedservice_bootstrap.prechatAPI.setHiddenPrechatFields({
        "Prechat_Language": languageFromParentWindow
    });
});
//Salesforce Embedded Service Deployment JS Code ends

function initiateChatWithAgent() {
    embeddedservice_bootstrap.utilAPI.launchChat();
}

function setLanguageForEmbeddedService(language) {
    if(language === 'English') embeddedservice_bootstrap.utilAPI.showChatButton();
    else embeddedservice_bootstrap.utilAPI.hideChatButton();
    embeddedservice_bootstrap.prechatAPI.setHiddenPrechatFields({
        "Prechat_Language": language
    });
   console.log(`Language switched in embedded service: ${language}`);   
}
