const _ = require('lodash');

const dummy = () => 1;

const totalLikes = (blogs) => {
  const reducer = (likes, blog) => likes + blog.likes;
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (fav, blog) => (blog.likes > fav.likes ? blog : fav);
  return blogs.length === 0 ? {} : blogs.reduce(reducer, blogs[0]);
};

const mostBlogs = (blogs) => {
  const blogsByAuthor = _.groupBy(blogs, 'author');
  const blogCounts = Object.keys(blogsByAuthor).map((author) => {
    return {
      author,
      blogs: blogsByAuthor[author].length,
    };
  });
  const reducer = (maxCount, count) => (count.blogs > maxCount.blogs ? count : maxCount);
  return blogCounts.length === 0 ? {} : blogCounts.reduce(reducer, blogCounts[0]);
};

const mostLikes = (blogs) => {
  const blogsByAuthor = _.groupBy(blogs, 'author');
  const likeCounts = Object.keys(blogsByAuthor).map((author) => {
    return {
      author,
      likes: totalLikes(blogsByAuthor[author]),
    };
  });
  const reducer = (maxCount, count) => (count.likes > maxCount.likes ? count : maxCount);
  return likeCounts.length === 0 ? {} : likeCounts.reduce(reducer, likeCounts[0]);
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
