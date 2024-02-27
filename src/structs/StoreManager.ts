import LoaderManager from "./LoaderManager";
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';

export default class StoreManager {
  public store: MemoryVectorStore; 

  public constructor(public loader: LoaderManager) {
    this.store = new MemoryVectorStore(new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GEMINI_API_KEY as string
    }));
  }

  public async search(input: string) {
    const response = await this.store.similaritySearchWithScore(input, 5);
    return response;
  }

  public async registerDocuments() {
    const documents = await this.loader.loadDocuments();
    await this.store.addDocuments(documents);
  }
}