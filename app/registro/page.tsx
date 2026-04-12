import RegistroForm from "./registro-form";

export const metadata = {
  title: "Novo Registro | Admin",
  description: "Crie um novo registro de portfólio"
};

export default function RegistroPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-sans">
      <RegistroForm />
    </div>
  );
}
