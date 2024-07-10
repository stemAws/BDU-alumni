const chapterService = require("../services/chapter-services");


exports.createChapter = async (req, res) => {
  try {
    const { title, description, link } = req.body;
   

    const chapter = await chapterService.addChapters(
        title, description, link
    );
    res.status(201).json({ message: "chapter added successfully", chapter });
  } catch (error) {
    console.error("Error adding chapter:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

