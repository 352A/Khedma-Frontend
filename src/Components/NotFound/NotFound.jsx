import { Helmet } from "react-helmet-async";
import styles from "./notFound.module.css";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <Helmet>
        <title>خدمة | صفحة غير موجوده</title>
      </Helmet>
      <div className={styles.container}>
        {/* Cloud and raindrops container */}
        <div className={styles.cloudContainer}>
          {/* Cloud */}
          <div className={styles.cloud}></div>

          {/* Raindrops */}
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className={styles.raindrop}
              style={{
                left: `${Math.random() * 200 - 20}px`,
                animationDelay: `${Math.random() * 1.5}s`,
              }}
            />
          ))}
        </div>

        {/* 404 ERROR Text with lightning effect */}
        <h1 className={styles.lightningText}>خطأ 404</h1>
        <p className={styles.errorMessage}>التعذر عن العثور على الصفحة</p>
      </div>
    </>
  );
}
