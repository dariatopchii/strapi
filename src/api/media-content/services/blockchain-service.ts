import { JsonRpcProvider, Contract } from "ethers";
import abi from "../../../contracts/ContentBridge.json";

class CustomJsonRpcProvider extends JsonRpcProvider {
  async getResolver(name: string): Promise<null> {
    return null; // ENS отключен
  }
}

const provider = new CustomJsonRpcProvider("http://127.0.0.1:8545");
const contractAddress = "ВАШ_АДРЕС";
const contentBridge = new Contract(contractAddress, abi.abi, provider);

export default {
  async getAllContents() {
    console.log("[INFO] Начинаем получение данных из блокчейна...");

    try {
      console.log("[INFO] Получаем количество записей...");
      const contentCount = await contentBridge.contentCount();
      console.log(`[INFO] Найдено ${contentCount.toString()} записей.`);

      const contents = [];
      for (let i = BigInt(0); i < contentCount; i++) {
        console.log(`[INFO] Получаем запись с индексом ${i}...`);
        const content = await contentBridge.contents(i);
        console.log(`[INFO] Запись ${i}:`, content);

        contents.push({
          id: i.toString(),
          hash: content.hash,
          metadata: content.metadata,
          uploader: content.uploader,
        });
      }

      return contents;
    } catch (error) {
      console.error("[ERROR] Ошибка при получении данных из блокчейна:", error.message);
      throw error;
    }
  },
};
