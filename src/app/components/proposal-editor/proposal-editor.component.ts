import { Component, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { ActivatedRoute } from '@angular/router';
import { Proposal } from '../../shared/hal-resources/proposal-resource';
import { Project } from '../../shared/hal-resources/project.resource';
import { ProjectService } from '../../core/services/project.service';
import { ProposalService } from '../../core/services/proposal.service';
import { KeyCloakUser } from '../../keycloak/KeyCloakUser';
import { FormControl } from '@angular/forms';

export type ViewMode = 'editor' | 'preview';

@Component({
  selector: 'app-proposal-editor',
  templateUrl: './proposal-editor.component.html',
  styleUrls: ['./proposal-editor.component.scss']
})
export class ProposalEditorComponent implements OnInit {
  viewMode: ViewMode = 'editor';
  proposalID: UUID;
  proposal: Proposal;
  project: Project;

  proposalFormControl = new FormControl('');

  constructor(
    private projectService: ProjectService,
    private proposalService: ProposalService,
    private route: ActivatedRoute,
    private user: KeyCloakUser
  ) {
    this.route.params.subscribe(params => (this.proposalID = params.id));
  }

  ngOnInit() {
    this.getProposal();
    this.proposalFormControl.setValue(this.proposal.content);
  }

  getProposal() {
    this.proposalService.get(this.proposalID).subscribe(
      proposal => {
        this.proposal = proposal;
        this.proposalFormControl.setValue(proposal.content);
      },
      error1 => {},
      () => this.getProject()
    );
  }

  private getProject() {
    this.projectService.get(this.proposal.projectId).subscribe(project => (this.project = project));
  }

  patchProposalContent() {
    this.proposal.content = this.proposalFormControl.value;
    this.proposalService.patch(this.proposal).subscribe();
  }

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
