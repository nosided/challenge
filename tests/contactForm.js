
const testUrl = 'http://automationpractice.com/index.php?controller=contact';

const inputFields = {
    contact : ".contact-form-box #id_contact",
    email : ".contact-form-box #email",
    order : ".contact-form-box #id_order",
    file : ".contact-form-box #fileUpload",
    message : ".contact-form-box #message",
    submit : ".contact-form-box #submitMessage",
}

const emptyField = "";

const testData = {
    contact : "2",
    email : "edison.pereira+test01@gmail.com",
    order : "000",
    message : "This is a test message",
}

const formAlerts = {
    successSelector : "p.alert-success",
    successMessage : "Your message has been successfully sent to our team.",
    failureSelector : "div.alert-danger",
    failureMessage : "Invalid email address.",
}

module.exports = {

    "Contact page is accesible" (browser) {
        browser
            .url(testUrl)
            .waitForElementVisible('body')
            .expect.element('#pagenotfound').to.not.be.present; //In case that the contact page is down, the user will be redirected to 404
    },

    "Form is visible" (browser) {
        browser
            .url(testUrl)
            .waitForElementVisible('.contact-form-box');
    },

    "Form is complete" (browser) {
        browser
            .url(testUrl)
            .waitForElementPresent(inputFields.contact)
            .waitForElementPresent(inputFields.email)
            .waitForElementPresent(inputFields.order)
            .waitForElementPresent(inputFields.file)
            .waitForElementPresent(inputFields.message)
            .waitForElementPresent(inputFields.submit)
    },

    //Currently none of the fields are required. At least Email and Message should be mandatory.
    "Validate empty fields error" (browser) {
        browser
            .url(testUrl)
            .setValue(inputFields.email, '')
            .setValue(inputFields.message, '')
            .submitForm(inputFields.submit)
            .click(inputFields.submit, function(result) {
                this.assert.strictEqual(result.status, 0);
              })
            .waitForElementVisible(formAlerts.failureSelector)
            .saveScreenshot('tests_output/empty_form_sent.png')
            .end();
    },

    "Validate number in email alert error" (browser) {
        browser
            .url(testUrl)
            .setValue(inputFields.email, '12345')
            .setValue(inputFields.message, 'Test message')
            .submitForm(inputFields.submit)
            .click(inputFields.submit, function(result) {
                this.assert.strictEqual(result.status, 0);
              })
            .waitForElementVisible(formAlerts.failureSelector)
            .assert.containsText(formAlerts.failureSelector + ' ol li', formAlerts.failureMessage)
            .saveScreenshot('tests_output/number_email_form_sent.png')
            .end();
    },

    "Validate successful form flow" (browser) {
        browser
            .url(testUrl)
            .click(".selector1 #uniform-id_contact")
            .waitForElementPresent(inputFields.contact)
            .keys(['\uE015', '\uE006'])
            .setValue(inputFields.email, testData.email)
            .setValue(inputFields.order, testData.order)
            .setValue(inputFields.message, testData.message)
            .submitForm(inputFields.submit)
            .click(inputFields.submit)
            .waitForElementVisible(formAlerts.successSelector)
            .assert.containsText(formAlerts.successSelector, formAlerts.successMessage)
            .saveScreenshot('tests_output/success_form_sent.png')
            .end();
    },

}