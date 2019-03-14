import { TestBed } from '@angular/core/testing';

import { ProjectModuleService } from './projectModule.service';

describe('ProjectModuleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectModuleService = TestBed.get(ProjectModuleService);
    expect(service).toBeTruthy();
  });
});
