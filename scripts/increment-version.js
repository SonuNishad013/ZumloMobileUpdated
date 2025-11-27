const fs = require('fs');
const path = require('path');

const buildGradlePath = path.join(__dirname, '../android/app/build.gradle');

try {
    let buildGradleContent = fs.readFileSync(buildGradlePath, 'utf8');

    // Regex to find versionCode in defaultConfig
    // It looks for "versionCode" followed by whitespace and digits
    const versionCodeRegex = /versionCode\s+(\d+)/;

    const match = buildGradleContent.match(versionCodeRegex);

    if (match) {
        const currentVersionCode = parseInt(match[1], 10);
        const newVersionCode = currentVersionCode + 1;

        const newContent = buildGradleContent.replace(versionCodeRegex, `versionCode ${newVersionCode}`);

        fs.writeFileSync(buildGradlePath, newContent, 'utf8');
        console.log(`Successfully incremented versionCode from ${currentVersionCode} to ${newVersionCode}`);
    } else {
        console.error('Could not find versionCode in build.gradle');
        process.exit(1);
    }
} catch (error) {
    console.error('Error updating build.gradle:', error);
    process.exit(1);
}
