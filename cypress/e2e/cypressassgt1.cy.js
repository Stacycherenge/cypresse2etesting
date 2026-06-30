//Validating the homepage: PART 2
describe('Homepage Validation', () => {
  beforeEach(() => {
    cy.visit('https://automationexercise.com')
  })

  it('successfully loads the homepage', () => {
    
    cy.url().should('include', 'https://automationexercise.com') 

    cy.title().should('include', 'Automation Exercise') 

    cy.get('.logo.pull-left')
    .should('be.visible')

    cy.get('.nav.navbar-nav')
    .should('be.visible')

    cy.get('.nav.navbar-nav')
    .contains('login')
    .should('be.visible')
    //cy.get('.nav.navbar-nav li a').eq(3).should('be.visible')
  })
})


//Registration of new user: PART 3
describe('Signup test', () => {
  it('creates a new user successfully', () => {

    const timestamp = Date.now()
    const name = `Student${timestamp}`
    const email = `student${timestamp}@test.com`

    
    cy.visit('https://automationexercise.com/')

    
    cy.get('.shop-menu')
      .contains('Signup / Login')
      .should('be.visible')
      .click()

   
    cy.get('input[data-qa="signup-name"]')
      .should('be.visible')
      .type(name)

    cy.get('input[data-qa="signup-email"]')
      .should('be.visible')
      .type(email)

    
    cy.get('button[data-qa="signup-button"]')
      .should('be.visible')
      .click()

    
    cy.get('input[value="Mr"]')
      .should('be.visible')
      .check()

    cy.get('#password')
      .should('be.visible')
      .type('Test@12345')

    cy.get('#days').select('10')
    cy.get('#months').select('May')
    cy.get('#years').select('1990')

    cy.get('#newsletter').check()
    cy.get('#optin').check()

   
    cy.get('#first_name').type('Mary')
    cy.get('#last_name').type('Jane')
    cy.get('#company').type('TestCompany')
    cy.get('#address1').type('456 Utalii Lane')
    cy.get('#address2').type('Apartment 444')

    cy.get('#country').select('India')
    cy.get('#state').type('Nairobi')
    cy.get('#city').type('  Utawala')
    cy.get('#zipcode').type('000234')
    cy.get('#mobile_number').type('2547890978')

    
    cy.contains('button', 'Create Account')
      .should('be.visible')
      .scrollIntoView()
      .click({ force: true })

    
    cy.get('[data-qa="account-created"]')
      .should('be.visible')
      .and('contain', 'Account Created!')

    
    cy.get('[data-qa="continue-button"]').click()

    
    cy.get('.navbar-nav')
      .should('be.visible')
      .and('contain', `Logged in as ${name}`)

    
    cy.get('a[href="/delete_account"]')
      .should('be.visible')
      .click()

    
    cy.get('[data-qa="account-deleted"]')
      .should('be.visible')
      .and('contain', 'Account Deleted!')

    
    cy.get('[data-qa="continue-button"]').click()
  })
})



//login with valid credentials: PART 4
describe('Login test', () => {
  it('logs in and logs out user successfully', () => {

    const timestamp = Date.now()
    const name = `Student${timestamp}`
    const email = `student${timestamp}@test.com`

    
    cy.visit('https://automationexercise.com/')
    cy.get('.shop-menu').contains('Signup / Login').click()

    cy.get('input[data-qa="signup-name"]').type(name)
    cy.get('input[data-qa="signup-email"]').type(email)
    cy.get('button[data-qa="signup-button"]').click()

    cy.get('input[value="Mr"]').check()
    cy.get('#password').type('Test@12345')
    cy.get('#days').select('14')
    cy.get('#months').select('May')
    cy.get('#years').select('1995')

    cy.get('#first_name').type('John')
    cy.get('#last_name').type('Doe')
    cy.get('#address1').type('123 Main Street')
    cy.get('#country').select('India')
    cy.get('#state').type('Karnataka')
    cy.get('#city').type('Bangalore')
    cy.get('#zipcode').type('560001')
    cy.get('#mobile_number').type('9876543210')
    

    cy.contains('button', 'Create Account').scrollIntoView().click({ force: true })
    cy.get('[data-qa="continue-button"]').click()
    
   
    cy.get('.shop-menu').contains('Logout').click()

    
    cy.get('.shop-menu')
      .contains('Signup / Login')
      .should('be.visible')
      .click()

   
    cy.get('input[data-qa="login-email"]')
      .should('be.visible')
      .type(email)

    cy.get('input[data-qa="login-password"]')
      .should('be.visible')
      .type('Test@12345')

    cy.get('button[data-qa="login-button"]')
      .should('be.visible')
      .click()

    
    cy.get('.navbar-nav')
      .should('be.visible')
      .and('contain', `Logged in as ${name}`)

    
    cy.get('.shop-menu')
      .contains('Logout')
      .should('be.visible')
      .click()

    
    cy.url().should('include', '/login')
  })
})



