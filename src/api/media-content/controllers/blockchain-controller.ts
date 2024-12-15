import blockchainService from "../services/blockchain-service";

export default {
  async getBlockchainContents(ctx) {
    try {
      const contents = await blockchainService.getAllContents();
      ctx.send({ data: contents });
    } catch (error) {
      ctx.badRequest("Ошибка при получении данных из блокчейна", { error });
    }
  },
};
