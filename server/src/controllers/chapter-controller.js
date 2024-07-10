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

  exports.getChapterById = async (req, res) => {
    try {
      const chapter = await chapterService.getAChapter(req.params.chapterId);
  
      if (!chapter) res.status(404).json("No record by the given id");
      else res.send(chapter);
    } catch (error) {
      console.error("Error fetching chapter by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  exports.updateChapter= async (req, res) => {
    try {
      const chapterId = req.params.chapterId;
      const updatedChaptertData = req.body;
  
      const affectedRows = await chapterService.updateAChapter(
        chapterId,
        updatedChaptertData
      );
  
      if (affectedRows === 0) {
        return res
          .status(404)
          .json({ error: `No record with the given id: ${chapterId}` });
      }
  
      return res.json({ message: "Chapter updated successfully" });
    } catch (error) {
      console.error("Error updating chapter:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  exports.deleteChapter = async (req, res) => {
    try {
      const chapter = await chapterService.deleteAChapter(req.params.chapterId);
  
      if (!chapter) res.status(404).json("No record by the given id");
      else res.send(chapter);
    } catch (error) {
      console.error("Error fetching chapter by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  
