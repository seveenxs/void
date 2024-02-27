import VoidClient from "../structs/Client";
import VoidEvent from "../structs/Event";

export default new VoidEvent({
  name: 'ready',
  once: true,
  runner: async () => {
    console.log('✅ Cliente carregado!');

    const client = VoidClient.getInstance();
    await client.void.storeManager.registerDocuments();
    
    console.log('✅ Documentos registrados');
  }
})