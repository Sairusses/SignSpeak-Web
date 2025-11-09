import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import AboutPage from "@/pages/about";
import DefaultLayout from "@/layouts/default.tsx";
import DownloadPage from "@/pages/download.tsx";

function App() {
  return (
    <DefaultLayout>
      <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={<DocsPage />} path="/docs" />
        <Route element={<AboutPage />} path="/about" />
        <Route element={<DownloadPage />} path="/download" />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
