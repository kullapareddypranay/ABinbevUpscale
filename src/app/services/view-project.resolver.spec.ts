import { TestBed } from '@angular/core/testing';

import { ViewProjectResolver } from './view-project.resolver';

describe('ViewProjectResolver', () => {
  let resolver: ViewProjectResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ViewProjectResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
