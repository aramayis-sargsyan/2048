const { exec } = require("child_process");

// prettier-ignore
exec("npx prettier --write \"**/*.{js,jsx,ts,tsx,json,md}\"", (err) => {
    err && console.error(err);
});
