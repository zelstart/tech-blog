const { Post } = require('../models');

const postData = [
    {
      title: 'First Post',
      content: 'This is the first post content.',
      user_id: 1,
    },
    {
      title: 'Second Post',
      content: 'This is the second post content.',
      user_id: 2,
    },
  ];
  
  const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;