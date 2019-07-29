
const testUrl = 'http://automationpractice.com/index.php';

const inputFields = {
    contact : ".contact-form-box #id_contact",
    email : ".contact-form-box #email",
    order : ".contact-form-box #id_order",
    file : ".contact-form-box #fileUpload",
    message : ".contact-form-box #message",
    submit : ".contact-form-box #submitMessage",
}

const searchQuery = "Blouse";

module.exports = {

    "Page is accesible" (browser) {
        browser
            .url(testUrl)
            .waitForElementVisible('body')
            .expect.element('#pagenotfound').to.not.be.present; //In case that the contact page is down, the user will be redirected to 404
    },

    "Search empty field" (browser) {
        browser
            .url(testUrl)
            .waitForElementPresent("#searchbox .search_query")
            .setValue("#searchbox .search_query", '')
            .click("#searchbox .button-search")
            .waitForElementVisible(".alert-warning")
            .assert.containsText(".alert-warning", "Please enter a search keyword")

    },

    "Validate keyword in the title of the results" (browser) {
        browser
            .url(testUrl)
            .waitForElementVisible("#searchbox .search_query")
            .setValue("#searchbox .search_query", searchQuery)
            .click("#searchbox .button-search")
            .waitForElementVisible(".product-container")
            .pause(3000)
            .assert.containsText('.product_list .product-container .product-name', searchQuery)
    },

}