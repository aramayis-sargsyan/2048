const { exec } = require("child_process");

exec("npx eslint --ext .js,.jsx,.ts,.tsx src --color", (err) => {
    err && console.warn(err);
});
