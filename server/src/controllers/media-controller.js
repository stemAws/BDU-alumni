const galleryService = require("../services/media-services");

const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const firebaseConfig = require("../config/firebaseConfig");
const firebase = require("firebase/app");

firebase.initializeApp(firebaseConfig);

const storage = getStorage();

exports.uploadGallery = async (req, res) => {
  try {
    const { event, year } = req.body;
    const images = req.files.map((file) => file);

    const imageUrls = [];

    for (const image of images) {
      const filePath = `gallery/${Date.now()}-${image.originalname}`;
      const fileRef = ref(storage, filePath);
      await uploadBytes(fileRef, image.buffer);
      const downloadURL = await getDownloadURL(fileRef);
      imageUrls.push(downloadURL);
    }

    const galleryID = await galleryService.createGallery({
      images: imageUrls,
      event,
      year,
    });

    res.json({ galleryID, message: "Gallery created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllGalleries = async (req, res) => {
  try {
    const galleryData = await galleryService.getAllGallery();
    res.json(galleryData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getGalleryById = async (req, res) => {
  const gID = req.params.id;

  try {
    const photo = await galleryService.getGalleryById(gID);

    if (!photo || Object.keys(photo).length === 0) {
      res.status(404).json({ error: "No record found for the given ID" });
    } else {
      res.send(photo);
    }
  } catch (error) {
    console.error("Error fetching gallery by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteGalleryById = async (req, res) => {
  const id = req.params.id;
  try {
    const photo = await galleryService.deleteGallery(id);
    if (!photo) {
      res.status(404).json({ error: "No record found for the given ID" });
    } else {
      res.send(photo);
    }
  } catch (error) {
    console.error("Error fetching gallery by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateGalleryById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedGalleryData = req.body;

    const affectedRows = await galleryService.updateGallery(
      id,
      updatedGalleryData
    );

    if (affectedRows === 0) {
      res.status(404).json(`No record with the given id: ${id}`);
    } else {
      res.json({ message: "Gallery updated successfully" });
    }
  } catch (error) {
    console.error("Error updating gallery:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};