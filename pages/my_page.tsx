import * as fs from 'fs';

/*

NextJS does not change the value of BUILD_ID during Incremental Static Regeneration.
The BUILD_ID value is a unique identifier that is generated when the NextJS application is built,
and it remains the same throughout the application's lifecycle.
It is typically used to identify the specific build of the application,
and it can be useful for cache busting and other purposes.

 */

// Get the build ID for the current build of the NextJS app
const buildId = process.env.BUILD_ID;

async function getStaticProps() {
    // Check if the file was already created in this build of the app
    if (!fs.existsSync(`my-file-${buildId}.txt`)) {
        // Create a new file for this build of the NextJS app
        await fs.promises.writeFile(`my-file-${buildId}.txt`, '');
    }

    // Write a string to the file when the getStaticProps function is called
    await fs.promises.appendFile(`my-file-${buildId}.txt`, 'This is a line added to the file.\n');

    // Return the props for the page
    return {
        props: {
            // ...
        }
    }
}

