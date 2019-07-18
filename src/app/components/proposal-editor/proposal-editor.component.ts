import { Component, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { ActivatedRoute } from '@angular/router';

export type ViewMode = 'editor' | 'preview';

@Component({
  selector: 'app-proposal-editor',
  templateUrl: './proposal-editor.component.html',
  styleUrls: ['./proposal-editor.component.scss']
})
export class ProposalEditorComponent implements OnInit {
  viewMode: ViewMode = 'editor';
  proposalID: UUID;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => (this.proposalID = params.id));
  }

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
