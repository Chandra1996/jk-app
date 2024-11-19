import { TestBed } from '@angular/core/testing';

import { DocumentsManagementService } from './documents-management.service';

describe('DocumentsManagementService', () => {
  let service: DocumentsManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentsManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
