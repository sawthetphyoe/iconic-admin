import MainLayout from "@/components/layout/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <section className={"min-h-80 w-full flex items-center justify-center"}>
        <h1 className={"text-base-content/80"}>
          Welcome to ICONIC Admin Dashboard
        </h1>
      </section>
    </MainLayout>
  );
}
