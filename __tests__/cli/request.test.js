const {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} = require('../utils')
const site = require('../fixtures/site.json')

describe('request', () => {
  beforeAll(() => setupIntegrationServer(site))
  afterAll(() => teardownIntegrationServer())

  test('missing query argument', () => {
    return runCLI({ args: 'request', testForError: true }).then(stdout => {
      expect(stdout).toMatchSnapshot()
    })
  })

  it('returns response', () => {
    const slug = 'calibre'
    return runCLI({
      args: `request --query='query GetSite($slug: String!) {organisation{site(slug: $slug){slug}}}' --slug=${slug}`
    }).then(stdout => {
      expect(stdout).toMatchSnapshot()
    })
  })
})