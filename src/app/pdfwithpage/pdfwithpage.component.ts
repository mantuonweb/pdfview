import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare var pdfjsLib;
pdfjsLib.GlobalWorkerOptions.workerSrc = './assets/build/pdf.worker.min.js'
@Component({
  selector: 'pdfwithpage',
  templateUrl: './pdfwithpage.component.html',
  styleUrls: ['./pdfwithpage.component.scss']
})
export class PdfwithpageComponent implements OnInit {
  url = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf';
  pdfDoc = null;
  pageNum = 1;
  pageRendering = false;
  pageNumPending = null;
  scale = 1;
  canvas;
  ctx;
  page_num
  pageCount;
  pageArray = new Array(12);
  @ViewChild('pageCanvas') pageCanvas: ElementRef;
  constructor() { }
  /**
     * Get page info from document, resize canvas accordingly, and render page.
     * @param num Page number.
     */
  renderPage(num) {
    this.pageRendering = true;
    // Using promise to fetch the page
    this.pdfDoc.getPage(num).then((page) => {
      var viewport = page.getViewport({ scale: this.scale });
      this.canvas.height = viewport.height;
      this.canvas.width = viewport.width;

      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: this.ctx,
        viewport: viewport
      };
      var renderTask = page.render(renderContext);

      // Wait for rendering to finish
      renderTask.promise.then(() => {
        this.pageRendering = false;
        if (this.pageNumPending !== null) {
          // New page rendering is pending
          this.renderPage(this.pageNumPending);
          this.pageNumPending = null;
        }
      });
    });

    // Update page counters
    this.pageCount = num;
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.canvas = this.pageCanvas.nativeElement//document.getElementById('the-canvas'),
      this.ctx = this.canvas.getContext('2d');
      pdfjsLib.getDocument(this.url).promise.then((pdfDoc_) => {
        this.pdfDoc = pdfDoc_;
        this.pageCount = this.pdfDoc.numPages;
        this.pageArray = new Array(this.pageCount)
        // // Initial/first page rendering
        this.renderPage(this.pageNum);
      });
    }, 0)

  }
  /**
     * If another page rendering in progress, waits until the rendering is
     * finised. Otherwise, executes rendering immediately.
     */
  queueRenderPage(num) {
    if (this.pageRendering) {
      this.pageNumPending = num;
    } else {
      this.renderPage(num);
    }
  }

  /**
   * Displays previous page.
   */
  onPrevPage() {
    if (this.pageNum <= 1) {
      return;
    }
    this.pageNum--;
    this.queueRenderPage(this.pageNum);
  }
  // document.getElementById('prev').addEventListener('click', onPrevPage);

  /**
   * Displays next page.
   */
  onNextPage() {
    if (this.pageNum >= this.pdfDoc.numPages) {
      return;
    }
    this.pageNum++;
    this.queueRenderPage(this.pageNum);
  }
  onChange() {
    this.renderPage(+this.pageNum);
  }

}
