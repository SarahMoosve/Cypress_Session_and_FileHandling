/// <reference types="Cypress" />

//const excelToJson = require('convert-excel-to-json')
const neatCSV = require('neat-csv')
const XLSX = require('xlsx')
//const excelToJson = require('convert-excel-to-json')
//const fs = require('fs')

import Session from "../pageObject/Session"

let prodName, invoiceNo
describe('JWT Session ', () => {

  before(function()  {
    cy.fixture('example').then(function(data)
    {
            this.data=data
    })   

    })

it('Logged in local storage', function() 
{
  const session=new Session()
    cy.LoginAPI().then(function()
    {
        cy.visit(Cypress.env('url') + "/client", 
        {
            onBeforeLoad: function(window)
            {
                window.localStorage.setItem('token', Cypress.env('token'))
            }
        })
    })

  session.getAllItems().eq(1).then (function($e1){
    prodName = $e1.text()
  })

  session.getAddToCartButton().eq(1).click()

  session.getCartButton().click()

  session.getSuccessMessage({ timeout: 10000 }).should('have.text', ' Product Added To Cart ')

  session.getCheckout().click()

  session.getTextField().eq(1).type(this.data.cvv)

  session.getTextField().eq(2).type(this.data.name)

  session.getTextField().eq(3).type(this.data.coupon)



  session.getCountry().type(this.data.SearchDeliveryLocation)

  session.getList().each(($e1, index, $list) => {



    if($e1.text()===" Germany")

    {

        cy.wrap($e1).click()

    }

})

session.getPlaceOrder().click();

cy.wait(2000)

 session.getFiletoDownload().eq(0).click()
 session.getFiletoDownload().eq(1).click()

 

  session.getInvoiceNo().then(function($e1){
    invoiceNo=$e1.text().split("|")[1].trim()
  })

 //XLSX file

  cy.readFile(Cypress.config("fileServerFolder") + "/cypress/downloads/order-invoice_sarah.xlsx", 'binary').then(excelData => {
    const workbook = XLSX.read(excelData, { type: 'binary' })
    const sheetName = workbook.SheetNames[0]
    const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
    console.log(jsonData)
   
    const actualProductXLSX = jsonData[0] ["Product Name"]
    expect(prodName).to.equal(actualProductXLSX)
    const actualInvIDXLSX = jsonData[0] ["Invoice Number"]
    expect(invoiceNo).to.equal(actualInvIDXLSX)


     //CSV File

  cy.readFile(Cypress.config("fileServerFolder")+ "/cypress/downloads/order-invoice_sarah.csv").then (async (text) =>
  {

    const csv = await neatCSV(text)
    console.log(csv)
    const actualProductCSV = csv[0] ["Product Name"]
    expect(prodName).to.equal(actualProductCSV)
    const actualInvIDCSV = csv[0] ["Invoice Number"]
    expect(invoiceNo).to.equal(actualInvIDCSV)
  })

//another method for XLSX
/*const filePath= Cypress.config("fileServerFolder") + "/cypress/downloads/order-invoice_sarah.xlsx"
cy.task('excelToJsonConverter', filePath).then(function(result)
{
    cy.log(result.data[1].A)
    expect(prodName).to.equal(result.data[1].B)
})

//if you just need to check the content irrespective of the position where the data appears

cy.readFile(filePath).then(function(text){
    expect(text).to.include("productName")
})
*/
});
})
})