//Login with INvalid credentials
describe('Login Test', () => {
  it('Does not log in the user successfully', () => {

    cy.visit('https://automationexercise.com/')
    
    cy.get('.shop-menu')
      .contains('Signup / Login')
      .should('be.visible')
      .click()

    
    cy.get('input[data-qa="login-email"]')
      .should('be.visible')
      .type('nonexistent_user_999@test.com')

    cy.get('input[data-qa="login-password"]')
      .should('be.visible')
      .type('WrongPassword123!')

    cy.get('button[data-qa="login-button"]')
      .should('be.visible')
      .click()

  
    cy.get('.login-form p')
      .should('be.visible')
      .and('contain', 'Your email or password is incorrect!')
  })
})


//product search: PART 5
describe('Product search', () => {
  it('searches product successfully', () => {

    
    cy.visit('https://automationexercise.com/')

    
    cy.get('.shop-menu')
      .contains('Products')
      .should('be.visible')
      .click()

    cy.url().should('include', '/products')

    cy.get('.features_items')
      .should('be.visible')
      .and('contain', 'All Products')

    cy.get('#search_product')
      .should('be.visible')
      .type('dress')

    cy.get('#submit_search')
      .should('be.visible')
      .click()

    cy.get('.features_items')
      .should('be.visible')
      .and('contain', 'Searched Products')

    cy.get('.productinfo p').each(($el) => {
      cy.wrap($el)
        .text()
        .then((text) => {
          expect(text.toLowerCase()).to.include('dress')
        })
    })
  })
})


//product details: PART 6
describe('Product details', () => {
  it('shows a products details successfully', () => {


    cy.visit('https://automationexercise.com')

   
    cy.get('.shop-menu')
      .contains('Products')
      .should('be.visible')
      .click()

    cy.url().should('include', '/products')

    cy.get('.features_items')
      .should('be.visible')
      .and('contain', 'All Products')

    cy.get('a[href^="/product_details"]')
      .eq(0)
      .should('be.visible')
      .click()

    cy.url().should('include', '/product_details/')

      cy.get('.product-information').within(() => {
       
      cy.get('h2').should('be.visible')

      cy.get('p').contains('Category:').should('be.visible')

      cy.get('span').contains('Rs.').should('be.visible')
 
      cy.get('p').contains('Availability:').should('be.visible')
 
      cy.get('p').contains('Condition:').should('be.visible')

      cy.get('p').contains('Brand:').should('be.visible')
    })
  })
})


