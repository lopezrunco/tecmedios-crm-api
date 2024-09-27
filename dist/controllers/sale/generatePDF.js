"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PDFDocument = require("pdfkit");
const stream_1 = require("stream");
const logging_1 = __importDefault(require("../../config/logging"));
const sale_1 = __importDefault(require("../../models/sale"));
module.exports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sale = yield sale_1.default.findOne({ _id: req.params.id });
        if (!sale) {
            return res.status(404).json({
                message: `Sale ${req.params.id} not found.`
            });
        }
        // Create a new PDF document.
        const doc = new PDFDocument();
        // Create a PassThrough stream in Node, which is a type of stream 
        // that passes the data it receives to its output.
        const passThrough = new stream_1.PassThrough();
        // Set the response headers to say the client's browser how to handle the response, in this case, a PDF file.
        res.setHeader('Content-Disposition', `attachment; filename=sale-${sale._id}.pdf`);
        res.setHeader('Content-Type', 'application/pdf');
        // Pipe the PDF document to the response.
        doc.pipe(passThrough); // Tell the doc stream to send its output to the passThrough stream.
        passThrough.pipe(res); // Connect the passThrough stream to the HTTP response object.
        // Add content to the PDF.
        doc.fontSize(20).text('Reporte de la venta', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Id de la venta: ${sale._id}`);
        doc.text(`ID del comprador: ${sale.customerId}`);
        doc.text(`ID del vendedor: ${sale.sellerId}`);
        doc.text(`Metodo de pago: ${sale.paymentMethod}`);
        doc.text(`Moneda: ${sale.currency}`);
        doc.text(`Precio total: ${sale.price}`);
        doc.text(`Commisión: ${sale.commission}`);
        doc.text(`Delivery: Desde ${sale.delivery.fromTimestamp} a ${sale.delivery.toTimestamp}`);
        doc.text(`Instalador: ${sale.delivery.installer}`);
        doc.text(`Productos: ${sale.products}`);
        doc.text(`Beneficios: ${sale.benefit}`);
        doc.text(`Observaciones: ${sale.observations}`);
        doc.text('Este es un texto de ejemplo.');
        // Finalize the PDF and end the stream.
        doc.end();
    }
    catch (error) {
        logging_1.default.error(`Error: ${error}`);
        res.status(500).json({ message: `Error trying to generate the PDF for the sale ${req.params.id}.` });
    }
});
//# sourceMappingURL=generatePDF.js.map