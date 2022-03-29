import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Acp from './pages/acp';
// import Acc from './pages/acc';
// import Ame from './pages/ame';
// import Iah from './pages/iah';
// import Ap from './pages/ap';
import Ao from './pages/ao';
import AdminLogin from './pages/adminLogin';
import AdminDashBoard from './pages/adminDashBoard';
import AvalizProvider from './context/providerAvaliz';

export default function App() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message))
  //     .then((e) => console.log(data));
  // }, [data]);

  return (
    <AvalizProvider>
      <BrowserRouter>
        <Routes>
          {/* Serviços */}
          {/* https://avaliz.com/checkout/ */}
          <Route path="/avaliacao-cautelar" element={<Acp />} />
          <Route path="/avaliacao-online" element={<Ao />} />
          {/* https://avaliz.com/checkouts/checkout-vistoria-cautelar/ ;  */}
          {/* desativados */}
          {/* <Route path="/avaliacao-mecanica-eletrica" element={<Ame />} />
          <Route path="/avaliacao-cautelar-completa" element={<Acc />} />
          <Route path="/indicios-adulteracao-hodometro" element={<Iah />} />
          <Route path="/avaliacao-premium" element={<Ap />} /> */}
          {/* Checkout */}
          {/* <Route path="/checkout" element={<Checkout />} /> */}
          {/* Pagina do admin */}
          <Route exact path="/admin/login" element={<AdminLogin />} />
          <Route exact path="/admin/dashboard" element={<AdminDashBoard />} />
        </Routes>
      </BrowserRouter>
    </AvalizProvider>
  );
}
