/* eslint-disable */

var urlParams;
(function() {
  window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
      urlParams[decode(match[1])] = decode(match[2]);
  }
  window.onpopstate();
})();

/*
  Parser
*/
var Parser = function(output) {
    this.playerWrapper = document.getElementById('player-wrapper')
    this.output = output
    this.console = document.getElementById('console')
    this.context = document
}

Parser.prototype = {
    parse: function(code) {
        try {
            player.stopListening()
            while (this.playerWrapper.firstChild) this.playerWrapper.removeChild(this.playerWrapper.firstChild)
            eval(code)
            this.console.innerHTML = ''
        } catch (err) {
            this.console.innerText = err.message
        }
    }
}

/*
  Editor
*/
window.onload = function() {
    var parser = new Parser(document.getElementById('output'))
    document.querySelector('.run').addEventListener('click', () => {
        var code = ace.edit('editor').getSession().getValue()
        parser.parse(code)
    })

    var editor = ace.edit('editor')
    var session = editor.getSession()

    editor.setTheme('ace/theme/katzenmilch')
    editor.$blockScrolling = Infinity
    session.setMode('ace/mode/javascript')
    session.setTabSize(2)
    session.setUseSoftTabs(true)
    editor.commands.addCommand({
        name: 'run',
        bindKey: {
            mac: 'Command-Enter'
        },
        exec: function(editor) {
            document.querySelector('.run').click()
        },
    })
}
