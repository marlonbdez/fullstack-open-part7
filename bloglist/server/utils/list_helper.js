var _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const total = blogs.reduce((acc, curr) => acc + curr.likes, 0);

  return total;
};

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce(
    (item, curr) => (item.likes > curr.likes ? item : curr),
    {},
  );

  return favorite;
};

const mostBlogs = (blogs) => {
  const list = [];

  blogs.forEach((item) => {
    const existing = list.find((x) => x.author === item.author);

    if (existing) {
      existing.blogs += 1;
    } else {
      list.push({ author: item.author, blogs: 1 });
    }
  });

  list.sort((a, b) => b.blogs - a.blogs);

  return list.length ? list[0] : null;
};

const mostLikes = (blogs) => {
  const list = [];

  blogs.forEach((item) => {
    const existing = list.find((x) => x.author === item.author);

    if (existing) {
      existing.likes += item.likes;
    } else {
      list.push({ author: item.author, likes: item.likes });
    }
  });

  list.sort((a, b) => b.likes - a.likes);

  return list.length ? list[0] : null;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
