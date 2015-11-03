'use strict';

const fs = require('fs');
const path = require('path');
const l = require('lodash');
const openfile = require('open');

module.exports = report;

function report(jsonReportPath) {
  let data = JSON.parse(fs.readFileSync(jsonReportPath, 'utf-8'));
  let templateFn = path.join(
    path.dirname(__filename),
    '../report/index.html.ejs');
  let template = fs.readFileSync(templateFn, 'utf-8');
  let compiledTemplate = l.template(template);
  let html = compiledTemplate({report: JSON.stringify(data, null, 2)});
  let reportFilename = jsonReportPath + '.html';
  fs.writeFileSync(
    reportFilename,
    html,
    {encoding: 'utf-8', flag: 'w'});
  console.log('Report generated: %s', reportFilename);
  openfile(reportFilename);
}