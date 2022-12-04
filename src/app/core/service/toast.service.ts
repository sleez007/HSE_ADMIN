import { Injectable } from '@angular/core';
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private readonly messageService: MessageService) { }

  showError(summary: string, detail: string) {
    this.messageService.add({severity: 'error', summary,detail})
  }

  showSuccess(summary: string, detail: string) {
    this.messageService.add({severity: 'success', summary,detail})
  }
}
