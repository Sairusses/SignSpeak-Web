import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import DefaultLayout from "@/layouts/default.tsx";
import DownloadPage from "@/pages/download.tsx";
import SignInPage from "@/pages/sign-in.tsx";
import SignUpPage from "@/pages/sign-up.tsx";

function App() {
  return (
    <DefaultLayout>
      <Routes>
        {/* Auth */}
        <Route element={<SignInPage />} path="/sign-in" />
        <Route element={<SignUpPage />} path="/sign-up" />
        <Route element={<IndexPage />} path="/" />
        <Route element={<DocsPage />} path="/docs" />

        <Route element={<DownloadPage />} path="/download" />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
