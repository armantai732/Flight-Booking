import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadTicket = async (element) => {

  if (!element) {
    alert("Ticket not found");
    return;
  }

  try {

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imageWidth = pdfWidth - 20;

    const imageHeight =
      (canvas.height * imageWidth) / canvas.width;

    let finalHeight = imageHeight;

    if (finalHeight > pdfHeight - 20) {
      finalHeight = pdfHeight - 20;
    }

    pdf.addImage(
      imgData,
      "PNG",
      10,
      10,
      imageWidth,
      finalHeight
    );

    pdf.save("Flight-Ticket.pdf");

  } catch (error) {

    console.error("Ticket Download Error:", error);

    alert("Failed to download ticket");

  }
};