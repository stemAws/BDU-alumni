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

exports.getChaptersList = async (req, res) => {
    try {
      const chapter = await chapterService.chaptersList();
      res.send(chapter);
    } catch (error) {
      console.error("Error fetching chapter:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
