"use client";

import { useRef, useState, useTransition } from "react";
import { UploadCloud, FileImage, X, CheckCircle2, Loader2 } from "lucide-react";
import { createRegister } from "../actions/register";
import { motion, AnimatePresence } from "framer-motion";

export default function RegistroForm() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (indexToRemove: number) => {
    setSelectedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const actionSubmit = async (formData: FormData) => {
    setMessage(null);

    // Cria um novo FormData para evitar problemas de serialização nativos com Server Actions
    const payload = new FormData();
    payload.append("period", formData.get("period") as string);
    payload.append("description", formData.get("description") as string);
    
    selectedFiles.forEach((file) => {
      payload.append("images", file);
    });

    startTransition(async () => {
      const result = await createRegister(payload);
      setMessage({ text: result.message, success: result.success });
      
      if (result.success) {
        formRef.current?.reset();
        setSelectedFiles([]);
      }
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto p-8 rounded-2xl bg-white/5 dark:bg-black/40 backdrop-blur-xl border border-white/10 dark:border-white/5 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-80" />
      
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100 mb-2">
          Novo Registro
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">
          Preencha os detalhes e adicione imagens ao seu portfólio.
        </p>
      </div>

      <AnimatePresence>
        {message && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
              message.success 
              ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20" 
              : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
            }`}
          >
            {message.success ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <X className="w-5 h-5 flex-shrink-0" />}
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      <form ref={formRef} action={actionSubmit} encType="multipart/form-data" className="space-y-6">
        <fieldset disabled={isPending} className="space-y-6 group">
          <div className="space-y-2">
            <label htmlFor="period" className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Período
            </label>
            <input 
              id="period" 
              name="period" 
              type="text" 
              placeholder="Ex: 2023 - 2024"
              className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-white/5 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-neutral-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Descrição
            </label>
            <textarea 
              id="description" 
              name="description" 
              rows={4}
              placeholder="Detalhes sobre este registro..."
              className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-white/5 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-neutral-400 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Galeria de Imagens
            </label>
            
            <div 
              className="relative group/dropzone w-full p-8 rounded-xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-purple-500 dark:hover:border-purple-400 bg-neutral-50/50 dark:bg-neutral-900/50 transition-colors cursor-pointer flex flex-col items-center justify-center text-center"
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                ref={fileInputRef}
                type="file" 
                multiple 
                accept="image/*"
                onChange={handleFileChange}
                className="hidden" 
              />
              <div className="p-4 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-4 group-hover/dropzone:scale-110 transition-transform">
                <UploadCloud className="w-8 h-8" />
              </div>
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                Clique para selecionar imagens
              </p>
              <p className="text-xs text-neutral-500 mt-2">
                PNG, JPG, WEBP (até 10MB)
              </p>
            </div>

            {selectedFiles.length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3"
              >
                <AnimatePresence>
                  {selectedFiles.map((file, idx) => (
                    <motion.div 
                      key={`${file.name}-${idx}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="relative flex items-center gap-2 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 group/file"
                    >
                      <div className="w-8 h-8 rounded bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center flex-shrink-0">
                        <FileImage className="w-4 h-4 text-neutral-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-neutral-700 dark:text-neutral-200 truncate">
                          {file.name}
                        </p>
                        <p className="text-[10px] text-neutral-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(idx);
                        }}
                        className="absolute -top-2 -right-2 p-1 bg-red-100 text-red-600 dark:bg-red-900/80 dark:text-red-300 rounded-full opacity-0 group-hover/file:opacity-100 transition-opacity shadow-sm"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 dark:text-black text-white rounded-xl font-medium transition-all focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 dark:focus:ring-white disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Cadastrando...</span>
              </>
            ) : (
              <span>Cadastrar Registro</span>
            )}
          </button>
        </fieldset>
      </form>
    </motion.div>
  );
}
