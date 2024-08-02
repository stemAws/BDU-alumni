const sharp = require("sharp");
const galleryService = require("../services/media-services");
const firebaseConfig = require("../config/firebaseConfig");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const firebase = require("firebase/app");

firebase.initializeApp(firebaseConfig);

const storage = getStorage();

exports.uploadGallery = async (req, res) => {
  try {
    const { event, year, description } = req.body;
    const images = req.files.map((file) => file);

    const imageUrls = [];

    for (const image of images) {
      const resizedImageBuffer = await sharp(image.buffer)
        .jpeg({ quality: 50 })
        .toBuffer();

      const filePath = `gallery/${Date.now()}-${image.originalname}`;
      const fileRef = ref(storage, filePath);
      await uploadBytes(fileRef, resizedImageBuffer);

      const downloadURL = await getDownloadURL(fileRef);
      imageUrls.push(downloadURL);
    }

    const galleryID = await galleryService.createGallery({
      images: imageUrls,
      event,
      year,
      description,
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
    const gallery = await galleryService.getGalleryById(id);

    if (!gallery) {
      console.error("Gallery not found for ID:", id);
      return res.status(404).json({ error: "Gallery not found" });
    }

    const mediaUrls = gallery.images;
    if (!Array.isArray(mediaUrls)) {
      console.error("Media field is not an array");
      return res.status(500).json({ error: "Internal Server Error" });
    }

    for (const imageUrl of mediaUrls) {
      try {
        const fileRef = ref(storage, imageUrl);

        await getDownloadURL(fileRef);

        await deleteObject(fileRef);
        console.log("Deleted image successfully");
      } catch (error) {
        if (error.code === "storage/object-not-found") {
          console.log(`File not found at ${imageUrl}. Skipping deletion.`);
        } else {
          console.error("Error deleting image:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      }
    }

    await galleryService.deleteGallery(id);

    res.json({ message: "Gallery and associated images deleted successfully" });
  } catch (error) {
    console.error("Error deleting gallery:", error);
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
