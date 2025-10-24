const fs = require("fs");
const pdf = require("pdf-parse");
const extractFirstPagePreview = async (pdfPath) => {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);

    // Extract first few lines
    const firstPageText = data.text.split("\n").slice(0, 5).join(" ");
    return firstPageText;
}

module.exports = {
    extractFirstPagePreview
}