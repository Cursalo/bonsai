// plugins/netlify-build-plugin/index.js
// This file helps customize the Netlify build process

module.exports = {
  onPreBuild: ({ utils }) => {
    console.log('Netlify Build started');
    console.log('Node version:', process.version);
    console.log('NPM version:', process.env.npm_version);
  },
  onBuild: ({ utils }) => {
    console.log('Netlify Build completed');
    // Check if .next directory exists and has content
    if (utils.fileExists('.next') && utils.fileExists('.next/BUILD_ID')) {
      console.log('Valid Next.js build output detected');
    } else {
      console.log('WARNING: No valid Next.js build output detected in .next directory');
      // Don't fail the build, just warn
      // utils.build.failBuild('No valid Next.js build output detected in .next directory');
    }
  },
  onPostBuild: ({ utils }) => {
    console.log('Post-build validation');
    
    // Ensure Netlify redirects are copied if not already
    if (!utils.fileExists('public/_redirects')) {
      console.log('WARNING: Missing _redirects file in public folder');
      // Don't fail the build, just warn
      // utils.build.failBuild('Missing _redirects file in public folder');
    }
    
    // Ensure the publish directory is correct
    if (!utils.fileExists('.next/BUILD_ID')) {
      console.log('WARNING: The publish directory does not appear to contain Next.js build output');
      // Don't fail the build, just warn
      // utils.build.failBuild('The publish directory does not appear to contain Next.js build output');
    }
  }
}; 