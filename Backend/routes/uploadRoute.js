
/*
? Node Modules
*/
import express from "express";                  // Express framework for building web APIs
import multer from "multer";                   // Multer middleware for handling file uploads
import path from 'path';                       // Node.js module for working with file and directory paths


// Creating an instance of the Express router
const router = express.Router();

// Configure storage engine for multer
const storage = multer.diskStorage({
      // Set destination directory for uploaded files
      destination: (req, file, cb) => {
            cb(null, "uploads/");              // Store files inside "uploads/" folder
      },

      // Set custom filename for uploaded files
      filename: (req, file, cb) => {
            const extname = path.extname(file.originalname);   // Extract original file extension
            cb(null, `${file.fieldname}-${Date.now()}${extname}`); // Create a unique filename
      },
});

// Define file filter to allow only specific image types
const fileFilter = (req, file, cb) => {
      const filetypes = /jpe?g|png|webp/;               // Allowed file extensions
      const mimeTypes = /image\/jpe?g|image\/png|image\/webp/;  // Allowed MIME types

      const extname = path.extname(file.originalname).toLowerCase(); // Extract and lowercase the file extension
      const mimetype = file.mimetype;                                // Get MIME type of the uploaded file

      // Check if both file extension and MIME type are valid
      if (filetypes.test(extname) && mimeTypes.test(mimetype)) {
            cb(null, true);       // Accept the file
      } else {
            cb(new Error("Images only"), false); // Reject the file with error
      }
};

// Initialize multer with defined storage and file filter
const upload = multer({ storage, fileFilter });

// Create a middleware to upload a single image with the field name "image"
const uploadSingleImage = upload.single("image");

// Define POST route for uploading an image
router.post("/", (req, res) => {
      // Call the upload middleware
      uploadSingleImage(req, res, (err) => {
            if (err) {
                  // If an error occurred during upload
                  res.status(400).send({ message: err.message });
            } else if (req.file) {
                  // If the file was uploaded successfully
                  res.status(200).send({
                        message: "Image uploaded successfully",
                        image: `/${req.file.path}`,   // Return path of uploaded image
                  });
            } else {
                  // If no file was provided in the request
                  res.status(400).send({ message: "No image file provided" });
            }
      });
});

// Export the router so it can be used in other parts of the app
export default router;
