const subject = require('../src/components/format-seconds-to-hmmss').default;

describe('Format seconds to h:mm:ss', () => {
  describe('less than a minitue', () => {
    it('should return mm:ss with 0 before the seconds if it is less than 10', () => {
      expect(subject(1)).toBe('00:01');
    });

    it('should return mm:ss with correct number', () => {
      expect(subject(59)).toBe('00:59');
    });
  });

  describe('more than a minitue and less than an hour', () => {
    it('should return mm:ss format with 0 before the minitues if it is less than 10', () => {
      expect(subject(60 * 2)).toBe('02:00');
    });

    it('should return mm:ss with correct number', () => {
      expect(subject(60 * 10)).toBe('10:00');
    });
  });

  describe('more than an hour', () => {
    it('should return h:mm:ss with correct number', () => {
      expect(subject(60 * 60)).toBe('1:00:00');
    });
  });
})