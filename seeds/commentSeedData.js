const { Comment } = require('../models');

const commentData = [
    {
      body: 'Very interesting.',
      user_id: 2,
      post_id: 1
    },
    {
        body: 'Cool!',
        user_id: 1,
        post_id: 2
      },
  ];
  
  const seedPost = () => Comment.bulkCreate(commentData);

module.exports = seedPost;