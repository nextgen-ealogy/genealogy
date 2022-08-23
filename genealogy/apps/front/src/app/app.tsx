import styled from 'styled-components';
import NxWelcome from './nx-welcome';
import Button from '@mui/material/Button';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <Button>Test</Button>
      <NxWelcome title="front" />
    </StyledApp>
  );
}

export default App;
