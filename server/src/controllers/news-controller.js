const newsService = require('../services/news-services');
const path = require("path");
const sharp = require('sharp');

const { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } = require("firebase/storage");
const firebaseConfig = require("../config/firebaseConfig");
const firebsae = require("firebase/app");
firebsae.initializeApp(firebaseConfig);
const storage = getStorage();

exports.createNews = async (req, res) => {
    try {
      const adminId = req.params.adminId;      
      const { title, content, category } = req.body;
      const imagePath = req.file ? `events/${Date.now()}${path.extname(req.file.originalname)}` : null;
      let downloadURL = null;
  
      if (req.file) {
        const fileRef = ref(storage, imagePath);
        resizedFile = await sharp(req.file.buffer).jpeg({ quality: 50 }).toBuffer()
  
        await uploadBytes(fileRef, resizedFile);
        downloadURL = await getDownloadURL(fileRef);
      }
  
      const news = await newsService.addNews(title, content, category, downloadURL, adminId);
      res.status(201).json({ message: "news added successfully", news });
    } catch (error) {
      console.error("Error adding news:", error);
      res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
  };

  exports.getAllNews = async (req, res) => {
    try {
      const news = await newsService.getNews();
      res.send(news);
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  exports.getNewsById = async (req, res) => {
    try {
      const news = await newsService.getANews(req.params.newsId);
      
      if (!news) res.status(404).json("No record by the given id");
      else res.send(news);
    } catch (error) {
      console.error("Error fetching news by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  