let purgeEnabled = false;

if (process.argv.length > 0) {
    purgeEnabled = process.argv.includes('--purge=true')
}

module.exports = {
    purge: {
      enabled: purgeEnabled,
      content: ['./website/**/*.html', 
	  './website/public/react/**/*.js', 
	  './website/public/vue/**/*.js', 
	  './website/public/svelte/**/*.js']
      },
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }