
// designing rest api 


const express = require("express");

const users = require("./MOCK_DATA.json");

const fs = require("fs");

const app = express(); // an instance of express 

const port = 8000;


// Middleware - Plugin 
// this is a built in middleware
app.use(express.urlencoded({extended : false}));

// ye middleware ---->

// frontend se jo values aa rhi hai jo form data aa rha hai unhe obeject mei convert krta hai aur as iske pas req object ka access hai hi to wo  req.body mei dalke de deta hai 


// Middlewares have three arguments (req (object) , res (object) , next (fn forwarding request to next fn))

// Middleware 1 
app.use((req , res , next ) => {
    console.log("Hello from middleware 1");
    next();
})

// Middleware 2 

app.use((req , res , next) => {
    console.log("Hello from middleware 2");
    // now the req left hanging as next fn not called and not the reponse ended here 
    next();
})

// Middleware 3 

app.use((req , res ,next) =>  {
    console.log("Hello from Middleware 3");
    return res.end("Hi the request is ended by me and i am middleware  3");// ended the request here and repond with Hi // so middleware generally had three option one is two end the request and other is to forward the request and third one is keep the request hanging without calling next or ending it 
})

app.get("/users" , (req , res) => {  // Handles GET request to "/users"
    // Generates an HTML list of first names from the 'users' array
    // Each user object is mapped to an <li> displaying only the first_name

    // ye ek server side render page hai mtlb the all name showing on the scrren are html form of list jo ki render hoke show ho rhi h 
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}  
    </ul>`;
    res.send(html);


});  // SSR above --> HTML doc rendered from server side only // like browser pe server sent html data ---> which is Server side rendering // jo render hoke name show ho rha wo actual mei wo ek html list hai 


app.get("/api/users/:id" , (req , res) => {

    const id = Number(req.params.id);// its an string we have to convert it in numbers 
    const user = users.find((user) => user.id === id);
    return res.json(user);

});

// 'users' is a JSON array of user objects
// 'user' is a single object we extract from that array
// We find the user whose user.id matches the dynamic 'id' from the URL


app.get("/api/users" , (req , res) =>{
      return res.json(users);
});





//req.params is an object that holds all dynamic parameters from the URL.

// These are defined in your route path using the : syntax.


// post patch and delete methods are handle by postman but stll lets create the routes 
 
//post  ---> creating data 
app.post("/api/users" , (req, res) => {
     const body =req.body;

     users.push({ ...body , id : users.length+1});
     fs.writeFile("./MOCK_DATA.json" ,JSON.stringify(users) , (err , data) => {
      return res.json({status : "success" , id : users.length});
     });
     
});


// put and patch ---> updating data 

app.put("/api/users/:id" , (req , res) => {

    // todo : edit the user with id 

});

// delete ----> deleting data 

app.delete("/api/delete/:id" , (req,res) => {
   // todo : delete the user with id 
});

app.listen(port, () => {
    console.log(`Server started at Port ${port}` );
});

// other way of repersenting it if routes are similar 

// app
//   .route("/api/users/:id")
//   .get((req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
//   })
//   .patch((req, res) => {
//     // Edit user with id
//     return res.json({ status: "Pending" });
//   })
//   .delete((req, res) => {
//     // Delete user with id
//     return res.json({ status: "Pending" });
//   });
