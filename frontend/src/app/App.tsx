import { RouterProvider } from 'react-router';
import { ThemeProvider } from './components/ThemeProvider';
import { router } from './routes';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="scada-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}