import prisma from "../prisma/prisma.js";

export const getAll = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(posts);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Не удалось получить статьи"
    });
  }
}

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return res.status(404).json({
        message: 'Статья не найдена'
      });
    }

    const updatedViewsCount = post.viewsCount + 1;

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        viewsCount: updatedViewsCount,
      },
    });

    const updatedPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!updatedPost) {
      return res.status(500).json({
        message: 'Не удалось получить статью'
      });
    }

    res.json(updatedPost);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Не удалось получить статью"
    });
  }
}

export const getLastTags = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      take: 5,
    });

    const tags = posts
      .map(post => post.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Не удалось получить статьи"
    });
  }
}
