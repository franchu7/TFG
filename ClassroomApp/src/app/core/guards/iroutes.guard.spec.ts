import { TestBed } from '@angular/core/testing';

import { IroutesGuard } from './iroutes.guard';

describe('IroutesGuard', () => {
  let guard: IroutesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IroutesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
