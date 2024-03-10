import AppRoutes from './AppRoutes'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <>
      <AppRoutes/>
      <GlobalStyle/>
    </>
  )
}

export default App
