node web store
models
    users
        username
        password passport
products
    name
    description
    price
    author = id_user
    commnets = [id_commnent]
coments
    author - id user
    body


routers
    index.js
        get /register = form para registratse
        post /register = enviar registro
        get /login = loguearse
        post /login enviamos login
        post /logout

    comments.js
        post /products/:id/comments 1)
        delete /products/:id/comments/:id 1)3)
        put /products/:id/comments/:id 2) 3)

     products.js
        get /products
        post /products 1)
        delete /products/:id 1) 2)
        get /products/:id
        put /products/:id 1) 2)
        get /products/:id/edit 1) 2)
        get /products/new 1)

views
    products.ejs
    product.ejs
    new.ejs
    edit.ejs
    login.ejs
    register.ejs

middleware
1) isLoggedIn
2) productOwner = es el autor del producto
3) commentOwner = es el autor del comentario

iniciar proyecto
sudo npm install -g express-generator
express --ejs
npm install
