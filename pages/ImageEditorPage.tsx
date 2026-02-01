
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { useNavigate } from 'react-router-dom';

export const ImageEditorPage: React.FC = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setEditedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (customPrompt?: string) => {
    const finalPrompt = customPrompt || prompt;
    if (!image || !finalPrompt) return;

    setIsProcessing(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = image.split(',')[1];
      const mimeType = image.split(';')[0].split(':')[1];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType,
              },
            },
            { text: finalPrompt },
          ],
        },
      });

      let foundImage = false;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setEditedImage(`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`);
            foundImage = true;
            break;
          }
        }
      }

      if (!foundImage) {
        setError("Não foi possível processar a imagem. Tente um comando diferente.");
      }
    } catch (err: any) {
      console.error(err);
      setError("Erro ao conectar com a IA. Verifique sua conexão.");
    } finally {
      setIsProcessing(false);
    }
  };

  const quickActions = [
    { label: "Ocultar rostos", prompt: "Por favor, desfoque ou cubra todos os rostos de pessoas nesta imagem para proteger a privacidade dos estudantes." },
    { label: "Melhorar contraste", prompt: "Aumente o contraste e a nitidez desta imagem para torná-la mais legível para impressão em preto e branco." },
    { label: "Remover fundo", prompt: "Remova o fundo da imagem e foque apenas no objeto principal ou na situação central." },
    { label: "Filtro P&B", prompt: "Converta esta imagem para preto e branco de alta qualidade." }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="px-2">
        <button 
          onClick={() => navigate(-1)}
          className="text-[#007AFF] font-bold text-sm mb-4 flex items-center gap-1"
        >
          ← Voltar
        </button>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Editor de Privacidade</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Prepare evidências e documentos com proteção de dados.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
        {/* Lado do Upload */}
        <div className="space-y-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`ios-card border-2 border-dashed aspect-square flex flex-col items-center justify-center p-8 transition-all cursor-pointer ${
              image ? 'border-[#007AFF] bg-blue-50/10' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50'
            }`}
          >
            {image ? (
              <img src={image} alt="Original" className="w-full h-full object-contain rounded-xl" />
            ) : (
              <>
                <div className="text-5xl mb-4">📸</div>
                <p className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Tirar Foto ou Carregar Arquivo</p>
              </>
            )}
            <input 
              type="file" 
              accept="image/*" 
              hidden 
              ref={fileInputRef} 
              onChange={handleFileChange} 
            />
          </div>

          <div className="ios-card p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-ios">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Comando para a IA</h4>
            <div className="relative">
              <textarea 
                placeholder="Ex: 'Remova o rosto das pessoas para manter o anonimato'..."
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-[#007AFF] text-sm font-medium min-h-[100px] resize-none"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => processImage(action.prompt)}
                  disabled={!image || isProcessing}
                  className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-400 hover:bg-[#007AFF] hover:text-white transition-all disabled:opacity-50"
                >
                  {action.label}
                </button>
              ))}
            </div>

            <button 
              onClick={() => processImage()}
              disabled={!image || !prompt || isProcessing}
              className="w-full mt-6 bg-[#007AFF] text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-500/20 active:scale-95 transition-all disabled:opacity-50"
            >
              {isProcessing ? 'PROCESSANDO...' : 'EXECUTAR EDIÇÃO IA'}
            </button>
          </div>
        </div>

        {/* Lado do Resultado */}
        <div className="space-y-6">
          <div className="ios-card border border-slate-200 dark:border-slate-800 aspect-square flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800/50 relative overflow-hidden shadow-inner">
            {isProcessing && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 dark:bg-slate-900/60 backdrop-blur-md animate-in fade-in">
                <div className="w-12 h-12 border-4 border-[#007AFF] border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="font-black text-[#007AFF] uppercase tracking-widest text-xs">A IA está processando...</p>
              </div>
            )}
            
            {editedImage ? (
              <img src={editedImage} alt="Editada" className="w-full h-full object-contain rounded-xl" />
            ) : (
              <div className="text-center p-12">
                <span className="text-4xl opacity-20 block mb-4">✨</span>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">O resultado aparecerá aqui</p>
              </div>
            )}
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 text-xs font-bold text-center">
              {error}
            </div>
          )}

          {editedImage && (
            <div className="flex gap-3">
               <button 
                onClick={() => {
                  setImage(editedImage);
                  setEditedImage(null);
                }}
                className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all"
               >
                 Usar como Base
               </button>
               <a 
                href={editedImage}
                download="evidencia-bussola.png"
                className="flex-[1.5] bg-[#34C759] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-center shadow-lg active:scale-95 transition-all"
               >
                 Baixar Imagem
               </a>
            </div>
          )}
        </div>
      </div>

      <div className="mx-2 p-8 bg-purple-50 dark:bg-purple-900/20 rounded-[2.5rem] border border-purple-100 dark:border-purple-800/30">
        <div className="flex items-start gap-4">
          <span className="text-3xl">🎭</span>
          <div>
            <h4 className="font-black text-purple-900 dark:text-purple-300 text-sm uppercase mb-2">Segurança de Dados (LGPD)</h4>
            <p className="text-purple-800/80 dark:text-purple-400 text-xs font-medium leading-relaxed">
              Utilize esta ferramenta para anonimizar evidências antes de anexá-las a processos ou registros digitais. O desfoque de rostos e a remoção de informações identificáveis são práticas recomendadas pelo protocolo de proteção escolar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
