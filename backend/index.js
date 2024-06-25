const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const jwt = require('jsonwebtoken');
app.use(express.json());
app.use(cors());
const { ObjectId } = require('mongodb');

mongoose.connect("mongodb+srv://iit2023154:srnaeshta0606@cluster1.lihh7db.mongodb.net/e-commerce")
    .then(() => {
        console.log("Connected to MongoDB");
    }).catch((error) => {
        console.log("Error connecting to MongoDB: " + error);
    });

app.get("/", (req, res) => {
    res.send("Express App is Running");
});

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: false },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true }
});

const Product = mongoose.model("Product", productSchema);

app.post('/addproduct', async (req, res) => {
    try {
        let products=await Product.find({});
        let id;
        if(products.length>0){
            let last_product_array=products.slice(-1);
            let last_product=last_product_array[0];
            id=last_product.id+1;
        }
        else{id=1;}
        const product = new Product({
            id:id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
            available: req.body.available
        });

        console.log(product);
        await product.save();
        console.log("Saved");

        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding product to database",
            error: error.message
        });
    }
});


app.post('/removeproduct', async (req, res) => {
    try {
        // Retrieve the product ID from the request body
        const productId = req.body.id;

        // Check if the product ID is provided
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        // Find the product by ID and delete it
        const product = await Product.findOneAndDelete({ id: productId });

        // If no product is found, send a 404 response
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Send a success response
        res.json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        // Handle any errors that occur
        res.status(500).json({
            success: false,
            message: "Error deleting product from database",
            error: error.message
        });
    }
});

app.get('/allproducts',async(req,res)=>{
    let products=await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})

const uploadDir = './upload/images';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

app.use('/images', express.static(uploadDir));

app.post("/upload", upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: 0,
            message: "No file uploaded"
        });
    }
    
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
        // image_url: `http://localhost:${port}/${req.body.image}`
    });
});
//Schema creating for user model

const Users=mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})
app.post('/signup', async (req, res) => {
    try {
        // Check if user with the same email already exists
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "User with the same email already exists" });
        }

        // Create a cart object (as per your example)
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        // Create a new user instance
        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        });

        // Save the user to the database
        await user.save();

        // Prepare data for JWT token
        const data = {
            user: {
                id: user.id
            }
        };

        // Generate JWT token
        const token = jwt.sign(data, 'secret_ecom');

        // Respond with success and token
        res.json({ success: true, token });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});


app.post('/login', async (req, res) => {

    let user = await Users.findOne({ email: req.body.email });
    if(user){
        const passCompare= req.body.password===user.password;
        if(passCompare){
            const data={
                user:{
                    id:user.id
                }
            }
            const token=jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:"Wrong Password"});
        }
    }
    else{
        res.json({success:false,errors:"Wrong Email ID"})
    }

})

//creating endpoint for new collection data
app.get('/newc', async (req, res) => {
    try {
      let products = await Product.find({});
      let newc = products.slice(0).slice(-6);
      console.log("New Collection Fetched");
      res.send(newc);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });

  // creating middleware to fetch user
  
  const fetchUser = async (req, res, next) => {
    // Get the token from request header
    const token = req.header('auth-token');
  
    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, 'secret_ecom'); // Replace with your JWT secret
  
      // Attach user information to the request object
      req.user = decoded.user;
  
      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error('Error verifying token:', error);
      res.status(401).json({ message: 'Invalid token.' });
    }
  };
  //creating endpoint for adding products in cartData
  app.post('/addtocart', fetchUser,async (req, res) => {
    console.log("Added",req.body.itemID);
    let userData= await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemID]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData})
    res.send("Added")
 })
//     try {
//       // Ensure user is authenticated and req.user.id is populated correctly
//       if (!req.user || !req.user.id) {
//         return res.status(401).json({ error: 'Unauthorized' });
//       }
  
//       // Assuming you have imported Users model and have MongoDB ObjectId defined
//       const userId = ObjectId(req.user.id); // Convert req.user.id to ObjectId if needed
  
//       // Fetch user data and update cartData
//       const userData = await Users.findOneAndUpdate(
//         { _id: userId },
//         { $inc: { [`cartData.${req.body.itemID}`]: 1 } }, // Increment cartData[itemID] by 1
//         { new: true } // Return updated document
//       );
  
//       if (!userData) {
//         return res.status(404).json({ error: 'User not found' });
//       }
  
//       res.send("Added to cart successfully");
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });











app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port " + port);
    } else {
        console.log("Error: " + error);
    }
});
