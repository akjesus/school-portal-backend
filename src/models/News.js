const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class News {
  // GET ALL NEWS
  static async getAllNews(featured) {
    // If featured query param is true, return only featured news limit to 3
    if (featured === "true") {
      const [result] = await db.query(`
        SELECT
          n.id,
          n.title,
          n.slug,
        n.summary,
        n.featuredImage,
        n.content,
        n.category,
        n.status,
        n.views,
        n.isFeatured = 1? true : false AS isFeatured,
        n.published_at,
        n.created_at,
        s.name AS author_name

      FROM news n
      LEFT JOIN staff s
        ON n.authorId = s.id
        WHERE n.isFeatured = true

      ORDER BY n.created_at DESC LIMIT 3
    `);

      return result;
    } else {
      const [result] = await db.query(`
        SELECT
          n.id,
          n.title,
          n.slug,
          n.summary,
          n.featuredImage,
          n.content,
          n.category,
          n.status,
          n.views,
          n.isFeatured,
          n.published_at,
          n.created_at,
          s.name AS author_name

        FROM news n
        LEFT JOIN staff s
          ON n.authorId = s.id

        ORDER BY n.created_at DESC
      `);

      return result;
    }
  }

  // GET NEWS BY ID
  static async getById(id) {
    const [result] = await db.query(
      `
      SELECT 
        n.*,

        s.name AS author_name

      FROM news n

      LEFT JOIN staff s
        ON n.authorId = s.id

      WHERE n.id = ?
      `,
      [id],
    );

    return result.length ? result[0] : null;
  }

  // GET NEWS BY SLUG
  static async getBySlug(slug) {
    const [result] = await db.query(
      `
      SELECT 
        n.*,

        s.name AS author_name

      FROM news n

      LEFT JOIN staff s
        ON n.authorId = s.id

      WHERE n.slug = ?
      `,
      [slug],
    );

    return result.length ? result[0] : null;
  }

  // CREATE NEWS
  static async create(data) {
    const id = uuidv4();

    const {
      title,
      slug,
      summary,
      content,
      featuredImage,
      category,
      status,
      authorId,
      isFeatured,
    } = data;

    const published_at = status === "Published" ? new Date() : null;

    const [result] = await db.query(
      `
      INSERT INTO news (
        id,
        title,
        slug,
        summary,
        content,
        featuredImage,
        category,
        status,
        published_at,
        author_id,
        isFeatured
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        id,
        title,
        slug,
        summary,
        content,
        featuredImage,
        category,
        status,
        published_at,
        authorId,
        isFeatured || false,
      ],
    );

    if (result.affectedRows > 0) {
      const [news] = await db.query(
        `
        SELECT 
          id,
          title,
          slug,
          category,
          status,
          created_at
        FROM news
        WHERE id = ?
        `,
        [id],
      );

      return news[0];
    } else {
      return null;
    }
  }

  // UPDATE NEWS
  static async update(id, data) {
    const {
      title,
      slug,
      summary,
      content,
      featuredImage,
      category,
      status,
      isFeatured,
    } = data;

    const published_at = status === "Published" ? new Date() : null;

    const [result] = await db.query(
      `
      UPDATE news
      SET
        title = ?,
        slug = ?,
        summary = ?,
        content = ?,
        featuredImage = ?,
        category = ?,
        status = ?,
        published_at = ?,
        isFeatured = ?
      WHERE id = ?
      `,
      [
        title,
        slug,
        summary,
        content,
        featuredImage,
        category,
        status,
        published_at,
        isFeatured,
        id,
      ],
    );

    if (result.affectedRows > 0) {
      const [news] = await db.query(
        `
        SELECT *
        FROM news
        WHERE id = ?
        `,
        [id],
      );

      return news[0];
    } else {
      return null;
    }
  }

  // DELETE NEWS
  static async delete(id) {
    const [result] = await db.query(`DELETE FROM news WHERE id = ?`, [id]);

    return result.affectedRows > 0;
  }

  // UPDATE VIEWS
  static async incrementViews(id) {
    await db.query(
      `
      UPDATE news
      SET views = views + 1
      WHERE id = ?
      `,
      [id],
    );
  }

  // GET FEATURED NEWS
  static async getFeaturedNews() {
    const [result] = await db.query(`
      SELECT
        id,
        title,
        slug,
        summary,
        featuredImage,
        category,
        views,
        published_at

      FROM news

      WHERE isFeatured = true
      AND status = 'Published'

      ORDER BY published_at DESC
    `);

    return result;
  }

  // GET PUBLISHED NEWS
  static async getPublishedNews() {
    const [result] = await db.query(`
      SELECT
        id,
        title,
        slug,
        summary,
        featuredImage,
        category,
        views,
        published_at

      FROM news

      WHERE status = 'Published'

      ORDER BY published_at DESC
    `);

    return result;
  }
}

module.exports = News;
