---
title: Build quick report on nodejs server side with EJS template and ChartJS
description: NodeJS Quick PDF Report
tags: [nodejs, report, pdf, backend, chartjs]
authors: [niko]
---

## Build quick report on nodejs server side with EJS template and ChartJS

Concepts:

1. Define report template like as HTML view by EJS syntax
2. Draw chart by ChartJS into HTML view template
3. Using EJS engine to render HTML view from HTML template
4. Create new Chromium instance as headless browser using Puppeteer to render HTML template
5. Create PDF from headless browser view
6. Create report blob and free resources.

<!-- truncate -->

## Install

[![nodejs-pdf-report](https://nodei.co/npm/nodejs-pdf-report.png)](https://npmjs.org/package/nodejs-pdf-report)

```bash
npm install --save nodejs-pdf-report
```

## Supports

- Base html template with [EJS](https://github.com/mde/ejs) engine.
- Embeded [Chart.js v2.9.3](https://www.chartjs.org).
- Server side without browser.

## Examples

- Import from package

```javascript
   import { HtmlReport, ReportOptions } from "nodejs-pdf-report";
```

- Define configures

```javascript
const reportOptions: ReportOptions = {
  title: "Test report with chartjs",
  useChartJs: true,
  pdfOptions: {
    margin: {
      top: "100px",
      bottom: "200px",
      right: "30px",
      left: "30px",
    },
  },
  template: "template.ejs",
  headerTemplate: "header-template.ejs",
  footerTemplate: "footer-template.ejs",
  styles: [
      "styles.css"
  ],
  scripts: [
    "utils.js",
    "index.js",
  ],
  data: {
    users: [
        {
            name: "Luong Phung",
        },
        {
            name: "Jasmine",
        },
    ],
    title: "Test report with chartjs",
    author: "Luong Phung",
    time: "2020",
  },
};
```

- Create pdf file as buffer

```javascript
  const htmlReport = new HtmlReport();
  const reportPdf = await htmlReport.createPdf(reportOptions);
  const savePath = path.resolve("./chartjs_report.pdf");
  fs.writeFileSync(savePath, reportPdf, "binary");
```

- Check you report file _"chartjs_report.pdf"_

## Screens shot

![output1.png](https://raw.githubusercontent.com/krakenui/nodejs-pdf-report/master/screen-shots/output1.png)

## API references

### PdfOptions

| Name            | type                         | default      | Description                                 |
| --------------- | ---------------------------- | ------------ | ------------------------------------------- |
| scale           | number                       | 1            | Scale of the webpage rendering              |
| printBackground | boolean                      | false        | Print background graphics.                  |
| landscape       | boolean                      | false        | Paper orientation                           |
| format          | string                       | "A4"         | Page format as : "Letter" "A0" ... "A4" ... |
| margin          | `{top, bottom, left, right}` | {0, 0, 0, 0} | Page margin as number of pixels             |

### ReportOptions

| Name           | type                       | default | Description            |
| -------------- | -------------------------- | ------- | ---------------------- |
| title          | string                     | null    | Pdf report title       |
| useChartJs     | boolean                    | false   | Use chartjs as default |
| pdfOptions     | [PdfOptions](/#PdfOptions) | null    | any                    |
| template       | string                     | null    | Template path          |
| footerTemplate | string                     | null    | Footer template path   |
| headerTemplate | string                     | null    | Header template path   |
| styles         | string[]                   | []      | Style paths            |
| scripts        | string[]                   | []      | Scripts paths          |
| data           | object                     | {}      | Report data            |

## 4. References

- [nodejs-pdf-report](https://github.com/krakenui/nodejs-pdf-report)
- [Puppeteer](https://github.com/puppeteer/puppeteer)
- [EJS](https://ejs.co/)
