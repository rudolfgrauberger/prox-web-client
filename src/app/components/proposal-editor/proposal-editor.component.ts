import { Component, OnInit } from '@angular/core';

export type ViewMode = 'editor' | 'preview';

@Component({
  selector: 'app-proposal-editor',
  templateUrl: './proposal-editor.component.html',
  styleUrls: ['./proposal-editor.component.scss']
})
export class ProposalEditorComponent implements OnInit {
  viewMode: ViewMode = 'editor';
  constructor() {}

  ngOnInit() {}

  get showEditor() {
    return this.viewMode === 'editor';
  }

  get showPreview() {
    return this.viewMode === 'preview';
  }

  toggleViewMode(type: ViewMode) {
    this.viewMode = type;
  }
}
