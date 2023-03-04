let defaultAlertContainerId = 'alert-container-fluid';
let renderNotificationElement = (bannerId, bannerType, message, containerId, bannerIcon) => {
    if (!containerId) {
        containerId = defaultAlertContainerId;
    }

    let container = document.getElementById(containerId);

    if (!container) {
        return;
    }

    let containerContent = container.innerHTML;

    let renderAlertElement = (message) => {
        return `
            <div class='alert alert-dismissable ${bannerType}'>
                <button type="button" class="close" data-dismiss="alert">
                    &times;
                </button>
                <div class="icon-alert-container">
                 <i class="far ${bannerIcon} fa-lg"></i>
                    ${message}
                 </div>
            </div>
        `;
    };

    // Handle multiple messages to be rendered as list item
    if (Array.isArray(message)) {
        message.forEach((msg) => {
            containerContent += renderAlertElement(msg);
        });
    } else {
        containerContent += renderAlertElement(message);
    }

    container.innerHTML = containerContent;
};

// showSuccess and showWarning needs more confirmation before implementing.
let alertElement;

let AlertNotification = class AlertNotification {
    constructor() {
        this.containerId = defaultAlertContainerId;
    }

    setAlertContainerId(containerId) {
        this.containerId = containerId ?? defaultAlertContainerId;
    }

    showError(message, formElement, timeMsShow, stack) {
        if (!stack) {
            this.clear();
        }

        let alertElementId = 'alertBannerErrorJS';
        renderNotificationElement(alertElementId, 'alert-danger', message, this.containerId, 'fa-circle-xmark', 'showErrorClass');

        // Add .is-invalid to input elements against the error message
        if (formElement) {
            if (Array.isArray(formElement)) {
                formElement.forEach((fe) => {
                    if (fe !== null) {
                        if (fe.id) {
                            document.getElementById(fe.id).classList.add('is-invalid');
                            return;
                        }
                        fe.classList.add('is-invalid');
                    }
                });
            } else {
                formElement.classList.add('is-invalid');
            }
        }

        alertElement = document.getElementById(this.containerId);
        if (timeMsShow) {
            var self = this;
            setTimeout(function () {
                self.clear();
            }, timeMsShow);
        }

        return alertElement;
    }

    showSuccess(message, timeOutInSeconds) {
        this.clear();

        let alertElementId = 'alertBannerSuccessJS';
        renderNotificationElement(alertElementId, 'alert-success', message, this.containerId, 'fa-circle-check', 'showSuccessClass');

        alertElement = document.getElementById(this.containerId);

        this.timedOutClear(timeOutInSeconds);

        return alertElement;
    }

    showWarning(message, timeOutInSeconds) {
        this.clear();

        let alertElementId = 'alertBannerErrorJS';
        renderNotificationElement(alertElementId, 'alert-warning', message, this.containerId, 'fa-warning');

        alertElement = document.getElementById(this.containerId);

        if (timeOutInSeconds !== undefined) {
            this.timedOutClear(timeOutInSeconds);
        }

        return alertElement;
    }

    validationResponseError(errors) {
        let messages = [];
        let formElements = [];

        for (let key in errors) {
            errors[key].forEach((message) => {
                messages.push(message);
            });

            let targetElement = document.getElementById(key);

            if (targetElement) {
                formElements.push(targetElement);
            }
        }

        this.showError(messages, formElements);
    }

    clear() {
        let containerElement = document.getElementById(this.containerId);
        if (containerElement) {
            containerElement.innerHTML = '';
        }

        let alertElement = document.querySelector('.alert.alert-dismissable');
        if (alertElement) {
            alertElement.remove();
        }

        this.removeAllIsInvalidElements();
    }

    timedOutClear(seconds = 5) {
        setTimeout(() => this.clear(), seconds * 1000);
    }

    removeAllIsInvalidElements() {
        // Remove all .is-invalid input elements
        let elementsWithInvalid = document.querySelectorAll('.is-invalid');
        for (let i = 0; i < elementsWithInvalid.length; i++) {
            elementsWithInvalid[i].classList.remove('is-invalid');
        }
    }
}

window.AlertNotif = new AlertNotification; // For debugging, keep this for now.

export default AlertNotification = new AlertNotification;
