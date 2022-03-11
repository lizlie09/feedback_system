'use strict';

var Handlebars = require('handlebars'),
    Hoek = require('hoek'),
    internals = {},
    Inert = require('inert'),
    Marked = require('marked'),
    Path = require('path'),
    Vision = require('vision'),
    Swag = require('swag');

Swag.registerHelpers(Handlebars);
function MarkdownView() {

  this.compile = function (template) {
    return function (context) {
      var html = Marked(template, context);
      return `<link rel="stylesheet" href="/assets/github-markdown.css">
              <style>
                  .markdown-body {
                      box-sizing: border-box;
                      min-width: 200px;
                      max-width: 980px;
                      margin: 0 auto;
                      padding: 45px;
                  }
              </style>
              <article class="markdown-body">
                  ${html}
              </article>`;
    };
  };
}

/**
 * ## init
 *
 */
internals.init = function (server) {
  server.register(Vision, (err) => {
    Hoek.assert(!err,err);
    server.views({
      engines: {
       'html': Handlebars,
        'md': {
          module: new MarkdownView(),
          contentType: 'text/html'
        },
      },
      isCached: false,
      relativeTo: __dirname,
      path: [Path.join(__dirname, '../views'),Path.join(__dirname, '../docs')],
      layout: true,
      layoutPath: Path.join(__dirname, '../views/layout'),
      partialsPath: '../views/partials',
      helpersPath: '../views/helpers',
    });
  });

  server.register(Inert, (err) => {

    //Confirm no err
    Hoek.assert(!err,err);
    //Load files located in ../assets
    server.route({
      method: 'GET',
      path: '/assets/{param*}',
      handler: {
        directory: {
          path: Path.join(__dirname, '../assets')
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/reports/{param*}',
      handler: {
        directory: {
          path: Path.join(__dirname, '../reports')
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/media/{param*}',
      handler: {
        directory: {
          path: Path.join(__dirname, '../uploads')
        }
      }
    });
  });
};

module.exports = internals;
