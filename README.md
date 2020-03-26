# ecommerce_server

**Register Admin**
----
  Returns json data about Admin.

* **URL**

  /register

* **Method:**

  `POST`
  
*  **URL Params**

 
   `NONE`

* **Data Params**
    ```
    {
        email: [string],
        password: [string]
    }
    ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    { 
        "id" : 1, 
        "email" : "tamara@mail.com
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```
    { 
        errors : [array or errors] 
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { 
        error : "Internal Server Error" 
    }
    ```

**Login Admin**
----
  Returns json data about Admin.

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**

 
   `NONE`

* **Data Params**
    ```
    {
        email: [string],
        password: [string]
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    { 
        "access_token" : [string]
    }
    ```
 
* **Error Response:**

  * **Code:** 404 DATA NOT FOUND <br />
    **Content:**
    ```
    { 
        error : "email / password invalid"
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { 
        error : "Internal Server Error" 
    }
    ```

 ------

**Create Product**
----
  Returns json data about product.

* **URL**

  /products

* **Method:**

  `POST`
  
*  **URL Params**
 
   `NONE`

* **Headers Params**
    ```
    {
        access_token: [string]
    }
    ```

* **Data Params**
    ```
    {
        name : [string],
        img_url : [string],
        price: [integer],
        stock: [integer]
    }
    ```
* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    { 
        id: [integer]
        name : [string],
        img_url : [string],
        price: [integer],
        stock: [integer]
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```
    { 
        errors : [array of errors]
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { 
        error : "Internal Server Error" 
    }
    ```


**Find All Products**
----
  Returns array of json data about products.

* **URL**

  /products

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `NONE`

* **Data Params**
    `NONE`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [
      { 
          id: [integer]
          name : [string],
          img_url : [string],
          price: [integer],
          stock: [integer]
      },
      { 
          id: [integer]
          name : [string],
          img_url : [string],
          price: [integer],
          stock: [integer]
      },
      { 
          id: [integer]
          name : [string],
          img_url : [string],
          price: [integer],
          stock: [integer]
      }
    ]
    
    ```
 
* **Error Response:**

  * **Code:** 404 DATA NOT FOUND <br />
    **Content:**
    ```
    { 
        error : [string]
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { 
        error : "Internal Server Error" 
    }
    ```

**Find One Products**
----
  Returns json data about product.

* **URL**

  /products/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   ```
   {
       id : [integer]
   }
   ```

* **Data Params**
    `NONE`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
      { 
          id: [integer]
          name : [string],
          img_url : [string],
          price: [integer],
          stock: [integer]
      }  
    ```
 
* **Error Response:**

  * **Code:** 404 DATA NOT FOUND <br />
    **Content:**
    ```
    { 
        error : "Product not found"
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { 
        error : "Internal Server Error" 
    }
    ```

**Update Products**
----
  Returns json data about products.

* **URL**

  /products/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   ```
   {
       id : [integer]
   }
   ```

* **Data Params**
    ```
      { 
        name : [string],
        img_url : [string],
        price: [integer],
        stock: [integer]
      } 
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
      { 
        id: [integer]
        name : [string],
        img_url : [string],
        price: [integer],
        stock: [integer]
      }
    ```
 
* **Error Response:**


  * **Code:** 400 DATA NOT FOUND <br />
    **Content:**
    ```
    { 
        errors : [array of errors]
    }
    ```

  * **Code:** 404 DATA NOT FOUND <br />
    **Content:**
    ```
    { 
        error : "Product not found"
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { 
        error : "Internal Server Error" 
    }
    ```


**Delete Products**
----
  Returns json data about products.

* **URL**

  /products/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   ```
   {
       id : [integer]
   }
   ```

* **Data Params**
    `NONE`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    { 
        id: [integer]
        name : [string],
        img_url : [string],
        price: [integer],
        stock: [integer]
    }    
    ```
 
* **Error Response:**

  * **Code:** 404 DATA NOT FOUND <br />
    **Content:**
    ```
    { 
        error : "Product not found"
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { 
        error : "Internal Server Error" 
    }
    ```

----

**Register Costumer**
----
  Returns json data about Costumer.

* **URL**

  /registerCostumers

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `NONE`

* **Data Params**
    ```
    {
        email: [sting],
        password: [string]
    }
    ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    { 
        "id" : [integer], 
        "email" : [string]
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```
    { 
        errors : [array of errors] 
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { 
        error : "Internal Server Error" 
    }
    ```

**Login Costumer**
----
  Returns json data about Costumer.

* **URL**

  /loginCostumers

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `NONE`

* **Data Params**
    ```
    {
        email: [string],
        password: [string]
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    { 
        "access_token" : [string]
    }
    ```
 
* **Error Response:**

  * **Code:** 404 DATA NOT FOUND <br />
    **Content:**
    ```
    { 
        error : "email / password invalid"
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { 
        error : "Internal Server Error" 
    }
    ```

----

**Find One Costumer**
----
  Returns json data about costumer.

* **URL**

  /costumers/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `NONE`

* **Data Params**
    `NONE`

* **Headers Params**
    ```
    {
      access_token : [string]
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    { 
        id: [integer]
        name : [string],
        balance : [integer],
        phone: [integer],
        email: [string],
        password: [string]
    }
    
    ```
 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```
    { 
        error : "Authorize denied"
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { 
        error : "Internal Server Error" 
    }
    ```



**Update Profile Costumer**
----
  Returns json data about costumer.

* **URL**

  /costumers/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `NONE`

* **Data Params**
    ```
    {
      name: [string],
      balance: [integer],
      phone: [integer],
      email: [string],
      password: [string]
    }
    ```

* **Headers Params**
    ```
    {
      access_token : [string]
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    { 
        id: [integer]
        name : [string],
        balance : [integer],
        phone: [integer],
        email: [string],
        password: [string]
    }
    
    ```
 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```
    { 
        error : "Access denied"
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { 
        error : "Internal Server Error" 
    }
    ```
----


**Find All Cart**
----
  Returns array of json data about cart.

* **URL**

  /cart

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `NONE`

* **Data Params**
    `NONE`

* **Headers Params**
    ```
    {
      access_token : [string]
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [
      { 
        id: [integer]
        amount : [string],
        UserId : [integer],
        ProductsId : [integer],
        Prodoct: {
            name : [string],
            img_url : [string],
            price: [integer],
            stock: [integer]
        }
      }
    ]    
    ```
 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```
    { 
        error : [string]
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { 
        error : "Internal Server Error" 
    }
    ```




**Create New Cart**
----
  Returns json data about Cart.

* **URL**

  /cart

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `NONE`

* **Data Params**
    ```
    { 
      id: [integer]
      amount : [string],
      UserId : [integer],
      ProductsId : [integer]
    }
    ```


* **Headers Params**
    ```
    {
      access_token : [string]
    }
    ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    { 
      id: [integer]
      amount : [string],
      UserId : [integer],
      ProductsId : [integer]
    }
    ```
 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```
    { 
        errors : [string]
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { 
        error : "Internal Server Error" 
    }
    ```

 


**Delete Cart**
----
  Returns json data about Cart.

* **URL**

  /cart/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   ```
   {
     id: [integer]
   }
   ```

* **Data Params**

    `NONE`


* **Headers Params**
    ```
    {
      access_token : [string]
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    { 
      id: [integer]
      amount : [string],
      UserId : [integer],
      ProductsId : [integer],
      Product : {
        id: 1
        name : "Bottle",
        img_url : "image.jpg",
        price: 12000,
        stock: 8
      }
    }
    ```
 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```
    { 
        error : "Accessed denied"
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { 
        error : "Internal Server Error" 
    }
    ```


**Increase Cart**
----
  Returns json data about Cart.

* **URL**

  /cart/:id/increase

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   ```
   {
     id: [integer]
   }
   ```

* **Data Params**

    `NONE`


* **Headers Params**
    ```
    {
      access_token : [string]
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    { 
      id: [integer]
      amount : [string],
      UserId : [integer],
      ProductsId : [integer],
      Product : {
        id: 1
        name : "Bottle",
        img_url : "image.jpg",
        price: 12000,
        stock: 8
      }
    }
    ```
 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```
    { 
        error : [string]
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { 
        error : "Internal Server Error" 
    }
    ```

    
    
**Decrease Cart**
----
  Returns json data about Cart.

* **URL**

  /cart/:id/decrease

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   ```
   {
     id: [integer]
   }
   ```

* **Data Params**

    `NONE`


* **Headers Params**
    ```
    {
      access_token : [string]
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    { 
      id: [integer]
      amount : [string],
      UserId : [integer],
      ProductsId : [integer],
      Product : {
        id: 1
        name : "Bottle",
        img_url : "image.jpg",
        price: 12000,
        stock: 8
      }
    }
    ```
 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```
    { 
        error : [string]
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { 
        error : "Internal Server Error" 
    }
    ```


**Transaction Cart**
----
  Returns json data about Cart.

* **URL**

  /cart/:id/transaction

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   ```
   {
     id: [integer]
   }
   ```

* **Data Params**

    `NONE`


* **Headers Params**
    ```
    {
      access_token : [string]
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    { 
      id: [integer]
      amount : [string],
      UserId : [integer],
      ProductsId : [integer],
      Product : {
        id: 1
        name : "Bottle",
        img_url : "image.jpg",
        price: 12000,
        stock: 8
      }
    }
    ```
 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```
    { 
        error : [string]
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { 
        error : "Internal Server Error" 
    }
    ```
