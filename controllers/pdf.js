const fs = require("fs");
const PDFDocument = require("pdfkit-table");

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
        console.log(err);
    }
};
exports.returnPdf = (req, res) => {
    try {

        let doc = new PDFDocument({ margin: 15, size: 'A4', layout: 'landscape', info: { Title: "كشف راجع" } });
        doc.pipe(fs.createWriteStream(req.body.invoice.path));

        const customFontRegular = fs.readFileSync(`./controllers/fonts/Cairo-Regular.ttf`);
        const customFontBold = fs.readFileSync('./controllers/fonts/Cairo-Bold.ttf');
        doc.registerFont(`Amiri-Regular`, customFontRegular);
        doc.registerFont(`Amiri-Bold`, customFontBold);

        const statmentDetails = {
            headers: ["اسم ", "بدون"],
            rows: [
                ["العميل", req.body.invoice.store.client.name],
                ["الكشف", req.body.invoice.invoiceNumber],
                // ["المحاسب", req.body.invoice],
                ["التاريخ", req.body.invoice.createdAt],
            ],
        };
        doc.table(statmentDetails, {
            width: 150,
            prepareHeader: () => doc.font("Amiri-Bold").fontSize(8),
            prepareRow: (row, indexColumn, indexRow, rectRow) => {
                doc.font("Amiri-Regular").fontSize(8);
            }
        });
        doc.moveDown();
        const table = {
            headers: [
                { label: "رقم الوصل", property: 'shipment_no', width: 50, renderer: null, align: 'center' },
                { label: "أسم الصفحة", property: 'store', width: 120, renderer: null, align: 'center' },
                { label: "التاريخ", property: 'createAt', width: 50, renderer: null, align: 'center' },
                { label: "العنوان", property: 'address', width: 100, renderer: null, align: 'center' },
                { label: "موبايل", property: 'customerMobile', width: 50, renderer: null, align: 'center' },
                { label: "مبلغ الوصل", property: 'originalPrice', width: 50, renderer: null, align: 'center' },
                { label: "مبلغ المستلم", property: 'newlPrice', width: 50, renderer: null, align: 'center' },
                { label: "سعر التوصيل", property: 'clientDeliveryPrice', width: 50, renderer: null, align: 'center' },
                { label: "الصافي", align: 'center', property: 'total', width: 50, renderer: (value, indexColumn, indexRow, row) => { return `U$ ${Number(value).toFixed(2)}` } },
            ],

            datas: req.body.data,
        };

        doc.table(table, {
            prepareHeader: () => doc.font("Amiri-Bold").fontSize(10),
            prepareRow: (row, indexColumn, indexRow, rectRow) => {
                doc.font("Amiri-Regular").fontSize(8);
                indexRow % 2 == 1 && doc.addBackground(rectRow, '#f4f4f4', 0.15)
            }
        });

        doc.pipe(res);

        doc.end();
    } catch (error) {
        return res.status(400).json({
            success: false,
        });
    }


};