class Session
{

    getAllItems()
    {
        return cy.get(".card-body b")
    }

    getAddToCartButton()
    {
        return cy.get(".card-body button:last-of-type")
    }
    
    getCartButton()
    {
        return cy.get("[routerlink*='cart']")
    }

    getSuccessMessage(options = {})
    {
        return cy.get('.ng-trigger > .ng-tns-c4-1', options)
    }

    getCheckout()
    {
        return cy.contains("Checkout")
    }

    getTextField()
    {
        return cy.get('input[type="text"]')
    }
    
    getCountry()
    {
        return cy.get("[placeholder*='Country']")
    }

    getList()
    {
        return cy.get('.ta-results button')
    }

    getPlaceOrder()
    {
        return cy.get(".action__submit")
    }

    getFiletoDownload()
    {
        return  cy.get(".order-summary button")
    }

    getInvoiceNo()
    {
        return cy.get('tr td label[class="ng-star-inserted"]')
    }
}

export default Session;