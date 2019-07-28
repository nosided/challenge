const testUrl = 'http://automationpractice.com/index.php?controller=contact';

module.exports = {
    "Contact Validation" (browser) {
        browser
            .url(testUrl)
            .waitForElementVisible('.form-control#message')
    }
}