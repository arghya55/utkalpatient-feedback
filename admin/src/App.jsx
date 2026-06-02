import {
BrowserRouter,
Routes,
Route
}
from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import OPDFeedback from "./pages/OPDFeedbacks";
import IPDFeedback from "./pages/IPDFeedbacks";
import GeneralFeedback from "./pages/GeneralFeedback";
import Analytics from "./pages/Analytics";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

return(

<BrowserRouter>

<Routes>

<Route
path="/"
element={<Login />}
/>

<Route
path="/dashboard"
element={
<ProtectedRoute>
<Layout>
<Dashboard />
</Layout>
</ProtectedRoute>
}
/>

<Route
path="/opd-feedback"
element={
<ProtectedRoute>
<Layout>
<OPDFeedback />
</Layout>
</ProtectedRoute>
}
/>

<Route
path="/ipd-feedback"
element={
<ProtectedRoute>
<Layout>
<IPDFeedback />
</Layout>
</ProtectedRoute>
}
/>

<Route
path="/general-feedback"
element={
<ProtectedRoute>
<Layout>
<GeneralFeedback />
</Layout>
</ProtectedRoute>
}
/>

<Route
path="/analytics"
element={
<ProtectedRoute>
<Layout>
<Analytics />
</Layout>
</ProtectedRoute>
}
/>

</Routes>

</BrowserRouter>

);
}

export default App;