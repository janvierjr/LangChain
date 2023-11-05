// import { RecursiveCharacterTextSplitter } from './node_modules/langchain/text_splitter';
// import { createClient } from './node_modules/@supabase/supabase-js'; // node_modules/supabase/supabase-js
// import { SupabaseVectorStore } from './node_modules/langchain/vectorstores/supabase'; ///node_modules/langchain/vectorstores/supabase
// import { OpenAIEmbeddings } from './node_modules/langchain/embeddings/openai'; //node_modules/langchain/embeddings/openai

// try {
//   const result = await fetch('info.txt');
//   const text = await result.text();

//   const splitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 500,
//     separators: ['n\n', '\n', ' ', '', '##'], // default setting
//     chunkOverlap: 50
//   });

//   const output = await splitter.createDocuments([text]);

//   const supaApiKey = process.env.SUPABASE_API_KEY;
//   const supaUrl = process.env.SUPABASE_URL;
//   const openAIApiKey = process.env.OPENAI_API_KEY;

//   const client = createClient(supaUrl, supaApiKey)

//   await SupabaseVectorStore.fromDocuments(
//     output,
//     new OpenAIEmbeddings({ openAIApiKey }),
//     {
//       client,
//       tableName: 'documents'
//     }
//   );

// } catch (err) {
//   console.log(err);
// }


// RESOLVES document ReferenceError Temporary
let body = null;

if (typeof document !== 'undefined') {
  // will run in client's browser only
  body = document.getElementsByTagName('body')[0];
}

// TEMPORARY // without LLM set-up yet
let result;

document.addEventListener('submit', (e) => {
  e.preventDefault();
  progressConversation();
});

async function progressConversation() {
  const userInput = document.getElementById('user-input');
  const chatbotConversation = document.getElementById(
    'chatbot-conversation-container'
  );
  const question = userInput.value;
  userInput.value = '';

  // add human message
  const newHumanSpeechBubble = document.createElement('div');
  newHumanSpeechBubble.classList.add('speech', 'speech-human');
  chatbotConversation.appendChild(newHumanSpeechBubble);
  newHumanSpeechBubble.textContent = question;
  chatbotConversation.scrollTop = chatbotConversation.scrollHeight;

  // add AI message
  const newAiSpeechBubble = document.createElement('div');
  newAiSpeechBubble.classList.add('speech', 'speech-ai');
  chatbotConversation.appendChild(newAiSpeechBubble);
  newAiSpeechBubble.textContent = result || 'result';
  chatbotConversation.scrollTop = chatbotConversation.scrollHeight;
}
