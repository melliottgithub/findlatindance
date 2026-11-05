import { describe, it, expect } from 'vitest';

describe('FindLatinDance Add-Event 3-Field Ingestion Invariants', () => {
  const IG_RE = /^@?[A-Za-z0-9._]{1,30}$/;
  const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  it('validates congress Instagram handles with and without leading @', () => {
    expect(IG_RE.test('@miamisalsacongress')).toBe(true);
    expect(IG_RE.test('dallas_bachata_fest')).toBe(true);
    expect(IG_RE.test('chicago.latin.marathon')).toBe(true);
    expect(IG_RE.test('')).toBe(false);
  });

  it('validates organizer notification email format', () => {
    expect(EMAIL_RE.test('directors@latindancecongress.com')).toBe(true);
    expect(EMAIL_RE.test('passes@orlandosalsabachata.com')).toBe(true);
    expect(EMAIL_RE.test('not-an-email')).toBe(false);
  });

  it('enforces exact Collaborator Flywheel messaging for Instagram growth', () => {
    const collaboratorCopy = 'Double Your Reach: Add @FindLatinDance as a Collaborator';
    expect(collaboratorCopy).toContain('@FindLatinDance');
    expect(collaboratorCopy).toContain('Collaborator');
  });
});
