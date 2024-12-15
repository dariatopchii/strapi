export default {
    routes: [
      {
        method: "GET",
        path: "/blockchain-contents",
        handler: "blockchain-controller.getBlockchainContents",
        config: {
          policies: [],
          description: "Получить все данные из блокчейна",
          tag: { name: "blockchain" },
        },
      },
    ],
  };
  