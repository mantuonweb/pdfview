import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'pdfpage',
  templateUrl: './pdfpage.component.html',
  styleUrls: ['./pdfpage.component.scss']
})
export class PdfpageComponent implements OnInit {
  @Input("page") page;
  @Input("pdf") pdf;
  @ViewChild('pageCanvas') pageCanvas:ElementRef;
  pageRendering;
  scale = 1;
  canvas;
  ctx;
  constructor() { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.canvas = this.pageCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.renderPage(+this.page+1);
    })
  }
  renderPage(num) {
    this.pageRendering = true;
    // Using promise to fetch the page
    this.pdf.getPage(num).then((page) => {
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
        // this.pageRendering = false;
        // if (this.pageNumPending !== null) {
        //   // New page rendering is pending
        //   this.renderPage(this.pageNumPending);
        //   this.pageNumPending = null;
        // }
      });
    });
  }

}
