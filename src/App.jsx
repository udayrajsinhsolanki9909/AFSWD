import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import LoginForm from "./components/Login";
import MediaGallery from "./components/Mediagallary";
import Cart from "./components/Cart";
import Analytics from "./components/Analytics";
import useDarkMode from "./hooks/useDarkMode";
import useAuth from "./hooks/useAuth";
import { fakeApi } from "./api/fakeapi";

export default function App() {
  const [dark, setDark] = useDarkMode();
  const auth = useAuth();

  const [courses, setCourses] = useState([]);
  const [cart, setCart] = useState(() => {
    try {
      const j = localStorage.getItem("edustream:cart");
      return j ? JSON.parse(j) : [];
    } catch (e) {
      return [];
    }
  });

  const [analytics, setAnalytics] = useState(null);
  const [loadingPurchase, setLoadingPurchase] = useState(false);

  useEffect(() => {
    fakeApi.getCourses().then(setCourses);
    fakeApi.getAnalytics().then(setAnalytics);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("edustream:cart", JSON.stringify(cart));
    } catch (e) { }
  }, [cart]);

  const addToCart = (course) => {
    setCart((c) => {
      if (c.find((x) => x.id === course.id)) return c;
      return [...c, course];
    });
  };

  const purchase = async () => {
    setLoadingPurchase(true);
    try {
      await fakeApi.purchase(auth.token(), cart);
      setCart([]);
      alert("Purchase successful! (mock)");
    } catch (err) {
      alert("Purchase failed: " + err.message);
    } finally {
      setLoadingPurchase(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header user={auth.user} onLogout={auth.logout} dark={dark} setDark={setDark} cartCount={cart.length} />



      <main className="p-6 space-y-6">
        <section>
          <h2 className="text-xl font-bold mb-2">Welcome to EduStream Prototype</h2>
          <p className="text-sm mb-2">This demo shows dark mode, a media gallery, mock authentication, a simple cart & analytics.</p>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <h3 className="font-semibold mb-2">Courses</h3>
            <MediaGallery courses={courses} onAddToCart={addToCart} />
          </div>

          <div className="space-y-4">
            <div>
              {auth.user ? (
                <div className="p-4 border rounded bg-white dark:bg-gray-900">Signed in as <strong>{auth.user.email}</strong></div>
              ) : (
                <LoginForm onLogin={auth.login} />
              )}
            </div>

            <Cart items={cart} onPurchase={purchase} loading={loadingPurchase} />

            <Analytics data={analytics} />
          </div>
        </section>
      </main>
    </div>
  );
}
