// this is a custom dictionary to make it easy to extend/override
// provide a name for an entry, it can be anything such as 'copyAssets' or 'copyFonts'
// then provide an object with a `src` array of globs and a `dest` string
module.exports = {
  copyAssets: {
    src: ['{{SRC}}/assets/**/*'],
    dest: '{{WWW}}/assets'
  },
  copyIndexContent: {
    src: ['{{SRC}}/index.html', '{{SRC}}/manifest.json', '{{SRC}}/service-worker.js'],
    dest: '{{WWW}}'
  },
  copyFonts: {
    src: ['{{ROOT}}/node_modules/ionicons/dist/fonts/**/*', '{{ROOT}}/node_modules/ionic-angular/fonts/**/*'],
    dest: '{{WWW}}/assets/fonts'
  },
  copyPolyfills: {
    src: [`{{ROOT}}/node_modules/ionic-angular/polyfills/${process.env.IONIC_POLYFILL_FILE_NAME}`],
    dest: '{{BUILD}}'
  },
  copySwToolbox: {
    src: ['{{ROOT}}/node_modules/sw-toolbox/sw-toolbox.js'],
    dest: '{{BUILD}}'
  },
  copyBootstrap: {
    src: ['{{ROOT}}/node_modules/bootstrap/js/bootstrap.min.js'],
    dest: '{{BUILD}}'
  },
  copyJquery: {
    src: ['{{ROOT}}/node_modules/jquery/jquery.min.js'],
    dest: '{{BUILD}}'
  },
  copyPopper: {
    src: ['{{ROOT}}/node_modules/assets/plugins/popper/popper.js'],
    dest: '{{BUILD}}'
  },
  copyJqueryBlockui: {
    src: ['{{ROOT}}/node_modules/assets/plugins/jquery-blockui/jquery.blockui.min.js'],
    dest: '{{BUILD}}'
  },
  copyJquerySlimscroll: {
    src: ['{{ROOT}}/node_modules/assets/plugins/jquery-slimscroll/jquery.slimscroll.js'],
    dest: '{{BUILD}}'
  },
  copyBootstrapSwitch: {
    src: ['{{ROOT}}/node_modules/assets/plugins/bootstrap-switch/js/bootstrap-switch.min.js'],
    dest: '{{BUILD}}'
  },
  copyOwlCarousel: {
    src: ['{{ROOT}}/node_modules/assets/plugins/owl-carousel/owl.carousel.js'],
    dest: '{{BUILD}}'
  },
  copyMaterial: {
    src: ['{{ROOT}}/node_modules/assets/plugins/material/material.min.js'],
    dest: '{{BUILD}}'
  },
  copyOwlCarouselCSS: {
    src: ['{{ROOT}}/node_modules/assets/plugins/owl-carousel/owl.carousel.css'],
    dest: '{{BUILD}}'
  },
  copyOwlCarouselTheme: {
    src: ['{{ROOT}}/node_modules/assets/plugins/owl-carousel/owl.theme.css'],
    dest: '{{BUILD}}'
  }
};
