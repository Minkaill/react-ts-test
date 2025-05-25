import { Header } from '@widgets/header';
import { RouterProvider } from './providers';

const App = () => {
  return (
    <>
      <Header />
      <main className="container-custom mt-4">
        <RouterProvider />
      </main>
    </>
  );
};

export default App;
