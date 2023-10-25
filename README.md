# Tech Blog

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table Of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Credits](#credits)
- [License](#license)
- [Deployed Site](#deployed-site)

## Description

This Tech Blog is a place where users can create an account and connect with other developers. It's a simple site that allows you to create blog posts and comment on others' posts. It's a place for developers to publish articles, blog posts, and express their thoughts and opinions

## Installation
If you would like to run the application locally:

1. Download the repo and open it in your favorite IDE.
2. Modify the `.env.example` file with your mysql2 username and password, then remove the `.example` from the end of the filename.
3. Open the terminal and enter `npm install` and wait for packages to install.
4. In your terminal, open the mysql shell by entering `mysql -u root -p` and entering your password when prompted.
5. In the mysql shell, enter `source db/schema.sql`.
6. Exit the mysql shell.
7. Optionally, you can seed the database with a few users/posts/comments by entering `npm run seed`.
8. Finally, enter `npm start` in your terminal.
9. You can now go to `https://localhost:3001/` and use the application.

## Usage
If the demo video link is unavailable, you can find the video in `public/assets/demo-video`


## Dependencies
npm:
- bcrypt v5.1.1
- bcryptjs v2.4.3
- connect-session-sequelize v7.1.7
- date-fns v2.30.0
- dotenv v16.3.1
- express v4.18.2
- express-handlebars v7.1.2
- express-session v1.17.3
- mysql2 v3.6.1
- sequelize v6.33.0
- sequelize-cli v6.6.1

## License
MIT

## Deployed Site
https://zelstart-tech-blog-7449797524ee.herokuapp.com/
