class htmlAfterWebpackPulign {
  constructor() {
    this.name = 'htmlAfterWebpackPulign';
  }
  apply(compiler) {
    debugger;
    compiler.hooks.compilation.tap('htmlAfterWebpackPulign', (compilation) => {
      console.log('🍎');
      debugger
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap('htmlAfterWebpackPulign', (data) => {
        const result = data.assets.js;
        debugger;
        console.log('🍌🍌🍌🍌🍌', result);
        let _html = data.html;
        _html = _html.replace('<!--injects-->', result.map(d => {
          return `<script src="./${d}"></script>`
        }).join(''));
        data.html = _html;
      })
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tap('htmlAfterWebpackPulign', (data) => {
        debugger;
      })
      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap('htmlAfterWebpackPulign', (data) => {
        debugger;
      })
      compilation.hooks.htmlWebpackPluginAfterEmit.tap('htmlAfterWebpackPulign', (data) => {
        debugger;
      })
      
    });
  }
}


module.exports = htmlAfterWebpackPulign;