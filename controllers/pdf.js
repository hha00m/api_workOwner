const fs = require("fs");
const puppeteer = require("puppeteer");
const fse = require("fs-extra");
const hbs = require("handlebars");
const data = require('./pdf/data.json');

exports.readpdf = (req, res) => {
    try {
        var filePath = req?.query?.path;
        const fullPath = __dirname + "/../" + filePath;
        fs.readFile(fullPath, function (err, data) {
            console.log(data)
            res.contentType("application/pdf");
            // return res.send(data);
            res.send(data);
        });
    } catch (err) {
        res.status(400).json({
            error: err,
            success: false,
        });
    }
};
const compile = async function (templateName, data) {
    const filePath = __dirname + templateName;

    // const filePath = path.join('./pdf/' + `${ templateName }.hbs`);
    const html = await fse.readFile(filePath, 'utf8');
    console.log(html)
    return hbs.compile(html)(data);
};
exports.pdfReportDriver = async (req, res, next) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const content = await compile(`/../clientStatements/reports.hbs`, req.body);
        await page.setContent(content);
        await page.pdf({
            path: req.body.invoice.path,
            format: 'A4',
            printBackground: true,
            landscape: true,
            margin: {
                top: '15px',
                right: '20px',
                bottom: '15px',
                left: '20px',
            },
        })

        console.log("done creating pdf");
        await browser.close();
        // process.exit();
    } catch (e) {
        res.status(400).json({
            error: e,
            success: false,
        });
    }
    next();
};
exports.pdfGen = async (req, res, next) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        req.body.invoice.createdAt = req.body.invoice.createdAt.split('T')[0];
        const content = await compile(`/../clientStatements/indexNoStatus.hbs`, req.body);
        await page.setContent(content);
        await page.pdf({
            path: req.body.invoice.path,
            format: 'A4',
            printBackground: true,
            landscape: true,
            displayHeaderFooter: true,
            pageRanges: '1',
            margin: {
                top: '15px',
                right: '20px',
                bottom: '15px',
                left: '20px',
            },

        })

        console.log("done creating pdf");
        await browser.close();
        // process.exit();
    } catch (e) {
        res.status(400).json({
            error: e,
            success: false,
        });
    }
    next();
};
exports.pdfReturnClient = async (req, res, next) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        req.body.invoice.createdAt = req.body.invoice.createdAt.split('T')[0];
        const content = await compile(`/../clientStatements/indexReturnClient.hbs`, req.body);
        await page.setContent(content);
        await page.pdf({
            path: req.body.invoice.path,
            format: 'A4',
            printBackground: true,
            landscape: true,
            margin: {
                top: '15px',
                right: '20px',
                bottom: '15px',
                left: '20px',
            },

        })

        console.log("done creating pdf");
        await browser.close();
        // process.exit();
    } catch (e) {
        res.status(400).json({
            error: e,
            success: false,
        });
    }
    next();
};
exports.pdfReturnDriver = async (req, res, next) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        req.body.invoice.createdAt = req.body.invoice.createdAt.split('T')[0];
        const content = await compile(`/../clientStatements/indexReturnDriver.hbs`, req.body);
        await page.setContent(content);
        await page.pdf({
            path: req.body.invoice.path,
            format: 'A4',
            printBackground: true,
            landscape: true,
            margin: {
                top: '15px',
                right: '20px',
                bottom: '15px',
                left: '20px',
            },

        })

        console.log("done creating pdf");
        await browser.close();
        // process.exit();
    } catch (e) {
        res.status(400).json({
            error: e,
            success: false,
        });
    }
    next();
};
exports.pdfReturnBranch = async (req, res, next) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        req.body.invoice.createdAt = req.body.invoice.createdAt.split('T')[0];
        const content = await compile(`/../clientStatements/indexReturnBranch.hbs`, req.body);
        await page.setContent(content);
        await page.pdf({
            path: req.body.invoice.path,
            format: 'A4',
            printBackground: true,
            landscape: true,
            margin: {
                top: '15px',
                right: '20px',
                bottom: '15px',
                left: '20px',
            },

        })

        console.log("done creating pdf");
        await browser.close();
        // process.exit();
    } catch (e) {
        res.status(400).json({
            error: e,
            success: false,
        });
    }
    next();
};
exports.pdfDeliveried_client = async (req, res, next) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        req.body.invoice.createdAt = req.body.invoice.createdAt.split('T')[0];
        const content = await compile(`/../clientStatements/indexDeliveriedClient.hbs`, req.body);
        await page.setContent(content);
        await page.pdf({
            path: req.body.invoice.path,
            format: 'A4',
            printBackground: true,
            landscape: true,
            margin: {
                top: '15px',
                right: '20px',
                bottom: '15px',
                left: '20px',
            },
        })

        console.log("done creating pdf");
        await browser.close();
        // process.exit();
    } catch (e) {
        res.status(400).json({
            error: e,
            success: false,
        });
    }
    next();
};
exports.pdfDeliveried_driver = async (req, res, next) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        req.body.invoice.createdAt = req.body.invoice.createdAt.split('T')[0];
        const content = await compile(`/../clientStatements/indexDeliveriedDriver.hbs`, req.body);
        await page.setContent(content);
        await page.pdf({
            path: req.body.invoice.path,
            format: 'A4',
            printBackground: true,
            landscape: true,
            margin: {
                top: '15px',
                right: '20px',
                bottom: '15px',
                left: '20px',
            },
        })

        console.log("done creating pdf");
        await browser.close();
        // process.exit();
    } catch (e) {
        res.status(400).json({
            error: e,
            success: false,
        });
    }
    next();
};
exports.pdfDeliveried_branch = async (req, res, next) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        req.body.invoice.createdAt = req.body.invoice.createdAt.split('T')[0];
        const content = await compile(`/../clientStatements/indexDeliveriedBranch.hbs`, req.body);
        await page.setContent(content);
        await page.pdf({
            path: req.body.invoice.path,
            format: 'A4',
            printBackground: true,
            landscape: true,
            margin: {
                top: '15px',
                right: '20px',
                bottom: '15px',
                left: '20px',
            },
        })

        console.log("done creating pdf");
        await browser.close();
        // process.exit();
    } catch (e) {
        res.status(400).json({
            error: e,
            success: false,
        });
    }
    next();
};