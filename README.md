# ecommerce_server

**Register Admin**
----
  Returns json data about Admin.

* **URL**

  /register

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `NONE`

* **Data Params**
    ```
    {
        email: 'tamara@mail.com,
        password: 123456
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
        errors : ["Email is required", "Invalid email format!", "Password is required", "Password length must between 6 and 14"] 
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

   **Required:**
 
   `NONE`

* **Data Params**
    ```
    {
        email: 'tamara@mail.com,
        password: 123456
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    { 
        "access_token" : "eIdisy9qwoiqwndohqwddndpdhqpwhdohqod"
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


**Create Product**
----
  Returns json data about product.

* **URL**

  /products

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `NONE`

* **Data Params**
    ```
    {
        name : "Bottle",
        img_url : "image.jpg",
        price: 12000,
        stock: 8
    }
    ```
* **Headers Params**
    ```
    {
        access_token: "eIjasldknasdnaksndioqdioqwndnwqiodqwonqw"
    }
    ```
* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    { 
        id: 1
        name : "Bottle",
        img_url : "image.jpg",
        price: 12000,
        stock: 8
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```
    { 
        errors : ["Name is required", "Price must greater than 0", "Stock must be greater than 0", "Stock is not allowed with decimal value"]
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
            id: 1
            name : "Bottle",
            img_url : "image.jpg",
            price: 12000,
            stock: 8
        },
        { 
            id: 2
            name : "Sauce",
            img_url : "image.jpg",
            price: 8000,
            stock: 2
        },
        { 
            id: 1
            name : "Olive Oil",
            img_url : "image.jpg",
            price: 21000,
            stock: 2
        }
    ]
    
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

**Find One Products**
----
  Returns json data about products.

* **URL**

  /products/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   ```
   {
       id : 1
   }
   ```

* **Data Params**
    `NONE`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    { 
        id: 1
        name : "Bottle",
        img_url : "image.jpg",
        price: 12000,
        stock: 8
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
       id : 1
   }
   ```

* **Data Params**
    ```
    { 
        id: 1
        name : "Bottle Plastic",
        img_url : "image.jpg",
        price: 12000,
        stock: 8
    }  
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    { 
        id: 1
        name : "Bottle",
        img_url : "image.jpg",
        price: 12000,
        stock: 8
    }    
    ```
 
* **Error Response:**


  * **Code:** 400 DATA NOT FOUND <br />
    **Content:**
    ```
    { 
        errors : ["Price must greater than 0", "Stock must greater than 0", "Stock not allowed with decimal value"]
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
       id : 1
   }
   ```

* **Data Params**
    `NONE`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    { 
        id: 1
        name : "Bottle",
        img_url : "image.jpg",
        price: 12000,
        stock: 8
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



