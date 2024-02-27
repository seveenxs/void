import { DirectoryLoader } from 'langchain/document_loaders/fs/directory'
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { TokenTextSplitter } from 'langchain/text_splitter';

export default class LoaderManager {
  private loader: DirectoryLoader;
  private splitter: TokenTextSplitter;

  public constructor(public path: string, 
    public chunkSize: number, public chunkOverlap: number
  ) {
    this.loader = new DirectoryLoader(path, {
      '.txt': path => new TextLoader(path),
      '.md': path => new TextLoader(path)
    });

    this.splitter = new TokenTextSplitter({
      encodingName: 'cl100k_base',
      chunkSize,
      chunkOverlap
    });
  }

  public async loadDocuments() {
    const documents = await this.loader.load();
    const splittedDocuments = await this.splitter.splitDocuments(documents);
    
    return splittedDocuments;
  }
}