//test case 7: Adds product to cart
describe('cart functionality test', () => {
  it('creates a new user successfully', () => {

   
    cy.visit('https://automationexercise.com')

    
    cy.get('.shop-menu')
      .contains('Products')
      .should('be.visible')
      .click()

    
    cy.get('.features_items .add-to-cart')
      .eq(0)
      .should('be.visible')
      .click()

    
    cy.get('.modal-content')
      .contains('u', 'View Cart')
      .should('be.visible')
      .click()

    
    cy.url().should('include', '/view_cart')

    
    cy.get('#cart_info_table tbody tr')
      .should('have.length.at.least', 1)
      .and('be.visible')

    
    cy.get('.cart_price').should('be.visible')
    cy.get('.cart_quantity').should('be.visible')
  })
})
//test case 8: remove product from cart
describe('cart functionality test', () => {
  it('removes product from cart successfully', () => {

   
    cy.visit('https://automationexercise.com')

   
    cy.get('.shop-menu')
      .contains('Products')
      .should('be.visible')
      .click()

    
    cy.get('.features_items .add-to-cart')
      .eq(0)
      .should('be.visible')
      .click()

    
    cy.get('.modal-content')
      .contains('u', 'View Cart')
      .should('be.visible')
      .click()

    
    cy.get('#cart_info_table tbody tr').should('have.length', 1)

    
    cy.get('.cart_quantity_delete')
      .should('be.visible')
      .click()

    
    cy.get('#empty_cart')
      .should('be.visible')
      .and('contain', 'Cart is empty!')
  })
})

//test for the contact us
describe('Contact Us Test', () => {
  
  beforeEach(() => {
    cy.visit('https://automationexercise.com')
  })

  it('contacts successfully', () => {

    cy.get('.shop-menu')
      .contains('Contact us')
      .should('be.visible')
      .click()

    cy.url().should('include', '/contact_us')
    cy.get('.contact-form h2')
      .should('be.visible')
      .and('contain', 'Get In Touch')

    cy.get('input[data-qa="name"]').type('John Doe')
    cy.get('input[data-qa="email"]').type('johndoe@test.com')
    cy.get('input[data-qa="subject"]').type('Product Query')
    cy.get('textarea[data-qa="message"]').type('I would like to inquire about red dresses taht are in stalk and with discounts.')

    cy.get('input[name="upload_file"]').selectFile({
      contents: Cypress.Buffer.from('sample text content'),
      fileName: 'test_document.txt',
      lastModified: Date.now(),
    })

    cy.on('window:confirm', (text) => {
      expect(text).to.include('Press OK to proceed')
      return true 
    })

    cy.get('input[data-qa="submit-button"]')
      .should('be.visible')
      .click()

    
    cy.get('.status.alert.alert-success')
      .should('be.visible')
      .and('contain', 'Success! Your details have been submitted successfully.')

    cy.get('.btn-success').contains('Home').click()
    cy.url().should('eq', 'https://automationexercise.com')
  })
})

// Challenge 2: Verify Product Quantity
describe('Signup test', () => {

  beforeEach(() => {
    cy.visit('https://automationexercise.com')
  })

  it('verifies product quantity in cart successfully', () => {
  
    cy.get('.shop-menu')
      .contains('Products')
      .should('be.visible')
      .click()

    cy.get('a[href^="/product_details"]')
      .eq(0)
      .should('be.visible')
      .click()

    
    cy.get('#quantity')
      .should('be.visible')
      .clear()
      .type('3')

    cy.get('button.cart')
      .should('be.visible')
      .click()

    cy.get('.modal-content')
      .contains('u', 'View Cart')
      .should('be.visible')
      .click()

    cy.url().should('include', '/view_cart')
    cy.get('.cart_quantity button')
      .should('be.visible')
      .and('have.text', '3')
  })
})

//Challenge 3: Subscribe to Newsletter
describe('Subscribe too newsletter', () => {

  beforeEach(() => {
    cy.visit('https://automationexercise.com')
  })

  it('subscribes to the newsletter successfully', () => {
    const timestamp = Date.now()
    const subscriptionEmail = `subscriber${timestamp}@test.com`

    cy.get('#footer')
      .should('be.visible')
      .scrollIntoView()

    cy.get('.footer-widget h2')
      .should('be.visible')
      .and('contain', 'Subscription')

    cy.get('#susbscribe_email')
      .should('be.visible')
      .type(subscriptionEmail)

    cy.get('#subscribe')
      .should('be.visible')
      .click()

    cy.get('.alert-success')
      .should('be.visible')
      .and('contain', 'You have been successfully subscribed!')
  })
})

