import { TranslatePipe } from './translate.pipe';

describe('TranslatePipe', () => {
  it('create an instance', () => {
    const pipe = new TranslatePipe(undefined);
    expect(pipe).toBeTruthy();
  });
});
