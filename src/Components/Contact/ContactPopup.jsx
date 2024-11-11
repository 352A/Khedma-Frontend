import React, { useEffect, useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import styles from "./ContactPopup.module.css";
import {
  IconSquareRoundedX,
  IconSquareRoundedMinus,
  IconMessageChatbot,
} from "@tabler/icons-react";

const ContactPopup = () => {
  const [visible, setVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const handleClick = () => {
    setFormVisible(true);
  };

  const handleClose = () => {
    setFormVisible(false);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleMinimize = () => {
    setFormVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    handleClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {visible && (
        <div className={styles.popup} onClick={handleClick}>
          <p>
            <IconMessageChatbot stroke={2} />
          </p>{" "}
          {/* Emoji for chat icon */}
        </div>
      )}
      {formVisible && (
        <div className={styles.formContainer}>
          <div className="flex-start center flex">
            {/* Close Button */}

            <IconSquareRoundedX
              stroke={2}
              onClick={handleClose}
              className="cursor-pointer"
            />

            {/* Minimize Button */}

            <IconSquareRoundedMinus
              stroke={2}
              onClick={handleMinimize}
              className="cursor-pointer"
            />
          </div>
          <h3 className="my-3">تواصل معنا</h3>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <Input
              clearable
              underlined
              label={<div className="my-1.5">الاسم</div>}
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              size="sm"
              className={styles.customInput}
            />
            <Input
              clearable
              underlined
              label={<div className="my-1.5">البريد الإلكتروني</div>}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              size="sm"
              className={styles.customInput}
            />
            <Textarea
              clearable
              underlined
              label={<div className="my-1.5">الرسالة</div>}
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              size="sm"
              className={styles.customInput}
            />
            <Button type="submit" color="primary" size="sm" className="my-2">
              إرسال
            </Button>
            {/* <Button auto size="sm" color="danger" onClick={handleClose}>
              اغلاق
            </Button> */}
          </form>
        </div>
      )}
    </>
  );
};

export default ContactPopup;
