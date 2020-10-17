import { IntentionService } from '../intention';

describe('Intention', () => {
  it('should not throw', () => {
    const service = new IntentionService();
    expect(() => service.addIntention({} as any)).not.toThrow();
  });
});
