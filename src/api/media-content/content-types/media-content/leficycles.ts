import fetch from "node-fetch";

export default {
  async afterCreate(event) {
    const { result } = event;

    // Формируем payload для вебхука
    const payload = {
      hash: result.hash || "default_hash", // замените на нужное поле
      metadata: result.metadata || "default_metadata", // замените на нужное поле
    };

    console.log("Отправка вебхука с данными:", payload);

    // Отправляем данные на вебхук сервер
    try {
      await fetch("http://localhost:3000/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log("Вебхук успешно отправлен");
    } catch (error) {
      console.error("Ошибка при отправке вебхука:", error);
    }
  },
};
