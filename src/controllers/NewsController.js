const News = require("../models/News");

exports.getAllNews = async (req, res) => {
  const { featured } = req.query;
  try {
    const news = await News.getAllNews(featured);
    res.status(200).json({ success: true, news });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.getById(id);
    if (!news) {
      return res
        .status(404)
        .json({ success: false, message: "News not found" });
    }
    await News.incrementViews(id);
    res.status(200).json({ success: true, news });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateViews = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.getById(id);
    if (!news) {
      return res
        .status(404)
        .json({ success: false, message: "News not found" });
    }
    await News.incrementViews(id);
    res
      .status(200)
      .json({ success: true, message: "Views updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      summary,
      content,
      featuredImage,
      category,
      status,
      isFeatured,
      published_at,
    } = req.body;
    const news = await News.update(id, {
      title,
      slug,
      summary,
      content,
      featuredImage,
      category,
      status,
      isFeatured,
      published_at,
    });
    if (!news) {
      return res
        .status(404)
        .json({ success: false, message: "News not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "News updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
