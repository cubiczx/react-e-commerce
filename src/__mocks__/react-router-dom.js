const React = require('react');

const mockRouter = {
  BrowserRouter: ({ children }) => children,
  Link: ({ children, to, ...props }) => React.createElement('a', { ...props, href: to }, children),
  Routes: ({ children }) => children,
  Route: () => null,
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' }),
  useParams: () => ({}),
};

module.exports = mockRouter;
