import { HighlightPipe } from './highlight.pipe';

describe('HighlightPipe', () => {
  let pipe: HighlightPipe;

  beforeEach(() => {
    pipe = new HighlightPipe();
  });

  it('should return the same value when input is not a string', () => {
    const value = 123;
    const result = pipe.transform(value);

    expect(result).toEqual(value);
  });

  it('should return the same value when input string does not start with target prefix', () => {
    const value = 'XYZ 123';
    const result = pipe.transform(value);

    expect(result).toEqual(value);
  });

  it('should return highlighted value when input string starts with a prefix and number is less than or equal to 30', () => {
    const value = 'BKN30';
    const expected = '<span class="text-highlight-blue">BKN30</span>';
    const result = pipe.transform(value);

    expect(result).toEqual(expected);
  });

  it('should return highlighted value when input string starts with a prefix and number is greater than 30', () => {
    const value = 'BKN31';
    const expected = '<span class="text-highlight-red">BKN31</span>';
    const result = pipe.transform(value);

    expect(result).toEqual(expected);
  });

  it('should return the same value when input string starts with a prefix but does not contain a number', () => {
    const value = 'BKNXYZ';
    const result = pipe.transform(value);

    expect(result).toEqual(value);
  });
});
