import LoaderManager from "./LoaderManager";
import StoreManager from "./StoreManager";
import path from 'node:path';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { RetrievalQAChain } from 'langchain/chains';
import { PromptTemplate } from 'langchain/prompts';

export default class VoidManager {
  private chat: ChatGoogleGenerativeAI;
  private chain: RetrievalQAChain;
  private promptTemplate: PromptTemplate;

  public loaderManager: LoaderManager;
  public storeManager: StoreManager;
  public documentsPath: string;
  
  public constructor(documentsPath: string = '../docs') {
    this.documentsPath = path.resolve(__dirname, documentsPath);
    
    this.loaderManager = new LoaderManager(this.documentsPath, 600, 0);
    this.storeManager = new StoreManager(this.loaderManager);

    this.chat = new ChatGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY as string,
      modelName: 'gemini-pro',
      temperature: 0.5
    });

    this.promptTemplate = new PromptTemplate({
      template: `
        Caso encontre um contexto o utilize como base para formação da resposta.

        Contexto:
        {context}

        Question:
        {question}
      `.trim(),
      inputVariables: ['context', 'question']
    });

    this.chain = RetrievalQAChain.fromLLM(this.chat, this.storeManager.store.asRetriever(), {
      prompt: this.promptTemplate,
    });
  }

  public async prompt(input: string) {
    const response = await this.chain.invoke({
      query: input
    });

    console.log(response);

    return response;
  }
}