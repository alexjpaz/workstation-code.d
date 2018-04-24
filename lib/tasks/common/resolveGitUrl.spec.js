const { expect } = require('chai');

const resolveGitUrl = require('./resolveGitUrl');

describe('resolveGitUrl', () => {
  it('should return a dest', () => {
    const dest = resolveGitUrl('git@foo:bar');
    expect(dest).to.contain("code/foo/bar");
  });

  it('should return a dest', () => {
    const dest = resolveGitUrl('foo:~/bar.git');
    expect(dest).to.contain("code/foo/bar");
  });

});
