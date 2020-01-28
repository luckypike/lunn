import '@glidejs/glide/dist/css/glide.core'
require('normalize.css/normalize.css')
require('@rails/ujs').start()

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

var componentRequireContext = require.context('components', true)
var ReactRailsUJS = require('react_ujs')
ReactRailsUJS.useContext(componentRequireContext)
